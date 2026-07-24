import WhisperCard from '../components/WhisperCard'

const PINS = [
  { top:140, left:90 },
  { top:230, left:280 },
  { top:360, left:110, active:true },
  { top:120, left:240 },
  { top:280, left:60 },
]

export default function MapView({
  listening,
  onListeningChange,
  activeWhisper,
  onWhisperDismiss,
  onVenueOpen,
  onMaybeLater,
  isSpeaking,
  spokenVenue,
  location,
  locationName,
  nearbyPlaces = [],
}) {
  const now = new Date()
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
  const locStr = locationName?.full || (location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Locating...')

  // Build chips from ranked recommendations (best taste/social match first).
  const chips = nearbyPlaces.length > 0
    ? nearbyPlaces.slice(0, 5).map(p => ({
        rec: p,
        emoji: p.emoji,
        name: p.name.replace(/^A /, ''),
        dist: `${Math.round(p.distance)}m`,
        match: p.tastePct,
        hl: p.scores?.total > 0.62,
      }))
    : [
        { emoji: "☕", name: "small roastery", dist: "120m", match: 92, hl: true },
        { emoji: "🫕", name: "family kitchen", dist: "210m", match: 95 },
        { emoji: "🐟", name: "neighbourhood balıkçı", dist: "340m", match: 90 },
        { emoji: "🍶", name: "natural wine bar", dist: "180m", match: 88 },
      ]

  return (
    <div className="map-screen">
      <div className="map-area">
        {/* SVG map */}
        <svg className="map-svg" viewBox="0 0 390 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:"rgba(90,127,160,0.15)", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"rgba(90,127,160,0.05)", stopOpacity:1}} />
            </linearGradient>
          </defs>
          <path d="M 280 20 Q 300 80 290 140 Q 280 200 295 260 Q 285 320 300 400 Q 310 450 320 500"
                stroke="url(#waterGrad)" strokeWidth="28" fill="none" opacity="0.6" />
          <path d="M 0 60 Q 80 50 160 70 Q 240 90 320 80 L 390 85"
                stroke="rgba(200,169,110,0.07)" strokeWidth="18" fill="none" />
          <path d="M 0 200 L 200 180 Q 280 175 390 195"
                stroke="rgba(200,169,110,0.07)" strokeWidth="20" fill="none" />
          <path d="M 30 320 Q 100 310 180 330 Q 260 350 390 340"
                stroke="rgba(200,169,110,0.07)" strokeWidth="16" fill="none" />
          <rect x="40" y="100" width="85" height="65" fill="rgba(28,24,18,0.7)" stroke="rgba(200,169,110,0.05)" strokeWidth="1" rx="4" />
          <rect x="160" y="100" width="120" height="50" fill="rgba(28,24,18,0.7)" stroke="rgba(200,169,110,0.05)" strokeWidth="1" rx="4" />
          <rect x="60" y="210" width="100" height="75" fill="rgba(28,24,18,0.7)" stroke="rgba(200,169,110,0.05)" strokeWidth="1" rx="4" />
          <rect x="220" y="220" width="95" height="60" fill="rgba(28,24,18,0.7)" stroke="rgba(200,169,110,0.05)" strokeWidth="1" rx="4" />
          <rect x="30" y="340" width="135" height="65" fill="rgba(28,24,18,0.7)" stroke="rgba(200,169,110,0.05)" strokeWidth="1" rx="4" />
        </svg>

        <div className="discovery-circle" style={{ top: 242, left: 162, width: 140, height: 140, transform: 'translate(-50%, -50%)' }} />
        <div className="user-dot" style={{ top: 242, left: 162 }} />

        {PINS.map((p,i) => (
          <div key={i} className={`venue-pin ${p.active ? 'active' : ''}`}
            style={{ top:p.top, left:p.left }} onClick={onVenueOpen} />
        ))}

        <div className="map-header">
          <div>
            <div className="map-title">{locationName?.short || 'Somewhere new'}</div>
            <div className="map-location">📍 {locStr} · {timeStr}</div>
          </div>
          <div className={`airpod-btn ${listening ? 'active' : ''}`} onClick={() => onListeningChange(v => !v)}>
            🎧
            {listening && <div className="live-dot" />}
          </div>
        </div>

        {/* Audio status bar — shows what AirPods are doing */}
        {listening && (
          <div className="audio-status-bar visible">
            {isSpeaking ? (
              <>
                <span style={{fontSize: 11, color: 'var(--accent)'}}>Speaking: {spokenVenue}</span>
                <div className="waveform speaking">
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                </div>
              </>
            ) : (
              <>
                <span style={{fontSize: 11}}>Listening · Whisper will speak when something's near</span>
                <div className="waveform">
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                </div>
              </>
            )}
          </div>
        )}

        {activeWhisper && (
          <WhisperCard
            whisper={activeWhisper}
            onDismiss={onWhisperDismiss}
            onVenueOpen={onVenueOpen}
            onMaybeLater={onMaybeLater}
          />
        )}
      </div>

      <div className="bottom-shelf">
        <div className="shelf-label">Nearby · Ranked by your taste & people like you</div>
        <div className="nearby-scroll">
          {chips.map((n,i) => (
            <div key={i} className={`nearby-chip ${n.hl ? 'hl' : ''}`} onClick={() => onVenueOpen(n.rec)}>
              <span style={{ fontSize:18 }}>{n.emoji}</span>
              <div>
                <div className="chip-name">{n.name}</div>
                <div className="chip-dist">{n.dist} away{n.match != null ? ` · ${n.match}% match` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}