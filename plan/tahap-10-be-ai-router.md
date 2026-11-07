# Tahap 10 – Backend: Router AI & Streaming Chat

**Jenis:** Backend
**Prioritas:** Kesepuluh
**Referensi PRD:** §5.2 Router AI, §5.3 Pengaman Biaya, §6 API (Chat), `packages/ai`

---

## Tujuan

Mengimplementasikan router AI yang menangani streaming chat, pemilihan model, pengaman biaya, pencatatan pemakaian, dan fallback ke model cadangan. Setelah tahap ini selesai, frontend Tahap 4 bisa dihubungkan ke streaming nyata.

---

## Checklist Tugas

### 10.1 Setup `packages/ai`

- [ ] Init package TypeScript
- [ ] Install Vercel AI SDK: `ai`
- [ ] Install adapter provider:
  - `@ai-sdk/google` (Gemini)
  - `@ai-sdk/anthropic` (Claude)
  - `@ai-sdk/groq` (Groq)
  - `@ai-sdk/openai` (OpenAI)
  - `@openrouter/ai-sdk-provider` (OpenRouter)
- [ ] Buat struktur:
  ```
  packages/ai/src/
    providers/    ← adapter tiap provider
    router.ts     ← logika pemilihan model
    cost.ts       ← penghitung biaya
    types.ts      ← tipe bersama
    index.ts
  ```

### 10.2 Adapter Provider

Buat `src/providers/`:

- [ ] `gemini.ts` — `createGeminiProvider(apiKey)` → model instances
- [ ] `anthropic.ts` — `createAnthropicProvider(apiKey)` → model instances
- [ ] `groq.ts` — `createGroqProvider(apiKey)` → model instances
- [ ] `openai.ts` — `createOpenAIProvider(apiKey)` → model instances
- [ ] `openrouter.ts` — `createOpenRouterProvider(apiKey)` → model instances

Tiap provider:
- Menerima API key dari environment (tidak hardcode)
- Mengembalikan fungsi `streamText(params)` yang kompatibel dengan Vercel AI SDK

### 10.3 Router AI (`src/router.ts`)

- [ ] Buat `selectModel(task_type, mode, preset, manualModelId, userId)`:
  1. Jika `mode === 'manual'`: pakai `manualModelId` (cek enabled di DB)
  2. Jika `mode === 'preset'`: cari `routing_rules` by preset
  3. Jika `mode === 'auto'`: cari `routing_rules` by task_type, priority = 0
  4. Ambil model cadangan (priority > 0, urut asc)
  5. Jika user adalah tamu: filter hanya `guest_allowed = true`
  6. Jika user bukan tamu: semua model boleh
- [ ] Buat `callWithFallback(modelList, fn)`:
  - Panggil model utama (priority 0)
  - Jika gagal (timeout/error): tunggu 500ms → panggil cadangan
  - Jika semua gagal: throw error yang jelas
- [ ] Timeout per panggilan: 30 detik (bisa diatur di env)

### 10.4 Penghitung Biaya (`src/cost.ts`)

- [ ] `calculateCost(modelId, tokensIn, tokensOut)`:
  - Ambil harga dari DB `ai_models`
  - Return: `{ cost_usd: number }`
- [ ] Cache harga di Redis (refresh setiap 5 menit)

### 10.5 System Prompt

- [ ] Buat `src/systemPrompt.ts` — satu system prompt untuk semua model:
  ```
  Kamu adalah Asisten Kuliah, membantu mahasiswa Indonesia.
  Jawab dalam bahasa Indonesia kecuali diminta sebaliknya.
  Jangan melakukan tindakan apapun tanpa validasi.
  ```
- [ ] System prompt bisa dioverride per task_type lewat DB

### 10.6 `POST /api/v1/chat` (SSE Streaming)

- [ ] Validasi: message, conversation_id (opsional), mode, preset, model_id, task_type
- [ ] Alur:
  1. Cek sesi (user atau tamu)
  2. Cek fitur `chat` enabled
  3. Cek kuota (quota_rules → usage_daily)
  4. **Cek pengaman biaya** (plafon bulanan → usage_daily)
  5. Jika model berbayar dan user adalah tamu: **reject**
  6. Pilih model via router
  7. Ambil riwayat pesan dari `messages` (jika ada conversation_id)
  8. Kirim ke AI dengan system prompt
  9. Stream SSE ke klien
  10. Setelah selesai: catat `messages`, `usage_events`, `usage_daily`
- [ ] Format SSE:
  ```
  data: {"type":"delta","content":"..."}
  data: {"type":"done","model":"gemini-2.0-flash","tokens_in":100,"tokens_out":200}
  data: {"type":"error","code":"QUOTA_EXCEEDED","message":"..."}
  ```

### 10.7 Riwayat Percakapan

- [ ] `GET /api/v1/conversations` — daftar percakapan user (dengan pagination)
- [ ] `GET /api/v1/conversations/:id` — percakapan + semua pesan
- [ ] `DELETE /api/v1/conversations/:id` — soft delete
- [ ] `PATCH /api/v1/conversations/:id` — ubah judul
- [ ] RLS aktif: user hanya bisa akses percakapan sendiri

### 10.8 Pengaman Biaya (Implementasi)

- [ ] Buat `src/lib/costGuard.ts`:
  - `checkMonthlyBudget()` — baca dari `usage_daily` (atau Redis cache)
  - Jika > 100% plafon: throw `BUDGET_EXCEEDED`
  - Jika > 80% plafon: log peringatan + (opsional) kirim email admin
- [ ] `checkEmergencyStop()` — cek `system_settings.emergency_stop = true`
  - Jika true: reject semua request ke model berbayar
- [ ] Update Redis setiap kali ada `usage_events` baru

### 10.9 Pencatatan Pemakaian

- [ ] Buat `src/lib/usageRecorder.ts`:
  - `recordUsage(params)`:
    - Insert `usage_events`
    - Upsert `usage_daily` (increment count, tokens, cost)
    - Update Redis cache kuota
  - Dipanggil setelah setiap panggilan AI selesai
- [ ] Tangani kegagalan pencatatan: log error, jangan gagalkan response ke user

### 10.10 Anti Prompt-Injection

- [ ] Dokumen dan hasil pencarian selalu dimasukkan dalam blok data:
  ```
  <document>
  [isi dokumen]
  </document>
  ```
- [ ] Instruksi tidak pernah berasal dari konten dokumen
- [ ] Keluaran JSON divalidasi Zod; minta ulang sekali jika tidak valid

### 10.11 Label Model

- [ ] Setiap respons AI menyertakan metadata model yang menjawab
- [ ] Format SSE `done` event menyertakan `model_display_name`
- [ ] Frontend menampilkan "Dijawab oleh: Gemini Flash"

### 10.12 Admin: Model & Routing

- [ ] `GET/PATCH /api/v1/admin/features` — toggle fitur
- [ ] `GET/POST/PATCH/DELETE /api/v1/admin/models` — CRUD model AI
- [ ] `GET/POST/PATCH/DELETE /api/v1/admin/routing` — CRUD routing rules
- [ ] `GET /api/v1/admin/stats` — statistik pemakaian
- [ ] `PATCH /api/v1/admin/cost/emergency-stop` — toggle tombol darurat
- [ ] `GET/PATCH /api/v1/admin/cost/budget` — baca/ubah plafon bulanan

### 10.13 Integrasi Frontend (Tahap 4)

- [ ] Ganti `sendMockMessage()` di `useChatStore` dengan SSE dari `/api/v1/chat`
- [ ] Gunakan `EventSource` atau `fetch` dengan `ReadableStream` untuk SSE
- [ ] Handle semua event type: `delta`, `done`, `error`
- [ ] Hubungkan model selector dengan data model nyata dari API

---

## Kriteria Selesai

- [ ] Chat streaming berjalan end-to-end (browser → Fastify → Gemini → SSE → browser)
- [ ] Label model tampil di setiap respons
- [ ] Model fallback berjalan: matikan Gemini di DB → otomatis pakai Groq
- [ ] Kuota exceeded: pesan error "Kuota harian habis" muncul di UI
- [ ] Emergency stop: matikan → semua chat berbayar ditolak
- [ ] `usage_events` tercatat setelah setiap chat
- [ ] Riwayat percakapan tersimpan dan bisa dibuka kembali
- [ ] Vitest: unit test router (pemilihan model, fallback, cost)

---

## Catatan Teknis

- Riwayat chat dikirim ulang ke AI setiap request (stateless AI) — batasi jumlah pesan yang dikirim
- Jangan kirim `api_key` ke frontend dalam bentuk apapun
- SSE harus tetap menutup koneksi dengan bersih jika klien disconnect (`request.raw.on('close')`)
- Model yang gagal terus-menerus (5x dalam 10 menit): nonaktifkan sementara secara otomatis, tampilkan di dashboard
- `packages/ai` adalah pure TypeScript, tidak ada dependensi ke `apps/api` atau DB

