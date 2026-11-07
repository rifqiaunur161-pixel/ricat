# Tahap 2 – Frontend: Layout Utama & Navigasi

**Jenis:** Frontend
**Prioritas:** Kedua – kerangka tampilan semua halaman
**Referensi PRD:** §1.3 Peran, §5.6 Dashboard Admin, §7 Aksesibilitas dan UX

---

## Tujuan

Membangun kerangka layout yang dipakai oleh semua halaman: sidebar navigasi, header, layout responsif, navigasi mobile, dan skeleton halaman. Semua dibuat dengan data statis/mock — belum ada koneksi ke API.

---

## Checklist Tugas

### 2.1 Layout Root

- [ ] Perbarui `app/layout.tsx`:
  - Tambahkan `ThemeProvider` (next-themes)
  - Tambahkan `QueryClientProvider` (TanStack Query)
  - Tambahkan `Toaster` (sonner)
  - Pasang font Inter + JetBrains Mono
- [ ] Buat `app/(auth)/layout.tsx` — layout halaman auth (centered, tanpa sidebar)
- [ ] Buat `app/(app)/layout.tsx` — layout halaman utama (dengan sidebar)
- [ ] Buat `app/(admin)/layout.tsx` — layout dashboard admin

### 2.2 Sidebar Navigasi

- [ ] Buat `src/components/layout/Sidebar.tsx`
  - Logo / nama aplikasi di atas
  - Menu navigasi utama:
    - 💬 Chat
    - 🔍 Materi Bersumber
    - 🖼️ Baca Foto/File
    - 🔄 Konverter & Kompres
    - 🎙️ Speech-to-Text
    - 📚 Belajar (Kuis & Flashcard)
    - 📰 Ringkas Jurnal
  - Bagian bawah:
    - Profil pengguna (avatar + nama)
    - Tombol logout
- [ ] Sidebar collapsible di desktop (ikon saja atau ikon + teks)
- [ ] Aktif/highlight item navigasi sesuai route saat ini
- [ ] Tooltip saat sidebar collapse

### 2.3 Header

- [ ] Buat `src/components/layout/Header.tsx`
  - Tombol toggle sidebar (desktop)
  - Tombol toggle menu (mobile — hamburger)
  - Judul halaman saat ini (breadcrumb sederhana)
  - Toggle mode gelap/terang
  - Avatar pengguna + dropdown (Profil, Logout)
  - Badge notifikasi (placeholder untuk nanti)

### 2.4 Navigasi Mobile

- [ ] Sidebar berubah jadi `Sheet` (drawer) di mobile
- [ ] Overlay gelap saat drawer terbuka
- [ ] Tutup otomatis saat navigasi ke halaman lain
- [ ] Bottom navigation bar (opsional, untuk 4 menu utama di mobile)

### 2.5 Layout Admin

- [ ] Sidebar admin terpisah dari sidebar pengguna biasa
  - Menu admin:
    - 📊 Ringkasan (status sistem: pendaftaran & mode perawatan)
    - 👥 Pengguna
    - 🤖 Fitur & Model
    - 📏 Kuota
    - 💰 Pengaman Biaya
    - 📋 Log
- [ ] Header admin dengan label "Panel Admin" yang jelas
- [ ] Breadcrumb navigasi di halaman admin

### 2.6 Halaman Placeholder

Buat halaman placeholder (dengan `EmptyState`) untuk semua route utama:

- [ ] `app/(app)/chat/page.tsx`
- [ ] `app/(app)/sumber/page.tsx`
- [ ] `app/(app)/baca-foto/page.tsx`
- [ ] `app/(app)/konverter/page.tsx`
- [ ] `app/(app)/stt/page.tsx`
- [ ] `app/(app)/belajar/page.tsx`
- [ ] `app/(app)/jurnal/page.tsx`
- [ ] `app/(admin)/dashboard/page.tsx`
- [ ] `app/(admin)/pengguna/page.tsx`
- [ ] `app/(admin)/model/page.tsx`
- [ ] `app/(admin)/kuota/page.tsx`
- [ ] `app/(admin)/biaya/page.tsx`
- [ ] `app/(admin)/log/page.tsx`

### 2.7 Komponen Layout Umum

- [ ] `src/components/layout/PageHeader.tsx` — judul + deskripsi halaman + slot action
- [ ] `src/components/layout/ContentArea.tsx` — wrapper konten dengan padding konsisten
- [ ] `src/components/layout/EmptyPlaceholder.tsx` — "fitur ini sedang dikembangkan"
- [ ] `src/components/layout/MobileNav.tsx` — hamburger + drawer

### 2.8 State Layout

- [ ] Buat Zustand store `useLayoutStore`:
  - `sidebarOpen: boolean`
  - `sidebarCollapsed: boolean`
  - `toggleSidebar()`
  - `collapseSidebar()`
- [ ] Simpan preferensi collapsed ke `localStorage`

### 2.9 Responsivitas

- [ ] Breakpoint mobile: `< 768px` — sidebar jadi drawer
- [ ] Breakpoint tablet: `768px – 1024px` — sidebar collapsed (ikon saja)
- [ ] Breakpoint desktop: `> 1024px` — sidebar penuh
- [ ] Semua halaman diuji di lebar 375px, 768px, 1280px

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (auth)/
      layout.tsx
    (app)/
      layout.tsx
      chat/page.tsx
      sumber/page.tsx
      baca-foto/page.tsx
      konverter/page.tsx
      stt/page.tsx
      belajar/page.tsx
      jurnal/page.tsx
    (admin)/
      layout.tsx
      dashboard/page.tsx
      pengguna/page.tsx
      model/page.tsx
      kuota/page.tsx
      biaya/page.tsx
      log/page.tsx
  components/
    layout/
      Sidebar.tsx
      Header.tsx
      MobileNav.tsx
      PageHeader.tsx
      ContentArea.tsx
      EmptyPlaceholder.tsx
  store/
    useLayoutStore.ts
```

---

## Kriteria Selesai

- [ ] Navigasi antara semua halaman placeholder berfungsi tanpa reload penuh
- [ ] Sidebar collapse/expand bekerja di desktop
- [ ] Sidebar berubah jadi drawer di mobile (`< 768px`)
- [ ] Mode gelap/terang bisa di-toggle dari header
- [ ] Active state sidebar muncul sesuai route
- [ ] Tidak ada TypeScript error

---

## Catatan Teknis

- Gunakan `next/link` untuk semua navigasi internal (bukan `<a>`)
- Sidebar state disimpan di Zustand agar tidak hilang saat navigasi
- Layout admin dan layout pengguna terpisah
- Semua teks dalam bahasa Indonesia
