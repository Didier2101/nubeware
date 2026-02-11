/**
 * Hook: useFileUpload
 * Responsabilidad: Gestionar la subida de archivos
 * Incluye validación, manejo de errores y actualización del cache
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '../api/ragService';
import { RAG_QUERY_KEYS } from './useFileList';
import type { UploadFileResponse } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_TYPES = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export interface FileValidationError {
    type: 'size' | 'format' | 'unknown';
    message: string;
}

/**
 * Valida un archivo antes de subirlo
 */
function validateFile(file: File): FileValidationError | null {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            type: 'format',
            message: 'Tipo de archivo no soportado. Formatos permitidos: PDF, TXT, DOC, DOCX, CSV, XLS, XLSX'
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            type: 'size',
            message: `El archivo es demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`
        };
    }

    return null;
}

export function useFileUpload() {
    const queryClient = useQueryClient();

    const mutation = useMutation<UploadFileResponse, Error, File>({
        mutationFn: async (file: File) => {
            // Validar antes de subir
            const validationError = validateFile(file);
            if (validationError) {
                throw new Error(validationError.message);
            }

            return await uploadFile(file);
        },
        onSuccess: () => {
            // Invalidar y refrescar la lista de archivos automáticamente
            queryClient.invalidateQueries({ queryKey: RAG_QUERY_KEYS.fileList });
        },
    });

    return {
        uploadFile: mutation.mutate,
        uploadFileAsync: mutation.mutateAsync,
        isUploading: mutation.isPending,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        reset: mutation.reset,
    };
}
