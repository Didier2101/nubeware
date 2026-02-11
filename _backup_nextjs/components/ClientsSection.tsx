/**
 * Professional Enterprise Clients Section - Nubeware
 * Diseño minimalista en blanco y gris.
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ClientsSection() {
    return (
        <section className="py-8">
            <div className="container mx-auto px-6 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12 italic">Trusted by Technology Leaders</p>

                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className="filter grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110">
                        <Image
                            src="/image-clientes/sensortes.jpg"
                            alt="SensorTES Logo"
                            width={160}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    {/* Placeholder for more clients to keep the enterprise look balanced */}
                </div>
            </div>
        </section>
    );
}
