// components/Background.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Background({ children }: { children: React.ReactNode }) {
    const [stars, setStars] = useState<Array<{ top: string, left: string, size: number, delay: number, opacity: number }>>([]);

    // Generar 100 estrellas de diferentes tamaños
    useEffect(() => {
        const STAR_COUNT = 100;
        const clientStars = Array.from({ length: STAR_COUNT }).map(() => {
            const size = Math.random() * 3 + 0.5; // Tamaños entre 0.5px y 3.5px
            const opacity = Math.random() * 0.6 + 0.2; // Opacidad variable
            return {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: size,
                delay: Math.random() * 5,
                opacity: opacity
            };
        });
        setStars(clientStars);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#050a14] text-white">
            {/* Fondo base fijo */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#0a192f] via-[#050a14] to-[#02050a]" />

            {/* 100 estrellas de diferentes tamaños - FIJAS */}
            <div className="fixed inset-0 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity
                        }}
                        animate={{
                            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>

            {/* Energía pulsante muy suave - FIJA */}
            <motion.div
                className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)] pointer-events-none"
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Contenido principal - SIN altura fija para permitir scroll */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}