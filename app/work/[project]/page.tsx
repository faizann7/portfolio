import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";

interface PageProps {
    params: {
        project: string;
    };
}

// This will be used as fallback data for projects not yet added to the projects array
const projectsData = {
    "cinefatic": {
        description: "A reimagined movie-ticket booking experience for Karachi's cinemagoers. The app focuses on easy discovery, seamless booking, and enhanced movie experiences.",
        role: "Lead Product Designer",
        duration: "6 months, 2023",
        overview: "Cinefatic aims to revolutionize how people in Karachi discover and book movie tickets. I led the design process from research to implementation, focusing on creating an intuitive and delightful experience.",
        challenges: [
            "Adapting to local market needs and payment preferences",
            "Creating an engaging movie discovery experience",
            "Simplifying the booking flow to reduce drop-offs"
        ],
        process: [
            {
                title: "User Research",
                description: "Conducted interviews with 30+ moviegoers in Karachi to understand their behaviors and pain points."
            },
            {
                title: "Competitive Analysis",
                description: "Analyzed existing movie booking platforms to identify opportunities for improvement."
            },
            {
                title: "UI Design",
                description: "Created a vibrant, engaging interface that highlights movie artwork and simplifies the booking process."
            },
            {
                title: "Usability Testing",
                description: "Conducted multiple rounds of usability testing to refine the experience."
            }
        ],
        results: "The app launched successfully with a 4.8/5 rating on app stores. Conversion rates are 35% higher than industry average, and user feedback has been overwhelmingly positive."
    },
    "swapp": {
        description: "A comprehensive redesign of the car rental experience, focusing on simplifying the checkout process and improving conversion rates.",
        role: "Lead UX/UI Designer",
        duration: "2022-Present",
        overview: "Swapp is a car rental platform that aims to revolutionize the rental market by creating a seamless digital experience for finding, booking, and managing rental cars. I joined as the lead designer to optimize the conversion funnel and improve checkout completion rates.",
        challenges: [
            "Redesigning the checkout flow to reduce abandonment",
            "Simplifying complex rental options and add-ons",
            "Designing a system that clearly communicates pricing transparency"
        ],
        process: [
            {
                title: "Funnel Analysis",
                description: "Analyzed user drop-off points in the conversion funnel and identified key areas for improvement."
            },
            {
                title: "A/B Testing",
                description: "Designed multiple versions of the checkout flow and tested with real users to optimize performance."
            },
            {
                title: "UI Redesign",
                description: "Implemented a cleaner, more intuitive interface that guides users through the rental process."
            },
            {
                title: "Optimization",
                description: "Continuously refined the design based on analytics and user feedback."
            }
        ],
        results: "The redesigned checkout flow increased conversion rates from 1.5% to 2.4% - a 60% improvement that significantly impacted business revenue. The streamlined process also reduced customer support inquiries by 25%."
    },
    "route-helper": {
        description: "An overhauled route planning system with real-time dashboards that reduced planning time by 51% for delivery operations.",
        role: "Product Designer",
        duration: "8 months, 2021",
        overview: "Route Helper is a B2B SaaS solution for Retailo Technologies that optimizes delivery routes for their logistics operations. The system needed to handle complex routing needs while providing an intuitive interface for operations teams.",
        challenges: [
            "Designing complex data visualizations that remained easy to understand",
            "Creating interfaces that work efficiently under time pressure",
            "Balancing automation with manual override capabilities"
        ],
        process: [
            {
                title: "Field Research",
                description: "Spent time with operations teams to understand their workflow and pain points."
            },
            {
                title: "Information Architecture",
                description: "Structured the dashboard to prioritize critical information and actions."
            },
            {
                title: "Prototyping",
                description: "Created interactive prototypes that simulated real data scenarios for testing."
            },
            {
                title: "Implementation",
                description: "Worked closely with engineering to ensure the design was technically feasible and performed well."
            }
        ],
        results: "The new system reduced route planning time by 51%, allowing operations teams to focus on optimization rather than manual planning. It also improved delivery accuracy and reduced failed deliveries by 23%."
    },
    "inbounding-medzmore": {
        description: "A real-time data validation tool for pharmaceutical inventory management that ensures 99% accuracy with less than 0.5% error rate.",
        role: "Senior Product Designer",
        duration: "5 months, 2021",
        overview: "MEDZnMORE needed a specialized tool to validate pharmaceutical inventory data with extremely high accuracy. Any errors could potentially affect patient safety, making this a critical system for their operations.",
        challenges: [
            "Designing for maximum accuracy in high-pressure environments",
            "Creating interfaces that prevent human error",
            "Balancing speed and thoroughness in data validation workflows"
        ],
        process: [
            {
                title: "Requirements Gathering",
                description: "Worked with pharmacists and inventory specialists to understand critical data points and validation needs."
            },
            {
                title: "Workflow Design",
                description: "Created step-by-step processes that enforce validation at each stage."
            },
            {
                title: "Error Prevention",
                description: "Designed proactive error detection and correction mechanisms throughout the interface."
            },
            {
                title: "Training & Documentation",
                description: "Developed comprehensive training materials to ensure proper system usage."
            }
        ],
        results: "The system achieved 99% data accuracy with error rates below 0.5%, far exceeding industry standards. This led to improved inventory management, reduced waste, and enhanced patient safety."
    },
    "rider-app-medzmore": {
        description: "A delivery rider app with route optimization and real-time tracking capabilities for pharmaceutical deliveries.",
        role: "UX Designer",
        duration: "4 months, 2020",
        overview: "MEDZnMORE needed a specialized mobile app for their delivery riders to ensure timely and accurate delivery of medications. The app needed to be extremely easy to use while providing robust tracking and route guidance.",
        challenges: [
            "Designing for minimal distraction during delivery operations",
            "Creating interfaces that work well in various lighting conditions",
            "Ensuring the app works reliably in areas with poor connectivity"
        ],
        process: [
            {
                title: "Rider Interviews",
                description: "Spoke directly with delivery riders to understand their needs and constraints."
            },
            {
                title: "Journey Mapping",
                description: "Mapped the complete delivery journey to identify key interaction points."
            },
            {
                title: "Prototype Testing",
                description: "Created and tested prototypes with actual riders in field conditions."
            },
            {
                title: "Optimization",
                description: "Refined the design based on field testing and performance data."
            }
        ],
        results: "The app reduced delivery times by 18% and improved delivery accuracy to 99.7%. Rider satisfaction scores increased by 40%, and the system provided valuable real-time data for operations teams."
    }
};

export default function ProjectPage({ params }: PageProps) {
    // Get project from URL parameter
    const project = projects.find(p => p.id === params.project);

    // If project not found, show 404
    if (!project) {
        notFound();
    }

    // Get additional project data or use default
    const projectData = projectsData[params.project as keyof typeof projectsData];

    return (
        <div className="pt-24 md:pt-32 pb-16">
            <Link href="/#work" className="inline-flex items-center text-gray-600 hover:text-black mb-8 group transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to all work
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                <p className="text-xl mb-8">{projectData.description || project.subtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h3 className="text-sm uppercase text-gray-500 mb-1">Role</h3>
                        <p className="text-lg">{projectData.role || "Product Designer"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm uppercase text-gray-500 mb-1">Duration</h3>
                        <p className="text-lg">{projectData.duration || project.year}</p>
                    </div>
                    <div>
                        <h3 className="text-sm uppercase text-gray-500 mb-1">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 px-3 py-1 text-sm rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg mb-16 relative">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                </div>
                <div className="md:col-span-2">
                    <p className="text-lg mb-6">{projectData.overview}</p>

                    <h3 className="text-xl font-bold mb-3">Challenges</h3>
                    <ul className="list-disc pl-5 mb-8 space-y-2">
                        {projectData.challenges.map((challenge, index) => (
                            <li key={index} className="text-lg">{challenge}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-4">Process</h2>
                </div>
                <div className="md:col-span-2">
                    <div className="space-y-8">
                        {projectData.process.map((step, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-6 relative">
                                <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-gray-200"></div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-lg">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-4">Results</h2>
                </div>
                <div className="md:col-span-2">
                    <p className="text-lg">{projectData.results}</p>
                </div>
            </div>

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
    );
} 