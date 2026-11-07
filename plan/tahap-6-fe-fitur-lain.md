# Tahap 6 – Frontend: Konverter, Kompres, STT, Kuis, Flashcard, Ringkas Jurnal

**Jenis:** Frontend
**Prioritas:** Keenam
**Referensi PRD:** §5.4 Konverter dan Kompres, §5.5 Fitur Belajar & Utilitas (STT, kuis, flashcard, ringkas jurnal)

---

## Tujuan

Membangun halaman-halaman utilitas: konverter & kompres file, speech-to-text, kuis & flashcard, dan ringkasan jurnal. Semua menggunakan data mock. Backend di Tahap 11 (konverter) dan Tahap 12 (STT, belajar).

---

## Checklist Tugas

### 6.1 Halaman Konverter File (`/konverter`)

- [ ] Buat `app/(app)/konverter/page.tsx`
- [ ] Tab navigasi konversi yang tersedia:
  - 🖼️ Gambar ⇄ Format Lain
  - 📄 Office → PDF
  - 📝 PDF → DOCX
  - 📊 PDF → PPTX
  - 🗜️ Kompres

**Tab: Gambar**
- [ ] Dropzone unggah gambar (JPG/PNG/WebP/HEIC)
- [ ] Pilih format output: JPG / PNG / WebP / PDF
- [ ] Tombol "Konversi"
- [ ] Loading state + progress bar
- [ ] Hasil: tombol unduh + preview thumbnail

**Tab: Office → PDF**
- [ ] Dropzone: DOCX / PPTX / XLSX
- [ ] Tombol "Konversi ke PDF"
- [ ] Info: "Menggunakan LibreOffice — font harus tersedia di server"
- [ ] Loading + progress
- [ ] Hasil: tombol unduh PDF

**Tab: PDF → DOCX**
- [ ] Dropzone: PDF
- [ ] Peringatan jika PDF kemungkinan scan: "Akan diproses OCR dulu"
- [ ] Tombol "Konversi"
- [ ] Loading + progress
- [ ] Hasil: tombol unduh DOCX

**Tab: PDF → PPTX**
- [ ] Dropzone: PDF
- [ ] Mode cepat (gambar per halaman: PyMuPDF + python-pptx)
- [ ] Loading + progress
- [ ] Hasil: tombol unduh PPTX

### 6.2 Halaman Kompres File (`/konverter/kompres`)

- [ ] Buat `app/(app)/konverter/kompres/page.tsx` atau tab di `/konverter`
- [ ] Dropzone: gambar (JPG/PNG/WebP) atau PDF
- [ ] Slider target ukuran (KB): "Kompres hingga X KB"
- [ ] Tampilkan ukuran asli setelah upload
- [ ] Peringatan: "Jika target terlalu kecil, kualitas akan sangat menurun"
- [ ] Tombol "Kompres"
- [ ] Hasil:
  - Ukuran sebelum vs sesudah
  - Persentase pengurangan
  - Preview (untuk gambar)
  - Tombol unduh

### 6.3 Komponen Job Status

- [ ] Buat `src/components/job/JobProgress.tsx`
  - Progress bar dengan persentase
  - Status teks: "Mengantri..." / "Sedang diproses..." / "Selesai" / "Gagal"
  - Estimasi waktu (opsional)
  - Tombol "Batalkan" (saat masih antri/running)
  - Tombol "Coba Lagi" (saat gagal)
- [ ] Buat `src/components/job/JobResult.tsx`
  - Tombol unduh hasil
  - Info ukuran file hasil
  - Tombol konversi baru

### 6.4 Halaman Speech-to-Text (`/stt`)

- [ ] Buat `app/(app)/stt/page.tsx`
- [ ] Area rekam/unggah audio:
  - Tombol rekam langsung (mic) — gunakan Web Audio API
  - Atau unggah file audio (MP3, WAV, M4A, MP4 audio)
- [ ] Timer rekaman yang berjalan
- [ ] Batas durasi ditampilkan: "Maks. 10 menit"
- [ ] Tombol stop rekaman
- [ ] Preview audio yang direkam/diunggah
- [ ] Tombol "Transkripsi"
- [ ] Loading state: "Sedang mentranskripsikan..."
- [ ] Hasil transkripsi:
  - Teks hasil
  - Tombol copy
  - Tombol "Gunakan di Chat"
  - Tombol unduh sebagai `.txt`
- [ ] Peringatan tamu:
  - "Audio dan transkripsi dihapus otomatis setelah selesai"
  - Kuota: "X rekaman tersisa hari ini"

### 6.5 Komponen Rekaman Audio

- [ ] Buat `src/components/stt/AudioRecorder.tsx`
  - Timer `mm:ss`
  - Visualisasi gelombang audio (simple waveform atau animasi bar)
  - Tombol rekam/stop
  - Tombol hapus rekaman
- [ ] Buat `src/components/stt/AudioPlayer.tsx`
  - Player sederhana: play/pause, progress bar, durasi

### 6.6 Halaman Kuis & Flashcard (`/belajar`)

- [ ] Buat `app/(app)/belajar/page.tsx`
- [ ] Daftar study set yang sudah dibuat (kuis / flashcard)
- [ ] Tombol "Buat Kuis/Flashcard Baru"
- [ ] Buat `app/(app)/belajar/baru/page.tsx`:
  - Pilih tipe: Kuis / Flashcard
  - Unggah sumber (PDF modul/slide)
  - Atau input teks manual
  - Pilih jumlah soal/kartu (5 / 10 / 20 / kustom)
  - Tombol "Generate"

**Mode Kuis:**
- [ ] Buat `app/(app)/belajar/[id]/kuis/page.tsx`
  - Tampilkan soal satu per satu
  - 4 pilihan jawaban (multiple choice)
  - Progress: "Soal 3 dari 10"
  - Highlight jawaban benar/salah setelah dipilih
  - Penjelasan singkat per soal
  - Layar hasil: skor, review per soal
  - Tombol unduh sebagai DOCX/XLSX

**Mode Flashcard:**
- [ ] Buat `app/(app)/belajar/[id]/flashcard/page.tsx`
  - Kartu flip (animasi) — depan: pertanyaan, balik: jawaban
  - Navigasi prev/next
  - Progress: "Kartu 3 dari 10"
  - Tombol "Sudah tahu" / "Perlu review"
  - Tombol unduh sebagai DOCX

### 6.7 Halaman Ringkas Jurnal (`/jurnal`)

- [ ] Buat `app/(app)/jurnal/page.tsx`
- [ ] Area unggah PDF jurnal
- [ ] Atau input URL jurnal/DOI
- [ ] Tombol "Ringkas"
- [ ] Loading state
- [ ] Hasil ringkasan dengan format tetap:
  - **Tujuan/Penelitian**
  - **Metode**
  - **Hasil**
  - **Keterbatasan**
  - Bagian yang tidak disebutkan ditandai: "Tidak disebutkan dalam jurnal"
- [ ] Tombol copy ringkasan
- [ ] Daftar ringkasan jurnal sebelumnya

### 6.8 State Belajar

- [ ] Buat `src/store/useBelajarStore.ts`:
  - `studySets: StudySet[]`
  - `currentQuiz: QuizState | null`
  - `currentFlashcard: FlashcardState | null`
  - Mock data kuis dan flashcard

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (app)/
      konverter/
        page.tsx
        kompres/page.tsx
      stt/page.tsx
      belajar/
        page.tsx
        baru/page.tsx
        [id]/
          kuis/page.tsx
          flashcard/page.tsx
      jurnal/page.tsx
  components/
    job/
      JobProgress.tsx
      JobResult.tsx
    stt/
      AudioRecorder.tsx
      AudioPlayer.tsx
    belajar/
      QuizCard.tsx
      FlashCard.tsx
      StudySetCard.tsx
    jurnal/
      JurnalSummary.tsx
  store/
    useBelajarStore.ts
  lib/
    mock/
      belajar.mock.ts
      konverter.mock.ts
```

---

## Kriteria Selesai

- [ ] Konverter: upload file + mock conversion + tombol unduh tampil
- [ ] Kompres: slider ukuran berfungsi, hasil mock tampil dengan info sebelum/sesudah
- [ ] STT: tombol rekam berfungsi (Web Audio API), timer berjalan, mock transkripsi tampil
- [ ] Kuis: soal tampil, jawaban bisa dipilih, skor akhir tampil
- [ ] Flashcard: animasi flip berfungsi, prev/next berfungsi
- [ ] Ringkas jurnal: hasil mock tampil dengan 4 seksi format tetap
- [ ] Semua komponen responsif di mobile
- [ ] Tidak ada TypeScript error

