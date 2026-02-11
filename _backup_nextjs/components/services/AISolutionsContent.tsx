/**
 * Professional Enterprise AI Solutions Content - Nubeware
 * Diseño de alta gama con enfoque en RAG, Machine Learning y Visión.
 */

'use client';

import { motion } from 'framer-motion';
import {
    Brain, Sparkles, MessageSquare, Search,
    ShieldCheck, Zap, ArrowRight, BarChart3,
    MonitorSmartphone, Cpu
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import CardService from './CardService';

export default function AISolutionsContent() {
    const { t } = useGlobalTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: import('framer-motion').Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "circOut" }
        },
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Refined Glassmorphism */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-50" />
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary-100/30 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50/50 blur-[100px] rounded-full" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-8">
                            <Sparkles className="w-4 h-4" />
                            <span>Enterprise AI Excellence</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Intelligence <span className="text-primary italic">Redefined.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                            Transformamos datos en decisiones estratégicas. Nuestras soluciones de IA de nivel empresarial están diseñadas para escalar, asegurar y evolucionar con su negocio.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Solution: RAG (Knowledge Intelligence) */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="relative p-1 bg-gradient-to-br from-primary/20 via-slate-100 to-transparent rounded-[3rem]"
                >
                    <div className="bg-white rounded-[2.8rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                            <Brain size={400} />
                        </div>

                        <div className="flex-1 space-y-8 relative z-10">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Flagship Solution</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                                RAG: Inteligencia de <br /><span className="text-primary">Conocimiento Empresarial</span>
                            </h2>

                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                No solo un chatbot. Es la memoria intelectual de su organización. Nuestro sistema RAG (Retrieval-Augmented Generation) permite a los LLMs interactuar con sus documentos privados de forma segura, privada y con precisión quirúrgica.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                {[
                                    { icon: <ShieldCheck className="w-5 h-5" />, text: "100% Privacidad de Datos" },
                                    { icon: <Zap className="w-5 h-5" />, text: "Respuestas Ultrarrápidas" },
                                    { icon: <Search className="w-5 h-5" />, text: "Trazabilidad de Fuentes" },
                                    { icon: <Cpu className="w-5 h-5" />, text: "Integración Multi-formato" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center space-x-3 text-slate-600 font-bold text-sm">
                                        <div className="text-primary">{feature.icon}</div>
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Link href="/services/ai-solutions/rag">
                                    <button className="flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-primary/20 group">
                                        <span>Interactuar con el Demo</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:max-w-md relative">
                            {/* Mockup or Image */}
                            <div className="relative aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <Image
                                    src="/images/ai-solutions/nlp.png"
                                    alt="RAG Interface Preview"
                                    width={500}
                                    height={500}
                                    className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay UI elements */}
                                <div className="absolute top-12 left-12 p-3 bg-white/80 backdrop-blur shadow-lg rounded-xl flex items-center gap-3 border border-slate-100 animate-bounce duration-[3000ms]">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-[10px] font-black uppercase text-slate-500">Security Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Other AI Capabilities */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Nuestras Capacidades</h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                            Ingeniería avanzada para cada aspecto de su transformación digital inteligente.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                title: "Análisis Predictivo",
                                description: "Algoritmos de ML para detectar patrones futuros y optimizar la toma de decisiones basada en datos históricos.",
                                icon: <BarChart3 className="w-8 h-8" />
                            },
                            {
                                title: "Visión por Computadora",
                                description: "Sistemas capaces de interpretar y procesar información visual de alta complejidad para automatización.",
                                icon: <MonitorSmartphone className="w-8 h-8" />
                            },
                            {
                                title: "NLP Avanzado",
                                description: "Entendimiento y generación del lenguaje humano para interfaces inteligentes y extracción de conocimiento.",
                                icon: <Brain className="w-8 h-8" />
                            }
                        ].map((capability, i) => (
                            <motion.div key={i} variants={itemVariants}>
                                <CardService
                                    title={capability.title}
                                    description={capability.description}
                                    icon={capability.icon}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Methodology / Trust Section */}
            <section className="py-24 container mx-auto px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest">The Nubeware standard</h2>
                    <p className="text-2xl md:text-4xl font-bold text-slate-400 leading-tight italic">
                        &quot;La Inteligencia Artificial no es una opción, es el nuevo motor de la ventaja competitiva global.&quot;
                    </p>
                    <div className="pt-8">
                        <Link href="/services/contact">
                            <button className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
                                Discutir su Proyecto
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
