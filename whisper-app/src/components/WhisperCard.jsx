export default function WhisperCard({ whisper, onDismiss, onVenueOpen, onMaybeLater }) {
  return (
    <div className={`whisper-card ${whisper ? 'visible' : ''}`}>
      <div className="new-location-banner">
        <div className="nlb-icon">✦</div>
        <div className="nlb-text">
          First time in <span className="nlb-place">{whisper.location || 'this area'}</span> — Whisper is active
        </div>
      </div>
      <div className="wc-trigger">
        <div className="wc-trigger-icon" style={{ background: whisper.trigger.bg }}>
          {whisper.trigger.icon}
        </div>
        <div className="wc-trigger-label">{whisper.trigger.label}</div>
        <div className="wc-dismiss" onClick={onDismiss}>✕</div>
      </div>
      <div className="wc-message">{whisper.message}</div>
      <div className="wc-venue" onClick={onVenueOpen}>
        <div style={{ fontSize: 24 }}>{whisper.venue.emoji}</div>
        <div style={{ flex: 1 }}>
          <div className="wc-venue-name">{whisper.venue.name}</div>
          <div className="wc-venue-meta">{whisper.venue.meta}</div>
        </div>
        <div className="wc-venue-dist">{whisper.venue.dist} →</div>
      </div>
      <div className="wc-context"><span>🧠</span>{whisper.context}</div>
      <div className="wc-actions">
        <button className="wc-btn primary" onClick={onVenueOpen}>{whisper.action}</button>
        <button className="wc-btn ghost" onClick={onMaybeLater}>Maybe later</button>
      </div>
    </div>
  )
}
