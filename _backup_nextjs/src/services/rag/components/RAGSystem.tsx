/**
 * RAG System - Professional Enterprise Architecture
 * Orchestrates the RAG module with premium design, motion, and i18n support.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from '@/src/services/rag/components/ChatInterface';
import FileSidebar from '@/src/services/rag/components/FileSidebar';
import { useSidebar } from '@/src/services/rag/hooks';

export default function RAGSystem() {
    return <RAGContent />;
}

function RAGContent() {
    const sidebar = useSidebar(false);

    return (
        <div className="h-screen overflow-hidden bg-white text-slate-800 selection:bg-primary-500/10 flex flex-col antialiased">
            {/* Soft Ambient Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden overflow-x-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-100/30 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-primary-50/50 blur-[100px] rounded-full" />
            </div>

            {/* Desktop Layout */}
            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Modern Sidebar - Professional White/Gray */}
                <aside className="hidden lg:block w-[340px] flex-shrink-0 border-r border-slate-100 bg-white/40 backdrop-blur-md">
                    <FileSidebar />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
                    <ChatInterface onToggleSidebar={sidebar.toggle} />
                </main>
            </div>

            {/* Mobile Layout - Premium Bottom Sheet */}
            <div className="lg:hidden">
                <AnimatePresence mode="wait">
                    {sidebar.isOpen && (
                        <>
                            {/* Sophisticated Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-[3px] z-[40]"
                                onClick={sidebar.close}
                            />

                            {/* Bottom Sheet Sidebar */}
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                                className="fixed bottom-0 left-0 right-0 z-[50] rounded-t-[2.5rem] bg-white shadow-2xl max-h-[92vh] flex flex-col border-t border-slate-100 overflow-hidden"
                            >
                                <div className="w-full flex justify-center py-5 shrink-0" onClick={sidebar.close}>
                                    <div className="w-14 h-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer" />
                                </div>
                                <div className="flex-1 overflow-auto">
                                    <FileSidebar onClose={sidebar.close} />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
