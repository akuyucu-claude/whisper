import { useState, useEffect, useRef } from 'react'
import Splash from './screens/Splash'
import ConnectSources from './screens/ConnectSources'
import TasteProfile from './screens/TasteProfile'
import MapView from './screens/MapView'
import WhispersFeed from './screens/WhispersFeed'
import VenueDetail from './components/VenueDetail'
import NavBar from './components/NavBar'
import StatusBar from './components/StatusBar'
import { WHISPERS, SOURCES } from './data/whispers'
import useLocation from './hooks/useLocation'
import useWhisperAudio from './hooks/useWhisperAudio'
import useWhisperEngine from './hooks/useWhisperEngine'
import { generateNearbyPlaces } from './data/places'

export default function App() {
  const [view, setView] = useState('splash')
  const [tab, setTab] = useState('map')
  const [showVenue, setShowVenue] = useState(false)
  const [listening, setListening] = useState(true)
  const [activeWhisper, setActiveWhisper] = useState(null)
  const [sourceStates, setSourceStates] = useState({})
  const [totalPlaces, setTotalPlaces] = useState(0)
  const [filter, setFilter] = useState('All')
  const [readIds, setReadIds] = useState([])
  const [showReasonPicker, setShowReasonPicker] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [liveWhispers, setLiveWhispers] = useState([])
  const [selectedVenue, setSelectedVenue] = useState(null)
  const placesGenerated = useRef(false)

  // Real location tracking (activates on main screen)
  const { location, speed, locationName, error: locError, loading: locLoading, getDistance } = useLocation(view === 'main')

  // Audio engine — speaks through AirPods/speaker
  const { speak, stop: stopSpeaking, isSpeaking, spokenVenue } = useWhisperAudio()

  // Whisper trigger engine — fires when location + context align
  const { nearbyPlaces, currentWhisper, dismissWhisper } = useWhisperEngine({
    location,
    speed,
    locationName,
    listening: listening && view === 'main',
    getDistance,
  })

  // Generate places around user once we have GPS
  useEffect(() => {
    if (location && !placesGenerated.current) {
      generateNearbyPlaces(location.latitude, location.longitude)
      placesGenerated.current = true
    }
  }, [location])

  // When engine fires a whisper → show card + speak through AirPods
  useEffect(() => {
    if (currentWhisper && listening) {
      setActiveWhisper(currentWhisper)
      setLiveWhispers(prev => [currentWhisper, ...prev])
      setTimeout(() => {
        speak(currentWhisper.message, currentWhisper.venue.name)
      }, 500)
    }
  }, [currentWhisper, listening, speak])

  // Fallback: demo whisper if no real location after 5s
  useEffect(() => {
    if (view === 'main' && tab === 'map' && listening && !activeWhisper) {
      const t = setTimeout(() => {
        if (!activeWhisper) setActiveWhisper(WHISPERS[1])
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [view, tab, listening, activeWhisper])

  const connected = Object.values(sourceStates).filter(s => s === 'connected').length
  const progress = (connected / SOURCES.length) * 100
  const canContinue = connected >= 1
  const allWhispers = [...liveWhispers, ...WHISPERS]
  const unread = allWhispers.filter(w => w.unread && !readIds.includes(w.id)).length

  const connectSource = (src) => {
    if (sourceStates[src.id]) return
    setSourceStates(p => ({ ...p, [src.id]: 'connecting' }))
    setTimeout(() => {
      setSourceStates(p => ({ ...p, [src.id]: 'connected' }))
      const counts = { google: 47, instagram: 83, foursquare: 29, tripadvisor: 14 }
      setTotalPlaces(p => p + counts[src.id])
    }, src.delay)
  }

  const openVenue = (venue) => {
    setSelectedVenue(venue || activeWhisper || null)
    setShowVenue(true)
    setActiveWhisper(null)
    stopSpeaking()
  }

  const handleMaybeLater = () => { setShowReasonPicker(true); stopSpeaking() }

  const handleReasonSelected = (reason) => {
    setShowReasonPicker(false)
    setToastMessage('Got it, learning...')
    dismissWhisper()
    setTimeout(() => { setToastMessage(''); setActiveWhisper(null) }, 2000)
  }

  return (
    <div className="phone-shell">
    <div className="phone">
      <div className="dynamic-island" />
      <div className="home-indicator" />

      {view === 'splash' && (
        <div className="screen visible">
          <StatusBar />
          <Splash onBegin={() => setView('connect')} />
        </div>
      )}

      {view === 'connect' && (
        <div className="screen visible">
          <StatusBar />
          <ConnectSources
            sources={SOURCES}
            sourceStates={sourceStates}
            onConnect={connectSource}
            totalPlaces={totalPlaces}
            progress={progress}
            canContinue={canContinue}
            onContinue={() => setView('profile')}
          />
        </div>
      )}

      {view === 'profile' && (
        <div className="screen visible">
          <StatusBar />
          <TasteProfile totalPlaces={totalPlaces} onStart={() => setView('main')} />
        </div>
      )}

      {view === 'main' && tab === 'map' && !showVenue && (
        <div className="screen visible">
          <StatusBar />
          <MapView
            listening={listening}
            onListeningChange={setListening}
            activeWhisper={activeWhisper}
            onWhisperDismiss={() => { setActiveWhisper(null); stopSpeaking() }}
            onVenueOpen={openVenue}
            onMaybeLater={handleMaybeLater}
            isSpeaking={isSpeaking}
            spokenVenue={spokenVenue}
            location={location}
            locationName={locationName}
            nearbyPlaces={nearbyPlaces}
          />
        </div>
      )}

      {view === 'main' && tab === 'feed' && !showVenue && (
        <div className="screen visible">
          <StatusBar />
          <WhispersFeed
            whispers={allWhispers}
            filter={filter}
            onFilterChange={setFilter}
            readIds={readIds}
            onWhisperRead={(id) => setReadIds(p => [...p, id])}
            onVenueOpen={() => { setSelectedVenue(null); setShowVenue(true) }}
            onTabChange={(t) => setTab(t)}
            unread={unread}
          />
        </div>
      )}

      {showVenue && (
        <div className="screen visible">
          <StatusBar />
          <VenueDetail onClose={() => setShowVenue(false)} venue={selectedVenue} />
        </div>
      )}

      <div className={`reason-overlay ${showReasonPicker ? 'visible' : ''}`} onClick={() => setShowReasonPicker(false)}>
        <div className="reason-sheet" onClick={e => e.stopPropagation()}>
          <div className="reason-title">Why skip this one?</div>
          <div className="reason-options">
            <div className="reason-option" onClick={() => handleReasonSelected('Wrong moment')}>⏰ Wrong moment</div>
            <div className="reason-option" onClick={() => handleReasonSelected('Not my vibe')}>💫 Not my vibe</div>
            <div className="reason-option" onClick={() => handleReasonSelected('Too far')}>📍 Too far</div>
          </div>
        </div>
      </div>

      {toastMessage && <div className="toast">{toastMessage}</div>}
      {view === 'main' && locLoading && <div className="toast" style={{ background: 'rgba(90,127,160,0.9)' }}>📍 Getting your location...</div>}

      {view === 'main' && !showVenue && (
        <NavBar
          activeTab={tab}
          onTabChange={setTab}
          unread={unread}
          onFeedOpen={() => setReadIds(allWhispers.map(w => w.id))}
        />
      )}
    </div>
    </div>
  )
}