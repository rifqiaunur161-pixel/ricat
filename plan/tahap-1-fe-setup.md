# Tahap 1 – Frontend: Setup Monorepo & Design System

**Jenis:** Frontend
**Prioritas:** Pertama – fondasi semua tahap berikutnya
**Referensi PRD:** §2 Tech Stack, §2.1 Struktur Repo

---

## Tujuan

Menyiapkan seluruh infrastruktur kode frontend: monorepo, tooling, design system, dan komponen UI dasar. Setelah tahap ini selesai, semua tahap frontend berikutnya bisa langsung menulis halaman tanpa setup ulang.

---

## Checklist Tugas

### 1.1 Inisialisasi Monorepo

- [ ] Init repo dengan `pnpm workspaces` + Turborepo
- [ ] Buat struktur folder sesuai PRD:
  ```
  apps/web/
  apps/api/        ← folder dikosongkan dulu, diisi Tahap 9
  packages/db/     ← folder dikosongkan dulu, diisi Tahap 9
  packages/shared/
  packages/ai/     ← folder dikosongkan dulu, diisi Tahap 11
  services/file-service/  ← folder dikosongkan dulu, diisi Tahap 12-13
  infra/
  ```
- [ ] Buat `pnpm-workspace.yaml` yang mendaftarkan semua package
- [ ] Buat `turbo.json` dengan pipeline: `build`, `dev`, `lint`, `test`
- [ ] Buat `.gitignore`, `.nvmrc` (Node 20 LTS), `.npmrc`
- [ ] Buat `README.md` root dengan instruksi setup cepat

### 1.2 Setup `packages/shared`

- [ ] Init package TypeScript (`tsconfig.json` strict mode)
- [ ] Install Zod
- [ ] Buat `src/schemas/` — folder untuk skema Zod bersama (diisi bertahap)
- [ ] Buat `src/types/` — tipe TypeScript bersama
- [ ] Buat `src/constants/` — konstanta (nama fitur, kode error, dll.)
- [ ] Export semua lewat `src/index.ts`

### 1.3 Setup `apps/web` (Next.js)

- [ ] `pnpm create next-app` dengan opsi: App Router, TypeScript, Tailwind, ESLint
- [ ] Install dependensi UI:
  - `shadcn/ui` (init, pilih tema)
  - `lucide-react`
  - `@tanstack/react-query`
  - `zustand`
  - `react-hook-form`
  - `zod`
  - `next-themes` (mode gelap/terang)
- [ ] Konfigurasi `tailwind.config.ts` dengan tema dan warna kustom
- [ ] Konfigurasi `tsconfig.json` dengan path alias `@/` → `src/`
- [ ] Konfigurasi `next.config.ts`
- [ ] Tambahkan `packages/shared` sebagai dependensi internal

### 1.4 Design System Dasar

- [ ] Inisialisasi shadcn/ui: pilih komponen dasar
  - `Button`, `Input`, `Label`, `Textarea`
  - `Card`, `Badge`, `Separator`
  - `Dialog`, `Sheet`, `Drawer`
  - `Dropdown Menu`, `Select`, `Popover`
  - `Toast` / `Sonner`
  - `Skeleton`, `Spinner` (custom)
  - `Avatar`
  - `Tooltip`
  - `Table`
  - `Tabs`
  - `Alert`, `Alert Dialog`
  - `Progress`
  - `Scroll Area`
- [ ] Buat `src/components/ui/` — komponen shadcn ter-generate
- [ ] Buat `src/components/common/` — komponen kustom bersama:
  - `LoadingSpinner`
  - `ErrorBoundary`
  - `EmptyState`
  - `PageTitle`
  - `ConfirmDialog`
- [ ] Buat `src/lib/utils.ts` — `cn()` helper dan utilitas umum
- [ ] Buat `src/lib/api.ts` — fetch wrapper (akan diisi Tahap 9)

### 1.5 Tema dan Warna

- [ ] Definisikan CSS variables untuk mode terang dan gelap di `globals.css`
- [ ] Pastikan semua warna mengacu variabel (bukan hardcode hex)
- [ ] Tambahkan font: `Inter` (teks) + `JetBrains Mono` (kode) via `next/font`
- [ ] Buat komponen `ThemeProvider` yang wraps `next-themes`

### 1.6 Konfigurasi Linting dan Format

- [ ] ESLint: `eslint-config-next` + `@typescript-eslint`
- [ ] Prettier dengan konfigurasi konsisten (tab width 2, semicolon, single quote)
- [ ] Husky + lint-staged untuk pre-commit hook
- [ ] Tambahkan script `pnpm lint`, `pnpm format` di root

### 1.7 Setup Testing Frontend

- [ ] Install Vitest + `@testing-library/react` + `@testing-library/user-event`
- [ ] Konfigurasi `vitest.config.ts` dengan jsdom
- [ ] Buat `src/__tests__/` dengan 1 test contoh (render komponen `Button`)
- [ ] Install Playwright untuk E2E (konfigurasi awal, test dummy)
- [ ] Tambahkan script `pnpm test`, `pnpm test:e2e`

### 1.8 Verifikasi Akhir

- [ ] `pnpm dev` dari root menjalankan `apps/web` tanpa error
- [ ] `pnpm build` dari root berhasil
- [ ] `pnpm lint` tidak ada error
- [ ] `pnpm test` semua test hijau
- [ ] Halaman `/` menampilkan "coming soon" placeholder

---

## Struktur File Akhir

```
apps/web/
  src/
    app/
      layout.tsx
      page.tsx           ← placeholder "coming soon"
      globals.css
    components/
      ui/                ← shadcn components
      common/            ← shared custom components
    lib/
      utils.ts
      api.ts             ← stub kosong
    __tests__/
  tailwind.config.ts
  tsconfig.json
  next.config.ts

packages/shared/
  src/
    schemas/
    types/
    constants/
    index.ts
  tsconfig.json
  package.json
```

---

## Kriteria Selesai

- [ ] `pnpm dev` jalan dari root, Next.js tampil di `localhost:3000`
- [ ] Mode gelap/terang bisa di-toggle
- [ ] Semua komponen shadcn ter-install dan bisa di-import
- [ ] 1 unit test hijau
- [ ] Tidak ada TypeScript error (`pnpm tsc --noEmit`)

---

## Catatan Teknis

- Gunakan **App Router** (bukan Pages Router) — semua layout dan page pakai RSC.
- `packages/shared` harus **tidak ada** dependensi ke `apps/web` atau `apps/api` (satu arah).
- Hindari install library yang belum pasti dipakai — tambahkan sesuai kebutuhan tahap berikutnya.
- Semua warna didefinisikan lewat variabel CSS agar mudah diganti tema kampus nanti.

