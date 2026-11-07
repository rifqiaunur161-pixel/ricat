"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Terminal,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  severity: "info" | "warn" | "error";
  action: string;
  user: string;
  ip: string;
  details: string;
}

export default function LogAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const logs: AuditLogEntry[] = [
    {
      id: "LOG-1049",
      timestamp: "2026-11-07 15:42:12",
      severity: "warn",
      action: "RATE_LIMIT_EXCEEDED",
      user: "13521045@mahasiswa.itb.ac.id",
      ip: "167.205.22.8",
      details: "Pengguna melampaui batas 15 permintaan/menit pada endpoint /api/chat",
    },
    {
      id: "LOG-1048",
      timestamp: "2026-11-07 15:39:05",
      severity: "info",
      action: "USER_LOGIN_SUCCESS",
      user: "ahmad.fauzan@ui.ac.id",
      ip: "152.118.24.19",
      details: "Autentikasi SSO kampus berhasil diselesaikan",
    },
    {
      id: "LOG-1047",
      timestamp: "2026-11-07 15:30:21",
      severity: "error",
      action: "SUSPICIOUS_DOMAIN_REJECTED",
      user: "temp_spammer@mailinator.com",
      ip: "45.132.88.102",
      details: "Pendaftaran ditolak karena domain email tidak terdaftar dalam whitelist PTN/PTS",
    },
    {
      id: "LOG-1046",
      timestamp: "2026-11-07 15:15:00",
      severity: "info",
      action: "FILE_COMPRESSION_COMPLETED",
      user: "siti.rahma@mail.ugm.ac.id",
      ip: "175.45.184.2",
      details: "Berkas Skripsi_Final.pdf (14.2 MB) dikompresi menjadi 4.1 MB",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Log Audit & Pemantauan Keamanan
            </h1>
            <p className="text-xs text-muted-foreground">
              Rekaman aktivitas akses, anomali penggunaan kuota, dan jejak keamanan.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Mengunduh rekaman log audit dalam format .JSONL...")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-accent text-foreground hover:bg-accent/80 transition-all border border-border"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Log (JSONL)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari aksi, alamat email, atau detail peristiwa..."
            className="w-full bg-accent/40 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["all", "info", "warn", "error"] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl uppercase transition-all ${
                severityFilter === sev
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-card/80 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-sans">
              <tr>
                <th className="px-5 py-3.5">Waktu</th>
                <th className="px-5 py-3.5">Tingkat</th>
                <th className="px-5 py-3.5">Aksi / Event</th>
                <th className="px-5 py-3.5">Pengguna & IP</th>
                <th className="px-5 py-3.5">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-5 py-3.5">
                    {log.severity === "info" && (
                      <span className="text-emerald-500 font-bold">INFO</span>
                    )}
                    {log.severity === "warn" && (
                      <span className="text-amber-500 font-bold">WARN</span>
                    )}
                    {log.severity === "error" && (
                      <span className="text-rose-500 font-bold">ERROR</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-foreground">
                    {log.action}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-foreground">{log.user}</p>
                    <p className="text-[10px] text-muted-foreground">{log.ip}</p>
                  </td>
                  <td className="px-5 py-3.5 font-sans text-xs text-muted-foreground max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

