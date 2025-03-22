'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";

interface PlaygroundItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
    type: "design" | "code" | "concept";
}

const playgroundItems: PlaygroundItem[] = [
    {
        id: "generative-art",
        title: "Generative Art Experiments",
        description: "Exploring creative coding with p5.js to create algorithmic art pieces.",
        tags: ["Creative Coding", "p5.js", "Generative Art"],
        image: "/images/playground/generative.jpg",
        link: "https://github.com/username/generative-art",
        type: "code"
    },
    {
        id: "design-system",
        title: "Personal Design System",
        description: "A component library I built for my personal projects, focusing on accessibility and consistency.",
        tags: ["Design System", "Components", "Figma"],
        image: "/images/playground/design-system.jpg",
        type: "design"
    },
    {
        id: "3d-ui",
        title: "3D Interface Concepts",
        description: "Exploring how 3D elements can enhance user interfaces while maintaining usability.",
        tags: ["3D", "UI Concepts", "Blender", "Three.js"],
        image: "/images/playground/3d-ui.jpg",
        type: "concept"
    },
    {
        id: "motion-experiments",
        title: "Micro-interactions & Motion",
        description: "A collection of subtle animations and transitions to enhance user experience.",
        tags: ["Motion Design", "Micro-interactions", "Framer Motion"],
        image: "/images/playground/motion.jpg",
        link: "https://codepen.io/username/pen/motion-collection",
        type: "code"
    },
    {
        id: "typography",
        title: "Typography Explorations",
        description: "Experiments with type scales, pairings, and layouts for digital interfaces.",
        tags: ["Typography", "Design", "Web"],
        image: "/images/playground/typography.jpg",
        type: "design"
    },
    {
        id: "ar-prototypes",
        title: "AR Experience Prototypes",
        description: "Early concepts for augmented reality interfaces and interactions.",
        tags: ["AR", "Prototyping", "Future Interfaces"],
        image: "/images/playground/ar.jpg",
        type: "concept"
    }
];

function PlaygroundContent() {
    const filterLabels = [
        { id: "all", label: "All" },
        { id: "design", label: "Design" },
        { id: "code", label: "Code" },
        { id: "concept", label: "Concepts" }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16">
            <div className="mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Playground</h1>
                <p className="text-xl max-w-2xl">A collection of side projects, experiments, and creative explorations. These projects represent my curiosity and continuous learning outside of client work.</p>
            </div>

            {/* Filter buttons (not functional in server component - would need client component with state) */}
            <div className="flex flex-wrap gap-3 mb-12">
                {filterLabels.map((filter) => (
                    <button
                        key={filter.id}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${filter.id === 'all' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {playgroundItems.map((item) => (
                    <div key={item.id} className="group">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <span className="text-sm">{item.type}</span>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                                {item.link ? (
                                    <Link href={item.link} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                                        View Project
                                    </Link>
                                ) : (
                                    <span className="text-white px-4 py-2 border border-white rounded-full">
                                        Concept Only
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-3">{item.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Playground() {
    return (
        <Suspense fallback={<div>Loading playground...</div>}>
            <SearchParamsProvider>
                <PlaygroundContent />
            </SearchParamsProvider>
        </Suspense>
    );
} 