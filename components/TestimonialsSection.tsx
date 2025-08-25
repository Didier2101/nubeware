"use client"

import { motion, Variants } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Define el tipo para un testimonio
type Testimonial = {
    quote: string;
    author: string;
    role: string;
    date: string;
    website?: string; // Nuevo campo opcional para el sitio web
};

// Array de testimonios. Puedes añadir más objetos aquí.
const testimonials: Testimonial[] = [
    {
        quote: "La experiencia de trabajar con Germán González para Total Electronic Solutions y su marca SensorTES ha sido muy enriquecedora, ya que sus aportes a los proyectos propuestos han sido muy constructivos, agregando gran valor a los productos. La innovación y el reto de proponer nuevos productos tecnológicos al mercado requiere de personas con él con experiencia, conocimientos y una solida formación tecnológica. Germán González es un ser humano de actitud positiva, integro, amplia preparación y experiencia profesional, creativo y gran capacidad de trabajo. Recomendamos ampliamente sus servicios.",
        author: "Ing. Freddy Forero",
        role: "Representante Legal - Gerente General, Total Electronic Solutions Ltda. - SensorTES",
        date: "Agosto 18 de 2025",
        website: "https://sensortes.com/", // Agregado el sitio web
    },
    // Añade más testimonios aquí en el futuro
    // {
    //     quote: "Otro testimonio.",
    //     author: "Nombre del cliente",
    //     role: "Cargo o empresa",
    //     date: "Fecha",
    //     website: "URL del sitio",
    // },
];

export default function TestimonialsSection() {
    const currentTestimonial = testimonials[0];

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <motion.h2
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
                >
                    Lo que dicen nuestros clientes
                </motion.h2>
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg relative"
                >
                    <Quote size={48} className="text-gray-200 dark:text-gray-700 absolute top-4 left-4" />

                    {/* Estrellas */}
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={24} className="text-yellow-400 fill-current" />
                        ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6">
                        {currentTestimonial.quote}
                    </p>

                    <div className="text-right mt-8">
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">
                            - {currentTestimonial.author}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentTestimonial.role}
                        </p>
                        {currentTestimonial.website && (
                            <p className="text-sm mt-2">
                                <a
                                    href={currentTestimonial.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                                >
                                    Visitar sitio web
                                </a>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}