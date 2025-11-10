'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

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
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
};

const Hero = ({ title, subtitle, buttonText, buttonLink }: HeroProps) => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const handleScroll = () => setShowScrollIndicator(window.scrollY <= 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">


            {/* Contenido principal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 px-6 max-w-5xl"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                >
                    {title}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-2xl text-gray-300/90 mb-10 leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {buttonText && buttonLink && (
                    <motion.div variants={itemVariants}>
                        <Link href={buttonLink}>
                            <motion.button

                                whileTap={{ scale: 0.95 }}
                                className="px-10 border border-cyan-300 rounded-2xl cursor-pointer py-3 text-lg font-semibold text-cyan-100 "
                            >
                                {buttonText}
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </motion.div>

            {/* Indicador de scroll */}
            {showScrollIndicator && (
                <motion.div
                    className="absolute bottom-10 text-cyan-500/60"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            delay: 1.5,
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <ChevronDown size={36} strokeWidth={1.5} />
                </motion.div>
            )}
        </section>
    );
};

export default Hero;
