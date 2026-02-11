/**
 * Professional Enterprise Custom Software Content - Nubeware
 * Ingeniería de software de alta gama para desafíos empresariales complejos.
 */

'use client';

import { motion } from 'framer-motion';
import {
    Code2, Smartphone, Globe, Settings,
    ArrowRight, Rocket, ShieldCheck, Database
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import CardService from './CardService';

export default function CustomSoftwareContent() {
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
            {/* Hero Section - Clean Tech Aesthetic */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-50" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-8">
                            <Code2 className="w-4 h-4" />
                            <span>Bespoke Engineering</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Software that <span className="text-primary italic">Thinks.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                            No solo escribimos código, construimos soluciones. Software diseñado desde cero para alinearse con su visión, optimizar sus procesos y escalar con su éxito.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Solutions Grid */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Web Architectures", icon: <Globe />, desc: "Plataformas web de alto rendimiento con Next.js y ecosistemas modernos." },
                        { title: "Mobile Ecosystems", icon: <Smartphone />, desc: "Apps nativas e híbridas diseñadas para una experiencia de usuario superior." },
                        { title: "Enterprise Logic", icon: <Settings />, desc: "Sistemas Core que automatizan la complejidad operativa de su negocio." },
                        { title: "API Systems", icon: <Rocket />, desc: "Microservicios escalables para una integración perfecta de datos." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <CardService
                                title={item.title}
                                icon={item.icon}
                                description={item.desc}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Detailed Value Proposition */}
            <section className="py-24 bg-slate-50 rounded-[4rem] mx-6 lg:mx-12 border border-slate-200/50">
                <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 space-y-10">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Misión Crítica & <br /> Calidad Superior</h2>

                        <div className="space-y-8">
                            {[
                                {
                                    title: "Seguridad por Diseño",
                                    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
                                    desc: "Implementamos los estándares de seguridad más rigurosos desde la primera línea de código."
                                },
                                {
                                    title: "Arquitectura Escalable",
                                    icon: <Database className="w-6 h-6 text-primary" />,
                                    desc: "Diseñamos sistemas que crecen con usted, sin comprometer el rendimiento ni la estabilidad."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative aspect-video bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden group">
                            <Image
                                src="/images/software/web-development.png"
                                alt="Modern Software Development"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        </div>
                        {/* Floating Tech Badges */}
                        <div className="absolute -bottom-6 -right-6 p-6 bg-primary text-white rounded-[2rem] shadow-2xl z-20">
                            <div className="text-2xl font-black">99.9%</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Uptime Guaranteed</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 container mx-auto px-6 lg:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto space-y-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight italic">Construyamos su Próximo Activo Digital</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Nuestro proceso consultivo asegura que cada centavo invertido en software genere un retorno de valor tangible para su empresa.
                    </p>
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/services/contact">
                            <button className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                                Hablar con un Ingeniero
                            </button>
                        </Link>
                        <Link href="/services/ai-solutions">
                            <button className="flex items-center space-x-3 px-8 py-5 border border-slate-200 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                                <span>Ver IA Integrada</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
