// app/services/page.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Brain, Cloud, Rocket, Code2, CheckCircle, Award, FlaskConical } from 'lucide-react';
import CardService from './CardService';
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
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const ServicesSection = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-950  text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
            {/* Sección de Héroe (Altura Ajustada) */}
            <Hero
                title="Nuestros Servicios de Vanguardia"
                subtitle="En Nubeware.ai, no solo ofrecemos tecnología; creamos el futuro. Nuestro equipo de expertos está aquí para ayudarle a desarrollar estrategias exitosas en la actualidad para lograr una transformación digital."
            />

            <hr className="my-8 border-gray-200 dark:border-gray-800" />

            {/* Sección "¿Por qué Nuestros Servicios son Diferentes?" (Animación al Scroll) */}
            <div className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12"
                    >
                        ¿Por qué Nuestros Servicios son Diferentes?
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
                    >
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Enfoque Personalizado"
                                description="Entendemos que cada cliente es único. Adaptamos nuestros servicios a sus desafíos y objetivos específicos, asegurando soluciones a la medida."
                                icon={<CheckCircle size={48} />}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Tecnología de Punta"
                                description="Utilizamos los últimos avances en Machine Learning, Deep Learning y Cloud Computing para ofrecerle soluciones innovadoras y de alto rendimiento."
                                icon={<FlaskConical size={48} />}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardService
                                title="Resultados Comprobados"
                                description="Nuestra experiencia y conocimientos se traducen en resultados tangibles para su negocio, impulsando la eficiencia, la inteligencia y el crecimiento."
                                icon={<Award size={48} />}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-800" />

            {/* Sección de Servicios (Animación al Scroll) */}
            <div className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12"
                    >
                        Nuestros Servicios de Vanguardia
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
                    >
                        <CardService
                            title="Machine Learning"
                            description="Utilizamos algoritmos avanzados como Naive Bayes y Árboles de Decisión para extraer conocimiento y patrones de sus datos. Convertimos la información en decisiones inteligentes."
                            icon={<Brain size={48} />}
                        />
                        <CardService
                            title="Deep Learning"
                            description="Entrenamos redes neuronales convolucionales y modelos de Transformers para resolver los problemas más complejos. Reconocimiento de imágenes, procesamiento de lenguaje natural y más."
                            icon={<Rocket size={48} />}
                        />
                        <CardService
                            title="Cloud Computing"
                            description="Desarrollamos microservicios escalables y robustos en Python, Javascript y Typescript para asegurar que su solución esté siempre disponible, en cualquier escala."
                            icon={<Cloud size={48} />}
                        />
                        <CardService
                            title="Software a la Medida"
                            description="Transformamos sus ideas en realidad. Creamos soluciones de software personalizadas desde cero, optimizadas para sus necesidades específicas y con la más alta calidad técnica."
                            icon={<Code2 size={48} />}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;