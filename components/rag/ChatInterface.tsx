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
    const messagesContainerRef = useRef<HTMLDivElement>(null);

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

            // Resetear altura del textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Manejar auto-expansión del textarea
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
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
        <div className="flex-1 flex flex-col h-full">
            {/* Header minimalista - ALTURA FIJA */}
            <div className="flex-shrink-0 px-6 py-4 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-300" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-100 text-lg">
                                    Asistente RAG
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Consulta inteligente de documentos
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                        >
                            <Upload className="w-5 h-5 text-gray-300" />
                        </button>

                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Salir</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Área de mensajes - USARÁ EL ESPACIO RESTANTE */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 min-h-0" // min-h-0 es importante
            >
                {messages.length === 0 && !loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-100 mb-3">
                                Sistema RAG
                            </h3>
                            <p className="text-gray-400 mb-8 text-lg">
                                Sube documentos y haz preguntas sobre su contenido
                            </p>
                            <div className="grid grid-cols-1 gap-4 text-sm">
                                <div className="p-4 border border-gray-700/50 rounded-xl text-gray-400 hover:border-gray-600 transition-colors cursor-default">
                                    &ldquo;¿Cuáles son los puntos principales del documento?&rdquo;
                                </div>
                                <div className="p-4 border border-gray-700/50 rounded-xl text-gray-400 hover:border-gray-600 transition-colors cursor-default">
                                    &ldquo;Resume el contenido del archivo PDF&rdquo;
                                </div>
                                <div className="p-4 border border-gray-700/50 rounded-xl text-gray-400 hover:border-gray-600 transition-colors cursor-default">
                                    &ldquo;¿Qué dice sobre [tema específico]?&rdquo;
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {message.type === 'user' ? (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Mensaje */}
                                <div className={`flex-1 min-w-0 ${message.type === 'user' ? 'text-right' : ''}`}>
                                    <div className="inline-block max-w-[85%]">
                                        <div
                                            className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                                : 'text-gray-100'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                                                    {message.content}
                                                </p>
                                                {message.type === 'assistant' && (
                                                    <button
                                                        onClick={() => copyToClipboard(message.content, message.id)}
                                                        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
                                                    >
                                                        {copiedId === message.id ? (
                                                            <Check className="w-4 h-4 text-green-400" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {message.type === 'assistant' && message.sources && message.sources.length > 0 && (
                                                <div className="mt-3 pt-3 ">
                                                    <p className="text-sm font-medium mb-2 text-gray-300">📚 Fuentes:</p>
                                                    <div className="space-y-2">
                                                        {message.sources.map((source: string, index: number) => (
                                                            <div key={index} className="text-sm text-gray-400 flex items-start">
                                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                                <span className="flex-1">{source}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {message.type === 'assistant' && message.confidence && (
                                                <div className="mt-2 text-xs text-gray-400">
                                                    Confianza: {(message.confidence * 100).toFixed(1)}%
                                                </div>
                                            )}
                                        </div>
                                        <div className={`text-xs text-gray-500 mt-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                                            {formatTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="inline-block rounded-2xl px-4 py-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                Procesando tu consulta...
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

            {/* Input area - ALTURA CONTROLADA */}
            <div className="flex-shrink-0 p-6 ">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="flex gap-3 items-end"> {/* items-end para alinear correctamente */}
                        <div className="flex-1">
                            <textarea
                                ref={textareaRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)} // Sin función compleja
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu pregunta..."
                                className="w-full px-4 py-3 border border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-gray-100 placeholder-gray-500 transition-all duration-200 text-[15px]"
                                rows={3} // Fijo en 3 filas
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center h-[52px] flex-shrink-0"
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