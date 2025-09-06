'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes en formato PNG relacionadas con el desarrollo de software
const webDevelopmentImage = '/images/software/web-development.png';
const mobileDevelopmentImage = '/images/software/mobile-development.png';
const enterpriseSolutionsImage = '/images/software/enterprise-solutions.png';
const customSoftwareImage = '/images/software/custom-software.png';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CustomSoftwareContent = () => {
    return (
        <>
            <Hero
                title="Desarrollo de Software a Medida"
                subtitle="Construimos aplicaciones web, móviles y de escritorio diseñadas específicamente para sus necesidades, optimizando flujos de trabajo, reduciendo costos operativos y mejorando la productividad."
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
                        <p className="text-lg text-gray-700 text-center dark:text-gray-300 leading-relaxed mb-8">
                            En <b>Nubeware.ai</b> entendemos que cada negocio es único. Por eso, nuestro servicio de software a medida se centra en comprender en profundidad sus procesos y objetivos, para luego crear una solución que encaje perfectamente con sus operaciones. Utilizamos tecnologías modernas, metodologías ágiles y prácticas de desarrollo seguras que nos permiten entregar productos de alta calidad en plazos definidos, garantizando escalabilidad y evolución futura.
                        </p>
                    </motion.div>

                    {/* Desarrollo de Aplicaciones Web */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Aplicaciones Web Robustas</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Su presencia digital es la puerta de entrada a su negocio. Desarrollamos aplicaciones web seguras, escalables y optimizadas para cualquier dispositivo y navegador. Ya sea un portal de clientes intuitivo, una robusta plataforma de e-commerce o una compleja herramienta empresarial a gran escala, nuestras soluciones se construyen con arquitecturas modernas y principios de usabilidad que garantizan una experiencia ágil y confiable. Esto no solo mejora la interacción con sus usuarios finales, sino que también optimiza las tareas de gestión para los administradores.
                            </p>
                        </div>
                    </motion.div>

                    {/* Desarrollo de Aplicaciones Móviles */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Desarrollo Móvil Multiplataforma</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Con el auge de los dispositivos móviles, su negocio debe estar al alcance de la mano. Diseñamos y construimos aplicaciones móviles nativas y multiplataforma para iOS y Android, priorizando una experiencia de usuario fluida e intuitiva. Incorporamos funcionalidades avanzadas como notificaciones en tiempo real, integraciones con servicios en la nube y soporte offline, asegurando que su aplicación sea no solo funcional sino también un activo clave para su estrategia digital y la conexión con sus clientes.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={mobileDevelopmentImage}
                                alt="Desarrollo de Aplicaciones Móviles"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Soluciones Empresariales */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Software para la Gestión Empresarial</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Liberamos a su equipo de las tareas manuales y repetitivas. Creamos sistemas de gestión de inventario, CRMs, ERPs y otras herramientas personalizadas que se adaptan a la complejidad de sus procesos. Nuestras soluciones están diseñadas para integrarse sin fricciones con sus sistemas existentes, optimizando flujos de trabajo de manera inteligente. Esto no solo mejora la productividad y reduce los costos operativos, sino que también ofrece un potente motor de análisis que facilita la toma de decisiones estratégicas en tiempo real.
                            </p>
                        </div>
                    </motion.div>

                    {/* Integración y Modernización */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Integración y Modernización de Software</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Su tecnología debe crecer con usted. Ayudamos a su empresa a dar el salto al futuro modernizando sistemas heredados y construyendo un ecosistema digital cohesivo. Mediante la implementación de APIs robustas, microservicios y arquitecturas de última generación, aseguramos que todas sus aplicaciones se comuniquen de manera eficiente y segura. Esto no solo mejora la flexibilidad de sus operaciones, sino que también reduce los costos de mantenimiento a largo plazo y prepara su plataforma para las innovaciones del mañana.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={customSoftwareImage}
                                alt="Integración y Modernización de Software"
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

export default CustomSoftwareContent;