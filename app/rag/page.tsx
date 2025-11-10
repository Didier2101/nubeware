// app/rag/page.tsx

import RAGSystem from "@/components/rag/RAGSystem";



export const metadata = {
    title: 'Sistema RAG - Nubeware.ai',
    description: 'Sistema de Recuperación Aumentada por Generación - Consulta inteligente sobre tus documentos con IA.',
};

export default function RAGPage() {
    return <RAGSystem />;
}