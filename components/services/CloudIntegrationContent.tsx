'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';

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
                            En <b>Nubeware.ai</b>, facilitamos la transición y gestión de su infraestructura en la nube. Integramos sus sistemas y aplicaciones para crear un entorno de TI cohesivo, eficiente y preparado para el futuro digital de su organización.
                        </p>
                    </motion.div>

                    {/* Migración a la Nube */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="/images/cloud/cloud-migration.png"
                                alt="Migración a la Nube"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Migración Estratégica a la Nube</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                El camino hacia la nube puede ser complejo, pero con nuestra experiencia, garantizamos una transición fluida y segura. Realizamos un análisis exhaustivo de su infraestructura actual y planificamos una migración estratégica a plataformas líderes como AWS, Google Cloud y Azure. Nuestro enfoque está en optimizar sus cargas de trabajo desde el inicio, asegurando un rendimiento superior y una gestión de costos eficiente. Priorizamos la continuidad de sus operaciones y minimizamos los tiempos de inactividad, para que su negocio se beneficie de la nube sin interrupciones.
                            </p>
                        </div>
                    </motion.div>

                    {/* Nube Híbrida */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Implementaciones de Nube Híbrida</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                No todos los datos y aplicaciones necesitan estar en un solo lugar. Con nuestras soluciones de Nube Híbrida, creamos un puente seguro y eficiente entre su infraestructura local y la nube pública. Esto le brinda la flexibilidad de mantener datos sensibles en sus propios servidores mientras aprovecha la escalabilidad y los servicios avanzados de la nube para otras cargas de trabajo. El resultado es un entorno de TI más resiliente, seguro y con un control preciso sobre sus activos digitales.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <img
                                src="/images/cloud/hybrid-cloud.png"
                                alt="Soluciones de Nube Híbrida"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Serverless */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="/images/cloud/serverless.png"
                                alt="Servicios Serverless"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className='text-center'>
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Servicios Serverless y Computación sin Servidor</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Con las arquitecturas serverless, usted se libera de la gestión de la infraestructura. Nosotros nos encargamos de construir y desplegar sus aplicaciones en un entorno donde solo paga por lo que usa. Esta computación sin servidor no solo reduce drásticamente los costos operativos, sino que también permite que sus aplicaciones escalen automáticamente para manejar cualquier demanda de tráfico. El resultado es un desarrollo más rápido, un mantenimiento más simple y la capacidad de su equipo para enfocarse exclusivamente en la innovación y el crecimiento de su negocio.
                            </p>
                        </div>
                    </motion.div>

                    {/* Almacenamiento en la Nube */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Almacenamiento y Gestión de Datos en la Nube</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                La seguridad y la accesibilidad de sus datos son cruciales. Diseñamos e implementamos soluciones de almacenamiento en la nube que ofrecen una escalabilidad ilimitada y una seguridad de nivel empresarial. Más allá del simple almacenamiento, proporcionamos servicios integrales de gestión de datos, copias de seguridad automáticas y planes de recuperación ante desastres, lo que garantiza la integridad y disponibilidad de su información en todo momento. Trabajamos bajo estrictos estándares internacionales de seguridad para que usted tenga total tranquilidad.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <img
                                src="/images/cloud/data-storage.png"
                                alt="Almacenamiento de Datos en la Nube"
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

export default CloudIntegrationContent;