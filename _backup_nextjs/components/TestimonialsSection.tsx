/**
 * Professional Enterprise Testimonials - Nubeware
 * Diseño emocional de alta gama, contrastado y bilingüe.
 */

'use client';

import { motion } from 'framer-motion';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';

export default function TestimonialsSection() {
    const { t, language } = useGlobalTranslation();

    // En un sistema real, esto vendría de t.testimonials array
    // Por ahora lo manejamos con lógica condicional para el único testimonio
    const testimonial = {
        quote: language === 'en'
            ? "The experience of working with Nubeware.ai has been highly positive, as their technological solutions have brought great value to our projects. Innovation, strategic vision, and the focus on proposing new solutions to the market are factors that make a significant difference. Nubeware.ai stands out for its technical solidity, professionalism, and ability to deliver high-impact results. We highly recommend their services."
            : "La experiencia de trabajar con Nubeware.ai ha sido altamente positiva, ya que sus soluciones tecnológicas han aportado gran valor a los proyectos desarrollados. La innovación, la visión estratégica y el enfoque en proponer nuevas soluciones al mercado son factores que marcan una diferencia significativa. Nubeware.ai se destaca por su solidez técnica, profesionalismo y capacidad para ofrecer resultados de alto impacto.",
        author: "Ing. Freddy Forero",
        role: language === 'en'
            ? "Legal Representative - General Manager, Total Electronic Solutions Ltda. - SensorTES"
            : "Representante Legal - Gerente General, Total Electronic Solutions Ltda. - SensorTES",
        website: "https://sensortes.com/",
        linkText: language === 'en' ? "Visit Website" : "Visitar sitio web",
        title: language === 'en' ? "Client Success Stories" : "Éxito de Nuestros Clientes"
    };

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-extrabold text-white mb-16 tracking-tight"
                >
                    {testimonial.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl"
                >
                    {/* Decorative Icon */}
                    <Quote
                        size={80}
                        className="text-primary/10 absolute -top-8 -left-8 md:-top-10 md:-left-10 rotate-12"
                    />

                    {/* Stars */}
                    <div className="flex justify-center mb-10 space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={20}
                                className="fill-primary text-primary"
                            />
                        ))}
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="text-xl md:text-3xl text-slate-200 font-medium italic mb-12 leading-relaxed tracking-tight">
                        &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <cite className="not-italic font-bold text-xl text-white">
                            — {testimonial.author}
                        </cite>
                        <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">{testimonial.role}</p>

                        <a
                            href={testimonial.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-[12px] font-extrabold text-primary hover:text-white transition-colors mt-4 uppercase tracking-tighter"
                        >
                            <span>{testimonial.linkText}</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Ambient background light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-30" />
        </section>
    );
}
