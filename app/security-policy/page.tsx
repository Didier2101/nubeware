// app/privacy/page.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Shield, User, FileText, Mail, Building } from 'lucide-react';
import { useState, useEffect } from 'react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function PrivacyPolicy() {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const policySections = [
        {
            icon: Shield,
            title: "Principios Rectores",
            description: "Legalidad, Finalidad, Libertad, Veracidad, Transparencia, Seguridad y Confidencialidad"
        },
        {
            icon: User,
            title: "Derechos del Titular",
            description: "Acceso, actualización, rectificación, supresión y oposición al tratamiento de datos"
        },
        {
            icon: FileText,
            title: "Autorización",
            description: "Consentimiento previo, expreso e informado para el tratamiento de datos"
        },
        {
            icon: Mail,
            title: "Canales de Atención",
            description: "Mecanismos para ejercer derechos y presentar consultas, quejas y reclamos"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10 dark:bg-gray-950 overflow-hidden relative transition-colors duration-300">

            {/* Fondo de blobs animados */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-1 dark:bg-purple-700"></div>
                <div className="absolute top-20 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-2 dark:bg-blue-700"></div>
                <div className="absolute bottom-20 -right-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-1 dark:bg-indigo-700"></div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-6  text-center z-10 flex flex-col items-center justify-center min-h-[70vh] pt-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500"
                    >
                        Política de Privacidad
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto"
                    >
                        Protección de Datos Personales - NUBEWARE S.A.S.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                            onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Conocer la Política
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Flecha de "scroll" animada */}
            {showScrollIndicator && (
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 z-10"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 1.5,
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }
                    }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            )}

            {/* Contenido Principal */}
            <div id="content" className="relative z-10">
                <div className="container mx-auto px-6 max-w-6xl">

                    {/* Secciones de la Política */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    >
                        {policySections.map((section, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                            >
                                <section.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                    {section.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                                    {section.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contenido de la Política */}
                    <div>

                        {/* I. INTRODUCCIÓN */}
                        <motion.section
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <Building className="w-8 h-8 mr-3 text-blue-600" />
                                I. INTRODUCCIÓN
                            </h2>
                            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                                <p>
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold">NUBEWARE S.A.S.</span> es una compañía especializada en el desarrollo de soluciones de software a la medida, servicios de datacenter y en el diseño y ejecución de aplicaciones móviles. Su gestión se encuentra orientada por una política de innovación que integra de manera transversal la Inteligencia Artificial en cada uno de sus proyectos, con el fin de optimizar procesos y potenciar la operación de las empresas.
                                </p>
                                <p>
                                    En cumplimiento de la normativa vigente sobre protección de datos personales —<strong>Ley 1581 de 2012, Decreto 1074 de 2015</strong> y demás disposiciones concordantes— NUBEWARE S.A.S. adopta la presente Política de Tratamiento de Datos Personales (en adelante, la Política) con el propósito de proteger la información personal de los titulares vinculados con la empresa, tales como clientes, proveedores, empleados, candidatos, socios y demás personas naturales de quienes se obtenga, recolecte, procese o trate información.
                                </p>
                                <p>
                                    La presente Política busca garantizar el derecho constitucional de <strong>Habeas Data</strong>, mediante el cual los titulares pueden conocer, actualizar, rectificar o suprimir su información personal. Para ello, NUBEWARE S.A.S. implementa medidas claras y efectivas de seguridad, confidencialidad y transparencia en el tratamiento de los datos.
                                </p>
                            </div>
                        </motion.section>

                        {/* II. DEFINICIONES */}
                        <motion.section
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                II. DEFINICIONES
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Autorización</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Consentimiento previo, expreso e informado del Titular para el tratamiento de sus datos personales.
                                    </p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Aviso de privacidad</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Comunicación dirigida a los titulares sobre la existencia de la política de datos y las finalidades del tratamiento.
                                    </p>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Dato personal</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Información que permite identificar o hacer identificable a una persona natural.
                                    </p>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Dato sensible</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Información que afecta la intimidad del titular o cuyo uso indebido podría generar discriminación.
                                    </p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Responsable del tratamiento</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        NUBEWARE S.A.S., quien decide sobre la finalidad y el uso de los datos personales.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Tratamiento</h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Operaciones sobre datos personales como recolección, almacenamiento, uso, circulación o supresión.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* III. PRINCIPIOS RECTORES */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                III. PRINCIPIOS RECTORES
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                El tratamiento de datos por parte de NUBEWARE S.A.S. se rige por los principios de:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Legalidad', 'Finalidad', 'Libertad', 'Veracidad o calidad', 'Transparencia', 'Seguridad', 'Confidencialidad', 'Acceso y circulación restringida'].map((principle, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                                        <span className="font-medium text-gray-900 dark:text-white">{principle}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* IV. DERECHOS DE LOS TITULARES */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                IV. DERECHOS DE LOS TITULARES
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                Los titulares de datos personales podrán ejercer gratuitamente los siguientes derechos:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    "Acceder a su información personal",
                                    "Actualizar y rectificar sus datos",
                                    "Solicitar la supresión de información",
                                    "Oponerse al tratamiento de sus datos",
                                    "Revocar la autorización previamente otorgada",
                                    "Conocer el uso que se le da a sus datos",
                                    "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley"
                                ].map((right, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                            <span className="text-white text-sm font-bold">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">{right}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* V. RECOLECCIÓN DE DATOS PERSONALES */}
                        <motion.section
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                V. RECOLECCIÓN DE DATOS PERSONALES
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                NUBEWARE S.A.S. podrá recolectar datos personales a través de:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                                <li>Inscripción y uso de sus plataformas tecnológicas (web y móviles)</li>
                                <li>Intercambio de correos electrónicos y comunicaciones digitales</li>
                                <li>Suscripción de contratos de prestación de servicios o laborales</li>
                                <li>Procesos de selección de personal</li>
                                <li>Reuniones, eventos y convocatorias corporativas</li>
                                <li>Alianzas estratégicas y acuerdos comerciales</li>
                            </ul>
                        </motion.section>

                        {/* VI. FINALIDADES DEL TRATAMIENTO */}
                        <motion.section
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                VI. FINALIDADES DEL TRATAMIENTO
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usuarios/Clientes:</h3>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                                        <li>Creación, administración y gestión de cuentas</li>
                                        <li>Prestación de servicios contratados</li>
                                        <li>Envío de información comercial, actualizaciones y novedades</li>
                                        <li>Análisis de comportamiento y preferencias para mejorar la experiencia</li>
                                        <li>Atención de solicitudes, quejas y reclamos</li>
                                        <li>Cumplimiento de obligaciones legales, fiscales y contractuales</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Empleados y Candidatos:</h3>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                                        <li>Procesos de selección, contratación y administración laboral</li>
                                        <li>Cumplimiento de obligaciones legales en materia laboral y de seguridad social</li>
                                        <li>Gestión contable, tributaria y administrativa</li>
                                        <li>Seguridad y control de acceso a instalaciones físicas y digitales</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* VIII. CANALES DE ATENCIÓN */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                VIII. CANALES DE ATENCIÓN
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                                        <Mail className="w-5 h-5 mr-2" />
                                        Atención electrónica
                                    </h3>
                                    <a
                                        href="mailto:german.gonzalez@nubeware.ai"
                                        className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        german.gonzalez@nubeware.ai
                                    </a>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">
                                        Atención escrita
                                    </h3>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        Cr 55 No. 149 - 60
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* IX. CONSULTAS, QUEJAS Y RECLAMOS */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                IX. CONSULTAS, QUEJAS Y RECLAMOS
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-2">
                                        Consultas
                                    </h3>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        Serán atendidas en un plazo máximo de <strong>10 días hábiles</strong>
                                    </p>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-2">
                                        Quejas o Reclamos
                                    </h3>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        Serán resueltos en un plazo máximo de <strong>15 días hábiles</strong>, prorrogables según lo previsto en la ley
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* XIII. VIGENCIA */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                            className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                XIII. VIGENCIA
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                La presente política rige a partir del <strong>05 de Julio de 2025</strong> y estará disponible para consulta en la página web de NUBEWARE S.A.S.
                            </p>
                        </motion.section>

                        {/* Contacto Adicional */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.8 }}
                            className="text-center mt-12"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                ¿Tienes preguntas sobre nuestra política de privacidad?
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="mailto:german.gonzalez@nubeware.ai"
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium"
                                >
                                    Contactar al Responsable
                                </a>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 font-medium"
                                >
                                    Formulario de Contacto
                                </Link>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}