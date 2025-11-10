'use client';

import Image from 'next/image';

export default function ClientsSection() {
    return (
        <section className="py-16 transition-colors duration-300">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-300 dark:text-white mb-12">
                    Nuestros Clientes
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800 p-4 shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/image-clientes/sensortes.jpg"
                            alt="Logo de SensorTES"
                            width={200}
                            height={100}
                            className="object-contain rounded-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
