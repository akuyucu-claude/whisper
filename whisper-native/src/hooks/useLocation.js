import { useState, useEffect, useRef, useCallback } from 'react'
import * as Location from 'expo-location'

export default function useLocation(enabled = true) {
  const [location, setLocation] = useState(null)
  const [speed, setSpeed] = useState(0)
  const [heading, setHeading] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [locationName, setLocationName] = useState(null)
  const watchRef = useRef(null)
  const prevRef = useRef(null)

  const getDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371000
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }, [])

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    const startWatching = async () => {
      try {
        const foreground = await Location.getForegroundPermissionsAsync()
        if (foreground.status !== 'granted') {
          setError('Location permission denied')
          setLoading(false)
          return
        }

        const unsubscribe = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords

            let calculatedSpeed = newLocation.coords.speed || 0
            if (prevRef.current && calculatedSpeed === 0) {
              const dt = (newLocation.timestamp - prevRef.current.timestamp) / 1000
              if (dt > 0) {
                const dist = getDistance(
                  prevRef.current.lat,
                  prevRef.current.lon,
                  latitude,
                  longitude
                )
                calculatedSpeed = dist / dt
              }
            }

            prevRef.current = {
              lat: latitude,
              lon: longitude,
              timestamp: newLocation.timestamp,
            }

            setLocation({ latitude, longitude })
            setSpeed(calculatedSpeed)
            setHeading(newLocation.coords.heading)
            setLoading(false)
            setError(null)
          }
        )

        watchRef.current = unsubscribe

        return () => {
          if (watchRef.current) {
            watchRef.current()
          }
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    startWatching()
  }, [enabled, getDistance])

  // Reverse geocode to get location name
  useEffect(() => {
    if (!location) return

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const result = await Location.reverseGeocodeAsync({
          latitude: location.latitude,
          longitude: location.longitude,
        })

        if (result.length > 0) {
          const addr = result[0]
          const city = addr.city || addr.region || ''
          const country = addr.country || ''

          setLocationName({
            short: city,
            full: city && country ? `${city}, ${country}` : city,
            raw: addr,
          })
        }
      } catch (err) {
        // Silently fail
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [location?.latitude?.toFixed(3), location?.longitude?.toFixed(3)])

  return {
    location,
    speed,
    heading,
    locationName,
    error,
    loading,
    getDistance,
  }
}