'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  MessageSquare,
  FileCode,
  Search,
  Mic,
  BookOpen,
  HelpCircle,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/chat', label: 'Chat AI', icon: MessageSquare },
  { href: '/konverter', label: 'Konverter & Kompres', icon: FileCode },
  { href: '/sumber', label: 'Tanya Modul PDF', icon: Search },
  { href: '/stt', label: 'Transkrip Suara', icon: Mic },
  { href: '/jurnal', label: 'Ringkas Jurnal', icon: BookOpen },
  { href: '/belajar', label: 'Kuis & Flashcard', icon: HelpCircle },
  { href: '/dashboard', label: 'Panel Admin', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="fixed left-6 top-6 bottom-6 z-40 hidden md:flex flex-col items-center justify-between w-16 py-6 rounded-[28px] glass-dock shadow-2xl transition-all duration-300">
      {/* Top Brand Glyph */}
      <div className="flex flex-col items-center gap-6">
        <Link
          href="/chat"
          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg hover:opacity-90 transition-opacity"
          aria-label="ricat beranda"
        >
          r
        </Link>

        {/* Nav Items Stack */}
        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-200',
                  isActive
                    ? 'bg-purple-950/40 text-purple-300 border-2 border-fuchsia-500 glow-magenta shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                )}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
                {/* Tooltip on Hover */}
                <span className="absolute left-16 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl border border-slate-800">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Theme Toggle & Avatar */}
      <div className="flex flex-col items-center gap-4">
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

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full border-2 border-sky-400/80 overflow-hidden bg-slate-800 flex items-center justify-center shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="Profil Pengguna"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </aside>
  );
}

