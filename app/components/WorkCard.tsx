"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getImagePath } from "../utils/assets";

interface WorkCardProps {
    title: string;
    subtitle: string;
    image: string;
    link: string;
    tags: string[];
    index: number;
    color?: string;
    hoverColor?: string;
    comingSoon?: boolean;
    isProtected?: boolean;
}

const WorkCard = ({
    title,
    subtitle,
    image,
    link,
    tags,
    index,
    color = "var(--card-bg)",
    hoverColor = "var(--card-hover-bg)",
    comingSoon = false,
    isProtected = false
}: WorkCardProps) => {
    // Extract or use the color values correctly
    const getBgColor = (colorValue: string) => {
        if (!colorValue) return '';
        if (colorValue.startsWith('#')) {
            return colorValue; // Already a hex color
        } else if (colorValue.startsWith('bg-[') && colorValue.endsWith(']')) {
            return colorValue.slice(4, -1); // Extract from bg-[#color]
        } else if (colorValue.startsWith('var(--')) {
            return colorValue; // CSS variable
        }
        return ''; // Use default Tailwind classes
    };

    const bgColor = getBgColor(color);
    const hoverBgColor = getBgColor(hoverColor);

    // Process the image path for GitHub Pages compatibility
    const processedImagePath = getImagePath(image);

    // Wrapper component that conditionally renders Link or div based on comingSoon
    const CardWrapper = ({ children }: { children: React.ReactNode }) => {
        return comingSoon ? (
            <div className="group block h-full cursor-not-allowed">
                {children}
            </div>
        ) : (
            <Link href={link} className="group block h-full">
                {children}
            </Link>
        );
    };

    return (
        <CardWrapper>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative h-[300px] max-h-[300px] md:h-[460px] md:max-h-[460px] overflow-hidden rounded-[var(--radius-card)] transition-all duration-300`}
                style={{
                    backgroundColor: bgColor || 'var(--card-bg)',
                    color: 'var(--foreground)',
                    transition: 'var(--theme-transition)'
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        backgroundColor: hoverBgColor || 'var(--card-hover-bg)',
                    }}
                />
                <div className="pt-[var(--card-padding-sm)] px-[var(--card-padding-sm)] pb-0 h-full flex flex-col relative z-10">
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-medium">{title}</h3>
                            {isProtected && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            )}
                        </div>
                        <p className="text-lg mb-4">{subtitle}</p>
                    </div>
                    <div className="relative w-[80%] mx-auto overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                        <Image
                            src={processedImagePath}
                            alt={title}
                            width={800}
                            height={600}
                            className={`object-cover w-full ${comingSoon ? 'opacity-80' : ''}`}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 800px"
                            quality={75}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR0XFx4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                        {comingSoon && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-gray-800/90 text-gray-100 font-semibold px-4 py-2 rounded-[var(--radius-s)] shadow-lg">
                                    Coming Soon
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </CardWrapper>
    );
};

export default WorkCard; 