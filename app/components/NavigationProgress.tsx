"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsNavigating(true);
        const timeout = setTimeout(() => setIsNavigating(false), 500);
        return () => clearTimeout(timeout);
    }, [pathname]);

    if (!isNavigating) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[100]">
            <div
                className="h-full bg-black animate-progress origin-left"
                style={{ animationDuration: '500ms' }}
            />
        </div>
    );
} 