# Tahap 12 – Backend: STT, Kuis, Flashcard, Ringkas Jurnal & pgvector

**Jenis:** Backend (Node.js API + Python file-service)
**Prioritas:** Keduabelas – tahap terakhir
**Referensi PRD:** §5.5 Fitur Belajar & Utilitas (STT, kuis, flashcard, ringkas jurnal), §4.4 source_chunks, §6 API (Belajar)

---

## Tujuan

Mengimplementasikan speech-to-text dengan Groq Whisper, kuis & flashcard, ringkas jurnal, pencarian hibrida (FTS + pgvector), dan ekspor hasil belajar. Ini adalah tahap terakhir yang menghubungkan semua fitur belajar ke backend nyata.

---

## Checklist Tugas

### 12.1 Speech-to-Text — Groq Whisper (Node.js)

- [ ] Buat `apps/api/src/routes/stt.ts`
- [ ] `POST /api/v1/jobs` dengan `type: 'stt'`:
  - Validasi: file audio (MP3/WAV/M4A/MP4), ukuran ≤ 25 MB, durasi ≤ 10 menit
  - Validasi durasi audio: reject jika > 10 menit sebelum proses
  - Cek kuota tamu: max 3 rekaman/hari
  - Upload audio ke storage (sementara)
  - Panggil Groq Whisper API langsung dari Node:
    ```typescript
    const transcript = await groq.audio.transcriptions.create({
      file: audioBuffer,
      model: "whisper-large-v3",
      language: "id",
    });
    ```
  - Simpan hasil transkripsi ke job output
  - **Hapus audio** dari storage setelah transkripsi selesai
  - Jika user adalah tamu: **hapus transkripsi** juga setelah diunduh
  - Catat `usage_events` (audio_seconds)
- [ ] `GET /api/v1/jobs/:id` — status STT + teks hasil

### 12.2 Validasi Durasi Audio (Python)

- [ ] Buat `services/file-service/converters/audio.py`:
  - `get_audio_duration(path)` → detik (via ffmpeg probe)
  - `validate_audio(path)` → format, durasi, ukuran
- [ ] Jika > 10 menit: reject dengan pesan jelas
- [ ] Konversi format audio ke MP3 jika perlu (untuk kompatibilitas Groq)

### 12.3 Fallback STT Panjang (faster-whisper)

- [ ] Jika audio > 25 MB atau Groq tidak tersedia:
  - Kirim ke file-service Python
  - Gunakan `faster-whisper` lokal:
    ```python
    from faster_whisper import WhisperModel
    model = WhisperModel("medium", device="cpu")
    segments, info = model.transcribe(audio_path, language="id")
    ```
  - Return: teks gabungan semua segment
- [ ] Install `faster-whisper` di Dockerfile (opsional, download model saat startup)

### 12.4 Source Chunks & Embedding (pgvector)

- [ ] Buat worker Python `workers/tasks/index_pdf.py`:
  - Download PDF modul dari storage
  - Ekstrak teks per halaman (PyMuPDF)
  - Chunk teks: max 500 kata per chunk, overlap 50 kata
  - Untuk setiap chunk: insert ke `source_chunks`:
    - `text` = teks chunk
    - `tsv` = `to_tsvector('indonesian', text)` untuk FTS
    - `embedding` = NULL (diisi Node)
- [ ] Buat Node.js function `embedChunks(fileId)`:
  - Ambil semua chunks tanpa embedding
  - Panggil embedding API (Gemini text-embedding atau OpenAI)
  - Update `source_chunks.embedding`
  - Gunakan batch (max 100 chunks per request)

### 12.5 Pencarian Hibrida (Node.js)

- [ ] Buat `apps/api/src/lib/search.ts`:
  - `hybridSearch(query, fileIds, limit)`:
    1. **FTS:** `SELECT * FROM source_chunks WHERE tsv @@ plainto_tsquery('indonesian', $1) AND file_id = ANY($2)`
    2. **Vektor:** `SELECT * FROM source_chunks ORDER BY embedding <=> $embedding LIMIT $limit`
    3. Gabungkan hasil dengan re-ranking sederhana (RRF — Reciprocal Rank Fusion)
    4. Return: top N chunks dengan `file_id`, `page`, `text`

### 12.6 API Tanya dari Modul/PDF

- [ ] `POST /api/v1/chat` dengan `task_type: 'ask_document'`:
  - Tambahkan logika: jika ada `file_ids` → jalankan hybrid search dulu
  - Ambil top 5 chunks yang relevan
  - Masukkan chunks ke context AI sebagai blok data:
    ```
    <document source="modul.pdf" page="23">
    [teks chunk]
    </document>
    ```
  - AI menjawab berdasarkan dokumen
  - Respons menyertakan metadata: "Sumber: [nama file], halaman 23"
  - Jika tidak ada informasi relevan di dokumen: AI menyatakan demikian (tidak mengarang)

### 12.7 Kuis & Flashcard — Generate (Node.js)

- [ ] `POST /api/v1/study-sets`:
  - Validasi: type (quiz/flashcard), source_file_id atau input_text, count
  - Buat job generate
  - Panggil AI dengan prompt:
    ```
    Dari materi berikut, buat {count} soal pilihan ganda dengan 4 pilihan dan penjelasan singkat.
    Format JSON: { "items": [{ "question": "", "options": ["A","B","C","D"], "answer": "A", "explanation": "" }] }
    ```
  - Validasi JSON output dengan Zod
  - Minta ulang sekali jika JSON rusak
  - Insert `study_set` + `study_items`
  - Return: `{ study_set_id }`
- [ ] `GET /api/v1/study-sets/:id` — data kuis/flashcard lengkap
- [ ] `GET /api/v1/study-sets` — daftar study set user

### 12.8 Ekspor Kuis & Flashcard (Python + Node)

- [ ] `POST /api/v1/study-sets/:id/export`:
  - Params: `format` (docx/xlsx)
  - Create job → file-service
- [ ] `workers/tasks/export_study.py`:
  - Ambil data dari Node API (via HTTP internal)
  - Jika format XLSX: `generators/xlsx.py` → kuis/flashcard
  - Jika format DOCX: format soal ujian sederhana
  - Upload hasil, lapor ke Node

### 12.9 Ringkas Jurnal (Node.js)

- [ ] `POST /api/v1/jobs` dengan `type: 'journal_summary'`:
  - Input: file_id PDF atau URL jurnal
  - Jika URL: ekstrak teks (lewat Gemini grounding atau scrape sederhana)
  - Jika PDF: ekstrak teks per halaman (via file-service)
  - Panggil AI dengan prompt format tetap:
    ```
    Ringkas jurnal berikut dalam format:
    - Tujuan/Pertanyaan Penelitian
    - Metode
    - Hasil
    - Keterbatasan
    Jika salah satu bagian tidak disebutkan, tulis "Tidak disebutkan dalam jurnal."
    ```
  - Return: JSON terstruktur 4 seksi
  - Insert ke `study_sets` dengan type `journal_summary`

### 12.10 Pencarian Web & Grounding

- [ ] `POST /api/v1/chat` dengan `task_type: 'sourced_material'`:
  - Mode web: gunakan Gemini dengan Google Search grounding aktif
  - Mode Tavily: panggil Tavily Search API → ambil konten → masukkan ke context
  - Respons menyertakan daftar sumber (judul, URL)

### 12.11 Admin: Statistik Lanjutan

- [ ] `GET /api/v1/admin/stats`:
  - Pemakaian per fitur (7/30 hari)
  - Pemakaian per model
  - Biaya harian
  - Jumlah job per status
  - Error rate per model
- [ ] `GET /api/v1/admin/logs/errors` — daftar `app_errors` terbaru
- [ ] `GET /api/v1/admin/logs/audit` — `audit_logs` dengan filter
- [ ] `GET /api/v1/admin/logs/logins` — `login_attempts` sukses dan gagal

### 12.12 Generate Gambar (Opsional)

- [ ] `POST /api/v1/chat` dengan `task_type: 'generate_image'`:
  - Default: Gemini Imagen
  - Tombol "Kualitas Lebih Tinggi": OpenAI DALL-E (cek kuota harian khusus)
  - Return: URL gambar yang digenerate
  - Simpan ke `files` dengan `expires_at`

### 12.13 Pembersihan Otomatis (Cron)

- [ ] Update cron harian (dari Tahap 8):
  - Hapus file audio tamu yang sudah selesai di-STT
  - Hapus transkripsi tamu (jika sudah diunduh atau > 1 jam)
  - Hapus embedding lama yang tidak dipakai

### 12.14 Integrasi Frontend (Tahap 5 & 6)

- [ ] Hubungkan STT ke API nyata (upload audio → job → hasil transkripsi)
- [ ] Hubungkan kuis/flashcard ke API nyata
- [ ] Hubungkan ringkas jurnal ke API nyata
- [ ] Hubungkan tanya PDF modul ke hybrid search nyata
- [ ] Hubungkan materi bersumber ke Gemini grounding / Tavily

---

## Kriteria Selesai

- [ ] STT: rekaman 10 menit terproses via Groq, transkripsi tampil di UI
- [ ] Tamu STT: audio dan transkripsi dihapus setelah selesai (cek di storage)
- [ ] Tanya PDF: jawaban menyertakan kutipan "Sumber: X, halaman Y" dari hybrid search
- [ ] Kuis: 10 soal pilihan ganda digenerate dari PDF modul, bisa dimainkan di UI
- [ ] Flashcard: 10 kartu digenerate, flip animation berjalan
- [ ] Ekspor kuis sebagai XLSX: format benar (soal | A | B | C | D | jawaban)
- [ ] Ringkas jurnal: 4 seksi tampil, seksi yang tidak ada bertuliskan "Tidak disebutkan"
- [ ] pytest: test STT mock, test hybrid search, test generate kuis

---

## Catatan Teknis

- Groq Whisper support bahasa Indonesia — set `language: "id"` agar lebih akurat
- Jika Groq Whisper gagal (rate limit/error): fallback ke `faster-whisper` lokal
- Hybrid search: RRF formula = `1 / (k + rank)` dengan `k=60`, gabungkan score FTS dan vektor
- Embedding model: gunakan yang gratis dulu (Gemini text-embedding-004) agar tidak ada biaya tambahan
- Audio tamu tidak pernah disimpan setelah proses selesai

---

## Selesai! 🎉

Setelah Tahap 12 selesai, semua fitur PRD v1.2 sudah terimplementasi:

| Tahap PRD | Tahap Plan |
|---|---|
| Fondasi (chat + router) | Tahap 1–4 (FE) + Tahap 8, 10 (BE) |
| Akun dan admin | Tahap 2–3, 7 (FE) + Tahap 9 (BE) |
| Mode bersumber & baca foto | Tahap 5 (FE) + Tahap 12 (BE) |
| Konverter & kompres | Tahap 6 (FE) + Tahap 11 (BE) |
| Speech-to-text | Tahap 6 (FE) + Tahap 12 (BE) |
| Fitur belajar | Tahap 6 (FE) + Tahap 12 (BE) |

