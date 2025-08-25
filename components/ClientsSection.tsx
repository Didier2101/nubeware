'use client';

import Image from 'next/image';
import SensorTES from '../public/image-clientes/sensortes.jpg'; // Importa la imagen desde la ruta

export default function ClientsSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Nuestros Clientes</h2>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    {/* Usamos la imagen importada */}
                    <Image
                        src={SensorTES}
                        alt="Logo de SensorTES"
                        width={200}
                        height={100}
                        className="object-contain rounded-md border border-gray-200 p-4 bg-white"
                    />
                </div>
            </div>
        </section>
    );
}