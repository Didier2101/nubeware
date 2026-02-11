'use client';

/**
 * Hook: useSidebar
 * Responsabilidad: Gestionar el estado del sidebar (abierto/cerrado)
 * Útil para layouts responsivos
 */

import { useState, useCallback } from 'react';

export function useSidebar(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        open,
        close,
        toggle,
        setIsOpen,
    };
}
