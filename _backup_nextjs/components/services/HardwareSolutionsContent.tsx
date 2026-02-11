/**
 * Professional Enterprise Hardware Solutions Content - Nubeware
 * Diseño de vanguardia para infraestructura física crítica.
 */

'use client';

import { motion } from 'framer-motion';
import {
    Cpu, Server, Zap,
    ArrowRight, HardDrive, Network, Layers
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import CardService from './CardService';

export default function HardwareSolutionsContent() {
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
            {/* Hero Section - Industrial High-Tech */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Cpu className="w-4 h-4" />
                            <span>Precision Infrastructure</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                            Physical Power for <span className="text-primary italic">Digital Excellence.</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                            La inteligencia necesita un cuerpo. Diseñamos e implementamos la infraestructura física optimizada para las cargas de trabajo más pesadas de IA y datos masivos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Pillars Section */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4">The Hardware Standard</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Infraestructura Físico-Digital de Alto Nivel</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="space-y-12"
                    >
                        {[
                            {
                                icon: <Server className="w-6 h-6" />,
                                title: "Cómputo de Alta Densidad",
                                desc: "Configuraciones de GPU clusters y servidores multihilo para procesos de IA intensivos."
                            },
                            {
                                icon: <Layers className="w-6 h-6" />,
                                title: "Edge AI Devices",
                                desc: "Hardware de bajo consumo y alta respuesta para inferencia directamente en el punto de origen."
                            },
                            {
                                icon: <Network className="w-6 h-6" />,
                                title: "Redes Ultrarrápidas",
                                desc: "Arquitecturas de baja latencia que eliminan cuellos de botella en la transferencia masiva de datos."
                            }
                        ].map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary shadow-sm">
                                    {item.icon}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{item.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl relative group">
                            <Image
                                src="/images/hardware/server-racks.png"
                                alt="Modern Data Center Infrastructure"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />

                            {/* Technical Overlay */}
                            <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-xl max-w-[240px]">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase text-slate-500">Live Diagnostics</span>
                                </div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">Optimización Térmica & Energética Activa</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Specialized Solutions Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-widest">Global Specs</h2>
                        <div className="w-20 h-1.5 bg-primary/20 rounded-full mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <CardService
                            title="NVIDIA H100 Clusters"
                            description="Implementación y optimización de clústeres de GPU de última generación para entrenamiento de LLMs."
                            icon={<Cpu className="w-8 h-8" />}
                        />
                        <CardService
                            title="Rugged Edge Systems"
                            description="Dispositivos industriales preparados para IA en condiciones extremas y entornos desconectados."
                            icon={<HardDrive className="w-8 h-8" />}
                        />
                        <CardService
                            title="Zero Latency LAN"
                            description="Configuraciones InfiniBand y redes RDMA para sincronización perfecta entre nodos de cómputo."
                            icon={<Network className="w-8 h-8" />}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-6 lg:px-12 text-center">
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">¿Listo para escalar su capacidad física?</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Nuestros expertos en infraestructura pueden diseñar el ecosistema perfecto para sus necesidades específicas de rendimiento y presupuesto.
                    </p>
                    <div className="pt-8">
                        <Link href="/services/contact">
                            <button className="flex items-center space-x-4 mx-auto px-12 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-2xl shadow-primary/20 group">
                                <span>Solicitar Consultoría Técnica</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
