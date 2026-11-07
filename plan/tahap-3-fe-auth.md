# Tahap 3 – Frontend: Halaman Auth (Daftar, Login, OTP, Reset)

**Jenis:** Frontend
**Prioritas:** Ketiga – dibutuhkan sebelum fitur apapun bisa diakses
**Referensi PRD:** §5.1 Akun dan Akses, §1.3 Peran, §7 Keamanan

---

## Tujuan

Membangun seluruh halaman autentikasi dengan UI lengkap dan validasi form sisi klien. Backend belum ada — semua form terhubung ke handler mock/stub yang langsung return success. Koneksi ke API nyata dilakukan di Tahap 10.

---

## Checklist Tugas

### 3.1 Halaman Daftar (`/daftar`)

- [ ] Buat `app/(auth)/daftar/page.tsx`
- [ ] Form dengan field:
  - Email (validasi format email)
  - Password (min. 10 karakter, ada indikator kekuatan)
  - Konfirmasi password (harus sama)
- [ ] Komponen indikator kekuatan password:
  - Lemah / Sedang / Kuat (berdasarkan panjang + karakter spesial)
- [ ] Komponen CAPTCHA placeholder (Cloudflare Turnstile — integrasi nyata di Tahap 10)
- [ ] Tombol "Daftar" dengan state loading
- [ ] Link "Sudah punya akun? Masuk"
- [ ] Setelah submit mock: tampil halaman sukses "cek email Anda"
- [ ] Validasi Zod schema dari `packages/shared`

### 3.2 Halaman Verifikasi Email (`/verifikasi-email`)

- [ ] Buat `app/(auth)/verifikasi-email/page.tsx`
- [ ] Tampilkan pesan "Kami telah mengirim kode ke [email]"
- [ ] Input OTP 6 digit (komponen `OtpInput` — 6 kotak terpisah)
- [ ] Countdown timer "kirim ulang dalam X detik" (60 detik)
- [ ] Tombol "Kirim Ulang Kode" (aktif setelah countdown habis)
- [ ] State loading dan error
- [ ] Setelah mock success: redirect ke `/menunggu-persetujuan`

### 3.3 Halaman Menunggu Persetujuan (`/menunggu-persetujuan`)

- [ ] Buat `app/(auth)/menunggu-persetujuan/page.tsx`
- [ ] Tampilkan pesan informatif:
  - "Akun Anda sedang menunggu persetujuan admin"
  - "Anda akan mendapat email setelah disetujui"
- [ ] Ilustrasi / ikon status pending
- [ ] Link ke halaman utama

### 3.4 Halaman Login (`/masuk`)

- [ ] Buat `app/(auth)/masuk/page.tsx`
- [ ] Form dengan field:
  - Email
  - Password (ada tombol show/hide)
- [ ] Tombol "Masuk" dengan state loading
- [ ] Pesan error generic (jangan ungkap apakah email/password yang salah)
- [ ] Link "Lupa password?"
- [ ] Link "Belum punya akun? Daftar"
- [ ] Validasi Zod

### 3.5 Halaman Lupa Password (`/lupa-password`)

- [ ] Buat `app/(auth)/lupa-password/page.tsx`
- [ ] Form input email
- [ ] Pesan sukses SAMA untuk email terdaftar maupun tidak:
  - "Jika email terdaftar, kode akan dikirim ke kotak masuk Anda"
- [ ] State loading

### 3.6 Halaman Reset Password (`/reset-password`)

- [ ] Buat `app/(auth)/reset-password/page.tsx`
- [ ] Input OTP 6 digit
- [ ] Input password baru + konfirmasi
- [ ] Validasi: password min. 10 karakter, harus cocok
- [ ] State loading dan error
- [ ] Setelah mock success: redirect ke `/masuk` dengan notifikasi sukses

### 3.7 Halaman Login Admin (`/admin/masuk`)

- [ ] Buat `app/(admin)/masuk/page.tsx`
- [ ] Form: email + password
- [ ] Setelah submit: tampil halaman OTP admin
- [ ] Input OTP 6 digit (admin selalu butuh OTP)
- [ ] Label jelas "Admin Login"

### 3.8 Komponen Auth Bersama

Buat `src/components/auth/`:

- [ ] `OtpInput.tsx` — 6 kotak input terpisah, auto-focus, paste support
- [ ] `PasswordInput.tsx` — input dengan toggle show/hide
- [ ] `PasswordStrengthBar.tsx` — indikator kekuatan
- [ ] `AuthCard.tsx` — card container untuk semua form auth (logo, judul, form)
- [ ] `CaptchaWidget.tsx` — placeholder Turnstile (nanti diisi token dari Turnstile)
- [ ] `AuthDivider.tsx` — garis "atau"

### 3.9 Validasi dan Schema (packages/shared)

- [ ] Buat `packages/shared/src/schemas/auth.ts`:
  ```typescript
  registerSchema     // email, password, confirmPassword
  loginSchema        // email, password
  verifyEmailSchema  // code (6 digit)
  forgotPasswordSchema  // email
  resetPasswordSchema   // code, newPassword, confirmPassword
  ```
- [ ] Export dari `packages/shared/src/index.ts`

### 3.10 State Autentikasi (Zustand)

- [ ] Buat `src/store/useAuthStore.ts`:
  - `user: User | null`
  - `isLoading: boolean`
  - `isAuthenticated: boolean`
  - `login(user: User)` — mock
  - `logout()`
- [ ] Tipe `User` dari `packages/shared`

### 3.11 Route Guard (Middleware)

- [ ] Buat `src/middleware.ts` (Next.js middleware):
  - Redirect ke `/masuk` jika belum login dan akses halaman `(app)/`
  - Redirect ke `/admin/masuk` jika bukan admin dan akses `/admin/`
  - Redirect ke `/chat` jika sudah login dan akses halaman auth
  - Semua logika pakai cookie session (stub dulu, diisi Tahap 10)

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (auth)/
      daftar/page.tsx
      verifikasi-email/page.tsx
      menunggu-persetujuan/page.tsx
      masuk/page.tsx
      lupa-password/page.tsx
      reset-password/page.tsx
    (admin)/
      masuk/page.tsx
  components/
    auth/
      OtpInput.tsx
      PasswordInput.tsx
      PasswordStrengthBar.tsx
      AuthCard.tsx
      CaptchaWidget.tsx
  store/
    useAuthStore.ts
  middleware.ts

packages/shared/src/
  schemas/
    auth.ts
```

---

## Kriteria Selesai

- [ ] Semua halaman auth bisa dibuka dan form bisa diisi
- [ ] Validasi Zod muncul dengan pesan error yang jelas (bahasa Indonesia)
- [ ] OTP input: paste 6 digit langsung mengisi semua kotak
- [ ] Countdown kirim ulang OTP bekerja
- [ ] Indikator kekuatan password berubah sesuai input
- [ ] Show/hide password berfungsi
- [ ] Route guard: halaman `/chat` redirect ke `/masuk` saat tidak ada sesi
- [ ] Tidak ada TypeScript error

---

## Catatan Teknis

- Pesan error login harus **generik** — jangan bedakan "email tidak ditemukan" vs "password salah"
- Pesan reset password harus **sama** untuk email terdaftar dan tidak terdaftar (anti user enumeration)
- Semua validasi Zod didefinisikan di `packages/shared` agar nanti dipakai ulang di backend
- OTP input harus support paste (ctrl+v menaruh digit ke masing-masing kotak)
- Form menggunakan React Hook Form + zodResolver

