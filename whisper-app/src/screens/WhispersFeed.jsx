import { WHISPERS, FILTERS } from '../data/whispers'

export default function WhispersFeed({ filter, onFilterChange, readIds, onWhisperRead, onVenueOpen, unread }) {
  const groupedWhispers = () => {
    const groups = {}
    WHISPERS.forEach(w => {
      if (!groups[w.timeGroup]) groups[w.timeGroup] = []
      groups[w.timeGroup].push(w)
    })
    return groups
  }

  return (
    <div className="feed-screen">
      <div className="feed-header">
        <div className="feed-title">Whispers</div>
        <div className="feed-sub">Proactive. Contextual. Everywhere.</div>
      </div>
      <div className="feed-filters">
        {FILTERS.map(f => (
          <div key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => onFilterChange(f)}>{f}</div>
        ))}
      </div>
      <div className="feed-list">
        {Object.entries(groupedWhispers()).map(([group, whispers]) => (
          <div key={group}>
            <div className="time-group-header">{group}</div>
            {whispers.map((w, idx) => (
              <div key={w.id} className={`feed-item ${w.unread && !readIds.includes(w.id) ? 'unread' : ''}`}
                style={{ animationDelay:`${idx * 0.055}s` }}
                onClick={() => { onVenueOpen(); onWhisperRead(w.id); }}>
                <div className="fi-inner">
                  <div className="fi-top">
                    <div className="trigger-badge" style={{ background:w.trigger.bg, border:`1px solid ${w.trigger.bd}` }}>{w.trigger.icon}</div>
                    <div className="fi-meta"><div className="fi-trigger-name">{w.trigger.label}</div><div className="fi-time">{w.time}</div></div>
                    {w.unread && !readIds.includes(w.id) && <div className="unread-dot" />}
                  </div>
                  {w.location && <div className="fi-location-pill">📍 {w.location}</div>}
                  <div className="fi-message">{w.message}</div>
                  <div className="fi-venue-strip">
                    <div style={{ fontSize:20 }}>{w.venue.emoji}</div>
                    <div className="fi-venue-name">{w.venue.name}</div>
                    <div className="fi-venue-dist">{w.venue.dist}</div>
                  </div>
                </div>
                <div className="fi-context-bar">
                  <div style={{ fontSize:12, opacity:0.5 }}>🧠</div>
                  <div className="fi-context-text">{w.context}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
