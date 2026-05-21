import { INSIGHTS, TAGS } from '../data/whispers'

export default function TasteProfile({ totalPlaces, onStart }) {
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="step-label">✦ Taste Profile Ready</div>
        <div className="screen-title" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:300, lineHeight:1.2 }}>
          Here's what<br />Whisper knows
        </div>
        <div style={{ fontSize:13, color:"var(--text-dim)", marginTop:8 }}>
          Built from {totalPlaces} places. Works everywhere you go.
        </div>
      </div>

      <div className="insight-grid">
        {INSIGHTS.map((ins,i) => (
          <div key={i} className="insight-card">
            <div className="insight-icon">{ins.icon}</div>
            <div className="insight-title">{ins.title}</div>
            <div className="insight-value">{ins.value}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:10 }}>
        Taste fingerprint
      </div>
      <div className="taste-tags">
        {TAGS.map(t => <span key={t.t} className={`taste-tag ${t.s ? "strong" : ""}`}>{t.t}</span>)}
      </div>

      <div className="ai-insight">
        <div className="ai-insight-label">Whisper's read on you</div>
        <div className="ai-insight-text">
          "You favour places with a strong local identity over novelty — and you carry that taste wherever you travel."
        </div>
      </div>

      <button className="continue-btn ready" style={{ marginBottom:40 }}
        onClick={onStart}>
        Start exploring anywhere →
      </button>
    </div>
  )
}
