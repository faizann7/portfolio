"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface WorkCardProps {
    title: string;
    subtitle: string;
    image: string;
    link: string;
    tags: string[];
    index: number;
    color?: string;
    hoverColor?: string;
}

const WorkCard = ({
    title,
    subtitle,
    image,
    link,
    tags,
    index,
    color = "bg-gray-100",
    hoverColor = "bg-gray-200"
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

    return (
        <Link href={link} className="group block h-full">
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
                        <h3 className="text-2xl font-medium mb-2">{title}</h3>
                        <p className="text-lg mb-4">{subtitle}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="bg-white/70 px-3 py-1 text-sm rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="relative w-[80%] mx-auto overflow-hidden rounded-md transform transition-transform duration-500 group-hover:scale-105">
                        <Image
                            src={image}
                            alt={title}
                            width={500}
                            height={300}
                            className="object-cover w-full"
                        />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default WorkCard; 