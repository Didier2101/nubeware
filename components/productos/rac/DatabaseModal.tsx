'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, ChevronLeft, Search, FolderOpen, X } from 'lucide-react';
import { Source } from './ChatRAG';

interface DatabaseModalProps {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredSources: Source[];
}

export default function DatabaseModal({
    showSidebar,
    setShowSidebar,
    searchTerm,
    setSearchTerm,
    filteredSources
}: DatabaseModalProps) {

    // Función para cerrar el modal
    const closeModal = () => {
        setShowSidebar(false);
    };

    // Prevenir la propagación del evento al hacer clic dentro del modal
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {showSidebar && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={closeModal} // Cerrar al hacer clic fuera
                    />
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed lg:relative left-0 top-0 h-full w-80 bg-gray-800 border-r border-gray-700 z-50 flex flex-col"
                        onClick={stopPropagation} // Prevenir cierre al hacer clic dentro
                    >
                        <div className="p-4 border-b border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <Database className="w-5 h-5 mr-2 text-blue-400" />
                                    Knowledge Base
                                </h2>
                                <div className="flex items-center">
                                    <button
                                        onClick={closeModal}
                                        className="lg:hidden p-1 hover:bg-gray-700 rounded mr-2"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setShowSidebar(false)}
                                        className="hidden lg:block p-1 hover:bg-gray-700 rounded"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                </div>
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
    );
}