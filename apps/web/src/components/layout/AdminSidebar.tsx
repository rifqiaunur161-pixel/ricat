'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  BarChart3,
  Users,
  Cpu,
  SlidersHorizontal,
  DollarSign,
  Activity,
  ArrowLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { href: '/dashboard', label: 'Ringkasan & Metrik', icon: BarChart3 },
  { href: '/pengguna', label: 'Manajemen Pengguna', icon: Users },
  { href: '/model', label: 'Fitur & Model AI', icon: Cpu },
  { href: '/kuota', label: 'Batas Kuota', icon: SlidersHorizontal },
  { href: '/biaya', label: 'Pengaman Biaya (USD)', icon: DollarSign },
  { href: '/log', label: 'Log Audit & Sistem', icon: Activity },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="fixed left-6 top-6 bottom-6 z-40 hidden md:flex flex-col items-center justify-between w-16 py-6 rounded-[28px] glass-dock shadow-2xl transition-all duration-300 border border-purple-500/20 bg-slate-950/80">
      {/* Top Brand Glyph / Admin badge */}
      <div className="flex flex-col items-center gap-6">
        <Link
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-opacity uppercase tracking-wider"
          aria-label="Admin Dashboard"
        >
          ADM
        </Link>

        {/* Admin Nav Items */}
        <nav className="flex flex-col items-center gap-3">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-200',
                  isActive
                    ? 'bg-purple-900/50 text-purple-200 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                )}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
                {/* Tooltip on Hover */}
                <span className="absolute left-16 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl border border-slate-800 z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center gap-4">
        {/* Return to App */}
        <Link
          href="/chat"
          className="group relative w-10 h-10 flex items-center justify-center rounded-2xl text-slate-400 hover:text-sky-300 hover:bg-sky-950/30 transition-colors"
          aria-label="Kembali ke App Mahasiswa"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.75]" />
          <span className="absolute left-16 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl border border-slate-800 z-50">
            Kembali ke App Mahasiswa
          </span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-10 h-10 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          aria-label="Ganti mode gelap/terang"
        >
          {mounted ? (
            theme === 'dark' ? (
              <Sun className="w-5 h-5 stroke-[1.75]" />
            ) : (
              <Moon className="w-5 h-5 stroke-[1.75]" />
            )
          ) : (
            <span className="w-5 h-5 block" />
          )}
        </button>

        {/* Admin Avatar */}
        <div className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden bg-slate-900 flex items-center justify-center text-xs font-bold text-purple-300 shadow-md">
          AD
        </div>
      </div>
    </aside>
  );
}

