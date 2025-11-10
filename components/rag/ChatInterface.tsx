// components/rag/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Menu, Bot, User, Copy, Check, Upload, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: string[];
    confidence?: number;
}

interface RAGResponse {
    answer: string;
    sources: string[];
    confidence: number;
    timestamp: string;
}

interface ChatInterfaceProps {
    query: string;
    setQuery: (query: string) => void;
    response: RAGResponse | null;
    loading: boolean;
    onExecuteQuery: () => void;
    onToggleSidebar: () => void;
}

export default function ChatInterface({
    query,
    setQuery,
    response,
    loading,
    onExecuteQuery,
    onToggleSidebar,
}: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Efecto para scroll automático
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Efecto para manejar nuevas respuestas
    useEffect(() => {
        if (response) {
            const newMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: response.answer,
                timestamp: new Date(),
                sources: response.sources,
                confidence: response.confidence,
            };
            setMessages(prev => [...prev, newMessage]);
        }
    }, [response]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            // Agregar mensaje del usuario
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                type: 'user',
                content: query,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, userMessage]);

            // Ejecutar consulta
            onExecuteQuery();

            // Limpiar el query después de enviar
            setQuery('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const copyToClipboard = async (text: string, messageId: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(messageId);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {/* Botón de hamburguesa - solo visible en mobile */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-900">
                                    Asistente RAG
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Sistema de consulta de documentos
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Botón de subir - solo visible en mobile */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Upload className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Botón Salir - visible en todos los dispositivos */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Salir</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
                {messages.length === 0 && !loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Bienvenido al Sistema RAG
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Sube documentos y comienza a hacer preguntas inteligentes sobre su contenido.
                            </p>
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm">
                                    &ldquo;¿Cuáles son los puntos principales del documento?&rdquo;
                                </div>
                                <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm">
                                    &ldquo;Resume el contenido del archivo PDF&rdquo;
                                </div>
                                <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm">
                                    &ldquo;¿Qué dice sobre [tema específico]?&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex space-x-4 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                    }`}
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-4' : 'mr-4'}`}>
                                    {message.type === 'user' ? (
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Mensaje */}
                                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                                    <div
                                        className={`inline-block rounded-2xl px-4 py-3 max-w-[80%] shadow-sm ${message.type === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="whitespace-pre-wrap leading-relaxed">
                                                {message.content}
                                            </p>
                                            {message.type === 'assistant' && (
                                                <button
                                                    onClick={() => copyToClipboard(message.content, message.id)}
                                                    className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    {copiedId === message.id ? (
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {message.type === 'assistant' && message.sources && message.sources.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <p className="text-sm font-medium mb-2 text-gray-700">📚 Fuentes:</p>
                                                <div className="space-y-1">
                                                    {message.sources.map((source: string, index: number) => (
                                                        <div key={index} className="text-sm text-gray-600 flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                                            {source}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {message.type === 'assistant' && message.confidence && (
                                            <div className="mt-2 text-xs text-gray-500">
                                                Confianza: {(message.confidence * 100).toFixed(1)}%
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-xs text-gray-500 mt-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex space-x-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="inline-block bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                Procesando...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-100 p-6 bg-white">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <textarea
                                ref={textareaRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu pregunta..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 shadow-sm"
                                rows={1}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center self-end shadow-sm"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}