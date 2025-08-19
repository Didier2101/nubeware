'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes de Unsplash relacionadas con la nube e integración
const cloudMigrationImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80';
const hybridCloudImage = 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80';
const serverlessImage = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80';
const dataStorageImage = 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80';


const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CloudIntegrationContent = () => {
    return (
        <>
            <Hero
                title="Integración y Servicios en la Nube"
                subtitle="Aproveche el poder de la nube con arquitecturas que permiten obtener mayor escalabilidad, seguridad y economía, impulsando la eficiencia y la innovación de su empresa."
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
                            ¿Qué Ofrecemos en Integración Cloud?
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                            En <b>Nubeware.ai</b>, facilitamos la transición y gestión de su infraestructura en la nube. Integramos sus sistemas y aplicaciones para crear un entorno de TI cohesivo y eficiente.
                        </p>
                    </motion.div>

                    {/* Migración a la Nube - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={cloudMigrationImage}
                                alt="Migración a la Nube"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Migración Estratégica a la Nube</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Planificamos y ejecutamos migraciones seguras y sin problemas a plataformas líderes como AWS, Google Cloud y Azure. Optimizamos sus cargas de trabajo para un rendimiento y costo-eficiencia superiores en la nube.
                            </p>
                        </div>
                    </motion.div>

                    {/* Soluciones de Nube Híbrida - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Implementaciones de Nube Híbrida</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Integramos su infraestructura local con soluciones en la nube, creando un entorno híbrido flexible que le permite aprovechar lo mejor de ambos mundos.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={hybridCloudImage}
                                alt="Soluciones de Nube Híbrida"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Servicios Serverless y Computación sin Servidor - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={serverlessImage}
                                alt="Servicios Serverless"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Servicios Serverless y Computación sin Servidor</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Desarrollamos aplicaciones y servicios utilizando arquitecturas serverless para una mayor escalabilidad, menores costos operativos y un enfoque en el código en lugar de la infraestructura.
                            </p>
                        </div>
                    </motion.div>

                    {/* Almacenamiento y Gestión de Datos en la Nube - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Almacenamiento y Gestión de Datos en la Nube</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Implementamos soluciones de almacenamiento de datos escalables y seguras en la nube. Ofrecemos servicios de gestión, backup y recuperación para garantizar la integridad y disponibilidad de su información.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={dataStorageImage}
                                alt="Almacenamiento de Datos en la Nube"
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

export default CloudIntegrationContent;