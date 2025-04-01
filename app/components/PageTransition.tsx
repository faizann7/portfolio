"use client"

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.4
            }}
        >
            {children}
        </motion.div>
    );
} 