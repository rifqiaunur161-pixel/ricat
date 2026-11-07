/**
 * Complete Screen Generator for ricat
 * Implements:
 * 1. Exact radial gradients specified by user:
 *    - Dark Horizon Glow: radial-gradient(#000000 40%, #0D1A36 100%)
 *    - Light Gradient: radial-gradient(#FFFFFF 40%, #475569 100%)
 * 2. Full set of screens from PRD & Plan:
 *    - 01-Workspace-Utama (AI Chat Hub)
 *    - 02-Ganti-Format-Dokumen (File Converter: DOCX ⇄ PDF ⇄ PPTX)
 *    - 03-Kompres-File (File Compressor with Campus Portal Limit Slider)
 *    - 04-Tanya-Modul-PDF (Split-view PDF reader + citation QA)
 *    - 05-Speech-to-Text-Kuliah (Whisper STT with Waveform & Transcript editor)
 *    - 06-Ringkas-Jurnal-Akademik (Structured 4-Pillar Journal Summary)
 *    - 07-Kuis-Flashcard-Belajar (Interactive Study Cards & Quiz)
 *    - 08-Dashboard-Admin-Management (Light Glass Management Dashboard from Ref 2)
 */

const fs = require('fs');
const path = require('path');

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

const orbPath = "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/design/orb-circle.png";
const avatarDarkPath = "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/design/avatar.png";
const spherePath = "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/design/liquid-sphere.png";
const avatarLightPath = "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/design/avatar-light.png";

const darkBgFills = [
  {
    type: "radialGradient",
    stops: ["#000000", "#0D1A36"]
  }
];

const lightBgFills = [
  {
    type: "radialGradient",
    stops: ["#FFFFFF", "#475569"]
  }
];


// Helper to add capsule dock to any screen
function addCapsuleDock(parentStep, activeIdx = 0) {
  const dock = addCommand('node.create', {
    type: 'frame',
    name: 'Capsule Dock',
    parent: { $step: parentStep },
    x: 32,
    y: 32,
    width: 64,
    height: 776,
    props: { fill: '#080C14', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 32 }
  });

  addCommand('text.create', { text: '❖', parent: { $step: dock }, x: 23, y: 26, props: { fontSize: 18, fill: '#FFFFFF' } });

  const navs = [
    { icon: '💬', name: 'Chat' },
    { icon: '📄', name: 'Format' },
    { icon: '🗜️', name: 'Kompres' },
    { icon: '🔍', name: 'Modul' },
    { icon: '🎙️', name: 'STT' },
    { icon: '📰', name: 'Jurnal' },
    { icon: '📚', name: 'Kuis' },
    { icon: '🛡️', name: 'Admin' }
  ];

  navs.forEach((n, i) => {
    const isActive = (i === activeIdx);
    const nFrame = addCommand('node.create', {
      type: 'frame',
      name: 'Nav ' + n.name,
      parent: { $step: dock },
      x: 12,
      y: 76 + (i * 54),
      width: 40,
      height: 40,
      props: {
        fill: isActive ? '#140D24' : '#080C14',
        stroke: isActive ? '#C026D3' : '#1A2333',
        strokeWeight: isActive ? 2 : 0,
        cornerRadius: 20
      }
    });

    addCommand('text.create', {
      text: n.icon,
      parent: { $step: nFrame },
      x: 10,
      y: 10,
      props: { fontSize: 16, fill: isActive ? '#F0ABFC' : '#64748B' }
    });
  });

  addCommand('image.place', {
    path: avatarDarkPath,
    parent: { $step: dock },
    x: 12,
    y: 714,
    width: 40,
    height: 40,
    name: 'User Avatar'
  });

  return dock;
}


// =========================================================================
// 1. SCREEN 01: 01-Workspace-Utama (AI Chat Hub)
// =========================================================================
const s1 = addCommand('node.create', {
  type: 'frame',
  name: '01-Workspace-Utama',
  x: 0,
  y: 0,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s1, 0);

// Notification toast top right
const s1_toast = addCommand('node.create', {
  type: 'frame',
  name: 'Glass Toast',
  parent: { $step: s1 },
  x: 880,
  y: 32,
  width: 360,
  height: 52,
  props: { fill: '#0E1624', stroke: '#1E2D44', strokeWeight: 1, cornerRadius: 26 }
});
addCommand('text.create', { text: '🔔  Kuota Harian: 45/50 Chat Tersedia', parent: { $step: s1_toast }, x: 20, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#F1F5F9' } });

// Center Hero
addCommand('image.place', { path: orbPath, parent: { $step: s1 }, x: 576, y: 100, width: 128, height: 128, name: 'Orb' });
addCommand('text.create', { text: 'Hi, Mahasiswa', parent: { $step: s1 }, x: 580, y: 244, props: { fontFamily: 'Inter', fontSize: 18, fill: '#8E95A5' } });
addCommand('text.create', { text: 'How can I help today?', parent: { $step: s1 }, x: 440, y: 276, props: { fontFamily: 'Inter', fontSize: 34, fontStyle: 'Bold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Bantuan tugas kuliah terstruktur: draf laporan bersumber, tanya modul, atau konversi file.', parent: { $step: s1 }, x: 385, y: 324, props: { fontFamily: 'Inter', fontSize: 13, fill: '#5A6272' } });

// Prompt Box
const s1_promptCard = addCommand('node.create', {
  type: 'frame',
  name: 'Prompt Box',
  parent: { $step: s1 },
  x: 290,
  y: 366,
  width: 700,
  height: 154,
  props: { fill: '#0C1320', stroke: '#1A293D', strokeWeight: 1, cornerRadius: 24 }
});

const s1_statusPill = addCommand('node.create', {
  type: 'frame',
  name: 'Status Pill',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 12,
  width: 668,
  height: 28,
  props: { fill: '#101E2E', stroke: '#1C3955', strokeWeight: 1, cornerRadius: 8 }
});
addCommand('text.create', { text: '⚡ Mode Akademik: Validasi sitasi otomatis aktif • Claude 3.5 Sonnet & Gemini 1.5 Pro', parent: { $step: s1_statusPill }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#38BDF8' } });

const s1_inputWell = addCommand('node.create', {
  type: 'frame',
  name: 'Input Well',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 48,
  width: 668,
  height: 90,
  props: { fill: '#05080E', stroke: '#141D28', strokeWeight: 1, cornerRadius: 16 }
});
addCommand('text.create', { text: 'Tanyakan materi kuliah, masukkan topik tugas, atau ketik /...', parent: { $step: s1_inputWell }, x: 18, y: 18, props: { fontFamily: 'Inter', fontSize: 14, fill: '#4A5568' } });

const s1_pImport = addCommand('node.create', { type: 'frame', name: 'Pill Import', parent: { $step: s1_inputWell }, x: 16, y: 50, width: 116, height: 28, props: { fill: '#0F1722', stroke: '#22324A', strokeWeight: 1, cornerRadius: 14 } });
addCommand('text.create', { text: '📎 Import file', parent: { $step: s1_pImport }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#94A3B8' } });

const s1_pTools = addCommand('node.create', { type: 'frame', name: 'Pill Tools', parent: { $step: s1_inputWell }, x: 140, y: 50, width: 90, height: 28, props: { fill: '#0F1722', stroke: '#22324A', strokeWeight: 1, cornerRadius: 14 } });
addCommand('text.create', { text: '⚙️ Tools', parent: { $step: s1_pTools }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#94A3B8' } });

const s1_pSend = addCommand('node.create', { type: 'frame', name: 'Btn Send', parent: { $step: s1_inputWell }, x: 620, y: 48, width: 34, height: 34, props: { fill: '#0091FF', cornerRadius: 17 } });
addCommand('text.create', { text: '↑', parent: { $step: s1_pSend }, x: 12, y: 7, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'Bold', fill: '#FFFFFF' } });

// 3 Cards below
const cards1 = [
  { x: 290, icon: '📄', title: 'Draf Makalah & Sitasi', desc: 'Susun bab tugas kuliah dengan format baku APA atau IEEE.' },
  { x: 530, icon: '🔍', title: 'Tanya Modul & PDF', desc: 'Ekstrak jawaban dari buku kuliah dengan kutipan nomor halaman.' },
  { x: 770, icon: '🔄', title: 'Konversi & Kompres', desc: 'Ubah berkas DOCX/PPTX ke PDF dan sesuaikan batas portal kampus.' }
];

cards1.forEach(c => {
  const cd = addCommand('node.create', { type: 'frame', name: 'Card ' + c.title, parent: { $step: s1 }, x: c.x, y: 540, width: 220, height: 104, props: { fill: '#0D141F', stroke: '#182434', strokeWeight: 1, cornerRadius: 18 } });
  addCommand('text.create', { text: c.icon + '  ' + c.title, parent: { $step: cd }, x: 16, y: 16, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#F1F5F9' } });
  addCommand('text.create', { text: c.desc, parent: { $step: cd }, x: 16, y: 42, width: 188, props: { fontFamily: 'Inter', fontSize: 11, lineHeight: '16px', fill: '#64748B' } });
});


// =========================================================================
// 2. SCREEN 02: 02-Ganti-Format-Dokumen (File Converter: DOCX, PDF, PPTX)
// =========================================================================
const s2 = addCommand('node.create', {
  type: 'frame',
  name: '02-Ganti-Format-Dokumen',
  x: 1340,
  y: 0,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s2, 1);

addCommand('text.create', { text: 'ricat  /  Alat Berkas  /  Ganti Format Dokumen', parent: { $step: s2 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// Center Glass Converter Card
const s2_card = addCommand('node.create', {
  type: 'frame',
  name: 'Converter Card',
  parent: { $step: s2 },
  x: 240,
  y: 100,
  width: 880,
  height: 680,
  props: { fill: '#0A0E17', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 28 }
});

// Dropzone in Converter
const s2_drop = addCommand('node.create', {
  type: 'frame',
  name: 'Dropzone Area',
  parent: { $step: s2_card },
  x: 40,
  y: 40,
  width: 800,
  height: 220,
  props: { fill: '#06090E', stroke: '#0091FF', strokeWeight: 2, cornerRadius: 20 }
});
addCommand('text.create', { text: '📄  Tugas_Besar_Sistem_Tertanam.docx', parent: { $step: s2_drop }, x: 260, y: 70, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Ukuran: 14.8 MB  •  Format Asli: Microsoft Word Document', parent: { $step: s2_drop }, x: 265, y: 105, props: { fontFamily: 'Inter', fontSize: 12, fill: '#64748B' } });

const s2_btnChange = addCommand('node.create', { type: 'frame', name: 'Btn Ganti', parent: { $step: s2_drop }, x: 340, y: 145, width: 120, height: 36, props: { fill: '#101726', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 18 } });
addCommand('text.create', { text: 'Pilih Berkas Lain', parent: { $step: s2_btnChange }, x: 18, y: 10, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });

// Format Selection Row
addCommand('text.create', { text: 'Pilih Format Sasaran Baru:', parent: { $step: s2_card }, x: 40, y: 290, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#F1F5F9' } });

const fmtOptions = [
  { name: 'PDF (.pdf)', active: true, x: 40 },
  { name: 'PowerPoint (.pptx)', active: false, x: 200 },
  { name: 'Word (.docx)', active: false, x: 380 },
  { name: 'Gambar (.png/.jpg)', active: false, x: 530 }
];

fmtOptions.forEach(f => {
  const fb = addCommand('node.create', {
    type: 'frame',
    name: 'Fmt ' + f.name,
    parent: { $step: s2_card },
    x: f.x,
    y: 325,
    width: 140,
    height: 44,
    props: { fill: f.active ? '#0091FF' : '#0F1622', stroke: f.active ? '#38BDF8' : '#1E293B', strokeWeight: 1, cornerRadius: 12 }
  });
  addCommand('text.create', { text: f.name, parent: { $step: fb }, x: 18, y: 13, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: f.active ? 'Bold' : 'Medium', fill: f.active ? '#FFFFFF' : '#94A3B8' } });
});

// Engine Specs Callout
const s2_info = addCommand('node.create', {
  type: 'frame',
  name: 'Engine Info Box',
  parent: { $step: s2_card },
  x: 40,
  y: 400,
  width: 800,
  height: 90,
  props: { fill: '#0F1622', stroke: '#1A2333', strokeWeight: 1, cornerRadius: 16 }
});
addCommand('text.create', { text: '⚙️ Mesin Pengolah: LibreOffice Headless terisolasi di container (Aman & menjaga kerapihan font)', parent: { $step: s2_info }, x: 20, y: 22, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#38BDF8' } });
addCommand('text.create', { text: 'Konversi berjalan secara lokal di server tanpa mengirim data ke pihak ketiga. Berkas sementara terhapus otomatis setelah 7 hari.', parent: { $step: s2_info }, x: 20, y: 48, props: { fontFamily: 'Inter', fontSize: 11, fill: '#64748B' } });

// Convert Button
const s2_btnConvert = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Mulai Konversi',
  parent: { $step: s2_card },
  x: 40,
  y: 530,
  width: 800,
  height: 52,
  props: { fill: '#0091FF', cornerRadius: 16 }
});
addCommand('text.create', { text: 'Mulai Konversi ke Format Sasaran', parent: { $step: s2_btnConvert }, x: 290, y: 16, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#FFFFFF' } });


// =========================================================================
// 3. SCREEN 03: 03-Kompres-File (File Compressor with Campus Portal Limit)
// =========================================================================
const s3 = addCommand('node.create', {
  type: 'frame',
  name: '03-Kompres-File',
  x: 2680,
  y: 0,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s3, 2);

addCommand('text.create', { text: 'ricat  /  Alat Berkas  /  Kompresor Ukuran File Tugas', parent: { $step: s3 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

const s3_card = addCommand('node.create', {
  type: 'frame',
  name: 'Compressor Card',
  parent: { $step: s3 },
  x: 240,
  y: 100,
  width: 880,
  height: 680,
  props: { fill: '#0A0E17', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 28 }
});

// Dropzone in Compressor
const s3_drop = addCommand('node.create', {
  type: 'frame',
  name: 'Dropzone Area',
  parent: { $step: s3_card },
  x: 40,
  y: 40,
  width: 800,
  height: 180,
  props: { fill: '#06090E', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 20 }
});
addCommand('text.create', { text: '🗜️  Laporan_Praktikum_Fisika_Dasar.pdf', parent: { $step: s3_drop }, x: 260, y: 55, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Ukuran Asli: 24.5 MB  •  Melebihi batas portal kampus (5.0 MB)', parent: { $step: s3_drop }, x: 245, y: 88, props: { fontFamily: 'Inter', fontSize: 12, fill: '#EF4444' } });

// Compression Slider Controls
addCommand('text.create', { text: 'Pilih Target Ukuran Kompresi:', parent: { $step: s3_card }, x: 40, y: 250, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#F1F5F9' } });

const s3_sliderBox = addCommand('node.create', {
  type: 'frame',
  name: 'Slider Box',
  parent: { $step: s3_card },
  x: 40,
  y: 285,
  width: 800,
  height: 120,
  props: { fill: '#0F1622', stroke: '#1A2333', strokeWeight: 1, cornerRadius: 20 }
});

addCommand('text.create', { text: 'Target Ukuran: 4.5 MB (Kompresi 81%)', parent: { $step: s3_sliderBox }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#38BDF8' } });
addCommand('text.create', { text: 'Aman untuk unggah portal kampus (Batas: 5.0 MB)  •  Kualitas visual teks & diagram tetap tajam (88%)', parent: { $step: s3_sliderBox }, x: 24, y: 44, props: { fontFamily: 'Inter', fontSize: 11, fill: '#34D399' } });

// Visual Slider Track & Knob
const s3_track = addCommand('node.create', { type: 'frame', name: 'Slider Track', parent: { $step: s3_sliderBox }, x: 24, y: 78, width: 752, height: 8, props: { fill: '#1E293B', cornerRadius: 4 } });
addCommand('node.create', { type: 'frame', name: 'Slider Fill', parent: { $step: s3_track }, x: 0, y: 0, width: 340, height: 8, props: { fill: '#0091FF', cornerRadius: 4 } });
addCommand('node.create', { type: 'ellipse', name: 'Slider Knob', parent: { $step: s3_sliderBox }, x: 356, y: 72, width: 20, height: 20, props: { fill: '#FFFFFF' } });

// Comparison metrics box
const s3_metrics = addCommand('node.create', {
  type: 'frame',
  name: 'Metrics Grid',
  parent: { $step: s3_card },
  x: 40,
  y: 430,
  width: 800,
  height: 100,
  props: { fill: '#080C14', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 16 }
});

addCommand('text.create', { text: 'SEBELUM:\n24.5 MB (42 Halaman PDF)', parent: { $step: s3_metrics }, x: 40, y: 28, props: { fontFamily: 'Inter', fontSize: 12, lineHeight: '20px', fill: '#EF4444' } });
addCommand('text.create', { text: '➔', parent: { $step: s3_metrics }, x: 380, y: 38, props: { fontSize: 20, fill: '#64748B' } });
addCommand('text.create', { text: 'SETELAH KOMPRESI:\n4.5 MB (Hemat 20 MB)', parent: { $step: s3_metrics }, x: 520, y: 28, props: { fontFamily: 'Inter', fontSize: 12, lineHeight: '20px', fill: '#34D399' } });

// Compress Execute Button
const s3_btnExec = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Kompres Sekarang',
  parent: { $step: s3_card },
  x: 40,
  y: 560,
  width: 800,
  height: 52,
  props: { fill: '#0091FF', cornerRadius: 16 }
});
addCommand('text.create', { text: 'Mulai Kompresi Berkas ke 4.5 MB', parent: { $step: s3_btnExec }, x: 290, y: 16, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#FFFFFF' } });


// =========================================================================
// 4. SCREEN 04: 04-Tanya-Modul-PDF (Split-view PDF reader + citation QA)
// =========================================================================
const s4 = addCommand('node.create', {
  type: 'frame',
  name: '04-Tanya-Modul-PDF',
  x: 0,
  y: 900,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s4, 3);

addCommand('text.create', { text: 'ricat  /  Sumber Belajar  /  Tanya Modul Kuliah: Sistem_Operasi_Modern.pdf (Hal 142 dari 450)', parent: { $step: s4 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 15, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// Split Left: PDF Page Viewer (550px wide)
const s4_pdfViewer = addCommand('node.create', {
  type: 'frame',
  name: 'PDF Viewer Canvas',
  parent: { $step: s4 },
  x: 120,
  y: 80,
  width: 540,
  height: 720,
  props: { fill: '#080C14', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 20 }
});

addCommand('text.create', { text: 'MODUL SISTEM OPERASI  •  BAB 4: MANAJEMEN MEMORI', parent: { $step: s4_pdfViewer }, x: 30, y: 30, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#64748B' } });
addCommand('text.create', { text: '4.2 Algoritma Penjadwalan Round Robin dan Virtual Memory', parent: { $step: s4_pdfViewer }, x: 30, y: 60, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Virtual memory memisahkan memori logis pengguna dari memori fisik. Pemisahan ini memungkinkan memori virtual yang sangat besar disediakan bagi pemrogram ketika memori fisik yang tersedia lebih kecil.', parent: { $step: s4_pdfViewer }, x: 30, y: 100, width: 480, props: { fontFamily: 'Inter', fontSize: 12, lineHeight: '22px', fill: '#CBD5E1' } });

// Highlighted Box in PDF
const s4_hlBox = addCommand('node.create', {
  type: 'frame',
  name: 'Highlighted Citation in PDF',
  parent: { $step: s4_pdfViewer },
  x: 24,
  y: 200,
  width: 492,
  height: 120,
  props: { fill: '#14273E', stroke: '#0091FF', strokeWeight: 1, cornerRadius: 10 }
});
addCommand('text.create', { text: '📌 Kutipan Ditemukan (Halaman 142 Paragraf 3):\n"Kelebihan utama paging adalah menghindari fragmentasi eksternal dan kebutuhan pemadatan (compaction), sehingga alokasi memori fisik menjadi sangat efisien."', parent: { $step: s4_hlBox }, x: 16, y: 20, width: 460, props: { fontFamily: 'Inter', fontSize: 12, lineHeight: '20px', fill: '#38BDF8' } });

// Split Right: AI Q&A Panel (560px wide)
const s4_qaPanel = addCommand('node.create', {
  type: 'frame',
  name: 'QA Panel Right',
  parent: { $step: s4 },
  x: 680,
  y: 80,
  width: 560,
  height: 720,
  props: { fill: '#0A0E17', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 20 }
});

addCommand('text.create', { text: '💬 Tanya Jawab Berdasarkan Modul Ini', parent: { $step: s4_qaPanel }, x: 24, y: 24, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// User question bubble
const s4_qBubble = addCommand('node.create', {
  type: 'frame',
  name: 'User Question',
  parent: { $step: s4_qaPanel },
  x: 24,
  y: 70,
  width: 512,
  height: 60,
  props: { fill: '#121C2B', stroke: '#1E324D', strokeWeight: 1, cornerRadius: 16 }
});
addCommand('text.create', { text: 'Apa alasan utama digunakannya konsep paging pada sistem operasi modern?', parent: { $step: s4_qBubble }, x: 18, y: 20, props: { fontFamily: 'Inter', fontSize: 12, fill: '#F1F5F9' } });

// AI answer bubble
const s4_aBubble = addCommand('node.create', {
  type: 'frame',
  name: 'AI Answer Bubble',
  parent: { $step: s4_qaPanel },
  x: 24,
  y: 150,
  width: 512,
  height: 380,
  props: { fill: '#070A10', stroke: '#141D2C', strokeWeight: 1, cornerRadius: 18 }
});
addCommand('text.create', { text: '⚡ Dijawab oleh Gemini 1.5 Pro • Rujukan: Halaman 142', parent: { $step: s4_aBubble }, x: 20, y: 16, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#38BDF8' } });
addCommand('text.create', { text: 'Berdasarkan Modul Bab 4 Halaman 142, alasan utama penerapan paging adalah:\n\n1. Mengeliminasi Fragmentasi Eksternal: Memori logis dibagi menjadi unit berukuran tetap (page), sehingga memori fisik (frame) dapat dialokasikan di mana saja tanpa memerlukan blok memori bersebelahan.\n\n2. Mencegah Pemadatan (Compaction): Sistem tidak perlu menggeser data proses di RAM untuk mencari ruang kosong yang membuang siklus CPU.\n\n3. Proteksi & Berbagi Halaman: Memudahkan pembagian kode baca-saja (shared libraries) antar proses secara aman.', parent: { $step: s4_aBubble }, x: 20, y: 44, width: 472, props: { fontFamily: 'Inter', fontSize: 12, lineHeight: '20px', fill: '#CBD5E1' } });

// Bottom Input Well
const s4_input = addCommand('node.create', {
  type: 'frame',
  name: 'QA Input Bar',
  parent: { $step: s4_qaPanel },
  x: 24,
  y: 630,
  width: 512,
  height: 60,
  props: { fill: '#0C1320', stroke: '#1A293D', strokeWeight: 1, cornerRadius: 30 }
});
addCommand('text.create', { text: 'Tanyakan bagian lain dari modul ini...', parent: { $step: s4_input }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 12, fill: '#64748B' } });


// =========================================================================
// 5. SCREEN 05: 05-Speech-to-Text-Kuliah (Whisper Audio & Transcript Editor)
// =========================================================================
const s5 = addCommand('node.create', {
  type: 'frame',
  name: '05-Speech-to-Text-Kuliah',
  x: 1340,
  y: 900,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s5, 4);

addCommand('text.create', { text: 'ricat  /  Alat Audio  /  Transkrip Suara Kuliah (Groq Whisper)', parent: { $step: s5 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

const s5_card = addCommand('node.create', {
  type: 'frame',
  name: 'STT Container Card',
  parent: { $step: s5 },
  x: 120,
  y: 90,
  width: 1120,
  height: 700,
  props: { fill: '#0A0E17', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 28 }
});

// Audio Player & Waveform Box
const s5_audioBar = addCommand('node.create', {
  type: 'frame',
  name: 'Audio Waveform Bar',
  parent: { $step: s5_card },
  x: 36,
  y: 36,
  width: 1048,
  height: 100,
  props: { fill: '#06090E', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 20 }
});

addCommand('text.create', { text: '▶️  Rekaman_Kuliah_Kecerdasan_Buatan_07Nov.mp3 (Durasi: 09:42)', parent: { $step: s5_audioBar }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'SemiBold', fill: '#F1F5F9' } });
addCommand('text.create', { text: ' ▂▃▅▆▇█▇▆▅▃▂ ▂▃▅▆▇█▇▆▅▃▂ ▂▃▅▆▇█▇▆▅▃▂ ▂▃▅▆▇█▇▆▅▃▂ (Gelombang Audio Aktif)', parent: { $step: s5_audioBar }, x: 24, y: 55, props: { fontFamily: 'Inter', fontSize: 14, fill: '#0091FF' } });

// Transcript Editor Area
const s5_txEditor = addCommand('node.create', {
  type: 'frame',
  name: 'Transcript Editor Area',
  parent: { $step: s5_card },
  x: 36,
  y: 160,
  width: 1048,
  height: 440,
  props: { fill: '#0D1420', stroke: '#1A293D', strokeWeight: 1, cornerRadius: 20 }
});

addCommand('text.create', { text: 'Hasil Transkrip Sinkron (Dapat Disunting Langsung):', parent: { $step: s5_txEditor }, x: 28, y: 24, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'SemiBold', fill: '#94A3B8' } });

const transcriptLines = [
  { time: '[00:15]', text: 'Selamat pagi rekan-rekan mahasiswa. Hari ini kita membahas konsep pembelajaran mesin terawasi (supervised learning).' },
  { time: '[01:42]', text: 'Perbedaan mendasar antara regresi dan klasifikasi terletak pada tipe variabel target yang diprediksi.' },
  { time: '[04:10]', text: 'Pada klasifikasi biner, kita memetakan data masukan ke dalam dua kelas berbeda menggunakan fungsi sigmoid.' },
  { time: '[07:30]', text: 'Jangan lupa tugas bab 3 dikumpulkan paling lambat minggu depan sebelum kuis evaluasi dimulai.' }
];

transcriptLines.forEach((t, idx) => {
  addCommand('text.create', { text: t.time + '  ' + t.text, parent: { $step: s5_txEditor }, x: 28, y: 70 + (idx * 50), width: 990, props: { fontFamily: 'Inter', fontSize: 13, lineHeight: '22px', fill: '#CBD5E1' } });
});

// Action Buttons Below
const s5_btnSum = addCommand('node.create', { type: 'frame', name: 'Btn Ringkas', parent: { $step: s5_card }, x: 36, y: 620, width: 220, height: 44, props: { fill: '#0091FF', cornerRadius: 14 } });
addCommand('text.create', { text: '📰 Buat Ringkasan Catatan', parent: { $step: s5_btnSum }, x: 24, y: 13, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#FFFFFF' } });

const s5_btnQuiz = addCommand('node.create', { type: 'frame', name: 'Btn Kuis', parent: { $step: s5_card }, x: 276, y: 620, width: 220, height: 44, props: { fill: '#141D2B', stroke: '#22324A', strokeWeight: 1, cornerRadius: 14 } });
addCommand('text.create', { text: '📚 Hasilkan Kuis dari Rekaman', parent: { $step: s5_btnQuiz }, x: 18, y: 13, props: { fontFamily: 'Inter', fontSize: 12, fill: '#CBD5E1' } });


// =========================================================================
// 6. SCREEN 06: 06-Ringkas-Jurnal-Akademik (Structured 4-Pillar Summary)
// =========================================================================
const s6 = addCommand('node.create', {
  type: 'frame',
  name: '06-Ringkas-Jurnal-Akademik',
  x: 2680,
  y: 900,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s6, 5);

addCommand('text.create', { text: 'ricat  /  Ringkasan Jurnal Ilmiah  /  Format Baku 4 Pilar', parent: { $step: s6 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// 4 Pillar Cards Grid
const pillars = [
  { x: 120, y: 100, title: '1. TUJUAN PENELITIAN', desc: 'Meneliti efisiensi komputasi arsitektur TinyML pada mikrokontroler Cortex-M4 untuk mendeteksi anomali getaran mesin industri secara real-time.', color: '#0091FF' },
  { x: 680, y: 100, title: '2. METODOLOGI & SAMPEL', desc: 'Eksperimen kuantitatif menggunakan dataset getaran IEEE PHM 2012 dengan kompresi bobot pruning 40% dan kuantisasi INT8 pada clock 64 MHz.', color: '#38BDF8' },
  { x: 120, y: 450, title: '3. TEMUAN KUNCI', desc: 'Akurasi deteksi mencapai 94.2% dengan penurunan latensi sebesar 3.8x dan konsumsi daya baterai berkurang hingga 45% dibanding baseline model.', color: '#34D399' },
  { x: 680, y: 450, title: '4. KETERBATASAN PENELITIAN', desc: 'Pengujian belum dilakukan pada kondisi suhu ekstrem di atas 70°C dan memori SRAM terbatas tidak memungkinkan model di atas 256 KB.', color: '#F59E0B' }
];

pillars.forEach(p => {
  const pCard = addCommand('node.create', {
    type: 'frame',
    name: 'Pillar ' + p.title,
    parent: { $step: s6 },
    x: p.x,
    y: p.y,
    width: 530,
    height: 320,
    props: { fill: '#0A0E17', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 24 }
  });

  addCommand('text.create', { text: p.title, parent: { $step: pCard }, x: 28, y: 28, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: p.color } });
  addCommand('text.create', { text: p.desc, parent: { $step: pCard }, x: 28, y: 70, width: 470, props: { fontFamily: 'Inter', fontSize: 13, lineHeight: '24px', fill: '#CBD5E1' } });
});


// =========================================================================
// 7. SCREEN 07: 07-Kuis-Flashcard-Belajar (Interactive Study Cards & Quiz)
// =========================================================================
const s7 = addCommand('node.create', {
  type: 'frame',
  name: '07-Kuis-Flashcard-Belajar',
  x: 0,
  y: 1800,
  width: 1280,
  height: 840,
  props: { fills: darkBgFills, cornerRadius: 32 }
});

addCapsuleDock(s7, 6);

addCommand('text.create', { text: 'ricat  /  Ruang Belajar  /  Flashcards & Kuis Latihan Mandiri', parent: { $step: s7 }, x: 120, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// Center Flashcard 3D Card
const s7_card = addCommand('node.create', {
  type: 'frame',
  name: 'Interactive Flashcard',
  parent: { $step: s7 },
  x: 340,
  y: 120,
  width: 680,
  height: 420,
  props: { fill: '#0C1320', stroke: '#1A293D', strokeWeight: 2, cornerRadius: 32 }
});

addCommand('text.create', { text: 'KARTU 03 DARI 20  •  TOPIK: JARINGAN KOMPUTER', parent: { $step: s7_card }, x: 36, y: 36, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#38BDF8' } });
addCommand('text.create', { text: 'Apa fungsi utama lapisan Transport (Layer 4) pada model referensi OSI?', parent: { $step: s7_card }, x: 36, y: 120, width: 600, props: { fontFamily: 'Inter', fontSize: 22, fontStyle: 'Bold', lineHeight: '32px', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Tekan Spasi untuk membalik kartu dan melihat pembahasan lengkap', parent: { $step: s7_card }, x: 36, y: 340, props: { fontFamily: 'Inter', fontSize: 12, fill: '#64748B' } });

// Card Action Controls Below
const s7_btnEasy = addCommand('node.create', { type: 'frame', name: 'Btn Ingat', parent: { $step: s7 }, x: 440, y: 580, width: 220, height: 50, props: { fill: '#16A34A', cornerRadius: 25 } });
addCommand('text.create', { text: '✓ Saya Mengerti (Ingat)', parent: { $step: s7_btnEasy }, x: 35, y: 15, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Bold', fill: '#FFFFFF' } });

const s7_btnHard = addCommand('node.create', { type: 'frame', name: 'Btn Ulangi', parent: { $step: s7 }, x: 680, y: 580, width: 220, height: 50, props: { fill: '#1E293B', cornerRadius: 25 } });
addCommand('text.create', { text: '⟳ Perlu Diulangi Lagi', parent: { $step: s7_btnHard }, x: 45, y: 15, props: { fontFamily: 'Inter', fontSize: 13, fill: '#CBD5E1' } });


// =========================================================================
// 8. SCREEN 08: 08-Dashboard-Admin-Management (Light Glass 1:1 Reference 2!)
// =========================================================================
const s8 = addCommand('node.create', {
  type: 'frame',
  name: '08-Dashboard-Admin-Management',
  x: 1340,
  y: 1800,
  width: 1280,
  height: 840,
  props: { fills: lightBgFills, cornerRadius: 32 }
});

// Sidebar White Glass (Ref 2 Style)
const s8_sidebar = addCommand('node.create', {
  type: 'frame',
  name: 'White Glass Sidebar',
  parent: { $step: s8 },
  x: 24,
  y: 24,
  width: 140,
  height: 792,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});

addCommand('text.create', { text: 'ricat', parent: { $step: s8_sidebar }, x: 24, y: 24, props: { fontFamily: 'Inter', fontSize: 18, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: '🏠  Beranda', parent: { $step: s8_sidebar }, x: 20, y: 180, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });
addCommand('text.create', { text: '📅  Jadwal', parent: { $step: s8_sidebar }, x: 20, y: 226, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });

// Active black pill
const s8_activeNav = addCommand('node.create', {
  type: 'frame',
  name: 'Active Black Pill Nav',
  parent: { $step: s8_sidebar },
  x: 12,
  y: 268,
  width: 116,
  height: 40,
  props: { fill: '#090D14', cornerRadius: 20 }
});
addCommand('text.create', { text: '⚙️  Admin', parent: { $step: s8_activeNav }, x: 16, y: 12, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

addCommand('text.create', { text: '📄  Dokumen', parent: { $step: s8_sidebar }, x: 20, y: 330, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });
addCommand('text.create', { text: '📊  Statistik', parent: { $step: s8_sidebar }, x: 20, y: 376, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });

addCommand('image.place', { path: avatarLightPath, parent: { $step: s8_sidebar }, x: 48, y: 690, width: 44, height: 44, name: 'Admin Avatar' });
addCommand('text.create', { text: 'M. Rifqi', parent: { $step: s8_sidebar }, x: 42, y: 742, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'SemiBold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Admin ricat', parent: { $step: s8_sidebar }, x: 38, y: 758, props: { fontFamily: 'Inter', fontSize: 10, fill: '#94A3B8' } });

// Header Controls
addCommand('text.create', { text: 'Management', parent: { $step: s8 }, x: 188, y: 36, props: { fontFamily: 'Inter', fontSize: 24, fontStyle: 'Bold', fill: '#0F172A' } });

const s8_datePill = addCommand('node.create', { type: 'frame', name: 'Date Pill', parent: { $step: s8 }, x: 188, y: 84, width: 140, height: 36, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 18 } });
addCommand('text.create', { text: '📅  NOV 7, 2026', parent: { $step: s8_datePill }, x: 16, y: 10, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'SemiBold', fill: '#334155' } });

const s8_periodToggle = addCommand('node.create', { type: 'frame', name: 'Period Toggle', parent: { $step: s8 }, x: 450, y: 84, width: 200, height: 36, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 18 } });
addCommand('text.create', { text: 'Hari    Minggu    Bulan    Tahun', parent: { $step: s8_periodToggle }, x: 18, y: 11, props: { fontFamily: 'Inter', fontSize: 11, fill: '#64748B' } });

const s8_searchPill = addCommand('node.create', { type: 'frame', name: 'Search Pill', parent: { $step: s8 }, x: 700, y: 32, width: 240, height: 44, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 22 } });
const s8_searchBtn = addCommand('node.create', { type: 'frame', name: 'Search Btn', parent: { $step: s8_searchPill }, x: 6, y: 6, width: 32, height: 32, props: { fill: '#090D14', cornerRadius: 16 } });
addCommand('text.create', { text: '🔍', parent: { $step: s8_searchBtn }, x: 9, y: 8, props: { fontSize: 12, fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Cari mahasiswa / berkas...', parent: { $step: s8_searchPill }, x: 48, y: 14, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });

const s8_bellBtn = addCommand('node.create', { type: 'frame', name: 'Bell Btn', parent: { $step: s8 }, x: 960, y: 32, width: 44, height: 44, props: { fill: '#090D14', cornerRadius: 22 } });
addCommand('text.create', { text: '🔔', parent: { $step: s8_bellBtn }, x: 14, y: 14, props: { fontSize: 14 } });

const s8_bellBadge = addCommand('node.create', { type: 'frame', name: 'Badge +3', parent: { $step: s8 }, x: 990, y: 26, width: 24, height: 18, props: { fill: '#DC2626', cornerRadius: 9 } });
addCommand('text.create', { text: '+3', parent: { $step: s8_bellBadge }, x: 4, y: 2, props: { fontFamily: 'Inter', fontSize: 10, fontStyle: 'Bold', fill: '#FFFFFF' } });

// Widget 1: Usage Card
const s8_usageCard = addCommand('node.create', { type: 'frame', name: 'Ongoing Usage Card', parent: { $step: s8 }, x: 580, y: 136, width: 280, height: 250, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 } });
addCommand('text.create', { text: 'Penggunaan Biaya API', parent: { $step: s8_usageCard }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: '28,5%', parent: { $step: s8_usageCard }, x: 24, y: 64, props: { fontFamily: 'Inter', fontSize: 28, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Dibanding batas plafon ($15)', parent: { $step: s8_usageCard }, x: 24, y: 100, props: { fontFamily: 'Inter', fontSize: 10, fill: '#64748B' } });
addCommand('text.create', { text: '∿∿∿ (Grafik Stabil Rendah)', parent: { $step: s8_usageCard }, x: 24, y: 125, props: { fontFamily: 'Inter', fontSize: 18, fill: '#0F172A' } });
addCommand('text.create', { text: '• Claude 3.5: $3.80\n• Gemini 1.5: $0.00 (Gratis)\n• Whisper STT: $0.40', parent: { $step: s8_usageCard }, x: 24, y: 170, width: 230, props: { fontFamily: 'Inter', fontSize: 11, lineHeight: '18px', fill: '#475569' } });

// Widget 2: Obsidian Black Card with 3D Liquid Sphere (Exact Ref 2!)
const s8_filePreviewCard = addCommand('node.create', { type: 'frame', name: 'Obsidian Black Card', parent: { $step: s8 }, x: 880, y: 136, width: 350, height: 250, props: { fill: '#090D14', cornerRadius: 24 } });
addCommand('text.create', { text: '📄 File Preview', parent: { $step: s8_filePreviewCard }, x: 24, y: 18, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
addCommand('image.place', { path: spherePath, parent: { $step: s8_filePreviewCard }, x: 100, y: 50, width: 150, height: 150, name: 'Liquid Sphere' });
addCommand('text.create', { text: 'Tugas_Akhir_Sistem_Tertanam.docx', parent: { $step: s8_filePreviewCard }, x: 24, y: 205, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Medium', fill: '#F1F5F9' } });
addCommand('text.create', { text: '14.8 MB • Format IEEE Selesai Diproses', parent: { $step: s8_filePreviewCard }, x: 24, y: 222, props: { fontFamily: 'Inter', fontSize: 10, fill: '#94A3B8' } });

// Widget 3: Activity Timeline
const s8_timelineCard = addCommand('node.create', { type: 'frame', name: 'Timeline Card', parent: { $step: s8 }, x: 188, y: 136, width: 370, height: 250, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 } });
addCommand('text.create', { text: 'Aktivitas AI & Konversi Berkas', parent: { $step: s8_timelineCard }, x: 20, y: 18, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Bold', fill: '#0F172A' } });

const s8_bar1 = addCommand('node.create', { type: 'frame', name: 'Bar 1', parent: { $step: s8_timelineCard }, x: 20, y: 52, width: 220, height: 32, props: { fill: '#090D14', cornerRadius: 16 } });
addCommand('text.create', { text: 'Claude 3.5: Buat Makalah (2 jam lalu)', parent: { $step: s8_bar1 }, x: 14, y: 9, props: { fontFamily: 'Inter', fontSize: 10, fill: '#FFFFFF' } });

const s8_bar2 = addCommand('node.create', { type: 'frame', name: 'Bar 2', parent: { $step: s8_timelineCard }, x: 60, y: 94, width: 260, height: 32, props: { fill: '#090D14', cornerRadius: 16 } });
addCommand('text.create', { text: 'LibreOffice: Konversi DOCX ke PDF', parent: { $step: s8_bar2 }, x: 14, y: 9, props: { fontFamily: 'Inter', fontSize: 10, fill: '#FFFFFF' } });

const s8_btnKill = addCommand('node.create', { type: 'frame', name: 'Kill Switch Pill', parent: { $step: s8_timelineCard }, x: 20, y: 190, width: 330, height: 44, props: { fill: '#FEE2E2', stroke: '#EF4444', strokeWeight: 1, cornerRadius: 22 } });
addCommand('text.create', { text: '🛡️ Tombol Darurat API Berbayar: AKTIF (Aman)', parent: { $step: s8_btnKill }, x: 24, y: 14, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#DC2626' } });

// Bottom Row: Files Capsule Card
const s8_filesCard = addCommand('node.create', { type: 'frame', name: 'All Files Card', parent: { $step: s8 }, x: 188, y: 406, width: 320, height: 390, props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 } });
addCommand('text.create', { text: '📁 Berkas & Dokumen', parent: { $step: s8_filesCard }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#0F172A' } });

const filePills = [
  { name: 'Makalah_Jaringan_Saraf.docx', y: 60 },
  { name: 'Modul_Sistem_Embedded.pdf', y: 120 },
  { name: 'Slide_Presentasi_Tugas.pptx', y: 180 },
  { name: 'Data_Sensor_Eksperimen.xlsx', y: 240 },
  { name: 'Transkrip_Kuliah_Dosen.txt', y: 300 }
];

filePills.forEach(fp => {
  const p = addCommand('node.create', { type: 'frame', name: 'File Pill', parent: { $step: s8_filesCard }, x: 20, y: fp.y, width: 280, height: 48, props: { fill: '#F8FAFC', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 } });
  addCommand('text.create', { text: '📄  ' + fp.name, parent: { $step: p }, x: 16, y: 16, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#334155' } });
});

// Bottom Row: Team & Approval Obsidian Card
const s8_bottomObsidianCard = addCommand('node.create', { type: 'frame', name: 'Team & Approval Obsidian Card', parent: { $step: s8 }, x: 528, y: 406, width: 702, height: 390, props: { fill: '#090D14', cornerRadius: 24 } });
addCommand('text.create', { text: 'Persetujuan Mahasiswa Baru & Metrik Sistem', parent: { $step: s8_bottomObsidianCard }, x: 24, y: 22, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Total Mahasiswa: 1.240 (+12)   •   Pengguna Aktif: 562   •   Rasio Model Gratis: 91%', parent: { $step: s8_bottomObsidianCard }, x: 24, y: 52, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });

const studentsLight = [
  { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@mhs.kampus.ac.id', y: 90 },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@mhs.kampus.ac.id', y: 154 },
  { name: 'Dimas Wicaksono', email: 'dimas.w@mhs.kampus.ac.id', y: 218 }
];

studentsLight.forEach(st => {
  const r = addCommand('node.create', { type: 'frame', name: 'Row ' + st.name, parent: { $step: s8_bottomObsidianCard }, x: 24, y: st.y, width: 654, height: 52, props: { fill: '#101622', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 16 } });
  addCommand('text.create', { text: st.name, parent: { $step: r }, x: 20, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
  addCommand('text.create', { text: st.email, parent: { $step: r }, x: 180, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' } });
  addCommand('text.create', { text: '✓ OTP Terverifikasi', parent: { $step: r }, x: 420, y: 17, props: { fontFamily: 'Inter', fontSize: 11, fill: '#34D399' } });

  const btnApp = addCommand('node.create', { type: 'frame', name: 'Btn Setujui', parent: { $step: r }, x: 550, y: 10, width: 84, height: 32, props: { fill: '#FFFFFF', cornerRadius: 16 } });
  addCommand('text.create', { text: 'Setujui', parent: { $step: btnApp }, x: 22, y: 8, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#090D14' } });
});

// Output
const outPath = path.join(__dirname, 'all-ricat-screens-batch.json');
fs.writeFileSync(outPath, JSON.stringify(commands, null, 2), 'utf-8');
console.log(`Generated ${commands.length} batch commands for all 8 screens.`);

