# Tahap 7 – Frontend: Dashboard Admin

**Jenis:** Frontend
**Prioritas:** Ketujuh (penutup fase frontend)
**Referensi PRD:** §5.6 Dashboard Admin, §1.3 Peran (admin), §4.5 Pemakaian Biaya dan Audit

---

## Tujuan

Membangun seluruh halaman dashboard admin dengan data mock. Admin bisa melihat statistik & status sistem, mengelola pengguna, mengatur model/fitur, kuota, pengaman biaya, dan log. Backend admin di Tahap 9.

---

## Checklist Tugas

### 7.1 Halaman Ringkasan (`/admin/dashboard`)

- [ ] Buat `app/(admin)/dashboard/page.tsx`
- [ ] Kartu statistik atas:
  - Total pengguna aktif
  - Menunggu persetujuan (badge merah jika > 0)
  - Pemakaian token bulan ini
  - Estimasi biaya bulan ini (USD)
- [ ] Panel Kontrol Status Sistem:
  - Toggle: Buka / Tutup Pendaftaran
  - Toggle: Mode Perawatan (Maintenance Mode)
  - Input: Pesan mode perawatan
- [ ] Grafik pemakaian (7 hari terakhir):
  - Line chart: jumlah request per hari
  - Bar chart: biaya per model per hari
  - Gunakan `recharts` atau `shadcn charts`
- [ ] Tabel pemakaian per fitur (10 besar)
- [ ] Daftar error terbaru (5 error terakhir)
- [ ] Daftar pengguna menunggu persetujuan (dengan tombol Setujui/Tolak langsung)
- [ ] Alert bila biaya mendekati plafon (> 80%)

### 7.2 Halaman Pengguna (`/admin/pengguna`)

- [ ] Buat `app/(admin)/pengguna/page.tsx`
- [ ] Tabel pengguna dengan kolom:
  - Email, Peran, Status, Tanggal Daftar, Terakhir Aktif
- [ ] Filter: Status (semua / pending_email / pending_approval / active / rejected / disabled)
- [ ] Pencarian by email
- [ ] Pagination
- [ ] Aksi per baris:
  - ✅ Setujui (pending_approval → active)
  - ❌ Tolak (dengan input alasan)
  - 🔒 Nonaktifkan
  - 🔓 Aktifkan kembali
  - 🗑️ Hapus (soft delete, dengan konfirmasi)
  - 🔑 Picu Reset Password (kirim email reset)
  - ✏️ Ubah Peran (user ↔ admin)
  - 📏 Kuota Khusus (buka dialog atur kuota)
- [ ] Dialog Tolak: input alasan penolakan
- [ ] Dialog Kuota Khusus:
  - List kuota override per fitur
  - Tambah/edit/hapus override

### 7.3 Halaman Fitur & Model (`/admin/model`)

- [ ] Buat `app/(admin)/model/page.tsx`
- [ ] **Seksi Fitur:**
  - Tabel semua fitur
  - Kolom: Nama, Status (aktif/nonaktif), Izin Tamu, Butuh AI Berbayar
  - Toggle on/off per fitur (saklar)
  - Perubahan langsung tersimpan (tanpa tombol save)
- [ ] **Seksi Model AI:**
  - Tabel semua model
  - Kolom: Provider, Model ID, Nama Tampilan, Tier, Izin Tamu, Status, Harga Input ($/MTok), Harga Output ($/MTok)
  - Toggle aktif/nonaktif per model
  - Tombol edit harga
  - Tombol tambah model baru
- [ ] **Seksi Routing Rules:**
  - Tabel per task type + preset
  - Kolom: Jenis Tugas, Preset, Model Utama, Model Cadangan, Prioritas
  - Tombol edit routing per baris
  - Modal edit: pilih model dari dropdown

### 7.4 Halaman Kuota (`/admin/kuota`)

- [ ] Buat `app/(admin)/kuota/page.tsx`
- [ ] **Kuota Tamu:**
  - Kartu per fitur: limit/hari, limit/bulan
  - Tombol edit per baris
- [ ] **Kuota Akun:**
  - Kartu per fitur: limit/hari, limit/bulan
  - Tombol edit per baris
- [ ] **Plafon Harian Tamu Bersama:**
  - Input total request tamu/hari
  - Pemakaian saat ini vs plafon (progress bar)

### 7.5 Halaman Pengaman Biaya (`/admin/biaya`)

- [ ] Buat `app/(admin)/biaya/page.tsx`
- [ ] **Plafon Bulanan:**
  - Input nominal USD plafon
  - Progress bar: "Rp X dari Rp Y terpakai" (atau USD)
  - Persentase pemakaian
  - Peringatan warna: hijau (< 80%), kuning (80–99%), merah (≥ 100%)
- [ ] **Tombol Darurat:**
  - Tombol besar merah "🚨 Matikan Semua Fitur Berbayar"
  - Konfirmasi dialog: "Ini akan mematikan Claude dan OpenAI seketika. Lanjutkan?"
  - Status saat ini: "Fitur berbayar: AKTIF / NONAKTIF"
  - Tombol "Aktifkan Kembali"
- [ ] **Riwayat Biaya:**
  - Tabel biaya per model per hari (7 hari terakhir)
  - Total per bulan
- [ ] **Batas per Fitur:**
  - Tabel batas harian khusus per fitur berbayar (mis. gambar OpenAI: 10/hari)

### 7.6 Halaman Log (`/admin/log`)

- [ ] Buat `app/(admin)/log/page.tsx`
- [ ] **Tab:**
  - Login (riwayat login semua pengguna)
  - Tindakan Admin (audit log)
  - Error Aplikasi
- [ ] Filter: rentang tanggal, pengguna, jenis aksi
- [ ] Tabel dengan:
  - Waktu, Aktor, Aksi, Target, IP
- [ ] Pagination

### 7.7 Komponen Admin Umum

- [ ] Buat `src/components/admin/StatCard.tsx` — kartu statistik dengan ikon + nilai + perubahan
- [ ] Buat `src/components/admin/DataTable.tsx` — tabel generik dengan filter, sorting, pagination
- [ ] Buat `src/components/admin/ConfirmActionDialog.tsx` — dialog konfirmasi aksi berbahaya
- [ ] Buat `src/components/admin/EmergencyButton.tsx` — tombol darurat dengan styling merah
- [ ] Buat `src/components/admin/UsageChart.tsx` — wrapper recharts untuk grafik pemakaian

### 7.8 State Admin

- [ ] Buat `src/store/useAdminStore.ts`:
  - `users: User[]`
  - `features: Feature[]`
  - `models: AiModel[]`
  - `routingRules: RoutingRule[]`
  - `quotaRules: QuotaRule[]`
  - `systemSettings: SystemSettings`
  - `usageSummary: UsageSummary`
  - `auditLogs: AuditLog[]`
  - `appErrors: AppError[]`
  - Semua fungsi mock CRUD

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (admin)/
      dashboard/page.tsx
      pengguna/page.tsx
      model/page.tsx
      kuota/page.tsx
      biaya/page.tsx
      log/page.tsx
  components/
    admin/
      StatCard.tsx
      DataTable.tsx
      ConfirmActionDialog.tsx
      EmergencyButton.tsx
      UsageChart.tsx
      UserActionsMenu.tsx
      FeatureToggle.tsx
      ModelEditor.tsx
      RoutingEditor.tsx
  store/
    useAdminStore.ts
  lib/
    mock/
      admin.mock.ts
```

---

## Kriteria Selesai

- [ ] Dashboard menampilkan semua kartu statistik dan saklar sistem (pendaftaran & mode perawatan)
- [ ] Grafik pemakaian tampil (7 hari)
- [ ] Setujui/tolak pengguna berfungsi (mengubah state mock)
- [ ] Toggle fitur dan model berfungsi
- [ ] Tombol darurat muncul konfirmasi lalu mengubah state
- [ ] Plafon biaya tampil dengan progress bar + warna status
- [ ] Log tampil dengan pagination
- [ ] Tidak ada halaman setting/profil kampus yang tersisa
- [ ] Tidak ada TypeScript error

---

## Catatan Teknis

- Admin tidak melihat isi chat pengguna (PRD §5.6)
- Tombol darurat harus punya konfirmasi berlapis
- `DataTable` adalah komponen generik yang dipakai di banyak tempat

