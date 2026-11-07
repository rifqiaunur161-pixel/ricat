# PRD – Asisten Kuliah Serba Ada

**Versi:** 1.2
**Stack:** Node.js + TypeScript (web), Python (pengolah file)
**Penulis:** M. Rifqi Aunur Rahman
**Status:** Draf siap dibangun

---

## 1. Ringkasan

Asisten Kuliah Serba Ada adalah web multi-pengguna untuk membantu tugas kuliah: chat AI, penjelasan materi bersumber, baca foto/file, konverter dan kompres file, speech-to-text, ringkas jurnal, serta kuis dan flashcard. Akses diatur lewat akun yang harus disetujui admin, dan tamu tanpa akun hanya mendapat sebagian fitur dengan batas ketat. Semua dikelola dari dashboard admin, dengan pengaman biaya karena memakai API berbayar (Claude, OpenAI).

**Pembagian stack:** seluruh web (frontend, API, router AI, login, kuota, dashboard admin) memakai Node.js (TypeScript). Pengolahan file (konversi, kompres, OCR) memakai Python di satu layanan terpisah bernama `file-service`, karena library Python untuk pekerjaan itu paling matang (`pdf2docx`, `ocrmypdf`, `python-docx`, `openpyxl`, `Pillow`). Keduanya berkomunikasi lewat HTTP internal, dan skema database hanya dimiliki sisi Node.

---

### 1.1 Tujuan

- Satu web yang dipakai pribadi dan teman, aman dibuka ke publik terbatas.
- Biaya API terkendali dan bisa dimatikan dengan satu tombol.
- Tiap tahap bisa dipakai sendiri begitu selesai (rilis bertahap).
- Kode rapi, bertipe (TypeScript end-to-end), mudah dilanjutkan lewat vibe coding.

### 1.2 Bukan Tujuan (v1)

- Pembayaran/langganan, aplikasi mobile native, kolaborasi real-time antar pengguna.
- Menjual ulang akses API (dilarang beberapa penyedia, mis. OpenRouter).
- Menyimpan percakapan tamu.

### 1.3 Pengguna dan Peran

| Peran | Cara Masuk | Akses |
|---|---|---|
| **Tamu** | Tanpa akun, CAPTCHA sebelum pemakaian pertama | Konverter/kompres, speech-to-text, chat model gratis, semua dengan batas |
| **Akun disetujui** (`user`) | Daftar, verifikasi email, disetujui admin | Semua fitur dengan kuota bawaan |
| **Admin** (`admin`) | Dibuat lewat perintah CLI di server, login + OTP | Dashboard admin; hanya melihat data pemakaian, bukan isi chat |

---

## 2. Tech Stack

### Node.js

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Monorepo | `pnpm workspaces` + Turborepo | Berbagi tipe dan skema antar frontend dan API |
| Frontend | Next.js (App Router) + React + TypeScript | Ekosistem terbesar, cocok untuk vibe coding |
| UI | Tailwind CSS + shadcn/ui + lucide-react | Cepat, konsisten, mudah dikustom |
| State/data | TanStack Query + Zustand (seperlunya) | Cache server state, UI state ringan |
| Form/validasi | React Hook Form + Zod | Skema Zod yang sama dipakai di API |
| Backend API | Fastify + TypeScript + Zod | Cepat, skema-first, mudah dipisah dari frontend |
| Streaming chat | SSE dari Fastify; di klien memakai Vercel AI SDK (`ai`) | Satu antarmuka untuk Gemini, Groq, Anthropic, OpenAI, OpenRouter |
| Database | PostgreSQL + Drizzle ORM (`drizzle-kit` untuk migrasi) | Relasional kuat, JSONB, FTS, partisi; Node adalah satu-satunya pemilik skema |
| Pencarian dokumen | Postgres Full-Text Search + pgvector | Satu database; embedding dibuat lewat API dari Node |
| Auth | Implementasi sendiri: sesi cookie HttpOnly, hash argon2 (`@node-rs/argon2`) | Alur persetujuan admin dan OTP khusus |
| Email dan CAPTCHA | SMTP Gmail (App Password) lewat Nodemailer dan Cloudflare Turnstile | Kode verifikasi, OTP; CAPTCHA gratis |
| Rate limit dan cache | Redis + `@fastify/rate-limit` | Batas login, OTP, tamu |

### Python

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework layanan file | FastAPI + Pydantic v2 (Python 3.12), dependensi dengan `uv`, lint `ruff` | Cocok dipanggil dari Node lewat HTTP, skema request/respons jelas |
| Antrean tugas | `arq` (Redis) | Berbasis asyncio, sepasang dengan FastAPI, lebih ringan dari Celery |
| Gambar | Pillow + pillow-heif, img2pdf | HEIC/JPG/PNG/WebP dan gambar ke PDF tanpa kompromi kualitas |
| PDF | PyMuPDF (ekstrak teks per halaman, raster), pikepdf, Ghostscript (kompres) | Teks per halaman dipakai untuk kutipan dan pencarian |
| Office ke PDF | LibreOffice headless | Hasil paling setia untuk DOCX/PPTX/XLSX |
| PDF ke DOCX / PPTX | pdf2docx; PyMuPDF + python-pptx | Pilihan terbaik yang tersedia untuk kedua konversi |
| OCR | ocrmypdf + Tesseract (bahasa ind, eng) | PDF scan jadi PDF yang dapat dicari |
| Ekspor data | python-docx, openpyxl | Ekspor kuis dan flashcard ke docx/xlsx |
| Audio | ffmpeg; opsional faster-whisper untuk rekaman panjang | Whisper utama tetap Groq, dipanggil dari Node |

### Bersama

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Penyimpanan file | S3-compatible: Cloudflare R2 (produksi), MinIO (lokal); `@aws-sdk` di Node, `boto3` di Python | Kedua sisi memakai bucket yang sama lewat URL bertanda tangan |
| Log dan test | pino + Vitest + Playwright (Node); structlog + pytest (Python); opsional Sentry | — |
| Deploy dan CI | Docker Compose di Oracle Cloud Always Free + Caddy (HTTPS otomatis); GitHub Actions | Gratis; lihat bagian 2.2 untuk batasannya |

---

### 2.1 Struktur Repo

```
apps/
  web/           → Next.js (UI pengguna dan admin)
  api/           → Fastify (REST + SSE, auth, kuota, router AI, pencatatan job)
packages/
  db/            → skema Drizzle, migrasi, seed
  shared/        → skema Zod, tipe, konstanta
  ai/            → adapter penyedia model, router, penghitung biaya
services/
  file-service/  → Python (FastAPI + arq)
    app/         → endpoint internal
    workers/     → tugas antrean
    converters/
    generators/  → ekspor kuis/flashcard (docx/xlsx)
    tests/
    pyproject.toml
infra/
  Dockerfile (tiap layanan)
  docker-compose.yml
  Caddyfile
```

### 2.2 Hosting dan Email (Semua Gratis)

- **Server:** Oracle Cloud Always Free, VM Ampere A1 (Arm) dengan batas total 2 OCPU dan 12 GB RAM (dikurangi dari 4 OCPU/24 GB pada pertengahan 2026). Cukup untuk 1–3 pengguna menjalankan Docker Compose berisi Postgres, Redis, web, API, dan file-service. Semua image harus punya versi `arm64`.
- **Risiko server gratis:** butuh kartu untuk verifikasi akun, stok VM kadang habis (*"out of capacity"*), akun atau instance yang lama menganggur bisa dihentikan, dan kebijakan gratis bisa berubah tanpa pemberitahuan. **Mitigasi:** `pg_dump` rutin ke luar server, dan seluruh sistem berjalan dari satu `docker-compose.yml` sehingga mudah dipindah ke server lain.
- **Domain dan HTTPS:** subdomain gratis (misalnya DuckDNS) + Caddy untuk HTTPS otomatis.
- **Penyimpanan file:** MinIO di server yang sama, dengan file kedaluwarsa dihapus otomatis agar disk tidak penuh.
- **Email (verifikasi dan OTP):** SMTP Gmail dengan App Password lewat Nodemailer, gratis dan tidak butuh domain sendiri. Pengiriman ulang OTP dibatasi agar akun tidak diblokir karena dianggap spam. Opsi nanti bila sudah punya domain: Resend paket gratis (3.000 email/bulan, maksimal 100/hari, butuh domain terverifikasi).

---

## 3. Arsitektur

```
Browser → Caddy (HTTPS) → Next.js (UI) + Fastify API
```

API menyimpan API key di server, memeriksa izin dan kuota, lalu memanggil **Router AI**. Untuk tugas file, API membuat baris `jobs`, lalu meminta `file-service` (Python, hanya bisa dijangkau dari jaringan internal dan dilindungi secret internal) mengantrekan tugas ke Redis. Worker Python mengunduh input dari R2/MinIO, mengolahnya di sandbox, mengunggah hasil, lalu melaporkan progres dan hasil ke endpoint internal API. API yang menulis ke database dan meneruskan progres ke klien lewat SSE. Python tidak pernah memegang API key AI atau menyentuh data akun.

### Prinsip

1. Izin dan kuota selalu dicek di server (bukan hanya menyembunyikan tombol).
2. Setiap baris data pengguna punya `user_id`; layanan memfilter dengan `user_id` dan dilapisi Postgres Row-Level Security (wajib, lihat bagian 10).
3. Nama model, harga, dan aturan routing ada di database/pengaturan, bukan di kode.
4. Isi dokumen dan hasil pencarian diperlakukan sebagai data, bukan perintah (anti prompt-injection).
5. Tugas penting tidak turun diam-diam ke model lemah; gagal berarti error + tombol "coba lagi".

---

## 4. Desain Database (PostgreSQL)

> [!NOTE]
> **Konvensi:** primary key `uuid` (UUID v7, urut waktu), semua waktu `timestamptz`, `snake_case`, enum lewat tipe `pgEnum` atau tabel referensi, hapus lunak (`deleted_at`) untuk data pengguna, email bertipe `citext`, nilai uang `numeric(12,6)`.

### 4.1 Akun dan Keamanan

| Tabel | Kolom Utama | Catatan |
|---|---|---|
| `users` | `id`, `email` (unik), `password_hash`, `role` (user/admin), `status` (pending_email / pending_approval / active / rejected / disabled), `email_verified_at`, `approved_by`, `approved_at`, `rejected_reason`, `quota_override_id`, `created_at`, `deleted_at` | Hanya `active` yang bisa login |
| `sessions` | `id`, `user_id`, `token_hash`, `ip`, `user_agent`, `created_at`, `expires_at`, `revoked_at` | Token acak di cookie, yang disimpan hanya hash-nya |
| `otp_codes` | `id`, `user_id`, `purpose` (verify_email / reset_password / admin_login), `code_hash`, `attempts`, `max_attempts`, `expires_at`, `consumed_at`, `created_at` | OTP 6 digit, berlaku 10 menit, sekali pakai |
| `login_attempts` | `id`, `email_hash`, `ip`, `success`, `created_at` | Dasar pembatasan login |
| `guest_identities` | `id`, `device_hash`, `ip_hash`, `captcha_verified_at`, `first_seen_at`, `last_seen_at` | Kuota tamu per IP dan per perangkat |

### 4.2 Konfigurasi (Dikelola Admin)

| Tabel | Kolom Utama | Catatan |
|---|---|---|
| `system_settings` | `key` (PK), `value` (jsonb), `updated_by`, `updated_at` | Pendaftaran buka/tutup, mode perawatan, plafon bulanan, plafon harian tamu |
| `features` | `key` (PK), `name`, `enabled`, `guest_allowed`, `requires_paid_ai` | Saklar per fitur |
| `quota_rules` | `id`, `feature_key`, `subject` (guest/user), `period` (day/month), `metric` (count/minutes/tokens/bytes), `limit_value` | Semua angka batas dapat diubah |
| `quota_overrides` | `id`, `user_id`, `feature_key`, `metric`, `period`, `limit_value` | Kuota khusus per akun |
| `ai_models` | `id`, `provider`, `model_id`, `display_name`, `tier` (free/paid), `guest_allowed`, `enabled`, `price_in_per_mtok`, `price_out_per_mtok`, `max_output_tokens` | Ganti nama model tanpa ubah kode |
| `routing_rules` | `id`, `task_type`, `preset` (hemat/seimbang/terbaik), `model_id`, `priority` (0 = utama, >0 = cadangan) | Jalur utama dan cadangan per tugas |

### 4.3 Chat dan File

| Tabel | Kolom Utama | Catatan |
|---|---|---|
| `conversations` | `id`, `user_id`, `title`, `mode` (auto/preset/manual), `preset`, `created_at`, `deleted_at` | Hanya untuk akun; tamu tidak disimpan |
| `messages` | `id`, `conversation_id`, `role`, `parts` (jsonb), `model_id`, `task_type`, `tokens_in`, `tokens_out`, `cost_usd`, `error_code`, `created_at` | Menyimpan label "dijawab oleh" |
| `files` | `id`, `user_id` (nullable untuk tamu), `storage_key`, `original_name`, `mime`, `size_bytes`, `sha256`, `kind` (upload/output), `expires_at`, `deleted_at` | Kedaluwarsa otomatis; tamu 1 jam, akun 7 hari (dapat diatur) |
| `jobs` | `id`, `user_id/guest_id`, `type`, `status` (queued / running / succeeded / failed / cancelled), `progress`, `input` (jsonb), `output_file_id`, `error`, `attempts`, `created_at`, `finished_at` | Konversi, OCR, STT, pembuatan kuis/flashcard |

### 4.4 Modul, Materi, dan Belajar

| Tabel | Kolom Utama | Catatan |
|---|---|---|
| `source_chunks` | `id`, `file_id`, `user_id`, `page`, `text`, `tsv` (tsvector), `embedding` (vector) | Indeks GIN (FTS) dan HNSW (vektor) untuk modul/PDF |
| `study_sets` | `id`, `user_id`, `type` (quiz/flashcard/journal_summary), `title`, `source_file_id`, `created_at` | Kumpulan soal, kartu, atau ringkasan |
| `study_items` | `id`, `study_set_id`, `position`, `payload` (jsonb) | Butir soal kuis, kartu flashcard, atau seksi ringkasan |

### 4.5 Pemakaian, Biaya, dan Audit

| Tabel | Kolom Utama | Catatan |
|---|---|---|
| `usage_events` | `id`, `user_id`, `guest_id`, `feature_key`, `model_id`, `task_type`, `input_tokens`, `output_tokens`, `audio_seconds`, `bytes`, `duration_ms`, `cost_usd`, `status`, `error_code`, `created_at` | Dipartisi per bulan; dasar kuota, dashboard, dan biaya |
| `usage_daily` | `date`, `subject_key`, `feature_key`, `count`, `tokens`, `cost_usd` | Agregasi harian agar cek kuota cepat |
| `audit_logs` | `id`, `actor_id`, `action`, `target_type`, `target_id`, `metadata` (jsonb), `ip`, `created_at` | Tindakan admin, hanya tambah |
| `app_errors` | `id`, `source`, `message`, `stack_hash`, `context` (jsonb), `created_at` | Error terbaru di dashboard |

### 4.6 Indeks dan Retensi

- **Indeks:** `users(email)`, `sessions(token_hash)`, `messages(conversation_id, created_at)`, `usage_events(user_id, created_at)`, `usage_daily(subject_key, date)`, `jobs(status, created_at)`, GIN pada `source_chunks.tsv`, HNSW pada `embedding`.
- **Cron harian:** hapus file kedaluwarsa, OTP lama, sesi kedaluwarsa, job selesai > 30 hari.
- Audio dan transkrip tamu dihapus segera setelah diproses; percakapan tamu tidak masuk tabel.
- **Cadangan:** `pg_dump` terjadwal ke R2, uji pemulihan berkala.

---

## 5. Persyaratan Fungsional

### 5.1 Akun dan Akses

1. **Daftar:** email + password (min. 10 karakter, dicek terhadap daftar password umum), CAPTCHA, kode verifikasi email, status `pending_approval`.
2. **Persetujuan:** admin menyetujui atau menolak; pengguna diberi tahu lewat email; hanya `active` yang bisa login.
3. **Login:** email + password, batas percobaan gagal per akun dan per IP, penundaan bertahap.
4. **Reset password:** masukkan email, OTP 6 digit lewat email, password baru. Pesan respons sama untuk email terdaftar maupun tidak. Setelah ganti, semua sesi dicabut dan email pemberitahuan dikirim.
5. **Admin pertama:** dibuat lewat perintah `pnpm admin:create`, bukan halaman daftar. Login admin selalu memakai OTP.
6. **Tamu:** CAPTCHA sebelum pemakaian pertama, kuota per IP dan per perangkat, plafon harian bersama khusus tamu.

### 5.2 Router AI

**Mode:**
- **Otomatis** (default): tugas dikenali dari tombol/menu, bukan menebak isi pesan.
- **Preset:** Hemat / Seimbang / Terbaik.
- **Manual:** dropdown, selalu menang atas otomatis.

**Alur satu permintaan:**
```
cek izin → cek kuota → cek pengaman biaya → pilih model dari routing_rules
→ panggil dengan timeout → bila gagal: ulang sekali dengan jeda → pindah ke cadangan
→ catat usage_events → kirim hasil dengan label "dijawab oleh: …"
```

**Aturan:**
- Claude tidak pernah dipakai untuk tamu.
- Satu system prompt yang sama untuk semua model.
- Riwayat chat disimpan di backend dan dikirim ulang dengan format seragam saat ganti model.
- Keluaran JSON divalidasi Zod dan diminta ulang sekali bila rusak.

**Pemetaan awal tugas ke model (dapat diubah admin):**

| Tugas | Utama | Cadangan |
|---|---|---|
| Chat santai | Gemini (gratis) | Groq, OpenRouter |
| Materi bersumber | Gemini + Google Search grounding | Tavily + Gemini/Groq |
| Baca foto/file | Gemini (foto jadi teks) | Foto rumit langsung ke Claude |
| Gambar | Gemini (gratis) | OpenAI via tombol "kualitas lebih tinggi" |
| Ringkas jurnal, kuis, flashcard | Gemini; Claude untuk jurnal penting | — |
| Speech-to-text | Groq Whisper (≤ 25 MB) | whisper.cpp sendiri untuk rekaman panjang |

### 5.3 Pengaman Biaya

- `max_tokens` wajib di setiap panggilan; kuota harian dan bulanan per akun.
- Plafon bulanan total (USD) di `system_settings`; sebelum setiap panggilan berbayar, biaya bulan berjalan dibaca dari `usage_daily`/Redis.
- **Tombol darurat:** mematikan semua fitur berbayar (Claude, OpenAI) seketika; fitur gratis tetap jalan.
- Peringatan admin di 80% dan 100% plafon; batas pengeluaran juga diatur di Claude Console.
- Tombol gambar OpenAI dibatasi per hari dengan kualitas rendah/menengah dulu.

### 5.4 Konverter dan Kompres File

| Konversi | Alat (di file-service) |
|---|---|
| JPG/PNG/WebP/HEIC ⇄ format gambar | Pillow + pillow-heif |
| Gambar → PDF | img2pdf |
| DOCX/PPTX/XLSX → PDF | LibreOffice headless (container terisolasi, font terpasang, ada pratinjau) |
| PDF → DOCX | pdf2docx; PDF scan diproses ocrmypdf (Tesseract) dulu |
| PDF → PPTX | Mode cepat (gambar per halaman: PyMuPDF + python-pptx) |
| Kompres ke ukuran target | Cari kualitas terbaik dari file asli: Pillow untuk gambar, Ghostscript + pikepdf untuk PDF; peringatan jelas bila target terlalu kecil |

> [!IMPORTANT]
> **Aturan keamanan file:** unggahan divalidasi (jenis lewat magic bytes, ukuran), nama file dibersihkan, file sementara dihapus otomatis, proses berjalan tanpa akses jaringan dan dengan batas CPU/memori/waktu, foto diperkecil sebelum dikirim ke AI.

### 5.5 Fitur Belajar & Utilitas

- **Tanya dari modul/PDF sendiri:** pencarian hibrida (FTS + vektor) dengan kutipan halaman.
- **Speech-to-text:** awal 10 menit/rekaman, 3 rekaman/hari untuk tamu; audio dan transkrip tamu dihapus setelah selesai.
- **Ringkas jurnal:** format tetap (tujuan, metode, hasil, keterbatasan); "tidak disebutkan" bila informasi tidak ada.
- **Kuis dan flashcard:** dari modul atau slide; dapat diunduh sebagai docx/xlsx.
- **Baca foto:** hasil bacaan (tulisan tangan, angka tabel) ditampilkan untuk diperiksa sebelum dipakai.
- **Tugas berantai:** hasil langkah pertama ditampilkan untuk dicek pengguna.

### 5.6 Dashboard Admin

| Halaman | Isi |
|---|---|
| **Ringkasan** | Jumlah pengguna, menunggu persetujuan, pemakaian per fitur dan model, perkiraan biaya, saklar status sistem (buka/tutup pendaftaran, mode perawatan), error terbaru |
| **Pengguna** | Setujui/tolak, nonaktifkan/hapus, ubah peran, picu reset password, kuota khusus |
| **Fitur dan model** | Saklar fitur, daftar model dan harga, aturan routing/cadangan |
| **Kuota** | Batas harian/bulanan untuk tamu dan akun |
| **Pengaman biaya** | Plafon bulanan, tombol darurat |
| **Log** | Riwayat login, tindakan admin, error |

> [!NOTE]
> Admin secara bawaan **tidak** melihat isi chat pengguna.

---

## 6. API (Garis Besar)

Prefiks `/api/v1`, JSON, validasi Zod, kesalahan seragam `{ error: { code, message } }`.

| Grup | Endpoint Utama |
|---|---|
| **Auth** | `POST /auth/register`, `/auth/verify-email`, `/auth/login`, `/auth/logout`, `/auth/password/forgot`, `/auth/password/reset`, `POST /auth/admin/otp` |
| **Tamu** | `POST /guest/session` (verifikasi CAPTCHA) |
| **Chat** | `POST /chat` (SSE), `GET /conversations`, `GET /conversations/:id`, `DELETE /conversations/:id` |
| **File** | `POST /files` (unggah), `GET /files/:id/download` (URL bertanda tangan) |
| **Job** | `POST /jobs` (convert/compress/ocr/stt/generate), `GET /jobs/:id`, `GET /jobs/:id/events` (SSE) |
| **Belajar** | `POST /study-sets`, `GET /study-sets/:id`, `GET /study-sets` |
| **Admin** | `/admin/users`, `/admin/features`, `/admin/models`, `/admin/routing`, `/admin/quotas`, `/admin/cost`, `/admin/logs`, `/admin/stats` |

Setiap endpoint melewati middleware berurutan:
```
sesi/tamu → peran → mode perawatan → saklar fitur → kuota → rate limit
```

---

## 7. Persyaratan Non-Fungsional

### Keamanan

- Password `argon2id`; sesi cookie `HttpOnly`, `Secure`, `SameSite=Lax`; proteksi CSRF untuk metode mengubah data.
- OTP acak (CSPRNG), tersimpan sebagai hash, berlaku 10 menit, sekali pakai, batas percobaan dan batas kirim ulang.
- API key hanya di server (env/secret manager), HTTPS wajib, header keamanan (CSP, HSTS) lewat Caddy dan `@fastify/helmet`.
- `file-service` (LibreOffice, Ghostscript, Tesseract) berjalan di container terisolasi: hanya dapat dijangkau dari jaringan internal, akses internet dimatikan kecuali ke penyimpanan file, pengguna non-root, filesystem baca-saja kecuali folder kerja.
- **Perlindungan prompt-injection:** dokumen dan hasil web ditempatkan dalam blok data yang jelas, keluaran model tidak pernah mengeksekusi aksi tanpa validasi.

### Privasi

- Halaman kebijakan privasi dan syarat penggunaan wajib sebelum dibuka untuk umum.
- Pemberitahuan di chat dan STT: jangan kirim data pribadi/sensitif, karena tier gratis Gemini dapat dipakai Google untuk melatih modelnya. Dokumen berisi data pribadi tidak boleh lewat jalur gratis.
- Penghapusan akun menghapus data terkait.

### Kinerja dan Keandalan

- Respons chat mulai mengalir (token pertama) ≤ 3 detik pada kondisi normal.
- Job file ≤ 20 MB selesai ≤ 60 detik untuk konversi umum; progres terlihat.
- Job idempoten dan dapat diulang; untuk 1–3 pengguna satu worker sudah cukup.
- Health check `/healthz`, restart otomatis, cadangan database harian.
- **Pencegahan error di `file-service`:** LibreOffice dijalankan satu per satu (konkurensi 1) dengan profil sementara terpisah per proses; setiap proses punya timeout dan dimatikan paksa bila macet; container diberi batas memori dan CPU; file divalidasi (jenis, ukuran, tidak rusak) sebelum diproses; gagal sekali diulang otomatis, gagal lagi tampil error jelas dengan tombol "coba lagi".
- **Pencegahan error di AI:** timeout, ulang sekali, model cadangan, keluaran JSON divalidasi Zod, dan model yang gagal terus-menerus dinonaktifkan sementara secara otomatis (tampil di dashboard).
- **Pengamatan:** log JSON dengan correlation id yang sama di Node dan Python, daftar error terbaru di dashboard, dan satu file uji untuk tiap jenis konversi yang dijalankan di CI.

### Aksesibilitas dan UX

- Responsif (mobile-first), mode terang/gelap, bahasa Indonesia sebagai default, pesan kuota habis yang jelas.

---

## 8. Urutan Pembuatan dan Kriteria Selesai

| Tahap | Cakupan | Selesai Jika |
|---|---|---|
| **1. Fondasi** | Monorepo, Docker Compose, Postgres + Drizzle, chat streaming, router (Gemini & Claude), pilihan model, riwayat, label model, penanganan error, log, `user_id` di semua data | Chat dua model berjalan, error ditangani, label tampil, migrasi bisa diulang dari nol |
| **2. Akun dan admin dasar** | Daftar/verifikasi/login/reset, OTP email, persetujuan admin, peran, kuota, dashboard dasar, pengaman biaya, CAPTCHA | Tamu dan akun dibatasi di server; tombol darurat mematikan fitur berbayar; web belum dibuka ke umum sebelum tahap ini lulus |
| **3. Mode bersumber & baca foto** | Google Search grounding, Tavily, tanya dari PDF/modul sendiri (FTS + vektor), baca foto | Jawaban menyertakan sumber dan halaman; ekstraksi teks foto berfungsi |
| **4. Konverter dan kompres** | `file-service` Python (FastAPI + arq), LibreOffice, Ghostscript, ocrmypdf, Pillow, pdf2docx | Semua konversi di bagian 5.4 lulus uji dengan file contoh |
| **5. Speech-to-text** | Groq Whisper, batas durasi, penghapusan otomatis | Rekaman 10 menit terproses, audio tamu terhapus |
| **6. Fitur belajar** | Generate gambar, ringkas jurnal, kuis, flashcard, ekspor docx/xlsx | Ekspor docx/xlsx kuis/flashcard berfungsi |

> [!TIP]
> Setiap tahap diakhiri tes (Vitest + Playwright untuk alur utama), tag rilis, dan pembaruan dokumen ini.

---

## 9. Metrik Keberhasilan

- Biaya API bulanan tidak pernah melewati plafon (0 insiden).
- ≥ 95% job konversi sukses pada file uji standar.
- Waktu persetujuan akun oleh admin dapat dilacak dari dashboard.
- Tidak ada kebocoran data antar pengguna pada uji otorisasi (uji otomatis per endpoint).
- Tingkat error model di bawah 5% setelah pindah ke cadangan.

---

## 10. Keputusan

1. **Hosting dan email:** hanya yang gratis. Detail dan batasannya ada di bagian 2.2.

2. **Meminimalkan error:** `file-service` cukup satu container, tetapi setiap proses berat dibatasi ketat (konkurensi, timeout, memori) dan semua kegagalan dicatat. Daftar langkahnya ada di bagian 7 (Kinerja dan keandalan).

3. **Jumlah pengguna awal:** 1–3 orang. Kuota bawaan dibuat kecil, plafon biaya bulanan tetap dipasang sejak Tahap 2, dan satu worker file sudah cukup.

4. **Keamanan data antar pengguna:** Postgres Row-Level Security (RLS) dipakai sejak awal, bukan hanya filter di kode. RLS diaktifkan pada semua tabel yang punya `user_id` (`conversations`, `messages`, `files`, `jobs`, `study_sets`). API memakai role database terbatas dan menyetel `app.user_id` per transaksi (`SET LOCAL`); aksi admin memakai role terpisah yang tidak bisa membaca isi `messages`. **Alasannya:** filter `WHERE user_id` yang terlewat tidak lagi menyebabkan kebocoran data, dan RLS jauh lebih sulit ditambahkan belakangan. **Konsekuensinya:** setiap request berjalan di dalam transaksi, dan ada tes otomatis bahwa pengguna A tidak bisa membaca data pengguna B.
