"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Bell,
  Mail,
  Video,
  Sun,
  Clock,
  ChevronDown,
  Calendar,
  Layers,
  FileText,
  FileCode,
  CheckCircle,
  XCircle,
  AlertOctagon,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Sliders,
  Users,
  Activity,
  MoreHorizontal,
  Folder,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeFilter, setTimeFilter] = useState<"Day" | "Week" | "Month" | "Year">("Month");
  const [killSwitchActive, setKillSwitchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Top Header Bar matching Reference 2 */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Management
          </h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Calendar className="w-3.5 h-3.5" />
              November 7, 2026
            </span>
            <span>•</span>
            <span>Kampus Dashboard Admin</span>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Timeframe pill */}
          <div className="flex items-center bg-card/70 border border-border rounded-2xl p-1 shadow-sm">
            {(["Day", "Week", "Month", "Year"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  timeFilter === period
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type searching..."
              className="w-full bg-card/70 border border-border rounded-2xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>

          {/* Quick round action pills */}
          <button className="w-10 h-10 rounded-2xl bg-card/70 border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors shadow-sm">
            <Video className="w-4 h-4" />
          </button>

          <button className="relative w-10 h-10 rounded-2xl bg-card/70 border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              9
            </span>
          </button>
        </div>
      </div>

      {/* Emergency Kill Switch Banner (PRD Requirement) */}
      <div
        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          killSwitchActive
            ? "bg-rose-500/15 border-rose-500 text-rose-500"
            : "glass-card border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              killSwitchActive ? "bg-rose-500 text-white" : "bg-primary/10 text-primary"
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              Tombol Darurat AI (Emergency Kill Switch)
              {killSwitchActive && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                  AKTIF: SELURUH PEMANGGILAN API DIBLOKIR
                </span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground">
              Putus pemanggilan LLM eksternal secara instan bila terdeteksi lonjakan kuota atau serangan tak terduga.
            </p>
          </div>
        </div>

        <button
          onClick={() => setKillSwitchActive(!killSwitchActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            killSwitchActive
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-card border border-border hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-500 text-foreground"
          }`}
        >
          {killSwitchActive ? "Nonaktifkan Kill Switch" : "Aktifkan Kill Switch"}
        </button>
      </div>

      {/* Main Grid: Reference 2 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section: Timeline & Projects (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gantt / Timeline Card */}
          <div className="glass-card rounded-3xl p-6 border border-border space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Aktivitas Pemrosesan LLM & Antrean
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Waktu Server (WIB)</span>
            </div>

            {/* Visual Timeline Rows */}
            <div className="space-y-4">
              {[
                { title: "RAG Modul PDF", duration: "about 2 hours", offset: "20%", width: "45%" },
                { title: "Speech-to-Text Whisper", duration: "about 5 hours", offset: "35%", width: "50%" },
                { title: "Kompresi Berkas", duration: "about 5 hours", offset: "50%", width: "40%" },
                { title: "Ringkas Jurnal Ilmiah", duration: "about 3 hours", offset: "15%", width: "60%" },
                { title: "Generate Soal Kuis", duration: "about 3 hours", offset: "40%", width: "35%" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-32 text-xs font-medium text-muted-foreground truncate">
                    {row.title}
                  </span>
                  <div className="flex-1 h-10 bg-accent/20 rounded-2xl relative flex items-center p-1">
                    <div
                      className="h-8 rounded-xl bg-card border border-border shadow-sm flex items-center justify-between px-3 text-[11px] font-semibold text-foreground absolute"
                      style={{ left: row.offset, width: row.width }}
                    >
                      <span className="truncate">{row.duration}</span>
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] shrink-0 ml-2">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Time markers */}
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono pt-2 border-t border-border/40 pl-36">
              <span>1 PM</span>
              <span>2 PM</span>
              <span>3 PM</span>
              <span>4 PM</span>
              <span>5 PM</span>
              <span>6 PM</span>
              <span>7 PM</span>
              <span>8 PM</span>
            </div>
          </div>

          {/* Bottom Left: All Files Capsule List & Team Details (split 5/7) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* All Files Capsule List (5 cols) */}
            <div className="md:col-span-5 glass-card rounded-3xl p-5 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-bold text-foreground">All files</span>
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Capsule file items matching reference */}
              <div className="space-y-2.5">
                {[
                  { name: "Licence on Figma templaters.pdf", ext: "pdf" },
                  { name: "Devspire_UI-Kit.fig", ext: "fig" },
                  { name: "Devspire redesign.word", ext: "doc" },
                  { name: "National Bank.fig", ext: "fig" },
                ].map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-full bg-card/70 border border-border hover:border-primary/40 flex items-center gap-3 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground truncate flex-1">
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team / Live Metrics Section (7 cols) */}
            <div className="md:col-span-7 glass-card rounded-3xl p-5 border border-border space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">Team</span>
                  <span className="w-5 h-5 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center">
                    +5
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Total Users</span>
                    <strong className="text-foreground">1240</strong>
                    <span className="text-emerald-500 text-[10px] ml-1">+124</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Active Users</span>
                    <strong className="text-foreground">562</strong>
                    <span className="text-emerald-500 text-[10px] ml-1">+124</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Dynamics</span>
                    <strong className="text-foreground">25</strong>
                  </div>
                </div>
              </div>

              {/* Dark container sub-card with equalizer / progress bars matching Reference 2 */}
              <div className="rounded-2xl p-4 bg-black/90 text-white border border-border/40 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-white">UX UI Design</p>
                    <p className="text-[10px] text-neutral-400">Design and creative</p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
                      <span>PROGRESS</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                      <div className="w-1/5 h-full bg-white" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">Marketing</p>
                    <p className="text-[10px] text-neutral-400">Design and creative</p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
                      <span>PROGRESS</span>
                      <span>70%</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                      <div className="w-[70%] h-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Development with frequency bars */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-white">Development Server</p>
                    <p className="text-[10px] text-neutral-400">Cluster 01 - Jakarta</p>
                  </div>
                  <div className="flex items-end gap-1 h-6">
                    {[3, 6, 8, 4, 10, 7, 5, 9, 12, 8, 4, 11].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white rounded-t-sm"
                        style={{ height: `${h * 2}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Ongoing projects & Obsidian File Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ongoing projects card with Trendline */}
          <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-foreground">Ongoing projects</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Sales trend</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">68,5%</p>
              <p className="text-[11px] text-muted-foreground">Compared to last month</p>
            </div>

            {/* Bezier Trendline SVG */}
            <div className="w-full h-24 relative flex items-center">
              <svg className="w-full h-full" viewBox="0 0 300 80" fill="none">
                <path
                  d="M10 60 C 60 10, 100 70, 160 30 C 210 0, 250 50, 290 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-foreground"
                />
                <path
                  d="M10 70 C 70 30, 110 80, 170 50 C 220 20, 260 70, 290 40"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="text-muted-foreground/60"
                />
              </svg>
            </div>

            {/* Trend Legend */}
            <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="text-muted-foreground">Finance</span>
                </div>
                <span className="font-semibold text-foreground">16 48,900</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Design Reviews</span>
                </div>
                <span className="font-semibold text-foreground">15,200</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">Other</span>
                </div>
                <span className="font-semibold text-foreground">00,00</span>
              </div>
            </div>
          </div>

          {/* High-Contrast Obsidian Black File Preview Card matching Reference 2 */}
          <div className="rounded-3xl p-6 bg-black text-white border border-neutral-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-semibold text-neutral-300">File Preview</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-neutral-400" />
            </div>

            {/* Liquid Sphere graphic container */}
            <div className="w-full h-44 rounded-2xl bg-neutral-950 flex items-center justify-center overflow-hidden relative border border-neutral-800">
              <Image
                src="/liquid-sphere.png"
                alt="Liquid 3D Sphere"
                width={160}
                height={160}
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-white">VirtualTourScope.mp4</p>
              <p className="text-[11px] text-neutral-400">2.5 GB, 01:14:15</p>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center gap-3">
              <Image
                src="/avatar.png"
                alt="Marta Adams"
                width={32}
                height={32}
                className="rounded-full ring-1 ring-neutral-700"
              />
              <div>
                <p className="text-xs font-semibold text-white">Marta Adams</p>
                <p className="text-[10px] text-neutral-400">Creative Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

