import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "../../data/projects";
import ProjectClient from "./ProjectClient";
import Footer from "../../components/Footer";
import { loadCaseStudyData, CaseStudyData } from "../../utils/caseStudyLoader";

// Add generateStaticParams function to specify all possible project values
export async function generateStaticParams() {
    // Only generate pages for active (non-coming soon) projects
    const active = projects.filter((p) => !p.comingSoon);
    return active.map((p) => ({ project: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { project: projectId } = await params;
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = `${project.title} | Muhammad Faizan`;
    const description = project.summary;
    const images = project.image ? [project.image] : [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
        },
    };
}

// Updated PageProps interface to match Next.js App Router expectations
type PageProps = {
    params: Promise<{
        project: string;
    }>;
    searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ProjectPage({ params }: PageProps) {
    const { project: projectId } = await params;

    // Find the project data
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        notFound();
    }

    // Disallow direct access to coming soon projects
    if (project.comingSoon) {
        notFound();
    }

    // Try to load case study data from JSON file first
    let caseStudyData: CaseStudyData | null = await loadCaseStudyData(projectId);

    // If no JSON file exists, fall back to a minimal generic dataset
    if (!caseStudyData) {
        caseStudyData = {
            id: project.id,
            title: project.title,
            description: project.subtitle,
            role: "Product Designer",
            duration: project.year,
            tools: "Figma",
            overview: project.summary,
            sections: [],
            results: "Project successfully delivered on time and with positive user feedback.",
            finalScreens: []
        };
    }

    return (
        <>
            <ProjectClient project={project} caseStudyData={caseStudyData} projectId={projectId} />
            <Footer />
        </>
    );
} 