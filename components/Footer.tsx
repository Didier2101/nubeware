// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 text-gray-300 py-12"
        >
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Columna 1: Logo y Contacto */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Nubeware.ai</h3>
                    <p className="text-sm">
                        Estamos listos para transformar su negocio con soluciones de Inteligencia Artificial.
                    </p>
                    <div className="mt-4">
                        <p>
                            <span className="font-semibold text-white">WhatsApp:</span> +57 320 2753904
                        </p>
                        <p>
                            <span className="font-semibold text-white">Email:</span> info@nubeware.ai
                        </p>
                    </div>
                </div>

                {/* Columna 2: Enlaces Rápidos */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className="hover:text-blue-500 transition-colors">
                                Sobre Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-blue-500 transition-colors">
                                Nuestros Servicios
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-blue-500 transition-colors">
                                Contáctenos
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="hover:text-blue-500 transition-colors">
                                Conoce al Equipo
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Columna 3: Legal */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Información Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/terms" className="hover:text-blue-500 transition-colors">
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-blue-500 transition-colors">
                                Política de Privacidad
                            </Link>
                        </li>
                        <li>
                            <Link href="/cookies" className="hover:text-blue-500 transition-colors">
                                Política de Cookies
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Columna 4: Redes Sociales */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
                    <div className="flex space-x-4">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Twitter size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Derechos de autor y línea divisoria */}
            <div className="border-t border-gray-700 mt-8 pt-8">
                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Nubeware.ai. Todos los derechos reservados.
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;