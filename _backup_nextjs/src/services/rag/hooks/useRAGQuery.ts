/**
 * Hook: useRAGQuery
 * Responsabilidad: Gestionar las consultas al sistema RAG
 * Maneja el estado de la consulta y las respuestas
 */

import { useMutation } from '@tanstack/react-query';
import { executeRAGQuery } from '../api/ragService';
import type { RAGResponse, QueryRequest } from '../types';

export function useRAGQuery() {
    const mutation = useMutation<RAGResponse, Error, QueryRequest>({
        mutationFn: executeRAGQuery,
        retry: 1, // Reintentar una vez en caso de error
    });

    return {
        executeQuery: mutation.mutate,
        executeQueryAsync: mutation.mutateAsync,
        response: mutation.data,
        isLoading: mutation.isPending,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset,
    };
}
