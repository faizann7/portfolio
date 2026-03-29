'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    className?: string;
    target?: string;
}

export default function Button({ href, onClick, children, variant = 'primary', className = '', target }: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-[var(--radius-button)] transition-all duration-300 text-lg font-medium cursor-pointer";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-200 border border-transparent",
        outline: "border border-white/20 hover:bg-white/10 text-white",
        ghost: "hover:bg-white/5 text-white/80 hover:text-white"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} target={target} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedStyles}>
            {children}
        </button>
    );
}
