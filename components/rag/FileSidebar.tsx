// components/rag/FileSidebar.tsx
'use client';

import { useRef } from 'react';
import { Upload, File, X, RefreshCw, Trash2 } from 'lucide-react';

interface RAGFile {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
    type: string;
}

interface FileSidebarProps {
    files: RAGFile[];
    onUpload: (file: globalThis.File) => Promise<void>;
    onRefresh: () => void;
    loading: boolean;
    onClose?: () => void;
}

export default function FileSidebar({
    files,
    onUpload,
    onRefresh,
    loading,
    onClose,
}: FileSidebarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles[0]) {
            const file = selectedFiles[0];

            const allowedTypes = [
                'application/pdf',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'text/csv',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ];

            if (!allowedTypes.includes(file.type)) {
                alert('Tipo de archivo no soportado');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('El archivo es demasiado grande (máximo 10MB)');
                return;
            }

            try {
                await onUpload(file);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="h-full flex flex-col lg:rounded-none rounded-t-2xl">
            {/* Header */}
            <div className="p-6">
                {onClose && (
                    <div className="flex justify-center mb-4 lg:hidden">
                        <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-100 text-lg">
                        Documentos ({files.length})
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onRefresh}
                            className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                            title="Actualizar"
                        >
                            <RefreshCw className="w-4 h-4 text-gray-400" />
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors lg:hidden"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Botón de subir */}
            <div className="p-6">
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.txt,.doc,.docx,.csv,.xls,.xlsx"
                    className="hidden"
                    disabled={loading}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-600 text-gray-300 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium hover:border-blue-500 hover:text-blue-400"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    <span>Subir documento</span>
                </button>
            </div>

            {/* Lista de archivos */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                {files.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <File className="w-16 h-16 mx-auto mb-4 opacity-40" />
                        <p className="text-gray-400">No hay documentos</p>
                        <p className="text-sm mt-2 text-gray-500">
                            Sube un archivo para comenzar
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-100 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg">
                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}