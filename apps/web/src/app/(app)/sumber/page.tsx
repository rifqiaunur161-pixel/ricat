"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  UploadCloud,
  CheckCircle,
  Copy,
} from "lucide-react";

interface QnAItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  citation?: {
    page: number;
    quote: string;
  };
}

export default function SumberPdfPage() {
  const [currentPage, setCurrentPage] = useState<number>(14);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [inputQuery, setInputQuery] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const [chatMessages, setChatMessages] = useState<QnAItem[]>([
    {
      id: "1",
      sender: "user",
      text: "Bagaimana cara kerja algoritma penyeimbang beban pada modul sistem terdistribusi ini?",
    },
    {
      id: "2",
      sender: "ai",
      text: "Berdasarkan modul pada Halaman 14, sistem menggunakan algoritma Consistent Hashing dengan replikasi virtual nodes untuk meminimalkan perpindahan kunci saat penambahan server baru. Mekanisme ini mencegah terjadinya lonjakan beban (hotspot) dengan mendistribusikan lalu lintas secara merata.",
      citation: {
        page: 14,
        quote: "Mekanisme consistent hashing menjamin partisi kunci terdistribusi seimbang dengan variansi beban di bawah 5% antar node.",
      },
    },
  ]);

  const handleSend = () => {
    if (!inputQuery.trim()) return;
    const userMsg: QnAItem = {
      id: Date.now().toString(),
      sender: "user",
      text: inputQuery,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsAnswering(true);

    setTimeout(() => {
      const aiMsg: QnAItem = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Pada Bab 3 Halaman 18 dijelaskan bahwa konsistensi data dijaga melalui protokol Raft consensus. Setiap transaksi membutuhkan persetujuan kuorum mayoritas simpul aktif sebelum ditulis ke penyimpanan permanen.",
        citation: {
          page: 18,
          quote: "Protokol konsensus Raft memastikan state machine safety dalam kondisi toleransi kesalahan partisi jaringan.",
        },
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAnswering(false);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Tanya Modul Kuliah & Skripsi (RAG PDF)
            </h1>
            <p className="text-xs text-muted-foreground">
              Dokumen aktif: <strong>Modul_Sistem_Terdistribusi_2024.pdf</strong> (42 Halaman)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Membuka dialog unggah berkas...")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all border border-border"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Ganti Dokumen</span>
          </button>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Column: PDF Reader Viewer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col glass-card rounded-2xl overflow-hidden border border-border">
          {/* PDF Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/60">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-foreground">
                Halaman {currentPage} dari 42
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(42, p + 1))}
                className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Halaman Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Perkecil"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-muted-foreground">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Perbesar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Body Simulation */}
          <div className="flex-1 p-6 overflow-y-auto bg-card/40 flex justify-center">
            <div
              className="w-full max-w-2xl bg-background rounded-xl p-8 shadow-sm border border-border/80 transition-all space-y-4"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            >
              <div className="border-b border-border/60 pb-3 flex justify-between text-xs text-muted-foreground font-mono">
                <span>BAB 3: KONSISTENSI & PARTISI</span>
                <span>HALAMAN {currentPage}</span>
              </div>

              <h2 className="text-base font-bold text-foreground">
                3.{currentPage - 10} Arsitektur Desain Consistent Hashing
              </h2>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Dalam sistem terdistribusi berskala besar, penambahan atau pengurangan simpul tidak boleh memicu redistribusi data secara menyeluruh. Pendekatan modulus standar memiliki kompleksitas pemindahan kunci yang tidak proporsional saat terjadi kegagalan server tunggal.
              </p>

              {/* Highlighted Citation Snippet */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                <span className="text-[10px] font-bold text-amber-500 block mb-1 uppercase tracking-wider">
                  Kutipan Rujukan AI
                </span>
                <p className="font-serif italic text-foreground leading-relaxed">
                  "Mekanisme consistent hashing menjamin partisi kunci terdistribusi seimbang dengan variansi beban di bawah 5% antar node."
                </p>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Dengan menempatkan simpul dan kunci pada lingkaran cincin hash virtual yang sama, setiap simpul bertanggung jawab atas rentang busur tertentu. Beban dapat diseimbangkan dengan menambahkan simpul replika acak.
              </p>

              <div className="p-4 rounded-xl bg-accent/40 border border-border text-center text-xs text-muted-foreground font-mono">
                [Diagram Alur Partisi Hash Cincin Virtual terlampir pada Gambar 3.4]
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Q&A Chat With Citations (5 cols) */}
        <div className="lg:col-span-5 flex flex-col glass-card rounded-2xl overflow-hidden border border-border">
          <div className="px-5 py-3.5 border-b border-border bg-card/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                Tanya Jawab Dokumen
              </h2>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              RAG Akurat 100%
            </span>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[480px]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card border border-border text-foreground rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Citation Pill */}
                  {msg.citation && (
                    <div className="mt-3 pt-2.5 border-t border-border/60">
                      <button
                        onClick={() => setCurrentPage(msg.citation!.page)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-semibold transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Buka Halaman {msg.citation.page}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAnswering && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>Membaca konteks modul dan memverifikasi kutipan...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-border bg-card/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Tanyakan rumus, teori, atau isi halaman modul..."
                className="flex-1 bg-accent/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isAnswering}
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

