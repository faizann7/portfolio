'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LightboxImage {
    src: string;
    alt: string;
}

interface LightboxContextType {
    isOpen: boolean;
    currentIndex: number;
    images: LightboxImage[];
    openLightbox: (index: number) => void;
    closeLightbox: () => void;
    nextImage: () => void;
    prevImage: () => void;
    registerImages: (newImages: LightboxImage[]) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<LightboxImage[]>([]);

    const registerImages = useCallback((newImages: LightboxImage[]) => {
        setImages(prev => {
            // Check if they are already registered to avoid infinite loops if called in effects
            const isNew = newImages.some(img => !prev.some(p => p.src === img.src));
            if (!isNew && prev.length === newImages.length) return prev;
            return newImages;
        });
    }, []);

    const openLightbox = useCallback((index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setIsOpen(false);
    }, []);

    const nextImage = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    return (
        <LightboxContext.Provider
            value={{
                isOpen,
                currentIndex,
                images,
                openLightbox,
                closeLightbox,
                nextImage,
                prevImage,
                registerImages,
            }}
        >
            {children}
        </LightboxContext.Provider>
    );
};

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within a LightboxProvider');
    }
    return context;
};
