import React from 'react';


const Hero = () => {
  return (
    <section className="hero" id="hero">
      {/* Teal corner overlays */}
      <div className="hero-teal-tl"></div>
      <div className="hero-teal-br"></div>

      {/* Gold diagonal lines */}
      <div className="hero-gold-tl"></div>
      <div className="hero-gold-br"></div>

      {/* Small corner accents */}
      <div className="hero-accent-tr"></div>
      <div className="hero-accent-bl"></div>

      {/* Watermark */}
      <div className="hero-watermark">H&P</div>

      <div className="hero-content">
        <img src="/logos.png" alt="H&P Law Office" className="hero-logo-img" />

        <h1 className="hero-title">
          HERBERT ARITONANG
        </h1>

        <p className="hero-subtitle">PARTNERS</p>

        <p className="hero-desc">
          Kantor Hukum profesional yang bergerak di bidang hukum dan perpajakan.
          Advokat, Kurator, Konsultan Pajak, Konsultan Kepabeanan, Mediator, dan praktisi hukum tata negara.
        </p>

      </div>
    </section>
  );
};

export default Hero;
