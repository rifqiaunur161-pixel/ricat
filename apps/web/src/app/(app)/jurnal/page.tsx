"use client";

import React, { useState } from "react";
import {
  BookMarked,
  Target,
  FlaskConical,
  Trophy,
  AlertOctagon,
  Copy,
  Check,
  Search,
  UploadCloud,
  Share2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function RingkasJurnalPage() {
  const [citationFormat, setCitationFormat] = useState<"APA" | "IEEE" | "BibTeX">("APA");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [doiInput, setDoiInput] = useState("10.1109/TITS.2023.3289110");

  const citationStrings = {
    APA: "Al-Khatib, M., & Zhang, Y. (2023). Adaptive graph traversal in dense multi-modal urban traffic networks. IEEE Transactions on Intelligent Transportation Systems, 24(8), 8412-8425.",
    IEEE: 'M. Al-Khatib and Y. Zhang, "Adaptive graph traversal in dense multi-modal urban traffic networks," IEEE Trans. Intell. Transp. Syst., vol. 24, no. 8, pp. 8412-8425, Aug. 2023.',
    BibTeX: `@article{alkhatib2023adaptive,
  author={Al-Khatib, M. and Zhang, Y.},
  journal={IEEE Transactions on Intelligent Transportation Systems}, 
  title={Adaptive graph traversal in dense multi-modal urban traffic networks}, 
  year={2023},
  volume={24},
  number={8},
  pages={8412-8425}
}`,
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationStrings[citationFormat]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyzeDoi = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Ringkasan Jurnal Akademik Terstruktur
            </h1>
            <p className="text-xs text-muted-foreground">
              Ekstraksi metodologi, data empiris, dan temuan kunci tanpa risiko halusinasi.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Mengunggah berkas PDF jurnal...")}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all border border-border"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Unggah PDF Jurnal</span>
        </button>
      </div>

      {/* DOI or URL Search Bar */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={doiInput}
              onChange={(e) => setDoiInput(e.target.value)}
              placeholder="Masukkan nomor DOI (misal: 10.1145/...) atau tautan jurnal..."
              className="w-full bg-accent/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleAnalyzeDoi}
            disabled={isProcessing}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isProcessing ? "Menganalisis Naskah..." : "Ekstrak 4-Pilar"}</span>
          </button>
        </div>
      </div>

      {/* Journal Title & Meta */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
            IEEE Q1 Scopus
          </span>
          <span>Tahun Publikasi: 2023</span>
          <span>•</span>
          <span>Sitasi: 142 kali</span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
          Adaptive Graph Traversal in Dense Multi-Modal Urban Traffic Networks
        </h2>

        <p className="text-xs text-muted-foreground">
          Penulis: Mansour Al-Khatib, Yifan Zhang (Department of Civil and Environmental Engineering)
        </p>
      </div>

      {/* 4 Pillars Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pilar 1: Tujuan Penelitian */}
        <div className="glass-card rounded-2xl p-5 border border-border space-y-3">
          <div className="flex items-center gap-2.5 text-primary">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              1. Tujuan Penelitian
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Menyelesaikan masalah kemacetan non-linier pada persimpangan kota padat dengan merumuskan model pencarian graf heuristik multi-modal yang memperhitungkan waktu tunggu transit publik dan penundaan lampu sinyal secara dinamis.
          </p>
        </div>

        {/* Pilar 2: Metodologi & Data */}
        <div className="glass-card rounded-2xl p-5 border border-border space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-500">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              2. Metodologi & Sampel Data
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pengujian empiris dilakukan pada koridor transportasi Kota Seoul yang memuat 14.800 simpul jalan dan 32 trayek bus. Simulasi menggunakan kerangka kerja SUMO (Simulation of Urban MObility) dengan kalibrasi sensor detektor induktif loop selama 90 hari kerja.
          </p>
        </div>

        {/* Pilar 3: Temuan Kunci */}
        <div className="glass-card rounded-2xl p-5 border border-border space-y-3">
          <div className="flex items-center gap-2.5 text-blue-500">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              3. Temuan Kunci (Empirical Results)
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Algoritma yang diusulkan mereduksi waktu perjalanan rata-rata sebesar 22.4% pada jam sibuk (p &lt; 0.001) dan memotong konsumsi memori graf hingga 34% berkat pemangkasan simpul rute redundan secara proaktif.
          </p>
        </div>

        {/* Pilar 4: Keterbatasan & Arah Riset */}
        <div className="glass-card rounded-2xl p-5 border border-border space-y-3">
          <div className="flex items-center gap-2.5 text-amber-500">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              4. Keterbatasan & Arah Masa Depan
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Model mengasumsikan kepatuhan pengemudi 100% terhadap instruksi navigasi. Studi masa depan perlu mengintegrasikan perilaku stokastik pengendara lokal dan kejadian darurat tak terduga (misal cuaca ekstrem).
          </p>
        </div>
      </div>

      {/* Auto Citation Generator Section */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Format Sitasi Standar Karya Ilmiah
            </h3>
            <p className="text-xs text-muted-foreground">
              Gunakan langsung pada daftar pustaka tugas akhir atau skripsi.
            </p>
          </div>

          {/* Format Tabs */}
          <div className="flex items-center bg-accent/40 rounded-xl p-1 border border-border">
            {(["APA", "IEEE", "BibTeX"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setCitationFormat(fmt)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  citationFormat === fmt
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 flex items-start justify-between gap-4">
          <pre className="font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap break-all">
            {citationStrings[citationFormat]}
          </pre>

          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-all shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Sitasi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

