'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react'; // Importamos useState y useEffect

interface HeroProps {
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
}

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

const Hero = ({ title, subtitle, buttonText, buttonLink }: HeroProps) => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Oculta el indicador si el usuario se ha desplazado más de 20px
            if (window.scrollY > 20) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiamos el event listener cuando el componente se desmonte
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 overflow-hidden relative transition-colors duration-300">

            {/* Fondo de blobs animados */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-1 dark:bg-purple-700"></div>
                <div className="absolute top-20 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-2 dark:bg-blue-700"></div>
                <div className="absolute bottom-20 -right-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-1 dark:bg-indigo-700"></div>
            </div>

            {/* Contenido principal, ahora centrado */}
            <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center justify-center h-full pt-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                    {buttonText && buttonLink && (
                        <motion.div variants={itemVariants}>
                            <Link href={buttonLink}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 rounded-full transition-all duration-300 shadow-lg"
                                >
                                    {buttonText}
                                </motion.div>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Flecha de "scroll" animada */}
            {showScrollIndicator && (
                <motion.div
                    className="absolute bottom-8 text-gray-500 dark:text-gray-400"
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
        </div>
    );
};

export default Hero;