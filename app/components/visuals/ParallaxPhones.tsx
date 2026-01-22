'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxPhonesProps {
    images: string[]; // Expects [Left, Center, Right]
    className?: string;
    offsetX?: number;
    offsetY?: number;
}

export default function ParallaxPhones({ images, className, offsetX = 0, offsetY = 0 }: ParallaxPhonesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
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
