'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense, useEffect, useMemo } from "react";
import { SearchParamsProvider } from "../../components/SearchParamsProvider";
import { CaseStudyData } from "../../utils/caseStudyLoader";
import { getImagePath } from "../../utils/assets";
import CaseStudyRenderer from "../../components/CaseStudyRenderer";
import { Project } from "../../data/projects";
import ParallaxPhones from "../../components/visuals/ParallaxPhones";
import Button from "../../components/ui/Button";
import StackedWorkCards from "../../components/StackedWorkCards";
import PasswordGate from "../../components/PasswordGate";
import TableOfContents from "../../components/TableOfContents";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lightbulb, Target, ArrowRight, Clock, Zap, Layers, MessageSquare, ArrowRightLeft, FileText, List, X } from "lucide-react";
import { LightboxProvider, useLightbox } from "../../components/ui/LightboxContext";
import Lightbox from "../../components/ui/Lightbox";

// Helper function for image paths
const processImagePath = (path: string) => getImagePath(path);

// Define Swapp Payment visuals directly (typically would come from JSON in a robust system)
const SWAPP_TRIO = [
    '/images/swapp/payments/mainvisual/left.webp',
    '/images/swapp/payments/mainvisual/middle.webp',
    '/images/swapp/payments/mainvisual/right.webp',
];

interface ProjectClientProps {
    project: Project;
    caseStudyData: CaseStudyData;
    projectId: string;
}

// Sub-component to manage global gallery registration
function GalleryManager({ caseStudyData, projectId, SWAPP_TRIO }: { caseStudyData: CaseStudyData, projectId: string, SWAPP_TRIO: string[] }) {
    const { registerImages } = useLightbox();

    const allVisuals = useMemo(() => {
        const visuals: { src: string; alt: string }[] = [];

        // 1. Hero Visuals
        if (projectId === 'swapp-payments') {
            SWAPP_TRIO.forEach(src => visuals.push({ src: getImagePath(src), alt: "Interface Detail" }));
        } else if (caseStudyData.heroImage) {
            visuals.push({ src: getImagePath(caseStudyData.heroImage), alt: "Project Hero" });
        }

        // 2. Section Images
        caseStudyData.sections?.forEach(section => {
            section.content?.forEach(content => {
                if (content.type === 'image' && content.src) {
                    visuals.push({
                        src: getImagePath(content.src),
                        alt: content.alt || section.title
                    });
                }
            });
        });

        // 3. Final Screens
        caseStudyData.finalScreens?.forEach(screen => {
            if (screen.image) {
                visuals.push({
                    src: getImagePath(screen.image),
                    alt: screen.title
                });
            }
        });

        return visuals;
    }, [caseStudyData, projectId, SWAPP_TRIO]);

    useEffect(() => {
        if (allVisuals.length > 0) {
            registerImages(allVisuals);
        }
    }, [allVisuals, registerImages]);

    return null;
}

// Inner component that can access Lightbox context
function CaseStudyContent({ project, caseStudyData, projectId }: ProjectClientProps) {
    const [isTLDROpen, setIsTLDROpen] = useState(false);
    const { openLightbox, images: galleryImages } = useLightbox();

    const { publicSections, protectedSections } = useMemo(() => {
        if (!caseStudyData.sections) return { publicSections: [], protectedSections: [] };

        const protectIndex = caseStudyData.protectedFromSection
            ? caseStudyData.sections.findIndex(s => s.title === caseStudyData.protectedFromSection)
            : -1;

        if (protectIndex === -1 || !project.isProtected) {
            return { publicSections: caseStudyData.sections, protectedSections: [] };
        }

        return {
            publicSections: caseStudyData.sections.slice(0, protectIndex),
            protectedSections: caseStudyData.sections.slice(protectIndex)
        };
    }, [caseStudyData.sections, caseStudyData.protectedFromSection, project.isProtected]);

    const handleHeroClick = (src: string) => {
        const processedSrc = getImagePath(src);
        const index = galleryImages.findIndex(img => img.src === processedSrc);
        if (index !== -1) {
            openLightbox(index);
        }
    };

    return (
        <div className="pt-24 md:pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 relative">
            {/* Show TOC for specific case studies */}
            {(projectId === 'swapp-payments' || projectId === 'cinefatic' || projectId === 'rider-app-medzmore') && caseStudyData.sections && (
                <TableOfContents sections={caseStudyData.sections} />
            )}

            <Link href="/#work" className="inline-flex items-center text-white/50 hover:text-white mb-12 group transition-colors font-sans text-sm font-medium">
                <ArrowRight className="mr-2 w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to all work
            </Link>

            {/* Header content */}
            {caseStudyData.mainHeadline ? (
                <div className="text-left mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 leading-[1.1] tracking-tight text-white">
                        {caseStudyData.mainHeadline}
                    </h1>

                    {/* Hero image for modern layout */}
                    {projectId === 'swapp-payments' ? (
                        <div className="w-full max-w-[950px] mb-16 overflow-visible">
                            <ParallaxPhones images={SWAPP_TRIO.map(processImagePath)} />
                        </div>
                    ) : (
                        <div className="w-full mb-16 overflow-hidden">
                            <Image
                                src={processImagePath(caseStudyData.heroImage || "")}
                                alt={`${project.title} main screen`}
                                width={1400}
                                height={800}
                                className="w-full h-auto rounded-[var(--radius-card-inner)] md:rounded-[var(--radius-card)] shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
                                onClick={() => handleHeroClick(caseStudyData.heroImage || "")}
                            />
                        </div>
                    )}

                    {/* Primary CTAs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-24">
                        {caseStudyData.prototypeUrl && (
                            <Button href={caseStudyData.prototypeUrl} variant="outline" target="_blank">
                                View prototype
                            </Button>
                        )}
                        {caseStudyData.tldr && (
                            <Button
                                onClick={() => setIsTLDROpen(!isTLDROpen)}
                                variant="outline"
                            >
                                Project Snapshot
                            </Button>
                        )}
                    </div>

                    {/* Expandable TL;DR Section */}
                    <AnimatePresence>
                        {isTLDROpen && caseStudyData.tldr && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden mb-24"
                            >
                                <div className="bg-white/[0.03] rounded-[var(--radius-card-lg)] p-[var(--card-padding)] md:p-[var(--card-padding-lg)] relative border border-white/10 backdrop-blur-sm">
                                    <button
                                        onClick={() => setIsTLDROpen(false)}
                                        className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white z-20 cursor-pointer"
                                    >
                                        <X size={24} />
                                    </button>

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white text-black text-[12px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase font-sans leading-none flex items-center justify-center">Snapshot</div>
                                            <h2 className="text-3xl font-bold text-white tracking-tight font-sans">{caseStudyData.tldr.title}</h2>
                                        </div>
                                        {caseStudyData.tldr.readTime && (
                                            <div className="flex items-center gap-2 text-white/30 text-sm font-medium uppercase tracking-widest">
                                                <Clock size={16} />
                                                <span>{caseStudyData.tldr.readTime} read</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Snapshot content cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                        <div className="bg-white/[0.02] border border-white/5 rounded-[var(--radius-card-inner)] p-[var(--card-padding-sm)]">
                                            <h3 className="text-white/20 uppercase tracking-[0.2em] text-[10px] font-black mb-4 font-sans">Role</h3>
                                            <div className="text-xl font-bold text-white leading-tight mb-1 font-sans">{caseStudyData.tldr.roleTitle}</div>
                                            <p className="text-white/30 text-sm font-sans">{caseStudyData.tldr.roleSubtitle}</p>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-[var(--radius-card-inner)] p-[var(--card-padding-sm)]">
                                            <h3 className="text-white/20 uppercase tracking-[0.2em] text-[10px] font-black mb-4 font-sans">Timeline</h3>
                                            <div className="text-xl font-bold text-white leading-tight mb-1 font-sans">{caseStudyData.tldr.timelineTitle}</div>
                                            <p className="text-white/30 text-sm font-sans">{caseStudyData.tldr.timelineSubtitle}</p>
                                        </div>
                                        <div className="bg-emerald-500/[0.05] border border-emerald-500/10 rounded-[var(--radius-card-inner)] p-[var(--card-padding-sm)] flex flex-col justify-center">
                                            <h3 className="text-emerald-400/30 uppercase tracking-[0.2em] text-[10px] font-black mb-4 font-sans">Headline Result</h3>
                                            <div className="text-6xl font-black text-emerald-400 tracking-tighter mb-1">{caseStudyData.tldr?.impactStat}</div>
                                            <p className="text-[13px] font-bold text-emerald-400/70 leading-snug font-sans uppercase tracking-wide">{caseStudyData.tldr?.impactLabel}</p>
                                        </div>
                                    </div>

                                    {/* Snapshot context blocks */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-red-400/[0.02] border border-red-400/10 rounded-[var(--radius-card)] p-[var(--card-padding)] space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center text-red-500 shadow-inner">
                                                    <Zap size={18} fill="currentColor" />
                                                </div>
                                                <h3 className="text-white font-bold leading-tight text-xl font-sans">{caseStudyData.tldr.frictionTitle}</h3>
                                            </div>
                                            <p className="text-white/70 text-lg leading-relaxed font-sans">
                                                {caseStudyData.tldr.frictionDescription}
                                            </p>
                                            {caseStudyData.tldr.userPerception && (
                                                <div className="bg-white/[0.03] rounded-[var(--radius-card-inner)] p-5 flex items-start gap-4 border border-white/5 italic shadow-xl">
                                                    <MessageSquare size={16} className="text-white/20 mt-1" />
                                                    <p className="text-[15px] text-white/80 font-medium font-sans">
                                                        {caseStudyData.tldr.userPerception}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-blue-400/[0.02] border border-blue-400/10 rounded-[var(--radius-card)] p-[var(--card-padding)] space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400 shadow-inner">
                                                    <Layers size={18} fill="currentColor" />
                                                </div>
                                                <h3 className="text-white font-bold leading-tight text-xl font-sans">{caseStudyData.tldr.strategyTitle}</h3>
                                            </div>
                                            <p className="text-white/70 text-lg leading-relaxed font-sans">
                                                {caseStudyData.tldr.strategyDescription}
                                            </p>
                                            {caseStudyData.tldr.strategyVisual && (
                                                <div className="bg-white/[0.03] rounded-[var(--radius-card-inner)] p-5 border border-white/5 font-sans shadow-xl">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex-1 flex flex-col items-center gap-2 p-3 rounded-[var(--radius-button)] bg-white/[0.02] text-white/30 border border-white/5">
                                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Before</span>
                                                            <span className="text-[11px] font-bold uppercase tracking-tight">{caseStudyData.tldr.strategyVisual.split(' -> ')[0]}</span>
                                                        </div>
                                                        <ArrowRight size={16} className="text-white/10 shrink-0" />
                                                        <div className="flex-1 flex flex-col items-center gap-2 p-3 rounded-[var(--radius-button)] bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                                            <span className="text-[9px] font-black uppercase tracking-widest">After</span>
                                                            <span className="text-[11px] font-bold uppercase tracking-tight">{caseStudyData.tldr.strategyVisual.split(' -> ')[1]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="mx-auto text-center mb-16" style={{ maxWidth: "768px" }}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{project.title}</h1>
                    <p className="text-xl mb-12 opacity-70">{caseStudyData.description}</p>
                </div>
            )}

            {/* Main content sections */}
            <div className="mx-auto" style={{ maxWidth: "768px" }}>
                {caseStudyData.overview && (
                    <div className="mb-24">
                        {caseStudyData.overviewHeading && (
                            <h2 className="text-4xl font-bold mb-10 text-white leading-tight">
                                {caseStudyData.overviewHeading}
                            </h2>
                        )}
                        <div className="text-xl space-y-8 text-white/80 leading-relaxed font-sans">
                            {caseStudyData.overview.split('\n\n').map((p: string, i: number) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Render Public Sections */}
                {publicSections.length > 0 && (
                    <div className="mb-8">
                        <CaseStudyRenderer sections={publicSections} />
                    </div>
                )}

                {/* Render Protected Sections */}
                {protectedSections.length > 0 && (
                    <PasswordGate projectId={projectId} isInline>
                        <CaseStudyRenderer sections={protectedSections} />
                    </PasswordGate>
                )}

                <div className="pt-32">
                    <StackedWorkCards currentProjectId={projectId} />
                </div>
            </div>
        </div>
    );
}

export default function ProjectClient({ project, caseStudyData, projectId }: ProjectClientProps) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-white/50 uppercase tracking-widest text-xs">Loading...</div>}>
            <SearchParamsProvider>
                <LightboxProvider>
                    <GalleryManager caseStudyData={caseStudyData} projectId={projectId} SWAPP_TRIO={SWAPP_TRIO} />
                    <CaseStudyContent project={project} caseStudyData={caseStudyData} projectId={projectId} />
                    <Lightbox />
                </LightboxProvider>
            </SearchParamsProvider>
        </Suspense>
    );
}
