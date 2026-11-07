import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { InteractiveBackground } from '@/components/layout/InteractiveBackground';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'ricat - Asisten Kuliah Serba Ada',
  description: 'Web multi-pengguna untuk tugas kuliah: tanya modul PDF, konverter berkas, ringkas jurnal, kuis latihan, dan transkrip audio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <InteractiveBackground>
            {children}
            <Toaster richColors position="top-right" />
          </InteractiveBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}

