// components/contact/ContactForm.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { FormEvent, useState } from 'react';

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
};

const ContactForm = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('enviando');
        setTimeout(() => {
            setStatus('enviado');
        }, 2000);
    };

    return (
        <motion.div
            className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Contáctanos
            </motion.h2>
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300" required />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300" required />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300" required></textarea>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 transition-all duration-300 shadow-md"
                >
                    {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
                </motion.button>
            </motion.form>
            {status === 'enviado' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600 dark:text-green-400 text-center font-semibold">¡Mensaje enviado con éxito!</motion.p>}
        </motion.div>
    );
};

export default ContactForm;