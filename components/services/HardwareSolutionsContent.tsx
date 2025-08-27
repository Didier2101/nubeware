'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes locales en formato PNG
const serverRacksImage = '/images/hardware/server-racks.png';
const edgeAiImage = '/images/hardware/edge-ai.png';
const gpuClusterImage = '/images/hardware/gpu-cluster.png';
const dataCenterImage = '/images/hardware/data-center.png';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HardwareSolutionsContent = () => {
    return (
        <>
            <Hero
                title="Soluciones de Hardware de Alto Rendimiento"
                subtitle="Proporcionamos la infraestructura física necesaria para proyectos de IA y datos, desde servidores dedicados hasta dispositivos de computación de borde, garantizando un ecosistema tecnológico optimizado y escalable."
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
                            En <b>Nubeware.ai</b>, sabemos que el rendimiento de una solución de IA no solo depende del software, sino también del hardware que lo soporta. Por ello ofrecemos asesoramiento, diseño e implementación de hardware optimizado para tareas de Machine Learning, Deep Learning y procesamiento intensivo de datos, garantizando eficiencia, confiabilidad y escalabilidad a largo plazo.
                        </p>
                    </motion.div>

                    {/* Servidores de Alta Potencia */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Servidores y Racks de Alto Rendimiento</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Un software de IA solo es tan potente como el hardware que lo aloja. Ofrecemos una selección y configuración experta de servidores dedicados y racks diseñados para maximizar la velocidad, la capacidad de procesamiento y la confiabilidad de sus cargas de trabajo. Cada componente es cuidadosamente elegido para garantizar no solo el rendimiento actual, sino también la compatibilidad con futuras expansiones y tecnologías emergentes, protegiendo su inversión a largo plazo.
                            </p>
                        </div>
                    </motion.div>

                    {/* Computación de Borde (Edge AI) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Soluciones de Computación de Borde (Edge AI)</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                En aplicaciones que requieren inmediatez, el tiempo es crítico. Creamos sistemas de IA en el borde (Edge AI), donde el procesamiento de datos ocurre directamente en el dispositivo o en ubicaciones remotas, sin depender de la nube. Esto no solo permite respuestas inmediatas, sino que también reduce significativamente la latencia, mejora la seguridad y la privacidad de los datos, y asegura la autonomía operativa incluso en entornos con baja o nula conectividad.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={edgeAiImage}
                                alt="Dispositivo de computación de borde (Edge AI)"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Clústeres de GPU */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Implementación de Clústeres de GPU</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Para los proyectos de IA más exigentes, la potencia de las GPUs es indispensable. Diseñamos e implementamos clústeres de GPU escalables que ofrecen una capacidad de procesamiento masiva para acelerar el entrenamiento de modelos de Deep Learning y tareas de análisis intensivo. Estas soluciones de alto rendimiento son clave para la investigación avanzada, la simulación compleja y la producción a gran escala, proporcionando la potencia de cálculo necesaria para liderar la innovación en su sector.
                            </p>
                        </div>
                    </motion.div>

                    {/* Infraestructura de Red */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Infraestructura y Redes Optimizadas</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                El hardware sin una red robusta es un eslabón débil. Complementamos nuestras soluciones de cómputo con redes de alta velocidad y arquitecturas robustas que aseguran una transferencia de datos rápida, segura y confiable. Esto garantiza que todos los componentes de su ecosistema tecnológico funcionen de manera sincronizada y eficiente, manteniendo la estabilidad y el rendimiento incluso en entornos de máxima demanda y crecimiento acelerado.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={dataCenterImage}
                                alt="Infraestructura de red en un centro de datos"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default HardwareSolutionsContent;