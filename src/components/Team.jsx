import React from 'react';

const Team = () => {
  return (
    <section className="team" id="team">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Tim Kami</span>
          <h2>
            Partner <span className="gold-text">Profesional</span>
          </h2>
          <p>
            Didukung oleh profesional berpengalaman di bidang hukum dan perpajakan.
          </p>
        </div>

        <div className="team-profiles">
          {/* =============================================
              HERBERT ARITONANG - Brown sidebar layout
              Exactly matching Image 1/4 of the brochure
              ============================================= */}
          <div className="profile-card">
            {/* LEFT: Brown sidebar with name + experience */}
            <div className="profile-left">
              {/* Name */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '1px',
                marginBottom: '4px',
                lineHeight: 1.15
              }}>
                ST. HERBERT<br />ARITONANG
              </h2>

              {/* Roles in 2 columns */}
              <ul className="sidebar-roles">
                <li>Advokat</li>
                <li>Konsultan Pajak</li>
                <li>Kurator</li>
                <li>Mediator</li>
              </ul>

              {/* Contact box */}
              <div className="sidebar-contact-box">
                <p><span className="contact-icon">☎</span> 081310746096/</p>
                <p style={{ paddingLeft: '16px' }}>0822-9705-2357</p>
                <p><span className="contact-icon">✉</span> pengacarapajak731@gmail.com</p>
              </div>

              {/* PENGALAMAN KERJA */}
              <span className="sidebar-section-title">PENGALAMAN KERJA</span>
              <ul className="sidebar-list">
                <li>Jurnalis investigasi atas penanganan/membongkar kasus-kasus pelik;</li>
                <li>Redaktur bahasa;</li>
                <li>Konsultan marketing dalam mengembangkan dan meningkatkan pemasaran dan penjualan;</li>
                <li>Penanganan kasus-kasus pajak (aktif);</li>
                <li>Praktisi hukum tata negara (aktif);</li>
                <li>Konselor keluarga (aktif);</li>
                <li>Mediator (aktif);</li>
              </ul>

              {/* KEMAMPUAN */}
              <span className="sidebar-section-title">KEMAMPUAN</span>
              <ul className="sidebar-list">
                <li>Memiliki kemampuan dan keterampilan dalam berkomunikasi, berdebat, berdiskusi, maupun bernegosiasi guna meyakinkan atau mempengaruhi pihak lawan maupun hakim;</li>
                <li>Memiliki kemampuan tajam dalam menganalisa kasus-kasus maupun informasi guna mendapatkan keputusan akurat berdasarkan serangkaian investigasi;</li>
                <li>Memiliki kemampuan investigasi khusus di lapangan untuk memaksimalkan pembelaan Klien, baik di ruang persidangan maupun non-litigasi;</li>
                <li>Memiliki Kemahiran dalam menangani kasus-kasus pidana maupun perdata;</li>
              </ul>

              {/* BAHASA */}
              <span className="sidebar-section-title">BAHASA</span>
              <ul className="sidebar-lang">
                <li>English (aktif)</li>
                <li>Mandarin dan Rusia (pasif)</li>
              </ul>
            </div>

            {/* RIGHT: Photo + description text */}
            <div className="profile-right">
              <div className="profile-photo-wrapper">
                <img src="/herbert.jpg" alt="St. Herbert Aritonang" />
              </div>

              <p className="profile-desc">
                <strong>PIAWAI</strong> dalam mengidentifikasi, mengantisipasi, dan menyelesaikan potensi masalah
                hukum pada perusahaan atau perseorangan atas perkara-perkara pidana maupun perdata,
                baik litigasi maupun non-litigasi. Itu sebab banyak menangi kasus-kasus yang cenderung
                sulit untuk menang atau terselesaikan, yang tentunya dengan tingkat kompleksitas berbeda.
              </p>

              <p className="profile-desc">
                <strong>DENGAN</strong> memiliki prinsip kerja "ora et labora" sangat berdampak pada kualitas kerja
                serta pengambilan tindakan secara terukur guna membantu mempercepat penyelesaian
                masalah hukum. Kepiawaian lainnya adalah dapat mencegah atau meminimalisir potensi
                masalah, mulai dari kontrak yang ambigu hingga "jebakan" pada mekanisme kepatuhan regulasi,
                dan ikut membantu membangun perusahaan memiliki sistem yang kuat.
              </p>
            </div>
          </div>

          {/* =============================================
              WANTI SETIANINGSIH - Navy header + white body
              Exactly matching Image 3 of the brochure
              ============================================= */}
          <div className="profile-card wanti-card">
            {/* HEADER: Navy blue with photo */}
            <div className="wanti-header">
              <div className="wanti-photo-wrapper">
                <img src="/wanti.jpg" alt="Wanti Setianingsih" />
              </div>
              <h3 className="wanti-name">WANTI SETIANINGSIH, S.KOM., M.AK., CTAP., ACA., CCP.</h3>
              <p className="wanti-tagline">
                Tax & Customs Strategic Advisor | Audit & Regulatory Specialist | Academic Professional
              </p>
            </div>

            {/* BODY: White content area */}
            <div className="wanti-body">
              <p className="profile-desc">
                Wanti Setianingsih merupakan praktisi perpajakan dan kepabeanan dengan latar belakang
                akademis yang kuat serta pengalaman profesional yang komprehensif di bidang audit,
                regulasi fiskal, dan tata kelola perusahaan. Beliau memadukan ketajaman analitis,
                kedalaman konseptual, dan pengalaman lapangan dalam memberikan solusi hukum dan
                perpajakan yang terukur, strategis, serta berorientasi pada mitigasi risiko jangka panjang.
              </p>

              <p className="profile-desc">
                Sebagai akademisi sekaligus praktisi, Wanti memiliki perspektif menyeluruh dalam memahami
                dinamika regulasi, kepatuhan fiskal, dan struktur bisnis yang kompleks, baik untuk entitas
                nasional maupun perusahaan swasta asing.
              </p>

              {/* PROFESSIONAL EXPERIENCE */}
              <h4 className="wanti-section-title">PROFESSIONAL EXPERIENCE</h4>

              <div className="wanti-exp-item">
                <p className="wanti-exp-title">Director – PT Yong Sheng Packaging (2025 – Present)</p>
                <p className="wanti-exp-desc">
                  Memimpin pengelolaan strategis perusahaan serta memastikan kepatuhan fiskal dan
                  operasional sesuai regulasi kepabeanan dan perpajakan.
                </p>
              </div>

              <div className="wanti-exp-item">
                <p className="wanti-exp-title">HR & Corporate Compliance – PT Hao Sheng International (2019 – Present)</p>
                <p className="wanti-exp-desc">
                  Mengelola aspek kepatuhan internal, hubungan industrial, serta penguatan sistem kontrol
                  dan tata kelola perusahaan.
                </p>
              </div>

              <div className="wanti-exp-item">
                <p className="wanti-exp-title">Senior Auditor – KAP Saut M. Partuaon (2025 – Present)</p>
                <p className="wanti-exp-desc">
                  Melaksanakan audit laporan keuangan serta evaluasi kepatuhan terhadap standar akuntansi
                  dan regulasi perpajakan.
                </p>
              </div>

              <div className="wanti-exp-item">
                <p className="wanti-exp-title">Lecturer – Universitas Respati Indonesia (2016 – Present)</p>
                <p className="wanti-exp-desc">
                  Mengampu bidang Sistem Informasi serta membangun integrasi antara sistem digital dan
                  tata kelola keuangan modern. Beliau juga aktif sebagai praktisi perpajakan dan kepabeanan,
                  serta tergabung dalam asosiasi profesi seperti PERKOPPI, PKKPI, dan PSI.
                </p>
              </div>

              {/* CORE EXPERTISE */}
              <h4 className="wanti-section-title">CORE EXPERTISE</h4>
              <ul>
                <li>Tax Compliance & Dispute Strategy</li>
                <li>Customs Regulatory Advisory & Risk Mitigation</li>
                <li>Financial Audit & Fiscal Reconciliation</li>
                <li>Corporate Governance & Internal Control Strengthening</li>
                <li>Regulatory Risk Mapping & Preventive Legal Structuring</li>
                <li>Strategic Tax Planning & Business Structuring</li>
                <li>Litigation & Non-Litigation Support in Fiscal Matters</li>
              </ul>

              {/* PROFESSIONAL APPROACH */}
              <h4 className="wanti-section-title">PROFESSIONAL APPROACH</h4>
              <p className="profile-desc">
                Wanti Setianingsih dikenal memiliki pendekatan yang sistematis, presisi dalam analisis,
                dan kemampuan merancang solusi yang berbasis kepastian hukum serta efisiensi fiskal.
                Dengan kombinasi pengalaman praktik dan penguatan akademik, beliau memberikan nilai
                tambah berupa:
              </p>
              <ul>
                <li>Strategi preventif untuk meminimalkan potensi sengketa;</li>
                <li>Pendekatan komprehensif dalam audit dan investigasi fiskal;</li>
                <li>Integrasi tata kelola perusahaan dengan kepatuhan perpajakan;</li>
                <li>Pendampingan strategis pada pemeriksaan, keberatan, dan sengketa kepabeanan.</li>
              </ul>
              <p className="profile-desc" style={{ marginTop: '14px' }}>
                Komitmen profesionalnya berorientasi pada stabilitas hukum, efisiensi fiskal, dan
                keberlanjutan usaha klien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
