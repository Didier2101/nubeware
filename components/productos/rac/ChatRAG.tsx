'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Loader2, Upload, Trash2, Send,
    Database
} from 'lucide-react';
import UploadModal from './UploadModal';
import DatabaseModal from './DatabaseModal';

// Interfaces
export interface RAGResponse {
    answer?: string;
    message?: string;
    status?: string;
    error?: string;
    sources?: string[];
    [key: string]: unknown;
}

export interface Message {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
}

export interface Source {
    name: string;
    uploadDate: string;
    size: string;
}

export default function ChatRAG() {
    const [loading, setLoading] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [sources, setSources] = useState<Source[]>([]);
    const [files, setFiles] = useState<FileList | null>(null);
    const [metadata, setMetadata] = useState<string>('');
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showUploadPanel, setShowUploadPanel] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const API_BASE = 'http://localhost:5058/api';

    // Efecto para cerrar modales con la tecla Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowUploadPanel(false);
                setShowSidebar(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Load available sources
    const loadSources = async () => {
        try {
            const response = await fetch(`${API_BASE}/list_sources`);
            const data = await response.json();
            if (data.status === 'success') {
                const formattedSources: Source[] = data.sources.map((source: string) => ({
                    name: source,
                    uploadDate: new Date().toLocaleDateString(),
                    size: '1.2MB'
                }));
                setSources(formattedSources);
            }
        } catch (error) {
            console.error('Error loading sources:', error);
        }
    };

    // Handle chat message submission
    const handleSendMessage = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/rag_query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'user',
                    query: inputMessage
                })
            });

            const data: RAGResponse = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer || data.message || 'No response received',
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                content: `Error: ${errorMessage}`,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    // Handle file upload
    const handleUploadFiles = async () => {
        if (!files || files.length === 0) {
            alert('Please select at least one file');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            if (metadata) {
                formData.append('metadata', metadata);
            }

            const response = await fetch(`${API_BASE}/upload_datasheets`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert(`Successfully uploaded ${data.files?.length} files`);
                setShowUploadPanel(false);
                setFiles(null);
                setMetadata('');
                loadSources(); // Refresh sources list
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    // Clear chat
    const clearChat = () => {
        setMessages([]);
    };

    const filteredSources = sources.filter(source =>
        source.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-[700px] bg-gray-900 text-white flex mt-24 ">
            {/* Sidebar/Database Modal */}
            <DatabaseModal
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredSources={filteredSources}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            <div className="flex items-center space-x-3">
                                <Brain className="w-6 h-6 text-blue-400" />
                                <div>
                                    <h1 className="text-base font-medium text-white">RAG Assistant</h1>
                                    <p className="text-xs text-gray-400">Ask questions about your documents</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowUploadPanel(true)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Upload files"
                                >
                                    <Upload className="w-4 h-4 text-gray-300" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowSidebar(true)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                    title="View knowledge base"
                                >
                                    <Database className="w-4 h-4 text-gray-300" />
                                </motion.button>
                                {messages.length > 0 && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearChat}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                        title="Clear chat"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-300" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)] px-4">
                        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                            {messages.length === 0 ? (
                                <div className="text-center py-12">
                                    <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                                    <h2 className="text-xl font-light text-gray-300 mb-2">RAG "Retrieval Augmented Generation"</h2>
                                    <p className="text-gray-400">
                                        Advanced document consultation</p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-lg px-4 py-3 rounded-2xl ${message.isUser
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 text-white'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{message.content}</p>
                                                <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-200' : 'text-gray-400'}`}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-start">
                                            <div className="flex items-center gap-2 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gray-700">
                                                <div className="flex items-center space-x-1">
                                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></span>
                                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                                                </div>
                                                <span className="text-sm text-gray-300">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-gray-900 border-t border-gray-700">
                        <div className="max-w-4xl mx-auto px-4 py-4">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="Ask about your documents..."
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={loading}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <motion.button
                                            type="button"
                                            onClick={() => setShowUploadPanel(true)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                            title="Upload files"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={loading || !inputMessage.trim()}
                                    className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                        </div>
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </main>

                {/* Upload Panel */}
                <UploadModal
                    showUploadPanel={showUploadPanel}
                    setShowUploadPanel={setShowUploadPanel}
                    handleUploadFiles={handleUploadFiles}
                    files={files}
                    setFiles={setFiles}
                    metadata={metadata}
                    setMetadata={setMetadata}
                    uploading={uploading}
                    fileInputRef={fileInputRef}
                />
            </div>

            {/* Loading Indicators */}
            {uploading && (
                <div className="fixed bottom-20 right-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center shadow-lg">
                        <Loader2 className="w-5 h-5 text-green-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-300">Uploading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}