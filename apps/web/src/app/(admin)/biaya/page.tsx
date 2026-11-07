"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  PieChart,
  Calendar,
  Download,
} from "lucide-react";

export default function BiayaAdminPage() {
  const [budgetCap, setBudgetCap] = useState(150); // in USD
  const currentSpent = 48.25;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Analitik Biaya API & Pagu Anggaran Kampus
            </h1>
            <p className="text-xs text-muted-foreground">
              Pemantauan pengeluaran token komputasi model AI per bulan kalender.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Mengunduh rekapitulasi biaya (CSV)...")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all border border-border"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor Faktur</span>
        </button>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-border space-y-2">
          <span className="text-xs text-muted-foreground">Realisasi Pengeluaran Berjalan</span>
          <p className="text-2xl font-bold text-foreground font-mono">
            ${currentSpent.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-500 font-semibold">
            {((currentSpent / budgetCap) * 100).toFixed(1)}% dari pagu $ {budgetCap}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-border space-y-2">
          <span className="text-xs text-muted-foreground">Estimasi Akhir Bulan</span>
          <p className="text-2xl font-bold text-foreground font-mono">$82.40</p>
          <p className="text-[11px] text-muted-foreground">
            Aman dalam batas pagu yang ditetapkan
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-border space-y-2">
          <span className="text-xs text-muted-foreground">Total Token Diproses</span>
          <p className="text-2xl font-bold text-foreground font-mono">18.4 Juta</p>
          <p className="text-[11px] text-primary font-semibold">
            Efisiensi Cache Prompt: 64%
          </p>
        </div>
      </div>

      {/* Provider Breakdown */}
      <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
        <h2 className="text-sm font-bold text-foreground">
          Rincian Biaya Berdasarkan Penyedia Model
        </h2>

        <div className="space-y-3">
          {[
            { provider: "Google Cloud Vertex AI (Gemini 2.5 Flash)", spent: 12.45, pct: 25 },
            { provider: "Anthropic (Claude 3.5 Sonnet)", spent: 28.10, pct: 58 },
            { provider: "OpenAI (GPT-4o-mini & Whisper-v3)", spent: 7.70, pct: 17 },
            { provider: "Local DeepSeek Server (Internal ITB/UI)", spent: 0.0, pct: 0 },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{item.provider}</span>
                <span className="font-mono font-bold text-foreground">
                  ${item.spent.toFixed(2)} ({item.pct}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

