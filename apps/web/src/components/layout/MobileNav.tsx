'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, FileCode, Search, Mic, BookOpen, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavs = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/konverter', label: 'Konversi', icon: FileCode },
  { href: '/sumber', label: 'Modul', icon: Search },
  { href: '/stt', label: 'Suara', icon: Mic },
  { href: '/jurnal', label: 'Jurnal', icon: BookOpen },
  { href: '/dashboard', label: 'Admin', icon: Shield },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-around py-2.5 px-4 rounded-3xl glass-dock shadow-2xl border border-slate-800">
      {mobileNavs.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all min-w-[50px] min-h-[44px] justify-center',
              isActive
                ? 'text-sky-400 bg-sky-950/40 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            )}
            aria-label={item.label}
          >
            <Icon className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

