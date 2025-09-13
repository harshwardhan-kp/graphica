import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CLUBS, clubImageSrc } from './data/clubs.js';
import { SKY_IMAGES } from './data/sky.js';
import HomeFeed from './components/HomeFeed.jsx';
import ForkChan from './pages/ForkChan.jsx';

function App() {
  const navItems = ['Home', 'Nest', 'Sky', 'Chats', 'Barter', 'Insights'];
  const [activeNav, setActiveNav] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (location.pathname.startsWith('/nest')) setActiveNav('Nest');
    else if (location.pathname.startsWith('/sky')) setActiveNav('Sky');
    else if (location.pathname.startsWith('/fork-chan')) setActiveNav('Fork Chan');
    else if (location.pathname === '/') setActiveNav('Home');
  }, [location.pathname]);

  const isSky = location.pathname.startsWith('/sky');
  const isHome = location.pathname === '/';
  const isForkChan = location.pathname.startsWith('/fork-chan');


  useEffect(() => {
    if (location.pathname === '/' && activeNav !== 'Home') {
      setActiveNav('Home');
    }
  }, [location.pathname]);

  return (
    <div className={`app-container ${isSky ? 'sky-mode' : ''} ${isHome ? 'home-mode' : ''}`}>
      <aside className="left-column">
        <div className="nav">
          <div className="logo">THE NEST</div>
        </div>
        <nav className="side-nav" aria-label="Primary">
          <ul>
            {navItems.map((label) => (
              <li key={label}>
                <button
                  className={`nav-item ${activeNav === label ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav(label);
                    if (label === 'Home') navigate('/');
                    else if (label === 'Nest') navigate('/nest');
                    else if (label === 'Sky') navigate('/sky');
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button 
                className={`nav-item ${activeNav === 'Fork Chan' ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav('Fork Chan');
                  navigate('/fork-chan');
                }}
              >
                Fork Chan
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="middle-column">
        <div className="nav">
          {isForkChan ? (
            <div className="forkchan-banner" role="note" aria-live="polite">
              <strong>Don't Stay here, If you can't handle the Heat!!!</strong>
            </div>
          ) : (
            <div className="stories" aria-label="Club profiles">
              {CLUBS.map((name) => (
                <button
                  key={name}
                  className="story"
                  title={name}
                  onClick={() => navigate('/nest')}
                >
                  <img
                    src={clubImageSrc(name)}
                    alt={`${name} profile`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/nest" element={<NestPage />} />
          <Route path="/sky" element={<SkyPage />} />
          <Route path="/fork-chan" element={<ForkChan />} />
        </Routes>
      </main>

      <aside className="right-column">
        <div className="nav">
          <div className="search-bar">
            <input type="text" placeholder="SEARCH" />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;

function NestPage() {
  const clubs = CLUBS;

  const handleFromName = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .replace(/^_+|_+$/g, '');

  const placeholder =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160">` +
        `<rect width="100%" height="100%" fill="#f3f3f3" stroke="#000"/>` +
        `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ` +
        `font-family="monospace" font-size="14" fill="#666">NO IMAGE</text>` +
      `</svg>`
    );

  return (
    <section className="nest">
      <header className="nest-header">
        <h2>NEST</h2>
        <p className="subtitle">OFFICIAL COLLEGE PAGES</p>
      </header>
      <div className="nest-grid">
        {clubs.map((name) => (
          <article key={name} className="card">
            <img
              className="avatar"
              src={clubImageSrc(name)}
              alt={`${name} profile`}
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
            />
            <div className="card-head">
              <h3>{name}</h3>
            </div>
            <div className="card-foot">
              <button className="view-btn">VIEW</button>
              <span className="handle">@{handleFromName(name)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkyPage() {
  return (
    <section className="sky">
      <header className="nest-header">
        <h2>SKY</h2>
        <p className="subtitle">EXPLORE EVERYTHING</p>
      </header>
      <div className="sky-grid">
        {SKY_IMAGES.map((src, i) => (
          <div key={i} className="sky-cell">
            <img src={src} alt={`post ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
