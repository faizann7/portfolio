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
    darkBgColor: string;
    darkHoverBgColor: string;
    alt: string;
}

// Reusable card component
function PlaygroundCard({ item, onClick }: { item: PlaygroundItem, onClick: () => void }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check if we're in dark mode
    useEffect(() => {
        const checkDarkMode = () => {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const isDarkThemeClass = document.documentElement.classList.contains('dark-theme');

            setIsDarkMode(darkModeMediaQuery.matches || isDarkThemeClass);
        };

        // Initial check
        checkDarkMode();

        // Listen for changes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', checkDarkMode);

        // Watch for theme class changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            darkModeMediaQuery.removeEventListener('change', checkDarkMode);
            observer.disconnect();
        };
    }, []);

    // Determine the background styles based on dark/light mode
    const bgColorClass = isDarkMode ? item.darkBgColor : item.bgColor;
    const hoverBgColorClass = isDarkMode ? item.darkHoverBgColor : item.hoverBgColor;

    return (
        <div
            className="card rounded-2xl overflow-hidden"
            style={{
                backgroundColor: bgColorClass,
                transition: 'var(--theme-transition), transform 0.3s ease'
            }}
            role="article"
            onClick={onClick}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = hoverBgColorClass;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = bgColorClass;
            }}
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
            className="fixed inset-0 bg-black/95 z-50 flex justify-center items-center p-10"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                backdropFilter: 'blur(8px)'
            }}
        >
            <button
                className="absolute right-8 top-8 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-300"
                onClick={onClose}
                aria-label="Close modal"
            >
                &times;
            </button>
            <button
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl py-4 px-6 rounded-lg transition-colors duration-300"
                onClick={onPrev}
                aria-label="Previous image"
            >
                &lt;
            </button>
            <div className="relative max-w-[90%] max-h-[90vh]">
                <img
                    src={currentImage}
                    alt="Enlarged project"
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    style={{
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                    }}
                />
            </div>
            <button
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white text-2xl py-4 px-6 rounded-lg transition-colors duration-300"
                onClick={onNext}
                aria-label="Next image"
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
        bgColor: "rgba(203, 194, 255, 0.5)",
        hoverBgColor: "rgba(213, 207, 255, 0.8)",
        darkBgColor: "rgba(59, 31, 46, 0.7)",
        darkHoverBgColor: "rgba(76, 42, 59, 0.9)",
        alt: "Cinefatic Mobile App"
    },
    {
        id: "cinefatic-web",
        image: "/images/play/Cinefatic Web Thumb.png",
        bgColor: "rgba(199, 210, 254, 0.5)",
        hoverBgColor: "rgba(224, 231, 255, 0.8)",
        darkBgColor: "rgba(55, 48, 163, 0.5)",
        darkHoverBgColor: "rgba(67, 56, 202, 0.7)",
        alt: "Cinefatic Web App"
    },
    {
        id: "blog",
        image: "/images/play/Blog.png",
        bgColor: "rgba(254, 226, 179, 0.5)",
        hoverBgColor: "rgba(255, 241, 221, 0.8)",
        darkBgColor: "rgba(146, 64, 14, 0.5)",
        darkHoverBgColor: "rgba(180, 83, 9, 0.7)",
        alt: "Blog Website"
    },
    {
        id: "gallery-app",
        image: "/images/play/Gallleryapp.png",
        bgColor: "rgba(221, 214, 254, 0.5)",
        hoverBgColor: "rgba(233, 229, 255, 0.8)",
        darkBgColor: "rgba(109, 40, 217, 0.4)",
        darkHoverBgColor: "rgba(124, 58, 237, 0.6)",
        alt: "Gallery App"
    },
    {
        id: "picture-app",
        image: "/images/play/pictureapp.png",
        bgColor: "rgba(249, 199, 228, 0.5)",
        hoverBgColor: "rgba(252, 219, 236, 0.8)",
        darkBgColor: "rgba(131, 24, 67, 0.5)",
        darkHoverBgColor: "rgba(157, 23, 77, 0.7)",
        alt: "Picture App"
    },
    {
        id: "job-portal",
        image: "/images/play/jobapp.png",
        bgColor: "rgba(254, 202, 202, 0.5)",
        hoverBgColor: "rgba(254, 226, 226, 0.8)",
        darkBgColor: "rgba(153, 27, 27, 0.5)",
        darkHoverBgColor: "rgba(185, 28, 28, 0.7)",
        alt: "Job Search App"
    },
    {
        id: "inbounding",
        image: "/images/play/inbounding.png",
        bgColor: "rgba(186, 230, 253, 0.5)",
        hoverBgColor: "rgba(224, 242, 254, 0.8)",
        darkBgColor: "rgba(3, 105, 161, 0.5)",
        darkHoverBgColor: "rgba(7, 89, 133, 0.7)",
        alt: "Inbounding Website"
    },
    {
        id: "techniax",
        image: "/images/play/techniax.png",
        bgColor: "rgba(167, 243, 208, 0.5)",
        hoverBgColor: "rgba(209, 250, 229, 0.8)",
        darkBgColor: "rgba(6, 78, 59, 0.5)",
        darkHoverBgColor: "rgba(4, 120, 87, 0.7)",
        alt: "Techniax Agency"
    },
    {
        id: "profileapp",
        image: "/images/play/Profile Thumb.png",
        bgColor: "rgba(191, 219, 254, 0.5)",
        hoverBgColor: "rgba(219, 234, 254, 0.8)",
        darkBgColor: "rgba(30, 58, 138, 0.5)",
        darkHoverBgColor: "rgba(30, 64, 175, 0.7)",
        alt: "Profile Design"
    },
    {
        id: "saas",
        image: "/images/play/saasapp.png",
        bgColor: "rgba(153, 246, 228, 0.5)",
        hoverBgColor: "rgba(204, 251, 241, 0.8)",
        darkBgColor: "rgba(17, 94, 89, 0.5)",
        darkHoverBgColor: "rgba(15, 118, 110, 0.7)",
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