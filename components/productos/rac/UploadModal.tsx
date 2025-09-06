'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';
import { RefObject } from 'react';

interface UploadModalProps {
    showUploadPanel: boolean;
    setShowUploadPanel: (show: boolean) => void;
    handleUploadFiles: () => void;
    files: FileList | null;
    setFiles: (files: FileList | null) => void;
    metadata: string;
    setMetadata: (metadata: string) => void;
    uploading: boolean;
    fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function UploadModal({
    showUploadPanel,
    setShowUploadPanel,
    handleUploadFiles,
    files,
    setFiles,
    metadata,
    setMetadata,
    uploading,
    fileInputRef
}: UploadModalProps) {

    // Función para cerrar el modal
    const closeModal = () => {
        setShowUploadPanel(false);
    };

    // Prevenir la propagación del evento al hacer clic dentro del modal
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {showUploadPanel && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-30"
                    onClick={closeModal} // Cerrar al hacer clic fuera
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
                        onClick={stopPropagation} // Prevenir cierre al hacer clic dentro
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
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
                                    onClick={closeModal}
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
    );
}