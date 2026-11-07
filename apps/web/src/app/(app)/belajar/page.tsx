"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Layers,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  topic: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function BelajarPage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "quiz">("flashcards");

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards: Flashcard[] = [
    {
      id: 1,
      topic: "Struktur Data & Algoritma",
      question: "Apa perbedaan fundamental antara Stack dan Queue dalam hal prinsip operasi data?",
      answer: "Stack menerapkan prinsip LIFO (Last In First Out) di mana elemen terakhir yang dimasukkan adalah yang pertama dikeluarkan. Sedangkan Queue menerapkan FIFO (First In First Out) di mana elemen pertama yang masuk akan dilayani terlebih dahulu.",
    },
    {
      id: 2,
      topic: "Sistem Operasi",
      question: "Apa itu kondisi Deadlock dan sebutkan 4 kondisi Coffman yang harus terpenuhi agar deadlock terjadi?",
      answer: "Deadlock adalah situasi di mana sekumpulan proses saling terblokir karena menunggu sumber daya yang dipegang proses lain. 4 kondisi Coffman: Mutual Exclusion, Hold and Wait, No Preemption, dan Circular Wait.",
    },
    {
      id: 3,
      topic: "Jaringan Komputer",
      question: "Mengapa protokol TCP disebut 'Connection-Oriented' sedangkan UDP disebut 'Connectionless'?",
      answer: "TCP melakukan Three-Way Handshake (SYN, SYN-ACK, ACK) sebelum pengiriman paket untuk memastikan keandalan, urutan, dan kontrol aliran data. UDP langsung mengirimkan datagram tanpa negosiasi awal dan tanpa jaminan pengiriman kembali.",
    },
  ];

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Pada arsitektur REST API, manakah metode HTTP yang bersifat idempoten (idempotent)?",
      options: ["POST", "PUT", "PATCH", "CONNECT"],
      correctIndex: 1,
      explanation: "Metode PUT, GET, DELETE, dan HEAD bersifat idempoten karena pemanggilan berulang kali dengan parameter sama akan menghasilkan kondisi server yang identik. Sebaliknya, POST tidak idempoten.",
    },
    {
      id: 2,
      question: "Berapa kompleksitas waktu rata-rata (average time complexity) dari algoritma QuickSort?",
      options: ["O(N)", "O(N log N)", "O(N²)", "O(log N)"],
      correctIndex: 1,
      explanation: "QuickSort memiliki kompleksitas rata-rata O(N log N) dengan partisi seimbang. Pada skenario terburuk (misal array sudah terurut tanpa pivot acak), kompleksitasnya menjadi O(N²).",
    },
  ];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const currentCard = flashcards[currentIndex];
  const currentQ = quizQuestions[quizIndex];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Kuis Interaktif & Flashcard Ujian
            </h1>
            <p className="text-xs text-muted-foreground">
              Metode Active Recall dan Spaced Repetition untuk persiapan UTS dan UAS.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-accent/40 rounded-xl p-1 border border-border">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "flashcards"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kartu Flashcard</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "quiz"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Simulasi Ujian</span>
          </button>
        </div>
      </div>

      {activeTab === "flashcards" ? (
        /* Flashcard Section */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span>
              Topik: <strong className="text-foreground">{currentCard.topic}</strong>
            </span>
            <span>
              Kartu {currentIndex + 1} dari {flashcards.length}
            </span>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] sm:min-h-[340px] glass-card rounded-3xl p-8 flex flex-col justify-between cursor-pointer border border-border hover:border-primary/40 transition-all shadow-lg relative group select-none"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-wider text-primary">
                {isFlipped ? "Kunci Jawaban & Teori" : "Pertanyaan Active Recall"}
              </span>
              <span className="text-[11px] bg-accent/60 px-2.5 py-1 rounded-full">
                Klik kartu untuk membalik
              </span>
            </div>

            <div className="my-auto py-6">
              {isFlipped ? (
                <div className="space-y-3">
                  <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              ) : (
                <h3 className="text-base sm:text-xl font-bold text-foreground leading-snug">
                  {currentCard.question}
                </h3>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-4">
              <span>Gunakan kartu ini sebelum ujian</span>
              <span className="flex items-center gap-1 text-primary">
                <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                Ketuk untuk bolak-balik
              </span>
            </div>
          </div>

          {/* Spaced Repetition Controls */}
          {isFlipped && (
            <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
              <span className="text-xs text-muted-foreground">
                Tingkat Penguasaan Materi:
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleNextFlashcard}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                >
                  Sulit (Ulang 1 Hari)
                </button>
                <button
                  onClick={handleNextFlashcard}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
                >
                  Sedang (3 Hari)
                </button>
                <button
                  onClick={handleNextFlashcard}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                >
                  Mudah (7 Hari)
                </button>
              </div>
            </div>
          )}

          {/* Nav Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevFlashcard}
              className="p-2.5 rounded-xl bg-card border border-border hover:bg-accent text-foreground transition-all"
              title="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-muted-foreground font-mono">
              {currentIndex + 1} / {flashcards.length}
            </span>
            <button
              onClick={handleNextFlashcard}
              className="p-2.5 rounded-xl bg-card border border-border hover:bg-accent text-foreground transition-all"
              title="Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Section */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Sisa Waktu Ujian: <strong>14:20</strong>
            </span>
            <span>
              Soal {quizIndex + 1} dari {quizQuestions.length} • Skor: {quizScore}
            </span>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optionStyle = "bg-card border-border hover:border-primary/50 text-foreground";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold";
                  } else if (isSelected) {
                    optionStyle = "bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-primary/10 border-primary text-primary font-semibold";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-accent/60 flex items-center justify-center font-bold text-[11px]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation on submit */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-accent/40 border border-border text-xs space-y-1.5 animate-in fade-in">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  Penjelasan Kunci Jawaban:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Submit & Next Button */}
            <div className="pt-2 flex justify-end gap-3">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={() => {
                    setIsAnswerSubmitted(true);
                    if (selectedOption === currentQ.correctIndex) {
                      setQuizScore((s) => s + 50);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all shadow-sm"
                >
                  Kunci Jawaban
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsAnswerSubmitted(false);
                    setSelectedOption(null);
                    setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
                >
                  Lanjut ke Soal Berikutnya
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

