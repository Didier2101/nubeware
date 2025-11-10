'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const services = [
    { name: 'Sistema RAG', href: '/rag' },
    { name: 'Soluciones de IA', href: '/services/ai-solutions' },
    { name: 'Integración en la Nube', href: '/services/cloud-integration' },
    { name: 'Software a Medida', href: '/services/custom-software' },
    { name: 'Soluciones de Hardware', href: '/services/hardware-solutions' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [lastY, setLastY] = useState(0);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > lastY && latest > 100) {
            setHidden(true); // Scroll hacia abajo → ocultar
        } else if (latest < lastY) {
            setHidden(false); // Scroll hacia arriba → mostrar
        }
        setLastY(latest);
        setScrolled(latest > 10); // Determina si hay scroll
    });

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const navLinks = (
        <>
            <Link
                href="/"
                className="relative text-gray-300 hover:text-cyan-400 transition-colors group"
                onClick={() => setIsMenuOpen(false)}
            >
                Inicio
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <div
                className="relative"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
                <button className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                    Productos
                    <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </button>
                <AnimatePresence>
                    {isServicesMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-56 bg-gradient-to-b from-gray-900 to-gray-950 border border-cyan-800/30 rounded-xl shadow-lg shadow-cyan-500/10 py-2 z-50 backdrop-blur-md"
                        >
                            {services.map((service) => (
                                <Link
                                    key={service.name}
                                    href={service.href}
                                    className="block px-4 py-2 text-gray-300 hover:text-cyan-300 hover:bg-cyan-900/20 transition-all duration-200"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsServicesMenuOpen(false);
                                    }}
                                >
                                    {service.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Link
                href="/about"
                className="relative text-gray-300 hover:text-cyan-400 transition-colors group"
                onClick={() => setIsMenuOpen(false)}
            >
                Sobre Nosotros
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
                href="/contact"
                className="relative text-gray-300 hover:text-cyan-400 transition-colors group"
                onClick={() => setIsMenuOpen(false)}
            >
                Contacto
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
        </>
    );

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: hidden ? -120 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`fixed top-0 w-full z-50 transition-all duration-500`}
        >
            <div
                className={`relative  transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-xl bg-cyan-850/70 shadow-[0_0_25px_rgba(0,255,255,0.08)]'
                    : 'bg-transparent'
                    }`}
            >
                {/* Líneas decorativas */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
                    {scrolled && (
                        <>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-700/10 to-transparent blur-sm"></div>
                        </>
                    )}
                </div>

                <nav className="relative container mx-auto px-6 py-4 flex justify-between items-center">
                    <Logo />

                    {/* Desktop */}
                    <div className="hidden md:flex items-center space-x-8">{navLinks}</div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Menú móvil */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-gray-950/90 border-t border-cyan-900/30 shadow-lg shadow-cyan-500/10 backdrop-blur-lg"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            {navLinks}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
