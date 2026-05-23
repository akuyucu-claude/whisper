// Places database — restaurants & cafés the engine can proactively recommend.
// In production this would come from a places API filtered to the user's
// surroundings; here we keep a set of templates that get positioned around the
// user's real GPS location. Each place carries an attribute `vector` (same
// dimensions as the taste profile) plus price/rating, so it can be scored
// against the user's taste and against "people like you".

export const NEARBY_PLACES = []

// Helper to keep vectors terse: only list non-zero dimensions.
const v = (obj) => obj

const PLACE_TEMPLATES = [
  {
    id: 'cafe-roastery',
    name: 'A small roastery',
    emoji: '☕',
    type: 'Café · Specialty coffee',
    meta: 'Coffee roaster · Independent',
    category: 'cafe',
    price: 2,
    rating: 4.7,
    signature: 'Single-origin pour-overs, roasted in the back room',
    tags: ['Specialty coffee', 'Independent', 'Quiet', 'Walk-in'],
    description:
      'A tiny roastery with no real sign — just the smell of fresh beans. They roast in the back and pour single-origin by hand. The kind of counter where the barista remembers your order by the second visit.',
    whisperMessage:
      "There's a small roastery nearby — no sign, just the smell of fresh beans pulling you in. Your kind of morning.",
    vector: v({ coffee: 0.95, cozy: 0.8, quiet: 0.7, localOnly: 0.85, noTourist: 0.7, seasonal: 0.3 }),
  },
  {
    id: 'rest-anatolian',
    name: 'A family kitchen',
    emoji: '🫕',
    type: 'Restaurant · Anatolian',
    meta: 'Home cooking · No menu, daily specials',
    category: 'restaurant',
    price: 2,
    rating: 4.8,
    signature: 'No menu — they cook what was fresh at the market that morning',
    tags: ['Family-run', 'No menu', 'Local-only', 'Anatolian'],
    description:
      'A family restaurant around the corner with no menu — they cook what was fresh that morning. Grandmother in the kitchen, grandson on the floor. The kind of place that never needed a sign.',
    whisperMessage:
      "There's a family kitchen around the corner. No menu — they cook what's fresh that day. Exactly the kind of place you keep saving.",
    vector: v({ anatolian: 0.95, localFood: 0.95, mediterranean: 0.7, familyRun: 0.95, localOnly: 0.95, noTourist: 0.9, cozy: 0.8, seasonal: 0.7 }),
  },
  {
    id: 'cafe-bakery',
    name: 'A corner bakery',
    emoji: '🥐',
    type: 'Café · Bakery',
    meta: 'Bakery · Neighbourhood favourite',
    category: 'cafe',
    price: 1,
    rating: 4.5,
    signature: 'Out of the oven before 8am — locals queue, you just walk in',
    tags: ['Fresh daily', 'Neighbourhood', 'Breakfast', 'Family-run'],
    description:
      'A corner bakery that has been here longer than anything else on the street. Everything is out of the oven before 8am and the locals come early. Coffee is an afterthought, but the pastries are the point.',
    whisperMessage:
      'That corner bakery has been here longer than the street. Locals come before 9am — you\'re just in time.',
    vector: v({ bakery: 0.9, brunch: 0.6, coffee: 0.5, cozy: 0.75, familyRun: 0.8, localOnly: 0.7, noTourist: 0.6 }),
  },
  {
    id: 'rest-meyhane',
    name: 'A back-street meyhane',
    emoji: '🍷',
    type: 'Restaurant · Meyhane',
    meta: 'Meze & rakı · Late evenings',
    category: 'restaurant',
    price: 3,
    rating: 4.6,
    signature: 'Cold meze on a trolley, fish off the day\'s catch, music after 10',
    tags: ['Seafood', 'Late-night', 'Lively', 'Local-only'],
    description:
      'A meyhane down a back street where the meze comes round on a trolley and the fish is whatever came in that day. It fills up late and stays loud — locals only, no menu in English.',
    whisperMessage:
      "Down that back street — a meyhane that fills up late. Meze on a trolley, the day's catch, no English menu. Your kind of evening.",
    vector: v({ seafood: 0.85, mediterranean: 0.7, wine: 0.5, localFood: 0.7, lively: 0.7, lateNight: 0.9, localOnly: 0.8, noTourist: 0.75 }),
  },
  {
    id: 'cafe-brunch',
    name: 'A garden brunch spot',
    emoji: '🍳',
    type: 'Café · All-day brunch',
    meta: 'Brunch · Courtyard seating',
    category: 'cafe',
    price: 2,
    rating: 4.4,
    signature: 'Slow weekend brunch in a hidden courtyard',
    tags: ['Brunch', 'Outdoor', 'Specialty coffee', 'Weekend'],
    description:
      'An all-day café with a courtyard you can\'t see from the street. Eggs done properly, good coffee, and enough shade to lose a Sunday in. Busiest on weekend mornings.',
    whisperMessage:
      "There's a courtyard café hidden behind that wall — slow brunch, good coffee, the kind of Sunday you don't rush.",
    vector: v({ brunch: 0.9, coffee: 0.75, outdoor: 0.85, bakery: 0.4, lively: 0.45, seasonal: 0.5, cozy: 0.55 }),
  },
  {
    id: 'rest-natural-wine',
    name: 'A natural wine bar',
    emoji: '🍶',
    type: 'Restaurant · Wine bar',
    meta: 'Natural wine · Small plates',
    category: 'restaurant',
    price: 3,
    rating: 4.7,
    signature: 'Low-intervention bottles you won\'t find online, small seasonal plates',
    tags: ['Natural wine', 'Small plates', 'Seasonal', 'Cozy'],
    description:
      'A small room pouring low-intervention wines from producers you can\'t find online, with a short seasonal plates menu chalked on the wall. No list — they pour what they\'re excited about.',
    whisperMessage:
      "Fifty metres ahead — a natural wine bar that doesn't advertise. They pour bottles you can't find online.",
    vector: v({ wine: 0.95, natural: 0.9, mediterranean: 0.6, seasonal: 0.8, cozy: 0.75, lateNight: 0.7, localOnly: 0.7, noTourist: 0.65 }),
  },
  {
    id: 'rest-trattoria',
    name: 'A tiny trattoria',
    emoji: '🍝',
    type: 'Restaurant · Italian',
    meta: 'Hand-made pasta · Family-run',
    category: 'restaurant',
    price: 2,
    rating: 4.5,
    signature: 'Pasta rolled out that morning, a menu that changes weekly',
    tags: ['Italian', 'Family-run', 'Hand-made pasta', 'Seasonal'],
    description:
      'A trattoria with eight tables and a nonna rolling pasta in the window. The menu changes with the week and the market. No bookings — you wait at the bar with a glass of something.',
    whisperMessage:
      'Eight tables, a nonna rolling pasta in the window, a menu that changes weekly. Worth the wait at the bar.',
    vector: v({ italian: 0.95, seasonal: 0.7, familyRun: 0.85, cozy: 0.8, mediterranean: 0.5, localFood: 0.5, wine: 0.4 }),
  },
  {
    id: 'rest-seafood',
    name: 'A neighbourhood balıkçı',
    emoji: '🐟',
    type: 'Restaurant · Seafood',
    meta: 'Day boat fish · Quiet room',
    category: 'restaurant',
    price: 3,
    rating: 4.8,
    signature: 'Whatever the day boats brought in, cooked simply',
    tags: ['Seafood', 'Local-only', 'Quiet', 'No-tourist'],
    description:
      'A quiet neighbourhood fish place where you pick from the ice and they cook it simply. No tourists find it, the regulars guard it, and the mezes are made in-house.',
    whisperMessage:
      "A neighbourhood balıkçı the regulars guard — pick from the ice, they cook it simply. No tourists find this one.",
    vector: v({ seafood: 0.95, localFood: 0.8, mediterranean: 0.7, localOnly: 0.9, noTourist: 0.9, quiet: 0.7, familyRun: 0.6, seasonal: 0.6 }),
  },
  {
    id: 'cafe-kahve',
    name: 'A historic coffee house',
    emoji: '☕',
    type: 'Café · Turkish coffee',
    meta: 'Turkish coffee · Since 1923',
    category: 'cafe',
    price: 1,
    rating: 4.9,
    signature: 'Coffee on coals, backgammon, regulars who\'ve come for decades',
    tags: ['Turkish coffee', 'Historic', 'Local-only', 'No-tourist'],
    description:
      'A coffee house that has poured the same way since 1923 — coffee on the coals, backgammon in the corner, regulars who have come for decades. Nothing has changed and that\'s the whole point.',
    whisperMessage:
      "That coffee house has poured the same way since 1923 — on the coals, backgammon in the corner. The locals never left.",
    vector: v({ coffee: 0.9, anatolian: 0.7, localOnly: 0.95, noTourist: 0.95, quiet: 0.6, familyRun: 0.8, cozy: 0.8 }),
  },
]

// Generate places around a given location (called when we get real GPS).
export function generateNearbyPlaces(lat, lon) {
  const places = PLACE_TEMPLATES.map((template, i) => {
    // Scatter places 50-500m from the user in different directions.
    const angle = (i / PLACE_TEMPLATES.length) * 2 * Math.PI + (Math.random() * 0.5)
    const dist = 50 + Math.random() * 400
    const dLat = (dist * Math.cos(angle)) / 111320
    const dLon = (dist * Math.sin(angle)) / (111320 * Math.cos((lat * Math.PI) / 180))
    return { ...template, lat: lat + dLat, lon: lon + dLon }
  })

  NEARBY_PLACES.length = 0
  NEARBY_PLACES.push(...places)
  return places
}
