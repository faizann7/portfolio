import React, { useState } from 'react';
import Link from 'next/link';
import styles from './ScribbleLink.module.css';

interface ScribbleLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    isExternal?: boolean;
    onClick?: () => void;
}

export default function ScribbleLink({
    href,
    children,
    className = '',
    isExternal = false,
    onClick
}: ScribbleLinkProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        setIsActive(true);
        // Reset after transition completes
        setTimeout(() => setIsActive(false), 300);

        if (onClick) onClick(e);
    };

    const LinkContent = () => (
        <>
            <span>{children}</span>
            <svg
                className={`${styles.link__graphic} ${styles['link__graphic--stroke']} ${styles['link__graphic--scribble']}`}
                width="100%"
                height="12"
                viewBox="0 0 101 12"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
                    pathLength="1"
                />
            </svg>
        </>
    );

    if (isExternal) {
        return (
            <a
                href={href}
                className={`${styles.link} ${styles['link--carme']} ${className} ${isActive ? 'text-gray-400' : 'hover:text-gray-600'}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
            >
                <LinkContent />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out-expo"></span>
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={`${styles.link} ${styles['link--carme']} ${className} ${isActive ? 'text-gray-400' : 'hover:text-gray-600'}`}
            prefetch={true}
            onClick={handleClick}
        >
            <LinkContent />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out-expo"></span>
        </Link>
    );
} 