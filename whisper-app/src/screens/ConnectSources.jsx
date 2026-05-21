export default function ConnectSources({ sources, sourceStates, onConnect, totalPlaces, progress, canContinue, onContinue }) {
  return (
    <div className="connect-screen">
      <div className="screen-header">
        <div className="step-label">Step 1 · Your Taste History</div>
        <div className="screen-title">Connect your<br />existing likes</div>
        <div className="screen-sub">Whisper learns from places you've already loved — everywhere you've ever been.</div>
      </div>
      <div className="source-list">
        {sources.map(src => {
          const st = sourceStates[src.id]
          return (
            <div key={src.id} className={`source-card ${st === 'connected' ? 'connected' : st === 'connecting' ? 'connecting' : ''}`} onClick={() => onConnect(src)}>
              <div className="source-icon" style={{ background: src.bg }}>{src.icon}</div>
              <div className="source-info">
                <div className="source-name">{src.name}</div>
                <div className="source-desc">{src.desc}</div>
                {st === 'connected' && <div className="source-count">✓ Imported {src.count}</div>}
              </div>
              <div className="source-status">
                {!st && <span style={{ color:"var(--muted)", fontSize:13 }}>+ Connect</span>}
                {st === 'connecting' && <div className="spinner" />}
                {st === 'connected' && "✅"}
              </div>
            </div>
          )
        })}
        {totalPlaces > 0 && (
          <div className="connect-progress">
            <div className="progress-header"><span>Taste profile building…</span><span style={{ color:"var(--accent)" }}>{Math.round(progress)}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width:`${progress}%` }} /></div>
            <div className="signal-summary">
              <div className="signal-item"><div className="signal-val">{totalPlaces}</div><div className="signal-label">Places</div></div>
              <div className="signal-item"><div className="signal-val">{Math.floor(Object.values(sourceStates).filter(s => s === 'connected').length * 30)}+</div><div className="signal-label">Signals</div></div>
              <div className="signal-item"><div className="signal-val">{Object.values(sourceStates).filter(s => s === 'connected').length}</div><div className="signal-label">Sources</div></div>
            </div>
          </div>
        )}
      </div>
      <button className={`continue-btn ${canContinue ? 'ready' : ''}`} onClick={() => canContinue && onContinue()}>
        {canContinue ? "Build my taste profile →" : "Connect at least one source"}
      </button>
    </div>
  )
}
