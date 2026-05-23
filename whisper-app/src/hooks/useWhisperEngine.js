import { useState, useEffect, useRef, useCallback } from 'react'
import { T } from '../data/whispers'
import { NEARBY_PLACES } from '../data/places'
import { USER_PROFILE } from '../data/tasteProfile'
import { rankRecommendations } from '../lib/recommend'

// Determine current context triggers — these decide *when* it's a good moment
// to surface a recommendation. The recommendation engine decides *what*.
function detectTriggers(speed) {
  const triggers = []
  const hour = new Date().getHours()

  // Slow walk: user has slowed down to explore.
  if (speed !== null && speed < 1.2 && speed >= 0) {
    triggers.push({ type: T.PACE, weight: speed < 0.5 ? 0.9 : 0.6 })
  }

  // Golden hour: a natural prompt to step out.
  if ((hour >= 6 && hour <= 7) || (hour >= 17 && hour <= 19)) {
    triggers.push({ type: T.TIME, weight: 0.7 })
  }

  // Late-night context.
  if (hour >= 21 || hour <= 4) {
    triggers.push({ type: T.CONTEXT, weight: 0.5 })
  }

  // Stopped (vehicle or standing still).
  if (speed !== null && speed < 0.3) {
    triggers.push({ type: T.DRIVE, weight: 0.4 })
  }

  return triggers
}

function distLabel(distance) {
  if (distance == null) return ''
  if (distance < 1000) return `${Math.round(distance)}m`
  return `${(distance / 1000).toFixed(1)}km`
}

export default function useWhisperEngine({ location, speed, locationName, listening, getDistance }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([])
  const [currentWhisper, setCurrentWhisper] = useState(null)
  const whisperHistoryRef = useRef(new Set())
  const lastWhisperTimeRef = useRef(0)

  // Find nearby places (with live distance) and rank them by taste + social
  // affinity + proximity. Focused on restaurants & cafés.
  const findRanked = useCallback(
    (lat, lon, radiusMeters = 600) => {
      if (!NEARBY_PLACES || !lat || !lon) return []
      const withDistance = NEARBY_PLACES.map((place) => ({
        ...place,
        distance: getDistance(lat, lon, place.lat, place.lon),
      })).filter((p) => p.distance <= radiusMeters)

      return rankRecommendations(withDistance, {
        userProfile: USER_PROFILE,
        onlyCategories: ['restaurant', 'cafe'],
      })
    },
    [getDistance]
  )

  useEffect(() => {
    if (!listening || !location) return

    const ranked = findRanked(location.latitude, location.longitude)
    setNearbyPlaces(ranked)

    // Don't whisper more than once per 45 seconds.
    const now = Date.now()
    if (now - lastWhisperTimeRef.current < 45000) return

    const triggers = detectTriggers(speed)
    if (triggers.length === 0) return

    // Best-scored recommendation we haven't surfaced yet.
    const rec = ranked.find((p) => !whisperHistoryRef.current.has(p.id))
    if (!rec) return

    const bestTrigger = triggers.sort((a, b) => b.weight - a.weight)[0]
    const dist = distLabel(rec.distance)

    const whisper = {
      id: `live-${rec.id}-${now}`,
      unread: true,
      trigger: bestTrigger.type,
      timestamp: now,
      time: 'Just now',
      timeGroup: 'Today',
      location: locationName?.full || null,
      message: rec.whisperMessage || `${rec.name} is ${dist} from here — worth a look.`,
      venue: {
        emoji: rec.emoji || '📍',
        name: rec.name,
        meta: rec.meta || rec.type,
        dist,
        lat: rec.lat,
        lon: rec.lon,
      },
      context: `${bestTrigger.type.label} · ${dist} away · ${rec.tastePct}% taste match · ${rec.social.blurb}`,
      tastePct: rec.tastePct,
      social: rec.social,
      recommendation: rec,
      action: 'Take me there',
      isLive: true,
    }

    setCurrentWhisper(whisper)
    whisperHistoryRef.current.add(rec.id)
    lastWhisperTimeRef.current = now
  }, [location?.latitude, location?.longitude, speed, listening, locationName, findRanked])

  const dismissWhisper = useCallback(() => {
    setCurrentWhisper(null)
  }, [])

  return { nearbyPlaces, currentWhisper, dismissWhisper }
}
