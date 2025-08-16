// SectionContact.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import Hero from '../Hero';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function SectionContact() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">

            {/* Sección de Héroe (Altura Ajustada) */}
            <Hero
                title="Póngase en contacto con nosotros"
                subtitle="Estamos listos para escuchar su próximo gran proyecto. Llene el formulario y comience hoy su transformación digital."
            />

            <hr className="my-8 border-gray-200 dark:border-gray-800" />

            {/* Sección del Formulario (Aparece al hacer scroll) */}
            <div className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12"
                        >
                            Cuéntenos sobre su proyecto
                        </motion.h2>
                        <div className="mt-8">
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}