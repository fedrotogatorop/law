import React from 'react';

const LoadingScreen = ({ visible }) => {
  return (
    <div className={`loading-screen ${!visible ? 'hidden' : ''}`}>
      <img src="/logos.png" alt="H&P" className="loading-logo-img" />
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.1rem',
        color: '#152a4e',
        letterSpacing: '3px',
        fontWeight: 700
      }}>
        HERBERT ARITONANG
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        color: '#c9a84c',
        letterSpacing: '6px',
        textTransform: 'uppercase'
      }}>
        Partners
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
