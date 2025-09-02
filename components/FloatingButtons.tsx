'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import NubeBot from './NubeBot';

const FloatingButtons = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappNumber = '573202753904';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const buttonVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
        tap: { scale: 0.95 },
    } as const;

    return (
        <>
            <AnimatePresence>
                {/* Botón del Chatbot */}
                <motion.button
                    key="open-chatbot"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileTap="tap"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="fixed bottom-24 right-6 md:right-10 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
                    aria-label="Abrir chatbot"
                >
                    <MessageSquare size={24} />
                </motion.button>

                {isVisible && (
                    <motion.button
                        key="scroll-to-top"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileTap="tap"
                        onClick={scrollToTop}
                        className="fixed bottom-36 right-6 md:right-10 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none"
                        aria-label="Volver arriba"
                    >
                        <ChevronUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Botón de WhatsApp */}
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileTap="tap"
                className="fixed bottom-6 right-6 md:right-10 z-50 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-300"
                aria-label="Contactar por WhatsApp"
            >
                <Phone size={24} />
            </motion.a>

            {/* Componente del Chatbot */}
            <AnimatePresence>
                {isChatOpen && <NubeBot onClose={() => setIsChatOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default FloatingButtons;
