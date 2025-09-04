'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { RAGQueryProps } from './types';

export default function RAGQuery({ onQuery, loading }: RAGQueryProps) {
    const [username, setUsername] = useState('testuser');
    const [query, setQuery] = useState('¿Qué es un transistor?');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onQuery(username, query);
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
                <Search className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Consulta Inteligente</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usuario:</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                        placeholder="Tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consulta:</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                        placeholder="Escribe tu pregunta aquí..."
                        rows={4}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Search className="w-5 h-5 mr-2" />
                    {loading ? 'Procesando...' : 'Enviar Consulta'}
                </motion.button>
            </form>
        </motion.div>
    );
}