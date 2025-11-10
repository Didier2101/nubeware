"use client";

import { motion, Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

type Testimonial = {
    quote: string;
    author: string;
    role: string;
    date: string;
    website?: string;
};

const testimonials: Testimonial[] = [
    {
        quote:
            "La experiencia de trabajar con Nubeware.ai ha sido altamente positiva, ya que sus soluciones tecnológicas han aportado gran valor a los proyectos desarrollados. La innovación, la visión estratégica y el enfoque en proponer nuevas soluciones al mercado son factores que marcan una diferencia significativa. Nubeware.ai se destaca por su solidez técnica, profesionalismo y capacidad para ofrecer resultados de alto impacto. Recomendamos ampliamente sus servicios.",
        author: "Ing. Freddy Forero",
        role: "Representante Legal - Gerente General, Total Electronic Solutions Ltda. - SensorTES",
        date: "Agosto 18 de 2025",
        website: "https://sensortes.com/",
    },
];

export default function TestimonialsSection() {
    const currentTestimonial = testimonials[0];

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Brillos de fondo */}

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <motion.h2
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                >
                    Lo que dicen nuestros clientes
                </motion.h2>

                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-500"
                >
                    {/* Cita decorativa */}
                    <Quote
                        size={64}
                        className="text-blue-500/20 absolute -top-6 -left-6 rotate-12"
                    />

                    {/* Estrellas */}
                    <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={24}
                                className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                            />
                        ))}
                    </div>

                    {/* Testimonio */}
                    <p className="text-xl md:text-2xl text-gray-200 italic mb-10 leading-relaxed">
                        “{currentTestimonial.quote}”
                    </p>

                    {/* Autor */}
                    <div className="text-right mt-10">
                        <p className="font-semibold text-lg text-white">
                            — {currentTestimonial.author}
                        </p>
                        <p className="text-sm text-gray-400">{currentTestimonial.role}</p>
                        {currentTestimonial.website && (
                            <p className="text-sm mt-2">
                                <a
                                    href={currentTestimonial.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    Visitar sitio web
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Brillo decorativo */}
                    <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-600/10 opacity-60 blur-xl" />
                </motion.div>
            </div>
        </section>
    );
}
