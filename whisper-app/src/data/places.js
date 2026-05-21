// Sample places database — in production this would be an API
// For demo, we generate places around the user's actual location

export const NEARBY_PLACES = []

// Place templates with character — these get positioned near user's real location
const PLACE_TEMPLATES = [
  {
    id: 'cafe-1',
    name: 'A small roastery',
    emoji: '☕',
    type: 'Coffee · Independent',
    meta: 'Coffee roaster · Independent',
    whisperMessage: "There's a small roastery nearby. The kind with no sign — just the smell of fresh beans pulling you in.",
    matchReason: 'Coffee high in your taste profile',
    category: 'cafe',
  },
  {
    id: 'vinyl-1',
    name: 'A record shop',
    emoji: '🎵',
    type: 'Records · Vintage',
    meta: 'Record shop · Vintage',
    whisperMessage: "You've slowed down near a vinyl shop. No website, no Instagram — just crates and crates of records from people who know.",
    matchReason: 'Matches your vintage saves',
    category: 'culture',
  },
  {
    id: 'bakery-1',
    name: 'A corner bakery',
    emoji: '🥐',
    type: 'Bakery · Local',
    meta: 'Bakery · Neighbourhood favourite',
    whisperMessage: "That bakery on the corner has been here longer than anything else on this street. The locals come before 9am — you're just in time.",
    matchReason: 'Local-only spots in your profile',
    category: 'food',
  },
  {
    id: 'bookshop-1',
    name: 'A used bookshop',
    emoji: '📚',
    type: 'Bookshop · Second-hand',
    meta: 'Bookshop · Independent',
    whisperMessage: "There's a second-hand bookshop a minute away. Ceiling-high shelves, a cat on the counter, and a section of books the owner refuses to sell.",
    matchReason: 'Hidden doors & local-only in your profile',
    category: 'culture',
  },
  {
    id: 'park-1',
    name: 'A quiet garden',
    emoji: '🌿',
    type: 'Garden · Hidden',
    meta: 'Garden · Public',
    whisperMessage: "There's a garden behind that wall you just passed. Most people walk right by it. The entrance is through the iron gate on the left.",
    matchReason: 'Off-the-path places in your profile',
    category: 'outdoor',
  },
  {
    id: 'wine-1',
    name: 'A natural wine bar',
    emoji: '🍷',
    type: 'Wine bar · Natural',
    meta: 'Wine bar · Small plates',
    whisperMessage: "Fifty metres ahead — a natural wine bar that doesn't advertise. They pour wines from producers you can't find online.",
    matchReason: 'Natural wine in your taste profile',
    category: 'drink',
  },
  {
    id: 'gallery-1',
    name: 'A tiny gallery',
    emoji: '🖼️',
    type: 'Gallery · Contemporary',
    meta: 'Gallery · Emerging artists',
    whisperMessage: "That narrow door leads to a gallery showing three artists you've never heard of — and probably should have.",
    matchReason: 'Artisan venues in your profile',
    category: 'culture',
  },
  {
    id: 'restaurant-1',
    name: 'A family kitchen',
    emoji: '🫕',
    type: 'Restaurant · Family-run',
    meta: 'Restaurant · No menu, daily specials',
    whisperMessage: "There's a family restaurant around the corner. No menu — they cook what's fresh that day. The kind of place that doesn't need a sign.",
    matchReason: 'Open kitchen & local-only in your profile',
    category: 'food',
  },
]

// Generate places around a given location (called when we get real GPS)
export function generateNearbyPlaces(lat, lon) {
  const places = PLACE_TEMPLATES.map((template, i) => {
    // Scatter places 50-500m from user in different directions
    const angle = (i / PLACE_TEMPLATES.length) * 2 * Math.PI + (Math.random() * 0.5)
    const dist = 50 + Math.random() * 400 // 50-450m
    const dLat = (dist * Math.cos(angle)) / 111320
    const dLon = (dist * Math.sin(angle)) / (111320 * Math.cos(lat * Math.PI / 180))

    return {
      ...template,
      lat: lat + dLat,
      lon: lon + dLon,
    }
  })

  // Replace the NEARBY_PLACES array contents
  NEARBY_PLACES.length = 0
  NEARBY_PLACES.push(...places)

  return places
}