'use client';

import { motion } from 'framer-motion';
import { Database, Trash2 } from 'lucide-react';
import { AdminPanelProps } from './types';

export default function AdminPanel({ onGetDatabaseInfo, onClearDatabase, loading }: AdminPanelProps) {
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
                <Database className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Administración</h2>
            </div>

            <div className="space-y-4">
                <motion.button
                    onClick={onGetDatabaseInfo}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Database className="w-5 h-5 mr-2" />
                    {loading ? 'Obteniendo información...' : 'Obtener Info de Base de Datos'}
                </motion.button>

                <motion.button
                    onClick={onClearDatabase}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Trash2 className="w-5 h-5 mr-2" />
                    {loading ? 'Procesando...' : 'Limpiar Base de Datos Completa'}
                </motion.button>
            </div>
        </motion.div>
    );
}