import type { Metadata } from 'next';  // 👈 importa el tipo Metadata
import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Nubeware.ai - Software, Hardware, Nubeware!',
  description: 'Empresa enfocada en servicios de Inteligencia Artificial en la nube.',
  icons: {
    icon: '/favicon.png',        // ícono principal
    shortcut: '/favicon.png',    // para navegadores que usen <link rel="shortcut icon" />
    apple: '/favicon.png',       // para iOS (homescreen)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-sans bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen relative">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
