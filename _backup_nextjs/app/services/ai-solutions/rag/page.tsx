import { RAGSystem } from '@/src/services/rag';

export const metadata = {
    title: 'RAG Assistant - Nubeware.ai',
    description: 'Sistema de Inteligencia de Conocimiento Empresarial.',
};

export default function RAGPage() {
    return <RAGSystem />;
}
