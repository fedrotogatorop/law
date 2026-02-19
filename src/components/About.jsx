import React from 'react';

const About = () => {
  return (
    <section className="section-page" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">Tentang Kami</span>
            <h2>
              Tawaran Kerjasama<br />
              <span className="gold-text">Hukum dan Pajak</span>
            </h2>

            <p>
              <strong>PERKENALKAN kami</strong>, <strong>St. Herbert Aritonang, S.H., S. Sos</strong>, dan{' '}
              <strong>Wanti Setianingsih, S. Kom., M. Ak., CTAP., ACA., CCP.</strong>, adalah Advokat,
              Kurator, Konsultan Pajak, Konsultan Kepabeanan, Mediator, dan praktisi hukum tata negara,
              pada Kantor Hukum <strong className="gold-text">HERBERT ARITONANG & PARTNERS</strong>.
            </p>

            <p>
              Kami mengajukan penawaran kerjasama/kemitraan strategis di bidang hukum dan perpajakan
              berlandaskan prinsip saling memerlukan, saling memercayai, saling memperkuat, dan saling
              menguntungkan. Kami memahami bahwa masalah hukum tidak selalu hadir dalam bentuk perkara,
              tetapi kerap muncul dari sisi internal dalam pengambilan keputusan, hubungan kontrak,
              minimnya strategi hukum dan perpajakan, atau lemahnya analisis risiko.
            </p>

            <div className="about-address">
              <h4>📍 Alamat Kantor</h4>
              <p>
                Ruko Bukit Gading Mediterania (Florencia), Jalan Boulevard Bukit Gading Raya Blok A/1,
                Kelapa Gading, Jakarta Utara
              </p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">6+</span>
              <span className="stat-label">Bidang Hukum</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">2</span>
              <span className="stat-label">Partner Utama</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5+</span>
              <span className="stat-label">Keunggulan</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">3</span>
              <span className="stat-label">Bahasa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
