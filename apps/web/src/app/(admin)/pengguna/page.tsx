"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  GraduationCap,
  Mail,
  MoreVertical,
  Filter,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface StudentUser {
  id: string;
  name: string;
  nim: string;
  email: string;
  campus: string;
  status: "verified" | "pending" | "banned";
  dailyTokensUsed: number;
  dailyTokensLimit: number;
}

export default function PenggunaAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [users, setUsers] = useState<StudentUser[]>([
    {
      id: "1",
      name: "Budi Santoso",
      nim: "13521045",
      email: "13521045@mahasiswa.itb.ac.id",
      campus: "Institut Teknologi Bandung",
      status: "verified",
      dailyTokensUsed: 14200,
      dailyTokensLimit: 50000,
    },
    {
      id: "2",
      name: "Siti Rahmawati",
      nim: "20/456789/TK/50123",
      email: "siti.rahma@mail.ugm.ac.id",
      campus: "Universitas Gadjah Mada",
      status: "pending",
      dailyTokensUsed: 0,
      dailyTokensLimit: 50000,
    },
    {
      id: "3",
      name: "Ahmad Fauzan",
      nim: "2106721980",
      email: "ahmad.fauzan@ui.ac.id",
      campus: "Universitas Indonesia",
      status: "verified",
      dailyTokensUsed: 42100,
      dailyTokensLimit: 50000,
    },
    {
      id: "4",
      name: "Dimas Anggara",
      nim: "11520098",
      email: "dimas@gmail.com",
      campus: "Luar Kampus Afiliasi",
      status: "banned",
      dailyTokensUsed: 98000,
      dailyTokensLimit: 50000,
    },
  ]);

  const handleApprove = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "verified" } : u))
    );
  };

  const handleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "banned" } : u))
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.nim.includes(searchTerm) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Manajemen Pengguna & Verifikasi Mahasiswa
            </h1>
            <p className="text-xs text-muted-foreground">
              Validasi identitas kampus (@*.ac.id) dan alokasi kuota token harian.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-accent text-foreground">
            Total Mahasiswa: {users.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, NIM, atau email kampus..."
            className="w-full bg-accent/40 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["all", "verified", "pending", "banned"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl capitalize transition-all ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "all" ? "Semua" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-card/80 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Mahasiswa</th>
                <th className="px-5 py-3.5">NIM & Kampus</th>
                <th className="px-5 py-3.5">Status Akun</th>
                <th className="px-5 py-3.5">Konsumsi Token Hari Ini</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-mono text-foreground font-medium">{user.nim}</p>
                    <p className="text-[11px] text-muted-foreground">{user.campus}</p>
                  </td>
                  <td className="px-5 py-4">
                    {user.status === "verified" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> Aktif
                      </span>
                    )}
                    {user.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <GraduationCap className="w-3 h-3" /> Menunggu Validasi
                      </span>
                    )}
                    {user.status === "banned" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-3 h-3" /> Diblokir
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="w-40 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">
                          {formatNumber(user.dailyTokensUsed)}
                        </span>
                        <span className="font-bold text-foreground">
                          {formatNumber(user.dailyTokensLimit)}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden">
                        <div
                          className={`h-full ${
                            user.dailyTokensUsed / user.dailyTokensLimit > 0.8
                              ? "bg-rose-500"
                              : "bg-primary"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (user.dailyTokensUsed / user.dailyTokensLimit) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === "pending" && (
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all text-xs"
                        >
                          Setujui
                        </button>
                      )}
                      {user.status !== "banned" ? (
                        <button
                          onClick={() => handleBan(user.id)}
                          className="px-3 py-1.5 rounded-lg bg-accent hover:bg-rose-500/15 hover:text-rose-500 text-muted-foreground font-semibold transition-all text-xs"
                        >
                          Blokir
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-3 py-1.5 rounded-lg bg-accent hover:bg-emerald-500/15 hover:text-emerald-500 text-muted-foreground font-semibold transition-all text-xs"
                        >
                          Buka Blokir
                        </button>
                      )}
                    </div>
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

