import Link from 'next/link';
import { motion } from 'framer-motion';

interface GlassButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    isExternal?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export default function GlassButton({
    href,
    children,
    variant = 'primary',
    className = '',
    isExternal = false,
    onClick
}: GlassButtonProps) {
    const baseStyles = "group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-medium transition-all duration-500 backdrop-blur-md overflow-hidden";
    const variants = {
        primary: "bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white border border-white/20",
        secondary: "bg-gradient-to-r from-black/10 to-black/5 hover:from-black/20 hover:to-black/10 text-black dark:text-white border border-black/20 dark:border-white/20"
    };

    // Shimmer effect component
    const Shimmer = () => (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                transform: 'translateX(-100%)',
            }}
            animate={{
                transform: ['translateX(-100%)', 'translateX(100%)'],
            }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1
            }}
        />
    );

    // Glow effect component
    const Glow = () => (
        <div className="absolute inset-0 w-full h-full transition-all duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45" />
        </div>
    );

    const buttonContent = (
        <>
            <Shimmer />
            <Glow />
            <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                {children}
            </span>
            <div className="absolute inset-0 rounded-xl transition-all duration-500 group-hover:backdrop-blur-lg" />
        </>
    );

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    };

    if (isExternal) {
        return (
            <a
                href={href}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={handleClick}
        >
            {buttonContent}
        </Link>
    );
} 