// components/CardService.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CardServiceProps {
    title: string;
    description: string;
    icon: ReactNode;
    link?: string; // Opcional para agregar enlaces
    gradient?: boolean; // Para cards con gradiente
    featured?: boolean; // Para destacar ciertos cards
}

const CardService = ({ title, description, icon, link, gradient = false, featured = false }: CardServiceProps) => {
    const cardContent = (
        <motion.div
            className={`
                group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer h-full
                ${gradient
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[1px]'
                    : ''
                }
                ${featured
                    ? 'hover:shadow-xl'
                    : 'hover:shadow-lg'
                }
            `}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div className={`
                h-full rounded-xl px-8 py-10 transition-all duration-300
                ${gradient
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700'
                }
                ${featured
                    ? 'border-2 border-blue-500/20 dark:border-blue-400/20'
                    : ''
                }
                group-hover:border-blue-200 dark:group-hover:border-blue-600
            `}>

                {/* Badge para featured */}
                {featured && (
                    <div className="absolute -top-1 -right-1">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            Popular
                        </div>
                    </div>
                )}

                {/* Icono */}
                <div className="relative mb-6">
                    <motion.div
                        className={`
                            inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300
                            ${gradient || featured
                                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                                : 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                            }
                            group-hover:shadow-lg group-hover:scale-105
                        `}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        {icon}
                    </motion.div>
                </div>

                {/* Contenido */}
                <div className="relative">
                    <h3 className={`
                        text-2xl font-bold mb-4 transition-colors duration-300
                        ${gradient || featured
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300'
                        }
                    `}>
                        {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 transition-colors duration-300">
                        {description}
                    </p>

                    {/* Call to action - solo si hay link */}
                    {link && (
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            <span>Saber más</span>
                            <motion.svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    if (link) {
        return (
            <Link href={link} className="block h-full">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default CardService;