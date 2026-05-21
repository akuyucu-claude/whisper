import { useRef, useCallback, useState } from 'react'
import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'

export default function useWhisperAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [spokenVenue, setSpokenVenue] = useState(null)
  const cooldownRef = useRef(false)
  const soundRef = useRef(null)

  const playChime = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      })
    } catch (e) {}
  }, [])

  const speak = useCallback(
    (message, venueName) => {
      if (cooldownRef.current) return
      if (!message) return
      Speech.stop()
      playChime()
      setTimeout(() => {
        try {
          setIsSpeaking(true)
          setSpokenVenue(venueName)
          Speech.speak(message, {
            language: 'en', rate: 0.9, pitch: 1.0,
            onDone: () => {
              setIsSpeaking(false)
              setSpokenVenue(null)
              cooldownRef.current = true
              setTimeout(() => { cooldownRef.current = false }, 30000)
            },
            onError: (error) => {
              console.warn('Speech error:', error)
              setIsSpeaking(false)
              setSpokenVenue(null)
            },
          })
        } catch (error) {
          console.warn('Speech initialization error:', error)
          setIsSpeaking(false)
          setSpokenVenue(null)
        }
      }, 700)
    },
    [playChime]
  )

  const stop = useCallback(() => {
    Speech.stop()
    setIsSpeaking(false)
    setSpokenVenue(null)
  }, [])

  return { speak, stop, isSpeaking, spokenVenue }
}
