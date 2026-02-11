/**
 * Professional Enterprise Landing Page - Nubeware
 * Orquestador principal de la experiencia de usuario.
 */

'use client';

import { motion } from 'framer-motion';
import {
    Brain, Cloud, Code2, ShieldCheck, TrendingUp,
    HeartHandshake, Puzzle, Workflow, Handshake, Cpu
} from 'lucide-react';
import CardService from '../services/CardService';
import Hero from '../Hero';
import ClientsSection from '../ClientsSection';
import TestimonialsSection from '../TestimonialsSection';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';

export default function LandingPage() {
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
            transition: { duration: 0.8, ease: "circOut" },
        },
    };


    return (
        <div className="bg-slate-50 overflow-hidden">
            {/* Hero Section */}
            <Hero />

            {/* Trust Bar / Clients */}
            <div className="relative z-10 -mt-10 mb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                        <ClientsSection />
                    </div>
                </div>
            </div>

            {/* Core Services Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 text-primary font-bold text-[13px] uppercase tracking-widest mb-6"
                        >
                            <span className="w-8 h-[1px] bg-primary" />
                            <span>{t.nav_services}</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight"
                        >
                            {t.section_services_title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-500 font-medium leading-relaxed"
                        >
                            {t.section_services_desc}
                        </motion.p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { title: t.service_ai_title, description: t.service_ai_desc, icon: <Brain size={28} />, link: "/services/ai-solutions", featured: true },
                            { title: t.service_hw_title, description: t.service_hw_desc, icon: <Cpu size={28} />, link: "/services/hardware-solutions" },
                            { title: t.service_sw_title, description: t.service_sw_desc, icon: <Code2 size={28} />, link: "/services/custom-software" },
                            { title: t.service_cloud_title, description: t.service_cloud_desc, icon: <Cloud size={28} />, link: "/services/cloud-integration" },
                        ].map((service, i) => (
                            <motion.div key={i} variants={itemVariants}>
                                <CardService {...service} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section - Grid Moderno */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <div className="max-w-2xl mx-auto mb-20 text-center">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            {t.section_why_title}
                        </h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-3 gap-12"
                    >
                        {[
                            { title: t.why_security_title, desc: t.why_security_desc, icon: <ShieldCheck size={28} /> },
                            { title: t.why_innovation_title, desc: t.why_innovation_desc, icon: <TrendingUp size={28} /> },
                            { title: t.why_support_title, desc: t.why_support_desc, icon: <HeartHandshake size={28} /> },
                        ].map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500">
                                    <div className="text-slate-400 group-hover:text-primary transition-colors">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Methodology Section - Step Visuals */}
            <section className="py-24 mb-12 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl mx-auto mb-20 text-center">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            {t.section_methodology_title}
                        </h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-3 gap-0 border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-premium"
                    >
                        {[
                            { title: t.met_analysis_title, desc: t.met_analysis_desc, icon: <Puzzle size={28} />, step: "01" },
                            { title: t.met_agile_title, desc: t.met_agile_desc, icon: <Workflow size={28} />, step: "02" },
                            { title: t.met_support_title, desc: t.met_support_desc, icon: <Handshake size={28} />, step: "03" },
                        ].map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className={`p-16 relative group ${i < 2 ? 'border-r border-slate-100' : ''}`}>
                                <span className="absolute top-10 right-10 text-6xl font-black text-slate-50 group-hover:text-primary/5 transition-colors">{item.step}</span>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-8 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <div className="bg-slate-900 py-32 rounded-t-3xl text-white">
                <TestimonialsSection />
            </div>
        </div>
    );
}
