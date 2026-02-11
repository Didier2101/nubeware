/**
 * Professional Enterprise Services Section - Nubeware
 * Layout corporativo de alta fidelidad con soporte i18n y navegación profunda.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Brain, Cloud, Cpu, Code2,
    ArrowRight, MessageSquare, ShieldCheck, Zap, ArrowLeft
} from 'lucide-react';
import CardService from './CardService';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';

export default function ServicesSection() {
    const { t } = useGlobalTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const coreServices = [
        {
            title: t.service_ai_title || "Soluciones de IA",
            description: t.service_ai_desc || "Desde el aprendizaje profundo hasta la visión artificial, transformamos datos en ventaja competitiva.",
            icon: <Brain size={28} />,
            link: "/services/ai-solutions",
            featured: true
        },
        {
            title: t.service_sw_title || "Software a Medida",
            description: t.service_sw_desc || "Desarrollo de ecosistemas digitales robustos, escalables y orientados a resultados de negocio.",
            icon: <Code2 size={28} />,
            link: "/services/custom-software"
        },
        {
            title: t.service_hw_title || "Hardware de Alto Nivel",
            description: t.service_hw_desc || "Infraestructura física especializada y optimizada para las cargas de trabajo más exigentes.",
            icon: <Cpu size={28} />,
            link: "/services/hardware-solutions"
        },
        {
            title: t.service_cloud_title || "Infraestructura Cloud",
            description: t.service_cloud_desc || "Migraciones estratégicas y arquitecturas cloud-native para máxima elasticidad y seguridad.",
            icon: <Cloud size={28} />,
            link: "/services/cloud-integration"
        },
    ];

    return (
        <div className="bg-white pb-32">
            {/* Page Header - Senior Minimalist */}
            <section className="pt-32 pb-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern opacity-5" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Volver al inicio</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-1 bg-primary rounded-full" />
                            <span className="text-xs font-black text-primary uppercase tracking-[0.3em] font-sans">Strategic Partner</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                            {t.services_hero_title}
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                            {t.services_hero_subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Services Grid */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest mb-4">Core Competencies</h2>
                    <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {coreServices.map((service, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <CardService {...service} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Featured Highlight: The RAG Service */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="bg-slate-950 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden group">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-primary/20 rounded-xl text-primary-400 border border-primary/20">
                                    <MessageSquare className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-widest">Featured Innovation</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    Enterprise Knowledge <br /> Intelligence <span className="text-primary">(RAG)</span>
                                </h2>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                    Imagine que su IA no solo responda, sino que aprenda de toda la base de conocimiento de su empresa en tiempo real, con total seguridad y privacidad.
                                </p>
                                <div className="flex flex-wrap gap-6 text-slate-300">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-bold">Privacidad SOC2</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-bold">Instant Retrieval</span>
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <Link href="/services/ai-solutions/rag">
                                        <button className="flex items-center space-x-4 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300">
                                            <span>Pruebe el Asistente</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 w-full lg:max-w-md">
                                <div className="aspect-video bg-white/5 rounded-[2rem] border border-white/10 p-8 relative group-hover:border-primary/30 transition-colors">
                                    <div className="flex flex-col space-y-4">
                                        <div className="w-2/3 h-4 bg-white/10 rounded-full animate-pulse" />
                                        <div className="w-1/2 h-4 bg-white/10 rounded-full animate-pulse delay-75" />
                                        <div className="w-3/4 h-24 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col p-4 justify-between mt-8">
                                            <div className="flex items-center justify-between">
                                                <div className="w-8 h-8 bg-primary/20 rounded-lg" />
                                                <div className="w-20 h-2 bg-primary/30 rounded-full" />
                                            </div>
                                            <div className="text-[10px] text-primary-300 font-black uppercase tracking-widest">Generating Answer...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Industry Standards & Compliance</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {['ISO 27001', 'SOC2 TYPE II', 'GDPR COMPLIANT', 'HIPAA READY'].map((standard, i) => (
                            <span key={i} className="text-xl lg:text-3xl font-black text-slate-900">{standard}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}