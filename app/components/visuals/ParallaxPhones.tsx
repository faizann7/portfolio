'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useMemo } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { useLightbox } from '../ui/LightboxContext';
import { getImagePath } from '../../utils/assets';

interface ParallaxPhonesProps {
    images: string[]; // Expects [Left, Center, Right]
    className?: string;
    offsetX?: number;
    offsetY?: number;
}

export default function ParallaxPhones({ images, className, offsetX = 0, offsetY = 0 }: ParallaxPhonesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { images: globalImages, openLightbox } = useLightbox();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleImageClick = (src: string) => {
        const processedSrc = src.startsWith('http') || src.startsWith('/') ? src : getImagePath(src);
        const index = globalImages.findIndex(img => img.src === processedSrc);
        if (index !== -1) {
            openLightbox(index);
        }
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Parallax effects
    const yMiddle = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const yBack = useTransform(scrollYProgress, [0, 1], [0, -100]);

    if (!images || images.length < 3) return null;

    // Smooth easing equivalent to a gentle landing without overshoot
    const smoothTransition = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as any };

    if (isMobile) {
        return (
            <div
                ref={containerRef}
                className={`relative mx-auto mt-12 mb-8 ${className || ''}`}
                style={{
                    width: '100%',
                    height: '400px',
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Static stack for mobile */}
                    <div
                        className="absolute w-[160px] translate-x-[-70px] translate-y-[20px] rotate-[-10deg] opacity-60 grayscale-[0.2] cursor-pointer"
                        onClick={() => handleImageClick(images[0])}
                    >
                        <Image src={images[0]} alt="Left Screen" width={300} height={600} className="w-full h-auto drop-shadow-xl rounded-2xl" />
                    </div>
                    <div
                        className="absolute w-[160px] translate-x-[70px] translate-y-[20px] rotate-[10deg] opacity-60 grayscale-[0.2] cursor-pointer"
                        onClick={() => handleImageClick(images[2])}
                    >
                        <Image src={images[2]} alt="Right Screen" width={300} height={600} className="w-full h-auto drop-shadow-xl rounded-2xl" />
                    </div>
                    <div
                        className="absolute w-[190px] z-10 cursor-pointer group"
                        onClick={() => handleImageClick(images[1])}
                    >
                        <Image src={images[1]} alt="Main Screen" width={400} height={800} className="w-full h-auto drop-shadow-2xl rounded-3xl" priority />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white">
                                <Maximize2 size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Desktop View
    return (
        <div
            ref={containerRef}
            className={`relative mx-auto mt-24 mb-12 ${className || ''}`}
            style={{
                width: 'min(100%, 950px)',
                height: '500px',
                transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
        >
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">

                {/* Left Phone */}
                <motion.div
                    className="absolute w-[200px]"
                    initial={{ opacity: 0, y: 100, x: -50, rotate: 0 }}
                    animate={{ opacity: 1, y: 40, x: -160, rotate: -15 }}
                    transition={{ ...smoothTransition, delay: 0.1 }}
                    style={{ zIndex: 10 }}
                >
                    <motion.div style={{ y: yBack }}>
                        <Image
                            src={images[0]}
                            alt="Left Screen"
                            width={500}
                            height={1000}
                            className="w-full h-auto drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Right Phone */}
                <motion.div
                    className="absolute w-[200px]"
                    initial={{ opacity: 0, y: 100, x: 50, rotate: 0 }}
                    animate={{ opacity: 1, y: 40, x: 160, rotate: 15 }}
                    transition={{ ...smoothTransition, delay: 0.1 }}
                    style={{ zIndex: 10 }}
                >
                    <motion.div style={{ y: yBack }}>
                        <Image
                            src={images[2]}
                            alt="Right Screen"
                            width={500}
                            height={1000}
                            className="w-full h-auto drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Center Phone */}
                <motion.div
                    className="absolute w-[220px]"
                    initial={{ opacity: 0, y: 120 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={smoothTransition}
                    style={{ zIndex: 20 }}
                >
                    <motion.div style={{ y: yMiddle }}>
                        <Image
                            src={images[1]}
                            alt="Main Screen"
                            width={500}
                            height={1000}
                            className="w-full h-auto drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
