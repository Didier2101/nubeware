'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes de Unsplash relacionadas con hardware de alto rendimiento
const serverRacksImage = 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80';
const edgeAiImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80';
const gpuClusterImage = 'https://images.unsplash.com/photo-1640552435388-a54879e72b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80';
const dataCenterImage = 'https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HardwareSolutionsContent = () => {
    return (
        <>
            <Hero
                title="Soluciones de Hardware de Alto Rendimiento"
                subtitle="Proporcionamos la infraestructura física necesaria para sus proyectos de IA y datos, desde servidores dedicados hasta dispositivos de computación de borde."
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
                            Nuestra Infraestructura Físico-Digital
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                            En <b>Nubeware.ai</b>, no solo nos enfocamos en el software; entendemos que el rendimiento de una solución de IA depende del hardware subyacente. Ofrecemos asesoramiento y la implementación de hardware optimizado para tareas de Machine Learning, Deep Learning y procesamiento intensivo de datos.
                        </p>
                    </motion.div>

                    {/* Servidores de Alta Potencia - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={serverRacksImage}
                                alt="Servidores de alta potencia en un centro de datos"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Servidores y Racks de Alto Rendimiento</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Ofrecemos la selección y configuración de servidores dedicados y racks optimizados para la carga de trabajo de IA, garantizando la máxima velocidad y capacidad de procesamiento.
                            </p>
                        </div>
                    </motion.div>

                    {/* Computación de Borde (Edge AI) - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Soluciones de Computación de Borde (Edge AI)</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Creamos sistemas de IA de borde para procesar datos directamente en dispositivos y ubicaciones remotas, permitiendo respuestas en tiempo real y reduciendo la latencia.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={edgeAiImage}
                                alt="Dispositivo de computación de borde (Edge AI)"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Clústeres de GPU - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={gpuClusterImage}
                                alt="Clúster de GPU para el entrenamiento de IA"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Implementación de Clústeres de GPU</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Diseñamos e implementamos clústeres de unidades de procesamiento gráfico (GPU) para acelerar el entrenamiento de modelos de Deep Learning y otras tareas de computación intensiva.
                            </p>
                        </div>
                    </motion.div>

                    {/* Infraestructura de Red - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Infraestructura y Redes Optimizadas</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Complementamos el hardware con redes de alta velocidad y una infraestructura robusta para asegurar que la transferencia de datos sea rápida, segura y confiable.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={dataCenterImage}
                                alt="Infraestructura de red en un centro de datos"
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

export default HardwareSolutionsContent;