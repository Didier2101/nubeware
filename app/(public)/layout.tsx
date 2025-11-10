// app/rag/layout.tsx
import '../globals.css';
import { Orbitron } from 'next/font/google';

import Background from '@/components/Background';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sistema RAG - Nubeware.ai',
  description:
    'Sistema de Recuperación Aumentada por Generación - Consulta inteligente sobre tus documentos con IA.',
  icons: {
    icon: '/favicon_v3.ico',
  },
};

export default function RAGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${orbitron.variable} scroll-smooth`}>
      <body className="font-sans min-h-screen relative">
        <Background>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingButtons />
        </Background>
      </body>
    </html>
  );
}
