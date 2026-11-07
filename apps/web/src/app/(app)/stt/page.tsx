"use client";

import React, { useState } from "react";
import {
  Mic,
  Square,
  Play,
  Pause,
  Upload,
  Volume2,
  Sparkles,
  Download,
  Copy,
  Clock,
  User,
  SlidersHorizontal,
  FileCheck,
} from "lucide-react";

interface TranscriptSegment {
  id: string;
  speaker: string;
  role: "lecturer" | "student";
  time: string;
  seconds: number;
  text: string;
}

export default function SpeechToTextPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(12);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [segments, setSegments] = useState<TranscriptSegment[]>([
    {
      id: "1",
      speaker: "Prof. Dr. Ir. Hendrawan",
      role: "lecturer",
      time: "00:04",
      seconds: 4,
      text: "Selamat pagi rekan-rekan mahasiswa. Hari ini kita membahas kompleksitas asimtotik Big O pada algoritma graf dinamis.",
    },
    {
      id: "2",
      speaker: "Prof. Dr. Ir. Hendrawan",
      role: "lecturer",
      time: "00:28",
      seconds: 28,
      text: "Perhatikan bahwa jika representasi ketetanggan menggunakan matriks, ruang memori berorde O(V kuadrat). Namun jika menggunakan daftar ketetanggan berantai, kita bisa menghemat ruang menjadi O(V + E).",
    },
    {
      id: "3",
      speaker: "Budi Santoso (Mahasiswa)",
      role: "student",
      time: "01:15",
      seconds: 75,
      text: "Izin bertanya Prof, apakah daftar ketetanggan selalu lebih unggul jika graf bersifat sangat padat atau dense?",
    },
    {
      id: "4",
      speaker: "Prof. Dr. Ir. Hendrawan",
      role: "lecturer",
      time: "01:32",
      seconds: 92,
      text: "Pertanyaan bagus. Pada graf padat di mana E mendekati V kuadrat, operasi pengecekan relasi dua simpul pada matriks berkecepatan O(1), sehingga matriks kerap lebih efisien secara cache memory.",
    },
  ]);

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setShowSummaryModal(true);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Speech-to-Text Kuliah & Diarisasi Suara
            </h1>
            <p className="text-xs text-muted-foreground">
              Transkripsi rekaman kuliah tatap muka atau daring berbasis OpenAI Whisper Large-v3.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSummarizing ? "Meringkas Poin..." : "Rangkum Catatan Kuliah"}</span>
          </button>
        </div>
      </div>

      {/* Recording & Player Controller Card */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Record Button & Status */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleToggleRecord}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isRecording
                  ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30"
                  : "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20"
              }`}
            >
              {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div>
              <p className="text-xs font-semibold text-foreground">
                {isRecording ? "Merekam Langsung dari Mikrofon..." : "Siap Merekam Kuliah"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isRecording ? "Durasi: 04:32 • 44.1 kHz FLAC" : "Atau unggah berkas .mp3, .m4a, .wav"}
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => alert("Membuka pemilihan berkas audio...")}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all border border-border"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Berkas Audio</span>
          </button>
        </div>

        {/* Audio Waveform Simulator */}
        <div className="pt-2 border-t border-border/60">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="p-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Visual Waveform Bars */}
            <div className="flex-1 flex items-center gap-1 h-9 px-2 bg-card/60 rounded-xl border border-border/80 overflow-hidden">
              {[
                30, 60, 45, 80, 100, 75, 40, 20, 50, 85, 95, 60, 40, 70, 90, 50, 30, 65, 85, 45,
                30, 55, 75, 90, 65, 40, 50, 80, 100, 70, 35, 60, 90, 80, 45, 25, 55, 70, 40, 20,
              ].map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    i < 15 ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            {/* Playback Speed Pill */}
            <div className="flex items-center gap-1 bg-accent/40 rounded-xl p-1 border border-border">
              {[1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                    playbackSpeed === spd
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Stream */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Transkripsi Berdasarkan Pembicara (Diarisasi)
            </h2>
            <p className="text-xs text-muted-foreground">
              Klik stempel waktu untuk memutar audio tepat pada detik tersebut.
            </p>
          </div>

          <button
            onClick={() => alert("Menyalin seluruh transkrip...")}
            className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Teks Lengkap</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className={`p-4 rounded-xl border transition-all ${
                seg.role === "lecturer"
                  ? "bg-card/70 border-border"
                  : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      seg.role === "lecturer"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-foreground"
                    }`}
                  >
                    {seg.role === "lecturer" ? "D" : "M"}
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {seg.speaker}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      seg.role === "lecturer"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent text-muted-foreground"
                    }`}
                  >
                    {seg.role === "lecturer" ? "Dosen Pengampu" : "Mahasiswa"}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentSeconds(seg.seconds)}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  <Clock className="w-3 h-3" />
                  <span>{seg.time}</span>
                </button>
              </div>

              <p className="text-xs text-foreground leading-relaxed pl-8">
                {seg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Dialog Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card max-w-xl w-full rounded-2xl p-6 space-y-4 border border-border shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Catatan Intisari Kuliah Otomatis
                </h3>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Tutup
              </button>
            </div>

            <div className="text-xs text-foreground space-y-3 leading-relaxed">
              <div className="p-3 rounded-xl bg-accent/40 border border-border">
                <p className="font-bold text-foreground mb-1">Materi Utama:</p>
                <p className="text-muted-foreground">
                  Perbandingan representasi Graf antara Matriks Ketetanggan vs Adjacency List.
                </p>
              </div>

              <div>
                <p className="font-bold text-foreground mb-1">Poin Kunci Kuliah:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Matriks Ketetanggan membutuhkan memori O(V²), cocok untuk graf rapat.</li>
                  <li>Daftar Ketetanggan menghemat memori menjadi O(V + E), ideal untuk graf jarang (sparse).</li>
                  <li>Pengecekan hubungan dua simpul pada matriks konstan O(1) karena lokalitas cache memori.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  alert("Rangkuman tersimpan ke materi belajar!");
                  setShowSummaryModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
              >
                Simpan ke Rangkuman Belajar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

