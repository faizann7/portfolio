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
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { href: "/#work", label: "work" },
        { href: "/playground", label: "playground" },
        { href: "/about", label: "about" },
        { href: "/resume", label: "resume" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full py-4 px-4 md:px-6 flex justify-between items-center z-50 transition-all duration-300 ease-out-expo ${scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
            <div className="max-w-[1120px] w-full mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <ScribbleLink
                    href="/"
                    className="text-2xl font-bold relative group"
                >
                    <span className="transition-colors duration-300 group-hover:text-gray-600">fz.</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out-expo"></span>
                </ScribbleLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center py-1">
                    {navLinks.map((link) => (
                        <ScribbleLink
                            key={link.href}
                            href={link.href}
                            className={pathname === link.href ? 'font-medium' : ''}
                        >
                            {link.label}
                        </ScribbleLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-8 h-8 flex items-center justify-center z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="relative w-6 h-5">
                        <span className={`absolute block h-0.5 w-full bg-black rounded-sm transition-all duration-300 ease-out-expo ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
                        <span className={`absolute top-2 block h-0.5 w-full bg-black rounded-sm transition-opacity duration-300 ease-out-expo ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`absolute block h-0.5 w-full bg-black rounded-sm transition-all duration-300 ease-out-expo ${isMenuOpen ? 'bottom-2 -rotate-45' : 'bottom-0'}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu - Using transform and opacity for smooth transitions */}
            <div
                className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-out-expo md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex flex-col justify-center items-center h-full space-y-8 p-8 text-center">
                    {navLinks.map((link, index) => (
                        <div
                            key={link.href}
                            className={`transition-all duration-400 ease-out-expo ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{
                                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                            }}
                        >
                            <ScribbleLink
                                href={link.href}
                                className={`text-2xl ${pathname === link.href ? 'font-medium' : ''}`}
                                onClick={toggleMenu}
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