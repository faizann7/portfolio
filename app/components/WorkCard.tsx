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
}

const WorkCard = ({
    title,
    subtitle,
    image,
    link,
    tags,
    index,
    color = "bg-gray-100",
    hoverColor = "bg-gray-200",
    comingSoon = false
}: WorkCardProps) => {
    // Extract or use the color values correctly
    const getBgColor = (colorValue: string) => {
        if (colorValue.startsWith('#')) {
            return colorValue; // Already a hex color
        } else if (colorValue.startsWith('bg-[') && colorValue.endsWith(']')) {
            return colorValue.slice(4, -1); // Extract from bg-[#color]
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
                className={`group relative h-[460px] max-h-[460px] overflow-hidden rounded-2xl transition-all duration-300 ${!bgColor ? color : ''}`}
                style={{
                    backgroundColor: bgColor || undefined,
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        backgroundColor: hoverBgColor || undefined,
                    }}
                />
                <div className="pt-6 px-6 h-full flex flex-col relative z-10">
                    <div className="mb-auto">
                        <div className="flex items-center mb-2">
                            <h3 className="text-2xl font-medium">{title}</h3>
                        </div>
                        <p className="text-lg mb-4">{subtitle}</p>
                    </div>
                    <div className="relative w-[80%] mx-auto overflow-hidden rounded-md transform transition-transform duration-500 group-hover:scale-105">
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
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR0XFx4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                        {comingSoon && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white/90 text-gray-800 font-semibold px-4 py-2 rounded-md shadow-lg">
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