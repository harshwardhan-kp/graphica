// This is our main app component that handles routing and layout
// It shows a three-column design (like Instagram) with:
// - Left: Navigation and branding
// - Middle: Main content (hero, Nest, or Sky pages)
// - Right: Search and future features

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CLUBS, clubImageSrc } from './data/clubs.js';
import { SKY_IMAGES } from './data/sky.js';

// Words that animate in the hero section's "SHARE YOUR ___" text
const words = ['STORIES', 'MOMENTS', 'MEMORIES', 'IDEAS'];

function App() {
  const [typeText, setTypeText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navItems = ['Nest', 'Sky', 'Chats', 'Barter', 'Insights'];
  const [activeNav, setActiveNav] = useState(navItems[0]);
  const navigate = useNavigate();
  const location = useLocation();

  // Keep active state in sync with route
  useEffect(() => {
    if (location.pathname.startsWith('/nest')) setActiveNav('Nest');
    else if (location.pathname.startsWith('/sky')) setActiveNav('Sky');
    else if (location.pathname === '/') setActiveNav(navItems[0]);
  }, [location.pathname]);

  useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypeText(currentWord.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
        if (letterIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      } else {
        setTypeText(currentWord.substring(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);
        if (letterIndex + 1 === currentWord.length) {
          setIsDeleting(true);
          setTimeout(type, 1500);
          return;
        }
      }
    };
    const timeout = setTimeout(type, isDeleting ? 100 : 200);
    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, wordIndex]);

  const isSky = location.pathname.startsWith('/sky');
  const isHome = location.pathname === '/';

  return (
    <div className={`app-container ${isSky ? 'sky-mode' : ''} ${isHome ? 'home-mode' : ''}`}>
      {/* Persistent three columns so vertical borders are continuous */}
      <aside className="left-column">
        <div className="nav">
          <div className="logo">BRAND</div>
        </div>
        <nav className="side-nav" aria-label="Primary">
          <ul>
            {navItems.map((label) => (
              <li key={label}>
                <button
                  className={`nav-item ${activeNav === label ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav(label);
                    if (label === 'Nest') navigate('/nest');
                    if (label === 'Sky') navigate('/sky');
                  }}
                >
                  {isSky ? label.charAt(0) : label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button className="forkchan" aria-label="Fork Chan">
          Fork Chan
        </button>
      </aside>

      <main className="middle-column">
        <div className="nav">
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
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="hero">
                <p className="subtitle">FOR THE COLLEGE, BY THE COLLEGE</p>
                <h1>
                  SHARE YOUR
                  <br />
                  <span id="type-text">{typeText}</span>
                </h1>
              </div>
            }
          />
          <Route path="/nest" element={<NestPage />} />
          <Route path="/sky" element={<SkyPage />} />
        </Routes>
      </main>

      <aside className="right-column">
        <div className="nav">
          <div className="search-bar">
            <input type="text" placeholder="SEARCH" />
          </div>
        </div>
        {/* Right column content can go here later */}
      </aside>
    </div>
  );
}

export default App;

// The Nest page shows all official college clubs in a grid
// Each club has its profile picture, name, and a handle (@name)
function NestPage() {
  // Use all clubs from our list
  const clubs = CLUBS;

  // Convert a club name into a clean social media handle
  // Example: "Culture board" → "cultureboard"
  const handleFromName = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '') // keep only lowercase letters and numbers
      .replace(/^_+|_+$/g, '');

  // Create an inline SVG as a fallback if a club's profile image fails to load
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

// The Sky page is like Instagram's Explore tab
// It shows a grid of all photos from club folders (except profile pictures)
function SkyPage() {
  return (
    <section className="sky">
      <header className="nest-header">
        <h2>SKY</h2>
        <p className="subtitle">EXPLORE EVERYTHING</p>
      </header>
      <div className="sky-grid">
        {/* Show each photo in a square cell, cropped to fit */}
        {SKY_IMAGES.map((src, i) => (
          <div key={i} className="sky-cell">
            <img src={src} alt={`post ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
