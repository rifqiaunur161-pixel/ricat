"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, ArrowRight, RotateCcw } from "lucide-react";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      window.location.href = "/pending";
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-border shadow-2xl space-y-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto">
          <KeyRound className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Verifikasi Email Kampus
          </h1>
          <p className="text-xs text-muted-foreground">
            Masukkan 6 digit kode yang dikirim ke email mahasiswa Anda.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold font-mono bg-accent/40 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.some((d) => !d)}
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>{isVerifying ? "Memverifikasi..." : "Konfirmasi Kode"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <span>Tidak menerima kode?</span>
          <button
            onClick={() => alert("Kode baru telah dikirimkan ke email.")}
            className="text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Kirim Ulang
          </button>
        </div>
      </div>
    </div>
  );
}

