import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

const TextReveal = ({
    children,
    delay = 0,
    duration = 0.5,
    className = "",
    as: Component = "div"
}: TextRevealProps) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: duration,
                ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth reveal
                delay: delay
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default TextReveal; 