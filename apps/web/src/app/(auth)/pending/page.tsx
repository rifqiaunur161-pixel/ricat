"use client";

import React from "react";
import Link from "next/link";
import { Clock, ShieldCheck, ArrowLeft, Mail } from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-border shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <Clock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Akun Sedang Diverifikasi
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Data NIM dan email institusi Anda sedang diperiksa oleh administrator kampus. Proses verifikasi berkas memakan waktu maksimal 1x24 jam kerja.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-accent/30 border border-border text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Kriteria Persetujuan Kampus:</span>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside">
            <li>NIM aktif terdaftar di PDDikti Kemendikbud</li>
            <li>Menggunakan email domain resmi (.ac.id)</li>
            <li>Bukan akun ganda atau bot otomatis</li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/chat"
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>Masuk ke Mode Tamu (Terbatas)</span>
          </Link>

          <Link
            href="/login"
            className="w-full py-2 px-4 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

