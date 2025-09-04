'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Trash2 } from 'lucide-react';
import { SourceManagerProps } from './types';

export default function SourceManager({ onListSources, onRemoveSource, loading }: SourceManagerProps) {
    const [sourceName, setSourceName] = useState('');

    const handleRemoveSource = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sourceName) {
            await onRemoveSource(sourceName);
            setSourceName('');
        }
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
                <FileText className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestión de Fuentes</h2>
            </div>

            <div className="space-y-4">
                <motion.button
                    onClick={onListSources}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FileText className="w-5 h-5 mr-2" />
                    {loading ? 'Cargando...' : 'Listar Fuentes Disponibles'}
                </motion.button>

                <form onSubmit={handleRemoveSource} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nombre de fuente a eliminar:
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                            placeholder="nombre_del_archivo.pdf"
                            value={sourceName}
                            onChange={(e) => setSourceName(e.target.value)}
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading || !sourceName}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-5 h-5 mr-2" />
                        {loading ? 'Eliminando...' : 'Eliminar Fuente'}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}