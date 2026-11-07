"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/chat";
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-border shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto shadow-lg shadow-primary/25">
            R
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Masuk ke ricat
          </h1>
          <p className="text-xs text-muted-foreground">
            Asisten Akademik Cerdas Khusus Mahasiswa Indonesia
          </p>
        </div>

        {/* Campus SSO Button */}
        <div>
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                window.location.href = "/chat";
              }, 800);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent/80 border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Masuk Lewat SSO Kampus (.ac.id)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-border flex-1" />
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
            atau dengan email
          </span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Email Mahasiswa
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@mahasiswa.itb.ac.id"
                className="w-full bg-accent/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">
                Kata Sandi
              </label>
              <a href="#" className="text-[11px] text-primary hover:underline">
                Lupa sandi?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-accent/40 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? "Memverifikasi..." : "Masuk ke Akun"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Belum memiliki akun mahasiswa?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

