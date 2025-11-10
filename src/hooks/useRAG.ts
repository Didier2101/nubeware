// hooks/useRAG.ts
import { useState, useCallback } from 'react';

interface RAGFile {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
    type: string;
}

interface RAGResponse {
    answer: string;
    sources: string[];
    confidence: number;
    timestamp: string;
}

export const useRAG = () => {
    const [files, setFiles] = useState<RAGFile[]>([]);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<RAGResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.nubeware.ai/api';

    // Refrescar lista de archivos
    const refreshFileList = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE}/list_sources`);
            if (!response.ok) throw new Error('Error al cargar archivos');

            const data = await response.json();
            setFiles(data.files || []);
        } catch (error) {
            console.error('Error refreshing file list:', error);
        }
    }, [API_BASE]);

    // Subir archivo
    const uploadFile = useCallback(async (file: File) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE}/upload_datasheets`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Error al subir archivo');

            const result = await response.json();
            await refreshFileList(); // Ahora refreshFileList está en las dependencias
            return result;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [API_BASE, refreshFileList]); // Agregado refreshFileList a las dependencias

    // Ejecutar consulta
    const executeQuery = useCallback(async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/rag_query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) throw new Error('Error en la consulta');

            const result = await response.json();
            setResponse(result);
        } catch (error) {
            console.error('Error executing query:', error);
            setResponse({
                answer: 'Error al procesar la consulta. Por favor, intenta nuevamente.',
                sources: [],
                confidence: 0,
                timestamp: new Date().toISOString(),
            });
        } finally {
            setLoading(false);
        }
    }, [query, API_BASE]);

    return {
        files,
        query,
        setQuery,
        response,
        loading,
        uploadFile,
        executeQuery,
        refreshFileList,
    };
};