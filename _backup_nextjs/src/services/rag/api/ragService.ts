/**
 * RAG API Service
 * Servicio centralizado para todas las llamadas a la API del sistema RAG
 * Separa la lógica de red de los componentes y hooks
 */

import type {
    RAGFile,
    RAGResponse,
    QueryRequest,
    FileListResponse,
    UploadFileResponse
} from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

/**
 * Obtiene la lista de archivos cargados
 */
export async function fetchFileList(): Promise<FileListResponse> {
    const response = await fetch(`${API_BASE}/list_sources`);

    if (!response.ok) {
        throw new Error('Error al cargar la lista de archivos');
    }

    const data = await response.json();
    return {
        files: data.files || [],
        total: data.files?.length || 0
    };
}

/**
 * Sube un archivo al sistema RAG
 */
export async function uploadFile(file: File): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload_datasheets`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir el archivo');
    }

    return await response.json();
}

/**
 * Ejecuta una consulta RAG
 */
export async function executeRAGQuery(request: QueryRequest): Promise<RAGResponse> {
    const response = await fetch(`${API_BASE}/rag_query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error('Error al ejecutar la consulta');
    }

    return await response.json();
}

/**
 * Elimina un archivo del sistema RAG
 */
export async function deleteFile(fileId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/delete_file/${fileId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el archivo');
    }
}
