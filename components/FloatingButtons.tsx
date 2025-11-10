'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const FloatingButtons = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) setIsVisible(true);
        else setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappNumber = '573202753904';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const buttonVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 200, damping: 20 },
        },
        tap: { scale: 0.9 },
    } as const;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        key="scroll-to-top"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileTap="tap"
                        onClick={scrollToTop}
                        aria-label="Volver arriba"
                        className="
                            fixed bottom-24 right-6 md:right-10 z-50 p-4 rounded-full
                            bg-gradient-to-br from-cyan-500 via-blue-700 to-indigo-800
                            text-white
                            border border-cyan-400/40
                            shadow-[0_0_15px_rgba(0,255,255,0.25)]
                            hover:shadow-[0_0_25px_rgba(0,255,255,0.45)]
                            hover:scale-105
                            transition-all duration-300
                            backdrop-blur-md
                        "
                    >
                        <ChevronUp size={22} className="drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]" />
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
                aria-label="Contactar por WhatsApp"
                className="
                    fixed bottom-6 right-6 md:right-10 z-50 p-4 rounded-full
                    bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-800
                    text-white
                    border border-green-400/40
                    shadow-[0_0_15px_rgba(0,255,128,0.25)]
                    hover:shadow-[0_0_25px_rgba(0,255,128,0.45)]
                    hover:scale-105
                    transition-all duration-300
                    backdrop-blur-md
                "
            >
                <Phone size={22} className="drop-shadow-[0_0_6px_rgba(0,255,128,0.5)]" />
            </motion.a>
        </>
    );
};

export default FloatingButtons;
