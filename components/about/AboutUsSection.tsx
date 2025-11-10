"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/components/Hero";
import { Users, Heart, Clock, Globe } from "lucide-react";

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUsSection = () => {
    return (
        <>
            <Hero
                title="Sobre Nosotros"
                subtitle="Conoce más sobre Nubeware.ai, nuestro equipo, historia y la pasión que nos impulsa a democratizar la Inteligencia Artificial."
            />

            <section className="relative py-24 overflow-hidden bg-gray-900 text-gray-100">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    {/* Misión y Visión */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={contentVariants}
                        className="relative text-center mb-24"
                    >
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-blue-200 drop-shadow-[0_0_20px_rgba(59,130,246,0.25)] mb-8"
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Nuestra Misión y Visión
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Transformamos la complejidad de la tecnología en soluciones simples
                            y poderosas. Nuestra misión es democratizar la Inteligencia
                            Artificial, ofreciendo herramientas accesibles que impulsan la
                            innovación y el crecimiento de su negocio. Visualizamos un futuro
                            donde cada empresa, sin importar su tamaño, pueda aprovechar el
                            poder de la IA.
                        </motion.p>
                    </motion.div>

                    {/* Nuestra Historia */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16"
                    >
                        <div className="relative rounded-2xl overflow-hidden">
                            <Image
                                src="/images/history.png"
                                alt="Historia de Nubeware.ai"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
                        </div>

                        <div>
                            <div className="flex items-center mb-4">
                                <Clock
                                    className="mr-3 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                    size={32}
                                />
                                <h3 className="text-2xl font-semibold text-white">
                                    Nuestra Historia
                                </h3>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed mb-4">
                                Nubeware.ai nació de la visión de hacer que la tecnología más
                                avanzada sea accesible para todos. Fundada por un equipo de
                                expertos en IA y desarrollo de software, comenzamos con la
                                creencia de que la inteligencia artificial no debe estar
                                limitada a las grandes corporaciones.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Desde nuestros inicios, hemos trabajado incansablemente para
                                cerrar la brecha entre la alta tecnología y las necesidades
                                reales del mercado, acompañando a empresas de distintos sectores
                                en su transformación digital.
                            </p>
                        </div>
                    </motion.div>

                    {/* Nuestros Valores */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="mt-24 text-center"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300 mb-16">
                            Nuestros Valores
                        </h3>
                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: <Heart className="text-blue-400" size={36} />,
                                    title: "Innovación Constante",
                                    desc: "Nos mantenemos a la vanguardia tecnológica, explorando continuamente nuevas posibilidades.",
                                },
                                {
                                    icon: <Users className="text-green-400" size={36} />,
                                    title: "Transparencia Total",
                                    desc: "Construimos relaciones basadas en la honestidad y la comunicación abierta.",
                                },
                                {
                                    icon: <Globe className="text-purple-400" size={36} />,
                                    title: "Excelencia en Servicio",
                                    desc: "Cada proyecto es una oportunidad de superar expectativas y crear valor duradero.",
                                },
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="relative p-8 rounded-2xl border border-white/10 bg-gray-800/30 backdrop-blur-sm shadow-lg"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 shadow-inner">
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-3">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-300">{value.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Nuestro Equipo */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-32"
                    >
                        <div className="relative rounded-2xl overflow-hidden">
                            <Image
                                src="/images/team.png"
                                alt="Nuestro Equipo"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        <div>
                            <div className="flex items-center mb-4">
                                <Users
                                    className="mr-3 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                    size={32}
                                />
                                <h3 className="text-2xl font-semibold text-white">
                                    Nuestro Equipo
                                </h3>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed mb-4">
                                Nuestro equipo está compuesto por ingenieros, especialistas en
                                IA, arquitectos de soluciones y consultores tecnológicos con
                                amplia experiencia. Cada miembro aporta una perspectiva única y
                                un conjunto especializado de habilidades.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Fomentamos un entorno colaborativo que potencia la creatividad y
                                nos permite diseñar estrategias personalizadas, combinando
                                excelencia técnica con pasión por la innovación.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default AboutUsSection;
