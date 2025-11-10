'use client';

import { motion } from 'framer-motion';

export default function Background({ children }: { children: React.ReactNode }) {
    const particles = Array.from({ length: 40 });

    // --- NUEVO: Campo de estrellas estáticas ---
    const STAR_COUNT = 100; // Un buen número de estrellas
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5, // Tamaño entre 0.5px y 2px
        delay: Math.random() * 5,
    }));
    // ------------------------------------------

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050a14] text-white">
            {/* Gradiente base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#050a14] to-[#02050a]" />

            {/* --- NUEVA CAPA: Estrellas estáticas (Detrás de la rejilla) --- */}
            <div className="absolute inset-0 opacity-80 pointer-events-none">
                {stars.map((star, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full" // Pequeños puntos blancos
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        // Simulación de parpadeo estelar muy sutil
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{
                            duration: Math.random() * 4 + 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>
            {/* ------------------------------------------------------------- */}

            {/* Rejilla digital (Se mantiene) */}
            <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={`row-${i}`}
                        className="absolute left-0 w-full h-px bg-cyan-500/10"
                        style={{ top: `${i * 4}%` }}
                    />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`col-${i}`}
                        className="absolute top-0 h-full w-px bg-cyan-500/10"
                        style={{ left: `${i * 5}%` }}
                    />
                ))}
            </div>

            {/* Líneas de energía verticales (Se mantienen) */}
            <div className="absolute inset-0 pointer-events-none">
                {[15, 37, 59, 81].map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-full bg-cyan-400/25 blur-[1.5px]"
                        style={{ left: `${pos}%` }}
                        animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [1, 1.1, 1] }}
                        transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            {/* Energía pulsante suave (Se mantiene) */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08)_0%,transparent_70%)]"
                animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Línea central (Se mantiene) */}
            <motion.div
                className="absolute top-0 left-1/2 w-[2px] h-full bg-cyan-400/30 blur-[1.5px]"
                animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Partículas IA (Se mantienen) */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((_, i) => {
                    const top = (i * 7.5) % 100;
                    const left = (i * 13.3) % 100;
                    const delay = (i % 5) * 0.5;
                    return (
                        <motion.span
                            key={i}
                            className="absolute w-[2px] h-[2px] rounded-full bg-cyan-300/70 shadow-[0_0_6px_2px_rgba(0,255,255,0.3)]"
                            style={{ top: `${top}%`, left: `${left}%`, opacity: 0.5 }}
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay,
                            }}
                        />
                    );
                })}
            </div>

            {/* Capa de energía IA giratoria (Se mantiene) */}
            <motion.div
                className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(0,255,255,0.05)_0%,transparent_40%,rgba(0,255,255,0.08)_70%,transparent_100%)] blur-[120px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />

            {/* Contenido principal */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}