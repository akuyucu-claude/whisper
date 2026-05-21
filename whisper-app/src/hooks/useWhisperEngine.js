import { useState, useEffect, useRef, useCallback } from 'react'
import { T } from '../data/whispers'
import { NEARBY_PLACES } from '../data/places'

// Determine current context triggers
function detectTriggers(speed, location, locationName, timeOfDay) {
  const triggers = []
  const hour = new Date().getHours()

  // Slow walk: speed < 1.2 m/s for a sustained period
  if (speed !== null && speed < 1.2 && speed >= 0) {
    triggers.push({ type: T.PACE, weight: speed < 0.5 ? 0.9 : 0.6 })
  }

  // Golden hour: sunrise/sunset windows
  if ((hour >= 6 && hour <= 7) || (hour >= 17 && hour <= 19)) {
    triggers.push({ type: T.TIME, weight: 0.7 })
  }

  // Late night context
  if (hour >= 21 || hour <= 4) {
    triggers.push({ type: T.CONTEXT, weight: 0.5 })
  }

  // Stopped (vehicle or standing still)
  if (speed !== null && speed < 0.3) {
    triggers.push({ type: T.DRIVE, weight: 0.4 })
  }

  return triggers
}

export default function useWhisperEngine({ location, speed, locationName, listening, getDistance }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([])
  const [currentWhisper, setCurrentWhisper] = useState(null)
  const whisperHistoryRef = useRef(new Set())  // Track which places we've whispered about
  const lastWhisperTimeRef = useRef(0)

  // Find nearby places from our database
  const findNearby = useCallback((lat, lon, radiusMeters = 500) => {
    if (!NEARBY_PLACES || !lat || !lon) return []

    return NEARBY_PLACES
      .map(place => ({
        ...place,
        distance: getDistance(lat, lon, place.lat, place.lon),
      }))
      .filter(p => p.distance <= radiusMeters)
      .sort((a, b) => a.distance - b.distance)
  }, [getDistance])

  // Main engine loop: check for whisper opportunities
  useEffect(() => {
    if (!listening || !location) return

    const nearby = findNearby(location.latitude, location.longitude)
    setNearbyPlaces(nearby)

    // Don't whisper more than once per 45 seconds
    const now = Date.now()
    if (now - lastWhisperTimeRef.current < 45000) return

    // Detect current triggers
    const triggers = detectTriggers(speed, location, locationName)
    if (triggers.length === 0) return

    // Find best place to whisper about (not already whispered)
    const candidate = nearby.find(p => !whisperHistoryRef.current.has(p.id))
    if (!candidate) return

    // Pick the strongest trigger
    const bestTrigger = triggers.sort((a, b) => b.weight - a.weight)[0]

    // Build the whisper
    const distLabel = candidate.distance < 100
      ? `${Math.round(candidate.distance)}m`
      : candidate.distance < 1000
      ? `${Math.round(candidate.distance)}m`
      : `${(candidate.distance / 1000).toFixed(1)}km`

    const whisper = {
      id: `live-${candidate.id}-${now}`,
      unread: true,
      trigger: bestTrigger.type,
      timestamp: now,
      time: 'Just now',
      timeGroup: 'Today',
      location: locationName?.full || null,
      message: candidate.whisperMessage || `There's a place nearby you might like — ${candidate.name}, ${distLabel} from here.`,
      venue: {
        emoji: candidate.emoji || '📍',
        name: candidate.name,
        meta: candidate.meta || candidate.type,
        dist: distLabel,
        lat: candidate.lat,
        lon: candidate.lon,
      },
      context: `${bestTrigger.type.label} · ${distLabel} away · ${candidate.matchReason || 'Matches your taste profile'}`,
      action: 'Take me there',
      isLive: true,
    }

    setCurrentWhisper(whisper)
    whisperHistoryRef.current.add(candidate.id)
    lastWhisperTimeRef.current = now
  }, [location?.latitude, location?.longitude, speed, listening, locationName, findNearby])

  const dismissWhisper = useCallback(() => {
    setCurrentWhisper(null)
  }, [])

  return { nearbyPlaces, currentWhisper, dismissWhisper }
}