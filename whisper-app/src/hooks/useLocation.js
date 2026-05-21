import { useState, useEffect, useRef, useCallback } from 'react'

export default function useLocation(enabled = true) {
  const [location, setLocation] = useState(null)
  const [speed, setSpeed] = useState(0)
  const [heading, setHeading] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [locationName, setLocationName] = useState(null)
  const watchRef = useRef(null)
  const prevRef = useRef(null)

  // Calculate distance between two coords in meters
  const getDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371000
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }, [])

  useEffect(() => {
    if (!enabled || !navigator.geolocation) {
      if (!navigator.geolocation) setError('Geolocation not supported')
      setLoading(false)
      return
    }

    const handlePosition = (position) => {
      const { latitude, longitude, speed: rawSpeed, heading: rawHeading } = position.coords

      // Calculate speed from position delta if browser doesn't provide it
      let calculatedSpeed = rawSpeed || 0
      if (prevRef.current && calculatedSpeed === 0) {
        const dt = (position.timestamp - prevRef.current.timestamp) / 1000
        if (dt > 0) {
          const dist = getDistance(prevRef.current.lat, prevRef.current.lon, latitude, longitude)
          calculatedSpeed = dist / dt
        }
      }

      prevRef.current = { lat: latitude, lon: longitude, timestamp: position.timestamp }

      setLocation({ latitude, longitude })
      setSpeed(calculatedSpeed)
      setHeading(rawHeading)
      setLoading(false)
      setError(null)
    }

    const handleError = (err) => {
      setError(err.message)
      setLoading(false)
    }

    // Start continuous tracking
    watchRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      }
    )

    return () => {
      if (watchRef.current !== null) {
        navigator.geolocation.clearWatch(watchRef.current)
      }
    }
  }, [enabled, getDistance])

  // Reverse geocode to get location name (throttled)
  useEffect(() => {
    if (!location) return
    // Use a simple reverse geocoding approach via Nominatim (free, no API key)
    const controller = new AbortController()
    const timer = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&zoom=14`,
        { signal: controller.signal, headers: { 'Accept-Language': 'en' } }
      )
        .then(r => r.json())
        .then(data => {
          const addr = data.address || {}
          const city = addr.city || addr.town || addr.village || addr.hamlet || ''
          const country = addr.country || ''
          const neighbourhood = addr.neighbourhood || addr.suburb || ''
          setLocationName({
            short: neighbourhood ? `${neighbourhood}, ${city}` : city,
            full: city && country ? `${city}, ${country}` : data.display_name?.split(',').slice(0,2).join(','),
            raw: addr,
          })
        })
        .catch(() => {})
    }, 2000) // Wait 2s before geocoding to avoid spam

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [location?.latitude?.toFixed(3), location?.longitude?.toFixed(3)]) // Only re-geocode on significant moves

  return {
    location,
    speed,        // m/s — < 1.2 is slow walk, < 0.5 is stopped
    heading,
    locationName,
    error,
    loading,
    getDistance,
  }
}