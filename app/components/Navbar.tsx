"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ScribbleLink from "./ScribbleLink";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Close menu when route changes
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { href: "/#work", label: "work" },
        { href: "/playground", label: "playground" },
        { href: "/about", label: "about" },
        { href: "https://drive.google.com/file/d/1_TDOryfI7Ij6o_ivQGHiSUrZ6NuHOxzo/view?usp=sharing", label: "resume", isExternal: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full py-2 px-4 md:px-6 flex justify-between items-center z-[100] transition-all duration-300 ease-out-expo ${scrolled ? "backdrop-blur-md bg-black/[0.02] shadow-[0_2px_8px_rgba(0,0,0,0.04)]" : ""}`}
            style={{
                color: 'var(--navbar-text)',
                transition: 'var(--theme-transition)'
            }}
        >
            <div className="max-w-[1120px] w-full mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <ScribbleLink
                    href="/"
                    className="text-2xl font-bold relative group"
                >
                    <span className="transition-colors duration-300 group-hover:opacity-80">fz.</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-out-expo"></span>
                </ScribbleLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center py-1">
                    {navLinks.map((link) => (
                        <ScribbleLink
                            key={link.href}
                            href={link.href}
                            className={`hover:text-[var(--navbar-text)] ${pathname === link.href ? 'font-medium' : ''}`}
                            isExternal={link.isExternal}
                        >
                            {link.label}
                        </ScribbleLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-8 h-8 flex items-center justify-center z-[110] cursor-pointer"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="relative w-6 h-5">
                        <span className={`absolute block h-0.5 w-full rounded-sm transition-all duration-300 ease-out-expo ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}
                            style={{ backgroundColor: 'var(--navbar-text)' }}></span>
                        <span className={`absolute top-2 block h-0.5 w-full rounded-sm transition-opacity duration-300 ease-out-expo ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                            style={{ backgroundColor: 'var(--navbar-text)' }}></span>
                        <span className={`absolute block h-0.5 w-full rounded-sm transition-all duration-300 ease-out-expo ${isMenuOpen ? 'bottom-2 -rotate-45' : 'bottom-0'}`}
                            style={{ backgroundColor: 'var(--navbar-text)' }}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu - Using transform and opacity for smooth transitions */}
            <div
                className={`fixed inset-0 w-screen h-screen backdrop-blur-sm z-[90] transform transition-transform duration-300 ease-out-expo md:hidden ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{
                    background: 'var(--bg-dark)',
                    opacity: isMenuOpen ? 1 : 0,
                    visibility: isMenuOpen ? 'visible' : 'hidden',
                    transition: 'transform 300ms ease-out-expo, opacity 200ms ease-out',
                }}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex flex-col justify-center items-center min-h-screen w-full p-8 text-center">
                    {navLinks.map((link, index) => (
                        <div
                            key={link.href}
                            className="transform transition-transform duration-200 ease-out-expo"
                            style={{
                                opacity: isMenuOpen ? 1 : 0,
                                transform: `translateY(${isMenuOpen ? 0 : 20}px)`,
                                transition: `transform 200ms ease-out ${index * 50}ms, opacity 200ms ease-out ${index * 50}ms`
                            }}
                        >
                            <ScribbleLink
                                href={link.href}
                                className={`text-2xl hover:text-[var(--navbar-text)] ${pathname === link.href ? 'font-medium' : ''}`}
                                onClick={toggleMenu}
                                isExternal={link.isExternal}
                            >
                                {link.label}
                            </ScribbleLink>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
} 
