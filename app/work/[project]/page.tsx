import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import ProjectClient from "./ProjectClient";
import Footer from "../../components/Footer";
import { loadCaseStudyData, CaseStudyData } from "../../utils/caseStudyLoader";

// Add generateStaticParams function to specify all possible project values
export async function generateStaticParams() {
    return [
        { project: "cinefatic" },
        { project: "swapp" },
        { project: "route-helper" },
        { project: "inbounding-medzmore" },
        { project: "rider-app-medzmore" }
    ];
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