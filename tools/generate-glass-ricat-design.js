/**
 * Ultimate Glassmorphism Design Generator for ricat
 * Combining:
 * - Ref 1 (Iconsax / Rabbits): Capsule dock, glowing magenta/purple pill border, crisp linear icons.
 * - Ref 2 (Coders Management): Frosted light glass dashboard, obsidian black cards with 3D liquid sphere,
 *   capsule pills, search docks, notification badges (+9), and timeline charts.
 *
 * Artboards generated:
 * 1. 01-Dark-Glass-Workspace (Dark AI Chat Hub + Glass Notification Toast + Refined Capsule Pills)
 * 2. 02-Dark-Glass-Generating (Generating / Loading state with 3D liquid sphere & live step checklist)
 * 3. 03-Dark-Glass-Admin-Safety (Dark Glass Admin Dashboard with Kill Switch & approval queue)
 * 4. 04-Light-Glass-Admin-Dashboard (1:1 adaptation of Ref 2 Light Glass Management)
 * 5. 05-Light-Glass-Workspace (Light Glass AI Chat Hub with frosted white glass prompt & 3D orb)
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


// =========================================================================
// FRAME 01: 01-Dark-Glass-Workspace (Dark AI Hub & Notification Toast)
// =========================================================================
const s1 = addCommand('node.create', {
  type: 'frame',
  name: '01-Dark-Glass-Workspace',
  x: 0,
  y: 0,
  width: 1280,
  height: 840,
  props: { fill: '#06090E', cornerRadius: 32 }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient Purple Glow',
  parent: { $step: s1 },
  x: -60,
  y: 120,
  width: 380,
  height: 380,
  props: { fill: '#3B0764', opacity: 0.3 }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient Cyan Glow',
  parent: { $step: s1 },
  x: 960,
  y: 520,
  width: 380,
  height: 380,
  props: { fill: '#082F49', opacity: 0.35 }
});

// Sleek dark capsule dock (Ref 1 style)
const s1_dock = addCommand('node.create', {
  type: 'frame',
  name: 'Glass Capsule Dock',
  parent: { $step: s1 },
  x: 32,
  y: 32,
  width: 64,
  height: 776,
  props: { fill: '#0A0E17', stroke: '#1A2333', strokeWeight: 1, cornerRadius: 32 }
});

addCommand('text.create', { text: '❖', parent: { $step: s1_dock }, x: 23, y: 28, props: { fontSize: 18, fill: '#FFFFFF' } });

// Active nav item: Glowing magenta/purple pill border (Ref 1)
const s1_navActive = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Chat Active (Glowing Pill)',
  parent: { $step: s1_dock },
  x: 12,
  y: 84,
  width: 40,
  height: 40,
  props: { fill: '#150D24', stroke: '#C026D3', strokeWeight: 2, cornerRadius: 20 }
});
addCommand('text.create', { text: '💬', parent: { $step: s1_navActive }, x: 10, y: 10, props: { fontSize: 16, fill: '#F0ABFC' } });

const darkNavIcons = [
  { icon: '📄', y: 144, name: 'Nav-Doc' },
  { icon: '🔍', y: 204, name: 'Nav-PDF' },
  { icon: '🔄', y: 264, name: 'Nav-Convert' },
  { icon: '🎙️', y: 324, name: 'Nav-STT' },
  { icon: '📊', y: 384, name: 'Nav-Analytics' }
];

darkNavIcons.forEach(item => {
  const n = addCommand('node.create', {
    type: 'frame',
    name: item.name,
    parent: { $step: s1_dock },
    x: 12,
    y: item.y,
    width: 40,
    height: 40,
    props: { fill: '#0A0E17', cornerRadius: 20 }
  });
  addCommand('text.create', { text: item.icon, parent: { $step: n }, x: 11, y: 10, props: { fontSize: 15, fill: '#64748B' } });
});

const s1_dockSet = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Settings',
  parent: { $step: s1_dock },
  x: 12,
  y: 650,
  width: 40,
  height: 40,
  props: { fill: '#0A0E17', cornerRadius: 20 }
});
addCommand('text.create', { text: '⚙️', parent: { $step: s1_dockSet }, x: 11, y: 11, props: { fontSize: 15, fill: '#64748B' } });

addCommand('image.place', {
  path: avatarDarkPath,
  parent: { $step: s1_dock },
  x: 12,
  y: 710,
  width: 40,
  height: 40,
  name: 'User Avatar'
});

// Floating Glass Notification Toast (Top Right)
const s1_toast = addCommand('node.create', {
  type: 'frame',
  name: 'Glass Notification Toast',
  parent: { $step: s1 },
  x: 880,
  y: 32,
  width: 360,
  height: 52,
  props: { fill: '#0E1624', stroke: '#1E2D44', strokeWeight: 1, cornerRadius: 26 }
});

const s1_toastBell = addCommand('node.create', {
  type: 'frame',
  name: 'Toast Bell Icon',
  parent: { $step: s1_toast },
  x: 10,
  y: 8,
  width: 36,
  height: 36,
  props: { fill: '#1E293B', cornerRadius: 18 }
});
addCommand('text.create', { text: '🔔', parent: { $step: s1_toastBell }, x: 10, y: 9, props: { fontSize: 14 } });
addCommand('text.create', { text: 'Kuota Harian Tersedia: 45/50 Chat', parent: { $step: s1_toast }, x: 56, y: 12, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#F1F5F9' } });
addCommand('text.create', { text: 'Model utama: Claude 3.5 Sonnet aktif', parent: { $step: s1_toast }, x: 56, y: 28, props: { fontFamily: 'Inter', fontSize: 10, fill: '#38BDF8' } });

const s1_toastBadge = addCommand('node.create', {
  type: 'frame',
  name: 'Toast Badge Pill',
  parent: { $step: s1_toast },
  x: 300,
  y: 14,
  width: 44,
  height: 24,
  props: { fill: '#0091FF', cornerRadius: 12 }
});
addCommand('text.create', { text: 'RESET', parent: { $step: s1_toastBadge }, x: 7, y: 5, props: { fontFamily: 'Inter', fontSize: 9, fontStyle: 'Bold', fill: '#FFFFFF' } });

// Center Hero
addCommand('image.place', { path: orbPath, parent: { $step: s1 }, x: 576, y: 100, width: 128, height: 128, name: 'Iridescent Glass Orb' });
addCommand('text.create', { text: 'Hi, Mahasiswa', parent: { $step: s1 }, x: 580, y: 244, props: { fontFamily: 'Inter', fontSize: 18, fill: '#8E95A5' } });
addCommand('text.create', { text: 'How can I help today?', parent: { $step: s1 }, x: 440, y: 276, props: { fontFamily: 'Inter', fontSize: 34, fontStyle: 'Bold', fill: '#FFFFFF' } });
addCommand('text.create', { text: "Bantuan tugas kuliah terstruktur: draf laporan, tanya modul, atau konversi file.", parent: { $step: s1 }, x: 410, y: 324, props: { fontFamily: 'Inter', fontSize: 13, fill: '#5A6272' } });

// Floating Glass Prompt Card
const s1_promptCard = addCommand('node.create', {
  type: 'frame',
  name: 'Frosted Glass Prompt Box',
  parent: { $step: s1 },
  x: 290,
  y: 366,
  width: 700,
  height: 154,
  props: { fill: '#0D1522', stroke: '#1A293D', strokeWeight: 1, cornerRadius: 24 }
});

const s1_statusPill = addCommand('node.create', {
  type: 'frame',
  name: 'Prompt Status Pill',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 12,
  width: 668,
  height: 28,
  props: { fill: '#101E2E', stroke: '#1C3955', strokeWeight: 1, cornerRadius: 8 }
});
addCommand('text.create', { text: '⚡ Mode Akademik: Validasi sitasi otomatis aktif • Didukung Claude 3.5 & Gemini 1.5 Pro', parent: { $step: s1_statusPill }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#38BDF8' } });

const s1_inputWell = addCommand('node.create', {
  type: 'frame',
  name: 'Sunken Input Well',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 48,
  width: 668,
  height: 90,
  props: { fill: '#060A0F', stroke: '#141D28', strokeWeight: 1, cornerRadius: 16 }
});
addCommand('text.create', { text: 'Tanyakan materi kuliah, masukkan topik tugas, atau ketik /...', parent: { $step: s1_inputWell }, x: 18, y: 18, props: { fontFamily: 'Inter', fontSize: 14, fill: '#4A5568' } });

const s1_pillImport = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Import File',
  parent: { $step: s1_inputWell },
  x: 16,
  y: 50,
  width: 116,
  height: 28,
  props: { fill: '#0F1722', stroke: '#22324A', strokeWeight: 1, cornerRadius: 14 }
});
addCommand('text.create', { text: '📎 Import file', parent: { $step: s1_pillImport }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#94A3B8' } });

const s1_pillTools = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Tools',
  parent: { $step: s1_inputWell },
  x: 140,
  y: 50,
  width: 90,
  height: 28,
  props: { fill: '#0F1722', stroke: '#22324A', strokeWeight: 1, cornerRadius: 14 }
});
addCommand('text.create', { text: '⚙️ Tools', parent: { $step: s1_pillTools }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#94A3B8' } });

const s1_btnSend = addCommand('node.create', {
  type: 'frame',
  name: 'Send Button (Glowing)',
  parent: { $step: s1_inputWell },
  x: 620,
  y: 48,
  width: 34,
  height: 34,
  props: { fill: '#0091FF', cornerRadius: 17 }
});
addCommand('text.create', { text: '↑', parent: { $step: s1_btnSend }, x: 12, y: 7, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'Bold', fill: '#FFFFFF' } });

// 3 Shortcut Cards
const cards1 = [
  { x: 290, icon: '📄', title: 'Draf Makalah & Sitasi', desc: 'Susun bab tugas kuliah dengan format baku APA atau IEEE.' },
  { x: 530, icon: '🔍', title: 'Tanya Modul & PDF', desc: 'Ekstrak jawaban dari buku kuliah dengan kutipan nomor halaman.' },
  { x: 770, icon: '🔄', title: 'Konversi & Kompres', desc: 'Ubah berkas DOCX/PPTX ke PDF dan sesuaikan batas portal kampus.' }
];

cards1.forEach(c => {
  const cd = addCommand('node.create', {
    type: 'frame',
    name: 'Card ' + c.title,
    parent: { $step: s1 },
    x: c.x,
    y: 540,
    width: 220,
    height: 104,
    props: { fill: '#0D141F', stroke: '#182434', strokeWeight: 1, cornerRadius: 18 }
  });
  addCommand('text.create', { text: c.icon + '  ' + c.title, parent: { $step: cd }, x: 16, y: 16, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#F1F5F9' } });
  addCommand('text.create', { text: c.desc, parent: { $step: cd }, x: 16, y: 42, width: 188, props: { fontFamily: 'Inter', fontSize: 11, lineHeight: '16px', fill: '#64748B' } });
});


// =========================================================================
// FRAME 02: 02-Dark-Glass-Generating (State: Loading & Generation)
// =========================================================================
const s2 = addCommand('node.create', {
  type: 'frame',
  name: '02-Dark-Glass-Generating',
  x: 1340,
  y: 0,
  width: 1280,
  height: 840,
  props: { fill: '#06090E', cornerRadius: 32 }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Shimmer Ambient Light',
  parent: { $step: s2 },
  x: 440,
  y: 180,
  width: 400,
  height: 400,
  props: { fill: '#0284C7', opacity: 0.25 }
});

addCommand('text.create', { text: 'ricat  /  Generator Dokumen & Pemrosesan Berkas', parent: { $step: s2 }, x: 48, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

const s2_modal = addCommand('node.create', {
  type: 'frame',
  name: 'Glass Processing Card',
  parent: { $step: s2 },
  x: 290,
  y: 120,
  width: 700,
  height: 620,
  props: { fill: '#0D1420', stroke: '#1A293D', strokeWeight: 1, cornerRadius: 28 }
});

addCommand('image.place', { path: spherePath, parent: { $step: s2_modal }, x: 275, y: 40, width: 150, height: 150, name: '3D Liquid Core Graphic' });
addCommand('text.create', { text: 'Sedang Menyusun Bab Laporan & Validasi Sitasi...', parent: { $step: s2_modal }, x: 150, y: 215, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'Bold', fill: '#F8FAFC' } });
addCommand('text.create', { text: 'Model: Claude 3.5 Sonnet  •  Pemeriksaan kutipan IEEE terhadap basis data jurnal', parent: { $step: s2_modal }, x: 130, y: 245, props: { fontFamily: 'Inter', fontSize: 12, fill: '#64748B' } });

const s2_pTrack = addCommand('node.create', {
  type: 'frame',
  name: 'Progress Bar Track',
  parent: { $step: s2_modal },
  x: 60,
  y: 290,
  width: 580,
  height: 10,
  props: { fill: '#141D2B', cornerRadius: 5 }
});
addCommand('node.create', {
  type: 'frame',
  name: 'Progress Bar Glow Fill 76%',
  parent: { $step: s2_pTrack },
  x: 0,
  y: 0,
  width: 440,
  height: 10,
  props: { fill: '#0091FF', cornerRadius: 5 }
});
addCommand('text.create', { text: '76% Selesai  •  Estimasi 8 detik tersisa', parent: { $step: s2_modal }, x: 60, y: 312, props: { fontFamily: 'JetBrains Mono', fontSize: 11, fill: '#38BDF8' } });

const s2_listBox = addCommand('node.create', {
  type: 'frame',
  name: 'Checklist Step Box',
  parent: { $step: s2_modal },
  x: 60,
  y: 345,
  width: 580,
  height: 180,
  props: { fill: '#080C13', stroke: '#141E2C', strokeWeight: 1, cornerRadius: 16 }
});

const steps = [
  { text: '✓ 1. Ekstraksi poin-poin materi dari berkas PDF terunggah', color: '#34D399', y: 20 },
  { text: '✓ 2. Penyusunan narasi bab sesuai format baku IEEE (Times New Roman)', color: '#34D399', y: 55 },
  { text: '⟳ 3. Validasi klaim terhadap 2 sumber rujukan resmi (Sedang berjalan...)', color: '#38BDF8', y: 90 },
  { text: '○ 4. Ekspor ke dokumen Microsoft Word (.docx)', color: '#64748B', y: 125 }
];

steps.forEach(st => {
  addCommand('text.create', { text: st.text, parent: { $step: s2_listBox }, x: 20, y: st.y, props: { fontFamily: 'Inter', fontSize: 12, fill: st.color } });
});

const s2_btnCancel = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Batal',
  parent: { $step: s2_modal },
  x: 275,
  y: 550,
  width: 150,
  height: 40,
  props: { fill: '#141D2B', stroke: '#1F2E44', strokeWeight: 1, cornerRadius: 20 }
});
addCommand('text.create', { text: 'Batalkan Proses', parent: { $step: s2_btnCancel }, x: 28, y: 11, props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' } });


// =========================================================================
// FRAME 03: 03-Dark-Glass-Admin-Safety (Dark Glass Admin Dashboard)
// =========================================================================
const s3 = addCommand('node.create', {
  type: 'frame',
  name: '03-Dark-Glass-Admin-Safety',
  x: 0,
  y: 900,
  width: 1280,
  height: 840,
  props: { fill: '#06090E', cornerRadius: 32 }
});

addCommand('text.create', { text: 'ricat  /  Panel Administrator  •  Pemantauan Sistem & Keamanan Biaya', parent: { $step: s3 }, x: 48, y: 40, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

// Emergency Kill Switch Banner (Red Glass Banner)
const s3_killBanner = addCommand('node.create', {
  type: 'frame',
  name: 'Emergency Kill Switch Banner',
  parent: { $step: s3 },
  x: 48,
  y: 84,
  width: 1184,
  height: 72,
  props: { fill: '#1F0C10', stroke: '#DC2626', strokeWeight: 1, cornerRadius: 18 }
});

addCommand('text.create', { text: '🛡️ TOMBOL DARURAT API BERBAYAR: STATUS AKTIF (AMAN)', parent: { $step: s3_killBanner }, x: 24, y: 16, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Bold', fill: '#F87171' } });
addCommand('text.create', { text: 'Pengeluaran terkendali ($4.20 / $15.00 plafon). Klik untuk memutus seketika Claude & OpenAI bila terjadi lonjakan abnormal.', parent: { $step: s3_killBanner }, x: 24, y: 40, props: { fontFamily: 'Inter', fontSize: 12, fill: '#FECACA' } });

const s3_btnKill = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Matikan API',
  parent: { $step: s3_killBanner },
  x: 980,
  y: 16,
  width: 180,
  height: 40,
  props: { fill: '#DC2626', cornerRadius: 20 }
});
addCommand('text.create', { text: 'Matikan API Sekarang', parent: { $step: s3_btnKill }, x: 24, y: 11, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#FFFFFF' } });

// 3 Metric Glass Cards
const adminCardsDark = [
  { x: 48, title: 'Biaya API Bulan Berjalan', val: '$4.20  /  Plafon $15.00', sub: 'Utilisasi 28% (Aman di bawah batas 80%)', color: '#34D399' },
  { x: 456, title: 'Antrean Mahasiswa Baru', val: '3 Calon Pengguna', sub: 'Menunggu persetujuan aktivasi akun', color: '#F59E0B' },
  { x: 864, title: 'Pembagian Beban Model', val: '91% Gratis  •  9% Berbayar', sub: 'Gemini menangani mayoritas kueri chat', color: '#38BDF8' }
];

adminCardsDark.forEach(c => {
  const cd = addCommand('node.create', {
    type: 'frame',
    name: 'Stat ' + c.title,
    parent: { $step: s3 },
    x: c.x,
    y: 176,
    width: 368,
    height: 104,
    props: { fill: '#0D141F', stroke: '#182434', strokeWeight: 1, cornerRadius: 18 }
  });
  addCommand('text.create', { text: c.title, parent: { $step: cd }, x: 20, y: 16, props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' } });
  addCommand('text.create', { text: c.val, parent: { $step: cd }, x: 20, y: 40, props: { fontFamily: 'Inter', fontSize: 18, fontStyle: 'Bold', fill: '#FFFFFF' } });
  addCommand('text.create', { text: c.sub, parent: { $step: cd }, x: 20, y: 72, props: { fontFamily: 'Inter', fontSize: 11, fill: c.color } });
});

// User Approval Table in Dark Glass
const s3_tableBox = addCommand('node.create', {
  type: 'frame',
  name: 'Approval Table Box',
  parent: { $step: s3 },
  x: 48,
  y: 304,
  width: 1184,
  height: 490,
  props: { fill: '#0C131E', stroke: '#182434', strokeWeight: 1, cornerRadius: 22 }
});
addCommand('text.create', { text: 'Antrean Persetujuan Mahasiswa (Pending Approval)', parent: { $step: s3_tableBox }, x: 24, y: 24, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

const studentList = [
  { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@mhs.kampus.ac.id', y: 70 },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@mhs.kampus.ac.id', y: 134 },
  { name: 'Dimas Wicaksono', email: 'dimas.w@mhs.kampus.ac.id', y: 198 }
];

studentList.forEach(st => {
  const row = addCommand('node.create', {
    type: 'frame',
    name: 'Row ' + st.name,
    parent: { $step: s3_tableBox },
    x: 24,
    y: st.y,
    width: 1136,
    height: 52,
    props: { fill: '#080E17', stroke: '#141E2C', strokeWeight: 1, cornerRadius: 12 }
  });
  addCommand('text.create', { text: st.name, parent: { $step: row }, x: 20, y: 17, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Medium', fill: '#F1F5F9' } });
  addCommand('text.create', { text: st.email, parent: { $step: row }, x: 300, y: 17, props: { fontFamily: 'Inter', fontSize: 13, fill: '#94A3B8' } });
  addCommand('text.create', { text: '✓ Email Terverifikasi OTP', parent: { $step: row }, x: 680, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fill: '#34D399' } });

  const btnApprove = addCommand('node.create', {
    type: 'frame',
    name: 'Btn Setujui',
    parent: { $step: row },
    x: 930,
    y: 10,
    width: 90,
    height: 32,
    props: { fill: '#16A34A', cornerRadius: 16 }
  });
  addCommand('text.create', { text: 'Setujui', parent: { $step: btnApprove }, x: 23, y: 8, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

  const btnReject = addCommand('node.create', {
    type: 'frame',
    name: 'Btn Tolak',
    parent: { $step: row },
    x: 1030,
    y: 10,
    width: 80,
    height: 32,
    props: { fill: '#162232', cornerRadius: 16 }
  });
  addCommand('text.create', { text: 'Tolak', parent: { $step: btnReject }, x: 22, y: 8, props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' } });
});


// =========================================================================
// FRAME 04: 04-Light-Glass-Admin-Dashboard (1:1 Ref 2 Coders Management!)
// =========================================================================
const s4 = addCommand('node.create', {
  type: 'frame',
  name: '04-Light-Glass-Admin-Dashboard',
  x: 1340,
  y: 900,
  width: 1280,
  height: 840,
  props: { fill: '#ECEEF2', cornerRadius: 32 }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient White Shape 1',
  parent: { $step: s4 },
  x: 420,
  y: -50,
  width: 500,
  height: 300,
  props: { fill: '#FFFFFF', opacity: 0.6 }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient White Shape 2',
  parent: { $step: s4 },
  x: 700,
  y: 500,
  width: 600,
  height: 400,
  props: { fill: '#FFFFFF', opacity: 0.5 }
});

// Left White Frosted Sidebar (Ref 2 Style)
const s4_sidebar = addCommand('node.create', {
  type: 'frame',
  name: 'White Glass Sidebar',
  parent: { $step: s4 },
  x: 24,
  y: 24,
  width: 140,
  height: 792,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});

addCommand('text.create', { text: 'ricat', parent: { $step: s4_sidebar }, x: 24, y: 24, props: { fontFamily: 'Inter', fontSize: 18, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: '🏠  Beranda', parent: { $step: s4_sidebar }, x: 20, y: 180, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });
addCommand('text.create', { text: '📅  Jadwal', parent: { $step: s4_sidebar }, x: 20, y: 226, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });

// ACTIVE NAV ITEM: Solid Jet Black Pill (Like Ref 2 "Projects" active pill!)
const s4_activeNav = addCommand('node.create', {
  type: 'frame',
  name: 'Active Black Pill Nav',
  parent: { $step: s4_sidebar },
  x: 12,
  y: 268,
  width: 116,
  height: 40,
  props: { fill: '#090D14', cornerRadius: 20 }
});
addCommand('text.create', { text: '⚙️  Admin', parent: { $step: s4_activeNav }, x: 16, y: 12, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

addCommand('text.create', { text: '📄  Dokumen', parent: { $step: s4_sidebar }, x: 20, y: 330, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });
addCommand('text.create', { text: '📊  Statistik', parent: { $step: s4_sidebar }, x: 20, y: 376, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });

addCommand('image.place', { path: avatarLightPath, parent: { $step: s4_sidebar }, x: 48, y: 690, width: 44, height: 44, name: 'Admin Avatar' });
addCommand('text.create', { text: 'M. Rifqi', parent: { $step: s4_sidebar }, x: 42, y: 742, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'SemiBold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Admin ricat', parent: { $step: s4_sidebar }, x: 38, y: 758, props: { fontFamily: 'Inter', fontSize: 10, fill: '#94A3B8' } });

// Top Controls
addCommand('text.create', { text: 'Management', parent: { $step: s4 }, x: 188, y: 36, props: { fontFamily: 'Inter', fontSize: 24, fontStyle: 'Bold', fill: '#0F172A' } });

const s4_datePill = addCommand('node.create', {
  type: 'frame',
  name: 'Date Selector Pill',
  parent: { $step: s4 },
  x: 188,
  y: 84,
  width: 140,
  height: 36,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 18 }
});
addCommand('text.create', { text: '📅  NOV 7, 2026', parent: { $step: s4_datePill }, x: 16, y: 10, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'SemiBold', fill: '#334155' } });

const s4_periodToggle = addCommand('node.create', {
  type: 'frame',
  name: 'Period Toggle Pill',
  parent: { $step: s4 },
  x: 450,
  y: 84,
  width: 200,
  height: 36,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 18 }
});
addCommand('text.create', { text: 'Hari    Minggu    Bulan    Tahun', parent: { $step: s4_periodToggle }, x: 18, y: 11, props: { fontFamily: 'Inter', fontSize: 11, fill: '#64748B' } });

const s4_searchPill = addCommand('node.create', {
  type: 'frame',
  name: 'Search Bar Pill',
  parent: { $step: s4 },
  x: 700,
  y: 32,
  width: 240,
  height: 44,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 22 }
});
const s4_searchBtn = addCommand('node.create', {
  type: 'frame',
  name: 'Search Black Button',
  parent: { $step: s4_searchPill },
  x: 6,
  y: 6,
  width: 32,
  height: 32,
  props: { fill: '#090D14', cornerRadius: 16 }
});
addCommand('text.create', { text: '🔍', parent: { $step: s4_searchBtn }, x: 9, y: 8, props: { fontSize: 12, fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Cari mahasiswa / berkas...', parent: { $step: s4_searchPill }, x: 48, y: 14, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });

const s4_bellBtn = addCommand('node.create', {
  type: 'frame',
  name: 'Bell Black Button',
  parent: { $step: s4 },
  x: 960,
  y: 32,
  width: 44,
  height: 44,
  props: { fill: '#090D14', cornerRadius: 22 }
});
addCommand('text.create', { text: '🔔', parent: { $step: s4_bellBtn }, x: 14, y: 14, props: { fontSize: 14 } });

const s4_bellBadge = addCommand('node.create', {
  type: 'frame',
  name: 'Badge +3 Pill',
  parent: { $step: s4 },
  x: 990,
  y: 26,
  width: 24,
  height: 18,
  props: { fill: '#DC2626', cornerRadius: 9 }
});
addCommand('text.create', { text: '+3', parent: { $step: s4_bellBadge }, x: 4, y: 2, props: { fontFamily: 'Inter', fontSize: 10, fontStyle: 'Bold', fill: '#FFFFFF' } });

// Main Dashboard Widgets (Ref 2 Layout)
// Widget 1: Usage Card
const s4_usageCard = addCommand('node.create', {
  type: 'frame',
  name: 'Ongoing Usage Card',
  parent: { $step: s4 },
  x: 580,
  y: 136,
  width: 280,
  height: 250,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});
addCommand('text.create', { text: 'Penggunaan Biaya API', parent: { $step: s4_usageCard }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Tren bulan berjalan', parent: { $step: s4_usageCard }, x: 24, y: 38, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });
addCommand('text.create', { text: '28,5%', parent: { $step: s4_usageCard }, x: 24, y: 64, props: { fontFamily: 'Inter', fontSize: 28, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Dibanding batas plafon ($15)', parent: { $step: s4_usageCard }, x: 24, y: 100, props: { fontFamily: 'Inter', fontSize: 10, fill: '#64748B' } });
addCommand('text.create', { text: '∿∿∿ (Grafik Stabil Rendah)', parent: { $step: s4_usageCard }, x: 24, y: 125, props: { fontFamily: 'Inter', fontSize: 18, fill: '#0F172A' } });
addCommand('text.create', { text: '• Claude 3.5 Sonnet: $3.80\n• Gemini 1.5 Pro: $0.00 (Gratis)\n• Whisper STT: $0.40', parent: { $step: s4_usageCard }, x: 24, y: 170, width: 230, props: { fontFamily: 'Inter', fontSize: 11, lineHeight: '18px', fill: '#475569' } });

// Widget 2: High Contrast Black Card with 3D Liquid Sphere (Exact Ref 2!)
const s4_filePreviewCard = addCommand('node.create', {
  type: 'frame',
  name: 'File Preview Obsidian Black Card',
  parent: { $step: s4 },
  x: 880,
  y: 136,
  width: 350,
  height: 250,
  props: { fill: '#090D14', cornerRadius: 24 }
});
addCommand('text.create', { text: '📄 File Preview', parent: { $step: s4_filePreviewCard }, x: 24, y: 18, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
addCommand('image.place', { path: spherePath, parent: { $step: s4_filePreviewCard }, x: 100, y: 50, width: 150, height: 150, name: 'Liquid Sphere Core' });
addCommand('text.create', { text: 'Tugas_Akhir_Sistem_Tertanam.docx', parent: { $step: s4_filePreviewCard }, x: 24, y: 205, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Medium', fill: '#F1F5F9' } });
addCommand('text.create', { text: '14.8 MB • Format IEEE Selesai Diproses', parent: { $step: s4_filePreviewCard }, x: 24, y: 222, props: { fontFamily: 'Inter', fontSize: 10, fill: '#94A3B8' } });

// Widget 3: Activity Timeline
const s4_timelineCard = addCommand('node.create', {
  type: 'frame',
  name: 'Timeline Activity Card',
  parent: { $step: s4 },
  x: 188,
  y: 136,
  width: 370,
  height: 250,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});
addCommand('text.create', { text: 'Aktivitas AI & Konversi Berkas', parent: { $step: s4_timelineCard }, x: 20, y: 18, props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Bold', fill: '#0F172A' } });

const s4_bar1 = addCommand('node.create', {
  type: 'frame',
  name: 'Timeline Bar 1',
  parent: { $step: s4_timelineCard },
  x: 20,
  y: 52,
  width: 220,
  height: 32,
  props: { fill: '#090D14', cornerRadius: 16 }
});
addCommand('text.create', { text: 'Claude 3.5: Buat Makalah (2 jam lalu)', parent: { $step: s4_bar1 }, x: 14, y: 9, props: { fontFamily: 'Inter', fontSize: 10, fill: '#FFFFFF' } });

const s4_bar2 = addCommand('node.create', {
  type: 'frame',
  name: 'Timeline Bar 2',
  parent: { $step: s4_timelineCard },
  x: 60,
  y: 94,
  width: 260,
  height: 32,
  props: { fill: '#090D14', cornerRadius: 16 }
});
addCommand('text.create', { text: 'LibreOffice: Konversi DOCX ke PDF (40 mnt lalu)', parent: { $step: s4_bar2 }, x: 14, y: 9, props: { fontFamily: 'Inter', fontSize: 10, fill: '#FFFFFF' } });

const s4_bar3 = addCommand('node.create', {
  type: 'frame',
  name: 'Timeline Bar 3',
  parent: { $step: s4_timelineCard },
  x: 110,
  y: 136,
  width: 210,
  height: 32,
  props: { fill: '#090D14', cornerRadius: 16 }
});
addCommand('text.create', { text: 'Groq Whisper: STT Audio (15 mnt lalu)', parent: { $step: s4_bar3 }, x: 14, y: 9, props: { fontFamily: 'Inter', fontSize: 10, fill: '#FFFFFF' } });

const s4_btnKillSwitch = addCommand('node.create', {
  type: 'frame',
  name: 'Safety Kill Switch Pill',
  parent: { $step: s4_timelineCard },
  x: 20,
  y: 190,
  width: 330,
  height: 44,
  props: { fill: '#FEE2E2', stroke: '#EF4444', strokeWeight: 1, cornerRadius: 22 }
});
addCommand('text.create', { text: '🛡️ Tombol Darurat API Berbayar: AKTIF (Aman)', parent: { $step: s4_btnKillSwitch }, x: 24, y: 14, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#DC2626' } });

// Bottom Row: All Files Capsule Card
const s4_filesListCard = addCommand('node.create', {
  type: 'frame',
  name: 'All Files Capsule Card',
  parent: { $step: s4 },
  x: 188,
  y: 406,
  width: 320,
  height: 390,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});
addCommand('text.create', { text: '📁 Berkas & Dokumen', parent: { $step: s4_filesListCard }, x: 24, y: 20, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#0F172A' } });

const filePills = [
  { name: 'Makalah_Jaringan_Saraf.docx', type: 'DOCX', y: 60 },
  { name: 'Modul_Sistem_Embedded.pdf', type: 'PDF', y: 120 },
  { name: 'Slide_Presentasi_Tugas.pptx', type: 'PPTX', y: 180 },
  { name: 'Data_Sensor_Eksperimen.xlsx', type: 'XLSX', y: 240 },
  { name: 'Transkrip_Kuliah_Dosen.txt', type: 'TEXT', y: 300 }
];

filePills.forEach(fp => {
  const p = addCommand('node.create', {
    type: 'frame',
    name: 'File Pill ' + fp.type,
    parent: { $step: s4_filesListCard },
    x: 20,
    y: fp.y,
    width: 280,
    height: 48,
    props: { fill: '#F8FAFC', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
  });
  addCommand('text.create', { text: '📄  ' + fp.name, parent: { $step: p }, x: 16, y: 16, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#334155' } });
});

// Bottom Row: Team & Approval Obsidian Card
const s4_bottomObsidianCard = addCommand('node.create', {
  type: 'frame',
  name: 'Team & Approval Obsidian Card',
  parent: { $step: s4 },
  x: 528,
  y: 406,
  width: 702,
  height: 390,
  props: { fill: '#090D14', cornerRadius: 24 }
});
addCommand('text.create', { text: 'Persetujuan Mahasiswa Baru & Metrik Sistem', parent: { $step: s4_bottomObsidianCard }, x: 24, y: 22, props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#FFFFFF' } });
addCommand('text.create', { text: 'Total Mahasiswa: 1.240 (+12)   •   Pengguna Aktif: 562   •   Rasio Model Gratis: 91%', parent: { $step: s4_bottomObsidianCard }, x: 24, y: 52, props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' } });

const studentsLight = [
  { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@mhs.kampus.ac.id', y: 90 },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@mhs.kampus.ac.id', y: 154 },
  { name: 'Dimas Wicaksono', email: 'dimas.w@mhs.kampus.ac.id', y: 218 }
];

studentsLight.forEach(st => {
  const r = addCommand('node.create', {
    type: 'frame',
    name: 'Row ' + st.name,
    parent: { $step: s4_bottomObsidianCard },
    x: 24,
    y: st.y,
    width: 654,
    height: 52,
    props: { fill: '#101622', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 16 }
  });
  addCommand('text.create', { text: st.name, parent: { $step: r }, x: 20, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });
  addCommand('text.create', { text: st.email, parent: { $step: r }, x: 180, y: 17, props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' } });
  addCommand('text.create', { text: '✓ OTP Terverifikasi', parent: { $step: r }, x: 420, y: 17, props: { fontFamily: 'Inter', fontSize: 11, fill: '#34D399' } });

  const btnApp = addCommand('node.create', {
    type: 'frame',
    name: 'Btn Setujui Pill',
    parent: { $step: r },
    x: 550,
    y: 10,
    width: 84,
    height: 32,
    props: { fill: '#FFFFFF', cornerRadius: 16 }
  });
  addCommand('text.create', { text: 'Setujui', parent: { $step: btnApp }, x: 22, y: 8, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Bold', fill: '#090D14' } });
});

const s4_modelLoadTrack = addCommand('node.create', {
  type: 'frame',
  name: 'Model Load Bar Track',
  parent: { $step: s4_bottomObsidianCard },
  x: 24,
  y: 300,
  width: 654,
  height: 12,
  props: { fill: '#1E293B', cornerRadius: 6 }
});
addCommand('node.create', {
  type: 'frame',
  name: 'Gemini Free Load 91%',
  parent: { $step: s4_modelLoadTrack },
  x: 0,
  y: 0,
  width: 595,
  height: 12,
  props: { fill: '#38BDF8', cornerRadius: 6 }
});
addCommand('text.create', {
  text: 'Pembagian Beban AI: 91% Gemini 1.5 Flash (Gratis)  •  9% Claude 3.5 Sonnet (Berbayar Terkendali)',
  parent: { $step: s4_bottomObsidianCard },
  x: 24,
  y: 325,
  props: { fontFamily: 'Inter', fontSize: 11, fill: '#94A3B8' }
});


// =========================================================================
// FRAME 05: 05-Light-Glass-Workspace (Light Glass AI Chat Hub!)
// =========================================================================
const s5 = addCommand('node.create', {
  type: 'frame',
  name: '05-Light-Glass-Workspace',
  x: 2680,
  y: 0,
  width: 1280,
  height: 840,
  props: { fill: '#F1F4F8', cornerRadius: 32 }
});

// Ambient soft shapes behind light glass
addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient Light Orb',
  parent: { $step: s5 },
  x: 480,
  y: 60,
  width: 340,
  height: 340,
  props: { fill: '#FFFFFF', opacity: 0.8 }
});

// Light Glass Capsule Dock
const s5_dock = addCommand('node.create', {
  type: 'frame',
  name: 'White Glass Dock',
  parent: { $step: s5 },
  x: 32,
  y: 32,
  width: 64,
  height: 776,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 32 }
});
addCommand('text.create', { text: '❖', parent: { $step: s5_dock }, x: 23, y: 28, props: { fontSize: 18, fill: '#0F172A' } });

// Active nav: Black pill
const s5_navActive = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Chat Active Black Pill',
  parent: { $step: s5_dock },
  x: 12,
  y: 84,
  width: 40,
  height: 40,
  props: { fill: '#090D14', cornerRadius: 20 }
});
addCommand('text.create', { text: '💬', parent: { $step: s5_navActive }, x: 10, y: 10, props: { fontSize: 16, fill: '#FFFFFF' } });

darkNavIcons.forEach(item => {
  const n = addCommand('node.create', {
    type: 'frame',
    name: item.name,
    parent: { $step: s5_dock },
    x: 12,
    y: item.y,
    width: 40,
    height: 40,
    props: { fill: '#FFFFFF', cornerRadius: 20 }
  });
  addCommand('text.create', { text: item.icon, parent: { $step: n }, x: 11, y: 10, props: { fontSize: 15, fill: '#94A3B8' } });
});

addCommand('image.place', { path: avatarLightPath, parent: { $step: s5_dock }, x: 12, y: 710, width: 40, height: 40, name: 'User Avatar' });

// Center Hero
addCommand('image.place', { path: orbPath, parent: { $step: s5 }, x: 576, y: 100, width: 128, height: 128, name: 'Iridescent Sphere' });
addCommand('text.create', { text: 'Hi, Mahasiswa', parent: { $step: s5 }, x: 580, y: 244, props: { fontFamily: 'Inter', fontSize: 18, fill: '#64748B' } });
addCommand('text.create', { text: 'How can I help today?', parent: { $step: s5 }, x: 440, y: 276, props: { fontFamily: 'Inter', fontSize: 34, fontStyle: 'Bold', fill: '#0F172A' } });
addCommand('text.create', { text: 'Bantuan tugas kuliah terstruktur: draf laporan, tanya modul, atau konversi file.', parent: { $step: s5 }, x: 410, y: 324, props: { fontFamily: 'Inter', fontSize: 13, fill: '#64748B' } });

// Floating White Glass Prompt Card
const s5_promptCard = addCommand('node.create', {
  type: 'frame',
  name: 'White Frosted Glass Prompt Box',
  parent: { $step: s5 },
  x: 290,
  y: 366,
  width: 700,
  height: 154,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 24 }
});

const s5_statusPill = addCommand('node.create', {
  type: 'frame',
  name: 'Prompt Status Pill Light',
  parent: { $step: s5_promptCard },
  x: 16,
  y: 12,
  width: 668,
  height: 28,
  props: { fill: '#F0F9FF', stroke: '#BAE6FD', strokeWeight: 1, cornerRadius: 8 }
});
addCommand('text.create', { text: '⚡ Mode Akademik: Validasi sitasi otomatis aktif • Claude 3.5 Sonnet & Gemini 1.5 Pro', parent: { $step: s5_statusPill }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#0284C7' } });

const s5_inputWell = addCommand('node.create', {
  type: 'frame',
  name: 'Sunken Input Well Light',
  parent: { $step: s5_promptCard },
  x: 16,
  y: 48,
  width: 668,
  height: 90,
  props: { fill: '#F8FAFC', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 16 }
});
addCommand('text.create', { text: 'Tanyakan materi kuliah, masukkan topik tugas, atau ketik /...', parent: { $step: s5_inputWell }, x: 18, y: 18, props: { fontFamily: 'Inter', fontSize: 14, fill: '#94A3B8' } });

const s5_pillImport = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Import File',
  parent: { $step: s5_inputWell },
  x: 16,
  y: 50,
  width: 116,
  height: 28,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 14 }
});
addCommand('text.create', { text: '📎 Import file', parent: { $step: s5_pillImport }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#334155' } });

const s5_pillTools = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Tools',
  parent: { $step: s5_inputWell },
  x: 140,
  y: 50,
  width: 90,
  height: 28,
  props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 14 }
});
addCommand('text.create', { text: '⚙️ Tools', parent: { $step: s5_pillTools }, x: 14, y: 7, props: { fontFamily: 'Inter', fontSize: 11, fontStyle: 'Medium', fill: '#334155' } });

const s5_btnSend = addCommand('node.create', {
  type: 'frame',
  name: 'Send Button Black Circle',
  parent: { $step: s5_inputWell },
  x: 620,
  y: 48,
  width: 34,
  height: 34,
  props: { fill: '#090D14', cornerRadius: 17 }
});
addCommand('text.create', { text: '↑', parent: { $step: s5_btnSend }, x: 12, y: 7, props: { fontFamily: 'Inter', fontSize: 16, fontStyle: 'Bold', fill: '#FFFFFF' } });

// 3 Shortcut Cards in White Glass
cards1.forEach(c => {
  const cd = addCommand('node.create', {
    type: 'frame',
    name: 'Card ' + c.title,
    parent: { $step: s5 },
    x: c.x,
    y: 540,
    width: 220,
    height: 104,
    props: { fill: '#FFFFFF', stroke: '#E2E8F0', strokeWeight: 1, cornerRadius: 18 }
  });
  addCommand('text.create', { text: c.icon + '  ' + c.title, parent: { $step: cd }, x: 16, y: 16, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#0F172A' } });
  addCommand('text.create', { text: c.desc, parent: { $step: cd }, x: 16, y: 42, width: 188, props: { fontFamily: 'Inter', fontSize: 11, lineHeight: '16px', fill: '#64748B' } });
});

// Output
const outBatch = path.join(__dirname, 'glass-ricat-batch.json');
fs.writeFileSync(outBatch, JSON.stringify(commands, null, 2), 'utf-8');
console.log(`Generated ${commands.length} commands with 5 artboards.`);
