# Plan – Asisten Kuliah Serba Ada

Dokumen ini adalah indeks semua tahap pembangunan. Urutan: **Frontend dahulu** (Tahap 1–7), **Backend** (Tahap 8–12).

> Setiap tahap punya file `.md` sendiri dengan checklist tugas, kriteria selesai, dan catatan teknis.

---

## Daftar Tahap

### 🖥️ Frontend (UI-First)

| No | File | Cakupan |
|---|---|---|
| 1 | [tahap-1-fe-setup.md](./tahap-1-fe-setup.md) | Setup monorepo, konfigurasi proyek, design system dasar |
| 2 | [tahap-2-fe-layout.md](./tahap-2-fe-layout.md) | Layout utama, navigasi, sidebar, header, mode gelap/terang |
| 3 | [tahap-3-fe-auth.md](./tahap-3-fe-auth.md) | Halaman daftar, login, verifikasi email, reset password, OTP |
| 4 | [tahap-4-fe-chat.md](./tahap-4-fe-chat.md) | Halaman chat, streaming, pemilihan model, riwayat percakapan |
| 5 | [tahap-5-fe-sumber.md](./tahap-5-fe-sumber.md) | Halaman baca foto/file, tanya modul/PDF, materi bersumber |
| 6 | [tahap-6-fe-fitur-lain.md](./tahap-6-fe-fitur-lain.md) | Halaman konverter, kompres, STT, kuis, flashcard, ringkas jurnal |
| 7 | [tahap-7-fe-admin.md](./tahap-7-fe-admin.md) | Dashboard admin: ringkasan (status sistem), pengguna, model, kuota, biaya, log |

### ⚙️ Backend (API & Infrastruktur)

| No | File | Cakupan |
|---|---|---|
| 8 | [tahap-8-be-fondasi.md](./tahap-8-be-fondasi.md) | Setup Fastify API, Drizzle + PostgreSQL, Docker Compose, Redis |
| 9 | [tahap-9-be-auth.md](./tahap-9-be-auth.md) | Auth API: register, login, OTP, sesi, kuota, CAPTCHA |
| 10 | [tahap-10-be-ai-router.md](./tahap-10-be-ai-router.md) | Router AI: streaming chat, pemilihan model, pengaman biaya |
| 11 | [tahap-11-be-konverter.md](./tahap-11-be-konverter.md) | File-service: konversi, kompres, OCR, LibreOffice, Ghostscript |
| 12 | [tahap-12-be-stt-belajar.md](./tahap-12-be-stt-belajar.md) | STT Groq Whisper, kuis, flashcard, ringkas jurnal, pgvector |

---

## Prinsip Urutan

1. **Frontend dulu** — semua UI/halaman dibangun dengan data mock/statis.
2. **Backend menyusul** — API dibangun sesuai kontrak yang sudah tampak di UI.
3. **Tiap tahap mandiri** — bisa dipakai/ditunjukkan sendiri tanpa menunggu tahap berikutnya.
4. **Setiap tahap diakhiri** dengan tes (Vitest/Playwright), tag rilis, dan update dokumen ini.

---

*Referensi utama: [`prd.md`](../prd.md)*
