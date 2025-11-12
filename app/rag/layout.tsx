// app/rag/layout.tsx
import '../globals.css';
import { Orbitron } from 'next/font/google';
import type { Metadata } from 'next';

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
        <main>{children}</main>
    );
}