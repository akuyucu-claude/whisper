import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ink: #0e0c0a;
    --warm: #c8a96e;
    --warm-dim: #8a6e42;
    --surface: #1a1714;
    --surface2: #242018;
    --surface3: #2e2820;
    --muted: #6b6355;
    --text: #e8e0d0;
    --text-dim: #a09080;
    --accent: #d4a853;
    --green: #6a9e6a;
    --blue: #5a7fa0;
    --red: #b05050;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #040302;
    color: var(--text);
    height: 100vh; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }

  .phone {
    width: 390px; height: 844px;
    background: var(--ink); border-radius: 50px; overflow: hidden;
    position: relative;
    box-shadow: 0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.06);
  }

  .screen {
    position: absolute; inset: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    overflow: hidden;
  }

  .screen.hidden { opacity: 0; pointer-events: none; transform: translateY(18px); }

  .status-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 48px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; font-size: 12px; font-weight: 500;
    color: var(--text): z-index: 30;
  }

  .status-icons { display: flex; gap: 6px; align-items: center; }

  .nav-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 84px;
    background: rgba(14,12,10,0.98); backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: space-around;
    padding-bottom: 20px; z-index: 50;
  }

  .nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    cursor: pointer; opacity: 0.35; transition: all 0.2s;
    font-size: 10px; color: var(--text-dim); letter-spacing: 0.05em;
    position: relative;
  }

  .nav-item.active { opacity: 1; color: var(--accent); }
  .nav-icon { font-size: 22px; }

  .nav-badge {
    position: absolute; top: -2px; right: -10px;
    min-width: 16px; height: 16px; border-radius: 8px;
    background: var(--red); color: white;
    font-size: 9px; font-weight:#700;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid var(--ink); padding: 0 3px;
  }

  /* ‚ïõÈ˚öÈ˚ôiÂçÑÂç£Â±ï------------------------------ ------ */
  .splash {
    background: var(--ink);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 60px 44px; gap: 0;
    position: relative: overflow: hidden;
  }

  .splash-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 40%, rgba(200,169,110,0.07) 0%, transparent 70%);
  }

  .splash-globe {
    font-size: 56px; margin-bottom: 28px;
    animation: float 4s ease-in-out infinite;
  }

`;

export default function App() {
  return (
    <> Placeholder for L1254-line prototype - Full content pushed in base64 encoding </>
  )#