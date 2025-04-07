'use client';

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";
import { getImagePath } from "../utils/assets";
import Footer from "../components/Footer";

interface PlaygroundItem {
    id: string;
    image: string;
    bgColor: string;
    hoverBgColor: string;
    alt: string;
}

// Reusable card component
function PlaygroundCard({ item, onClick }: { item: PlaygroundItem, onClick: () => void }) {
    return (
        <div
            className={`card ${item.bgColor} hover:${item.hoverBgColor} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1`}
            role="article"
            onClick={onClick}
        >
            <div className="image-wrapper">
                <Image
                    src={getImagePath(item.image)}
                    alt={item.alt}
                    fill
                    priority={false}
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        </div>
    );
}

// Grid row component
function GridRow({ items, columns, onCardClick }: {
    items: PlaygroundItem[],
    columns: 2 | 3,
    onCardClick: (index: number) => void
}) {
    return (
        <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 mb-8 last:mb-0`}>
            {items.map((item, index) => (
                <PlaygroundCard
                    key={item.id}
                    item={item}
                    onClick={() => onCardClick(items[0].id === 'cinefatic' ? index :
                        (columns === 2 ? index + 2 : index + 2 + (items[0].id === 'gallery-app' ? 0 : 5)))}
                />
            ))}
        </div>
    );
}

// Modal component
function ImageModal({
    isOpen,
    onClose,
    currentImage,
    onPrev,
    onNext
}: {
    isOpen: boolean,
    onClose: () => void,
    currentImage: string,
    onPrev: () => void,
    onNext: () => void
}) {
    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };

        window.addEventListener('keydown', handleKeyDown);

        // Prevent scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose, onPrev, onNext]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-10"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <button
                className="absolute right-8 top-8 text-white text-4xl font-bold hover:text-gray-300"
                onClick={onClose}
            >
                &times;
            </button>
            <button
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl py-4 px-6 rounded-lg transition-colors duration-300"
                onClick={onPrev}
            >
                &lt;
            </button>
            <img
                src={currentImage}
                alt="Enlarged project"
                className="max-w-[90%] max-h-[90vh] object-contain rounded-lg"
            />
            <button
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl py-4 px-6 rounded-lg transition-colors duration-300"
                onClick={onNext}
            >
                &gt;
            </button>
        </div>
    );
}

const playgroundItems: PlaygroundItem[] = [
    {
        id: "cinefatic",
        image: "/images/play/Cinefatic Thumb.png",
        bgColor: "bg-purple-100/50",
        hoverBgColor: "bg-purple-200/80",
        alt: "Cinefatic Mobile App"
    },
    {
        id: "cinefatic-web",
        image: "/images/play/Cinefatic Web Thumb.png",
        bgColor: "bg-indigo-100/50",
        hoverBgColor: "bg-indigo-200/80",
        alt: "Cinefatic Web App"
    },
    {
        id: "blog",
        image: "/images/play/Blog.png",
        bgColor: "bg-amber-100/50",
        hoverBgColor: "bg-amber-200/80",
        alt: "Blog Website"
    },
    {
        id: "gallery-app",
        image: "/images/play/Gallleryapp.png",
        bgColor: "bg-violet-100/50",
        hoverBgColor: "bg-violet-200/80",
        alt: "Gallery App"
    },
    {
        id: "picture-app",
        image: "/images/play/pictureapp.png",
        bgColor: "bg-pink-100/50",
        hoverBgColor: "bg-pink-200/80",
        alt: "Picture App"
    },
    {
        id: "job-portal",
        image: "/images/play/jobapp.png",
        bgColor: "bg-rose-100/50",
        hoverBgColor: "bg-rose-200/80",
        alt: "Job Search App"
    },
    {
        id: "inbounding",
        image: "/images/play/inbounding.png",
        bgColor: "bg-sky-100/50",
        hoverBgColor: "bg-sky-200/80",
        alt: "Inbounding Website"
    },
    {
        id: "techniax",
        image: "/images/play/techniax.png",
        bgColor: "bg-emerald-100/50",
        hoverBgColor: "bg-emerald-200/80",
        alt: "Techniax Agency"
    },
    {
        id: "profileapp",
        image: "/images/play/Profile Thumb.png",
        bgColor: "bg-blue-100/50",
        hoverBgColor: "bg-blue-200/80",
        alt: "Profile Design"
    },
    {
        id: "saas",
        image: "/images/play/saasapp.png",
        bgColor: "bg-teal-100/50",
        hoverBgColor: "bg-teal-200/80",
        alt: "SaaS Dashboard"
    }
];

function PlaygroundContent() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Create chunks of items for the alternating grid pattern
    const firstRow = playgroundItems.slice(0, 2);
    const secondRow = playgroundItems.slice(2, 5);
    const thirdRow = playgroundItems.slice(5, 7);
    const fourthRow = playgroundItems.slice(7, 10);

    const handleCardClick = (index: number) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + playgroundItems.length) % playgroundItems.length);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % playgroundItems.length);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="pt-24 md:pt-32 pb-16 mx-auto">
                <div className="mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Playground</h1>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <GridRow items={firstRow} columns={2} onCardClick={handleCardClick} />
                    <GridRow items={secondRow} columns={3} onCardClick={handleCardClick} />
                    <GridRow items={thirdRow} columns={2} onCardClick={handleCardClick} />
                    <GridRow items={fourthRow} columns={3} onCardClick={handleCardClick} />
                </div>
            </div>

            <ImageModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                currentImage={getImagePath(playgroundItems[currentImageIndex].image)}
                onPrev={handlePrevImage}
                onNext={handleNextImage}
            />

            <Footer />
        </>
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