/**
 * Professional Enterprise Service Card - Nubeware
 * Diseño limpio en blanco y gris con acentos en azul cielo.
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CardServiceProps {
    title: string;
    description: string;
    icon: ReactNode;
    link?: string;
    featured?: boolean;
}

const CardService = ({ title, description, icon, link, featured = false }: CardServiceProps) => {
    const cardContent = (
        <div className={`
            h-full flex flex-col p-10 
            bg-white border border-slate-200/60 rounded-[2.5rem] 
            hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(14,165,233,0.1)] 
            transition-all duration-500 group relative overflow-hidden
        `}>
            {/* Soft Ambient Light on Hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Header: Icon */}
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                <div className="text-slate-400 group-hover:text-primary transition-colors duration-500">
                    {icon}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-4 relative z-10">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300">
                    {description}
                </p>
            </div>

            {/* Footer: Action */}
            {link && (
                <div className="mt-8 flex items-center text-[13px] font-extrabold text-primary uppercase tracking-widest group-hover:gap-2 transition-all">
                    <span>Explore Solution</span>
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
            )}

            {featured && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                    Core Focus
                </div>
            )}
        </div>
    );

    if (link) {
        return (
            <Link href={link} className="block h-full group">
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                >
                    {cardContent}
                </motion.div>
            </Link>
        );
    }

    return cardContent;
};

export default CardService;
