// app/layout.tsx
import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

// Define las fuentes de Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Nubeware.ai - Software, Hardware, Nubeware!',
  description: 'Empresa enfocada en servicios de Inteligencia Artificial en la nube.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen relative">
        {/* El Header ahora es fijo y se superpone a todo el contenido */}
        <Header />

        {/* El resto del contenido de la página */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}