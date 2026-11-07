---
name: figcraft-frontend-design
description: Membuat desain frontend (landing page, dashboard, layar mobile, design system, komponen UI) dengan cepat di FigCraft Desktop (ArtCraft) lewat MCP/CLI-nya, lalu menyerahkannya ke kode. Gaya desain otomatis menyesuaikan REFERENSI yang dikirim user (screenshot, gambar, file SVG, file JSON/.fig dari Figma, URL website, atau deskripsi teks). Gunakan skill ini setiap kali user menyebut FigCraft, file .figcraft, desain UI, mockup, wireframe, prototype, redesain, atau mengirim referensi tampilan, walaupun tidak menyebut "skill" secara eksplisit.
---

# FigCraft Frontend Design (FigCraft Desktop dari ArtCraft)

Skill untuk mendesain UI di FigCraft Desktop dengan cepat, dengan gaya yang mengikuti
referensi user. Alurnya: **referensi -> token -> komponen -> halaman -> verifikasi -> kode.**

FigCraft BUKAN Figma. Jangan mengandalkan pengetahuan Figma untuk kemampuan atau nama
tool. Ia tidak menjalankan plugin Figma, tidak punya fitur AI bawaan, dan masih alpha.

## Prinsip Kerja

1. **Referensi adalah sumber kebenaran.** Kalau user mengirim referensi, tiru karakter
   visualnya (warna, tipografi, bentuk, kepadatan). Jangan memakai gaya default sendiri.
2. **Sistem dulu, piksel belakangan.** Variables/styles -> komponen -> section -> halaman.
3. **Sedikit bertanya.** Kalau info kurang, buat asumsi masuk akal, tulis dalam 1-3 baris,
   lalu kerjakan. Tanya hanya jika tanpa jawaban itu hasilnya pasti salah.
4. **Satu panggilan untuk banyak operasi.** Pakai tool `batch` atau script `run`, jangan
   satu elemen satu panggilan.
5. **Jangan menebak capability.** Cek lewat `list_commands` (id, label, parameter).

## Langkah 0: Cek Koneksi dan Amankan File

1. Panggil `inspect_document` untuk memastikan FigCraft terhubung dan melihat dokumen aktif.
   Jika gagal, beri tahu user penyebab yang mungkin:
   - Aplikasi belum dijalankan dengan `--control <port>`
   - MCP belum dipasang dengan `figcraft-cli mcp --attach <port>`
   - Antigravity belum di-restart / MCP belum di-refresh
   Jangan berpura-pura sudah mendesain. Tawarkan fallback: spesifikasi desain + kode langsung.
2. Minta/lakukan salinan file `.figcraft` milik user sebelum edit massal (FigCraft alpha).
   Untuk tugas baru, mulai dari file baru atau template, jangan menimpa file user.
3. Jangan memakai `collab.share` dengan `via: "online"` kecuali user memang minta berbagi;
   itu mengunggah dokumen ke server publik.

## Langkah 1: Baca Referensi

| Jenis referensi | Cara memprosesnya |
|---|---|
| Screenshot / gambar | Lihat langsung. Ekstrak warna, font, radius, bayangan, kepadatan, gaya ikon. |
| File SVG | Impor lewat `open_file` (menjadi frame yang bisa diedit). Baca struktur dan warnanya. |
| JSON Figma (REST API file JSON), `.fig` | Buka lewat `open_file` (opsional `variables`). `.fig` hanya best-effort; baca laporan impor/warnings dan jangan menjanjikan fidelitas. |
| URL website | Buka dan analisis struktur section, spacing, warna, tipografi. Tiru gaya, jangan salin teks/aset berhak cipta. |
| Deskripsi teks ("modern, minimalis, hijau") | Terjemahkan jadi keputusan konkret (tabel Langkah 2). |
| Tidak ada referensi | Pilih satu arah gaya yang tegas sesuai konteks proyek, bukan tampilan generik. |
| Banyak referensi | Tentukan peran masing-masing (mis. A untuk warna, B untuk layout). Jika bertabrakan, ikuti yang paling spesifik dari kata user. |

### Ringkasan Referensi (wajib, 5-8 baris)

Tulis sebelum membangun, contoh:

```
Referensi: dashboard gelap, aksen biru
- Warna: bg #0B0F1A, surface #121829, primary #3B82F6, teks #E6EAF2
- Font: Inter (heading 600, body 400), skala 12/14/16/20/28/40
- Bentuk: radius 12, border 1px translucent, bayangan tipis
- Layout: sidebar 240px, grid 12 kolom, kartu padat
- Mood: teknis, tenang, data-heavy
```

Kalau user menulis "cepat", tampilkan ringkasan ini lalu langsung bangun tanpa menunggu persetujuan.

## Langkah 2: Terjemahkan Kata Gaya Menjadi Keputusan

| Kata gaya | Keputusan desain |
|---|---|
| Minimalis / bersih | Whitespace besar, 1 warna aksen, border tipis, tanpa gradien, 1 keluarga font |
| Modern / SaaS | Radius 12-16, bayangan halus, gradien lembut di hero, ikon garis |
| Gelap | Surface berlapis (3 tingkat), teks off-white, aksen terang tapi tidak neon penuh |
| Playful / ramah | Radius besar, warna cerah, ilustrasi, font bulat, jarak lega |
| Korporat | Palet biru/abu, grid ketat, sans netral, ikon konsisten |
| Editorial / elegan | Heading serif, kontras tipografi kuat, banyak ruang kosong |
| Brutalist | Border tebal, tipografi besar, kontras tinggi, tanpa radius |
| Budaya / tradisional | Motif lokal sebagai aksen, palet hangat, hindari stereotip berlebihan |

## Langkah 3: Pilih Titik Mulai

- Jalankan `template.list`. Ada 8 starter: `mobile-app`, `landing-page`, `dashboard`,
  `design-system`, `wireframe-kit`, `social-posts`, `slides`, `icon-set`.
- Jika jenis desain cocok, mulai dari `file.newFromTemplate`, lalu ubah gayanya mengikuti
  ringkasan referensi. Jika tidak cocok, mulai dari dokumen kosong.
- MCP juga menyediakan prompt bawaan: `mobile_screen`, `design_system`, `landing_page`,
  `prototype_flow`. Pakai sebagai kerangka bila sesuai tugas.
- Jika file user sudah punya variables, styles, atau komponen, **pakai yang ada**
  (cek lewat `inspect_document`) dan hanya tambah yang kurang.

## Langkah 4: Fondasi Design System (kecil saja)

Buat lewat command (cari id-nya di `list_commands`, jangan menebak):

1. **Variables** (dengan modes bila perlu, mis. light/dark): warna (`bg`, `surface`,
   `border`, `text`, `text-muted`, `primary`, `success`, `warning`, `danger`), spacing
   (4, 8, 12, 16, 24, 32, 48, 64), radius (`sm`, `md`, `lg`, `full`).
2. **Text styles**: Display, H1, H2, H3, Body, Small, Caption (maks 2 keluarga font).
3. **Komponen inti** dengan variants: Button, Input, Card, Badge, Navbar/Sidebar, Table row,
   Modal. Buat hanya yang dipakai halaman yang diminta.
4. **Auto layout** di semua frame (flow, wrap, atau grid; sizing Hug/Fill/Fixed).
5. Cek font: jalankan `text.missingFonts`. Jika ada yang hilang, pakai `text.loadFont` atau
   ganti font yang mirip, dan beri tahu user.

## Langkah 5: Susun Halaman dengan Batch

- Susun lewat `batch` (atau script `figcraft-cli run` berisi array
  `{"command": id, "params": {...}}`). `{"$step": n}` memakai `id` hasil langkah ke-n,
  jadi satu script bisa membangun satu layar penuh. Script bersifat all-or-nothing dan
  satu langkah undo.
- Mulai dari frame desktop (1440). Tambah mobile (390) hanya jika diminta atau proyeknya
  jelas responsif.
- Susun per section secara vertikal: header -> hero/konten utama -> pendukung -> footer.
- Beri nama layer yang bermakna (`Hero/Title`, `Card/Stat`), bukan nama default.
- Pakai konten realistis sesuai konteks proyek, bukan lorem ipsum.
- Gunakan instance komponen, bukan salinan manual.
- Untuk konten berulang (kartu produk, carousel, post sosmed), pakai `data.fill` (satu frame
  diulang per baris data) dan `text.fit` agar teks muat, bukan edit satu per satu.
- Jika hasil MCP besar, minta `depth` lebih dangkal atau pakai `maxBytes` / `offset` pada
  `get_node` supaya tidak overflow.

## Langkah 6: Verifikasi (satu kali, jangan berputar)

1. `screenshot` atau `export` PNG pada `--scale` tertentu, lalu lihat hasilnya.
2. Checklist:
   - [ ] Gaya cocok dengan ringkasan referensi
   - [ ] Hierarki jelas, satu elemen dominan per section
   - [ ] Spacing konsisten dari token, tidak ada angka acak
   - [ ] Kontras teks terbaca (target WCAG AA)
   - [ ] Tidak ada teks terpotong atau overflow
   - [ ] Layer bernama, auto layout dipakai
   - [ ] Font tidak hilang
3. Perhatikan baris `note:` / `warnings` pada ekspor dan impor, lalu cek exit code.
   Jangan percaya ekspor yang diam-diam menghilangkan sesuatu.
4. `save_file` ke `.figcraft` setelah selesai. Jangan menimpa file `.fig` impor; Save as
   dengan nama `.fig` hanya membuat salinan ekspor.

Jangan menambah putaran poles tanpa diminta.

## Langkah 7: Prototype dan Handoff ke Kode (jika diminta)

- **Prototype**: pakai command `proto.*` (trigger, action, transisi). Ini tidak berlaku di
  file board.
- **Dev Mode**: FigCraft bisa membuat kode CSS, HTML, React, Leptos, SwiftUI, atau Compose
  dari frame. Cari command `dev.*` / codegen lewat `list_commands`.
- Untuk proyek web, ikuti stack yang sudah ada (cek `package.json` dan folder `components/`).
  Jika belum ada, pakai Next.js + Tailwind sebagai default.
- Petakan variables ke CSS variables / `tailwind.config`. Satu komponen FigCraft = satu
  komponen kode dengan nama sama. Auto layout -> flex/grid.
- Ekspor aset: SVG, PNG, JPG, WebP, PDF (PDF hanya ekspor, tidak bisa diimpor).
- Jangan menambah dependensi baru tanpa alasan jelas.

## Mode Cepat dan Mode Detail

**Cepat** ("cepat", "draft", "kasar"): 1 frame desktop, maks 4-5 section, token minimal
(warna, font, radius), tanpa varian/alternatif, lewati komponen yang tidak berulang.

**Detail** ("lengkap", "polished", "siap handoff"): tambah state komponen (hover, disabled,
error, empty, loading), frame mobile dan tablet, halaman "Design System" yang
mendokumentasikan token dan komponen, serta prototype alur utama.

## Batasan FigCraft yang Harus Dihormati

- Tidak ada fitur AI bawaan dan tidak ada plugin Figma (hanya plugin WASM milik FigCraft).
- `.fig`: impor best-effort, ekspor eksperimental. Jangan menjanjikan fidelitas penuh.
- Tidak ada impor PDF, HEIC, video, `.jam`, atau `.deck`.
- Board dan file desain berbeda: `board.*` hanya untuk board, `proto.*`/`dev.*` hanya untuk desain.
- Jangan mengotomasi GUI dengan klik buta; pakai command, `batch`, atau channel kontrol.
  Gunakan `pointer`/`key`/`type_text` hanya bila tidak ada command yang setara.
- Jangan menyalin aset, logo, atau teks berhak cipta dari referensi; tiru gayanya saja.
- Jangan menghapus atau menimpa frame yang sudah ada tanpa konfirmasi.
- Jangan mengklaim selesai jika tool mengembalikan error atau `rolledBack: true`.

## Format Jawaban ke User

1. Ringkasan referensi (5-8 baris)
2. Apa yang dibuat di FigCraft (nama frame/halaman, jumlah komponen)
3. Asumsi yang diambil (jika ada)
4. Saran langkah berikut (maks 2), mis. versi mobile atau ekspor ke kode

Gunakan bahasa yang sama dengan user (default: Bahasa Indonesia).