import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-contact-box">
          <div className="footer-contact-item">
            <span className="icon">📞</span>
            <span>081310746096 / 0822-9705-2357</span>
          </div>
          <div className="footer-contact-item">
            <span className="icon">✉️</span>
            <span>pengacarapajak731@gmail.com</span>
          </div>
        </div>
        <p className="footer-credit">
          CREATED BY{' '}
          <a href="https://fedrotogatorop.fun/" target="_blank" rel="noopener noreferrer">
            FEDRO SAUT WIBISONO TOGATOROP
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
