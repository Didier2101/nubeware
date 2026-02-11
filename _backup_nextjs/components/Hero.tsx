/**
 * Professional Enterprise Hero - Nubeware
 * Diseño minimalista de alta gama para corporaciones.
 * Soporta props opcionales o traducciones automáticas.
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';

interface HeroProps {
    title?: string;
    subtitle?: string;
    hideButtons?: boolean;
}

export default function Hero({ title, subtitle, hideButtons = false }: HeroProps) {
    const { t } = useGlobalTranslation();

    const displayTitle = title || t.hero_title;
    const displaySubtitle = subtitle || t.hero_subtitle;

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-white dark:bg-slate-900">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />
            <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[12px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Nubeware Intelligence</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                        {displayTitle}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                        {displaySubtitle}
                    </p>

                    {!hideButtons && (
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <Link href="/services" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                                <span>{t.btn_get_started}</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/services/about" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-2xl shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                {t.btn_learn_more}
                            </Link>
                        </div>
                    )}
                </motion.div>

                {/* Abstract Tech Visual (Simplified for secondary pages) */}
                {!title && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 bg-white rounded-[3rem] shadow-2xl border border-slate-200/50 p-2 overflow-hidden aspect-[4/3] flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
                            <div className="relative z-10 w-full h-full border border-slate-100 rounded-[2.5rem] bg-white p-8 flex flex-col justify-center items-center text-center">
                                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                                    <Sparkles className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise Ready</h3>
                                <p className="text-slate-400 font-medium">Built for the future of AI in the cloud.</p>
                            </div>
                        </div>

                        <div className="absolute -top-10 -right-10 w-64 h-64 border border-slate-100 rounded-full -z-10 animate-spin-slow" />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

