import React, { useState } from 'react';
import { generatePDF } from '../utils/documentGenerator';

const Download = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);

  const handlePDF = async () => {
    setLoadingPdf(true);
    try {
      await generatePDF();
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error generating PDF: ' + err.message);
    }
    setTimeout(() => setLoadingPdf(false), 1000);
  };

  return (
    <section className="download" id="download">
      <div className="container">
        <div className="download-wrapper">
          <span className="section-label" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
            Download
          </span>
          <h2>
            Unduh <span className="gold-text">Proposal Kami</span>
          </h2>
          <p>
            Dapatkan surat penawaran kerjasama/kemitraan hukum dan pajak dalam format PDF.
          </p>
          <div className="download-btns">
            <button
              className="btn btn-pdf"
              onClick={handlePDF}
              disabled={loadingPdf}
              id="download-pdf-btn"
            >
              <span className="btn-icon">📄</span>
              {loadingPdf ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
