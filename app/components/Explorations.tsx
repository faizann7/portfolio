import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import TextReveal from "./TextReveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { THEME } from "../data/portfolio-config";
import { getImagePath } from "../utils/assets";

interface ExplorationCardProps {
    title: string;
    description: string;
    tag?: string;
    showTag?: boolean;
    tagIcon?: React.ReactNode;
    link: string;
    ctaText: string;
    contentPosition: 'top' | 'bottom';
    textMaxWidth?: string;
    colors: {
        bg: string;
        glow: string;
        accent?: string;
        badge?: string;
        text?: string;
    };
    children: React.ReactNode;
    delay: number;
    className?: string;
}

function ExplorationCard({
    title,
    description,
    tag,
    showTag = true,
    tagIcon,
    link,
    ctaText,
    contentPosition,
    textMaxWidth,
    colors,
    children,
    delay,
    className = ""
}: ExplorationCardProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <TextReveal delay={delay} className={`h-full relative z-10 hover:z-20 ${className}`}>
            <Link href={link} className="group block h-full">
                <motion.div
                    className="relative w-full h-full"
                    initial="messy"
                    animate={isMobile ? "organized" : undefined}
                    whileHover={isMobile ? undefined : "organized"}
                >
                    {/* Inner Clipped Container - Handles BG and Content */}
                    <div
                        className="absolute inset-0 border border-white/10 rounded-[var(--radius-card)] overflow-hidden shadow-2xl flex flex-col p-[var(--card-padding-sm)] transition-colors duration-500"
                        style={{
                            backgroundColor: colors.bg,
                        }}
                    >
                        {/* Background Glow */}
                        <div
                            className={`absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-50 ${contentPosition === 'top' ? 'top-0 right-0 -translate-y-1/2 translate-x-1/2' : 'bottom-0 right-0 translate-y-1/2 translate-x-1/2'}`}
                            style={{ backgroundColor: colors.glow }}
                        />

                        <div className={`relative z-10 w-full flex flex-col h-full ${contentPosition === 'top' ? 'justify-start' : 'justify-end'}`}>
                            {/* Tag */}
                            {showTag && tag && (
                                <div
                                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md self-start"
                                    style={{
                                        backgroundColor: colors.accent || colors.glow,
                                        borderColor: colors.badge || "rgba(255,255,255,0.1)",
                                        color: colors.text || "rgba(255,255,255,0.9)"
                                    }}
                                >
                                    <span>{tag}</span>
                                </div>
                            )}

                            {/* Text Content */}
                            <div className={contentPosition === 'top' ? 'max-w-full' : (textMaxWidth || 'max-w-[55%]')}>
                                <h3 className={`${contentPosition === 'top' ? 'text-3xl lg:text-3xl' : 'text-2xl'} font-medium leading-tight mb-2 tracking-tight text-white`}>
                                    {title}
                                </h3>
                                <p className={`${contentPosition === 'top' ? 'text-lg' : 'text-lg'} text-white/70 leading-relaxed mb-6`}>
                                    {description}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-2.5 text-[13px] font-medium text-white/40 group-hover:text-white transition-all duration-300 ease-out-expo">
                                    <span className="relative">
                                        {ctaText.toLowerCase()}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/20 group-hover:w-full group-hover:bg-white transition-all duration-500 ease-out-expo" />
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 translate-x-0 group-hover:translate-x-1 transition-all duration-500 ease-out-expo" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visuals moved OUTSIDE for breakout on desktop, and wrapped to hide on mobile */}
                    <div className="hidden lg:block">
                        {children}
                    </div>
                </motion.div>
            </Link>
        </TextReveal>
    );
}

export default function Explorations() {
    const { multidisciplinary, cinefatic, vibeCoded } = THEME.explorations;

    return (
        <section className="pt-32 mb-40">
            <TextReveal delay={0.2}>
                <div className="flex justify-center items-center mb-12">
                    <h2 className="text-3xl font-bold" id="explorations">- explorations & AI</h2>
                </div>
            </TextReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0 max-w-[1120px] mx-auto">

                <ExplorationCard
                    title={multidisciplinary.title}
                    description={multidisciplinary.description}
                    tag="Case Study"
                    showTag={false}
                    link={multidisciplinary.link}
                    ctaText="Read story"
                    contentPosition="top"
                    colors={{
                        bg: multidisciplinary.colors.bg,
                        glow: multidisciplinary.colors.glow,
                    }}
                    delay={0.3}
                    className="min-h-[400px] lg:min-h-[640px]"
                >
                    <div className="hidden lg:flex absolute inset-x-0 bottom-0 top-16 pointer-events-none perspective-[1000px] items-center justify-center z-10">
                        <div className="relative w-full h-full">
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-56 aspect-square bg-[#1e1e1e] rounded-[var(--radius-card)] shadow-2xl overflow-hidden border border-white/10 z-20"
                                variants={{
                                    messy: { x: "-55%", y: "-15%", rotate: 5, scale: 1 },
                                    organized: { x: "-55%", y: "-15%", rotate: 0, scale: 1.05 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <Image src={getImagePath("/images/playground/Card-1.webp")} alt="System" fill className="object-cover opacity-90" />
                            </motion.div>
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-56 aspect-square bg-white rounded-[var(--radius-card)] shadow-xl overflow-hidden border border-gray-200 z-10"
                                variants={{
                                    messy: { x: "-120%", y: "-65%", rotate: -15, scale: 0.9 },
                                    organized: { x: "-110%", y: "-65%", rotate: -4, scale: 0.9 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
                            >
                                <Image src={getImagePath("/images/playground/Card-2.webp")} alt="UI" fill className="object-cover" />
                            </motion.div>
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-56 aspect-square bg-white rounded-[var(--radius-card)] shadow-xl overflow-hidden border border-gray-200 z-10"
                                variants={{
                                    messy: { x: "10%", y: "-55%", rotate: 12, scale: 0.9 },
                                    organized: { x: "0%", y: "-65%", rotate: 4, scale: 0.9 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.08 }}
                            >
                                <Image src={getImagePath("/images/playground/Card-3.webp")} alt="UI" fill className="object-cover" />
                            </motion.div>
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-56 aspect-square bg-white rounded-[var(--radius-card)] shadow-xl overflow-hidden border border-gray-200 z-30"
                                variants={{
                                    messy: { x: "-110%", y: "25%", rotate: -8, scale: 0.95 },
                                    organized: { x: "-110%", y: "35%", rotate: -2, scale: 0.9 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                            >
                                <Image src={getImagePath("/images/playground/Card-4.webp")} alt="UI" fill className="object-cover" />
                            </motion.div>
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-56 aspect-square bg-white rounded-[var(--radius-card)] shadow-xl overflow-hidden border border-gray-200 z-30"
                                variants={{
                                    messy: { x: "20%", y: "35%", rotate: 15, scale: 0.95 },
                                    organized: { x: "0%", y: "35%", rotate: 2, scale: 0.9 }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.12 }}
                            >
                                <Image src={getImagePath("/images/playground/Card-5.webp")} alt="UI" fill className="object-cover" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile Simplified Visual */}
                    <div className="lg:hidden absolute bottom-0 right-0 w-full h-1/2 pointer-events-none overflow-hidden opacity-20">
                        <div className="relative w-full h-full translate-y-1/4 translate-x-1/4 rotate-12">
                            <Image src={getImagePath("/images/playground/Card-1.webp")} alt="System" width={300} height={300} className="rounded-[var(--radius-card)]" />
                        </div>
                    </div>
                </ExplorationCard>

                {/* Right Column Stack */}
                <div className="flex flex-col gap-8 h-full">
                    {/* Cinefatic Tile */}
                    <ExplorationCard
                        title={cinefatic.title}
                        description={cinefatic.subtitle}
                        tag={cinefatic.tag}
                        link={cinefatic.link}
                        ctaText="Coming soon"
                        contentPosition="bottom"
                        textMaxWidth="max-w-full lg:max-w-[45%]"
                        colors={{
                            bg: cinefatic.colors.bg,
                            glow: cinefatic.colors.glow,
                            accent: cinefatic.colors.accent,
                            badge: cinefatic.colors.badge,
                            text: cinefatic.colors.text
                        }}
                        delay={0.4}
                        className="flex-1 min-h-[300px] lg:min-h-[320px]"
                    >
                        <div className="hidden lg:block absolute -top-12 -right-4 w-[340px] h-[480px] pointer-events-none">
                            <motion.div
                                className="absolute w-[140px] rounded-[var(--radius-card)] overflow-hidden shadow-2xl border border-white/10"
                                style={{ left: '80px', top: '20px', zIndex: 10, transformOrigin: 'center center' }}
                                variants={{ messy: { rotate: 20, x: 0, y: 0 }, organized: { rotate: 15, x: -60, y: -30 } }}
                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
                            >
                                <Image src={getImagePath("/images/cinefatic/thumbs/iPhone 14 Pro-1.webp")} alt="Parasite" width={140} height={295} className="w-full h-auto" />
                            </motion.div>
                            <motion.div
                                className="absolute w-[160px] rounded-[var(--radius-card)] overflow-hidden shadow-2xl border border-white/20"
                                style={{ left: '120px', top: '20px', zIndex: 20, transformOrigin: 'center center' }}
                                variants={{ messy: { rotate: 30, x: 0, y: 0 }, organized: { rotate: 30, scale: 1.05, x: 0, y: 0 } }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                <Image src={getImagePath("/images/cinefatic/thumbs/iPhone 14 Pro.webp")} alt="Cinefatic Main" width={160} height={338} className="w-full h-auto" />
                            </motion.div>
                            <motion.div
                                className="absolute w-[140px] rounded-[var(--radius-card)] overflow-hidden shadow-2xl border border-white/10"
                                style={{ right: '30px', top: '70px', zIndex: 5, transformOrigin: 'center center' }}
                                variants={{ messy: { rotate: 40, x: 0, y: 0 }, organized: { rotate: 45, x: 60, y: 40 } }}
                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                            >
                                <Image src={getImagePath("/images/cinefatic/thumbs/iPhone 14 Pro-2.webp")} alt="BTTF" width={140} height={295} className="w-full h-auto" />
                            </motion.div>
                        </div>
                    </ExplorationCard>

                    {/* Vibe-coded Tile */}
                    <ExplorationCard
                        title={vibeCoded.title}
                        description={vibeCoded.subtitle}
                        tag={vibeCoded.tag}
                        link={vibeCoded.link}
                        ctaText="Coming soon"
                        contentPosition="bottom"
                        colors={{
                            bg: vibeCoded.colors.bg,
                            glow: vibeCoded.colors.glow,
                            accent: vibeCoded.colors.accent,
                            badge: vibeCoded.colors.badge,
                            text: vibeCoded.colors.text
                        }}
                        delay={0.5}
                        className="flex-1 min-h-[300px] lg:min-h-[320px]"
                    >
                        <div className="hidden lg:block absolute top-0 right-0 w-full h-full pointer-events-none z-10 overflow-hidden rounded-[var(--radius-card)]">
                            <div className="relative w-full h-full">
                                {/* Tool 1: Cursor */}
                                <motion.div
                                    className="absolute w-32 h-32"
                                    style={{ right: '-8px', top: '-16px', zIndex: 50 }}
                                    variants={{ messy: { x: 10, y: -10, rotate: -12, scale: 0.95 }, organized: { x: -10, y: 5, rotate: 0, scale: 1.05 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    <Image src={getImagePath("/images/tools/Icon.jpeg.svg")} alt="Tool" fill className="object-contain" />
                                </motion.div>

                                {/* Tool 2: Chatgpt */}
                                <motion.div
                                    className="absolute w-28 h-28"
                                    style={{ right: '96px', top: '8px', zIndex: 40 }}
                                    variants={{ messy: { x: -20, y: -5, rotate: 15, scale: 0.9 }, organized: { x: -35, y: 15, rotate: 5, scale: 1 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
                                >
                                    <Image src={getImagePath("/images/tools/Icon.png-1.svg")} alt="Chatgpt" fill className="object-contain" />
                                </motion.div>

                                {/* Tool 3: claude */}
                                <motion.div
                                    className="absolute w-32 h-32"
                                    style={{ right: '1px', top: '75px', zIndex: 30 }}
                                    variants={{ messy: { x: 20, y: 10, rotate: -8, scale: 0.85 }, organized: { x: 10, y: 25, rotate: -5, scale: 0.95 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                                >
                                    <Image src={getImagePath("/images/tools/Icon.png.svg")} alt="claude" fill className="object-contain" />
                                </motion.div>

                                {/* Tool 4: Figma */}
                                <motion.div
                                    className="absolute w-32 h-32"
                                    style={{ right: '-16px', top: '176px', zIndex: 20 }}
                                    variants={{ messy: { x: 30, y: 20, rotate: 12, scale: 0.9 }, organized: { x: 15, y: 35, rotate: 8, scale: 1 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.15 }}
                                >
                                    <Image src={getImagePath("/images/tools/Symbol.svg.svg")} alt="Figma" fill className="object-contain" />
                                </motion.div>

                                {/* Tool 5: Tailwind */}
                                <motion.div
                                    className="absolute w-24 h-24"
                                    style={{ right: '80px', top: '120px', zIndex: 10 }}
                                    variants={{
                                        messy: { x: -20, y: 15, rotate: 20, scale: 0.85 },
                                        organized: { x: -45, y: 30, rotate: -10, scale: 0.95 }
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                                >
                                    <Image src={getImagePath("/images/tools/tailwind_css_icon.jpeg.svg")} alt="Tailwind" fill className="object-contain" />
                                </motion.div>

                                {/* Tool 6: React */}
                                <motion.div
                                    className="absolute w-28 h-28"
                                    style={{ right: '64px', top: '206px', zIndex: 5 }}
                                    variants={{ messy: { x: 10, y: 30, rotate: 25, scale: 0.8 }, organized: { x: 20, y: 45, rotate: 15, scale: 0.9 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.25 }}
                                >
                                    <Image src={getImagePath("/images/tools/Logo.svg.svg")} alt="React" fill className="object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </div>
                        </div>
                    </ExplorationCard>
                </div>
            </div>
        </section>
    );
}
