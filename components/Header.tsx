'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, Laptop, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const services = [
    { name: 'Soluciones de IA', href: '/services/ai-solutions' },
    { name: 'Integración en la Nube', href: '/services/cloud-integration' },
    { name: 'Software a Medida', href: '/services/custom-software' },
    { name: 'Soluciones de Hardware', href: '/services/hardware-solutions' },
];

const Header = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const { scrollY } = useScroll();
    const [lastY, setLastY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > lastY && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setLastY(latest);
    });


    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme as 'light' | 'dark' | 'system');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [theme]);

    const getCurrentThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun size={20} />;
            case 'dark':
                return <Moon size={20} />;
            case 'system':
            default:
                return <Laptop size={20} />;
        }
    };

    const navLinks = (
        <>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <div
                className="relative"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
                <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    Productos <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                <AnimatePresence>
                    {isServicesMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                        >
                            {services.map((service) => (
                                <Link
                                    key={service.name}
                                    href={service.href}
                                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </>
    );

    const themeButton = (
        <div
            className="relative"
            onMouseEnter={() => setIsThemeMenuOpen(true)}
            onMouseLeave={() => setIsThemeMenuOpen(false)}
        >
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                {getCurrentThemeIcon()}
            </button>
            <AnimatePresence>
                {isThemeMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                    >
                        <button
                            onClick={() => {
                                setTheme('light');
                                setIsThemeMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Sun size={16} className="mr-2" /> Claro
                        </button>
                        <button
                            onClick={() => {
                                setTheme('dark');
                                setIsThemeMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Moon size={16} className="mr-2" /> Oscuro
                        </button>
                        <button
                            onClick={() => {
                                setTheme('system');
                                setIsThemeMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Laptop size={16} className="mr-2" /> Sistema
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY.get() > 20 ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
        >
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Logo />

                <div className="hidden md:flex items-center space-x-6">
                    {navLinks}
                    {themeButton}
                </div>

                <div className="md:hidden flex items-center space-x-4">
                    {themeButton}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            {navLinks}
                            <div className="w-full flex justify-center">
                                {themeButton}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;