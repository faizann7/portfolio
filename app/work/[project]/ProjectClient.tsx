'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SearchParamsProvider } from "../../components/SearchParamsProvider";
import { CaseStudyData } from "./page";
import { getImagePath } from "../../utils/assets";

// Helper function for image paths
const processImagePath = (path: string) => getImagePath(path);

interface ProjectClientProps {
    project: any;
    caseStudyData: CaseStudyData;
    projectId: string;
}

export default function ProjectClient({ project, caseStudyData, projectId }: ProjectClientProps) {
    return (
        <Suspense fallback={<div>Loading project...</div>}>
            <SearchParamsProvider>
                <div className="pt-24 md:pt-32 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
                    <Link href="/#work" className="inline-flex items-center text-gray-600 hover:text-black mb-8 group transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to all work
                    </Link>

                    {/* Header content with max-width */}
                    <div className="mx-auto text-center mb-16" style={{ maxWidth: "768px" }}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        {projectId === "rider-app-medzmore" && (
                            <h2 className="text-xl mb-12">Shift Management for tabiyat.pk Riders</h2>
                        )}
                        {projectId !== "rider-app-medzmore" && (
                            <p className="text-xl mb-12">{caseStudyData.description}</p>
                        )}

                        {/* Project details in 3 columns */}
                        <div className="grid grid-cols-3 gap-8 mt-12">
                            <div>
                                <h3 className="text-sm uppercase text-gray-500 mb-1">Timeline</h3>
                                <p className="text-lg">{projectId === "rider-app-medzmore" ? "4 weeks" : caseStudyData.duration}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase text-gray-500 mb-1">Role</h3>
                                <p className="text-lg">{projectId === "rider-app-medzmore" ? "UX / Product Design" : caseStudyData.role}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase text-gray-500 mb-1">Tools Used</h3>
                                <p className="text-lg">{projectId === "rider-app-medzmore" ? "Figma, Zoom, Google Forms" : "Figma, Principle"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero image section - full width */}
                    <div className="w-full mb-16 rounded-xl overflow-hidden">
                        <Image
                            src={projectId === "rider-app-medzmore" ? "/images/riderapp/riderapp_main.png" : "/images/cinefatic/Cinefatic Main.png"}
                            alt={`${project.title} main screen`}
                            width={1400}
                            height={800}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Main content wrapper with max-width */}
                    <div className="mx-auto" style={{ maxWidth: "768px" }}>
                        {/* Overview section */}
                        <div className="mb-24">
                            <h2 className="text-4xl font-bold mb-10">Overview</h2>
                            <div className="text-xl space-y-8">
                                {caseStudyData.overview.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Case study sections */}
                        {caseStudyData.sections?.map((section, index) => (
                            <div key={index} className="mb-24">
                                <h2 className="text-4xl font-bold mb-10">{section.title}</h2>
                                <div className="text-xl">
                                    {section.content}
                                </div>
                            </div>
                        ))}

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
                                    {caseStudyData.finalScreens.map((screen, index) => (
                                        <div key={index} className="w-full rounded-xl overflow-hidden">
                                            {screen.image && (
                                                <Image
                                                    src={screen.image}
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
                            <Link href="/#work" className="text-lg hover:text-gray-600 mb-4 md:mb-0 transition-colors">
                                View all projects
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