# Tahap 11 – Backend: File-Service Konverter & Kompres

**Jenis:** Backend (Python file-service + Node.js API)
**Prioritas:** Kesebelas
**Referensi PRD:** §5.4 Konverter dan Kompres File, §4.3 Jobs, §7 Kinerja dan Keandalan

---

## Tujuan

Mengimplementasikan semua konversi file dan kompresi di Python file-service: gambar ⇄ format lain, Office → PDF, PDF → DOCX/PPTX, kompres gambar/PDF. Koneksi ke frontend Tahap 6.

---

## Checklist Tugas

### 11.1 Dependensi Python Baru

Tambahkan ke `pyproject.toml`:
- [ ] `Pillow`
- [ ] `pillow-heif`
- [ ] `img2pdf`
- [ ] `PyMuPDF` (fitz)
- [ ] `pikepdf`
- [ ] `pdf2docx`
- [ ] `ocrmypdf`
- [ ] `python-pptx`

Dependensi sistem (di Dockerfile):
- [ ] `libreoffice` (headless)
- [ ] `tesseract-ocr` + `tesseract-ocr-ind` + `tesseract-ocr-eng`
- [ ] `ghostscript`
- [ ] `fonts-liberation` (font standar untuk LibreOffice)
- [ ] `ffmpeg`

### 11.2 Validasi File Input (Wajib di Semua Konversi)

- [ ] Buat `app/utils/validate.py`:
  - `validate_file_type(path, allowed_mimes)` — cek magic bytes, bukan hanya ekstensi
  - `validate_file_size(path, max_bytes)` — batas ukuran
  - `sanitize_filename(name)` — hapus karakter berbahaya
  - `check_not_corrupted(path, type)` — coba buka file; jika gagal: error jelas
- [ ] Semua konverter wajib panggil validasi sebelum proses

### 11.3 Konverter Gambar (`converters/image.py`)

- [ ] `convert_image(input_path, output_format)` — format: jpg/png/webp/pdf
- [ ] Support input: JPG, PNG, WebP, HEIC (via pillow-heif)
- [ ] Resize otomatis sebelum konversi jika terlalu besar
- [ ] `image_to_pdf(input_paths)` — beberapa gambar jadi satu PDF (via img2pdf)
- [ ] Return: path file output

### 11.4 Konverter Office → PDF (`converters/office_to_pdf.py`)

- [ ] `office_to_pdf(input_path)` — DOCX/PPTX/XLSX → PDF
- [ ] Jalankan LibreOffice headless:
  ```python
  subprocess.run([
    "libreoffice", "--headless", "--convert-to", "pdf",
    "--outdir", output_dir, input_path
  ], timeout=60, ...)
  ```
- [ ] **Perlindungan LibreOffice:**
  - Lock/semaphore: jalankan 1 proses LibreOffice sekaligus (konkurensi = 1)
  - Profil sementara terpisah per proses: `--profile /tmp/lo-profile-{uuid}`
  - Timeout 60 detik; kill paksa jika macet: `process.kill()`
  - Hapus profil sementara setelah selesai
  - Restart container jika LibreOffice crash berulang
- [ ] Pratinjau: generate thumbnail halaman pertama (via PyMuPDF)

### 11.5 Konverter PDF → DOCX (`converters/pdf_to_docx.py`)

- [ ] `pdf_to_docx(input_path)` → path DOCX
- [ ] Deteksi otomatis apakah PDF bisa-teks atau scan:
  - Coba ekstrak teks dengan PyMuPDF
  - Jika teks < 50 karakter per halaman: anggap scan → proses OCR dulu
- [ ] Proses OCR jika diperlukan:
  ```python
  ocrmypdf.ocr(input_path, ocr_output, language='ind+eng')
  ```
- [ ] Konversi ke DOCX:
  ```python
  from pdf2docx import Converter
  cv = Converter(input_path)
  cv.convert(output_path)
  ```
- [ ] Peringatan di respons jika konversi tidak sempurna (font/layout tidak identik)

### 11.6 Konverter PDF → PPTX (`converters/pdf_to_pptx.py`)

- [ ] `pdf_to_pptx_fast(input_path)` (Mode Cepat):
  - Rasterize tiap halaman PDF dengan PyMuPDF (300 DPI)
  - Buat slide baru per halaman
  - Masukkan gambar halaman ke slide (full size)
  - Return: path PPTX

### 11.7 Kompres Gambar (`converters/compress_image.py`)

- [ ] `compress_image(input_path, target_kb)`:
  - Biner search kualitas JPEG (0–95) untuk mencapai target ukuran
  - Jika sudah di bawah target: return tanpa kompres
  - Peringatan jika target < 10% ukuran asli: "Kualitas akan sangat menurun"
  - Return: (path output, ukuran asli, ukuran hasil, kualitas yang dipakai)

### 11.8 Kompres PDF (`converters/compress_pdf.py`)

- [ ] `compress_pdf(input_path, target_kb)`:
  - Gunakan Ghostscript:
    ```
    gs -dBATCH -dNOPAUSE -sDEVICE=pdfwrite
       -dCompatibilityLevel=1.4
       -dPDFSETTINGS=/screen
       -sOutputFile=output.pdf input.pdf
    ```
  - Coba setting `/ebook` dulu; jika masih terlalu besar, coba `/screen`
  - Gunakan pikepdf untuk optimasi lanjutan jika Ghostscript saja tidak cukup
  - Peringatan jika hasil masih di atas target

### 11.9 Worker Task Konversi

- [ ] Buat `workers/tasks/convert.py`:
  ```python
  async def run_conversion(ctx, job_id: str, task_type: str, input_key: str, params: dict):
      # 1. Download input dari MinIO/R2
      # 2. Validasi file
      # 3. Jalankan converter sesuai task_type
      # 4. Upload hasil ke MinIO/R2
      # 5. Lapor ke Node API: PATCH /internal/jobs/{job_id}
      # 6. Hapus file temporary
  ```
- [ ] Semua di dalam `try/finally` untuk pastikan file temporary terhapus
- [ ] Retry otomatis 1x jika gagal, lalu set status `failed`

### 11.10 API Node.js: Jobs

- [ ] `POST /api/v1/jobs` — buat job baru:
  - Validasi: type (convert/compress/ocr/stt/generate), input_file_id, params
  - Insert `jobs` dengan status `queued`
  - Kirim task ke arq (file-service) via HTTP internal
  - Return: `{ job_id }`
- [ ] `GET /api/v1/jobs/:id` — status job
- [ ] `GET /api/v1/jobs/:id/events` — SSE progress
- [ ] `DELETE /api/v1/jobs/:id` — batalkan job (jika masih queued)

### 11.11 Upload File Pengguna

- [ ] `POST /api/v1/files` — upload file:
  - Validasi MIME type (magic bytes), ukuran (max 20 MB)
  - Sanitasi nama file
  - Hitung SHA256 (deduplicate jika sudah ada)
  - Upload ke MinIO/R2
  - Insert `files` dengan `expires_at` (tamu: 1 jam, akun: 7 hari)
  - Return: `{ file_id, original_name, size_bytes }`
- [ ] `GET /api/v1/files/:id/download` — generate signed URL (expire 15 menit)
- [ ] RLS: user hanya bisa akses file sendiri

### 11.12 Perlindungan Proses (Semua Konverter)

- [ ] Semua proses berat dijalankan dalam `subprocess` dengan:
  - `timeout=60` (detik)
  - `cwd=/tmp/workspace-{uuid}` (direktori kerja terisolasi)
- [ ] Batas memory dengan cgroups (di Docker Compose: `mem_limit: 1g`)
- [ ] Batas CPU (di Docker Compose: `cpus: '1'`)
- [ ] File input tidak pernah dikirim langsung ke LibreOffice tanpa validasi

### 11.13 Dockerfile (Update)

Perbarui `infra/Dockerfile.file-service`:
- [ ] Install semua dependensi sistem: LibreOffice, Tesseract, Ghostscript, ffmpeg, fonts
- [ ] Pasang font Liberation (agar LibreOffice tidak salah render font Office)
- [ ] User non-root dengan home di `/home/fileservice`
- [ ] `WORKDIR /app`
- [ ] Volume `/tmp` untuk workspace temporary
- [ ] Network: hanya internal Docker + akses ke MinIO/R2

### 11.14 Integrasi Frontend (Tahap 6)

- [ ] Ganti mock conversion di halaman konverter dengan API nyata
- [ ] Upload file → create job → polling SSE → download hasil
- [ ] Tampilkan ukuran sebelum/sesudah kompres dari respons API

---

## Kriteria Selesai

- [ ] JPG → PNG berjalan (Pillow)
- [ ] DOCX → PDF berjalan (LibreOffice)
- [ ] PDF → DOCX berjalan (pdf2docx)
- [ ] PDF scan → DOCX: OCR dulu berjalan (ocrmypdf + pdf2docx)
- [ ] PDF → PPTX mode cepat berjalan (PyMuPDF + python-pptx)
- [ ] Kompres gambar: file < target size (atau peringatan jika tidak mungkin)
- [ ] Kompres PDF: Ghostscript menghasilkan file lebih kecil
- [ ] LibreOffice tidak bisa berjalan paralel (semaphore berjalan)
- [ ] File temporary dihapus setelah selesai atau gagal
- [ ] pytest: test tiap jenis konversi dengan file contoh

---

## Catatan Teknis

- LibreOffice harus dijalankan dengan `--headless` dan profil terpisah setiap kali
- Jika LibreOffice hang (timeout), gunakan `process.kill(signal.SIGKILL)`
- Tesseract bahasa Indonesia: install package `tesseract-ocr-ind` di Dockerfile
- Font yang dipasang di server menentukan kualitas konversi DOCX → PDF

