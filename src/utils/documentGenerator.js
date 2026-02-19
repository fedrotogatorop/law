import { jsPDF } from 'jspdf';

// =============================================
// Load image as base64 (robust browser method)
// =============================================
async function loadImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch ' + url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Image load failed:', url, e);
    return null;
  }
}

// =============================================
// COLORS
// =============================================
const NAVY = [21, 42, 78];
const NAVY_DARK = [10, 22, 40];
const TEAL = [30, 80, 100];
const GOLD = [201, 168, 76];
const WHITE = [255, 255, 255];
const BROWN_BG = [44, 30, 20];
const TEXT = [33, 37, 41];
const GRAY = [73, 80, 87];

// =============================================
// Draw corner decorations (all 4 corners)
// =============================================
function drawCorners(doc, pw, ph, size = 1) {
  const s = size;

  // TOP-LEFT: Navy triangle
  doc.setFillColor(...NAVY);
  doc.triangle(0, 0, 55 * s, 0, 0, 50 * s, 'F');
  // TOP-LEFT: Teal overlay
  doc.setFillColor(...TEAL);
  doc.triangle(0, 0, 40 * s, 0, 0, 36 * s, 'F');
  // TOP-LEFT: Gold diagonal lines
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(0, 52 * s, 57 * s, 0);
  doc.setLineWidth(0.5);
  doc.line(0, 56 * s, 61 * s, 0);

  // BOTTOM-RIGHT: Navy triangle
  doc.setFillColor(...NAVY);
  doc.triangle(pw, ph, pw - 55 * s, ph, pw, ph - 50 * s, 'F');
  // BOTTOM-RIGHT: Teal overlay
  doc.setFillColor(...TEAL);
  doc.triangle(pw, ph, pw - 40 * s, ph, pw, ph - 36 * s, 'F');
  // BOTTOM-RIGHT: Gold diagonal lines
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(pw, ph - 52 * s, pw - 57 * s, ph);
  doc.setLineWidth(0.5);
  doc.line(pw, ph - 56 * s, pw - 61 * s, ph);

  // TOP-RIGHT: Small navy accent
  doc.setFillColor(...NAVY_DARK);
  doc.triangle(pw, 0, pw - 20 * s, 0, pw, 18 * s, 'F');

  // BOTTOM-LEFT: Small navy accent
  doc.setFillColor(...NAVY_DARK);
  doc.triangle(0, ph, 20 * s, ph, 0, ph - 18 * s, 'F');
}

// =============================================
// Draw H&P Shield Logo
// =============================================
function drawShieldLogo(doc, cx, cy, s = 1) {
  const w = 28 * s;
  const h = 34 * s;
  const x = cx - w / 2;
  const y = cy - h / 2;

  // Shield fill
  doc.setFillColor(...NAVY_DARK);
  doc.triangle(cx, y, x + w, y + 6 * s, x, y + 6 * s, 'F');
  doc.rect(x, y + 6 * s, w, h * 0.59, 'F');
  doc.triangle(x, y + h * 0.65, cx, y + h, x + w, y + h * 0.65, 'F');

  // Shield border (gold)
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1 * s);
  const pts = [
    [cx, y], [x + w, y + 6 * s], [x + w, y + h * 0.65],
    [cx, y + h], [x, y + h * 0.65], [x, y + 6 * s],
  ];
  for (let i = 0; i < pts.length; i++) {
    const next = pts[(i + 1) % pts.length];
    doc.line(pts[i][0], pts[i][1], next[0], next[1]);
  }

  // H & P text
  doc.setTextColor(...GOLD);
  doc.setFont('times', 'bold');
  doc.setFontSize(14 * s);
  doc.text('H', cx - 6 * s, cy + 2 * s);
  doc.setFontSize(8 * s);
  doc.text('&', cx - 1.5 * s, cy - 1 * s);
  doc.setFontSize(14 * s);
  doc.text('P', cx + 3 * s, cy + 2 * s);

  // Decorative line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4 * s);
  doc.line(cx - 8 * s, cy + 6 * s, cx + 8 * s, cy + 6 * s);
}

// =============================================
// Draw firm name below logo
// =============================================
function drawFirmName(doc, cx, y, large) {
  doc.setTextColor(...NAVY_DARK);
  doc.setFont('times', 'bold');
  if (large) {
    doc.setFontSize(16);
    doc.text('HERBERT ARITONANG', cx, y, { align: 'center' });
    doc.setFontSize(11);
    doc.text('PARTNERS', cx, y + 7, { align: 'center' });
  } else {
    doc.setFontSize(11);
    doc.text('HERBERT ARITONANG', cx, y, { align: 'center' });
    doc.setFontSize(8);
    doc.text('PARTNERS', cx, y + 5, { align: 'center' });
  }
}

// =============================================
// Helper: Crop image to Oval (Ellipse)
// =============================================
function cropToOval(base64) {
  return new Promise((resolve) => {
    if (!base64) return resolve(null);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      
      // Draw oval clip
      ctx.beginPath();
      // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
      ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
}

// =============================================
// PDF GENERATION
// =============================================
export const generatePDF = async () => {


  // Load photos
  let herbertImg = null;
  let wantiImg = null;
  let logoImg = null;
  let logoRatio = 1;

  try {
    const results = await Promise.all([
      loadImage('/herbert.jpg'),
      loadImage('/wanti.jpg'),
      loadImage('/logos.png'),
    ]);
    herbertImg = results[0];
    
    // Crop Wanti's image to oval
    const wantiRaw = results[1];
    wantiImg = await cropToOval(wantiRaw);
    
    logoImg = results[2];

    if (logoImg) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          logoRatio = img.width / img.height;
          resolve();
        };
        img.onerror = resolve;
        img.src = logoImg;
      });
    }


  } catch (e) {
    console.warn('[PDF] Image loading error:', e);
  }

  const doc = new jsPDF('p', 'mm', 'a4');
  const pw = 210;
// ... existing code ...

  const ph = 297;
  const cx = pw / 2;
  const ml = 28;
  const cw = pw - ml * 2;
  let y;

  // ================================================
  // PAGE 1: INTRODUCTION LETTER
  // ================================================
  drawCorners(doc, pw, ph);

  // Watermark (simple opacity text)
  try {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.04 }));
    doc.setFontSize(120);
    doc.setTextColor(...NAVY);
    doc.setFont('times', 'bold');
    doc.text('H&P', cx, 165, { align: 'center' });
    doc.restoreGraphicsState();
  } catch (e) {
    console.warn('[PDF] Watermark skipped:', e.message);
  }

  // Logo
  if (logoImg) {
    const w = 45;
    const h = w / logoRatio;
    doc.addImage(logoImg, cx - w / 2, 30 - h / 2, w, h);
  } else {
    drawShieldLogo(doc, cx, 30, 1.2);
  }

  // Firm name
  drawFirmName(doc, cx, 52, true);
  y = 72;

  // --- Addressed to ---
  doc.setFontSize(10.5);
  doc.setTextColor(...TEXT);
  doc.setFont('times', 'normal');
  doc.text('Kepada Yth.', ml, y);
  y += 5.5;
  doc.setFont('times', 'bold');
  doc.text('BAPAK/IBU', ml, y);
  y += 5.5;
  doc.setFont('times', 'italic');
  doc.text('Pimpinan Perusahaan', ml, y);
  y += 5;
  doc.text('atau Perseorangan', ml, y);
  y += 10;

  // --- Perihal ---
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  const perihalLabel = 'Perihal';
  doc.text(perihalLabel, ml, y);
  const periW = doc.getTextWidth(perihalLabel);
  doc.setDrawColor(...TEXT);
  doc.setLineWidth(0.3);
  doc.line(ml, y + 0.8, ml + periW, y + 0.8);
  doc.text(':  ', ml + periW, y);
  doc.setFont('times', 'bold');
  doc.text('Tawaran Kerjasama/Kemitraan Hukum dan Pajak', ml + periW + 5, y);
  y += 10;

  // Greeting
  doc.setFont('times', 'normal');
  doc.text('Dengan hormat.', ml, y);
  y += 8;

  // Paragraph 1
  doc.setFontSize(10);
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);
  const p1 = 'PERKENALKAN kami, St. Herbert Aritonang, S.H., S. Sos, dan Wanti Setianingsih, S. Kom., M. Ak., CTAP., ACA., CCP., adalah Advokat, Kurator, Konsultan Pajak, Konsultan Kepabeanan, Mediator, dan praktisi hukum tata negara, pada Kantor Hukum HERBERT ARITONANG & PARTNERS, beralamat di Ruko Bukit Gading Mediterania (Florencia), Jalan Boulevard Bukit Gading Raya Blok A/1, Kelapa Gading, Jakarta Utara.';
  const p1L = doc.splitTextToSize(p1, cw);
  doc.text(p1L, ml, y);
  y += p1L.length * 4.8 + 5;

  // Paragraph 2
  const p2 = 'Kami mengajukan penawaran kerjasama/kemitraan strategis di bidang hukum dan perpajakan berlandaskan prinsip saling memerlukan, saling memercayai, saling memperkuat, dan saling menguntungkan. Kami memahami bahwa masalah hukum tidak selalu hadir dalam bentuk perkara, tetapi kerap muncul dari sisi internal dalam pengambilan keputusan, hubungan kontrak, minimnya strategi hukum dan perpajakan, atau lemahnya analisis risiko.';
  const p2L = doc.splitTextToSize(p2, cw);
  doc.text(p2L, ml, y);
  y += p2L.length * 4.8 + 8;

  // --- MENGAPA MEMILIH KAMI? ---
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.text('MENGAPA MEMILIH KAMI?', ml, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('times', 'normal');
  const reasons = [
    'Berpengalaman dalam penanganan kasus pidana, perdata, pajak, serta memiliki kepiawaian menciptakan solusinya;',
    'Pemahaman hukum dan pajak yang mendalam guna penanganan perkara/sengketa dapat dilakukan secara efektif dan efisien;',
    'Gelar investigasi menyeluruh demi mendapatkan hasil kerja maksimal;',
    'Efisiensi biaya dibanding penanganan masalah hukum yang berlaku reaktif;',
    'Pengelolaan risiko hukum secara preventif;',
  ];
  reasons.forEach((r, i) => {
    const num = `${i + 1}. `;
    const numW = doc.getTextWidth(num);
    doc.text(num, ml + 8, y);
    const rL = doc.splitTextToSize(r, cw - 16);
    doc.text(rL, ml + 8 + numW, y);
    y += rL.length * 4.8 + 2.5;
  });

  // ================================================
  // PAGE 2: SERVICES
  // ================================================
  doc.addPage();
  drawCorners(doc, pw, ph);

  // Watermark
  try {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.04 }));
    doc.setFontSize(120);
    doc.setTextColor(...NAVY);
    doc.setFont('times', 'bold');
    doc.text('H&P', cx, 165, { align: 'center' });
    doc.restoreGraphicsState();
  } catch { /* skip */ }

  // Logo (smaller)
  if (logoImg) {
    const w = 35;
    const h = w / logoRatio;
    doc.addImage(logoImg, cx - w / 2, 25 - h / 2, w, h);
  } else {
    drawShieldLogo(doc, cx, 25, 0.9);
  }
  drawFirmName(doc, cx, 44, false);
  y = 60;

  // --- KEAHLIAN ATAU JASA PELAYANAN HUKUM ---
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.setTextColor(...TEXT);
  doc.text('KEAHLIAN ATAU JASA PELAYANAN HUKUM', ml, y);
  y += 8;

  const services = [
    { title: 'Pendamping Hukum', desc: 'Mendampingi pimpinan perusahaan atau staf ke instansi-instansi terkait yang berhubungan dengan hukum, perpajakan, kenotariatan, perdagangan, kepolisian, kejaksaan, pengadilan, dll;' },
    { title: 'Kepailitan dan PKPU', desc: 'Menjaga perusahaan terhindar dari pailit atau restrukturisasi utang;' },
    { title: 'Hukum Keperdataan', desc: 'Membantu bagian legal Perusahaan dalam menyusun surat-surat perjanjian, seperti perjanjian kontrak kerja dengan karyawan, surat kesepakatan atau perjanjian dengan perusahaan lain, surat-surat perijinan perusahaan;' },
    { title: 'Hukum Pidana', desc: 'Mencegah atau membantu bagian legal perusahaan dalam menangani perkara pidana pemalsuan dokumen, penggelapan/penipuan dalam perusahaan;' },
    { title: 'Hukum Ketenagakerjaan', desc: 'Membantu bagian personalia atau HRD perusahaan dalam mendampingi atau menangani urusan bipartit, tripartit, dan perselisihan hubungan industrial di pengadilan;' },
    { title: 'Kepabeanan', desc: 'Pendampingan pada sengketa kepabeanan terhadap pejabat DJBC;' },
  ];

  doc.setFontSize(10);
  services.forEach((svc, i) => {
    doc.setFont('times', 'bold');
    doc.setTextColor(...TEXT);
    const num = `${i + 1}.  `;
    doc.text(num, ml + 5, y);
    const numW = doc.getTextWidth(num);
    doc.text(svc.title, ml + 5 + numW, y);
    const tw = doc.getTextWidth(svc.title);
    doc.setDrawColor(...TEXT);
    doc.setLineWidth(0.25);
    doc.line(ml + 5 + numW, y + 0.8, ml + 5 + numW + tw, y + 0.8);
    y += 5.5;

    doc.setFont('times', 'normal');
    const dL = doc.splitTextToSize(svc.desc, cw - 15);
    doc.text(dL, ml + 12, y);
    y += dL.length * 4.8 + 4;
  });

  y += 4;

  // Closing
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  const closing = 'Demikian Surat Penawaran Kerjasama/Kemitraan ini disampaikan. Semoga saja dapat bermanfaat bagi kegiatan usaha atau perusahaan Bapak/Ibu di masa mendatang.';
  const clL = doc.splitTextToSize(closing, cw);
  doc.text(clL, ml, y);
  y += clL.length * 4.8;
  doc.setFont('times', 'bold');
  doc.text('GBU', ml + doc.getTextWidth('mendatang. '), y);
  y += 10;

  // Contact
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);
  doc.text('Silahkan hubungi kami di nomor WA: ', ml, y);
  const waOff = doc.getTextWidth('Silahkan hubungi kami di nomor WA: ');
  doc.setFont('times', 'bold');
  doc.setTextColor(0, 100, 180);
  doc.text('0813 10 746 096', ml + waOff, y);
  const n1W = doc.getTextWidth('0813 10 746 096');
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);
  doc.text(' atau ', ml + waOff + n1W, y);
  const orW = doc.getTextWidth(' atau ');
  doc.setFont('times', 'bold');
  doc.setTextColor(0, 100, 180);
  doc.text('0822 9705 2357', ml + waOff + n1W + orW, y);

  // ================================================
  // PAGE 3: HERBERT ARITONANG PROFILE
  // Full brown sidebar left, white right with photo
  // ================================================
  doc.addPage();

  // Brown sidebar background (full height)
  const sideW = 88;
  doc.setFillColor(...BROWN_BG);
  doc.rect(0, 0, sideW, ph, 'F');

  // Corner decorations on this page
  doc.setFillColor(...NAVY);
  doc.triangle(0, 0, 50, 0, 0, 45, 'F');
  doc.setFillColor(...TEAL);
  doc.triangle(0, 0, 35, 0, 0, 30, 'F');
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(0, 47, 52, 0);
  doc.setLineWidth(0.5);
  doc.line(0, 51, 56, 0);

  doc.setFillColor(...NAVY);
  doc.triangle(pw, ph, pw - 50, ph, pw, ph - 45, 'F');
  doc.setFillColor(...TEAL);
  doc.triangle(pw, ph, pw - 35, ph, pw, ph - 30, 'F');
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(pw, ph - 47, pw - 52, ph);
  doc.setLineWidth(0.5);
  doc.line(pw, ph - 51, pw - 56, ph);

  // Top-right small accent
  doc.setFillColor(...NAVY_DARK);
  doc.triangle(pw, 0, pw - 15, 0, pw, 13, 'F');
  // Bottom-left
  doc.setFillColor(...NAVY);
  doc.triangle(0, ph, 25, ph, 0, ph - 22, 'F');

  // Gold vertical accent line at sidebar edge
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.line(sideW + 0.5, 50, sideW + 0.5, ph - 50);

  // ---- LEFT SIDEBAR CONTENT ----
  const sx = 10; // sidebar content x
  const sw = sideW - 20; // sidebar content width
  y = 22;

  // Name
  doc.setFontSize(22);
  doc.setTextColor(...WHITE);
  doc.setFont('times', 'bold');
  doc.text('ST. HERBERT', sx, y);
  y += 9;
  doc.text('ARITONANG', sx, y);
  y += 12;

  // Roles (2 columns)
  doc.setFontSize(8.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(220, 220, 220);
  doc.text('•  Advokat', sx + 2, y);
  doc.text('•  Konsultan Pajak', sx + 36, y);
  y += 5;
  doc.text('•  Kurator', sx + 2, y);
  doc.text('•  Mediator', sx + 36, y);
  y += 9;

  // Contact box
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.3);
  doc.roundedRect(sx, y - 2, sw, 16, 2, 2, 'S');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text('📞 081310746096/', sx + 3, y + 2);
  doc.text('     0822-9705-2357', sx + 3, y + 6);
  doc.text('✉  pengacarapajak731@gmail.com', sx + 3, y + 10);
  y += 20;

  // ----- PENGALAMAN KERJA -----
  doc.setFillColor(...GOLD);
  doc.rect(sx, y, sw, 7, 'F');
  doc.setFontSize(7.5);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('P E N G A L A M A N   K E R J A', sx + 3, y + 5);
  y += 12;

  doc.setFontSize(7.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(210, 210, 210);
  const exps = [
    'Jurnalis investigasi atas penanganan/membongkar kasus-kasus pelik;',
    'Redaktur bahasa;',
    'Konsultan marketing dalam mengembangkan dan meningkatkan pemasaran dan penjualan;',
    'Penanganan kasus-kasus pajak (aktif);',
    'Praktisi hukum tata negara (aktif);',
    'Konselor keluarga (aktif);',
    'Mediator (aktif);',
  ];
  exps.forEach((exp) => {
    const lines = doc.splitTextToSize('•  ' + exp, sw);
    doc.text(lines, sx + 2, y);
    y += lines.length * 3.8 + 1.5;
  });
  y += 4;

  // ----- KEMAMPUAN -----
  doc.setFillColor(...GOLD);
  doc.rect(sx, y, sw, 7, 'F');
  doc.setFontSize(7.5);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('K E M A M P U A N', sx + 3, y + 5);
  y += 12;

  doc.setFontSize(7.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(210, 210, 210);
  const skills = [
    'Memiliki kemampuan dan keterampilan dalam berkomunikasi, berdebat, berdiskusi, maupun bernegosiasi guna meyakinkan atau mempengaruhi pihak lawan maupun hakim;',
    'Memiliki kemampuan tajam dalam menganalisa kasus-kasus maupun informasi guna mendapatkan keputusan akurat berdasarkan serangkaian investigasi;',
    'Memiliki kemampuan investigasi khusus di lapangan untuk memaksimalkan pembelaan Klien, baik di ruang persidangan maupun non-litigasi;',
    'Memiliki Kemahiran dalam menangani kasus-kasus pidana maupun perdata;',
  ];
  skills.forEach((sk) => {
    const lines = doc.splitTextToSize('•  ' + sk, sw);
    doc.text(lines, sx + 2, y);
    y += lines.length * 3.8 + 1.5;
  });
  y += 4;

  // ----- BAHASA -----
  doc.setFillColor(...GOLD);
  doc.rect(sx, y, sw, 7, 'F');
  doc.setFontSize(7.5);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('B A H A S A', sx + 3, y + 5);
  y += 12;

  doc.setFontSize(7.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(210, 210, 210);
  doc.text('•  English (aktif)', sx + 2, y);
  y += 5;
  doc.text('•  Mandarin dan Rusia (pasif)', sx + 2, y);

  // ---- RIGHT SIDE CONTENT ----
  const rx = sideW + 8;
  const rw = pw - rx - 12;
  y = 22;

  // Herbert's photo
  if (herbertImg) {
    try {
      doc.addImage(herbertImg, 'JPEG', rx + rw / 2 - 24, y, 48, 60);
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.6);
      doc.roundedRect(rx + rw / 2 - 24, y, 48, 60, 2, 2, 'S');
    } catch (e) {
      console.warn('[PDF] Herbert photo embed failed:', e);
    }
  } else {
    // Fallback: colored rectangle with initials
    doc.setFillColor(...NAVY);
    doc.roundedRect(rx + rw / 2 - 24, y, 48, 60, 2, 2, 'F');
    doc.setFontSize(24);
    doc.setTextColor(...GOLD);
    doc.setFont('times', 'bold');
    doc.text('HA', rx + rw / 2, y + 35, { align: 'center' });
  }
  y += 68;

  // Description paragraphs
  doc.setFontSize(9);
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);

  const hp1 = 'PIAWAI dalam mengidentifikasi, mengantisipasi, dan menyelesaikan potensi masalah hukum pada perusahaan atau perseorangan atas perkara-perkara pidana maupun perdata, baik litigasi maupun non-litigasi. Itu sebab banyak menangi kasus-kasus yang cenderung sulit untuk menang atau terselesaikan, yang tentunya dengan tingkat kompleksitas berbeda.';
  const hp1L = doc.splitTextToSize(hp1, rw);
  doc.text(hp1L, rx, y);
  y += hp1L.length * 4.2 + 6;

  const hp2 = 'DENGAN memiliki prinsip kerja "ora et labora" sangat berdampak pada kualitas kerja serta pengambilan tindakan secara terukur guna membantu mempercepat penyelesaian masalah hukum. Kepiawaian lainnya adalah dapat mencegah atau meminimalisir potensi masalah, mulai dari kontrak yang ambigu hingga "jebakan" pada mekanisme kepatuhan regulasi, dan ikut membantu membangun perusahaan memiliki sistem yang kuat.';
  const hp2L = doc.splitTextToSize(hp2, rw);
  doc.text(hp2L, rx, y);

  // ================================================
  // PAGE 4: WANTI SETIANINGSIH PROFILE
  // Navy header at top, white CV body below
  // ================================================
  doc.addPage();

  // Navy blue header background (top 100mm)
  const headerH = 95;
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pw, headerH, 'F');

  // Left side decorative triangles
  doc.setFillColor(...TEAL);
  doc.triangle(0, 0, 40, 0, 0, 55, 'F');
  doc.setFillColor(...NAVY_DARK);
  doc.triangle(0, 0, 28, 0, 0, 38, 'F');

  // Gold lines on left
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(0, 57, 42, 0);
  doc.setLineWidth(0.5);
  doc.line(0, 61, 46, 0);

  // Left side geometric shapes along the navy edge
  doc.setFillColor(15, 32, 58);
  doc.triangle(0, 70, 12, 85, 0, 100, 'F');
  doc.triangle(0, 110, 8, 120, 0, 130, 'F');

  // Bottom-right corner decoration
  doc.setFillColor(...NAVY);
  doc.triangle(pw, ph, pw - 50, ph, pw, ph - 45, 'F');
  doc.setFillColor(...TEAL);
  doc.triangle(pw, ph, pw - 35, ph, pw, ph - 30, 'F');
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(pw, ph - 47, pw - 52, ph);
  doc.setLineWidth(0.5);
  doc.line(pw, ph - 51, pw - 56, ph);

  // Right-side geometric
  doc.setFillColor(...NAVY);
  doc.triangle(pw, 80, pw - 30, headerH, pw, headerH, 'F');
  doc.setFillColor(...TEAL);
  doc.triangle(pw, 85, pw - 20, headerH, pw, headerH, 'F');

  // ---- Photo in navy header ----
  y = 12;
  const wPhotoW = 48;
  const wPhotoH = 58;
  const wPhotoX = cx - wPhotoW / 2;

  if (wantiImg) {
    try {
      // Image is already cropped to oval
      doc.addImage(wantiImg, wPhotoX, y, wPhotoW, wPhotoH);
      
      // Oval border
      const rx = wPhotoW / 2;
      const ry = wPhotoH / 2;
      const cxPhoto = wPhotoX + rx;
      const cyPhoto = y + ry;
      
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(1.5);
      doc.ellipse(cxPhoto, cyPhoto, rx, ry, 'S');
    } catch (e) {
      console.warn('[PDF] Wanti photo embed failed:', e);
    }
  } else {
    // Fallback oval placeholder
    const rx = wPhotoW / 2;
    const ry = wPhotoH / 2;
    const cxPhoto = wPhotoX + rx;
    const cyPhoto = y + ry;
    
    doc.setFillColor(30, 50, 80);
    doc.ellipse(cxPhoto, cyPhoto, rx, ry, 'F');
    doc.setFontSize(24);
    doc.setTextColor(...GOLD);
    doc.setFont('times', 'bold');
    doc.text('WS', cxPhoto, cyPhoto + 8, { align: 'center' });
  }

  // Name below photo (still in navy area)
  y += wPhotoH + 6;
  doc.setFontSize(10);
  doc.setTextColor(...WHITE);
  doc.setFont('times', 'bold');
  doc.text('WANTI SETIANINGSIH, S.KOM., M.AK., CTAP., ACA., CCP.', cx, y, { align: 'center' });
  y += 5;

  doc.setFontSize(6);
  doc.setTextColor(...GOLD);
  doc.setFont('times', 'bold');
  doc.text('TAX & CUSTOMS STRATEGIC ADVISOR | AUDIT & REGULATORY SPECIALIST | ACADEMIC PROFESSIONAL', cx, y, { align: 'center' });

  // ---- White body content ----
  y = headerH + 8;
  const wmL = 20; // wanti margin left
  const wmR = 18;
  const wcw = pw - wmL - wmR;

  doc.setFontSize(8.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);

  const wi1 = 'Wanti Setianingsih merupakan praktisi perpajakan dan kepabeanan dengan latar belakang akademis yang kuat serta pengalaman profesional yang komprehensif di bidang audit, regulasi fiskal, dan tata kelola perusahaan. Beliau memadukan ketajaman analitis, kedalaman konseptual, dan pengalaman lapangan dalam memberikan solusi hukum dan perpajakan yang terukur, strategis, serta berorientasi pada mitigasi risiko jangka panjang.';
  const wi1L = doc.splitTextToSize(wi1, wcw);
  doc.text(wi1L, wmL, y);
  y += wi1L.length * 3.8 + 2;

  const wi2 = 'Sebagai akademisi sekaligus praktisi, Wanti memiliki perspektif menyeluruh dalam memahami dinamika regulasi, kepatuhan fiskal, dan struktur bisnis yang kompleks, baik untuk entitas nasional maupun perusahaan swasta asing.';
  const wi2L = doc.splitTextToSize(wi2, wcw);
  doc.text(wi2L, wmL, y);
  y += wi2L.length * 3.8 + 5;

  // PROFESSIONAL EXPERIENCE
  doc.setFontSize(10);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('PROFESSIONAL EXPERIENCE', wmL, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(wmL, y + 1.5, wmL + doc.getTextWidth('PROFESSIONAL EXPERIENCE'), y + 1.5);
  y += 6;

  const profExp = [
    { title: 'Director – PT Yong Sheng Packaging (2025 – Present)', desc: 'Memimpin pengelolaan strategis perusahaan serta memastikan kepatuhan fiskal dan operasional sesuai regulasi kepabeanan dan perpajakan.' },
    { title: 'HR & Corporate Compliance – PT Hao Sheng International (2019 – Present)', desc: 'Mengelola aspek kepatuhan internal, hubungan industrial, serta penguatan sistem kontrol dan tata kelola perusahaan.' },
    { title: 'Senior Auditor – KAP Saut M. Partuaon (2025 – Present)', desc: 'Melaksanakan audit laporan keuangan serta evaluasi kepatuhan terhadap standar akuntansi dan regulasi perpajakan.' },
    { title: 'Lecturer – Universitas Respati Indonesia (2016 – Present)', desc: 'Mengampu bidang Sistem Informasi serta membangun integrasi antara sistem digital dan tata kelola keuangan modern. Beliau juga aktif sebagai praktisi perpajakan dan kepabeanan, serta tergabung dalam asosiasi profesi seperti PERKOPPI, PKKPI, dan PSI.' },
  ];

  doc.setFontSize(8.5);
  profExp.forEach((exp) => {
    doc.setFont('times', 'bold');
    doc.setTextColor(...NAVY_DARK);
    const tL = doc.splitTextToSize(exp.title, wcw);
    doc.text(tL, wmL, y);
    const firstLineW = doc.getTextWidth(tL[0]);
    doc.setDrawColor(...TEXT);
    doc.setLineWidth(0.2);
    doc.line(wmL, y + 0.8, wmL + firstLineW, y + 0.8);
    y += tL.length * 3.8 + 1;

    doc.setFont('times', 'normal');
    doc.setTextColor(...TEXT);
    const dL = doc.splitTextToSize(exp.desc, wcw);
    doc.text(dL, wmL, y);
    y += dL.length * 3.8 + 3.5;
  });

  y += 2;

  // CORE EXPERTISE
  doc.setFontSize(10);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('CORE EXPERTISE', wmL, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(wmL, y + 1.5, wmL + doc.getTextWidth('CORE EXPERTISE'), y + 1.5);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);
  const expertise = [
    'Tax Compliance & Dispute Strategy',
    'Customs Regulatory Advisory & Risk Mitigation',
    'Financial Audit & Fiscal Reconciliation',
    'Corporate Governance & Internal Control Strengthening',
    'Regulatory Risk Mapping & Preventive Legal Structuring',
    'Strategic Tax Planning & Business Structuring',
    'Litigation & Non-Litigation Support in Fiscal Matters',
  ];
  expertise.forEach((item) => {
    doc.text('•  ' + item, wmL + 2, y);
    y += 4.5;
  });
  y += 3;

  // PROFESSIONAL APPROACH
  doc.setFontSize(10);
  doc.setFont('times', 'bold');
  doc.setTextColor(...NAVY_DARK);
  doc.text('PROFESSIONAL APPROACH', wmL, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(wmL, y + 1.5, wmL + doc.getTextWidth('PROFESSIONAL APPROACH'), y + 1.5);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('times', 'normal');
  doc.setTextColor(...TEXT);
  const appIntro = 'Wanti Setianingsih dikenal memiliki pendekatan yang sistematis, presisi dalam analisis, dan kemampuan merancang solusi yang berbasis kepastian hukum serta efisiensi fiskal. Dengan kombinasi pengalaman praktik dan penguatan akademik, beliau memberikan nilai tambah berupa:';
  const appL = doc.splitTextToSize(appIntro, wcw);
  doc.text(appL, wmL, y);
  y += appL.length * 3.8 + 3;

  const approaches = [
    'Strategi preventif untuk meminimalkan potensi sengketa;',
    'Pendekatan komprehensif dalam audit dan investigasi fiskal;',
    'Integrasi tata kelola perusahaan dengan kepatuhan perpajakan;',
    'Pendampingan strategis pada pemeriksaan, keberatan, dan sengketa kepabeanan.',
  ];
  approaches.forEach((item) => {
    doc.text('•  ' + item, wmL + 2, y);
    y += 4.5;
  });
  y += 2;

  const closingW = 'Komitmen profesionalnya berorientasi pada stabilitas hukum, efisiensi fiskal, dan keberlanjutan usaha klien.';
  const cwL = doc.splitTextToSize(closingW, wcw);
  doc.text(cwL, wmL, y);

  // ---- SAVE ----
  doc.save('Herbert_Aritonang_Partners_Proposal.pdf');

};

