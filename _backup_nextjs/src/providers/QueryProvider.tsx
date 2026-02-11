/**
 * React Query Provider
 * Configura el QueryClient con opciones optimizadas para la aplicación
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Configuración global para queries
                        staleTime: 60 * 1000, // 1 minuto
                        gcTime: 5 * 60 * 1000, // 5 minutos (anteriormente cacheTime)
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                    mutations: {
                        // Configuración global para mutations
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
