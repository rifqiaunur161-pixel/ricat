/**
 * High-fidelity Ricat UI Generator in FigCraft
 * Faithfully mirrors the reference image:
 * - Deep dark slate/charcoal palette (#06090E, #0D141F, #101622)
 * - Subtle ambient cyan/slate borders (#162738, #1E293B)
 * - Vibrant electric cyan/blue accents (#0091FF, #0284C7)
 * - Integrated left icon dock (ricat logo, active circle pill, muted tools, bottom avatar)
 * - Iridescent center orb with greeting & crisp white typography
 * - Floating rounded prompt card with academic status & pill buttons (Import file, Tools, Send)
 * - 3 sleek shortcut cards with subtle borders and rounded corners
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
const avatarPath = "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/design/avatar.png";

// =========================================================================
// SCREEN 1: 01-Workspace-Utama (1:1 Reflection of User's Reference)
// =========================================================================
const s1 = addCommand('node.create', {
  type: 'frame',
  name: '01-Workspace-Utama',
  x: 0,
  y: 0,
  width: 1280,
  height: 840,
  props: {
    fill: '#06090E',
    cornerRadius: 32
  }
});

// Ambient subtle dark glow at bottom corners (decorative soft cards)
addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient Cyan Glow Left',
  parent: { $step: s1 },
  x: -100,
  y: 650,
  width: 450,
  height: 350,
  props: {
    fill: '#081E2E',
    opacity: 0.35
  }
});

addCommand('node.create', {
  type: 'ellipse',
  name: 'Ambient Cyan Glow Right',
  parent: { $step: s1 },
  x: 950,
  y: 650,
  width: 450,
  height: 350,
  props: {
    fill: '#081E2E',
    opacity: 0.35
  }
});

// --- LEFT SIDEBAR (Integrated into Canvas) ---
// Brand logo "ricat" (like "LIX" in reference)
addCommand('text.create', {
  text: 'ricat',
  parent: { $step: s1 },
  x: 48,
  y: 44,
  props: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'Bold',
    letterSpacing: '1px',
    fill: '#FFFFFF'
  }
});

// Nav item 1: Active Chat (Glowing cyan-blue circle like reference)
const s1_navActive = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Chat Active',
  parent: { $step: s1 },
  x: 44,
  y: 104,
  width: 40,
  height: 40,
  props: {
    fill: '#0091FF',
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '💬',
  parent: { $step: s1_navActive },
  x: 10,
  y: 10,
  props: { fontSize: 16, fill: '#FFFFFF' }
});

// Inactive Nav Items (like reference icons)
const inactiveNavs = [
  { icon: '📄', name: 'Nav Dokumen', y: 160 },
  { icon: '🔍', name: 'Nav Modul PDF', y: 216 },
  { icon: '🔄', name: 'Nav Konverter', y: 272 }
];

inactiveNavs.forEach(nav => {
  const nFrame = addCommand('node.create', {
    type: 'frame',
    name: nav.name,
    parent: { $step: s1 },
    x: 44,
    y: nav.y,
    width: 40,
    height: 40,
    props: {
      fill: '#0E141E',
      cornerRadius: 20
    }
  });

  addCommand('text.create', {
    text: nav.icon,
    parent: { $step: nFrame },
    x: 11,
    y: 10,
    props: { fontSize: 15, fill: '#64748B' }
  });
});

// Sidebar Bottom Elements (Settings, Expand, Avatar)
const s1_btnSettings = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Settings',
  parent: { $step: s1 },
  x: 44,
  y: 670,
  width: 40,
  height: 40,
  props: {
    fill: '#0E141E',
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '⚙️',
  parent: { $step: s1_btnSettings },
  x: 11,
  y: 11,
  props: { fontSize: 15, fill: '#64748B' }
});

const s1_btnAdmin = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Admin Panel',
  parent: { $step: s1 },
  x: 44,
  y: 722,
  width: 40,
  height: 40,
  props: {
    fill: '#0E141E',
    cornerRadius: 20
  }
});

addCommand('text.create', {
  text: '🛡️',
  parent: { $step: s1_btnAdmin },
  x: 11,
  y: 11,
  props: { fontSize: 15, fill: '#64748B' }
});

// User Avatar (Circle with cropped avatar image from reference)
addCommand('image.place', {
  path: avatarPath,
  parent: { $step: s1 },
  x: 44,
  y: 774,
  width: 40,
  height: 40,
  name: 'User Avatar'
});


// --- CENTER HERO SECTION ---
// Center Iridescent Orb (Cropped from reference)
addCommand('image.place', {
  path: orbPath,
  parent: { $step: s1 },
  x: 576, // (1280 - 128) / 2
  y: 90,
  width: 128,
  height: 128,
  name: 'Center Iridescent Orb'
});

// Greeting text (Like "Hi, Hendricks" in reference)
addCommand('text.create', {
  text: 'Hi, Mahasiswa',
  parent: { $step: s1 },
  x: 580,
  y: 236,
  props: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'Regular',
    fill: '#8E95A5'
  }
});

// Big Headline (Like "How can I help today?" in reference)
addCommand('text.create', {
  text: 'How can I help today?',
  parent: { $step: s1 },
  x: 440,
  y: 268,
  props: {
    fontFamily: 'Inter',
    fontSize: 34,
    fontStyle: 'Bold',
    fill: '#FFFFFF'
  }
});

// Subtitle
addCommand('text.create', {
  text: "I'm here to help with structured reports, document analysis, and academic tasks.",
  parent: { $step: s1 },
  x: 390,
  y: 316,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#5A6272'
  }
});


// --- FOCAL PROMPT CONTAINER (Adapted from reference card) ---
const s1_promptCard = addCommand('node.create', {
  type: 'frame',
  name: 'Prompt Outer Container',
  parent: { $step: s1 },
  x: 290, // (1280 - 700) / 2
  y: 360,
  width: 700,
  height: 154,
  props: {
    fill: '#0D1622',
    stroke: '#162738',
    strokeWeight: 1,
    cornerRadius: 22
  }
});

// Status Bar (Replaces "Unlock more features with Pro" with academic quota info)
const s1_statusBar = addCommand('node.create', {
  type: 'frame',
  name: 'Academic Status Bar',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 12,
  width: 668,
  height: 28,
  props: {
    fill: '#101E2E',
    stroke: '#1D3B53',
    strokeWeight: 1,
    cornerRadius: 8
  }
});

addCommand('text.create', {
  text: '⚡ Model: Claude 3.5 Sonnet & Gemini 1.5 Pro  •  Kuota Harian: 45/50 Chat Tersedia',
  parent: { $step: s1_statusBar },
  x: 14,
  y: 7,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'Medium',
    fill: '#38BDF8'
  }
});

// Inner Sunken Input Well (Jet black well like reference)
const s1_inputWell = addCommand('node.create', {
  type: 'frame',
  name: 'Inner Input Well',
  parent: { $step: s1_promptCard },
  x: 16,
  y: 48,
  width: 668,
  height: 90,
  props: {
    fill: '#060A0F',
    stroke: '#121B24',
    strokeWeight: 1,
    cornerRadius: 16
  }
});

// Placeholder text inside well
addCommand('text.create', {
  text: 'Ask me anything or enter / for academic tools...',
  parent: { $step: s1_inputWell },
  x: 18,
  y: 18,
  props: {
    fontFamily: 'Inter',
    fontSize: 14,
    fill: '#4A5568'
  }
});

// Bottom buttons inside well: "Import file", "Tools"
const s1_btnImport = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Import File',
  parent: { $step: s1_inputWell },
  x: 16,
  y: 50,
  width: 104,
  height: 28,
  props: {
    fill: '#0F1621',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '📎 Import file',
  parent: { $step: s1_btnImport },
  x: 12,
  y: 7,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#94A3B8'
  }
});

const s1_btnTools = addCommand('node.create', {
  type: 'frame',
  name: 'Pill Tools',
  parent: { $step: s1_inputWell },
  x: 128,
  y: 50,
  width: 82,
  height: 28,
  props: {
    fill: '#0F1621',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '⚙️ Tools',
  parent: { $step: s1_btnTools },
  x: 12,
  y: 7,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fill: '#94A3B8'
  }
});

// Sparkle icon right side
addCommand('text.create', {
  text: '✨',
  parent: { $step: s1_inputWell },
  x: 585,
  y: 55,
  props: { fontSize: 14, fill: '#64748B' }
});

// Send Button (vibrant blue circle with up arrow like reference)
const s1_btnSend = addCommand('node.create', {
  type: 'frame',
  name: 'Send Button Circle',
  parent: { $step: s1_inputWell },
  x: 622,
  y: 48,
  width: 32,
  height: 32,
  props: {
    fill: '#0091FF',
    cornerRadius: 16
  }
});

addCommand('text.create', {
  text: '↑',
  parent: { $step: s1_btnSend },
  x: 11,
  y: 6,
  props: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'Bold',
    fill: '#FFFFFF'
  }
});


// --- 3 PROMPT CARDS (Exact 3-card horizontal layout like reference) ---
const cardsData = [
  {
    x: 290,
    icon: '📄',
    title: 'Draf Makalah & Sitasi',
    desc: 'Susun bab tugas kuliah lengkap dengan gaya rujukan resmi APA atau IEEE.'
  },
  {
    x: 530,
    icon: '🔍',
    title: 'Tanya Modul & PDF',
    desc: 'Ekstrak jawaban dari buku kuliah dengan kutipan nomor halaman akurat.'
  },
  {
    x: 770,
    icon: '🔄',
    title: 'Konversi & Kompres',
    desc: 'Ubah berkas DOCX/PPTX ke PDF dan sesuaikan batas ukuran portal kampus.'
  }
];

cardsData.forEach(cd => {
  const cFrame = addCommand('node.create', {
    type: 'frame',
    name: 'Card ' + cd.title,
    parent: { $step: s1 },
    x: cd.x,
    y: 535,
    width: 220,
    height: 104,
    props: {
      fill: '#0D131D',
      stroke: '#182230',
      strokeWeight: 1,
      cornerRadius: 18
    }
  });

  // Top row: Icon + Title
  addCommand('text.create', {
    text: cd.icon + '  ' + cd.title,
    parent: { $step: cFrame },
    x: 16,
    y: 16,
    props: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontStyle: 'SemiBold',
      fill: '#F1F5F9'
    }
  });

  // Bottom row: Description
  addCommand('text.create', {
    text: cd.desc,
    parent: { $step: cFrame },
    x: 16,
    y: 42,
    width: 188,
    props: {
      fontFamily: 'Inter',
      fontSize: 11,
      lineHeight: '16px',
      fill: '#64748B'
    }
  });
});


// =========================================================================
// SCREEN 2: 02-Percakapan-Aktif (Chat Flow in the Exact Same Visual Style)
// =========================================================================
const s2 = addCommand('node.create', {
  type: 'frame',
  name: '02-Percakapan-Aktif',
  x: 1340,
  y: 0,
  width: 1280,
  height: 840,
  props: {
    fill: '#06090E',
    cornerRadius: 32
  }
});

// Sidebar on Screen 2 (same structure)
addCommand('text.create', {
  text: 'ricat',
  parent: { $step: s2 },
  x: 48,
  y: 44,
  props: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'Bold',
    letterSpacing: '1px',
    fill: '#FFFFFF'
  }
});

const s2_navActive = addCommand('node.create', {
  type: 'frame',
  name: 'Nav Chat Active',
  parent: { $step: s2 },
  x: 44,
  y: 104,
  width: 40,
  height: 40,
  props: { fill: '#0091FF', cornerRadius: 20 }
});
addCommand('text.create', { text: '💬', parent: { $step: s2_navActive }, x: 10, y: 10, props: { fontSize: 16, fill: '#FFFFFF' } });

addCommand('image.place', {
  path: avatarPath,
  parent: { $step: s2 },
  x: 44,
  y: 774,
  width: 40,
  height: 40,
  name: 'User Avatar'
});

// Chat Conversation Stream in Screen 2
// User Message Bubble (Right-aligned in stream)
const s2_userMsg = addCommand('node.create', {
  type: 'frame',
  name: 'User Message Bubble',
  parent: { $step: s2 },
  x: 560,
  y: 80,
  width: 580,
  height: 60,
  props: {
    fill: '#101B2B',
    stroke: '#1D3B5A',
    strokeWeight: 1,
    cornerRadius: 18
  }
});

addCommand('text.create', {
  text: 'Tolong jelaskan algoritma Backpropagation untuk tugas Sistem Cerdas, lengkap dengan rumusnya.',
  parent: { $step: s2_userMsg },
  x: 20,
  y: 18,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#F1F5F9'
  }
});

// Assistant Response Container (Left-aligned in stream)
const s2_aiMsg = addCommand('node.create', {
  type: 'frame',
  name: 'Assistant Response Box',
  parent: { $step: s2 },
  x: 180,
  y: 160,
  width: 960,
  height: 520,
  props: {
    fill: '#0C131E',
    stroke: '#182434',
    strokeWeight: 1,
    cornerRadius: 22
  }
});

// Model Attribution Header
const s2_aiHeader = addCommand('node.create', {
  type: 'frame',
  name: 'Model Attribution Tag',
  parent: { $step: s2_aiMsg },
  x: 24,
  y: 18,
  width: 380,
  height: 30,
  props: {
    fill: '#081422',
    stroke: '#0091FF',
    strokeWeight: 1,
    cornerRadius: 15
  }
});

addCommand('text.create', {
  text: '⚡ Dijawab oleh: Claude 3.5 Sonnet  •  1.420 token ($0.004)',
  parent: { $step: s2_aiHeader },
  x: 14,
  y: 7,
  props: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontStyle: 'Medium',
    fill: '#38BDF8'
  }
});

// AI Text response
addCommand('text.create', {
  text: 'Algoritma Backpropagation (perambatan mundur) adalah metode pelatihan jaringan saraf tiruan berumpan maju (feedforward) untuk meminimalkan fungsi galat kuadrat terkecil (MSE).',
  parent: { $step: s2_aiMsg },
  x: 24,
  y: 65,
  width: 910,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: '22px',
    fill: '#E2E8F0'
  }
});

// Code / Math box
const s2_codeBox = addCommand('node.create', {
  type: 'frame',
  name: 'Code Math Block',
  parent: { $step: s2_aiMsg },
  x: 24,
  y: 115,
  width: 912,
  height: 120,
  props: {
    fill: '#060A0F',
    stroke: '#162230',
    strokeWeight: 1,
    cornerRadius: 12
  }
});

addCommand('text.create', {
  text: '// Aturan Pembaharuan Bobot (Gradient Descent):\nΔw_ij(t) = η * δ_j * o_i + α * Δw_ij(t-1)\n\n// Sinyal Galat Lapisan Keluaran:\nδ_k = (t_k - y_k) * f\'(net_k)',
  parent: { $step: s2_codeBox },
  x: 20,
  y: 18,
  props: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    lineHeight: '22px',
    fill: '#38BDF8'
  }
});

addCommand('text.create', {
  text: 'Langkah Operasional:\n1. Propagasi Maju: Menghitung keluaran tiap neuron dengan fungsi aktivasi sigmoid.\n2. Propagasi Mundur: Menghitung gradien galat dari lapisan output menuju lapisan tersembunyi.\n3. Pembaruan Bobot: Mengalikan sinyal galat dengan laju pemelajaran (learning rate).',
  parent: { $step: s2_aiMsg },
  x: 24,
  y: 255,
  width: 910,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: '22px',
    fill: '#CBD5E1'
  }
});

// Follow up action buttons inside chat
const s2_btnMakeReport = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Drafkan ke Makalah',
  parent: { $step: s2_aiMsg },
  x: 24,
  y: 440,
  width: 210,
  height: 38,
  props: {
    fill: '#0091FF',
    cornerRadius: 19
  }
});

addCommand('text.create', {
  text: '📄 Buat Jadi Bab Laporan',
  parent: { $step: s2_btnMakeReport },
  x: 24,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

const s2_btnQuiz = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Buat Kuis',
  parent: { $step: s2_aiMsg },
  x: 246,
  y: 440,
  width: 190,
  height: 38,
  props: {
    fill: '#101724',
    stroke: '#1E293B',
    strokeWeight: 1,
    cornerRadius: 19
  }
});

addCommand('text.create', {
  text: '📚 Buat Kuis Latihan',
  parent: { $step: s2_btnQuiz },
  x: 30,
  y: 10,
  props: {
    fontFamily: 'Inter',
    fontSize: 12,
    fill: '#CBD5E1'
  }
});

// Bottom input bar in Chat Screen
const s2_chatInput = addCommand('node.create', {
  type: 'frame',
  name: 'Chat Bottom Input Bar',
  parent: { $step: s2 },
  x: 180,
  y: 710,
  width: 960,
  height: 60,
  props: {
    fill: '#0C131E',
    stroke: '#182434',
    strokeWeight: 1,
    cornerRadius: 30
  }
});

addCommand('text.create', {
  text: 'Ketik pesan balasan atau pertanyaan lanjutan...',
  parent: { $step: s2_chatInput },
  x: 28,
  y: 20,
  props: {
    fontFamily: 'Inter',
    fontSize: 13,
    fill: '#4A5568'
  }
});

const s2_chatSend = addCommand('node.create', {
  type: 'frame',
  name: 'Chat Send Circle',
  parent: { $step: s2_chatInput },
  x: 910,
  y: 12,
  width: 36,
  height: 36,
  props: { fill: '#0091FF', cornerRadius: 18 }
});
addCommand('text.create', { text: '↑', parent: { $step: s2_chatSend }, x: 13, y: 7, props: { fontSize: 16, fontStyle: 'Bold', fill: '#FFFFFF' } });


// =========================================================================
// SCREEN 3: 03-Dokumen-Laporan-Sitasi (Document Workspace in the Same Style)
// =========================================================================
const s3 = addCommand('node.create', {
  type: 'frame',
  name: '03-Dokumen-Laporan-Sitasi',
  x: 0,
  y: 900,
  width: 1280,
  height: 840,
  props: {
    fill: '#06090E',
    cornerRadius: 32
  }
});

// Brand Header
addCommand('text.create', {
  text: 'ricat  /  Dokumen & Laporan  •  Tugas Akhir Format IEEE',
  parent: { $step: s3 },
  x: 48,
  y: 40,
  props: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

// Top Export Action Buttons
const s3_btnDocx = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Unduh DOCX',
  parent: { $step: s3 },
  x: 970,
  y: 32,
  width: 130,
  height: 38,
  props: { fill: '#0091FF', cornerRadius: 19 }
});
addCommand('text.create', { text: 'Unduh .docx', parent: { $step: s3_btnDocx }, x: 26, y: 10, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'SemiBold', fill: '#FFFFFF' } });

const s3_btnPptx = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Unduh PPTX',
  parent: { $step: s3 },
  x: 1110,
  y: 32,
  width: 120,
  height: 38,
  props: { fill: '#0E141E', stroke: '#1E293B', strokeWeight: 1, cornerRadius: 19 }
});
addCommand('text.create', { text: 'Ekspor .pptx', parent: { $step: s3_btnPptx }, x: 22, y: 10, props: { fontFamily: 'Inter', fontSize: 12, fill: '#CBD5E1' } });

// Left Paper Sheet (Dark sleek editor)
const s3_sheet = addCommand('node.create', {
  type: 'frame',
  name: 'Paper Editor',
  parent: { $step: s3 },
  x: 48,
  y: 90,
  width: 760,
  height: 700,
  props: {
    fill: '#0C131E',
    stroke: '#182434',
    strokeWeight: 1,
    cornerRadius: 22
  }
});

addCommand('text.create', {
  text: 'BAB I. PENDAHULUAN',
  parent: { $step: s3_sheet },
  x: 36,
  y: 32,
  props: { fontFamily: 'Inter', fontSize: 18, fontStyle: 'Bold', fill: '#FFFFFF' }
});

addCommand('text.create', {
  text: '1.1 Latar Belakang Komputasi Tepi',
  parent: { $step: s3_sheet },
  x: 36,
  y: 68,
  props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'SemiBold', fill: '#94A3B8' }
});

addCommand('text.create', {
  text: 'Penerapan model pembelajaran mendalam pada mikrokontroler berdaya rendah membutuhkan teknik kompresi seperti kuantisasi INT8 dan pemangkasan bobot (weight pruning) [1]. Komputasi cerdas berbasis tepi mampu memangkas latensi transmisi nirkabel hingga 60% tanpa mengorbankan ketahanan sistem [2].',
  parent: { $step: s3_sheet },
  x: 36,
  y: 100,
  width: 688,
  props: { fontFamily: 'Inter', fontSize: 13, lineHeight: '22px', fill: '#CBD5E1' }
});

// Prominent Citation Warning Box (Anti-Slop Craft: Honest Citation Validation)
const s3_claimWarn = addCommand('node.create', {
  type: 'frame',
  name: 'Claim Warning Box',
  parent: { $step: s3_sheet },
  x: 36,
  y: 190,
  width: 688,
  height: 100,
  props: {
    fill: '#1A0D11',
    stroke: '#EF4444',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '⚠️ Klaim Belum Memiliki Sumber Rujukan:',
  parent: { $step: s3_claimWarn },
  x: 18,
  y: 16,
  props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#F87171' }
});

addCommand('text.create', {
  text: '"Optimasi kompresi bobot menghasilkan penghematan konsumsi daya baterai sebesar 45% pada clock 16 MHz." [Perlu Sumber Rujukan]',
  parent: { $step: s3_claimWarn },
  x: 18,
  y: 42,
  width: 652,
  props: { fontFamily: 'Inter', fontSize: 12, fill: '#FECACA' }
});

// Right Panel: Citation Source Matrix
const s3_sourceList = addCommand('node.create', {
  type: 'frame',
  name: 'Source Matrix Panel',
  parent: { $step: s3 },
  x: 830,
  y: 90,
  width: 400,
  height: 700,
  props: {
    fill: '#0C131E',
    stroke: '#182434',
    strokeWeight: 1,
    cornerRadius: 22
  }
});

addCommand('text.create', {
  text: 'Daftar Sumber Rujukan (IEEE)',
  parent: { $step: s3_sourceList },
  x: 24,
  y: 28,
  props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#FFFFFF' }
});

// Source 1 (Verified)
const s3_src1 = addCommand('node.create', {
  type: 'frame',
  name: 'Source 1 Box',
  parent: { $step: s3_sourceList },
  x: 20,
  y: 68,
  width: 360,
  height: 96,
  props: {
    fill: '#081611',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '✓ [1] Jurnal IEEE Transactions (2024)',
  parent: { $step: s3_src1 },
  x: 16,
  y: 14,
  props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#34D399' }
});

addCommand('text.create', {
  text: 'Rahman, M. R., "Energy-Efficient Edge Computing for IoT Sensors," IEEE Trans. Ind. Inf., vol. 20, pp. 112–119.',
  parent: { $step: s3_src1 },
  x: 16,
  y: 38,
  width: 328,
  props: { fontFamily: 'Inter', fontSize: 11, fill: '#A7F3D0' }
});

// Source 2 (Verified)
const s3_src2 = addCommand('node.create', {
  type: 'frame',
  name: 'Source 2 Box',
  parent: { $step: s3_sourceList },
  x: 20,
  y: 176,
  width: 360,
  height: 96,
  props: {
    fill: '#081611',
    stroke: '#10B981',
    strokeWeight: 1,
    cornerRadius: 14
  }
});

addCommand('text.create', {
  text: '✓ [2] Buku Teks MIT Press (2016)',
  parent: { $step: s3_src2 },
  x: 16,
  y: 14,
  props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#34D399' }
});

addCommand('text.create', {
  text: 'Goodfellow, I., Bengio, Y., & Courville, A., Deep Learning. Cambridge, MA: MIT Press, pp. 245–260.',
  parent: { $step: s3_src2 },
  x: 16,
  y: 38,
  width: 328,
  props: { fontFamily: 'Inter', fontSize: 11, fill: '#A7F3D0' }
});


// =========================================================================
// SCREEN 4: 04-Dashboard-Admin-Kontrol (Admin View in the Same Sleek Dark Theme)
// =========================================================================
const s4 = addCommand('node.create', {
  type: 'frame',
  name: '04-Dashboard-Admin-Kontrol',
  x: 1340,
  y: 900,
  width: 1280,
  height: 840,
  props: {
    fill: '#06090E',
    cornerRadius: 32
  }
});

addCommand('text.create', {
  text: 'ricat  /  Panel Administrator  •  Kontrol Biaya & Persetujuan Pengguna',
  parent: { $step: s4 },
  x: 48,
  y: 40,
  props: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'SemiBold',
    fill: '#FFFFFF'
  }
});

// Emergency Kill Switch Banner (Sleek red pill-accented banner)
const s4_killBanner = addCommand('node.create', {
  type: 'frame',
  name: 'Kill Switch Banner',
  parent: { $step: s4 },
  x: 48,
  y: 84,
  width: 1184,
  height: 72,
  props: {
    fill: '#1E0C10',
    stroke: '#DC2626',
    strokeWeight: 1,
    cornerRadius: 18
  }
});

addCommand('text.create', {
  text: '🛡️ Tombol Darurat API Berbayar: AKTIF (Aman)',
  parent: { $step: s4_killBanner },
  x: 24,
  y: 16,
  props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'Bold', fill: '#F87171' }
});

addCommand('text.create', {
  text: 'Pengeluaran API terkendali. Klik untuk seketika menonaktifkan Claude & OpenAI bila terjadi lonjakan tak wajar.',
  parent: { $step: s4_killBanner },
  x: 24,
  y: 40,
  props: { fontFamily: 'Inter', fontSize: 12, fill: '#FECACA' }
});

const s4_btnKill = addCommand('node.create', {
  type: 'frame',
  name: 'Btn Matikan API',
  parent: { $step: s4_killBanner },
  x: 980,
  y: 16,
  width: 180,
  height: 40,
  props: { fill: '#DC2626', cornerRadius: 20 }
});
addCommand('text.create', { text: 'Matikan API Berbayar', parent: { $step: s4_btnKill }, x: 26, y: 11, props: { fontFamily: 'Inter', fontSize: 12, fontStyle: 'Bold', fill: '#FFFFFF' } });

// 3 Metric Cards (Same card style as reference bottom cards)
const adminCards = [
  { x: 48, title: 'Biaya API Bulan Berjalan', val: '$4.20 / Plafon $15.00', sub: 'Utilisasi 28% (Aman di bawah batas)', color: '#34D399' },
  { x: 456, title: 'Antrean Mahasiswa Baru', val: '3 Calon Pengguna', sub: 'Menunggu persetujuan aktivasi akun', color: '#F59E0B' },
  { x: 864, title: 'Pembagian Beban Model', val: '91% Gratis • 9% Berbayar', sub: 'Gemini menangani mayoritas kueri', color: '#38BDF8' }
];

adminCards.forEach(c => {
  const cd = addCommand('node.create', {
    type: 'frame',
    name: 'Stat ' + c.title,
    parent: { $step: s4 },
    x: c.x,
    y: 176,
    width: 368,
    height: 104,
    props: {
      fill: '#0D131D',
      stroke: '#182230',
      strokeWeight: 1,
      cornerRadius: 18
    }
  });

  addCommand('text.create', {
    text: c.title,
    parent: { $step: cd },
    x: 20,
    y: 16,
    props: { fontFamily: 'Inter', fontSize: 12, fill: '#94A3B8' }
  });

  addCommand('text.create', {
    text: c.val,
    parent: { $step: cd },
    x: 20,
    y: 40,
    props: { fontFamily: 'Inter', fontSize: 18, fontStyle: 'Bold', fill: '#FFFFFF' }
  });

  addCommand('text.create', {
    text: c.sub,
    parent: { $step: cd },
    x: 20,
    y: 72,
    props: { fontFamily: 'Inter', fontSize: 11, fill: c.color }
  });
});

// User Approval Table in Same Dark Style
const s4_tableBox = addCommand('node.create', {
  type: 'frame',
  name: 'Approval Table Box',
  parent: { $step: s4 },
  x: 48,
  y: 304,
  width: 1184,
  height: 490,
  props: {
    fill: '#0C131E',
    stroke: '#182434',
    strokeWeight: 1,
    cornerRadius: 22
  }
});

addCommand('text.create', {
  text: 'Antrean Persetujuan Mahasiswa (Pending Approval)',
  parent: { $step: s4_tableBox },
  x: 24,
  y: 24,
  props: { fontFamily: 'Inter', fontSize: 14, fontStyle: 'SemiBold', fill: '#FFFFFF' }
});

const studentList = [
  { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@mhs.kampus.ac.id', y: 70 },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@mhs.kampus.ac.id', y: 134 },
  { name: 'Dimas Wicaksono', email: 'dimas.w@mhs.kampus.ac.id', y: 198 }
];

studentList.forEach((st, idx) => {
  const row = addCommand('node.create', {
    type: 'frame',
    name: 'Row ' + st.name,
    parent: { $step: s4_tableBox },
    x: 24,
    y: st.y,
    width: 1136,
    height: 52,
    props: {
      fill: '#080E17',
      stroke: '#141E2C',
      strokeWeight: 1,
      cornerRadius: 12
    }
  });

  addCommand('text.create', {
    text: st.name,
    parent: { $step: row },
    x: 20,
    y: 17,
    props: { fontFamily: 'Inter', fontSize: 13, fontStyle: 'Medium', fill: '#F1F5F9' }
  });

  addCommand('text.create', {
    text: st.email,
    parent: { $step: row },
    x: 300,
    y: 17,
    props: { fontFamily: 'Inter', fontSize: 13, fill: '#94A3B8' }
  });

  addCommand('text.create', {
    text: '✓ Email Terverifikasi',
    parent: { $step: row },
    x: 680,
    y: 17,
    props: { fontFamily: 'Inter', fontSize: 12, fill: '#34D399' }
  });

  // Action buttons
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

// Output
const outPath = path.join(__dirname, 'perfect-ricat-batch.json');
fs.writeFileSync(outPath, JSON.stringify(commands, null, 2), 'utf-8');
console.log(`Generated ${commands.length} commands for perfect ricat UI.`);

