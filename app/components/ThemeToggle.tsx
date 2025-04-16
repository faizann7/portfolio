'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize theme state based on user preference
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const listener = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', listener);
        return () => darkModeMediaQuery.removeEventListener('change', listener);
    }, []);

    // Apply theme class to document when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
                color: 'var(--navbar-text)',
                transition: 'var(--theme-transition)'
            }}
        >
            {isDarkMode ? (
                <Sun size={18} className="opacity-90 hover:opacity-100" />
            ) : (
                <Moon size={18} className="opacity-90 hover:opacity-100" />
            )}
        </button>
    );
} 