'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Brain, Loader2, Zap } from 'lucide-react';

// Importar componentes y tipos
import RAGQuery from './RAGQuery';
import FileUpload from './FileUpload';
import SourceManager from './SourceManager';
import AdminPanel from './AdminPanel';
import ResponseDisplay from './ResponseDisplay';
import { RAGResponse } from './types';

// Importar componentes
const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function RAC() {
    const [loading, setLoading] = useState<boolean>(false);
    const [ragResponse, setRagResponse] = useState<RAGResponse | null>(null);
    const [uploadResponse, setUploadResponse] = useState<RAGResponse | null>(null);
    const [sourcesResponse, setSourcesResponse] = useState<RAGResponse | null>(null);
    const [adminResponse, setAdminResponse] = useState<RAGResponse | null>(null);

    const API_BASE = 'http://192.168.2.47:5058/api';

    // Función para mostrar/ocultar loading
    const showLoading = (show: boolean) => {
        setLoading(show);
    };

    // Función para manejar consultas RAG
    const handleRAGQuery = useCallback(async (username: string, query: string): Promise<void> => {
        showLoading(true);
        try {
            const response = await fetch(`${API_BASE}/rag_query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, query })
            });

            const data: RAGResponse = await response.json();
            setRagResponse(data);

            if (data.answer) {
                await Swal.fire({
                    title: '✅ Consulta Procesada',
                    text: 'La respuesta ha sido generada exitosamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setRagResponse({ error: errorMessage, status: 'error' });
            await Swal.fire({
                title: '❌ Error en la Consulta',
                text: errorMessage,
                icon: 'error'
            });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    // Función para manejar subida de archivos
    const handleFileUpload = useCallback(async (files: FileList | null, metadata: string): Promise<void> => {
        showLoading(true);
        try {
            if (!files || files.length === 0) {
                throw new Error('Por favor selecciona al menos un archivo');
            }

            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            if (metadata) {
                formData.append('metadata', metadata);
            }

            const response = await fetch(`${API_BASE}/upload_datasheets`, {
                method: 'POST',
                body: formData
            });

            const data: RAGResponse = await response.json();
            setUploadResponse(data);

            await Swal.fire({
                title: '📄 Archivos Procesados',
                text: `Se han subido ${files.length} archivo(s) correctamente`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setUploadResponse({ error: errorMessage, status: 'error' });
            await Swal.fire({
                title: '❌ Error en la Subida',
                text: errorMessage,
                icon: 'error'
            });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    // Función para listar fuentes
    const handleListSources = useCallback(async (): Promise<void> => {
        showLoading(true);
        try {
            const response = await fetch(`${API_BASE}/list_sources`);
            const data: RAGResponse = await response.json();
            setSourcesResponse(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setSourcesResponse({ error: errorMessage, status: 'error' });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    // Función para eliminar fuente
    const handleRemoveSource = useCallback(async (sourceName: string): Promise<void> => {
        const result = await Swal.fire({
            title: '🗑️ ¿Confirmar eliminación?',
            text: `¿Estás seguro de que quieres eliminar la fuente "${sourceName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        showLoading(true);
        try {
            const response = await fetch(`${API_BASE}/remove_source`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ source_name: sourceName })
            });

            const data: RAGResponse = await response.json();
            setSourcesResponse(data);

            await Swal.fire({
                title: '✅ Fuente Eliminada',
                text: 'La fuente ha sido eliminada exitosamente',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setSourcesResponse({ error: errorMessage, status: 'error' });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    // Función para obtener información de la base de datos
    const handleGetDatabaseInfo = useCallback(async (): Promise<void> => {
        showLoading(true);
        try {
            const response = await fetch(`${API_BASE}/database_info`);
            const data: RAGResponse = await response.json();
            setAdminResponse(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setAdminResponse({ error: errorMessage, status: 'error' });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    // Función para limpiar la base de datos
    const handleClearDatabase = useCallback(async (): Promise<void> => {
        const result = await Swal.fire({
            title: '⚠️ PELIGRO: Limpiar Base de Datos',
            text: '¿Estás completamente seguro? Esta acción eliminará TODOS los datos permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'SÍ, ELIMINAR TODO',
            cancelButtonText: 'Cancelar',
            input: 'text',
            inputPlaceholder: 'Escribe "CONFIRMAR" para continuar',
            inputValidator: (value) => {
                if (value !== 'CONFIRMAR') {
                    return 'Debes escribir "CONFIRMAR" exactamente';
                }
                return null;
            }
        });

        if (!result.isConfirmed) return;

        showLoading(true);
        try {
            const response = await fetch(`${API_BASE}/clear_database`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data: RAGResponse = await response.json();
            setAdminResponse(data);

            await Swal.fire({
                title: '🔥 Base de Datos Limpiada',
                text: 'Todos los datos han sido eliminados',
                icon: 'success'
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setAdminResponse({ error: errorMessage, status: 'error' });
        } finally {
            showLoading(false);
        }
    }, [API_BASE]);

    return (
        <div className="min-h-screen mt-20  py-8 px-4 sm:px-6 lg:px-8">
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center"
                    >
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                        <p className="text-gray-700 dark:text-gray-300">Procesando...</p>
                    </motion.div>
                </motion.div>
            )}

            <div className="max-w-7xl mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center mb-4">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Brain className="w-12 h-12 text-blue-600 mr-3" />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sistema RAG Avanzado</h1>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300">Interfaz profesional para gestión inteligente de documentos</p>
                </motion.header>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Componente de Consulta RAG */}
                    <RAGQuery onQuery={handleRAGQuery} loading={loading} />

                    {/* Componente de Subida de Archivos */}
                    <FileUpload onUpload={handleFileUpload} loading={loading} />

                    {/* Componente de Gestión de Fuentes */}
                    <SourceManager
                        onListSources={handleListSources}
                        onRemoveSource={handleRemoveSource}
                        loading={loading}
                    />

                    {/* Componente de Administración */}
                    <AdminPanel
                        onGetDatabaseInfo={handleGetDatabaseInfo}
                        onClearDatabase={handleClearDatabase}
                        loading={loading}
                    />
                </motion.div>

                {/* Panel de estadísticas */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        📊 Estado del Sistema
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Consultas Procesadas</p>
                                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,247</p>
                                </div>
                                <Zap className="w-8 h-8 text-blue-500" />
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Documentos Activos</p>
                                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">89</p>
                                </div>
                                <Zap className="w-8 h-8 text-green-500" />
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Rendimiento</p>
                                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">98.7%</p>
                                </div>
                                <Zap className="w-8 h-8 text-purple-500" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Sección de respuestas */}
                <div className="mt-8 space-y-6">
                    {ragResponse && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Respuesta de Consulta</h3>
                            <ResponseDisplay data={ragResponse} isError={ragResponse.status === 'error'} />
                        </div>
                    )}

                    {uploadResponse && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Respuesta de Subida</h3>
                            <ResponseDisplay data={uploadResponse} isError={uploadResponse.status === 'error'} />
                        </div>
                    )}

                    {sourcesResponse && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Respuesta de Fuentes</h3>
                            <ResponseDisplay data={sourcesResponse} isError={sourcesResponse.status === 'error'} />
                        </div>
                    )}

                    {adminResponse && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Respuesta de Administración</h3>
                            <ResponseDisplay data={adminResponse} isError={adminResponse.status === 'error'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}