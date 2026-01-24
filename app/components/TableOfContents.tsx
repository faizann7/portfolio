'use client';

import { useState, useEffect } from 'react';
import { slugify } from '../utils/slugify';
import { X } from 'lucide-react';

interface TOCProps {
    sections: { title: string }[];
}

export default function TableOfContents({ sections }: TOCProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0% -70% 0%' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(slugify(section.title));
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    // Shared TOC Panel Content
    const TOCContent = ({ showClose = false }: { showClose?: boolean }) => (
        <>
            <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-sans">In this case study</p>
                {showClose && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/60 hover:text-white transition-colors cursor-pointer p-2 -mr-2"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            <nav className="flex flex-col gap-2">
                {sections.map((section) => {
                    const id = slugify(section.title);
                    const isActive = activeId === id;
                    return (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`group flex items-start gap-3 text-left transition-all duration-200 cursor-pointer py-1.5 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            <div className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${isActive ? 'bg-white' : 'bg-white/30 group-hover:bg-white/50'
                                }`} />
                            <span className={`text-[13px] leading-snug font-sans ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {section.title}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </>
    );

    return (
        <>
            {/* DESKTOP SIDEBAR - (>= xl / 1280px) */}
            <div className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 w-56 text-left">
                <div className="p-5">
                    <TOCContent />
                </div>
            </div>

            {/* MOBILE & LAPTOP SIDE TAB - (All screens < xl / 1280px) */}
            <div className="xl:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-start">
                {/* Side Tab Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-[#1a1216]/90 hover:bg-[#1a1216] border-y border-r border-white/10 backdrop-blur-md px-2.5 py-5 rounded-r-xl cursor-pointer transition-all duration-300 shadow-xl flex flex-col items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 [writing-mode:vertical-lr] rotate-180">Contents</span>
                </button>

                {/* Draw-out Panel */}
                <div
                    onMouseLeave={() => setIsOpen(false)}
                    className={`w-72 max-w-[85vw] bg-[#1a1216]/95 backdrop-blur-xl border-y border-r border-white/10 rounded-r-2xl p-6 shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } absolute left-0 top-1/2 -translate-y-1/2`}
                >
                    <TOCContent showClose />
                </div>

                {/* Mobile Backdrop Overlay - helps close when tapping outside */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10 h-screen w-screen"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
