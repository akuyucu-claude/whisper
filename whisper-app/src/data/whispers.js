export const T = {
  PACE:     { label: "Slow walk",         icon: "🚶",  bg: "rgba(90,127,160,0.18)",   bd: "rgba(90,127,160,0.4)" },
  TIME:     { label: "Golden hour",       icon: "🌅",  bg: "rgba(212,130,60,0.15)",   bd: "rgba(212,130,60,0.38)" },
  PATTERN:  { label: "You're a regular",  icon: "🔁",  bg: "rgba(106,158,106,0.15)",  bd: "rgba(106,158,106,0.38)" },
  WEATHER:  { label: "Rain detected",     icon: "🌧️",  bg: "rgba(90,100,160,0.15)",   bd: "rgba(90,100,160,0.38)" },
  POST_MEAL:{ label: "Just finished eating",icon:"🍽️", bg: "rgba(160,100,90,0.15)",   bd: "rgba(160,100,90,0.35)" },
  REOPENED: { label: "Place update",      icon: "🔔",  bg: "rgba(212,168,83,0.12)",   bd: "rgba(212,168,83,0.32)" },
  HIDDEN:   { label: "Off the path",      icon: "🕯️",  bg: "rgba(150,120,80,0.15)",   bd: "rgba(200,169,110,0.28)" },
  NEW_PLACE:{ label: "New to you",        icon: "✦",   bg: "rgba(90,127,160,0.15)",   bd: "rgba(90,127,160,0.38)" },
  DRIVE:    { label: "You stopped",       icon: "🚗",  bg: "rgba(100,140,100,0.15)",  bd: "rgba(100,160,100,0.35)" },
  CONTEXT:  { label: "Reading the moment",icon: "🌙",  bg: "rgba(140,100,160,0.15)",  bd: "rgba(160,120,200,0.3)" },
}

export const WHISPERS = [
  {
    id: 1, unread: true, trigger: T.PACE, timestamp: Date.now(),
    time: "Just now", timeGroup: "Today",
    location: null,
    message: "You've slowed near Çukurcuma. There's a vinyl shop two doors left — no sign outside. The kind of place you'd never find searching.",
    venue: { emoji: "🎵", name: "Plak Evi 1987", meta: "Record shop · Çukurcuma", dist: "40m" },
    context: "Pace < 3 km/h for 4 min · Matches your vintage saves · Never visited before",
    action: "Take me there",
  },
  {
    id: 2, unread: true, trigger: T.NEW_PLACE, timestamp: Date.now() - 14*60000,
    time: "14 min ago", timeGroup: "Today",
    location: "Burgundy, France",
    message: "You've left your usual territory. There's a négociant 400m ahead who doesn't sell online — hand-harvested Pinot, family-run since 1968. Pull in.",
    venue: { emoji: "🍷", name: "Domaine Leflaive Route", meta: "Winery · Côte de Nuits", dist: "400m" },
    context: "First time in this area · New location detected · Wine high in your taste profile",
    action: "Navigate there",
  },
  {
    id: 3, unread: true, trigger: T.DRIVE, timestamp: Date.now() - 24*3600000,
    time: "Yesterday, 14:10", timeGroup: "Yesterday",
    location: "Alsace, France",
    message: "You've stopped on a country road in Alsace. That half-timbered building on the right is a winstub — no menu, they bring what's been cooked today.",
    venue: { emoji: "🫕", name: "Chez Yvonne", meta: "Winstub · Ribeauvillé", dist: "80m" },
    context: "Vehicle stopped · Rural location · Off-map venue · Lunch window",
    action: "Show me",
  },
  {
    id: 4, unread: false, trigger: T.TIME, timestamp: Date.now() - 24*3600000 - 4000,
    time: "Yesterday, 18:38", timeGroup: "Yesterday",
    location: null,
    message: "It's 6:40pm on a Friday. The light on the Boğaz right now is unrepeatable. Nardis Jazz opens in 20 minutes — your kind of evening.",
    venue: { emoji: "🎷", name: "Nardis Jazz Club", meta: "Live jazz · Karaköy", dist: "5 min" },
    context: "Friday 6:40pm · Golden hour · Jazz venues in your history",
    action: "Reserve a spot",
  },
  {
    id: 5, unread: false, trigger: T.PATTERN, timestamp: Date.now() - 48*3600000,
    time: "2 days ago", timeGroup: "This Week",
    location: null,
    message: "Third Saturday morning walk through Moda. The locals here go to Fazıl Bey's first. You haven't been yet.",
    venue: { emoji: "☕", name: "Fazıl Bey'in Kahvesi", meta: "Turkish coffee · Moda", dist: "3 min" },
    context: "3rd consecutive Saturday in Moda · Regular pattern detected",
    action: "Go there",
  },
  {
    id: 6, unread: false, trigger: T.NEW_PLACE, timestamp: Date.now() - 72*3600000,
    time: "3 days ago", timeGroup: "This Week",
    location: "Vienna, Austria",
    message: "First time in Vienna. The Naschmarkt at this hour is all locals. Skip the obvious stalls — stall 74 at the far end has been there since the 1920s.",
    venue: { emoji: "🧺", name: "Naschmarkt Stand 74", meta: "Market · Mariahilf", dist: "6 min walk" },
    context: "First visit to Vienna detected · Morning · Market in your taste history",
    action: "Find it",
  },
  {
    id: 7, unread: false, trigger: T.WEATHER, timestamp: Date.now() - 96*3600000,
    time: "4 days ago", timeGroup: "Earlier",
    location: null,
    message: "It's raining and you've stopped near Beyoğlu. Markiz has been here since 1941. Right place to wait it out.",
    venue: { emoji: "🥐", name: "Pâtisserie Markiz", meta: "Patisserie · İstiklal", dist: "2 min" },
    context: "Rain started · You stopped · Covered venue nearby",
    action: "Navigate there",
  },
  {
    id: 8, unread: false, trigger: T.HIDDEN, timestamp: Date.now() - 120*3600000,
    time: "5 days ago", timeGroup: "Earlier",
    location: "Cappadocia, Turkey",
    message: "There's an unmarked cave door on this street. Behind it: a family pottery workshop that's been here longer than the town's name.",
    venue: { emoji: "🏺", name: "Avanos Pottery Cave", meta: "Workshop · Avanos", dist: "30m" },
    context: "Slow walk · Rural Cappadocia · Artisan venues in taste profile",
    action: "Find it",
  },
]

export const FILTERS = ["All", "Nearby", "Travelling", "Pattern", "Weather"]

export const SOURCES = [
  { id:"google",     name:"Google Maps",  desc:"Starred places & saved lists",   icon:"🗺️", bg:"#1a2a1a", count:"47 places",   delay:1300 },
  { id:"instagram",  name:"Instagram",    desc:"Saved posts & tagged locations",  icon:"📸", bg:"#2a1a22", count:"83 locations", delay:1800 },
  { id:"foursquare", name:"Foursquare",   desc:"Check-ins & tips",               icon:"📍", bg:"#1a1f2a", count:"29 check-ins", delay:1100 },
  { id:"tripadvisor",name:"Tripadvisor",  desc:"Reviews & wish list",            icon:"✈️", bg:"#1a2a1a", count:"14 reviews",   delay:1600 },
]

export const INSIGHTS = [
  { icon:"🫕", title:"Cuisine Lean",      value:"Anatolian · Mediterranean" },
  { icon:"🌙", title:"Peak Hours",        value:"Late evenings, Weekends" },
  { icon:"🏘️", title:"Roam Pattern",     value:"Neighbourhood wanderer" },
  { icon:"💸", title:"Spend Pattern",     value:"Mid-range with exceptions" },
]

export const TAGS = [
  { t:"Historic venues", s:true }, { t:"Local-only spots", s:true },
  { t:"Natural wine", s:false },   { t:"Open kitchen", s:false },
  { t:"No-tourist", s:true },      { t:"Seasonal menu", s:false },
  { t:"Live music", s:false },     { t:"Hidden doors", s:true },
]