// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 text-gray-300 py-12"
        >
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Columna 1: Logo y Contacto */}
                <div className="space-y-4">
                    {/* Logo alineado */}
                    <div className="flex items-center -ml-4">
                        <Logo />
                    </div>

                    <p className="text-sm leading-relaxed">
                        Estamos listos para transformar su negocio con soluciones de
                        <span className="text-blue-400 font-semibold"> Inteligencia Artificial</span>.
                    </p>

                    <div>
                        <p className="text-sm">
                            <span className="font-semibold text-white">Email:</span>{' '}
                            <a href="mailto:info@nubeware.ai" className="hover:text-blue-400">
                                info@nubeware.ai
                            </a>
                        </p>
                    </div>
                </div>

                {/* Columna 2: Enlaces Rápidos */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className="hover:text-blue-400 transition-colors">
                                Sobre Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-blue-400 transition-colors">
                                Nuestros Servicios
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-blue-400 transition-colors">
                                Contáctenos
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Columna 3: Legal */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Información Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/terms" className="hover:text-blue-400 transition-colors">
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                                Política de Privacidad
                            </Link>
                        </li>
                        <li>
                            <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                                Política de Cookies
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Columna 4: Redes Sociales */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            aria-label="LinkedIn de Nubeware.ai"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Derechos de autor y línea divisoria */}
            <div className="border-t border-gray-700 mt-10 pt-6">
                <p className="text-center text-xs md:text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} <span className="text-blue-400 font-semibold">NUBEWARE.AI</span>. Todos los derechos reservados.
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;
