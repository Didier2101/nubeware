/**
 * Hook: useFileList
 * Responsabilidad: Gestionar la lista de archivos cargados
 * Usa React Query para caching y sincronización automática
 */

import { useQuery } from '@tanstack/react-query';
import { fetchFileList } from '../api/ragService';

export const RAG_QUERY_KEYS = {
    fileList: ['rag', 'files'] as const,
    fileDetail: (id: string) => ['rag', 'files', id] as const,
};

export function useFileList() {
    return useQuery({
        queryKey: RAG_QUERY_KEYS.fileList,
        queryFn: fetchFileList,
        staleTime: 30000, // Los datos son válidos por 30 segundos
        refetchOnWindowFocus: true, // Refrescar al volver a la ventana
    });
}
