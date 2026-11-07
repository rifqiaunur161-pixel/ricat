# Tahap 4 – Frontend: Halaman Chat

**Jenis:** Frontend
**Prioritas:** Keempat – fitur inti aplikasi
**Referensi PRD:** §5.2 Router AI, §4.3 Chat dan File, §7 Kinerja

---

## Tujuan

Membangun halaman chat lengkap dengan UI streaming, pemilihan model, riwayat percakapan, dan tampilan pesan. Semua data menggunakan mock — streaming disimulasikan secara lokal. Koneksi ke backend dilakukan di Tahap 11.

---

## Checklist Tugas

### 4.1 Layout Halaman Chat

- [ ] Buat `app/(app)/chat/page.tsx` — entry point
- [ ] Buat `app/(app)/chat/[id]/page.tsx` — percakapan spesifik
- [ ] Layout split:
  - **Kiri:** sidebar riwayat percakapan (collapsible)
  - **Kanan:** area chat utama
- [ ] Di mobile: sidebar riwayat jadi sheet/drawer

### 4.2 Sidebar Riwayat Percakapan

- [ ] Buat `src/components/chat/ConversationList.tsx`
  - Daftar percakapan dengan judul + tanggal
  - Percakapan aktif di-highlight
  - Tombol "Percakapan Baru" di atas
  - Grouped by: Hari ini, Kemarin, 7 hari terakhir, Lebih lama
  - Hover: tombol hapus percakapan (dengan confirm dialog)
  - Skeleton loading state
- [ ] Buat `src/components/chat/ConversationItem.tsx`
  - Judul percakapan (truncate jika terlalu panjang)
  - Tanggal/waktu terakhir
  - Badge model yang terakhir dipakai

### 4.3 Area Chat Utama

- [ ] Buat `src/components/chat/ChatArea.tsx` — container utama
- [ ] Buat `src/components/chat/MessageList.tsx` — daftar pesan
  - Auto-scroll ke bawah saat pesan baru masuk
  - Scroll ke atas untuk melihat riwayat
  - Tombol "Gulir ke bawah" muncul saat user scroll naik

### 4.4 Komponen Pesan

- [ ] Buat `src/components/chat/MessageBubble.tsx`
  - Pesan pengguna (kanan, warna berbeda)
  - Pesan AI (kiri, dengan avatar model)
  - Label "Dijawab oleh: [nama model]" di bawah pesan AI
  - Timestamp
  - Tombol copy teks pesan
  - Markdown rendering (bold, italic, code block, list)
  - Syntax highlighting untuk code block
- [ ] Buat `src/components/chat/StreamingMessage.tsx`
  - Animasi cursor berkedip saat streaming
  - Render markdown secara bertahap (incremental)
- [ ] Buat `src/components/chat/MessageError.tsx`
  - Tampil saat model gagal menjawab
  - Tombol "Coba lagi"
  - Kode error (opsional, bisa di-toggle)

### 4.5 Input Area

- [ ] Buat `src/components/chat/ChatInput.tsx`
  - Textarea auto-resize (min 1 baris, max 8 baris)
  - Tombol kirim (panah/enter)
  - Keyboard shortcut: `Enter` kirim, `Shift+Enter` baris baru
  - Disabled saat streaming
  - Tombol stop streaming (muncul saat sedang stream)
  - Tombol lampirkan file (ikon paper clip — placeholder, diisi Tahap 6)
  - Counter karakter (opsional)
- [ ] Buat `src/components/chat/AttachmentPreview.tsx`
  - Thumbnail file/gambar yang dilampirkan
  - Tombol hapus lampiran

### 4.6 Pemilihan Mode dan Model

- [ ] Buat `src/components/chat/ModelSelector.tsx`
  - Toggle mode: **Otomatis** | **Preset** | **Manual**
  - Preset: dropdown → Hemat / Seimbang / Terbaik
  - Manual: dropdown daftar model (dari mock data)
  - Label model yang sedang aktif
  - Di mobile: compact (ikon + nama singkat)
- [ ] Data mock model:
  ```typescript
  const MOCK_MODELS = [
    { id: "gemini-2.0-flash", name: "Gemini Flash", tier: "free" },
    { id: "claude-sonnet-5-5", name: "Claude Sonnet", tier: "paid" },
    { id: "claude-haiku-5-5", name: "Claude Haiku", tier: "paid" },
    { id: "groq-llama", name: "Groq LLaMA", tier: "free" },
  ]
  ```
- [ ] Buat `src/components/chat/TaskTypeSelector.tsx`
  - Tombol / badge untuk memilih jenis tugas:
    - 💬 Chat Santai
    - 📖 Materi Bersumber
    - 📄 Buat Dokumen
    - 🖼️ Baca Foto
    - 🎙️ Transkripsi
  - Mode Otomatis: dipilih otomatis sesuai tombol, bisa diubah manual

### 4.7 State Chat

- [ ] Buat `src/store/useChatStore.ts` (Zustand):
  - `conversations: Conversation[]`
  - `activeConversationId: string | null`
  - `messages: Record<string, Message[]>`
  - `isStreaming: boolean`
  - `streamingMessageId: string | null`
  - `selectedMode: 'auto' | 'preset' | 'manual'`
  - `selectedPreset: 'hemat' | 'seimbang' | 'terbaik'`
  - `selectedModelId: string | null`
  - `selectedTaskType: TaskType`
  - `addMessage()`, `updateMessage()`, `setStreaming()`
- [ ] Mock function `sendMockMessage()` yang mensimulasikan streaming dengan `setTimeout`

### 4.8 Mock Streaming

- [ ] Simulasi streaming: kirim teks kata per kata setiap 50ms
- [ ] Simulasi error: 10% chance gagal untuk testing error state
- [ ] Simulasi label model di akhir respons

### 4.9 Halaman New Chat

- [ ] Tampilan welcome saat belum ada percakapan aktif:
  - Logo / ilustrasi
  - Teks sambutan: "Halo, ada yang bisa dibantu?"
  - 4–6 prompt suggestion card (contoh pertanyaan populer)
  - Langsung ke input area saat klik suggestion

### 4.10 Fitur UX Tambahan

- [ ] Tombol "Percakapan Baru" selalu visible
- [ ] Judul percakapan otomatis dari 5 kata pertama pesan pertama
- [ ] Edit judul percakapan (klik judul, inline edit)
- [ ] Konfirmasi hapus percakapan
- [ ] Pesan kuota habis yang jelas (banner merah di atas input)

---

## Struktur File Akhir

```
apps/web/src/
  app/
    (app)/
      chat/
        page.tsx
        [id]/page.tsx
  components/
    chat/
      ConversationList.tsx
      ConversationItem.tsx
      ChatArea.tsx
      MessageList.tsx
      MessageBubble.tsx
      StreamingMessage.tsx
      MessageError.tsx
      ChatInput.tsx
      AttachmentPreview.tsx
      ModelSelector.tsx
      TaskTypeSelector.tsx
  store/
    useChatStore.ts
  lib/
    mock/
      chat.mock.ts
```

---

## Kriteria Selesai

- [ ] Pesan bisa dikirim dan respons mock muncul dengan efek streaming
- [ ] Markdown dan syntax highlight tampil benar di pesan AI
- [ ] Label "Dijawab oleh: [model]" muncul di setiap pesan AI
- [ ] Pemilihan mode/model tersimpan di store
- [ ] Riwayat percakapan bisa diklik dan menampilkan pesan lama
- [ ] Tombol "Coba lagi" muncul saat mock error
- [ ] Responsif: chat tetap fungsional di mobile
- [ ] Auto-scroll saat pesan baru masuk
- [ ] Tidak ada TypeScript error

---

## Catatan Teknis

- Render markdown pakai `react-markdown` + `rehype-highlight` untuk syntax highlighting
- Jangan gunakan `dangerouslySetInnerHTML` untuk render markdown — pakai library aman
- `useChatStore` harus bisa ganti mock function dengan API call asli di Tahap 11 tanpa ubah komponen
- Streaming simulasi harus bisa dihentikan dengan tombol stop (clear timeout/interval)
- Semua tipe (`Conversation`, `Message`, `TaskType`) didefinisikan di `packages/shared`

