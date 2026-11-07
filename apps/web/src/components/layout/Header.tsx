'use client';

import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'Workspace Kuliah', subtitle = 'Semester Ganjil' }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 md:pl-28 md:pr-10 z-30 transition-all">
      {/* Breadcrumb Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>ricat</span>
          <span>/</span>
          <span className="text-sky-400">{subtitle}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
      </div>
    </header>
  );
}
