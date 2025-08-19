// app/page.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Brain, Cloud, Code2, ShieldCheck, TrendingUp, HeartHandshake, Puzzle, Workflow, Handshake, Cpu, } from 'lucide-react';
import CardService from '../services/CardService';
import Hero from '../Hero';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function LandingPage() {
    return (
        <div className="transition-colors duration-300 min-h-screen">
            {/* Sección de Héroe */}
            <Hero
                title="Software, Hardware, Nubeware."
                subtitle="Impulsamos el logro de los objetivos de Negocio de las empresas a través de AI, Analítica, Servicios Cloud y software a la medida. Estamos convencidos de que la alta tecnología puede estar al alcance de todos y trabajar al servicio de la humanidad."
                buttonText="Conoce nuestros servicios"
                buttonLink="/services"
            />



            {/* Sección de Servicios Principales */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Nuestros Servicios Principales
                    </motion.h2>
                    <motion.p
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
                    >
                        Descubre cómo podemos transformar tu negocio con nuestras soluciones especializadas
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Inteligencia Artificial"
                                description="Soluciones de IA de vanguardia, desde machine learning hasta redes neuronales para automatizar y optimizar."
                                icon={<Brain size={32} />}
                                link="/services/ai-solutions"
                            // featured={true}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Hardware de alto rendimiento"
                                description="Infraestructura física optimizada para proyectos de IA, desde servidores hasta computación de borde."
                                icon={<Cpu size={32} />}
                                link="/services/hardware-solutions"
                            // gradient={true}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Software a la Medida"
                                description="Desarrollo de aplicaciones web, móviles y empresariales diseñadas específicamente para sus necesidades."
                                icon={<Code2 size={32} />}
                                link="/services/custom-software"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Servicios en la Nube"
                                description="Integración y migración a la nube con arquitecturas que permiten obtener mayor escalabilidad, seguridad y economía"
                                icon={<Cloud size={32} />}
                                link="/services/cloud-integration"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-16" />

            {/* Sección de Por qué elegirnos */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
                    >
                        ¿Por qué elegirnos?
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-3 gap-10"
                    >
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Seguridad de Datos"
                                description="Su confianza es nuestra prioridad. Implementamos las más rigurosas prácticas de ciberseguridad para proteger sus datos y sistemas."
                                icon={<ShieldCheck size={32} />}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Innovación Continua"
                                description="Nos mantenemos a la vanguardia, investigando y aplicando las últimas tendencias en IA para ofrecerle soluciones de futuro."
                                icon={<TrendingUp size={32} />}
                            // featured={true}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Soporte Personalizado"
                                description="Cada cliente es único. Le ofrecemos una atención dedicada, entendiendo sus necesidades para crear soluciones reales."
                                icon={<HeartHandshake size={32} />}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Sección de Metodología */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
                    >
                        Nuestra Metodología
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid md:grid-cols-3 gap-10"
                    >
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Análisis y Estrategia"
                                description="Comenzamos con una inmersión profunda en su negocio para entender sus desafíos y definir una hoja de ruta tecnológica clara."
                                icon={<Puzzle size={32} />}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Desarrollo Ágil"
                                description="Usamos metodologías ágiles para desarrollar su solución en ciclos cortos, asegurando transparencia y entrega continua de valor."
                                icon={<Workflow size={32} />}
                            // gradient={true}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Implementación y Soporte"
                                description="No sólo entregamos el producto. Garantizamos una implementación fluida y le ofrecemos soporte continuo para máximo rendimiento."
                                icon={<Handshake size={32} />}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}