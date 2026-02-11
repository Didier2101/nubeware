/**
 * Professional Enterprise Navbar - Nubeware
 * Incluye navegación fluida, diseño premium y selector de idioma.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlobalTranslation } from '@/src/providers/GlobalLanguageProvider';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { t, language, setLanguage } = useGlobalTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: (t as any).nav_home || 'Inicio', href: '/' },
        { name: t.nav_services, href: '/services' },
        { name: t.nav_about, href: '/services/about' },
        { name: t.nav_rag, href: '/services/ai-solutions/rag' },
        { name: t.nav_contact, href: '/services/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md border-b border-slate-200/50' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                        Nube<span className="text-primary">ware</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-6 w-[1px] bg-slate-200 mx-2" />

                    {/* Language Selector */}
                    <div className="flex items-center space-x-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`p-1.5 rounded-lg transition-all ${language === 'en' ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-40 hover:opacity-100 hover:bg-white/50'}`}
                            title="English"
                        >
                            <span className="text-[16px] leading-none block">🇺🇸</span>
                        </button>
                        <button
                            onClick={() => setLanguage('es')}
                            className={`p-1.5 rounded-lg transition-all ${language === 'es' ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-40 hover:opacity-100 hover:bg-white/50'}`}
                            title="Español"
                        >
                            <span className="text-[16px] leading-none block">🇪🇸</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-500 hover:text-primary transition-colors bg-slate-50 rounded-lg border border-slate-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl lg:hidden overflow-hidden"
                    >

                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-base font-semibold text-slate-600 hover:text-primary transition-colors py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${language === 'en' ? 'bg-primary/5 border-primary/20 text-primary' : 'border-slate-200 text-slate-400'}`}>🇺🇸 EN</button>
                                    <button onClick={() => setLanguage('es')} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${language === 'es' ? 'bg-primary/5 border-primary/20 text-primary' : 'border-slate-200 text-slate-400'}`}>🇪🇸 ES</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
