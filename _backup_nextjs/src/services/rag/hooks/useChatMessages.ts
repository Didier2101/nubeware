'use client';

/**
 * Hook: useChatMessages
 * Responsabilidad: Gestionar el historial de mensajes del chat
 * Maneja el estado local de los mensajes y la lógica de actualización
 */

import { useState, useCallback } from 'react';
import type { ChatMessage, RAGResponse } from '../types';

export function useChatMessages() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    /**
     * Agrega un mensaje del usuario al chat
     */
    const addUserMessage = useCallback((content: string) => {
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        return userMessage;
    }, []);

    /**
     * Agrega una respuesta del asistente al chat
     */
    const addAssistantMessage = useCallback((response: RAGResponse) => {
        const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: response.answer,
            timestamp: new Date(),
            sources: response.sources,
            confidence: response.confidence,
        };

        setMessages(prev => [...prev, assistantMessage]);
        return assistantMessage;
    }, []);

    /**
     * Limpia todos los mensajes
     */
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    /**
     * Elimina un mensaje específico
     */
    const removeMessage = useCallback((messageId: string) => {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }, []);

    return {
        messages,
        addUserMessage,
        addAssistantMessage,
        clearMessages,
        removeMessage,
    };
}
