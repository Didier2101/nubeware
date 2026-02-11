'use client';

/**
 * Hook: useClipboard
 * Responsabilidad: Gestionar la funcionalidad de copiar al portapapeles
 * Incluye feedback visual temporal
 */

import { useState, useCallback } from 'react';

export function useClipboard(timeout = 2000) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    /**
     * Copia texto al portapapeles y muestra feedback
     */
    const copy = useCallback(async (text: string, id?: string) => {
        try {
            await navigator.clipboard.writeText(text);

            if (id) {
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), timeout);
            }

            return true;
        } catch (error) {
            console.error('Failed to copy text:', error);
            return false;
        }
    }, [timeout]);

    /**
     * Verifica si un ID específico fue copiado recientemente
     */
    const isCopied = useCallback((id: string) => {
        return copiedId === id;
    }, [copiedId]);

    /**
     * Resetea el estado de copiado
     */
    const reset = useCallback(() => {
        setCopiedId(null);
    }, []);

    return {
        copy,
        isCopied,
        reset,
        copiedId,
    };
}
