/**
 * File Sidebar - Professional Enterprise Edition
 * Advanced UI/UX with Sky Blue Primary accents and Slate Grays.
 */

'use client';

import { useRef } from 'react';
import {
    Upload, File, RefreshCw, Trash2,
    AlertCircle, ShieldCheck, Database,
    FileText, X, ChevronRight, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFileList, useFileUpload } from '@/src/services/rag/hooks';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import { formatFileSize, getFileIcon } from '@/src/services/rag/utils/formatters';
import { RAGFile } from '@/src/services/rag/types';

interface FileSidebarProps {
    onClose?: () => void;
}

export default function FileSidebar({ onClose }: FileSidebarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useGlobalTranslation();

    const { data, isLoading: isLoadingList, refetch } = useFileList();
    const { uploadFile, isUploading, error, isError, reset } = useFileUpload();

    const files = data?.files || [];
    const isLoading = isLoadingList || isUploading;

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles?.[0]) {
            try {
                await uploadFile(selectedFiles[0]);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } catch (err) {
                console.error('Upload failed:', err);
            }
        }
    };

    return (
        <div className="h-full flex flex-col bg-white border-r border-slate-100/80 relative z-20">
            {/* Header: Refined & Clear */}
            <div className="px-6 py-7 border-b border-slate-50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3.5">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600 border border-primary-100 shadow-sm">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-800 tracking-tight leading-none mb-1">
                                {t.sidebar_title}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                v2.4 Enterprise
                            </p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Status Dashboard: Compact & Clean */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t.files}</span>
                        <span className="text-lg font-black text-slate-800">{files.length}</span>
                    </div>
                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{t.encrypted}</span>
                    </div>
                </div>
            </div>

            {/* Error Feedback Area */}
            <AnimatePresence>
                {isError && error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-4 overflow-hidden"
                    >
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-red-900 mb-0.5">{t.transfer_error}</p>
                                <p className="text-[10px] font-medium text-red-600 truncate">{error.message}</p>
                            </div>
                            <button onClick={reset} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Bar: Modern Single Button */}
            <div className="px-6 py-6">
                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="group w-full relative h-[64px] flex items-center justify-center bg-white border-2 border-dashed border-slate-200 hover:border-primary-400 hover:bg-primary-50/30 rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                >
                    {isUploading ? (
                        <div className="flex items-center space-x-3 text-primary-600">
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-black tracking-tight">{t.processing_upload}</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3 text-slate-500 group-hover:text-primary-600 transition-colors">
                            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary-100 group-hover:scale-110 transition-all">
                                <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-black tracking-tight">{t.upload_doc}</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Content Explorer Section */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="px-6 py-2 flex items-center justify-between">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">{t.content_explorer}</h3>
                    <button
                        onClick={() => refetch()}
                        className={`p-1.5 text-slate-400 hover:text-primary-600 transition-all ${isLoadingList ? 'animate-spin' : ''}`}
                        title={t.sync}
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
                    {isLoadingList ? (
                        <FileListSkeleton />
                    ) : files.length === 0 ? (
                        <EmptyFileList />
                    ) : (
                        <div className="space-y-2.5">
                            {files.map((file) => (
                                <FileItem key={file.id} file={file} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Clean Enterprise Footer */}
            <div className="mt-auto px-6 py-6 border-t border-slate-50 bg-slate-50/40">
                <div className="flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{t.iso_compliant}</span>
                    </div>
                    <HardDrive className="w-4 h-4 text-slate-300" />
                </div>
            </div>
        </div>
    );
}

function FileItem({ file }: { file: RAGFile }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-primary-200 hover:shadow-card transition-all cursor-pointer"
        >
            <div className="flex items-center justify-center w-11 h-11 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-all mr-4 text-xl">
                {getFileIcon(file.name)}
            </div>

            <div className="flex-1 min-w-0 mr-3">
                <p className="text-[13px] font-bold text-slate-700 truncate mb-0.5 group-hover:text-slate-900 transition-colors" title={file.name}>
                    {file.name}
                </p>
                <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{formatFileSize(file.size)}</span>
                    <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-tighter">Verified</span>
                </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 flex items-center transition-all">
                <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="group-hover:hidden text-slate-300">
                <ChevronRight className="w-4 h-4" />
            </div>
        </motion.div>
    );
}

function EmptyFileList() {
    const { t } = useGlobalTranslation();
    return (
        <div className="text-center py-12 px-2">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100/50 shadow-inner">
                <File className="w-8 h-8 text-slate-200" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-2 leading-none">{t.no_assets}</h4>
            <p className="text-[11px] font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">
                {t.no_assets_desc}
            </p>
        </div>
    );
}

function FileListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[64px] bg-slate-50/80 rounded-2xl animate-pulse border border-slate-100" />
            ))}
        </div>
    );
}
