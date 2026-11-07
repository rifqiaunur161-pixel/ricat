import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Header } from '@/components/layout/Header';
import { AdminMobileNav } from '@/components/layout/AdminMobileNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-slate-950 text-slate-50">
      <AdminSidebar />
      <Header title="Panel Kontrol Administrator" subtitle="Pusat Kontrol & Keamanan Biaya" />
      <main className="flex-1 w-full pb-24 md:pb-8 md:pl-28 md:pr-10 px-4 md:px-0">
        {children}
      </main>
      <AdminMobileNav />
    </div>
  );
}
