'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Loader2, Upload, Trash2, Send,
    Database, X, ChevronLeft, Search, Plus,
    FolderOpen, Mic, FileText, MessageSquare
} from 'lucide-react';

interface RAGResponse {
    answer?: string;
    message?: string;
    status?: string;
    error?: string;
    sources?: string[];
    [key: string]: unknown;
}

interface Message {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
}

interface Source {
    name: string;
    uploadDate: string;
    size: string;
}

export default function RAGInterface() {
    const [loading, setLoading] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [sources, setSources] = useState<Source[]>([]);
    const [files, setFiles] = useState<FileList | null>(null);
    const [metadata, setMetadata] = useState<string>('');
    const [deleteConfirm, setDeleteConfirm] = useState<string>('');
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showUploadPanel, setShowUploadPanel] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const API_BASE = 'http://localhost:5058/api';

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

    const hasConversation = messages.length > 0;
    const filteredSources = sources.filter(source =>
        source.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-[700px] bg-gray-900 text-white flex mt-20">
            {/* Sidebar */}
            <AnimatePresence>
                {showSidebar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setShowSidebar(false)}
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed lg:relative left-0 top-0 h-full w-80 bg-gray-800 border-r border-gray-700 z-50 flex flex-col"
                        >
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold flex items-center">
                                        <Database className="w-5 h-5 mr-2 text-blue-400" />
                                        Knowledge Base
                                    </h2>
                                    <button
                                        onClick={() => setShowSidebar(false)}
                                        className="lg:hidden p-1 hover:bg-gray-700 rounded"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search documents..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-sm text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                {filteredSources.length === 0 ? (
                                    <div className="text-center text-gray-400 py-8">
                                        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No documents</p>
                                        <p className="text-sm">Upload files to get started</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {filteredSources.map((source) => (
                                            <div key={source.name} className="bg-gray-700 rounded-lg p-3">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate text-white">{source.name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            Uploaded: {source.uploadDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                                    onClick={() => setShowUploadPanel(!showUploadPanel)}
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
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                            {messages.length === 0 ? (
                                <div className="text-center py-12">
                                    <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                                    <h2 className="text-xl font-light text-gray-300 mb-2">How can I help you today?</h2>
                                    <p className="text-gray-400">Ask questions about your uploaded documents</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.isUser
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
                                ))
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
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}
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
                <AnimatePresence>
                    {showUploadPanel && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowUploadPanel(false)}
                                    className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>

                                <h3 className="text-lg font-semibold text-white mb-4 pr-8">Upload Documents</h3>

                                <div className="space-y-4">
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            onChange={(e) => setFiles(e.target.files)}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full px-4 py-6 border-2 border-dashed border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                                        >
                                            <Plus className="w-8 h-8 mx-auto mb-2" />
                                            <p className="text-sm">Select files</p>
                                            <p className="text-xs text-gray-500 mt-1">Supports multiple files</p>
                                        </button>
                                        {files && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                {files.length} file(s) selected
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">Optional metadata (JSON)</label>
                                        <textarea
                                            value={metadata}
                                            onChange={(e) => setMetadata(e.target.value)}
                                            placeholder='{"category": "electronics", "type": "datasheet"}'
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm resize-none"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowUploadPanel(false)}
                                            className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUploadFiles}
                                            disabled={uploading || !files}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50 transition-colors font-medium"
                                        >
                                            {uploading ? (
                                                <div className="flex items-center justify-center">
                                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                    Uploading...
                                                </div>
                                            ) : 'Upload Files'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Loading Indicators (más específicos) */}
            {loading && (
                <div className="fixed bottom-20 right-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-3 flex items-center shadow-lg">
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin mr-2" />
                        <span className="text-sm text-gray-300">Thinking...</span>
                    </div>
                </div>
            )}

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