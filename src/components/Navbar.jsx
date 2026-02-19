import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#hero" className="nav-brand" onClick={closeMobile}>
            <img src="/logos.png" alt="H&P Law Office" className="nav-logo-img" />
          </a>

          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={closeMobile}>Tentang Kami</a></li>
            <li><a href="#services" onClick={closeMobile}>Layanan</a></li>
            <li><a href="#team" onClick={closeMobile}>Tim Kami</a></li>
            <li><a href="#contact" onClick={closeMobile}>Kontak</a></li>
          </ul>

          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
