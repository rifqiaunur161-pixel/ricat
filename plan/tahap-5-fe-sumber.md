# Tahap 5 – Frontend: Baca Foto/File & Materi Bersumber

**Jenis:** Frontend
**Prioritas:** Kelima
**Referensi PRD:** §5.2 Router AI (baca foto/file, materi bersumber), §5.5 Fitur Belajar & Utilitas (tanya PDF)

---

## Tujuan

Membangun halaman untuk membaca/mengekstrak teks dari foto dan file (OCR), serta halaman untuk chat dengan materi bersumber (pencarian web + modul/PDF sendiri). Semua masih mock. Backend di Tahap 10 dan 12.

---

## Checklist Tugas

### 5.1 Halaman Baca Foto/File (`/baca-foto`)

- [ ] Buat `app/(app)/baca-foto/page.tsx`
- [ ] Area unggah file:
  - Drag & drop zone
  - Tombol pilih file
  - Format yang diterima: JPG, PNG, WebP, HEIC, PDF
  - Batas ukuran ditampilkan: "Maks. 20 MB"
- [ ] Preview gambar/file yang diunggah
- [ ] Tombol "Baca Konten" (memulai OCR/ekstraksi)
- [ ] Loading state: "Sedang membaca gambar..."
- [ ] Hasil bacaan:
  - Teks hasil OCR ditampilkan di panel kanan
  - Bisa diedit oleh pengguna
  - Tombol copy teks
  - Tombol "Gunakan di Chat" (buka chat dengan teks ini sebagai konteks)
- [ ] Peringatan: "Periksa hasil sebelum digunakan — AI dapat membuat kesalahan pada tulisan tangan/angka"

### 5.2 Komponen Upload File

- [ ] Buat `src/components/file/FileDropzone.tsx`
  - Drag & drop dengan visual feedback (border berubah saat hover)
  - Validasi tipe file (berdasarkan ekstensi + MIME)
  - Validasi ukuran
  - Multiple file (opsional, sesuai konteks)
  - Progress upload (bar)
- [ ] Buat `src/components/file/FilePreview.tsx`
  - Thumbnail gambar
  - Ikon + nama untuk PDF/dokumen
  - Ukuran file
  - Tombol hapus

### 5.3 Halaman Tanya dari PDF/Modul (`/sumber`)

- [ ] Buat `app/(app)/sumber/page.tsx`
- [ ] Split layout:
  - **Kiri:** daftar dokumen/modul yang sudah diunggah
  - **Kanan:** interface chat/tanya

**Panel kiri — Kelola Modul/Dokumen:**
- [ ] Daftar PDF/modul yang sudah diunggah
  - Nama file, ukuran, tanggal upload
  - Status: Sedang diproses / Siap / Gagal
  - Toggle aktif/nonaktif (hanya dokumen aktif yang dicari)
- [ ] Tombol unggah modul/dokumen baru
- [ ] Tombol hapus dokumen

**Panel kanan — Tanya Modul/Dokumen:**
- [ ] Interface mirip chat
- [ ] Placeholder: "Tanyakan sesuatu dari modul Anda..."
- [ ] Respons AI menyertakan:
  - Jawaban
  - Kutipan dari halaman tertentu: "Sumber: [nama file], halaman 23"
  - Kutipan teks asli (blockquote)
- [ ] Mock response dengan kutipan halaman

### 5.4 Halaman Materi Bersumber (`/materi`)

- [ ] Buat `app/(app)/materi/page.tsx`
- [ ] Input pertanyaan/topik
- [ ] Pilihan mode pencarian:
  - 🌐 Cari dari web (Google Search grounding)
  - 📄 Dari modul saya
  - 🔀 Kombinasi keduanya
- [ ] Loading state: "Sedang mencari sumber..."
- [ ] Hasil:
  - Jawaban AI
  - Daftar sumber yang dipakai (judul, URL, tanggal akses)
  - Kutipan per klaim (hover sumber untuk lihat kutipan)
- [ ] Peringatan privasi: "Jangan kirim data pribadi/sensitif pada jalur gratis"

### 5.5 Komponen Kutipan Sumber

- [ ] Buat `src/components/sumber/SourceCard.tsx`
  - Judul, URL/nama file, tanggal
  - Badge tipe: Web / PDF
  - Kutipan singkat (3–4 kalimat)
- [ ] Buat `src/components/sumber/PageCitation.tsx`
  - Chip kecil "Hal. 23" yang bisa diklik untuk lihat kutipan lengkap
  - Tooltip/popover dengan teks asli

### 5.6 Komponen Peringatan Privasi

- [ ] Buat `src/components/common/PrivacyWarning.tsx`
  - Banner/callout kuning di halaman yang memakai AI gratis
  - Pesan: "Jangan kirim data pribadi/sensitif. Tier gratis Gemini dapat dipakai untuk melatih model AI."
  - Bisa di-dismiss (tersimpan di localStorage)

### 5.7 State

- [ ] Buat `src/store/useSumberStore.ts`:
  - `uploadedDocs: UploadedDoc[]`
  - `activeDocIds: string[]`
  - `searchMode: 'web' | 'docs' | 'both'`
  - Mock function tanya dokumen dan cari materi

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (app)/
      baca-foto/page.tsx
      sumber/page.tsx
      materi/page.tsx
  components/
    file/
      FileDropzone.tsx
      FilePreview.tsx
    sumber/
      SourceCard.tsx
      PageCitation.tsx
    common/
      PrivacyWarning.tsx
  store/
    useSumberStore.ts
  lib/
    mock/
      sumber.mock.ts
```

---

## Kriteria Selesai

- [ ] Upload gambar berhasil dan preview tampil
- [ ] Hasil OCR mock tampil di panel hasil
- [ ] Peringatan "periksa hasil" tampil
- [ ] Tanya PDF: jawaban mock menyertakan kutipan "Sumber: file.pdf, halaman X"
- [ ] Peringatan privasi tampil di halaman yang relevan
- [ ] Tidak ada TypeScript error

---

## Catatan Teknis

- Foto diperkecil di sisi klien sebelum dikirim ke AI (pakai `canvas` API) — implementasi stub dulu
- Jangan tampilkan URL bertanda tangan secara langsung di UI; sembunyikan di balik endpoint `/files/:id/download`
- Komponen `FileDropzone` harus bisa dipakai ulang di halaman konverter

