export default function VenueDetail({ onClose, venue }) {
  const rec = venue?.recommendation || venue

  // Dynamic render when we have a scored recommendation.
  if (rec && rec.scores) {
    const dist =
      rec.distance == null
        ? null
        : rec.distance < 1000
        ? `${Math.round(rec.distance)}m`
        : `${(rec.distance / 1000).toFixed(1)}km`

    return (
      <div className="venue-detail">
        <div className="venue-hero">
          {rec.emoji}
          <div className="venue-back" onClick={onClose}>←</div>
        </div>
        <div className="venue-body">
          <div className="venue-name">{rec.name}</div>
          <div className="venue-type">{rec.type}</div>
          <div className="venue-stats">
            <div className="stat"><div className="stat-val">⭐ {rec.rating}</div><div className="stat-label">Rating</div></div>
            <div className="stat"><div className="stat-val">{'·'.repeat(0) || ''}{'$'.repeat(rec.price || 2)}</div><div className="stat-label">Price</div></div>
            {dist && <div className="stat"><div className="stat-val">{dist}</div><div className="stat-label">Away</div></div>}
          </div>
          {rec.description && <div className="venue-desc">{rec.description}</div>}

          <div className="match-bar">
            <div className="match-label">Why this matches you</div>
            {rec.matchRows.map((m) => (
              <div key={m.k} className="match-row">
                <div className="match-key">{m.k}</div>
                <div className="match-track"><div className="match-fill" style={{ width: `${m.p}%` }} /></div>
                <div className="match-pct">{m.p}%</div>
              </div>
            ))}
          </div>

          {rec.social && (
            <div className="social-proof">
              <div className="social-proof-icon">👥</div>
              <div className="social-proof-text">
                {rec.social.lovers > 0 ? (
                  <><strong>{rec.social.lovers} people with taste like yours</strong> rated this {rec.social.avgRating}★</>
                ) : (
                  <>A fresh find — <strong>early ratings from people like you</strong> average {rec.social.avgRating}★</>
                )}
              </div>
            </div>
          )}

          <div className="why-card">
            <div className="why-label">Why Whisper sent this now</div>
            {rec.why.map((w, i) => (
              <div key={i} className="why-item">
                <div className="why-icon">{w.icon}</div>
                <div className="why-text"><span className="why-src">{w.src} · </span>{w.text}</div>
              </div>
            ))}
          </div>

          <div>
            {(rec.tags || []).map((t) => (
              <span key={t} className="place-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="cta-bar">
          <button className="cta-primary">Take me there</button>
          <div className="cta-secondary">🔖</div>
        </div>
      </div>
    )
  }

  // Fallback static content.
  return (
    <div className="venue-detail">
      <div className="venue-hero">
        🍷
        <div className="venue-back" onClick={onClose}>←</div>
      </div>
      <div className="venue-body">
        <div className="venue-name">Domaine Leflaive Route</div>
        <div className="venue-type">Winery · Côte de Nuits, Burgundy</div>
        <div className="venue-stats">
          <div className="stat"><div className="stat-val">⭐ 4.8</div><div className="stat-label">Rating</div></div>
          <div className="stat"><div className="stat-val">Family</div><div className="stat-label">Run</div></div>
          <div className="stat"><div className="stat-val">Since '68</div><div className="stat-label">Est.</div></div>
        </div>
        <div className="venue-desc">
          Hand-harvested Pinot Noir and Chardonnay from a single family since 1968. No distributor, no online shop — you find them by stopping when you see the hand-painted sign, or when Whisper tells you to turn left.
        </div>

        <div className="match-bar">
          <div className="match-label">Taste match</div>
          {[{k:"Wine profile",p:96},{k:"Vibe",p:91},{k:"Discovery type",p:98}].map(m => (
            <div key={m.k} className="match-row">
              <div className="match-key">{m.k}</div>
              <div className="match-track"><div className="match-fill" style={{width:`${m.p}%`}} /></div>
              <div className="match-pct">{m.p}%</div>
            </div>
          ))}
        </div>

        <div className="why-card">
          <div className="why-label">Why Whisper sent this now</div>
          <div className="why-item">
            <div className="why-icon">✦</div>
            <div className="why-text"><span className="why-src">New location · </span>First time Whisper detected you in Burgundy</div>
          </div>
          <div className="why-item">
            <div className="why-icon">🗺️</div>
            <div className="why-text"><span className="why-src">Google Maps · </span>You have 6 wineries saved across France & Turkey</div>
          </div>
          <div className="why-item">
            <div className="why-icon">📸</div>
            <div className="why-text"><span className="why-src">Instagram · </span>You saved 4 posts tagged at small family domaines</div>
          </div>
          <div className="why-item">
            <div className="why-icon">🕯️</div>
            <div className="why-text"><span className="why-src">Taste signal · </span>"Hidden door" & "local-only" are strong in your profile</div>
          </div>
        </div>

        <div>
          {["No online shop","Walk-in only","Hand-harvested","Family run"].map(t => (
            <span key={t} className="place-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="cta-bar">
        <button className="cta-primary">Navigate there</button>
        <div className="cta-secondary">🔖</div>
      </div>
    </div>
  )
}
