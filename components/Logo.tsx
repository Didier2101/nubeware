// components/Logo.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="flex flex-col"
        >
            <Link
                href="/"
                className="text-3xl font-black font-montserrat text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
            >
                NUBEWARE.AI
            </Link>
            <span className="text-sm font-light text-gray-500 dark:text-gray-400 font-inter">
                Impulsando la innovación.
            </span>
        </motion.div>
    );
};

export default Logo;