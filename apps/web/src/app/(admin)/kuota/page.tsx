"use client";

import React, { useState } from "react";
import {
  Sliders,
  Shield,
  Zap,
  RotateCcw,
  AlertCircle,
  Save,
  CheckCircle2,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function KuotaAdminPage() {
  const [studentDailyQuota, setStudentDailyQuota] = useState(50000);
  const [researcherDailyQuota, setResearcherDailyQuota] = useState(150000);
  const [rateLimitPerMinute, setRateLimitPerMinute] = useState(15);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Alokasi Batas Kuota Token Harian
            </h1>
            <p className="text-xs text-muted-foreground">
              Kendali kuota harian mahasiswa dan batas laju panggilan per menit (Rate Limiting).
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Konfigurasi</span>
        </button>
      </div>

      {savedNotification && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Perubahan kuota berhasil disimpan dan langsung berlaku untuk sesi baru.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Mahasiswa Reguler */}
        <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">
              Tier 1: Mahasiswa S1 / D3 Reguler
            </h2>
            <span className="text-xs font-mono font-bold text-primary">
              {formatNumber(studentDailyQuota)} Token / Hari
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Mencakup tugas rutin, ringkasan materi harian, dan kuis belajar. Reset otomatis pada pukul 00:00 WIB.
          </p>

          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={studentDailyQuota}
            onChange={(e) => setStudentDailyQuota(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>10.000 Token</span>
            <span>100.000 Token</span>
          </div>
        </div>

        {/* Tier Mahasiswa Tingkat Akhir / Riset */}
        <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">
              Tier 2: Mahasiswa Skripsi & Asisten Lab
            </h2>
            <span className="text-xs font-mono font-bold text-primary">
              {formatNumber(researcherDailyQuota)} Token / Hari
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Diberikan akses lebih luas untuk ekstraksi modul skripsi tebal dan ringkasan jurnal multidimensi.
          </p>

          <input
            type="range"
            min="50000"
            max="300000"
            step="10000"
            value={researcherDailyQuota}
            onChange={(e) => setResearcherDailyQuota(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>50.000 Token</span>
            <span>300.000 Token</span>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="glass-card rounded-2xl p-6 border border-border space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-foreground">
                Batas Frekuensi Panggilan (Rate Limiting)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mencegah bot spamming dan serangan Denial of Service (DoS) lokal.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-primary">
              {rateLimitPerMinute} Permintaan / Menit
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={rateLimitPerMinute}
            onChange={(e) => setRateLimitPerMinute(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>5 req/min (Sangat Ketat)</span>
            <span>60 req/min (Fleksibel)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

