// The user's taste profile, expressed as weighted affinities (0..1) over a
// fixed set of dimensions. Places and "taste twins" are described in the same
// space so we can compare them with cosine similarity.
//
// In production this vector would be learned from connected sources
// (Google Maps saves, Instagram, Foursquare, check-ins). Here it is seeded to
// match the profile the onboarding screens describe: Anatolian/Mediterranean
// leaning, local-only and no-tourist, cozy, late evenings, mid-range spend.

export const DIMENSIONS = [
  'coffee', 'brunch', 'bakery', 'wine', 'localFood', 'seafood',
  'mediterranean', 'anatolian', 'italian', 'asian',
  'cozy', 'lively', 'quiet', 'natural', 'seasonal',
  'localOnly', 'outdoor', 'lateNight', 'familyRun', 'noTourist',
]

// Human-readable phrasing for each dimension, used to explain recommendations.
export const DIM_LABELS = {
  coffee: 'specialty coffee',
  brunch: 'long brunches',
  bakery: 'fresh bakeries',
  wine: 'natural wine',
  localFood: 'local home cooking',
  seafood: 'seafood',
  mediterranean: 'Mediterranean flavours',
  anatolian: 'Anatolian cooking',
  italian: 'Italian kitchens',
  asian: 'Asian food',
  cozy: 'cozy rooms',
  lively: 'lively rooms',
  quiet: 'quiet corners',
  natural: 'natural & low-intervention',
  seasonal: 'seasonal menus',
  localOnly: 'local-only spots',
  outdoor: 'outdoor seating',
  lateNight: 'late evenings',
  familyRun: 'family-run places',
  noTourist: 'no-tourist places',
}

export const USER_PROFILE = {
  coffee: 0.8, brunch: 0.5, bakery: 0.6, wine: 0.55, localFood: 0.9, seafood: 0.6,
  mediterranean: 0.85, anatolian: 0.9, italian: 0.35, asian: 0.3,
  cozy: 0.85, lively: 0.25, quiet: 0.7, natural: 0.55, seasonal: 0.65,
  localOnly: 0.95, outdoor: 0.5, lateNight: 0.7, familyRun: 0.85, noTourist: 0.9,
}

// Preferred price band (1 = cheap, 4 = expensive). Mid-range with exceptions.
export const USER_PRICE = 2

// How many "taste twins" (people similar to the user) we sample for the
// social / collaborative-filtering signal.
export const COHORT_SIZE = 14
