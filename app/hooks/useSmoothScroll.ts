import { useEffect } from 'react';

export const useSmoothScroll = () => {
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.hash && anchor.href.includes(window.location.pathname)) {
                e.preventDefault();

                const element = document.querySelector(anchor.hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    // Update URL without scroll
                    window.history.pushState({}, '', anchor.hash);
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);
}; 