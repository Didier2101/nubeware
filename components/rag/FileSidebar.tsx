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
        <div className="h-full flex flex-col bg-white border-r border-gray-200 lg:rounded-none rounded-t-2xl">
            {/* Header */}
            <div className="border-b border-gray-100 p-4">
                {/* Handle para arrastrar - solo en mobile */}
                {onClose && (
                    <div className="flex justify-center mb-3 lg:hidden">
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 text-lg">
                        Documentos ({files.length})
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onRefresh}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Actualizar"
                        >
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded transition-colors lg:hidden"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Botón de subir */}
            <div className="p-4 border-b border-gray-100">
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
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium shadow-sm"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    <span>Subir documento</span>
                </button>
            </div>

            {/* Lista de archivos */}
            <div className="flex-1 overflow-y-auto p-4">
                {files.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <File className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>No hay documentos</p>
                        <p className="text-sm mt-2 text-gray-400">
                            Sube un archivo para comenzar
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
                            >
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded">
                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}