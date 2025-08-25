// components/services/AISolutionsContent.tsx 
'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero'; // Importa el componente Hero 
import Image from 'next/image';

// Imágenes de Unsplash - alta calidad y gratuitas
const predictiveAnalysisImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';

const computerVisionImage = 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';
const nlpImage = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
const intelligentAutomationImage = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';


const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AISolutionsContent = () => {
    return (
        <>
            <Hero
                title="Soluciones de Inteligencia Artificial"
                subtitle="Transformamos su negocio con IA de vanguardia, desde el aprendizaje automático hasta las redes neuronales, para automatizar, optimizar y personalizar."
            />
            <section className="py-12 md:py-24 transition-colors duration-300">
                <div className="container mx-auto px-6 max-w-8xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            ¿Qué Hacemos?
                        </h2>
                        <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                            En <b>Nubeware.ai</b>, diseñamos, desarrollamos e implementamos soluciones de IA que se integran perfectamente en su infraestructura existente. Nos especializamos en la creación de modelos de **Machine Learning** y **Deep Learning** para resolver problemas complejos.
                        </p>
                    </motion.div>

                    {/* Análisis Predictivo - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={predictiveAnalysisImage}
                                alt="Análisis Predictivo"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Análisis Predictivo</h3>
                            <p className="text-lg  text-gray-700 dark:text-gray-300 leading-relaxed">
                                Predecimos tendencias de mercado, comportamiento del consumidor y fallos de equipos para optimizar su estrategia de negocio. Utilizamos algoritmos avanzados de machine learning para analizar patrones históricos y generar insights de valor para su negocio.
                            </p>

                        </div>
                    </motion.div>

                    {/* Visión por Computadora - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Visión por Computadora</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Desarrollamos sistemas de reconocimiento de imágenes y video para control de calidad, seguridad y análisis de datos visuales. Nuestras soluciones incluyen detección de objetos, reconocimiento facial y análisis de comportamiento.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={computerVisionImage}
                                alt="Visión por Computadora"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* NLP - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={nlpImage}
                                alt="Procesamiento del Lenguaje Natural"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Procesamiento del Lenguaje Natural (NLP)</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Creamos chatbots inteligentes, análisis de sentimientos y resúmenes automáticos para mejorar la interacción con sus clientes y el manejo de su información. Implementamos modelos de lenguaje avanzados para comprensión contextual.
                            </p>
                        </div>
                    </motion.div>

                    {/* Automatización Inteligente - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Automatización Inteligente</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Diseñamos robots de software (RPA) que combinados con IA, automatizan procesos complejos y liberan a su equipo para tareas estratégicas. Nuestras soluciones reducen errores y aumentan la eficiencia operacional.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={intelligentAutomationImage}
                                alt="Automatización Inteligente"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>


                </div>
            </section>
        </>
    );
};

export default AISolutionsContent;