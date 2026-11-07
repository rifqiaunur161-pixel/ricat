import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Sidebar />
      <Header />
      <main className="flex-1 w-full pb-24 md:pb-8 md:pl-28 md:pr-10 px-4 md:px-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}

