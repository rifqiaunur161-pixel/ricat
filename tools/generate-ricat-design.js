/**
 * Generator script for ricat UI in FigCraft Desktop
 * Generates four high-fidelity screens reflecting the dark, high-contrast,
 * utilitarian academic style from the reference image, tailored to ricat PRD & Plan.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const commands = [];
let stepCounter = 0;

function addCommand(cmd, params) {
  const currentStep = stepCounter++;
  commands.push({
    command: cmd,
    params: params
  });
  return currentStep;
}

// -------------------------------------------------------------
// 1. SCREEN 1: 01-Chat-AI-Workspace (Main Academic Workspace)
// -------------------------------------------------------------
const s1 = addCommand('node.create', {
  type: 'frame',
  name: '01-Chat-AI-Workspace',
  x: 0,
  y: 0,
  width: 1440,
  height: 960,
  props: { fill: '#080C14' }
});

// Left Sidebar Dock (68px wide)
const s1_sidebar = addCommand('node.create', {
  type: 'frame',
  name: 'Sidebar Dock',
  parent: { $step: s1 },
  x: 20,
  y: 20,
  width: 68,
  height: 920,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 20
  }
});

// Sidebar Logo
addCommand('text.create', {
  text: 'ricat',
  parent: { $step: s1_sidebar },
  x: 16,
  y: 28,
  props: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'Bold',
    fill: '#FFFFFF'
  }
});

// Nav item 1: Chat (Active - circular blue pill)
const s1_nav1 = addCommand('node.create', {
  type: 'frame',
  name: 'Nav-Chat (Active)',
  parent: { $step: s1_sidebar },
  x: 14,
  y: 84,
  width: 40,
  height: 40,
  props: {
    fill: '#2563EB',
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '💬',
  parent: { $step: s1_nav1 },
  x: 10,
  y: 10,
  props: { fontSize: 16, fill: '#FFFFFF' }
});

// Nav items (Inactive)
const navItems = [
  { icon: '📄', name: 'Nav-Doc', y: 140 },
  { icon: '🔍', name: 'Nav-PDF', y: 196 },
  { icon: '🔄', name: 'Nav-Convert', y: 252 },
  { icon: '🎙️', name: 'Nav-STT', y: 308 },
  { icon: '📚', name: 'Nav-Study', y: 364 },
  { icon: '📊', name: 'Nav-Admin', y: 420 }
];

navItems.forEach(item => {
  const navFrame = addCommand('node.create', {
    type: 'frame',
    name: item.name,
    parent: { $step: s1_sidebar },
    x: 14,
    y: item.y,
    width: 40,
    height: 40,
    props: {
      fill: '#151F32',
      stroke: '#1E293B',
      strokeWeight: 1,
      cornerRadius: 20
    }
  });

  addCommand('text.create', {
    text: item.icon,
    parent: { $step: navFrame },
    x: 10,
    y: 10,
    props: { fontSize: 16, fill: '#94A3B8' }
  });
});

// Sidebar Bottom Avatar & Setting
const s1_avatar = addCommand('node.create', {
  type: 'frame',
  name: 'User Avatar',
  parent: { $step: s1_sidebar },
  x: 14,
  y: 850,
  width: 40,
  height: 40,
  props: {
    fill: '#334155',
    stroke: '#38BDF8',
    strokeWeight: 2,
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '🎓',
  parent: { $step: s1_avatar },
  x: 10,
  y: 10,
  props: { fontSize: 16, fill: '#FFFFFF' }
});

// Header Bar Top
const s1_header = addCommand('node.create', {
  type: 'frame',
  name: 'Top Header Bar',
  parent: { $step: s1 },
  x: 110,
  y: 20,
  width: 1300,
  height: 52,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: 'ricat  /  Workspace Kuliah  •  Semester Ganjil',
  parent: { $step: s1_header },
  x: 24,
  y: 16,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'Medium',
    fill: '#E2E8F0'
  }
});

// Model selector badge in header
const s1_modelBadge = addCommand('node.create', {
  type: 'frame',
  name: 'Model Selector Badge',
  parent: { $step: s1_header },
  x: 680,
  y: 10,
  width: 320,
  height: 32,
  props: {
    fill: '#151F32',
    stroke: '#2563EB',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: '⚡ Model: Claude 3.5 Sonnet (Utama) • Gemini 1.5',
  parent: { $step: s1_modelBadge },
  x: 12,
  y: 8,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#60A5FA'
  }
});

// Kuota badge in header
const s1_quotaBadge = addCommand('node.create', {
  type: 'frame',
  name: 'Quota Badge',
  parent: { $step: s1_header },
  x: 1020,
  y: 10,
  width: 250,
  height: 32,
  props: {
    fill: '#151F32',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Kuota Harian: 42/50 Chat Tersedia',
  parent: { $step: s1_quotaBadge },
  x: 16,
  y: 8,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'Medium',
    fill: '#34D399'
  }
});

// Central Hero Area
// Visual Orb
const s1_orb = addCommand('node.create', {
  type: 'ellipse',
  name: 'Academic Neural Orb',
  parent: { $step: s1 },
  x: 670,
  y: 140,
  width: 140,
  height: 140,
  props: {
    fill: '#1D4ED8',
    stroke: '#38BDF8',
    strokeWeight: 2
  }
});

const s1_orb_glow = addCommand('node.create', {
  type: 'ellipse',
  name: 'Orb Glow Core',
  parent: { $step: s1 },
  x: 700,
  y: 170,
  width: 80,
  height: 80,
  props: {
    fill: '#38BDF8'
  }
});

// Hero Titles
addCommand('text.create', {
  text: 'Halo, Mahasiswa',
  parent: { $step: s1 },
  x: 685,
  y: 300,
  props: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'Medium',
    fill: '#94A3B8'
  }
});

addCommand('text.create', {
  text: 'Apa tugas kuliah yang ingin dibahas hari ini?',
  parent: { $step: s1 },
  x: 430,
  y: 330,
  props: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontStyle: 'Bold',
    fill: '#F8FAFC'
  }
});

addCommand('text.create', {
  text: 'Asisten akademik terstruktur: draf laporan bersumber, ringkasan jurnal, tanya modul, atau konversi dokumen.',
  parent: { $step: s1 },
  x: 420,
  y: 375,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#64748B'
  }
});

// Focal Prompt & Action Card (760px wide)
const s1_promptCard = addCommand('node.create', {
  type: 'frame',
  name: 'Focal Prompt Container',
  parent: { $step: s1 },
  x: 380,
  y: 425,
  width: 760,
  height: 180,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 20
  }
});

// Top bar in prompt card (replaces Pro upgrade banner with Quota & Policy info)
const s1_promptTopBar = addCommand('node.create', {
  type: 'frame',
  name: 'Academic Status Banner',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 12,
  width: 728,
  height: 32,
  props: {
    fill: '#151F32',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: 'Mode Akademik: Deteksi rujukan otomatis aktif • Sumber dijamin berdasar kutipan resmi',
  parent: { $step: s1_promptTopBar },
  x: 16,
  y: 8,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#94A3B8'
  }
});

// Inner input area
const s1_innerInput = addCommand('node.create', {
  type: 'frame',
  name: 'Inner Input Box',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 52,
  width: 728,
  height: 64,
  props: {
    fill: '#080C14',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 12
  }
});

addCommand('text.create', {
  text: 'Tanyakan materi, masukkan topik makalah, atau ketik / untuk menu cepat...',
  parent: { $step: s1_innerInput },
  x: 18,
  y: 22,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fill: '#475569'
  }
});

// Action buttons below input inside card
const s1_btnAttach = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Attach File',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 128,
  width: 170,
  height: 36,
  props: {
    fill: '#151F32',
    stroke: '#334155',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: '📎 Lampirkan Modul / Foto',
  parent: { $step: s1_btnAttach },
  x: 12,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'Medium',
    fill: '#CBD5E1'
  }
});

const s1_btnTools = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Tools Selector',
  parent: { $step: s1_promptCard },
  x: 196,
  y: 128,
  width: 170,
  height: 36,
  props: {
    fill: '#151F32',
    stroke: '#334155',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: '⚙️ Gaya Sitasi (APA/IEEE)',
  parent: { $step: s1_btnTools },
  x: 12,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'Medium',
    fill: '#CBD5E1'
  }
});

// Send Button (circular blue with up arrow)
const s1_btnSend = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Send',
  parent: { $step: s1_promptCard },
  x: 700,
  y: 126,
  width: 40,
  height: 40,
  props: {
    fill: '#2563EB',
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '↑',
  parent: { $step: s1_btnSend },
  x: 14,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'Bold',
    fill: '#FFFFFF'
  }
});

// 4 Quick Action Cards (replacing generic "Surprise me!" from reference)
const quickCards = [
  {
    x: 230,
    title: '📄 Buat Laporan & Sitasi',
    desc: 'Draf bab makalah format APA/IEEE dengan deteksi klaim tanpa rujukan otomatis.',
    name: 'Card-Laporan'
  },
  {
    x: 500,
    title: '🔍 Tanya Modul & PDF',
    desc: 'Ekstrak jawaban dari buku kuliah dengan rujukan nomor halaman akurat.',
    name: 'Card-Modul'
  },
  {
    x: 770,
    title: '🔄 Konverter & Kompres',
    desc: 'Ubah DOCX, PPTX, PDF, dan kompres ukuran file sesuai batas portal kampus.',
    name: 'Card-Konverter'
  },
  {
    x: 1040,
    title: '🎙️ Transkrip Kuliah & Jurnal',
    desc: 'Ubah rekaman audio kuliah (Groq Whisper) dan ringkas jurnal 4 bagian baku.',
    name: 'Card-STT'
  }
];

quickCards.forEach(c => {
  const cardFrame = addCommand('node.create', {
    type: 'frame',
    name: c.name,
    parent: { $step: s1 },
    x: c.x,
    y: 630,
    width: 250,
    height: 120,
    props: {
      fill: '#101726',
      stroke: '#1E293B',
      strokeWeight: 1,
      cornerRadius: 16
    }
  });

  addCommand('text.create', {
    text: c.title,
    parent: { $step: cardFrame },
    x: 16,
    y: 16,
    props: {
      fontFamily: 'Inter',
      fontSize: 13,
      fontStyle: 'SemiBold',
      fill: '#F1F5F9'
    }
  });

  addCommand('text.create', {
    text: c.desc,
    parent: { $step: cardFrame },
    x: 16,
    y: 46,
    width: 218,
    props: {
      fontFamily: 'Inter',
      fontSize: 11,
      fill: '#64748B'
    }
  });
});


// -------------------------------------------------------------
// 2. SCREEN 2: 02-Generator-Laporan-Sitasi (Tahap 5)
// -------------------------------------------------------------
const s2 = addCommand('node.create', {
  type: 'frame',
  name: '02-Generator-Laporan-Sitasi',
  x: 1500,
  y: 0,
  width: 1440,
  height: 960,
  props: { fill: '#080C14' }
});

// Top bar
const s2_header = addCommand('node.create', {
  type: 'frame',
  name: 'Header Laporan',
  parent: { $step: s2 },
  x: 40,
  y: 20,
  width: 1360,
  height: 60,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: 'ricat  /  Dokumen & Laporan  /  Tugas Besar Sistem Tertanam (Format IEEE)',
  parent: { $step: s2_header },
  x: 24,
  y: 20,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'Medium',
    fill: '#E2E8F0'
  }
});

// Download buttons in header
const s2_btnDocx = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Export DOCX',
  parent: { $step: s2_header },
  x: 1040,
  y: 12,
  width: 140,
  height: 36,
  props: {
    fill: '#2563EB',
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Unduh .docx',
  parent: { $step: s2_btnDocx },
  x: 30,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

const s2_btnPptx = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Export PPTX',
  parent: { $step: s2_header },
  x: 1195,
  y: 12,
  width: 140,
  height: 36,
  props: {
    fill: '#151F32',
    stroke: '#334155',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Ekspor .pptx',
  parent: { $step: s2_btnPptx },
  x: 34,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#CBD5E1'
  }
});

// Left Column: Document Draft Sheet (860px wide)
const s2_docSheet = addCommand('node.create', {
  type: 'frame',
  name: 'Document Sheet Editor',
  parent: { $step: s2 },
  x: 40,
  y: 100,
  width: 860,
  height: 820,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: 'BAB I. PENDAHULUAN',
  parent: { $step: s2_docSheet },
  x: 40,
  y: 36,
  props: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'Bold',
    fill: '#F8FAFC'
  }
});

addCommand('text.create', {
  text: '1.1 Latar Belakang Masalah',
  parent: { $step: s2_docSheet },
  x: 40,
  y: 72,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'SemiBold',
    fill: '#94A3B8'
  }
});

addCommand('text.create', {
  text: 'Perkembangan kecerdasan buatan pada perangkat berdaya rendah menuntut efisiensi komputasi tinggi [1]. Arsitektur mikrokontroler modern mampu mengeksekusi inferensi kuantisasi model tanpa kehilangan akurasi signifikan [2]. Namun kendala utama terletak pada alokasi memori SRAM yang terbatas pada mikrokontroler berbiaya murah.',
  parent: { $step: s2_docSheet },
  x: 40,
  y: 105,
  width: 780,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: '22px',
    fill: '#CBD5E1'
  }
});

// Claim needing source highlight box
const s2_warningClaim = addCommand('node.create', {
  type: 'frame',
  name: 'Claim Warning Box',
  parent: { $step: s2_docSheet },
  x: 40,
  y: 200,
  width: 780,
  height: 90,
  props: {
    fill: '#2A1215',
    stroke: '#EF4444',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: '⚠️ Klaim Belum Memiliki Sumber Valid:',
  parent: { $step: s2_warningClaim },
  x: 16,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#F87171'
  }
});

addCommand('text.create', {
  text: '"Penggunaan metode optimasi pruning menghasilkan reduksi daya sebesar 42% pada clock 16 MHz." [Perlu Sumber Rujukan]',
  parent: { $step: s2_warningClaim },
  x: 16,
  y: 38,
  width: 740,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fill: '#FECACA'
  }
});

const s2_btnFindSource = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Cari Sumber',
  parent: { $step: s2_warningClaim },
  x: 580,
  y: 12,
  width: 180,
  height: 28,
  props: {
    fill: '#DC2626',
    cornerRadius: 6
  }
});

addCommand('text.create', {
  text: 'Cari Rujukan via Grounding',
  parent: { $step: s2_btnFindSource },
  x: 14,
  y: 7,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

// Right Column: Citation Verification & Source Management (460px wide)
const s2_sourcePanel = addCommand('node.create', {
  type: 'frame',
  name: 'Panel Rujukan & Sitasi',
  parent: { $step: s2 },
  x: 930,
  y: 100,
  width: 470,
  height: 820,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: 'Matriks Sumber & Sitasi (Gaya IEEE)',
  parent: { $step: s2_sourcePanel },
  x: 24,
  y: 28,
  props: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'SemiBold',
    fill: '#F8FAFC'
  }
});

// Source Item 1 (Verified Green)
const s2_src1 = addCommand('node.create', {
  type: 'frame',
  name: 'Source Item 1',
  parent: { $step: s2_sourcePanel },
  x: 24,
  y: 70,
  width: 422,
  height: 100,
  props: {
    fill: '#13211B',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: '[1] Terverifikasi • Jurnal IEEE Transactions (2024)',
  parent: { $step: s2_src1 },
  x: 14,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#34D399'
  }
});

addCommand('text.create', {
  text: 'Rahman, M. R. & Setiawan, B., "Energy-Efficient Edge Computing for IoT Sensors," IEEE Trans. Ind. Inf., vol. 20, no. 4, pp. 112–119.',
  parent: { $step: s2_src1 },
  x: 14,
  y: 38,
  width: 394,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#A7F3D0'
  }
});

// Source Item 2 (Verified Green)
const s2_src2 = addCommand('node.create', {
  type: 'frame',
  name: 'Source Item 2',
  parent: { $step: s2_sourcePanel },
  x: 24,
  y: 185,
  width: 422,
  height: 100,
  props: {
    fill: '#13211B',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: '[2] Terverifikasi • Buku Teks Referensi (MIT Press)',
  parent: { $step: s2_src2 },
  x: 14,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#34D399'
  }
});

addCommand('text.create', {
  text: 'Goodfellow, I., Bengio, Y., & Courville, A., Deep Learning. Cambridge, MA: MIT Press, 2016, pp. 245–260.',
  parent: { $step: s2_src2 },
  x: 14,
  y: 38,
  width: 394,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#A7F3D0'
  }
});

// Campus Profile Settings Card in Right Panel
const s2_campusCard = addCommand('node.create', {
  type: 'frame',
  name: 'Profil Kampus Card',
  parent: { $step: s2_sourcePanel },
  x: 24,
  y: 310,
  width: 422,
  height: 130,
  props: {
    fill: '#151F32',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: 'Standar Format Kampus Aktif:',
  parent: { $step: s2_campusCard },
  x: 16,
  y: 16,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#E2E8F0'
  }
});

addCommand('text.create', {
  text: '• Margin Halaman: Kiri 4cm, Atas 4cm, Kanan 3cm, Bawah 3cm\n• Jenis Huruf: Times New Roman 12pt (Spasi 1.5)\n• Penomoran Sitasi: Angka kurung siku berurutan [1], [2]',
  parent: { $step: s2_campusCard },
  x: 16,
  y: 42,
  width: 390,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: '20px',
    fill: '#94A3B8'
  }
});


// -------------------------------------------------------------
// 3. SCREEN 3: 03-Konverter-Kompresor-File (Tahap 7)
// -------------------------------------------------------------
const s3 = addCommand('node.create', {
  type: 'frame',
  name: '03-Konverter-Kompresor-File',
  x: 0,
  y: 1040,
  width: 1440,
  height: 960,
  props: { fill: '#080C14' }
});

const s3_header = addCommand('node.create', {
  type: 'frame',
  name: 'Header Konverter',
  parent: { $step: s3 },
  x: 40,
  y: 20,
  width: 1360,
  height: 60,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: 'ricat  /  Alat Berkas  /  Konverter & Kompresor Dokumen Kuliah',
  parent: { $step: s3_header },
  x: 24,
  y: 20,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'Medium',
    fill: '#E2E8F0'
  }
});

// Dropzone Box
const s3_dropzone = addCommand('node.create', {
  type: 'frame',
  name: 'Dropzone Container',
  parent: { $step: s3 },
  x: 270,
  y: 120,
  width: 900,
  height: 280,
  props: {
    fill: '#101726',
    stroke: '#2563EB',
    strokeWeight: 2,
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '📁 Tugas_Akhir_Sistem_Tertanam_Final.docx',
  parent: { $step: s3_dropzone },
  x: 260,
  y: 90,
  props: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'SemiBold',
    fill: '#F8FAFC'
  }
});

addCommand('text.create', {
  text: 'Ukuran Berkas Asli: 14.8 MB  •  Format Asal: Microsoft Word (.docx)',
  parent: { $step: s3_dropzone },
  x: 275,
  y: 130,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#94A3B8'
  }
});

const s3_btnChangeFile = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Ganti Berkas',
  parent: { $step: s3_dropzone },
  x: 370,
  y: 175,
  width: 160,
  height: 36,
  props: {
    fill: '#151F32',
    stroke: '#334155',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Ganti Berkas Lain',
  parent: { $step: s3_btnChangeFile },
  x: 32,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'Medium',
    fill: '#CBD5E1'
  }
});

// Conversion Controls Box
const s3_controlBox = addCommand('node.create', {
  type: 'frame',
  name: 'Control Box',
  parent: { $step: s3 },
  x: 270,
  y: 430,
  width: 900,
  height: 240,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: 'Pilihan Format Sasaran:',
  parent: { $step: s3_controlBox },
  x: 32,
  y: 28,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'SemiBold',
    fill: '#E2E8F0'
  }
});

// Format buttons
const s3_fmtPDF = addCommand('node.create', {
  type: 'frame',
  name: 'Format PDF (Selected)',
  parent: { $step: s3_controlBox },
  x: 32,
  y: 60,
  width: 140,
  height: 44,
  props: {
    fill: '#2563EB',
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: 'PDF (.pdf) ✓',
  parent: { $step: s3_fmtPDF },
  x: 30,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

const s3_fmtPPTX = addCommand('node.create', {
  type: 'frame',
  name: 'Format PPTX',
  parent: { $step: s3_controlBox },
  x: 184,
  y: 60,
  width: 140,
  height: 44,
  props: {
    fill: '#151F32',
    stroke: '#334155',
    strokeWeight: 1,
    cornerRadius: 10
  }
});

addCommand('text.create', {
  text: 'PPTX (.pptx)',
  parent: { $step: s3_fmtPPTX },
  x: 30,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'Medium',
    fill: '#CBD5E1'
  }
});

// Target Compression Section
addCommand('text.create', {
  text: 'Target Ukuran Kompresi (Batas Portal Unggah Kampus):',
  parent: { $step: s3_controlBox },
  x: 32,
  y: 130,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'SemiBold',
    fill: '#E2E8F0'
  }
});

const s3_targetCard = addCommand('node.create', {
  type: 'frame',
  name: 'Target Size Pill',
  parent: { $step: s3_controlBox },
  x: 32,
  y: 160,
  width: 320,
  height: 44,
  props: {
    fill: '#151F32',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Target: ≤ 4.5 MB (Batas Kampus 5 MB) • Kualitas 90%',
  parent: { $step: s3_targetCard },
  x: 16,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'Medium',
    fill: '#34D399'
  }
});

// Process Progress Bar Box (SSE Active)
const s3_progressBox = addCommand('node.create', {
  type: 'frame',
  name: 'Progress Container',
  parent: { $step: s3 },
  x: 270,
  y: 700,
  width: 900,
  height: 110,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: 'Status Proses: Mengonversi halaman dengan LibreOffice headless... (68%)',
  parent: { $step: s3_progressBox },
  x: 32,
  y: 24,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'Medium',
    fill: '#E2E8F0'
  }
});

// Progress track & bar
const s3_track = addCommand('node.create', {
  type: 'frame',
  name: 'Progress Track',
  parent: { $step: s3_progressBox },
  x: 32,
  y: 56,
  width: 836,
  height: 12,
  props: {
    fill: '#151F32',
    cornerRadius: 6
  }
});

addCommand('node.create', {
  type: 'frame',
  name: 'Progress Fill 68%',
  parent: { $step: s3_track },
  x: 0,
  y: 0,
  width: 568,
  height: 12,
  props: {
    fill: '#2563EB',
    cornerRadius: 6
  }
});


// -------------------------------------------------------------
// 4. SCREEN 4: 04-Dashboard-Admin-Safety (Tahap 8)
// -------------------------------------------------------------
const s4 = addCommand('node.create', {
  type: 'frame',
  name: '04-Dashboard-Admin-Safety',
  x: 1500,
  y: 1040,
  width: 1440,
  height: 960,
  props: { fill: '#080C14' }
});

const s4_header = addCommand('node.create', {
  type: 'frame',
  name: 'Header Admin',
  parent: { $step: s4 },
  x: 40,
  y: 20,
  width: 1360,
  height: 60,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: 'ricat  /  Panel Kontrol Administrator  •  Pemantauan Kuota & Keamanan Biaya',
  parent: { $step: s4_header },
  x: 24,
  y: 20,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'SemiBold',
    fill: '#F8FAFC'
  }
});

// Emergency Kill Switch Banner (Crucial PRD requirement)
const s4_killSwitch = addCommand('node.create', {
  type: 'frame',
  name: 'Emergency Kill Switch Banner',
  parent: { $step: s4 },
  x: 40,
  y: 100,
  width: 1360,
  height: 80,
  props: {
    fill: '#2A1215',
    stroke: '#DC2626',
    strokeWeight: 2,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '🛡️ TOMBOL DARURAT API BERBAYAR (KILL SWITCH)',
  parent: { $step: s4_killSwitch },
  x: 24,
  y: 18,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'Bold',
    fill: '#F87171'
  }
});

addCommand('text.create', {
  text: 'Status Saat Ini: AKTIF (Biaya Terkendali). Klik tombol ini untuk langsung mematikan semua akses Claude & OpenAI bila terjadi anomali pemakaian.',
  parent: { $step: s4_killSwitch },
  x: 24,
  y: 44,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fill: '#FECACA'
  }
});

const s4_btnKill = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Matikan Sekarang',
  parent: { $step: s4_killSwitch },
  x: 1100,
  y: 18,
  width: 230,
  height: 44,
  props: {
    fill: '#DC2626',
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'Matikan API Berbayar',
  parent: { $step: s4_btnKill },
  x: 45,
  y: 14,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontStyle: 'Bold',
    fill: '#FFFFFF'
  }
});

// 3 Metric Stat Cards
const adminStats = [
  {
    x: 40,
    title: 'Biaya API Bulan Berjalan',
    val: '$4.20  /  Plafon $15.00',
    sub: 'Utilisasi 28% (Aman di bawah batas 80%)',
    color: '#10B981',
    name: 'Stat-Biaya'
  },
  {
    x: 505,
    title: 'Antrean Mahasiswa Baru',
    val: '3 Calon Pengguna',
    sub: 'Menunggu persetujuan admin untuk aktif',
    color: '#F59E0B',
    name: 'Stat-Antrean'
  },
  {
    x: 970,
    title: 'Pembagian Beban Model',
    val: '91% Gratis  •  9% Berbayar',
    sub: 'Model gratis (Gemini) menghemat pengeluaran',
    color: '#3B82F6',
    name: 'Stat-Model'
  }
];

adminStats.forEach(st => {
  const card = addCommand('node.create', {
    type: 'frame',
    name: st.name,
    parent: { $step: s4 },
    x: st.x,
    y: 200,
    width: 430,
    height: 120,
    props: {
      fill: '#101726',
      stroke: '#1E293B',
      strokeWeight: 1,
      cornerRadius: 14
    }
  });

  addCommand('text.create', {
    text: st.title,
    parent: { $step: card },
    x: 24,
    y: 18,
    props: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontStyle: 'Medium',
      fill: '#94A3B8'
    }
  });

  addCommand('text.create', {
    text: st.val,
    parent: { $step: card },
    x: 24,
    y: 46,
    props: {
      fontFamily: 'Inter',
      fontSize: 20,
      fontStyle: 'Bold',
      fill: '#F8FAFC'
    }
  });

  addCommand('text.create', {
    text: st.sub,
    parent: { $step: card },
    x: 24,
    y: 84,
    props: {
      fontFamily: 'Inter',
      fontSize: 11,
      fill: st.color
    }
  });
});

// User Approval Table Box
const s4_tableBox = addCommand('node.create', {
  type: 'frame',
  name: 'Tabel Antrean Persetujuan',
  parent: { $step: s4 },
  x: 40,
  y: 340,
  width: 1360,
  height: 560,
  props: {
    fill: '#101726',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: 'Daftar Calon Pengguna Menunggu Persetujuan (Pending Approval)',
  parent: { $step: s4_tableBox },
  x: 28,
  y: 24,
  props: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontStyle: 'SemiBold',
    fill: '#F8FAFC'
  }
});

// Table header row
const s4_th = addCommand('node.create', {
  type: 'frame',
  name: 'Table Header Row',
  parent: { $step: s4_tableBox },
  x: 28,
  y: 65,
  width: 1304,
  height: 40,
  props: {
    fill: '#151F32',
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: 'NAMA MAHASISWA',
  parent: { $step: s4_th },
  x: 20,
  y: 12,
  props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#94A3B8' }
});

addCommand('text.create', {
  text: 'EMAIL KAMPUS',
  parent: { $step: s4_th },
  x: 340,
  y: 12,
  props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#94A3B8' }
});

addCommand('text.create', {
  text: 'STATUS EMAIL',
  parent: { $step: s4_th },
  x: 680,
  y: 12,
  props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#94A3B8' }
});

addCommand('text.create', {
  text: 'AKSI PERSETUJUAN',
  parent: { $step: s4_th },
  x: 1040,
  y: 12,
  props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#94A3B8' }
});

// Table Rows
const rows = [
  { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@mhs.kampus.ac.id', y: 120 },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@mhs.kampus.ac.id', y: 180 },
  { name: 'Dimas Wicaksono', email: 'dimas.w@mhs.kampus.ac.id', y: 240 }
];

rows.forEach((r, idx) => {
  const rowFrame = addCommand('node.create', {
    type: 'frame',
    name: 'Row ' + (idx + 1),
    parent: { $step: s4_tableBox },
    x: 28,
    y: r.y,
    width: 1304,
    height: 50,
    props: {
      fill: idx % 2 === 0 ? '#101726' : '#151F32',
      stroke: '#1E293B',
      strokeWeight: 1,
      cornerRadius: 6
    }
  });

  addCommand('text.create', {
    text: r.name,
    parent: { $step: rowFrame },
    x: 20,
    y: 16,
    props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Medium', fill: '#F8FAFC' }
  });

  addCommand('text.create', {
    text: r.email,
    parent: { $step: rowFrame },
    x: 340,
    y: 16,
    props: { fontFamily: 'Inter', fontSize: 13, fill: '#CBD5E1' }
  });

  addCommand('text.create', {
    text: '✓ Terverifikasi OTP',
    parent: { $step: rowFrame },
    x: 680,
    y: 16,
    props: { fontFamily: 'Inter', fontSize: 12, fill: '#34D399' }
  });

  // Action buttons
  const btnApprove = addCommand('node.create', {
    type: 'frame',
    name: 'Btn Setujui',
    parent: { $step: rowFrame },
    x: 1040,
    y: 9,
    width: 100,
    height: 32,
    props: { fill: '#16A34A', cornerRadius: 6 }
  });

  addCommand('text.create', {
    text: 'Setujui',
    parent: { $step: btnApprove },
    x: 26,
    y: 8,
    props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' }
  });

  const btnReject = addCommand('node.create', {
    type: 'frame',
    name: 'Btn Tolak',
    parent: { $step: rowFrame },
    x: 1150,
    y: 9,
    width: 90,
    height: 32,
    props: { fill: '#334155', cornerRadius: 6 }
  });

  addCommand('text.create', {
    text: 'Tolak',
    parent: { $step: btnReject },
    x: 26,
    y: 8,
    props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Medium', fill: '#CBD5E1' }
  });
});

// Save output script
const outputPath = path.join(__dirname, 'ricat-design-batch.json');
fs.writeFileSync(outputPath, JSON.stringify(commands, null, 2), 'utf-8');
console.log(`Generated ${commands.length} batch commands at ${outputPath}`);

