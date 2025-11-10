'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CardServiceProps {
    title: string;
    description: string;
    icon: ReactNode;
    link?: string;
    featured?: boolean;
}

const CardService = ({ title, description, icon, link, featured = false }: CardServiceProps) => {
    const card = (
        <motion.div
            className={`
        group relative overflow-hidden rounded-2xl p-[1px]
        bg-gradient-to-br from-cyan-500/30 via-blue-700/20 to-indigo-800/30
        shadow-[0_0_15px_rgba(0,255,255,0.05)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(0,255,255,0.25)]
        h-full
      `}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
            {/* Fondo interior oscuro y translúcido */}
            <div
                className="
          relative h-full rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-gray-950/90
          border border-cyan-400/20 backdrop-blur-xl p-8 flex flex-col
          transition-all duration-300 group-hover:border-cyan-400/40
        "
            >
                {/* Glow animado decorativo */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                {/* Badge opcional */}
                {featured && (
                    <div className="absolute -top-2 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Recomendado
                    </div>
                )}

                {/* Icono con efecto */}
                <motion.div
                    className="
            relative w-16 h-16 mb-6 mx-auto flex items-center justify-center rounded-2xl
            bg-gradient-to-br from-cyan-600/20 to-indigo-700/20 text-cyan-400
            shadow-[0_0_20px_rgba(0,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]
            border border-cyan-400/30
          "
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                >
                    {icon}
                </motion.div>

                {/* Título */}
                <h3
                    className="
            text-xl font-bold mb-3 text-cyan-200
            group-hover:text-cyan-100 transition-colors duration-300
          "
                >
                    {title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                    {description}
                </p>

                {/* CTA */}
                {link && (
                    <div className="mt-6">
                        <div className="flex items-center justify-center text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-all duration-300">
                            Saber más
                            <motion.svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );

    if (link) {
        return (
            <Link href={link} className="block h-full">
                {card}
            </Link>
        );
    }

    return card;
};

export default CardService;
