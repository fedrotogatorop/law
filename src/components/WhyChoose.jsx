import React from 'react';

const reasons = [
  {
    icon: '⚖️',
    title: 'Pengalaman Luas',
    desc: 'Berpengalaman dalam penanganan kasus pidana, perdata, pajak, serta memiliki kepiawaian menciptakan solusinya.',
  },
  {
    icon: '📚',
    title: 'Pemahaman Mendalam',
    desc: 'Pemahaman hukum dan pajak yang mendalam guna penanganan perkara/sengketa dapat dilakukan secara efektif dan efisien.',
  },
  {
    icon: '🔍',
    title: 'Investigasi Menyeluruh',
    desc: 'Gelar investigasi menyeluruh demi mendapatkan hasil kerja maksimal.',
  },
  {
    icon: '💰',
    title: 'Efisiensi Biaya',
    desc: 'Efisiensi biaya dibanding penanganan masalah hukum yang berlaku reaktif.',
  },
  {
    icon: '🛡️',
    title: 'Risiko Preventif',
    desc: 'Pengelolaan risiko hukum secara preventif untuk mencegah masalah sebelum terjadi.',
  },
];

const WhyChoose = () => {
  return (
    <section className="section-page alt-bg" id="why-choose">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Keunggulan</span>
          <h2>
            Mengapa Memilih <span className="gold-text">Kami?</span>
          </h2>
          <p>
            Komitmen kami pada profesionalisme, integritas, dan hasil terbaik menjadikan kami mitra
            hukum yang tepat untuk Anda.
          </p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div className="reason-card" key={index}>
              <span className="reason-number">0{index + 1}</span>
              <div className="reason-icon">{reason.icon}</div>
              <h4>{reason.title}</h4>
              <p>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
