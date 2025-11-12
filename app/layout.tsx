// app/layout.tsx (RAÍZ - este debería existir)
import './globals.css';
import { Orbitron } from 'next/font/google';
import type { Metadata } from 'next';
import Background from '@/components/Background';

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Nubeware.ai - Plataforma de Inteligencia Artificial',
    description: 'Soluciones avanzadas de IA para tu negocio',
    icons: {
        icon: '/favicon_v3.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`${orbitron.variable} scroll-smooth min-h-screen`}>
            <body>
                <Background>
                    {children}
                </Background>
            </body>
        </html>
    );
}