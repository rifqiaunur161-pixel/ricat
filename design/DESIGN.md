# ricat - Spesifikasi Desain Lengkap & Gradien Interaktif

> `antislop active: during (session override).`

Dokumen ini adalah spesifikasi menyeluruh desain antarmuka web **ricat**, mencakup seluruh 8 layar fungsional lengkap, latar belakang gradien radial interaktif (Dark & Light), dan sistem komponen kaca (*glassmorphism*).

---

## 1. Implementasi Latar Belakang Gradien Radial Interaktif

Latar belakang kanvas menggunakan formula gradien radial persis yang Anda berikan, dibuat interaktif mengikuti pergerakan kursor mouse (*mouse-following*):

### Dark Mode (Dark Horizon Glow):
```css
background: radial-gradient(125% 125% at var(--mouse-x, 50%) var(--mouse-y, 10%), #000000 40%, #0d1a36 100%);
```

### Light Mode (Light Horizon Glow):
```css
background: radial-gradient(125% 125% at var(--mouse-x, 50%) var(--mouse-y, 90%), #ffffff 40%, #475569 100%);
```

> Komponen React interaktif siap pakai telah dibuat di:
> [`design/InteractiveBackground.tsx`](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/design/InteractiveBackground.tsx)

---

## 2. Seluruh 8 Layar Fungsional di [ricat-ui.figcraft](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/design/ricat-ui.figcraft)

1. **`01-Workspace-Utama` (Dark Mode):**
   - Latar belakang Dark Horizon Glow (`#000000` ke `#0D1A36`).
   - Dock kapsul melengkung dengan tombol chat aktif berpendar ungu magenta.
   - Orba 3D berkilau, sapaan `Hi, Mahasiswa`, kotak prompt kaca cekung, dan 3 kartu pintasan.
   - Komponen toast notifikasi kuota (45/50) di sudut kanan atas.

2. **`02-Ganti-Format-Dokumen` (Dark Mode):**
   - Halaman konverter format dokumen.
   - Area dropzone file `Tugas_Besar_Sistem_Tertanam.docx (14.8 MB)`.
   - Selector format sasaran: PDF (.pdf), PowerPoint (.pptx), Word (.docx), Gambar (.png/.jpg).
   - Kotak informasi mesin pengolah: LibreOffice headless terisolasi di container dengan jaminan keamanan privasi berkas.
   - Tombol kapsul *Mulai Konversi ke Format Sasaran*.

3. **`03-Kompres-File` (Dark Mode):**
   - Halaman kompresi berkas praktikum / tugas besar.
   - Indikator peringatan ukuran asli `24.5 MB` (melebihi batas portal kampus 5 MB).
   - Slider penala ukuran target kompresi interaktif (`Target: 4.5 MB`, kompresi 81%, estimasi kualitas 88% tetap tajam).
   - Kotak perbandingan metrik sebelum (24.5 MB) vs sesudah (4.5 MB, hemat 20 MB).
   - Tombol eksekusi kompresi.

4. **`04-Tanya-Modul-PDF` (Dark Mode):**
   - Split-view antarmuka belajar modul kuliah.
   - Sisi Kiri: Viewer dokumen PDF `Sistem_Operasi_Modern.pdf (Hal 142 dari 450)` dengan kotak penyorot kutipan halaman aktif `[Hal 142 Paragraf 3]`.
   - Sisi Kanan: Panel tanya jawab AI berdasar modul dengan rujukan Gemini 1.5 Pro dan input chat lanjutan.

5. **`05-Speech-to-Text-Kuliah` (Dark Mode):**
   - Halaman transkrip rekaman suara kuliah (Groq Whisper).
   - Bar waveform pemutar audio interaktif dengan penanda durasi (09:42).
   - Editor transkrip sinkron per detik dengan stempel waktu `[00:15]`, `[01:42]`, `[04:10]` yang dapat diedit langsung.
   - Tombol pintasan langsung: *Buat Ringkasan Catatan* dan *Hasilkan Kuis dari Rekaman*.

6. **`06-Ringkas-Jurnal-Akademik` (Dark Mode):**
   - Halaman ringkasan jurnal ilmiah format baku 4 pilar.
   - Grid 4 kartu kaca terstruktur:
     - 1. Tujuan Penelitian (Biru)
     - 2. Metodologi & Sampel (Cyan)
     - 3. Temuan Kunci (Hijau)
     - 4. Keterbatasan Penelitian (Kuning)

7. **`07-Kuis-Flashcard-Belajar` (Dark Mode):**
   - Halaman kuis dan flashcard interaktif.
   - Kartu 3D melengkung dengan tombol balik kartu (spasi).
   - Tombol penilaian memori: *Saya Mengerti (Ingat)* dan *Perlu Diulangi Lagi*.

8. **`08-Dashboard-Admin-Management` (Light Glass Mode):**
   - Mengadopsi tata letak 1:1 dari referensi Coders Management dengan latar Light Gradient (`#FFFFFF` ke `#475569`).
   - Sidebar putih dengan tombol navigasi aktif berbentuk kapsul hitam legam (*active black pill*).
   - Header: Pemilih tanggal, toggle periode (`Hari | Minggu | Bulan | Tahun`), search bar pill, bel notifikasi badge `+3`.
   - Widget Penggunaan Biaya API (28.5% dari plafon $15) dengan grafik garis tren stabilitas.
   - Widget File Preview berupa kartu kaca hitam obsidian kontras tinggi dengan grafis inti bola cair 3D metalik (*liquid sphere*).
   - Baris timeline aktivitas sistem dan **Tombol Darurat API Berbayar (Kill Switch)** aktif.
   - Kartu kapsul berkas terunggah (DOCX, PDF, PPTX, XLSX, TXT).
   - Kartu hitam bawah analitik persetujuan mahasiswa baru berfoto avatar dengan tombol pill putih *Setujui* dan bar pembagian beban AI gratis 91%.

---

## 3. Gambar Preview Lengkap di [design/screenshots/](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/design/screenshots)
- `01-Workspace-Utama.png`
- `02-Ganti-Format-Dokumen.png`
- `03-Kompres-File.png`
- `04-Tanya-Modul-PDF.png`
- `05-Speech-to-Text-Kuliah.png`
- `06-Ringkas-Jurnal-Akademik.png`
- `07-Kuis-Flashcard-Belajar.png`
- `08-Dashboard-Admin-Management.png`
