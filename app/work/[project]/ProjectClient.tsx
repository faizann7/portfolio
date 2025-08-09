'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SearchParamsProvider } from "../../components/SearchParamsProvider";
import { CaseStudyData } from "../../utils/caseStudyLoader";
import { getImagePath } from "../../utils/assets";
import CaseStudyRenderer from "../../components/CaseStudyRenderer";

// Helper function for image paths
const processImagePath = (path: string) => getImagePath(path);

interface ProjectClientProps {
    project: any;
    caseStudyData: CaseStudyData | any;
    projectId: string;
}

export default function ProjectClient({ project, caseStudyData, projectId }: ProjectClientProps) {
    // Check if this is a new JSON-based case study
    const isNewCaseStudy = caseStudyData && 'sections' in caseStudyData && Array.isArray(caseStudyData.sections) && caseStudyData.sections.length > 0 && typeof caseStudyData.sections[0].content === 'object';

    return (
        <Suspense fallback={<div>Loading project...</div>}>
            <SearchParamsProvider>
                <div className="pt-24 md:pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
                    <Link href="/#work" className="inline-flex items-center black mb-8 group transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to all work
                    </Link>

                    {/* Header content with max-width */}
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
                                                    : projectId === "inbounding-medzmore"
                                                        ? "MEDZnMORE needed a specialized tool to validate pharmaceutical inventory data with extremely high accuracy, as any errors could potentially affect patient safety."
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
                                                    : projectId === "inbounding-medzmore"
                                                        ? "Worked with pharmacists to understand critical data points, designed step-by-step validation workflows, and created error prevention mechanisms achieving 99% accuracy."
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
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[0]?.value) || (projectId === "cinefatic" ? "<2m" : projectId === "rider-app-medzmore" ? "18%" : projectId === "swapp" ? "130%" : projectId === "route-helper" ? "51%" : projectId === "inbounding-medzmore" ? "99%" : "40%")}
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
                                                        : projectId === "inbounding-medzmore"
                                                            ? "Data accuracy achieved"
                                                            : "Improvement in key metrics")}
                                    </p>
                                </div>
                                {/* Second metric */}
                                <div>
                                    <div className="text-6xl font-bold mb-2 font-heading">
                                        {(caseStudyData.keyResults && caseStudyData.keyResults[1]?.value) || (projectId === "cinefatic" ? "5" : projectId === "rider-app-medzmore" ? "99.7%" : projectId === "swapp" ? "25%" : projectId === "route-helper" ? "23%" : projectId === "inbounding-medzmore" ? "<0.5%" : "60%")}
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
                                                        : projectId === "inbounding-medzmore"
                                                            ? "Error rate achieved"
                                                            : "Other key result")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero image section - full width */}
                    <div className="w-full mb-16 rounded-xl overflow-hidden">
                        <Image
                            src={processImagePath(caseStudyData.heroImage || (projectId === "rider-app-medzmore" ? "/images/riderapp/riderapp_main.png" : "/images/cinefatic/Cinefatic main.webp"))}
                            alt={`${project.title} main screen`}
                            width={1400}
                            height={800}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Goal section for new case studies */}
                    {isNewCaseStudy && caseStudyData.goal && (
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
                    )}

                    {/* Cinefatic Goal section - legacy */}
                    {projectId === "cinefatic" && !isNewCaseStudy && (
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
                    )}

                    {/* Main content wrapper with max-width */}
                    <div className="mx-auto" style={{ maxWidth: "768px" }}>
                        {/* Overview section */}
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

                    {/* Footer navigation */}
                    <div className="border-t border-gray-200 pt-16">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <Link href="/#work" className="inline-flex items-center black mb-8 group transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                View Other Work
                            </Link>
                            <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                Let's work together
                            </Link>
                        </div>
                    </div>
                </div>
            </SearchParamsProvider>
        </Suspense>
    );
} 