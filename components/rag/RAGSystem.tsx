// components/rag/RAGSystem.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './ChatInterface';
import FileSidebar from './FileSidebar';
import { useRAG } from '@/src/hooks/useRAG';

export default function RAGSystem() {
    const {
        files,
        query,
        setQuery,
        response,
        loading,
        uploadFile,
        executeQuery,
        refreshFileList
    } = useRAG();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-white overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden lg:flex h-full">
                {/* Sidebar fijo en desktop */}
                <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white">
                    <FileSidebar
                        files={files}
                        onUpload={uploadFile}
                        onRefresh={refreshFileList}
                        loading={loading}
                    />
                </div>

                {/* Área principal del chat */}
                <div className="flex-1 flex flex-col min-w-0">
                    <ChatInterface
                        query={query}
                        setQuery={setQuery}
                        response={response}
                        loading={loading}
                        onExecuteQuery={executeQuery}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden h-full">
                <div className="relative z-10 flex h-full">
                    <AnimatePresence>
                        {/* Overlay para mobile */}
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />
                        )}

                        {/* Sidebar móvil que aparece desde abajo */}
                        {sidebarOpen && (
                            <motion.div
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: '100%', opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200
                                }}
                                className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl rounded-t-2xl max-h-[85vh] lg:hidden"
                            >
                                <FileSidebar
                                    files={files}
                                    onUpload={uploadFile}
                                    onRefresh={refreshFileList}
                                    loading={loading}
                                    onClose={() => setSidebarOpen(false)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Área principal del chat en mobile */}
                    <div className="flex-1 flex flex-col w-full">
                        <ChatInterface
                            query={query}
                            setQuery={setQuery}
                            response={response}
                            loading={loading}
                            onExecuteQuery={executeQuery}
                            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}