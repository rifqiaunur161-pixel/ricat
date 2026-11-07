'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  Cpu,
  SlidersHorizontal,
  DollarSign,
  Activity,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminMobileNavs = [
  { href: '/dashboard', label: 'Metrik', icon: BarChart3 },
  { href: '/pengguna', label: 'User', icon: Users },
  { href: '/model', label: 'Model', icon: Cpu },
  { href: '/kuota', label: 'Kuota', icon: SlidersHorizontal },
  { href: '/biaya', label: 'Biaya', icon: DollarSign },
  { href: '/log', label: 'Log', icon: Activity },
  { href: '/chat', label: 'Keluar', icon: ArrowLeft },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-around py-2 px-2 rounded-3xl glass-dock shadow-2xl border border-purple-800/40 bg-slate-950/90">
      {adminMobileNavs.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all min-w-[40px] justify-center',
              isActive
                ? 'text-purple-300 bg-purple-950/60 border border-purple-500/50'
                : 'text-slate-400 hover:text-slate-200'
            )}
            aria-label={item.label}
          >
            <Icon className="w-4 h-4 stroke-[1.75]" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

