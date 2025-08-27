'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';
import { Users, Heart, Clock, Globe } from 'lucide-react';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AboutUsSection = () => {
    return (
        <>
            <Hero
                title="Sobre Nosotros"
                subtitle="Conoce más sobre Nubeware.ai, nuestro equipo, historia y la pasión que nos impulsa a democratizar la Inteligencia Artificial."
            />

            <section className="py-12 md:py-24 transition-colors duration-300">
                <div className="container mx-auto px-6 max-w-8xl">

                    {/* Misión y Visión */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                        className="relative overflow-hidden mb-16"
                    >
                        <div className="relative text-center">
                            <motion.h2
                                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-8"
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Nuestra Misión y Visión
                            </motion.h2>
                            <motion.p
                                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-5xl mx-auto"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                Transformamos la complejidad de la tecnología en soluciones simples y poderosas. Nuestra misión es democratizar la Inteligencia Artificial, ofreciendo herramientas accesibles que impulsan la innovación y el crecimiento de su negocio. Visualizamos un futuro donde cada empresa, sin importar su tamaño, pueda aprovechar el poder de la IA.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Nuestra Historia */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/images/history.png"
                                alt="Historia de Nubeware.ai"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <Clock className="mr-3 text-blue-600 dark:text-blue-400" size={32} />
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Nuestra Historia</h3>
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Nubeware.ai nació de la visión de hacer que la tecnología más avanzada sea accesible para todos. Fundada por un equipo de expertos en IA y desarrollo de software, comenzamos con la creencia de que la inteligencia artificial no debe estar limitada a las grandes corporaciones.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Desde nuestros inicios, hemos trabajado incansablemente para cerrar la brecha entre la alta tecnología y las necesidades reales del mercado. Nuestra dedicación nos ha permitido acompañar a empresas de distintos sectores en su transformación digital, siempre manteniendo nuestro compromiso con la excelencia y la innovación.
                            </p>
                        </div>
                    </motion.div>

                    {/* Nuestros Valores */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="mt-16 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Nuestros Valores</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="text-blue-600 dark:text-blue-400" size={32} />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovación Constante</h4>
                                <p className="text-gray-700 dark:text-gray-300">Nos mantenemos a la vanguardia tecnológica, explorando continuamente nuevas posibilidades.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="text-green-600 dark:text-green-400" size={32} />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Transparencia Total</h4>
                                <p className="text-gray-700 dark:text-gray-300">Construimos relaciones basadas en la honestidad y la comunicación abierta.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="text-purple-600 dark:text-purple-400" size={32} />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excelencia en Servicio</h4>
                                <p className="text-gray-700 dark:text-gray-300">Cada proyecto es una oportunidad de superar expectativas y crear valor duradero.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Nuestro Equipo */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/images/team.png"
                                alt="Nuestro Equipo"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <Users className="mr-3 text-green-600 dark:text-green-400" size={32} />
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Nuestro Equipo</h3>
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                Nuestro equipo está compuesto por ingenieros de software, especialistas en IA, arquitectos de soluciones y consultores tecnológicos con amplia experiencia en la industria. Cada miembro aporta una perspectiva única y un conjunto especializado de habilidades.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Trabajamos como una unidad cohesionada, combinando experiencia técnica con pasión por la innovación para entregar soluciones que realmente marcan la diferencia en su negocio. Además, fomentamos un entorno colaborativo que potencia la creatividad y permite diseñar estrategias adaptadas a cada cliente.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
};

export default AboutUsSection;
