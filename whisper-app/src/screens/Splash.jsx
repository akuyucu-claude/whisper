export default function Splash({ onBegin }) {
  return (
    <div className="splash">
      <div className="splash-bg" />
      <div className="splash-globe">🌍</div>
      <div className="splash-logo">Whisper</div>
      <div className="splash-tagline">
        Your taste, everywhere you go.<br />Ambient. Proactive. Boundless.
      </div>

      <div className="splash-proof">
        <div className="proof-item">
          <div className="proof-icon">🚶</div>
          <div className="proof-text"><strong>Reads your moment.</strong> Slow walk, golden hour, rain, just finished eating — Whisper knows when to speak.</div>
        </div>
        <div className="proof-item">
          <div className="proof-icon">✦</div>
          <div className="proof-text"><strong>Works anywhere on earth.</strong> Istanbul backstreets, Burgundy country roads, a Cappadocian village — no city limits.</div>
        </div>
        <div className="proof-item">
          <div className="proof-icon">🧠</div>
          <div className="proof-text"><strong>Learns from what you love.</strong> Built from your Google Maps stars, Instagram saves, Foursquare history.</div>
        </div>
      </div>

      <button className="splash-btn" onClick={onBegin}>Begin →</button>
      <div className="splash-anywhere">
        <span>📍</span> No city required. Works the moment you move.
      </div>
    </div>
  )
}
