# Panduan ArtCraft FigCraft & Integrasi Antigravity

**FigCraft dari ArtCraft (`storytold/figcraft`)** adalah aplikasi desain antarmuka kolaboratif mandiri (open-source & lokal) berbasis Rust dengan dukungan native **Model Context Protocol (MCP)**.

---

## 1. Lokasi & File

- **Folder Aplikasi & CLI:** [`tools/artcraft-figcraft/`](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/tools/artcraft-figcraft)
  - `figcraft.exe` — Aplikasi antarmuka desain visual (GUI Desktop).
  - `figcraft-cli.exe` — CLI & MCP Server stdio untuk Antigravity.
- **Folder Desain (.figcraft):** [`design/`](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/design)
- **Konfigurasi MCP Plugin Antigravity:** [`.agents/plugins/figcraft/mcp_config.json`](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/.agents/plugins/figcraft/mcp_config.json)
- **Konfigurasi MCP Workspace:** [`.mcp.json`](file:///c:/Users/MyBook%20Hype%20AMD/OneDrive/Desktop/ricat/.mcp.json)

---

## 2. Cara Kerja Integrasi

Terdapat dua mode penggunaan:

### A. Mode Headless (Otomatis oleh Antigravity)
Konfigurasi saat ini di `.mcp.json` dan plugin Antigravity menggunakan mode headless:
```json
{
  "mcpServers": {
    "artcraft-figcraft": {
      "command": "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat/tools/artcraft-figcraft/figcraft-cli.exe",
      "args": [
        "mcp",
        "--automation-write-root",
        "c:/Users/MyBook Hype AMD/OneDrive/Desktop/ricat"
      ]
    }
  }
}
```
Pada mode ini, Antigravity dapat langsung memanipulasi dokumen `.figcraft`, membuat frame, export PNG/SVG, dan inspeksi layout tanpa perlu membuka jendela aplikasi.

### B. Mode GUI Terhubung (Live UI Sync)
Jika ingin melihat perubahan desain secara langsung di layar saat AI bekerja:
1. Jalankan aplikasi desktop dengan control port:
   ```powershell
   & "tools\artcraft-figcraft\figcraft.exe" --control 3055
   ```
2. Hubungkan MCP dengan flag `--attach 3055`:
   ```powershell
   & "tools\artcraft-figcraft\figcraft-cli.exe" mcp --attach 3055
   ```
