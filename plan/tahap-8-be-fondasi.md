# Tahap 8 – Backend: Fondasi (Fastify, PostgreSQL, Docker Compose)

**Jenis:** Backend
**Prioritas:** Kedelapan – fondasi semua backend berikutnya
**Referensi PRD:** §2 Tech Stack, §2.1 Struktur Repo, §2.2 Hosting, §4 Desain Database, §10 Keputusan (RLS)

---

## Tujuan

Menyiapkan seluruh infrastruktur backend: Fastify API, PostgreSQL + Drizzle ORM, Redis, Docker Compose, konfigurasi environment, dan semua tabel database. Setelah tahap ini selesai, semua tahap backend berikutnya tinggal menulis route/handler.

---

## Checklist Tugas

### 8.1 Setup `apps/api` (Fastify)

- [ ] Init project TypeScript dengan `tsconfig.json` strict
- [ ] Install Fastify + plugin wajib:
  - `fastify`
  - `@fastify/cookie`
  - `@fastify/cors`
  - `@fastify/helmet`
  - `@fastify/rate-limit`
  - `fastify-type-provider-zod`
  - `@fastify/sensible`
- [ ] Install utilitas:
  - `zod`
  - `pino` (logging, sudah bundled di Fastify)
  - `dotenv` / `@t3-oss/env-core`
- [ ] Buat struktur folder:
  ```
  apps/api/src/
    plugins/      ← plugin Fastify (db, redis, auth, dll.)
    routes/       ← semua route handler
    middleware/   ← middleware (session, role, quota)
    lib/          ← utilitas internal
    types/        ← tipe TypeScript API
    index.ts      ← entry point
  ```
- [ ] Konfigurasi environment: `src/config/env.ts` dengan validasi Zod
- [ ] `GET /healthz` — health check endpoint
- [ ] Error handler global: format `{ error: { code, message } }`
- [ ] Correlation ID: generate `x-request-id` per request, attach ke semua log

### 8.2 Setup `packages/db` (Drizzle ORM)

- [ ] Init package dengan TypeScript
- [ ] Install:
  - `drizzle-orm`
  - `drizzle-kit`
  - `postgres` (driver)
  - `pg` + `@types/pg`
- [ ] Buat `src/schema/` — semua tabel Drizzle
- [ ] Buat `src/migrations/` — hasil generate drizzle-kit
- [ ] Buat `src/seed/` — data awal (model AI, routing rules, kuota default, fitur default)
- [ ] Buat `drizzle.config.ts`
- [ ] Script: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:seed`, `pnpm db:studio`

### 8.3 Skema Database Lengkap (Drizzle)

Buat semua tabel sesuai PRD §4:

**4.1 Akun dan Keamanan:**
- [ ] `users` — id, email (citext), password_hash, role, status, email_verified_at, approved_by, approved_at, rejected_reason, quota_override_id, created_at, deleted_at
- [ ] `sessions` — id, user_id, token_hash, ip, user_agent, created_at, expires_at, revoked_at
- [ ] `otp_codes` — id, user_id, purpose, code_hash, attempts, max_attempts, expires_at, consumed_at, created_at
- [ ] `login_attempts` — id, email_hash, ip, success, created_at
- [ ] `guest_identities` — id, device_hash, ip_hash, captcha_verified_at, first_seen_at, last_seen_at

**4.2 Konfigurasi:**
- [ ] `system_settings` — key (PK), value (jsonb), updated_by, updated_at
- [ ] `features` — key (PK), name, enabled, guest_allowed, requires_paid_ai
- [ ] `quota_rules` — id, feature_key, subject, period, metric, limit_value
- [ ] `quota_overrides` — id, user_id, feature_key, metric, period, limit_value
- [ ] `ai_models` — id, provider, model_id, display_name, tier, guest_allowed, enabled, price_in_per_mtok, price_out_per_mtok, max_output_tokens
- [ ] `routing_rules` — id, task_type, preset, model_id, priority

**4.3 Chat dan File:**
- [ ] `conversations` — id, user_id, title, mode, preset, created_at, deleted_at
- [ ] `messages` — id, conversation_id, role, parts (jsonb), model_id, task_type, tokens_in, tokens_out, cost_usd, error_code, created_at
- [ ] `files` — id, user_id (nullable), storage_key, original_name, mime, size_bytes, sha256, kind, expires_at, deleted_at
- [ ] `jobs` — id, user_id, guest_id, type, status, progress, input (jsonb), output_file_id, error, attempts, created_at, finished_at

**4.4 Modul dan Belajar:**
- [ ] `source_chunks` — id, file_id, user_id, page, text, tsv (tsvector), embedding (vector)
- [ ] `study_sets` — id, user_id, type, title, source_file_id, created_at
- [ ] `study_items` — id, study_set_id, position, payload (jsonb)

**4.5 Pemakaian dan Audit:**
- [ ] `usage_events` — id, user_id, guest_id, feature_key, model_id, task_type, input_tokens, output_tokens, audio_seconds, bytes, duration_ms, cost_usd, status, error_code, created_at
- [ ] `usage_daily` — date, subject_key, feature_key, count, tokens, cost_usd
- [ ] `audit_logs` — id, actor_id, action, target_type, target_id, metadata (jsonb), ip, created_at
- [ ] `app_errors` — id, source, message, stack_hash, context (jsonb), created_at

### 8.4 Indeks Database

- [ ] `CREATE INDEX ON users(email)`
- [ ] `CREATE INDEX ON sessions(token_hash)`
- [ ] `CREATE INDEX ON messages(conversation_id, created_at)`
- [ ] `CREATE INDEX ON usage_events(user_id, created_at)`
- [ ] `CREATE INDEX ON usage_daily(subject_key, date)`
- [ ] `CREATE INDEX ON jobs(status, created_at)`
- [ ] `CREATE INDEX ON source_chunks USING GIN(tsv)` — Full-Text Search
- [ ] `CREATE INDEX ON source_chunks USING HNSW(embedding)` — pgvector

### 8.5 Row-Level Security (RLS)

- [ ] Aktifkan RLS di semua tabel yang punya `user_id`:
  - `conversations`, `messages`, `files`, `jobs`
  - `source_chunks`, `study_sets`, `study_items`
- [ ] Buat Postgres role: `app_user` (terbatas) dan `app_admin` (tidak bisa baca messages)
- [ ] Policy RLS: `USING (user_id = current_setting('app.user_id')::uuid)`
- [ ] API menyetel `SET LOCAL app.user_id = '...'` di awal setiap transaksi
- [ ] Buat tes otomatis: pengguna A tidak bisa membaca data pengguna B

### 8.6 Setup Redis

- [ ] Tambahkan Redis ke Docker Compose
- [ ] Install `ioredis` di `apps/api`
- [ ] Buat Fastify plugin `src/plugins/redis.ts`
- [ ] Gunakan untuk: rate limiting, cache kuota harian, session blacklist

### 8.7 Docker Compose

- [ ] Buat `infra/docker-compose.yml` dengan services:
  - `postgres` — PostgreSQL 16, volume persisten, health check
  - `redis` — Redis 7, volume persisten, health check
  - `api` — Fastify API (Node.js)
  - `web` — Next.js
  - `caddy` — reverse proxy + HTTPS
- [ ] Buat `infra/docker-compose.dev.yml` — override untuk development (port expose, hot reload)
- [ ] Buat `infra/Dockerfile.api` — multi-stage build (builder → runner), user non-root
- [ ] Buat `infra/Dockerfile.web` — multi-stage build Next.js
- [ ] Buat `infra/Caddyfile` — config Caddy untuk HTTPS otomatis

### 8.8 Environment Variables

- [ ] Buat `.env.example` di root dengan semua variable yang dibutuhkan:
  ```
  DATABASE_URL=
  REDIS_URL=
  SESSION_SECRET=
  INTERNAL_SECRET=   ← untuk komunikasi Node ↔ file-service
  NEXT_PUBLIC_API_URL=
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=
  GEMINI_API_KEY=
  ANTHROPIC_API_KEY=
  GROQ_API_KEY=
  OPENAI_API_KEY=
  OPENROUTER_API_KEY=
  SMTP_HOST=smtp.gmail.com
  SMTP_USER=
  SMTP_PASS=
  R2_ENDPOINT=
  R2_ACCESS_KEY_ID=
  R2_SECRET_ACCESS_KEY=
  R2_BUCKET=
  ```
- [ ] Validasi env di startup: throw jika variable wajib tidak ada

### 8.9 Penyimpanan File (MinIO/R2)

- [ ] Install `@aws-sdk/client-s3` di `apps/api`
- [ ] Buat `src/lib/storage.ts`:
  - `uploadFile(key, buffer, mime)` → URL
  - `getSignedUrl(key, expiresIn)` → URL bertanda tangan
  - `deleteFile(key)`
- [ ] Docker Compose: tambahkan `minio` service untuk development
- [ ] Buat bucket default saat startup jika belum ada

### 8.10 Seed Data

- [ ] Seed `ai_models`:
  - Gemini 2.0 Flash (free, guest allowed)
  - Claude Sonnet 5.5 (paid, no guest)
  - Claude Haiku 5.5 (paid, no guest)
  - Groq LLaMA (free, guest allowed)
- [ ] Seed `routing_rules` sesuai tabel di PRD §5.2
- [ ] Seed `features` semua fitur dari PRD
- [ ] Seed `quota_rules` default (tamu dan akun)
- [ ] Seed `system_settings` default (plafon $10/bulan, pendaftaran buka)

### 8.11 Cron Job Harian

- [ ] Setup cron di Node (node-cron atau Fastify lifecycle):
  - Hapus file kedaluwarsa (`files.expires_at < now`)
  - Hapus OTP lama (> 24 jam)
  - Hapus sesi kedaluwarsa
  - Hapus job selesai > 30 hari
  - Agregasi `usage_daily` dari `usage_events` semalam

---

## Kriteria Selesai

- [ ] `docker-compose up` menjalankan semua service tanpa error
- [ ] `GET /healthz` mengembalikan `{ status: "ok" }`
- [ ] `pnpm db:migrate` berhasil membuat semua tabel
- [ ] `pnpm db:seed` mengisi data awal
- [ ] RLS aktif: pengguna A tidak bisa query data pengguna B (ada tes otomatis)
- [ ] MinIO/R2: `uploadFile` dan `getSignedUrl` berfungsi
- [ ] Log JSON dengan correlation ID muncul di setiap request

---

## Catatan Teknis

- UUID v7 digunakan sebagai primary key — install `uuidv7` package
- `email` kolom menggunakan tipe `citext` (case-insensitive)
- `pgvector` extension harus diaktifkan sebelum membuat kolom `vector`
- Semua transaksi menyetel `SET LOCAL app.user_id` untuk RLS
- `api_key` provider AI tidak pernah dikirim ke frontend atau masuk log

