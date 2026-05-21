export default function NavBar({ activeTab, onTabChange, unread, onFeedOpen }) {
  return (
    <div className="nav-bar">
      <div className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => onTabChange('map')}>
        <span className="nav-icon">🗺</span>Explore
      </div>
      <div className={`nav-item ${activeTab === 'feed' ? 'active' : ''}`}
        onClick={() => { onTabChange('feed'); onFeedOpen(); }}>
        <span className="nav-icon">💬</span>Whispers
        {unread > 0 && <div className="nav-badge">{unread}</div>}
      </div>
      <div className="nav-item"><span className="nav-icon">🔖</span>Saved</div>
      <div className="nav-item"><span className="nav-icon">👤</span>Profile</div>
    </div>
  )
}
