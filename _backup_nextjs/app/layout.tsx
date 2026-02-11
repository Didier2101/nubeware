/**
 * Root Layout - Nubeware Enterprise Platform
 * Configuración global de fuentes, idioma y diseño base.
 */

import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { GlobalLanguageProvider } from '@/src/providers/GlobalLanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Fuente corporativa premium
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Nubeware | Enterprise AI Development',
  description: 'Proporcionamos soluciones de Inteligencia Artificial de grado empresarial para acelerar la transformación digital.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <QueryProvider>
          <GlobalLanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-[88px]">
                {children}
              </main>
              <Footer />
            </div>
          </GlobalLanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
