'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLightbox } from './LightboxContext';

export default function Lightbox() {
    const { isOpen, images, currentIndex, closeLightbox, nextImage, prevImage } = useLightbox();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }, [closeLightbox, nextImage, prevImage]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('lightbox-open');
        } else {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            document.body.classList.remove('lightbox-open');
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            document.body.classList.remove('lightbox-open');
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen || images.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 select-none"
                onClick={closeLightbox}
            >
                {/* Close Button - Moved to left on mobile to avoid conflict with hamburger menu */}
                <button
                    className="absolute top-6 left-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors cursor-pointer z-[1010] p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                    }}
                >
                    <X size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                </button>

                {/* Counter */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium tracking-widest uppercase">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Navigation - Prev */}
                {images.length > 1 && (
                    <button
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all cursor-pointer z-[1010] p-4 hover:scale-110 active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>
                )}

                {/* Main Content */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-contain drop-shadow-2xl grayscale-0 hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                </motion.div>

                {/* Navigation - Next */}
                {images.length > 1 && (
                    <button
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all cursor-pointer z-[1010] p-4 hover:scale-110 active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>
                )}

                {/* Caption / Alt */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-6">
                    <p className="text-white/60 text-sm md:text-base font-light max-w-xl mx-auto italic leading-relaxed">
                        {images[currentIndex].alt}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
