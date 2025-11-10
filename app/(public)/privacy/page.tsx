'use client';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Política de Privacidad
            </h1>
            <div className="prose dark:prose-invert">

                <p className="mb-4">
                    Última actualización: Agosto 25, 2025
                </p>

                <p className="mb-4">
                    En Nubeware.ai, valoramos su privacidad. Esta política de privacidad describe cómo recopilamos, usamos y protegemos su información personal.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Recopilación de Información</h2>
                <p className="mb-4">
                    Podemos recopilar información de identificación personal, como su nombre, dirección de correo electrónico y número de teléfono, cuando usted nos la proporciona voluntariamente, por ejemplo, al completar un formulario de contacto.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso de la Información</h2>
                <p className="mb-4">
                    La información que recopilamos se utiliza para responder a sus consultas, proporcionarle los servicios solicitados y mejorar la calidad de nuestro sitio web y servicios.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Protección de Datos</h2>
                <p className="mb-4">
                    Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal.
                </p>

                {/* Agrega más secciones aquí (p. ej., Retención de Datos, Derechos del Usuario, Contacto) */}

            </div>
        </div>
    );
}