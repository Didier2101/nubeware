// components/services/AISolutionsContent.tsx
'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Image from 'next/image';

// Imágenes locales (en /public/images/ai-solutions)
const predictiveAnalysisImage = '/images/ai-solutions/predictive-analysis.png';
const computerVisionImage = '/images/ai-solutions/computer-vision.png';
const nlpImage = '/images/ai-solutions/nlp.png';
const intelligentAutomationImage = '/images/ai-solutions/intelligent-automation.png';

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
                            En <b>Nubeware.ai</b>, diseñamos, desarrollamos e implementamos soluciones de IA que se integran perfectamente en su infraestructura existente. Nos especializamos en la creación de modelos de <b>Machine Learning</b> y <b>Deep Learning</b> para resolver problemas complejos.
                        </p>
                    </motion.div>

                    {/* Análisis Predictivo */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Análisis Predictivo
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                En la era de la información, el futuro pertenece a quienes pueden anticiparlo. Nuestro servicio de Análisis Predictivo va más allá de un simple análisis de datos históricos. A través de algoritmos avanzados de Machine Learning, no solo identificamos patrones, sino que también predecimos tendencias de mercado, el comportamiento futuro de los consumidores y posibles fallos en equipos o sistemas. Esto le permite tomar decisiones proactivas e informadas, optimizar sus estrategias de negocio, y ganar una ventaja competitiva significativa en su industria.
                            </p>
                        </div>
                    </motion.div>

                    {/* Visión por Computadora */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Visión por Computadora
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                La Visión por Computadora permite que sus sistemas &quot;vean&quot; y &quot;entiendan&quot; el mundo visual, convirtiendo imágenes y videos en datos accionables. Desarrollamos soluciones de vanguardia para el reconocimiento de objetos, detección de defectos en líneas de producción, análisis de comportamiento del cliente, y reconocimiento facial seguro. Estas herramientas no solo mejoran la seguridad y el control de calidad, sino que también automatizan procesos que antes requerían una supervisión humana constante, liberando recursos valiosos.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={computerVisionImage}
                                alt="Visión por Computadora"
                                width={600}
                                height={400}
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* NLP */}
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
                                className="w-full h-84 md:h-120 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Procesamiento del Lenguaje Natural (NLP)
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                El Procesamiento del Lenguaje Natural (NLP) es la clave para que su negocio entienda, interprete y genere lenguaje humano de manera efectiva. Creamos chatbots inteligentes capaces de manejar consultas de clientes 24/7, sistemas de análisis de sentimientos para medir la percepción de su marca en redes sociales, y herramientas de resumen automático que destilan grandes volúmenes de texto en información concisa. Estas soluciones, impulsadas por modelos de lenguaje avanzados, mejoran significativamente la interacción con sus clientes y optimizan el manejo de su información textual.
                            </p>
                        </div>
                    </motion.div>

                    {/* Automatización Inteligente */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={contentVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16"
                    >
                        <div className="md:order-1 text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Automatización Inteligente
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                La Automatización Inteligente combina la robótica de procesos (RPA) con la inteligencia artificial para ir más allá de la simple automatización de tareas repetitivas. Diseñamos robots de software que no solo ejecutan procesos, sino que también toman decisiones, aprenden de su entorno y se adaptan a nuevas situaciones. Nuestras soluciones automatizan flujos de trabajo complejos, desde la gestión de documentos hasta la entrada de datos en múltiples sistemas, reduciendo drásticamente los errores humanos, incrementando la eficiencia operacional y permitiendo a su equipo concentrarse en iniciativas estratégicas de mayor valor.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg md:order-2">
                            <Image
                                src={intelligentAutomationImage}
                                alt="Automatización Inteligente"
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

export default AISolutionsContent;