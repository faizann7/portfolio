'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { SearchParamsProvider } from "../../components/SearchParamsProvider";
import { CaseStudyData } from "../../utils/caseStudyLoader";
import { getImagePath } from "../../utils/assets";
import CaseStudyRenderer from "../../components/CaseStudyRenderer";
import { projects, Project } from "../../data/projects";
import ParallaxPhones from "../../components/visuals/ParallaxPhones";
import Button from "../../components/ui/Button";
import StackedWorkCards from "../../components/StackedWorkCards";
import PasswordGate from "../../components/PasswordGate";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lightbulb, Target, ArrowRight, Clock, Zap, Layers, MessageSquare, ArrowRightLeft, FileText, List } from "lucide-react";

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

export default function ProjectClient({ project, caseStudyData, projectId }: ProjectClientProps) {
    const [isTLDROpen, setIsTLDROpen] = useState(false);

    // Check if this is a new JSON-based case study
    const isNewCaseStudy = caseStudyData && 'sections' in caseStudyData && Array.isArray(caseStudyData.sections) && caseStudyData.sections.length > 0 && typeof caseStudyData.sections[0].content === 'object';

    // ... existing activeProjects logic ...
    const activeProjects = projects.filter((p) => !p.comingSoon && !p.isConceptual);
    const hasActive = activeProjects.length > 0;
    const currentActiveIndex = hasActive
        ? Math.max(0, activeProjects.findIndex((p) => p.id === projectId))
        : 0;
    const previousProject = hasActive
        ? activeProjects[(currentActiveIndex - 1 + activeProjects.length) % activeProjects.length]
        : project;
    const nextProject = hasActive
        ? activeProjects[(currentActiveIndex + 1) % activeProjects.length]
        : project;

    const showExploreCard = previousProject.id !== nextProject.id;

    const content = (
        <div className="pt-24 md:pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
            <Link href="/#work" className="inline-flex items-center black mb-8 group transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to all work
            </Link>

            {/* Header content */}
            {caseStudyData.mainHeadline ? (
                <div className="text-left mb-16">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                        {caseStudyData.mainHeadline}
                    </h1>
                    {/* {caseStudyData.subtitle && (
                        <p className="text-xl md:text-xl font-heading font-medium mb-12 opacity-80 max-w-3xl leading-relaxed">
                            {caseStudyData.subtitle}
                        </p>
                    )} */}

                    {/* Hero image for modern layout */}
                    {projectId === 'swapp-payments' ? (
                        <div className="w-full max-w-[950px] mb-10 overflow-hidden">
                            <ParallaxPhones images={SWAPP_TRIO} />
                        </div>
                    ) : (
                        <div className="w-full mb-10 overflow-hidden">
                            <Image
                                src={processImagePath(caseStudyData.heroImage || "")}
                                alt={`${project.title} main screen`}
                                width={1400}
                                height={800}
                                className="w-full h-auto rounded-xl md:rounded-2xl"
                            />
                        </div>
                    )}

                    {/* Primary CTAs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-20">
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
                                TL;DR
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
                                className="overflow-hidden mb-20"
                            >
                                <div className="bg-white/[0.03] rounded-2xl p-6 relative border border-white/10 backdrop-blur-sm">
                                    <button
                                        onClick={() => setIsTLDROpen(false)}
                                        className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white z-20 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white text-black text-[12px] font-bold px-3 py-2 rounded-lg tracking-tighter uppercase font-sans leading-none flex items-center justify-center">TL;DR</div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight font-sans">{caseStudyData.tldr.title}</h2>
                                        </div>
                                        {caseStudyData.tldr.readTime && (
                                            <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                                                <Clock size={16} />
                                                {caseStudyData.tldr.readTime}
                                            </div>
                                        )}
                                    </div>

                                    {/* Top Row: Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        {/* Role Card */}
                                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                                            <h3 className="text-white/30 uppercase tracking-widest text-[10px] font-bold mb-3 font-sans">Project Role</h3>
                                            <div className="text-xl font-bold text-white leading-tight mb-1 font-sans">{caseStudyData.tldr.roleTitle}</div>
                                            {caseStudyData.tldr.roleSubtitle && (
                                                <p className="text-white/40 text-sm font-sans">{caseStudyData.tldr.roleSubtitle}</p>
                                            )}
                                        </div>

                                        {/* Timeline Card */}
                                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                                            <h3 className="text-white/30 uppercase tracking-widest text-[10px] font-bold mb-3 font-sans">Timeline</h3>
                                            <div className="text-xl font-bold text-white leading-tight mb-1 font-sans">{caseStudyData.tldr.timelineTitle}</div>
                                            {caseStudyData.tldr.timelineSubtitle && (
                                                <p className="text-white/40 text-sm font-sans">{caseStudyData.tldr.timelineSubtitle}</p>
                                            )}
                                        </div>

                                        {/* Outcome Card */}
                                        <div className="bg-emerald-500/[0.06] border border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-center">
                                            <h3 className="text-emerald-400/50 uppercase tracking-widest text-[10px] font-bold mb-3 font-sans">Outcome</h3>
                                            <div className="text-7xl font-black text-emerald-400 tracking-tighter mb-1">
                                                {caseStudyData.tldr.impactStat}
                                            </div>
                                            <p className="text-sm font-bold text-emerald-400/80 leading-snug font-sans">
                                                {caseStudyData.tldr.impactLabel}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Row: Detailed Context */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Friction Block */}
                                        <div className="bg-red-400/[0.02] border border-red-400/10 rounded-2xl p-8 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center text-red-400">
                                                    <Zap size={16} fill="currentColor" />
                                                </div>
                                                <h3 className="text-white font-bold leading-tight text-xl font-sans">{caseStudyData.tldr.frictionTitle}</h3>
                                            </div>
                                            <p className="text-white/90 text-lg leading-relaxed font-sans font-medium">
                                                {caseStudyData.tldr.frictionDescription}
                                            </p>
                                            {caseStudyData.tldr.userPerception && (
                                                <div className="bg-red-400/[0.04] rounded-xl p-4 flex items-start gap-3 border border-red-400/5">
                                                    <MessageSquare size={14} className="text-red-400/60 mt-0.5" />
                                                    <p className="text-[14px] italic text-red-400/90 font-semibold font-sans">
                                                        {caseStudyData.tldr.userPerception}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Strategy Block */}
                                        <div className="bg-blue-400/[0.02] border border-blue-400/10 rounded-2xl p-8 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                                                    <Layers size={16} fill="currentColor" />
                                                </div>
                                                <h3 className="text-white font-bold leading-tight text-xl font-sans">{caseStudyData.tldr.strategyTitle}</h3>
                                            </div>
                                            <p className="text-white/90 text-lg leading-relaxed font-sans font-medium">
                                                {caseStudyData.tldr.strategyDescription}
                                            </p>
                                            {caseStudyData.tldr.strategyVisual && (
                                                <div className="bg-blue-400/[0.04] rounded-xl p-4 border border-blue-400/5 font-sans">
                                                    <div className="flex items-center justify-between gap-2">
                                                        {/* Before State */}
                                                        <div className="flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg border border-dashed border-blue-200/20 bg-blue-400/[0.02] text-blue-200/40">
                                                            <FileText size={12} />
                                                            <span className="text-[10px] font-bold uppercase tracking-wider truncate">{caseStudyData.tldr.strategyVisual.split(' -> ')[0]}</span>
                                                        </div>

                                                        <ArrowRight size={14} className="text-blue-400/20 shrink-0" />

                                                        {/* After State */}
                                                        <div className="flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg border border-blue-400/30 bg-blue-400/10 text-blue-200 shadow-sm">
                                                            <List size={12} className="text-blue-400" />
                                                            <span className="text-[10px] font-bold uppercase tracking-wider truncate">{caseStudyData.tldr.strategyVisual.split(' -> ')[1]}</span>
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
                <>
                    <div className="mx-auto text-center mb-16" style={{ maxWidth: "768px" }}>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{project.title}</h1>
                        {projectId === "rider-app-medzmore" && (
                            <h2 className="text-xl font-heading font-medium mb-12">Shift Management for tabiyat.pk Riders</h2>
                        )}
                        {projectId !== "rider-app-medzmore" && (
                            <p className="text-xl mb-12">{caseStudyData.description}</p>
                        )}

                        {/* Project details in 3 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                            <div>
                                <h3 className="text-sm uppercase opacity-80 mb-1 font-heading font-medium">Timeline</h3>
                                <p className="text-lg">{caseStudyData.duration || (projectId === "rider-app-medzmore" ? "4 weeks" : "")}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase opacity-80 mb-1 font-heading font-medium">Role</h3>
                                <p className="text-lg">{caseStudyData.role || (projectId === "rider-app-medzmore" ? "UX / Product Design" : "")}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase opacity-80 mb-1 font-heading font-medium">{caseStudyData.platform ? 'Platform' : 'Team'}</h3>
                                <p className="text-lg">{caseStudyData.platform || caseStudyData.team || (projectId === "cinefatic" ? "Mobile app" : "Solo project")}</p>
                            </div>
                        </div>

                        {/* Problem Statement */}
                        <div className="mt-10 mb-8 text-left">
                            <h3 className="text-xl mb-2 font-heading font-medium">Problem</h3>
                            <p className="text-xl">
                                {caseStudyData.problem || (
                                    projectId === "cinefatic"
                                        ? "Karachi lacked a single, reliable platform to book tickets for major cinemas, forcing people into slow, manual methods like phone calls or in-person visits."
                                        : projectId === "rider-app-medzmore"
                                            ? "As Tabiyat.pk's customer base rapidly expanded, the rider operations struggled to keep pace. The absence of a structured rider schedule led to missed deliveries, inefficient dispatch, and poor scalability."
                                            : projectId === "swapp"
                                                ? "The existing car rental checkout process had high abandonment rates and complex user flows, leading to poor conversion rates and frustrated customers."
                                                : projectId === "route-helper"
                                                    ? "Retailo Technologies needed a more efficient route planning system that could handle complex logistics operations while providing real-time insights to reduce planning time and improve delivery accuracy."
                                                    : "The project required solving complex user experience challenges while meeting business objectives and technical constraints."
                                )}
                            </p>
                        </div>

                        {/* What I did & achieved */}
                        <div className="mb-8 text-left">
                            <h3 className="text-xl mb-2 font-heading font-medium">What I did</h3>
                            <p className="text-xl">
                                {caseStudyData.whatIDid || (
                                    projectId === "cinefatic"
                                        ? "Validated the problem through user research, mapped booking journeys, identified market gaps, and designed a unified app for showtimes, seat selection, and seamless checkout."
                                        : projectId === "rider-app-medzmore"
                                            ? "Conducted field research with riders, redesigned the app for outdoor accessibility, implemented shift-based scheduling, and created intuitive break management systems."
                                            : projectId === "swapp"
                                                ? "Analyzed user drop-off points, redesigned the checkout flow with A/B testing, and implemented a cleaner interface that increased conversion rates by 130%."
                                                : projectId === "route-helper"
                                                    ? "Spent time with operations teams, structured information architecture for complex data, and created interactive prototypes that reduced route planning time by 51%."
                                                    : "Led the complete design process from research to implementation, ensuring the solution met user needs and business objectives."
                                )}
                            </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="mb-16 text-left">
                            <h3 className="text-xl mb-4 font-heading font-medium">Key results</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {/* First metric */}
                                <div>
                                    <div className="text-6xl font-bold mb-2 font-heading">
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[0]?.value) || (projectId === "cinefatic" ? "<2m" : projectId === "rider-app-medzmore" ? "18%" : projectId === "swapp" ? "130%" : projectId === "route-helper" ? "51%" : "40%")}
                                    </div>
                                    <p className="text-base">
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[0]?.label) || (projectId === "cinefatic"
                                            ? "End to end ticket booking time"
                                            : projectId === "rider-app-medzmore"
                                                ? "Reduction in delivery times"
                                                : projectId === "swapp"
                                                    ? "Increase in conversion rates"
                                                    : projectId === "route-helper"
                                                        ? "Reduction in planning time"
                                                        : "Improvement in key metrics")}
                                    </p>
                                </div>
                                {/* Second metric */}
                                <div>
                                    <div className="text-6xl font-bold mb-2 font-heading">
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[1]?.value) || (projectId === "cinefatic" ? "5" : projectId === "rider-app-medzmore" ? "99.7%" : projectId === "swapp" ? "25%" : projectId === "route-helper" ? "23%" : "60%")}
                                    </div>
                                    <p className="text-base">
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[1]?.label) || (projectId === "cinefatic"
                                            ? "Major cinemas integrated in one app"
                                            : projectId === "rider-app-medzmore"
                                                ? "Delivery accuracy achieved"
                                                : projectId === "swapp"
                                                    ? "Reduction in support inquiries"
                                                    : projectId === "route-helper"
                                                        ? "Reduction in manual effort"
                                                        : "Other key result")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero image section - classic full width */}
                    <div className="w-full mb-16 rounded-xl overflow-hidden">
                        <Image
                            src={processImagePath(caseStudyData.heroImage || (projectId === "rider-app-medzmore" ? "/images/riderapp/riderapp_main.png" : "/images/cinefatic/Cinefatic main.webp"))}
                            alt={`${project.title} main screen`}
                            width={1400}
                            height={800}
                            className="w-full h-auto"
                        />
                    </div>
                </>
            )
            }

            {/* Goal section for new case studies */}
            {
                isNewCaseStudy && caseStudyData.goal && (
                    <div className="mx-auto mb-16" style={{ maxWidth: "814px" }}>
                        <div
                            style={{ background: "#42292E", color: "#fff", borderRadius: "1rem", padding: "2rem" }}
                        >
                            <h2 className="text-3xl font-bold mb-4 flex items-center">The Goal <span className="ml-2">🎯</span></h2>
                            <p className="text-lg">
                                {caseStudyData.goal}
                            </p>
                        </div>
                    </div>
                )
            }

            {/* Cinefatic Goal section - legacy */}
            {
                projectId === "cinefatic" && !isNewCaseStudy && (
                    <div className="mx-auto mb-16" style={{ maxWidth: "814px" }}>
                        <div
                            style={{ background: "#42292E", color: "#fff", borderRadius: "1rem", padding: "2rem" }}
                        >
                            <h2 className="text-3xl font-bold mb-4 flex items-center">The Goal <span className="ml-2">🎯</span></h2>
                            <p className="text-lg">
                                To design a single, reliable app that solves the long-standing frustration faced by people in Karachi, the lack of an easy way to book tickets online for major cinemas like Nueplex.
                            </p>
                        </div>
                    </div>
                )
            }

            {/* Main content wrapper with max-width */}
            <div className="mx-auto" style={{ maxWidth: "768px" }}>
                {/* Overview section */}
                {caseStudyData.overview && (
                    <div className="mb-24">
                        {caseStudyData.overviewHeading && caseStudyData.overviewHeading !== '' && (
                            <h2 className="text-4xl font-bold mb-10">
                                {caseStudyData.overviewHeading}
                            </h2>
                        )}
                        <div className="text-xl space-y-8">
                            {caseStudyData.overview.split('\n\n').map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Case study sections - use new renderer for JSON-based case studies */}
                {isNewCaseStudy ? (
                    <CaseStudyRenderer sections={caseStudyData.sections} />
                ) : (
                    /* Legacy case study sections */
                    caseStudyData.sections?.map((section: any, index: number) => (
                        <div key={index} className="mb-24">
                            <h2 className="text-4xl font-bold mb-10">{section.title}</h2>
                            <div className="text-xl">
                                {section.content}
                            </div>
                        </div>
                    ))
                )}

                {/* Results section - only show for projects that don't have custom sections */}
                {(!caseStudyData.sections || caseStudyData.sections.length === 0) && (
                    <div className="mb-24">
                        <h2 className="text-4xl font-bold mb-10">Results</h2>
                        <p className="text-xl">{caseStudyData.results}</p>

                        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
                            <p className="text-xl">This case study is currently in progress.</p>
                        </div>
                    </div>
                )}

                {/* Final screens */}
                {caseStudyData.finalScreens?.length > 0 && (
                    <div className="mb-24">
                        <h2 className="text-4xl font-bold mb-10">Key Screens</h2>
                        <div className="flex flex-col gap-8">
                            {caseStudyData.finalScreens.map((screen: any, index: number) => (
                                <div key={index} className="w-full rounded-xl overflow-hidden">
                                    {screen.image && (
                                        <Image
                                            src={processImagePath(screen.image)}
                                            alt={screen.title}
                                            width={768}
                                            height={400}
                                            className="w-full h-auto"
                                        />
                                    )}
                                    <div className="mt-4">
                                        <p className="font-bold text-xl">{screen.title}</p>
                                        <p className="text-gray-600">{screen.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-16">
                <StackedWorkCards currentProjectId={projectId} />
            </div>
        </div >
    );

    return (
        <Suspense fallback={<div>Loading project...</div>}>
            <SearchParamsProvider>
                {project.isProtected ? (
                    <PasswordGate projectId={projectId}>
                        {content}
                    </PasswordGate>
                ) : (
                    content
                )}
            </SearchParamsProvider>
        </Suspense>
    );
} 