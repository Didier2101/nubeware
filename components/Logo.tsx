// components/Logo.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

// Fuente profesional desde Google Fonts
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'], // puedes probar 500, 600 o 700
});

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="flex flex-col items-start"
        >
            <Link href="/" className="flex items-center space-x-3">
                <Image
                    src="/images/logo-2.png"
                    alt="Nubeware Logo"
                    width={60}
                    height={60}
                    className="h-10 w-auto"
                    priority
                />
                <div className="flex flex-col">
                    <span
                        className={`${montserrat.className} text-2xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide`}
                    >
                        NUBEWARE.AI
                    </span>
                    <span className="text-sm font-light text-gray-500 dark:text-gray-400 font-inter"> Impulsando la innovación. </span>
                </div>
            </Link>
        </motion.div>
    );
};

export default Logo;
