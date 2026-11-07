# Tahap 9 – Backend: Auth API (Register, Login, OTP, Kuota, CAPTCHA)

**Jenis:** Backend
**Prioritas:** Kesembilan
**Referensi PRD:** §5.1 Akun dan Akses, §5.3 Pengaman Biaya, §6 API (Auth & Tamu), §7 Keamanan

---

## Tujuan

Mengimplementasikan semua endpoint autentikasi: register, verifikasi email, login, logout, reset password, OTP admin, sesi tamu, middleware auth, kuota, dan CAPTCHA. Setelah tahap ini selesai, frontend Tahap 3 bisa dihubungkan ke API nyata.

---

## Checklist Tugas

### 9.1 Middleware Utama

- [ ] Buat `src/middleware/session.ts`:
  - Baca cookie `session_token`
  - Hash token → cari di tabel `sessions`
  - Cek `expires_at` dan `revoked_at`
  - Attach `request.user` jika valid
  - Attach `request.guestId` jika tamu
- [ ] Buat `src/middleware/requireAuth.ts` — throw 401 jika tidak ada sesi
- [ ] Buat `src/middleware/requireRole.ts` — throw 403 jika bukan role yang diminta
- [ ] Buat `src/middleware/requireFeature.ts` — cek tabel `features` (enabled + guest_allowed)
- [ ] Buat `src/middleware/requireQuota.ts` — cek `quota_rules` + `usage_daily` + Redis
- [ ] Buat `src/middleware/maintenanceMode.ts` — cek `system_settings.maintenance_mode`
- [ ] Pasang middleware ke semua route secara berurutan:
  ```
  sesi/tamu → peran → mode perawatan → saklar fitur → kuota → rate limit
  ```

### 9.2 Rate Limiter

- [ ] Konfigurasi `@fastify/rate-limit` dengan Redis store
- [ ] Rate limit per route:
  - Login: 10 percobaan / 15 menit / per IP
  - Register: 5 / jam / per IP
  - OTP send: 3 / 10 menit / per email
  - OTP verify: 5 percobaan / per OTP (di tabel `otp_codes.attempts`)
  - API umum: 100 request / menit / per user

### 9.3 `POST /api/v1/auth/register`

- [ ] Validasi Zod: email, password (min 10), captcha_token
- [ ] Verifikasi CAPTCHA (Cloudflare Turnstile) lewat API Turnstile
- [ ] Cek email belum terdaftar
- [ ] Cek password tidak ada di daftar password umum (HaveIBeenPwned API atau daftar lokal)
- [ ] Hash password: `argon2id` via `@node-rs/argon2`
- [ ] Insert `users` dengan status `pending_email`
- [ ] Generate OTP 6 digit (CSPRNG)
- [ ] Simpan hash OTP ke `otp_codes` (purpose: `verify_email`)
- [ ] Kirim email verifikasi lewat SMTP Gmail / Nodemailer
- [ ] Return: `{ message: "cek email Anda" }` (tidak bocorkan apakah email sudah ada)

### 9.4 `POST /api/v1/auth/verify-email`

- [ ] Validasi: email, code
- [ ] Cari `otp_codes` aktif (purpose verify_email, belum consumed, belum expired)
- [ ] Cek `attempts < max_attempts` (5x); jika melebihi: hapus OTP dan return error
- [ ] Verifikasi hash OTP
- [ ] Update `users.status` → `pending_approval`, set `email_verified_at`
- [ ] Mark OTP sebagai consumed
- [ ] Kirim email notifikasi ke admin: "Ada pendaftaran baru"
- [ ] Return: `{ message: "email diverifikasi, menunggu persetujuan" }`

### 9.5 `POST /api/v1/auth/login`

- [ ] Validasi: email, password
- [ ] Catat `login_attempts` (selalu, sukses atau gagal)
- [ ] Cek rate limit login per IP dan per email (dari `login_attempts`)
- [ ] Cari user; verifikasi `argon2id`
- [ ] Cek `status === 'active'`; jika bukan: pesan error generik
- [ ] Generate session token (CSPRNG 32 byte)
- [ ] Simpan hash token ke `sessions`
- [ ] Set cookie `session_token` (HttpOnly, Secure, SameSite=Lax, max-age 7 hari)
- [ ] Return: `{ user: { id, email, role } }`
- [ ] Pesan error: **generik** — tidak membedakan "email tidak ada" vs "password salah"

### 9.6 `POST /api/v1/auth/logout`

- [ ] Set `sessions.revoked_at = now()`
- [ ] Clear cookie
- [ ] Return: `{ message: "berhasil logout" }`

### 9.7 `POST /api/v1/auth/password/forgot`

- [ ] Validasi: email
- [ ] Cari user (tapi respons selalu sama apapun hasilnya):
  - `{ message: "Jika email terdaftar, kode akan dikirim" }`
- [ ] Jika user ada: generate OTP, kirim email reset password
- [ ] Rate limit: max 3 permintaan reset per jam per email

### 9.8 `POST /api/v1/auth/password/reset`

- [ ] Validasi: email, code, new_password
- [ ] Verifikasi OTP (purpose: `reset_password`)
- [ ] Hash password baru
- [ ] Update `users.password_hash`
- [ ] Revoke semua sesi aktif user
- [ ] Mark OTP consumed
- [ ] Kirim email notifikasi: "Password Anda baru saja diubah"
- [ ] Return: `{ message: "password berhasil diubah" }`

### 9.9 `POST /api/v1/auth/admin/otp`

- [ ] Login admin selalu memerlukan OTP
- [ ] Alur:
  1. Submit email + password → verifikasi → generate + kirim OTP
  2. Submit OTP → verifikasi → buat sesi admin
- [ ] Semua langkah ter-rate-limit ketat

### 9.10 `POST /api/v1/guest/session`

- [ ] Validasi CAPTCHA Turnstile
- [ ] Ambil IP dan fingerprint perangkat
- [ ] Insert atau update `guest_identities`
- [ ] Set cookie `guest_id` (HttpOnly)
- [ ] Return: `{ guestId, quotaRemaining }` (sisa kuota hari ini)

### 9.11 Endpoint Sesi

- [ ] `GET /api/v1/auth/me` — info pengguna dari sesi aktif
- [ ] `GET /api/v1/auth/sessions` — daftar sesi aktif pengguna
- [ ] `DELETE /api/v1/auth/sessions/:id` — cabut sesi tertentu

### 9.12 Admin: Kelola Pengguna

- [ ] `GET /api/v1/admin/users` — daftar pengguna (filter, pagination)
- [ ] `PATCH /api/v1/admin/users/:id/approve` — setujui (insert audit_log)
- [ ] `PATCH /api/v1/admin/users/:id/reject` — tolak + alasan (insert audit_log)
- [ ] `PATCH /api/v1/admin/users/:id/disable`
- [ ] `PATCH /api/v1/admin/users/:id/enable`
- [ ] `DELETE /api/v1/admin/users/:id` — soft delete (set deleted_at)
- [ ] `PATCH /api/v1/admin/users/:id/role`
- [ ] `POST /api/v1/admin/users/:id/reset-password` — picu reset password
- [ ] `GET/POST/PATCH /api/v1/admin/users/:id/quota-overrides`
- [ ] Semua tindakan admin: insert ke `audit_logs`

### 9.13 Layanan Email (Nodemailer)

- [ ] Buat `src/lib/email.ts`
- [ ] Template email:
  - Verifikasi email (OTP + instruksi)
  - Notifikasi admin ada pendaftar baru
  - Persetujuan akun
  - Penolakan akun (dengan alasan)
  - Reset password (OTP)
  - Notifikasi password berubah
- [ ] Rate limit pengiriman per email (max 3 OTP/10 menit)
- [ ] Retry jika SMTP gagal (1x retry)

### 9.14 CLI Admin

- [ ] Buat `apps/api/src/cli/create-admin.ts`
- [ ] Script `pnpm admin:create`:
  - Prompt: email, password
  - Validasi password kuat
  - Insert user dengan role `admin`, status `active`
  - Print konfirmasi

### 9.15 Integrasi Frontend (Tahap 3)

- [ ] Ganti mock functions di `useAuthStore` dengan API call nyata
- [ ] Handle semua error code dari API dengan pesan bahasa Indonesia
- [ ] Integrasikan Cloudflare Turnstile widget di form daftar dan tamu

---

## Kriteria Selesai

- [ ] Register → verifikasi email → pending approval (alur penuh berjalan)
- [ ] Login berhasil → cookie terset → `GET /me` mengembalikan data user
- [ ] Login gagal 10x → rate limit terpicu (429)
- [ ] Reset password: semua sesi dicabut, email notif terkirim
- [ ] Admin OTP: login admin selalu butuh OTP 6 digit
- [ ] Tamu: CAPTCHA → cookie guest_id terset
- [ ] `pnpm admin:create` membuat akun admin
- [ ] Semua tindakan admin tercatat di `audit_logs`
- [ ] Vitest: semua alur auth ada unit test

---

## Catatan Teknis

- Pesan error login harus **seragam** — jangan bocorkan apakah email terdaftar atau tidak
- Cookie sesi: `HttpOnly` + `Secure` + `SameSite=Lax` — tidak bisa dibaca JS
- `argon2id` params: memory 64MB, iterations 3, parallelism 1
- Jangan simpan token sesi di database — hanya hash-nya (`sha256`)
- OTP hash dengan `sha256`, bukan argon2

