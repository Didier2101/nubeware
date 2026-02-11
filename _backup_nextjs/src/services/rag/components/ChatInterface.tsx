/**
 * Chat Interface - Premium Enterprise Edition
 * Advanced UI/UX with Glassmorphism, Sky Blue accents and Senior Architecture.
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import {
    Menu, Bot, User, Copy, Check,
    LogOut, Sparkles, Info, ArrowUp, Zap, Globe
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    useChatMessages,
    useChatInput,
    useRAGQuery,
    useClipboard
} from '@/src/services/rag/hooks';
import { useGlobalTranslation, Translations } from '@/src/providers/GlobalLanguageProvider';
import { formatTime } from '@/src/services/rag/utils/formatters';

interface ChatInterfaceProps {
    onToggleSidebar: () => void;
}

export default function ChatInterface({ onToggleSidebar }: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { t, language, setLanguage } = useGlobalTranslation();
    const [scrolled, setScrolled] = useState(false);

    // Specialized Hooks
    const { messages, addUserMessage, addAssistantMessage } = useChatMessages();
    const { executeQuery, response, isLoading, isError } = useRAGQuery();
    const clipboard = useClipboard();

    const chatInput = useChatInput({
        onSubmit: (query) => {
            addUserMessage(query);
            executeQuery({ query });
        },
        disabled: isLoading,
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (response) addAssistantMessage(response);
    }, [response, addAssistantMessage]);

    useEffect(() => {
        if (isError) {
            addAssistantMessage({
                answer: t.error_query,
                sources: [],
                confidence: 0,
                timestamp: new Date().toISOString(),
            });
        }
    }, [isError, addAssistantMessage, t.error_query]);

    useEffect(() => {
        const handleScroll = () => {
            if (messagesContainerRef.current) {
                setScrolled(messagesContainerRef.current.scrollTop > 10);
            }
        };
        const container = messagesContainerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex-1 flex flex-col h-full bg-white relative">
            {/* Enterprise Glass Header */}
            <header className={`flex-shrink-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-6xl mx-auto px-8 w-full flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-500 border border-slate-200"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 text-white">
                                <Zap className="w-6 h-6 fill-white/20" />
                            </div>
                            <div>
                                <h1 className="font-black text-slate-900 text-lg tracking-tight leading-none mb-1.5 uppercase">
                                    {t.brand}
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                        System Active • RAG Engine
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Senior Language Toggle */}
                        <div className="hidden sm:flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                            {[
                                { id: 'en', label: 'EN', flag: '🇺🇸' },
                                { id: 'es', label: 'ES', flag: '🇪🇸' }
                            ].map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setLanguage(lang.id as 'en' | 'es')}
                                    className={`px-3.5 py-2 rounded-xl text-[11px] font-black transition-all flex items-center space-x-2 ${language === lang.id ? 'bg-white text-primary-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>

                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-5 py-2.5 text-xs font-black text-slate-500 hover:text-primary-600 hover:bg-slate-50 rounded-2xl transition-all border border-slate-100 uppercase tracking-widest"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden md:inline">{t.dashboard}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Chat Stream */}
            <main
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto min-h-0 relative custom-scrollbar"
            >
                <div className="max-w-4xl mx-auto w-full px-6 py-12">
                    {messages.length === 0 && !isLoading ? (
                        <EmptyState t={t} />
                    ) : (
                        <div className="space-y-12 pb-20">
                            {messages.map((message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    onCopy={clipboard.copy}
                                    isCopied={clipboard.isCopied(message.id)}
                                    t={t}
                                />
                            ))}

                            {isLoading && <LoadingIndicator t={t} />}

                            <div ref={messagesEndRef} className="h-4" />
                        </div>
                    )}
                </div>
            </main>

            {/* Input Composer: Premium Floating Style */}
            <footer className="relative flex-shrink-0 pb-8 px-6">
                <div className="max-w-4xl mx-auto relative">
                    {/* Shadow Accent */}
                    <div className="absolute inset-x-12 -top-12 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

                    <form onSubmit={chatInput.handleSubmit} className="relative z-10">
                        <div className="relative group bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/40 p-1.5 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-50 transition-all duration-300">
                            <textarea
                                ref={chatInput.textareaRef}
                                value={chatInput.query}
                                onChange={(e) => chatInput.setQuery(e.target.value)}
                                onKeyDown={chatInput.handleKeyDown}
                                placeholder={t.input_placeholder}
                                className="w-full pl-6 pr-20 py-5 bg-transparent border-none focus:ring-0 outline-none transition-all text-slate-700 placeholder:text-slate-400 min-h-[72px] max-h-60 resize-none text-[15px] font-medium leading-relaxed"
                                rows={1}
                                disabled={isLoading}
                            />
                            <div className="absolute right-2 bottom-2">
                                <button
                                    type="submit"
                                    disabled={isLoading || !chatInput.isValid}
                                    className="flex items-center justify-center w-[54px] h-[54px] bg-primary-600 text-white rounded-2xl hover:bg-primary-700 disabled:opacity-20 active:scale-95 transition-all shadow-lg shadow-primary-200 group overflow-hidden"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <ArrowUp className="w-6 h-6 stroke-[3px] group-hover:-translate-y-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4 space-x-6 opacity-40">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {t.ai_warning}
                            </p>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                    </form>
                </div>
            </footer>
        </div>
    );
}

function EmptyState({ t }: { t: Translations }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary-200 blur-[80px] opacity-20 rounded-full scale-150 animate-pulse" />
                <div className="w-28 h-28 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10">
                    <Sparkles className="w-12 h-12 text-primary-600 animate-pulse" />
                </div>
            </div>

            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight max-w-2xl leading-[1.1]">
                {t.empty_title}
            </h3>

            <p className="text-slate-500 mb-14 text-lg max-w-xl leading-relaxed font-medium">
                {t.empty_subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
                {[t.suggestion_1, t.suggestion_2, t.suggestion_3, t.suggestion_4].map((suggestion, i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-5 bg-white border border-slate-100 rounded-3xl text-[13.5px] font-bold text-slate-600 hover:border-primary-200 hover:bg-primary-50/10 hover:shadow-lg hover:shadow-primary-100/20 transition-all duration-300 flex items-center justify-between"
                    >
                        <span className="flex-1 mr-4 line-clamp-2">&ldquo;{suggestion}&rdquo;</span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-100 text-slate-300 group-hover:text-primary-600 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

function LoadingIndicator({ t }: { t: Translations }) {
    return (
        <div className="flex gap-6 animate-in fade-in slide-in-from-left-4 duration-700 max-w-3xl">
            <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5 text-primary-600" />
                </div>
            </div>
            <div className="flex-1 space-y-3 pt-1">
                <div className="inline-flex items-center space-x-6 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 border-l-4 border-l-primary-500">
                    <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">{t.assistant_thinking}</span>
                </div>
            </div>
        </div>
    );
}

interface MessageBubbleProps {
    message: {
        id: string;
        type: 'user' | 'assistant';
        content: string;
        timestamp: Date;
        sources?: string[];
        confidence?: number;
    };
    onCopy: (text: string, id: string) => void;
    isCopied: boolean;
    t: Translations;
}

function MessageBubble({ message, onCopy, isCopied, t }: MessageBubbleProps) {
    const isAssistant = message.type === 'assistant';

    return (
        <div className={`flex gap-6 ${!isAssistant ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-4 duration-700`}>
            {/* Avatar Section */}
            <div className="flex-shrink-0 pt-1">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md relative group transition-all duration-500 ${!isAssistant ? 'bg-slate-900 border-slate-900 rotate-3 group-hover:rotate-0' : 'bg-white border border-slate-100 -rotate-3 group-hover:rotate-0'}`}>
                    {!isAssistant ? <User className="w-5 h-5 text-white" /> : <Bot className="w-6 h-6 text-primary-600" />}
                </div>
            </div>

            {/* Bubble Section */}
            <div className={`flex-1 min-w-0 ${!isAssistant ? 'text-right' : ''}`}>
                <div className="inline-block max-w-[90%] lg:max-w-[80%]">
                    <div
                        className={`relative rounded-[2rem] px-8 py-6 text-[15.5px] leading-[1.6] shadow-md transition-all ${!isAssistant
                            ? 'bg-primary-600 text-white font-medium shadow-primary-200/50'
                            : 'bg-white border border-slate-100 text-slate-700 border-l-4 border-primary-500/20'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-6">
                            <p className="whitespace-pre-wrap text-left">{message.content}</p>
                            {isAssistant && (
                                <button
                                    onClick={() => onCopy(message.content, message.id)}
                                    className="pt-1.5 flex-shrink-0 p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-300 hover:text-primary-600"
                                >
                                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        {isAssistant && message.sources && message.sources.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Globe className="w-3.5 h-3.5 text-primary-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        {t.references}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {message.sources.map((source, index) => (
                                        <div key={index} className="px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all cursor-default">
                                            {source}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isAssistant && message.confidence !== undefined && (
                            <div className="mt-6 flex items-center justify-end space-x-3">
                                <div className="h-1.5 flex-1 max-w-[100px] bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${message.confidence * 100}%` }}
                                        className="h-full bg-primary-500"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase">
                                    {t.confidence}: {Math.round(message.confidence * 100)}%
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={`text-[10px] font-black text-slate-300 mt-3 uppercase tracking-[0.15em] px-4 flex items-center space-x-3 ${!isAssistant ? 'justify-end' : ''}`}>
                        <span>{t.status}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span>{formatTime(message.timestamp)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Added missing ChevronRight and other lucide icons for better UX
function ChevronRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
