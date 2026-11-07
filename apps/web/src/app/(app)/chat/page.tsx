'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Paperclip,
  SlidersHorizontal,
  ArrowUp,
  Sparkles,
  BookOpen,
  Search,
  FileCode,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  tokens?: number;
  costUsd?: string;
  codeSnippet?: string;
}

const initialMessages: Message[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'Tolong jelaskan algoritma Backpropagation untuk tugas Sistem Cerdas, lengkap dengan rumusnya.',
  },
  {
    id: 'm2',
    role: 'assistant',
    model: 'Claude 3.5 Sonnet',
    tokens: 1420,
    costUsd: '$0.004',
    content:
      'Algoritma Backpropagation (perambatan mundur) adalah metode pelatihan jaringan saraf tiruan berumpan maju (feedforward) untuk meminimalkan fungsi galat kuadrat terkecil (MSE).',
    codeSnippet: `// Aturan Pembaharuan Bobot (Gradient Descent):\nΔw_ij(t) = η * δ_j * o_i + α * Δw_ij(t-1)\n\n// Sinyal Galat Lapisan Keluaran:\nδ_k = (t_k - y_k) * f'(net_k)`,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        model: 'Claude 3.5 Sonnet',
        tokens: 850,
        costUsd: '$0.002',
        content: `Jawaban untuk: "${userMsg.content}". Analisis terstruktur telah diselesaikan sesuai profil akademik mahasiswa.`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Rumus berhasil disalin ke clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const loadExample = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-8rem)]">
      {/* View 1: Empty Hero Hub (When no messages yet) */}
      {messages.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center my-auto py-8">
          {/* Iridescent Sphere Graphic */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 group cursor-pointer" onClick={loadExample}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/orb-circle.png"
              alt="Iridescent Sphere"
              className="relative w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <p className="text-base font-normal text-slate-400 mb-2">Hi, Mahasiswa</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-3">
            How can I help today?
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center max-w-lg mb-8">
            Bantuan tugas kuliah terstruktur: tanya modul kuliah, konversi berkas, ringkas jurnal, dan latihan kuis.
          </p>

          {/* Floating Glass Prompt Container */}
          <div className="w-full max-w-2xl rounded-3xl p-4 glass-card shadow-2xl mb-8">
            {/* Academic Status Bar */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs font-medium text-sky-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">
                Mode Akademik: Model Cerdas Terpilih • Claude 3.5 Sonnet & Gemini 1.5
              </span>
            </div>

            {/* Sunken Input Well */}
            <div className="w-full rounded-2xl bg-black/60 dark:bg-black/80 border border-white/10 dark:border-slate-800/80 p-3 flex flex-col gap-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Tanyakan materi kuliah, masukkan topik tugas, atau ketik /..."
                className="w-full bg-transparent border-0 resize-none text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toast.info('Fitur unggah berkas modul aktif')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 transition-colors"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Import file</span>
                  </button>
                  <button
                    onClick={() => toast.info('Alat bantu pintar aktif')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Tools</span>
                  </button>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={cn(
                    'w-9 h-9 flex items-center justify-center rounded-full transition-all shadow-lg',
                    inputText.trim()
                      ? 'bg-blue-600 hover:bg-blue-500 text-white glow-cyan'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  )}
                  aria-label="Kirim pesan"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Shortcut Glass Cards */}
          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link
              href="/jurnal"
              className="group p-4 rounded-2xl glass-card hover:border-slate-600/80 transition-all shadow-md flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Ringkas Jurnal</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Ekstraksi poin penting, metodologi, dan temuan kunci dari karya ilmiah.
              </p>
            </Link>

            <Link
              href="/sumber"
              className="group p-4 rounded-2xl glass-card hover:border-slate-600/80 transition-all shadow-md flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Tanya Modul & PDF</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Ekstrak jawaban dari buku kuliah dengan kutipan nomor halaman akurat.
              </p>
            </Link>

            <Link
              href="/konverter"
              className="group p-4 rounded-2xl glass-card hover:border-slate-600/80 transition-all shadow-md flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>Konversi & Kompres</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Ubah berkas DOCX/PPTX ke PDF dan sesuaikan batas portal kampus.
              </p>
            </Link>
          </div>
        </div>
      ) : (
        /* View 2: Active Conversation Stream */
        <div className="w-full flex flex-col gap-6 py-6 pb-32">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'flex flex-col max-w-2xl',
                m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start w-full'
              )}
            >
              {m.role === 'user' ? (
                <div className="px-5 py-3 rounded-2xl bg-sky-600 text-white text-sm shadow-md rounded-br-sm leading-relaxed">
                  {m.content}
                </div>
              ) : (
                <div className="w-full rounded-3xl p-6 glass-card shadow-xl flex flex-col gap-4">
                  {/* Model attribution header */}
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-sky-300">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>Dijawab oleh: {m.model}</span>
                    </div>
                    {m.tokens && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {formatNumber(m.tokens)} token ({m.costUsd})
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200">{m.content}</p>

                  {/* Code snippet block if present */}
                  {m.codeSnippet && (
                    <div className="relative rounded-2xl bg-black/80 border border-slate-800 p-4 font-mono text-xs text-sky-300">
                      <button
                        onClick={() => copyToClipboard(m.codeSnippet!, m.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        aria-label="Salin kode"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <pre className="overflow-x-auto pr-8">{m.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Follow-up action chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Link
                      href="/jurnal"
                      className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Buka Ringkasan Jurnal</span>
                    </Link>
                    <Link
                      href="/belajar"
                      className="px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Hasilkan Kuis Latihan</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Sticky Bottom Input Bar in Conversation Mode */}
          <div className="fixed bottom-6 left-4 right-4 md:left-36 md:right-16 max-w-3xl mx-auto z-40">
            <div className="w-full rounded-full glass-card p-2 flex items-center gap-2 shadow-2xl border border-slate-700/60">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ketik pertanyaan lanjutan atau perintah baru..."
                className="flex-1 bg-transparent border-0 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:bg-slate-800 disabled:text-slate-500 transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

