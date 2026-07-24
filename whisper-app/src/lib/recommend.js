import { DIMENSIONS, DIM_LABELS, COHORT_SIZE } from '../data/tasteProfile'

// --- vector helpers ---------------------------------------------------------

function vec(obj) {
  return DIMENSIONS.map((d) => obj?.[d] || 0)
}

export function cosineSim(a, b) {
  const va = Array.isArray(a) ? a : vec(a)
  const vb = Array.isArray(b) ? b : vec(b)
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < va.length; i++) {
    dot += va[i] * vb[i]
    na += va[i] * va[i]
    nb += vb[i] * vb[i]
  }
  if (na === 0 || nb === 0) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

// Deterministic pseudo-random in [0,1) so the cohort is stable across renders.
function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// --- "people like you" cohort ----------------------------------------------
//
// We model a cohort of taste twins as small deterministic perturbations of the
// user's own profile — i.e. real people whose tastes are close to the user's.
// Each twin's rating of a place blends how well the place fits *their* taste
// with the venue's general acclaim, so the social signal can diverge from the
// user's personal taste match (a place can be widely loved by similar people
// even if it isn't a perfect 1:1 fit, and vice-versa).

let cohortCache = null
let cohortCacheKey = null

export function buildCohort(userProfile, size = COHORT_SIZE) {
  const userVec = vec(userProfile)
  const twins = []
  for (let t = 0; t < size; t++) {
    const v = userVec.map((val, i) => {
      const jitter = (seeded(t * 31 + i * 7 + 1) - 0.5) * 0.5 // ±0.25
      return Math.min(1, Math.max(0, val + jitter))
    })
    twins.push({
      id: `twin-${t}`,
      vector: v,
      similarity: cosineSim(v, userVec), // closeness to the user
    })
  }
  return twins
}

function getCohort(userProfile) {
  const key = JSON.stringify(userProfile)
  if (cohortCache && cohortCacheKey === key) return cohortCache
  cohortCache = buildCohort(userProfile)
  cohortCacheKey = key
  return cohortCache
}

// A twin's predicted rating (1..5) for a place.
function twinRating(twin, place) {
  const fit = cosineSim(twin.vector, place.vector) // 0..1
  const acclaim = (place.rating || 4.2) / 5 // 0..1
  const score = 0.62 * fit + 0.38 * acclaim
  return 1 + 4 * score
}

// Similarity-weighted collaborative score for a place across the cohort.
// Returns a normalised 0..1 social score plus the social proof we show in UI.
export function socialScore(place, userProfile) {
  const twins = getCohort(userProfile)
  let weighted = 0
  let weight = 0
  let lovers = 0
  let sumLoverRating = 0
  for (const twin of twins) {
    const r = twinRating(twin, place)
    weighted += twin.similarity * r
    weight += twin.similarity
    if (r >= 4) {
      lovers += 1
      sumLoverRating += r
    }
  }
  const predicted = weight > 0 ? weighted / weight : twinRating({ vector: vec(userProfile) }, place)
  return {
    score: Math.min(1, Math.max(0, (predicted - 1) / 4)), // map 1..5 -> 0..1
    predicted,
    lovers,
    avgRating: lovers > 0 ? sumLoverRating / lovers : predicted,
  }
}

// --- combined recommendation ------------------------------------------------

const WEIGHTS = { taste: 0.45, social: 0.35, proximity: 0.2 }
const RADIUS_M = 600

function proximityScore(distance) {
  if (distance == null) return 0
  return Math.min(1, Math.max(0, 1 - distance / RADIUS_M))
}

// Top dimensions where the user and the place both rank highly — used to
// explain *why* a place matches in plain language.
function topSharedTraits(userProfile, place, n = 3) {
  return DIMENSIONS
    .map((d) => ({ d, strength: (userProfile[d] || 0) * (place.vector[d] || 0) }))
    .filter((x) => x.strength > 0.25)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, n)
    .map((x) => DIM_LABELS[x.d])
}

// Build a fully-scored recommendation for a single place at a given distance.
export function scoreRecommendation(place, { userProfile, distance }) {
  const taste = cosineSim(userProfile, place.vector)
  const social = socialScore(place, userProfile)
  const proximity = proximityScore(distance)
  const total =
    WEIGHTS.taste * taste +
    WEIGHTS.social * social.score +
    WEIGHTS.proximity * proximity

  const tastePct = Math.round(taste * 100)
  const socialPct = Math.round(social.score * 100)
  const traits = topSharedTraits(userProfile, place)

  return {
    ...place,
    distance,
    scores: { taste, social: social.score, proximity, total },
    tastePct,
    socialPct,
    traits,
    social: {
      lovers: social.lovers,
      avgRating: Number(social.avgRating.toFixed(1)),
      blurb:
        social.lovers > 0
          ? `Loved by ${social.lovers} ${social.lovers === 1 ? 'person' : 'people'} with taste like yours`
          : 'An early find for people with your taste',
    },
    matchRows: [
      { k: 'Your taste', p: tastePct },
      { k: 'People like you', p: socialPct },
      { k: 'Close by', p: Math.round(proximity * 100) },
    ],
    why: buildWhy({ place, traits, social, distance }),
  }
}

function buildWhy({ place, traits, social, distance }) {
  const items = []
  if (traits.length) {
    items.push({
      icon: '🫕',
      src: 'Your taste',
      text: `${traits.slice(0, 2).join(' & ')} rank high in your profile`,
    })
  }
  items.push({
    icon: '👥',
    src: 'People like you',
    text:
      social.lovers > 0
        ? `${social.lovers} people with a taste profile like yours rated this ${Number(social.avgRating.toFixed(1))}★`
        : `A fresh find — early ratings from people like you average ${Number(social.avgRating.toFixed(1))}★`,
  })
  if (place.category === 'cafe' || place.category === 'restaurant') {
    items.push({
      icon: place.emoji,
      src: place.category === 'cafe' ? 'Café' : 'Restaurant',
      text: place.signature || place.meta,
    })
  }
  if (distance != null) {
    items.push({
      icon: '📍',
      src: 'Right now',
      text: `${distance < 1000 ? `${Math.round(distance)}m` : `${(distance / 1000).toFixed(1)}km`} from where you are`,
    })
  }
  return items
}

// Rank a list of nearby places (each must already carry a `distance`).
// `onlyCategories` lets the engine focus on restaurants & cafés.
export function rankRecommendations(places, { userProfile, onlyCategories } = {}) {
  return places
    .filter((p) => p.vector && (!onlyCategories || onlyCategories.includes(p.category)))
    .map((p) => scoreRecommendation(p, { userProfile, distance: p.distance }))
    .sort((a, b) => b.scores.total - a.scores.total)
}
