export const T = {
  PACE: {
    label: 'Slow walk',
    icon: '🚶',
    color: 'rgba(90,127,160,0.15)',
    borderColor: 'rgba(90,127,160,0.4)',
  },
  TIME: {
    label: 'Golden hour',
    icon: '🌅',
    color: 'rgba(212,130,60,0.15)',
    borderColor: 'rgba(212,130,60,0.38)',
  },
  PATTERN: {
    label: "You're a regular",
    icon: '🔁',
    color: 'rgba(106,158,106,0.15)',
    borderColor: 'rgba(106,158,106,0.38)',
  },
  WEATHER: {
    label: 'Rain detected',
    icon: '🌧️',
    color: 'rgba(90,100,160,0.15)',
    borderColor: 'rgba(90,100,160,0.38)',
  },
  POST_MEAL: {
    label: 'Just finished eating',
    icon: '🍽️',
    color: 'rgba(160,100,90,0.15)',
    borderColor: 'rgba(160,100,90,0.35)',
  },
  REOPENED: {
    label: 'Place update',
    icon: '🔔',
    color: 'rgba(212,168,83,0.12)',
    borderColor: 'rgba(212,168,83,0.32)',
  },
  HIDDEN: {
    label: 'Off the path',
    icon: '🕯️',
    color: 'rgba(150,120,80,0.15)',
    borderColor: 'rgba(200,169,110,0.28)',
  },
  NEW_PLACE: {
    label: 'New to you',
    icon: '✦',
    color: 'rgba(90,127,160,0.15)',
    borderColor: 'rgba(90,127,160,0.38)',
  },
  DRIVE: {
    label: 'You stopped',
    icon: '🚗',
    color: 'rgba(100,140,100,0.15)',
    borderColor: 'rgba(100,160,100,0.35)',
  },
  CONTEXT: {
    label: 'Reading the moment',
    icon: '🌙',
    color: 'rgba(140,100,160,0.15)',
    borderColor: 'rgba(160,120,200,0.3)',
  },
}

export const WHISPERS = [
  {
    id: 1,
    unread: true,
    trigger: T.PACE,
    timestamp: Date.now(),
    time: 'Just now',
    timeGroup: 'Today',
    location: null,
    message:
      "You've slowed near a quiet corner. There's a vinyl shop two doors left — no sign outside. The kind of place you'd never find searching.",
    venue: {
      emoji: '🎵',
      name: 'A record shop',
      meta: 'Record shop · Vintage',
      dist: '40m',
    },
    context: 'Pace < 1.2 m/s for 4 min · Matches your vintage saves · Never visited before',
    action: 'Take me there',
  },
  {
    id: 2,
    unread: true,
    trigger: T.NEW_PLACE,
    timestamp: Date.now() - 14 * 60000,
    time: '14 min ago',
    timeGroup: 'Today',
    location: 'New area detected',
    message:
      "You've left your usual territory. There's a café 400m ahead — hand-roasted, family-run since 1968. Pull in.",
    venue: {
      emoji: '☕',
      name: 'A small roastery',
      meta: 'Coffee roaster · Independent',
      dist: '400m',
    },
    context: 'First time in this area · New location detected · Coffee high in your taste profile',
    action: 'Navigate there',
  },
  {
    id: 3,
    unread: true,
    trigger: T.DRIVE,
    timestamp: Date.now() - 24 * 3600000,
    time: 'Yesterday, 14:10',
    timeGroup: 'Yesterday',
    location: 'Neighbourhood',
    message:
      "You've stopped on a quiet street. That corner building is a family restaurant — no menu, they bring what's been cooked today.",
    venue: {
      emoji: '🫕',
      name: 'A family kitchen',
      meta: 'Restaurant · Family-run',
      dist: '80m',
    },
    context: 'Vehicle stopped · Local location · Lunch window',
    action: 'Show me',
  },
  {
    id: 4,
    unread: false,
    trigger: T.TIME,
    timestamp: Date.now() - 24 * 3600000 - 4000,
    time: 'Yesterday, 18:38',
    timeGroup: 'Yesterday',
    location: null,
    message:
      "It's golden hour right now. The light on the streets is unrepeatable. That jazz club opens in 20 minutes — your kind of evening.",
    venue: {
      emoji: '🎷',
      name: 'A jazz venue',
      meta: 'Live jazz · Independent',
      dist: '5 min',
    },
    context: 'Golden hour · Jazz venues in your history',
    action: 'Reserve a spot',
  },
  {
    id: 5,
    unread: false,
    trigger: T.PATTERN,
    timestamp: Date.now() - 48 * 3600000,
    time: '2 days ago',
    timeGroup: 'This Week',
    location: null,
    message:
      'Third Saturday morning walk through this area. The locals here go to a small café first. You haven\'t been yet.',
    venue: {
      emoji: '☕',
      name: 'A corner bakery',
      meta: 'Bakery · Local',
      dist: '3 min',
    },
    context: '3rd consecutive Saturday in this area · Regular pattern detected',
    action: 'Go there',
  },
]

export const FILTERS = ['All', 'Nearby', 'Travelling', 'Pattern', 'Weather']

export const SOURCES = [
  {
    id: 'google',
    name: 'Google Maps',
    desc: 'Starred places & saved lists',
    icon: '🗺️',
    bg: '#1a2a1a',
    count: '47 places',
    delay: 1300,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    desc: 'Saved posts & tagged locations',
    icon: '📸',
    bg: '#2a1a22',
    count: '83 locations',
    delay: 1800,
  },
  {
    id: 'foursquare',
    name: 'Foursquare',
    desc: 'Check-ins & tips',
    icon: '📍',
    bg: '#1a1f2a',
    count: '29 check-ins',
    delay: 1100,
  },
  {
    id: 'tripadvisor',
    name: 'Tripadvisor',
    desc: 'Reviews & wish list',
    icon: '✈️',
    bg: '#1a2a1a',
    count: '14 reviews',
    delay: 1600,
  },
]

export const INSIGHTS = [
  { icon: '🫕', title: 'Cuisine Lean', value: 'Anatolian · Mediterranean' },
  { icon: '🌙', title: 'Peak Hours', value: 'Late evenings, Weekends' },
  { icon: '🏘️', title: 'Roam Pattern', value: 'Neighbourhood wanderer' },
  { icon: '💸', title: 'Spend Pattern', value: 'Mid-range with exceptions' },
]

export const TAGS = [
  { t: 'Historic venues', s: true },
  { t: 'Local-only spots', s: true },
  { t: 'Natural wine', s: false },
  { t: 'Open kitchen', s: false },
  { t: 'No-tourist', s: true },
  { t: 'Seasonal menu', s: false },
  { t: 'Live music', s: false },
  { t: 'Hidden doors', s: true },
]