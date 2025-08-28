// components/Logo.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
    display: 'swap',
});

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="flex items-center"
        >
            <Link
                href="/"
                className="flex items-center  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                aria-label="Ir a la página principal de Nubeware.ai"
            >
                <Image
                    src="/images/logo-nubeware.png"
                    alt="Logo de Nubeware.ai"
                    width={48}
                    height={38}
                    className=" h-10 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
                    priority
                />

                <span
                    className={`${montserrat.className}  -ml-2 text-sm md:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-wide`}
                >
                    NUBEWARE.AI
                </span>
            </Link>
        </motion.div>
    );
};

export default Logo;
