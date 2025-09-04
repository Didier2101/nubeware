'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { FileUploadProps } from './types';

export default function FileUpload({ onUpload, loading }: FileUploadProps) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [metadata, setMetadata] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUpload(files, metadata);
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
            <div className="flex items-center mb-6">
                <Upload className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Subir Documentos</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Seleccionar archivos (PDF, TXT, DOCX, CSV):
                    </label>
                    <input
                        type="file"
                        multiple
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all duration-300"
                        onChange={(e) => setFiles(e.target.files)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Metadatos (JSON opcional):</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                        placeholder='{"category": "electronics", "type": "datasheet"}'
                        rows={3}
                        value={metadata}
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={loading || !files}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Upload className="w-5 h-5 mr-2" />
                    {loading ? 'Subiendo...' : 'Subir Archivos'}
                </motion.button>
            </form>
        </motion.div>
    );
}