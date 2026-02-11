/**
 * Professional Enterprise Cloud Integration Content - Nubeware
 * Arquitecturas cloud-native de nivel empresarial.
 */

'use client';

import { motion } from 'framer-motion';
import {
    Cloud, Zap, Layers,
    ArrowRight, Server, Globe, ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import CardService from './CardService';

export default function CloudIntegrationContent() {
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
            {/* Hero Section - Cloud Gradient */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary/5">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-8">
                            <Cloud className="w-4 h-4" />
                            <span>Cloud-Native Excellence</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Infinite Scale. <span className="text-primary italic">Zero Limits.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                            Migraciones estratégicas, arquitecturas híbridas y soluciones serverless que transforman su infraestructura en un activo competitivo global.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cloud Providers Showcase */}
            <section className="py-16 bg-slate-900">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Certified Partners</h3>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 hover:opacity-100 transition-opacity">
                        {['AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean'].map((provider, i) => (
                            <span key={i} className="text-2xl md:text-3xl font-black text-white">{provider}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Cloud Services */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <div className="mb-20">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4">Cloud Capabilities</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Arquitecturas que Escalan con su Visión</h3>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        {
                            title: "Cloud Migration",
                            icon: <Globe className="w-8 h-8" />,
                            description: "Transiciones estratégicas con cero downtime y optimización de costos desde el día uno."
                        },
                        {
                            title: "Hybrid Architectures",
                            icon: <Layers className="w-8 h-8" />,
                            description: "Lo mejor de ambos mundos: control on-premise y elasticidad cloud en perfecta armonía."
                        },
                        {
                            title: "Serverless Systems",
                            icon: <Zap className="w-8 h-8" />,
                            description: "Pague solo por lo que usa. Escalado automático sin gestión de infraestructura."
                        },
                        {
                            title: "Security & Compliance",
                            icon: <ShieldCheck className="w-8 h-8" />,
                            description: "Cumplimiento SOC2, GDPR e ISO 27001 integrado en cada capa de su cloud stack."
                        }
                    ].map((service, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <CardService {...service} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Featured Architecture Diagram */}
            <section className="py-24 bg-slate-50 rounded-[4rem] mx-6 lg:mx-12 border border-slate-200/50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                Infraestructura <br />como <span className="text-primary">Código</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Implementamos prácticas DevOps avanzadas con Terraform, Kubernetes y CI/CD pipelines que garantizan deployments predecibles, reproducibles y seguros.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { metric: "99.99%", label: "Uptime SLA" },
                                    { metric: "< 50ms", label: "Global Latency" },
                                    { metric: "Auto", label: "Disaster Recovery" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="text-3xl font-black text-primary">{item.metric}</div>
                                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden relative group">
                                <Image
                                    src="/images/cloud/cloud-migration.png"
                                    alt="Cloud Architecture Diagram"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute top-10 right-10 p-4 bg-white/90 backdrop-blur rounded-xl shadow-lg border border-slate-100">
                                    <div className="flex items-center space-x-2">
                                        <Server className="w-5 h-5 text-primary" />
                                        <span className="text-xs font-black uppercase text-slate-500">Multi-Region Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost Optimization Section */}
            <section className="py-24 container mx-auto px-6 lg:px-12">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Optimización de Costos Inteligente</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Nuestros clientes reducen en promedio un <span className="text-primary font-black">40% sus costos cloud</span> en los primeros 6 meses mediante arquitecturas optimizadas y monitoreo continuo.
                    </p>
                    <div className="pt-8">
                        <Link href="/services/contact">
                            <button className="flex items-center space-x-4 mx-auto px-12 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-2xl shadow-primary/20 group">
                                <span>Auditoría Cloud Gratuita</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
