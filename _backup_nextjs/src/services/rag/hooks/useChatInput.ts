'use client';

/**
 * Hook: useChatInput
 * Responsabilidad: Gestionar el estado y comportamiento del input del chat
 * Incluye validación, auto-resize y manejo de teclado
 */

import { useState, useCallback, useRef } from 'react';

interface UseChatInputOptions {
    onSubmit: (query: string) => void;
    maxLength?: number;
    disabled?: boolean;
}

export function useChatInput({
    onSubmit,
    maxLength = 2000,
    disabled = false
}: UseChatInputOptions) {
    const [query, setQuery] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Maneja el cambio en el textarea
     */
    const handleChange = useCallback((value: string) => {
        if (value.length <= maxLength) {
            setQuery(value);
        }
    }, [maxLength]);

    /**
     * Maneja el envío del formulario
     */
    const handleSubmit = useCallback((e?: React.FormEvent) => {
        e?.preventDefault();

        const trimmedQuery = query.trim();
        if (trimmedQuery && !disabled) {
            onSubmit(trimmedQuery);
            setQuery('');

            // Resetear altura del textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    }, [query, disabled, onSubmit]);

    /**
     * Maneja las teclas especiales (Enter para enviar, Shift+Enter para nueva línea)
     */
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    /**
     * Limpia el input
     */
    const clear = useCallback(() => {
        setQuery('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, []);

    /**
     * Establece el foco en el textarea
     */
    const focus = useCallback(() => {
        textareaRef.current?.focus();
    }, []);

    return {
        query,
        setQuery: handleChange,
        handleSubmit,
        handleKeyDown,
        clear,
        focus,
        textareaRef,
        isValid: query.trim().length > 0,
        characterCount: query.length,
        remainingCharacters: maxLength - query.length,
    };
}
