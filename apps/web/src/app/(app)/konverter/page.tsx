"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  Minimize2,
  UploadCloud,
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Sliders,
  Settings2,
  FileType,
} from "lucide-react";

type ModeType = "convert" | "compress";

interface FileItem {
  id: string;
  name: string;
  originalSize: number; // in KB
  targetFormat?: string;
  compressedSize?: number;
  status: "idle" | "processing" | "done";
  progress: number;
}

export default function KonverterPage() {
  const [mode, setMode] = useState<ModeType>("convert");
  const [selectedFormat, setSelectedFormat] = useState<string>("PDF");
  const [compressionPreset, setCompressionPreset] = useState<number>(50); // % quality reduction
  const [campusLimit, setCampusLimit] = useState<"siak" | "turnitin" | "beasiswa" | "custom">("siak");

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Tugas_Akhir_Bab_1_3_Final.docx",
      originalSize: 8450, // 8.45 MB
      targetFormat: "PDF",
      compressedSize: 3120, // 3.12 MB
      status: "done",
      progress: 100,
    },
    {
      id: "2",
      name: "Slide_Presentasi_Metodologi.pptx",
      originalSize: 14200, // 14.2 MB
      targetFormat: "PDF",
      compressedSize: 4890,
      status: "idle",
      progress: 0,
    },
  ]);

  const handleSimulateProcess = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 20 } : f))
    );

    let currentProgress = 20;
    const interval = setInterval(() => {
      currentProgress += 25;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  status: "done",
                  progress: 100,
                  compressedSize: Math.round(f.originalSize * (1 - compressionPreset / 100)),
                }
              : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: currentProgress } : f))
        );
      }
    }, 300);
  };

  const handleProcessAll = () => {
    files.forEach((f) => {
      if (f.status === "idle") {
        handleSimulateProcess(f.id);
      }
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (kb: number) => {
    if (kb >= 1024) {
      return `${(kb / 1024).toFixed(2)} MB`;
    }
    return `${kb} KB`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Header Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Konversi Format & Kompresi Berkas Kampus
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Sesuaikan dokumen makalah dan tugas dengan batas unggah portal akademik tanpa penurunan kualitas teks.
          </p>
        </div>

        {/* Mode Segmented Capsule */}
        <div className="flex items-center bg-accent/40 rounded-xl p-1 border border-border">
          <button
            onClick={() => setMode("convert")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "convert"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Ganti Format</span>
          </button>
          <button
            onClick={() => setMode("compress")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "compress"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Kompres Ukuran</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dropzone & Control Settings (4 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Zone */}
          <div className="glass-card rounded-2xl p-6 text-center border-2 border-dashed border-border/80 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Tarik berkas ke sini atau klik untuk memilih
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Mendukung PDF, DOCX, PPTX, XLSX, JPG, PNG (Hingga 50 MB)
            </p>
            <button
              onClick={() => {
                const newId = Date.now().toString();
                setFiles((prev) => [
                  ...prev,
                  {
                    id: newId,
                    name: `Dokumen_Baru_${prev.length + 1}.pdf`,
                    originalSize: 6200,
                    targetFormat: selectedFormat,
                    status: "idle",
                    progress: 0,
                  },
                ]);
              }}
              className="mt-4 px-4 py-2 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all"
            >
              Pilih Berkas Komputer
            </button>
          </div>

          {/* Conditional Options Box */}
          {mode === "convert" ? (
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
                <FileType className="w-4 h-4 text-primary" />
                Format Target Keluaran
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {["PDF", "DOCX", "PPTX", "TXT", "JPG", "PNG"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      selectedFormat === fmt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-primary" />
                Preset Standar Batas Portal Kampus
              </h3>
              <div className="space-y-2">
                {[
                  { id: "siak", label: "Maks. 5 MB", desc: "Portal SIAKAD / Kuliah Daring", pct: 55 },
                  { id: "turnitin", label: "Maks. 2 MB", desc: "Turnitin / Cek Plagiarisme", pct: 75 },
                  { id: "beasiswa", label: "Maks. 500 KB", desc: "Berkas Administrasi Beasiswa", pct: 85 },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCampusLimit(item.id as any);
                      setCompressionPreset(item.pct);
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      campusLimit === item.id
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-card border-border hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-foreground">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                    {campusLimit === item.id && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Tingkat Kompresi:</span>
                  <span className="font-bold text-foreground">{compressionPreset}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={compressionPreset}
                  onChange={(e) => {
                    setCompressionPreset(Number(e.target.value));
                    setCampusLimit("custom");
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Kualitas Tinggi (20%)</span>
                  <span>Ukuran Terkecil (90%)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Files Processing List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-5 flex flex-col min-h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Daftar Antrean Berkas ({files.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Semua pemrosesan berkas dienkripsi dan dihapus otomatis setelah 2 jam.
                </p>
              </div>

              {files.length > 0 && (
                <button
                  onClick={handleProcessAll}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
                >
                  Proses Semua
                </button>
              )}
            </div>

            {/* List */}
            <div className="mt-4 space-y-3 flex-1 overflow-y-auto">
              {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileText className="w-10 h-10 text-muted-foreground/40 mb-2" />
                  <p className="text-sm font-medium text-foreground">Belum ada berkas dipilih</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unggah dokumen skripsi atau tugas untuk memulai konversi.
                  </p>
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 rounded-xl bg-card/60 border border-border/80 flex flex-col gap-3 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate max-w-[260px] sm:max-w-md">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                            <span>Ukuran Asli: {formatSize(file.originalSize)}</span>
                            {file.compressedSize && (
                              <>
                                <span>→</span>
                                <span className="text-emerald-500 font-bold">
                                  {formatSize(file.compressedSize)} (
                                  {Math.round(
                                    ((file.originalSize - file.compressedSize) /
                                      file.originalSize) *
                                      100
                                  )}
                                  % lebih hemat)
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Bar for processing */}
                    {file.status === "processing" && (
                      <div className="space-y-1">
                        <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground text-right">
                          Memproses... {file.progress}%
                        </p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                      <div className="flex items-center gap-2">
                        {file.status === "done" ? (
                          <span className="flex items-center gap-1 text-emerald-500 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Siap Diunduh
                          </span>
                        ) : file.status === "processing" ? (
                          <span className="text-primary font-medium">Sedang memproses</span>
                        ) : (
                          <span className="text-muted-foreground">Menunggu instruksi</span>
                        )}
                      </div>

                      <div>
                        {file.status === "done" ? (
                          <button
                            onClick={() => alert(`Mengunduh ${file.name}...`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all text-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Unduh Hasil</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSimulateProcess(file.id)}
                            disabled={file.status === "processing"}
                            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all text-xs"
                          >
                            {mode === "convert" ? "Mulai Konversi" : "Mulai Kompres"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

