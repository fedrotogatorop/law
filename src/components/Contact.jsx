import React from 'react';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Hubungi Kami</span>
          <h2>
            Siap <span className="gradient-text">Bermitra?</span>
          </h2>
          <p style={{ marginTop: '16px' }}>
            Hubungi kami untuk konsultasi awal atau informasi lebih lanjut mengenai layanan kami.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-card">
            <h3>Informasi Kontak</h3>
            <p>
              Jangan ragu untuk menghubungi kami. Kami siap membantu Anda dalam setiap kebutuhan hukum dan perpajakan.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <h4>Alamat</h4>
                  <p>
                    Ruko Bukit Gading Mediterania (Florencia), Jalan Boulevard Bukit Gading Raya Blok A/1,
                    Kelapa Gading, Jakarta Utara
                  </p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">📞</div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>0813 10 746 096</p>
                  <p>0822 9705 2357</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-detail-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>pengacarapajak731@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.89119831476976!3d-6.158454995527847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sKelapa%20Gading%2C%20North%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1645000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Herbert Aritonang & Partners Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
