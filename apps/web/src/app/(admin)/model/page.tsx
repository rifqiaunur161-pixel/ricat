"use client";

import React, { useState } from "react";
import {
  Cpu,
  CheckCircle,
  AlertTriangle,
  Zap,
  Shield,
  Layers,
  ArrowUpDown,
  Sliders,
  DollarSign,
} from "lucide-react";

interface AIModelConfig {
  id: string;
  name: string;
  provider: string;
  tier: "Default" | "High-Reasoning" | "Offline-Local";
  latencyMs: number;
  errorRate: number;
  costPer1MInput: number;
  costPer1MOutput: number;
  enabled: boolean;
  priority: number;
}

export default function ModelAdminPage() {
  const [models, setModels] = useState<AIModelConfig[]>([
    {
      id: "gemini-flash",
      name: "Gemini 2.5 Flash",
      provider: "Google Cloud Vertex AI",
      tier: "Default",
      latencyMs: 380,
      errorRate: 0.12,
      costPer1MInput: 0.075,
      costPer1MOutput: 0.30,
      enabled: true,
      priority: 1,
    },
    {
      id: "claude-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      tier: "High-Reasoning",
      latencyMs: 820,
      errorRate: 0.05,
      costPer1MInput: 3.0,
      costPer1MOutput: 15.0,
      enabled: true,
      priority: 2,
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o-mini",
      provider: "OpenAI",
      tier: "Default",
      latencyMs: 440,
      errorRate: 0.18,
      costPer1MInput: 0.15,
      costPer1MOutput: 0.60,
      enabled: true,
      priority: 3,
    },
    {
      id: "deepseek-r1-local",
      name: "DeepSeek-R1-Distill (Local vLLM)",
      provider: "Server Kampus Internal",
      tier: "Offline-Local",
      latencyMs: 650,
      errorRate: 0.02,
      costPer1MInput: 0.0,
      costPer1MOutput: 0.0,
      enabled: true,
      priority: 4,
    },
  ]);

  const toggleModel = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Matriks Model AI & Rantai Cadangan (Fallback)
            </h1>
            <p className="text-xs text-muted-foreground">
              Konfigurasi orkestrasi model jika kuota batas habis atau terjadi galat penyedia.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Menyimpan konfigurasi perutean model...")}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
        >
          Terapkan Perubahan
        </button>
      </div>

      {/* Model Cards List */}
      <div className="space-y-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={`glass-card rounded-2xl p-5 border transition-all ${
              model.enabled ? "border-border" : "border-border/40 opacity-60"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-bold text-foreground shrink-0 font-mono text-sm">
                  #{model.priority}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">{model.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground font-medium">
                      {model.provider}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Kategori Penggunaan: <strong>{model.tier}</strong>
                  </p>
                </div>
              </div>

              {/* Metrics Pill Grid */}
              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Latensi Rata-rata</span>
                  <span className="font-mono font-semibold text-foreground">
                    {model.latencyMs} ms
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Tingkat Galat</span>
                  <span
                    className={`font-mono font-semibold ${
                      model.errorRate > 0.1 ? "text-amber-500" : "text-emerald-500"
                    }`}
                  >
                    {model.errorRate}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Biaya Input/Output</span>
                  <span className="font-mono font-semibold text-foreground">
                    ${model.costPer1MInput} / ${model.costPer1MOutput}
                  </span>
                </div>

                {/* Enable / Disable Toggle Switch */}
                <button
                  onClick={() => toggleModel(model.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    model.enabled ? "bg-primary" : "bg-accent"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      model.enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

