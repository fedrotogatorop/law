import React from 'react';

const services = [
  {
    icon: '🏛️',
    title: 'Pendamping Hukum',
    desc: 'Mendampingi pimpinan perusahaan atau staf ke instansi-instansi terkait yang berhubungan dengan hukum, perpajakan, kenotariatan, perdagangan, kepolisian, kejaksaan, pengadilan, dll.',
  },
  {
    icon: '🏢',
    title: 'Kepailitan dan PKPU',
    desc: 'Menjaga perusahaan terhindar dari pailit atau restrukturisasi utang.',
  },
  {
    icon: '📝',
    title: 'Hukum Keperdataan',
    desc: 'Membantu bagian legal Perusahaan dalam menyusun surat-surat perjanjian, seperti perjanjian kontrak kerja dengan karyawan, surat kesepakatan atau perjanjian dengan perusahaan lain, surat-surat perijinan perusahaan.',
  },
  {
    icon: '⚖️',
    title: 'Hukum Pidana',
    desc: 'Mencegah atau membantu bagian legal perusahaan dalam menangani perkara pidana pemalsuan dokumen, penggelapan/penipuan dalam perusahaan.',
  },
  {
    icon: '👥',
    title: 'Hukum Ketenagakerjaan',
    desc: 'Membantu bagian personalia atau HRD perusahaan dalam mendampingi atau menangani urusan bipartit, tripartit, dan perselisihan hubungan industrial di pengadilan.',
  },
  {
    icon: '🚢',
    title: 'Kepabeanan',
    desc: 'Pendampingan pada sengketa kepabeanan terhadap pejabat DJBC.',
  },
];

const Services = () => {
  return (
    <section className="section-page" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Layanan</span>
          <h2>
            Keahlian & Jasa <span className="gold-text">Pelayanan Hukum</span>
          </h2>
          <p>
            Kami menyediakan berbagai layanan hukum komprehensif untuk memenuhi kebutuhan perusahaan Anda.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h4>{service.title}</h4>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
