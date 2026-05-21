import { useRef, useCallback, useState } from 'react'

export default function useWhisperAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [spokenVenue, setSpokenVenue] = useState(null)
  const utteranceRef = useRef(null)
  const cooldownRef = useRef(false)

  // Soft chime before speaking (Web Audio API)
  const playChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15) // E6
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.5)

      // Second tone for the "whisper" feel
      setTimeout(() => {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1100, ctx.currentTime)
        gain2.gain.setValueAtTime(0.05, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
        osc2.start(ctx.currentTime)
        osc2.stop(ctx.currentTime + 0.3)
      }, 200)
    } catch (e) {
      // Audio context not available, skip chime
    }
  }, [])

  // Speak a whisper message through AirPods/speaker
  const speak = useCallback((message, venueName) => {
    if (cooldownRef.current) return
    if (!('speechSynthesis' in window)) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Play attention chime first
    playChime()

    // Wait for chime, then speak
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 0.9     // Slightly slower for ambient feel
      utterance.pitch = 1.0
      utterance.volume = 0.85

      // Try to pick a natural-sounding voice
      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(v =>
        v.name.includes('Samantha') ||  // macOS/iOS
        v.name.includes('Karen') ||
        v.name.includes('Google UK English Female') ||
        v.name.includes('Microsoft Zira')
      ) || voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
        || voices.find(v => v.lang.startsWith('en'))

      if (preferred) utterance.voice = preferred

      utterance.onstart = () => {
        setIsSpeaking(true)
        setSpokenVenue(venueName)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setSpokenVenue(null)
        // Cooldown: don't speak again for 30 seconds
        cooldownRef.current = true
        setTimeout(() => { cooldownRef.current = false }, 30000)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setSpokenVenue(null)
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }, 700) // Wait for chime
  }, [playChime])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setSpokenVenue(null)
  }, [])

  return { speak, stop, isSpeaking, spokenVenue }
}