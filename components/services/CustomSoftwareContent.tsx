'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes de Unsplash relacionadas con el desarrollo de software
const webDevelopmentImage = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80';
const mobileDevelopmentImage = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
const enterpriseSolutionsImage = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80';
const customSoftwareImage = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CustomSoftwareContent = () => {
    return (
        <>
            <Hero
                title="Desarrollo de Software a Medida"
                subtitle="Construimos aplicaciones web, móviles y de escritorio diseñadas específicamente para sus necesidades, optimizando flujos de trabajo y mejorando la productividad."
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
                            Nuestras Soluciones Personalizadas
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                            En <b>Nubeware.ai</b>, entendemos que cada negocio es único. Por eso, nuestro servicio de software a medida se centra en entender sus requisitos exactos para crear una solución que encaje perfectamente con sus operaciones. Utilizamos tecnologías modernas y metodologías ágiles para entregar productos de alta calidad en plazos definidos.
                        </p>
                    </motion.div>

                    {/* Desarrollo de Aplicaciones Web - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={webDevelopmentImage}
                                alt="Desarrollo de Aplicaciones Web"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Aplicaciones Web Robustas</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Desde portales de clientes y e-commerce hasta complejas plataformas empresariales, creamos aplicaciones web seguras, escalables y optimizadas para cualquier dispositivo.
                            </p>
                        </div>
                    </motion.div>

                    {/* Desarrollo de Aplicaciones Móviles - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Desarrollo Móvil Multiplataforma</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Diseñamos y construimos aplicaciones móviles nativas y multiplataforma para iOS y Android, asegurando una experiencia de usuario fluida e intuitiva.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={mobileDevelopmentImage}
                                alt="Desarrollo de Aplicaciones Móviles"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Soluciones de Software Empresarial - Imagen izquierda, descripción derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={enterpriseSolutionsImage}
                                alt="Soluciones de Software Empresarial"
                                width={600}
                                height={400}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Software para la Gestión Empresarial</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Creamos sistemas de gestión de inventario, CRMs, ERPs y otras herramientas personalizadas que automatizan y optimizan los flujos de trabajo de su negocio.
                            </p>
                        </div>
                    </motion.div>

                    {/* Integración y Modernización de Software - Descripción izquierda, imagen derecha */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Integración y Modernización de Software</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Modernizamos sistemas legados y los integramos con tecnologías y aplicaciones más recientes para garantizar que su ecosistema digital sea cohesivo y eficiente.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={customSoftwareImage}
                                alt="Integración y Modernización de Software"
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

export default CustomSoftwareContent;