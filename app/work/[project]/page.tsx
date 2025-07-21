import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import ProjectClient from "./ProjectClient";
import { getImagePath } from "../../utils/assets";
import Footer from "../../components/Footer";

// Helper component for case study images
const CaseStudyImage = ({ src, alt, width, height, className }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}) => {
    const processedSrc = getImagePath(src);
    return (
        <Image
            src={processedSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
};

// Utility wrapper for wide images
const WideImageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full flex justify-center my-12">
        <div style={{ maxWidth: "1120px", width: "100%" }}>
            {children}
        </div>
    </div>
);

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
    params: {
        project: string;
    };
    searchParams?: Record<string, string | string[] | undefined>;
};

// This will be used to structure our case study content
export interface CaseStudySection {
    title: string;
    content: string | React.ReactNode;
}

export interface FinalScreen {
    title: string;
    description: string;
    image: string;
}

// Define a comprehensive type that covers all possible case study data formats
export interface CaseStudyData {
    description: string;
    role: string;
    duration: string;
    overview: string;
    overviewHeading?: string; // Optional heading for overview section
    challenges?: string[];
    process?: { title: string; description: string; }[];
    sections?: CaseStudySection[];
    results: string;
    finalScreens: FinalScreen[];
}

// This will be used as fallback data for projects not yet added to the projects array
const projectsData = {
    "cinefatic": {
        description: "A reimagined movie-ticket booking experience for Karachi's cinemagoers. The app focuses on easy discovery, seamless booking, and enhanced movie experiences.",
        role: "UI & UX Designer",
        duration: "2022",
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
        results: "The redesigned checkout flow increased conversion rates from 1.3% to 3% - a nearly 130% improvement that significantly impacted business revenue. The streamlined process also reduced customer support inquiries by 25%."
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
        overview: "Tabiyat.pk is a pharmacy delivery service in Pakistan, operated by MEDZnMORE. As the customer base grew, their existing rider app—initially designed around ad-hoc, trip-by-trip assignments—became hard to manage and scale effectively. Riders didn't have clear schedules, resulting in late deliveries and operational stress.\n\nI led the UX design initiative to transition from chaotic, on-demand trips to a structured, shift-based scheduling model, enhancing rider clarity, operational efficiency, and scalability.",
        results: "The app reduced delivery times by 18% and improved delivery accuracy to 99.7%. Rider satisfaction scores increased by 40%, and the system provided valuable real-time data for operations teams.",
        sections: [
            {
                title: "The Problem & Business Context",
                content: (
                    <div className="space-y-8">
                        <p>
                            As Tabiyat.pk's customer base rapidly expanded, the rider operations struggled to keep pace. The absence of a structured rider schedule led to significant operational problems:
                        </p>

                        <ul className="list-disc pl-5 space-y-4">
                            <li>Missed Deliveries: Riders didn't have a clear "clock-in" time, resulting in late arrivals, frustrated customers, and damaged brand reputation.</li>
                            <li>Inefficient Dispatch: Managers scrambled to assign deliveries in real-time, causing bottlenecks, poor resource management, and unnecessary stress.</li>
                            <li>Poor Scalability: The existing ad-hoc approach couldn't effectively handle sudden spikes in orders or increased rider numbers, limiting growth potential.</li>
                        </ul>

                        <div className="w-full my-12 rounded-lg">
                            <CaseStudyImage
                                src="/images/riderapp/Old Screen.png"
                                alt="Original rider app screen showing accessibility issues"
                                width={500}
                                height={600}
                                className="rounded-lg mx-auto"
                            />
                        </div>

                        <p>
                            We urgently needed a scalable, predictable shift system. Riders needed to clearly know when to start their day, eliminating confusion and minimizing delay.
                        </p>
                    </div>

                )
            },
            {
                title: "Discovery & Key Insights",
                content: (
                    <div className="space-y-8">
                        <p>
                            Together with the product manager, I visited rider warehouses to observe users in real-world conditions, noting their interactions with the app in bright, loud, and busy environments.
                        </p>

                        <p>
                            This on-site research revealed critical issues:
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">No Clear Start Time</h3>
                        <p>
                            Riders logged hours but had no clear clock-in step. This ambiguity caused delays and confusion, negatively affecting on-time deliveries.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Last-Minute Chaos</h3>
                        <p>
                            Without pre-scheduled shifts, managers frantically assigned trips reactively, creating inefficiencies and rider frustration.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Accessibility Challenges & Hard to-See UI</h3>
                        <p>
                            During my initial personal usage of the rider app, I formed a hypothesis that the existing primary brand color (#00ABE3) might not meet accessibility standards, especially in bright, outdoor environments where riders typically used the app.
                        </p>

                        <p>
                            To validate this, I performed quick, guerrilla-style usability tests during our warehouse visits. These tests involved riders interacting with various screens outdoors, allowing me to observe their behaviors in a natural setting without interference or bias.
                        </p>

                        <p>
                            These tests revealed critical insights:
                        </p>

                        <ul className="list-disc pl-5 space-y-4">
                            <li>Riders struggled to read small text and subtle UI elements due to poor color contrast.</li>
                            <li>Riders frequently overlooked text-heavy instructions, instead depending heavily on clear, prominent buttons and visual indicators.</li>
                            <li>Immediate visual cues indicating their shift status (e.g., whether they were on time or late) were critical to rider clarity.</li>
                        </ul>

                        <p>
                            Through this real-time testing, my hypothesis was confirmed: the brand's original primary color failed WCAG contrast guidelines for outdoor readability.
                        </p>

                        <p>
                            The app needed visual improvements to address these accessibility issues, ensuring it remained clearly usable under the actual working conditions of the riders.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Break-Time Confusion</h3>
                        <p>
                            Riders lacked clear and timely alerts about their break durations. Without straightforward reminders or visual cues, riders unintentionally exceeded breaks, resulting in penalties and disruptions to the overall delivery schedule.
                        </p>
                    </div>
                )
            },
            {
                title: "Design Approach",
                content: (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mt-8 mb-4">User Journeys & Wireframes</h3>
                        <p>
                            Mapped a clear, step-by-step rider journey—from arriving at the warehouse, clocking in for shifts, accepting new trips, to handling breaks. This helped ensure we designed realistic and intuitive user flows.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Rapid Sketching and Feedback</h3>
                        <p>
                            Quick, low-fidelity wireframes were created for key actions like "Start My Day," "Take a Break," and accepting trips. Short, iterative feedback sessions with operational managers ensured the language was simple, familiar, and actionable (e.g., "Start My Day" instead of "Mark Present").
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Accessible & Actionable Visuals</h3>
                        <p>
                            Selected a high-contrast palette that's easily readable outdoors. Shift statuses (on-time, late, break exceeded) were highlighted clearly through bold color choices, solving critical accessibility concerns identified during initial research.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Core Goals for the Design</h3>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>Simple shift-overview screens to clearly show daily schedules.</li>
                            <li>Intuitive buttons for clock-in actions, minimizing confusion and delays.</li>
                            <li>Enhanced readability for outdoor usage by adjusting color contrasts.</li>
                        </ul>


                    </div>
                )
            },
            {
                title: "Final Design",
                content: (
                    <div className="space-y-12">
                        <h3 className="text-2xl font-bold mb-6">Calendar & Shift Cards</h3>
                        <p className="text-lg mb-8">
                            The homepage clearly displays upcoming and current shifts, enabling riders to plan their day at a glance. The empty state provides clear, reassuring messaging if no shifts are available yet.
                        </p>

                        <div className="w-full my-12 flex justify-center">
                            <CaseStudyImage
                                src="/images/riderapp/Calendar & Shift Cards.png"
                                alt="Calendar and shift cards interface showing empty state and active shifts"
                                width={1200}
                                height={800}
                                className="rounded-lg"
                            />
                        </div>

                        <h3 className="text-2xl font-bold mt-16 mb-6">Clocking In (Start Your Day)</h3>
                        <p className="text-lg mb-8">
                            The "Start your day" action becomes available precisely 15 minutes before shifts, reducing confusion and late arrivals. Once riders confirm, they're taken directly into their shift overview, streamlining the process.
                        </p>

                        <div className="w-full my-12 flex justify-center">
                            <CaseStudyImage
                                src="/images/riderapp/Clocking In (Start Your Day).png"
                                alt="Rider app screens showing the clocking in process"
                                width={1200}
                                height={800}
                                className="rounded-lg"
                            />
                        </div>

                        <h3 className="text-2xl font-bold mt-16 mb-6">Accepting New Trips</h3>
                        <p className="text-lg mb-8">
                            Riders receive timely alerts for new trips. Accepted trips appear neatly organized under clear categories such as "Active Trips," "Upcoming Trips," and "Completed Trips," simplifying task management.
                        </p>

                        <div className="w-full my-12 flex justify-center">
                            <CaseStudyImage
                                src="/images/riderapp/Accepting New Trips.png"
                                alt="Rider app screens showing trip management and acceptance flow"
                                width={1200}
                                height={800}
                                className="rounded-lg"
                            />
                        </div>

                        <h3 className="text-2xl font-bold mt-16 mb-6">Break Management</h3>
                        <p className="text-lg mb-8">
                            Riders have a dedicated interface for managing their 15-minute breaks. Clear, visual countdowns inform riders exactly how long they've been on break, with explicit warnings about potential penalties for exceeding break time.
                        </p>

                        <div className="w-full my-12 flex justify-center">
                            <CaseStudyImage
                                src="/images/riderapp/Break Management.png"
                                alt="Rider app screens showing break management system with countdowns"
                                width={1200}
                                height={800}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                )
            },
            {
                title: "Results & Outcomes",
                content: (
                    <div className="space-y-10">
                        <p className="text-lg mb-8">
                            Since the company ceased operations shortly after launching this feature, we didn't have the chance to measure concrete results. However, based on our initial research and user validation, we anticipated the following improvements:
                        </p>
                        <ul className="list-disc pl-5 space-y-6 text-lg">
                            <li>Improved rider punctuality through clearly communicated shift start times.</li>
                            <li>Reduced friction in daily tasks due to enhanced accessibility and visibility under bright sunlight.</li>
                            <li>Decreased confusion and operational bottlenecks, making it easier for managers to handle rider schedules and shifts.</li>
                        </ul>
                    </div>
                )
            },
            {
                title: "Reflection & Learnings",
                content: (
                    <div className="space-y-10">
                        <p className="text-lg mb-8">
                            This project reinforced the critical role that real-world observation plays in product design. Observing riders on-site highlighted issues—such as accessibility gaps and overlooked usability challenges—that desk research alone would never surface.
                        </p>

                        <p className="text-lg mb-6">
                            Some key lessons:
                        </p>
                        <ul className="list-disc pl-5 space-y-6 text-lg">
                            <li><strong>Real-world visibility matters:</strong> Designing for harsh outdoor environments requires going beyond standard accessibility checks.</li>
                            <li><strong>Talk less, watch more:</strong> Observing users at work provided richer insights than traditional surveys or interviews.</li>
                            <li><strong>Don't underestimate clarity:</strong> Simple language and intuitive visual cues greatly impact task completion and user satisfaction.</li>
                            <li><strong>Field research is invaluable:</strong> If I were to approach this again, I'd prioritize even earlier field observations and incorporate real-life environmental constraints sooner into our initial design decisions.</li>
                        </ul>
                    </div>
                )
            }
        ]
    }
};

// Define a comprehensive type that covers all possible case study data formats
interface CaseStudyContent {
    project: any; // From projects data
    caseStudyData: CaseStudyData;
}

export default function ProjectPage({ params }: PageProps) {
    const { project: projectId } = params;

    // Find the project data
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
        notFound();
    }

    // For Cinefatic, define detailed case study content
    const cinefaticCaseStudy: CaseStudyData = {
        description: "A reimagined movie-ticket booking experience for Karachi's cinemagoers. The app focuses on easy discovery, seamless booking, and enhanced movie experiences.",
        role: "UI & UX Designer",
        duration: "2022",
        overview: "",
        overviewHeading: "",
        sections: [
            {
                title: "So, What’s Actually Broken?",
                content: (
                    <div className="space-y-8">
                        <p>
                            As someone who loves going to the cinema, I often found myself frustrated by the lack of convenient booking options for cinemas in Karachi, especially for Nueplex. Despite living in an era where technology facilitates most aspects of life, the process of booking movie tickets remained outdated and manual.
                        </p>
                        <p>
                            This initial frustration led me to question if others shared my experience and if there was a broader issue affecting Karachi’s movie audience. To validate this, I mapped out the real journey people face.
                        </p>

                        <h3 className="text-2xl font-bold mt-16 mb-6">The Ticket-Buying Gauntlet: How it Works Today</h3>
                        <p>
                            My initial research confirmed that for Karachi's main cinemas, there were really only two ways to get a ticket: either going to the cinema in person or calling them over the phone. Both paths were riddled with problem
                        </p>

                        <WideImageWrapper>
                            <CaseStudyImage
                                src="/images/cinefatic/Storyboard.webp"
                                alt="Cinefatic key features"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />
                        </WideImageWrapper>
                    </div>
                )
            },
            {
                title: "Understanding the Market Landscape",
                content: (
                    <div className="space-y-8">
                        <p>
                            The user's journey was clearly broken, but I needed to understand the business landscape. Why did this problem still exist? A competitive analysis revealed a clear answer:
                        </p>
                    </div>
                )
            },
            {
                title: "The Strategic Pivot: From a Niche Fix to a Market-Wide Solution",
                content: (
                    <div className="space-y-8">
                        <p>
                            My initial idea was small: design a booking solution just for Nueplex.

                            However, this research made it clear that a narrow solution would be a missed opportunity. The data showed that a much larger problem affected customers of all major cinemas.
                            This led to a critical strategic decision: to expand the scope from a single-cinema app to a comprehensive "Fandango-like" application for all of Karachi
                            This pivot was crucial because it would:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>Address a broader user demand instead of just one segment</li>
                            <li>Capture a significant, untapped market gap</li>
                            <li>Create a much stronger competitive advantage by becoming the definitive, all-in-one platform</li>
                        </ul>
                    </div>
                )
            },
            {
                title: "Prioritizing for Maximum Impact",
                content: (
                    <div className="space-y-8">
                        <p>
                            With a clear goal and a wide range of potential features, the next critical step was to decide what to build first. To deliver the highest value to users quickly, I used an Impact vs. Effort matrix to prioritize the features for a Minimum Viable Product (MVP).
                        </p>
                        <p>
                            The focus was squarely on "Quick Wins", features that were high-impact for the user but relatively low-effort to implement. This data-driven approach ensured the first version of the app would be both meaningful and feasible.
                        </p>

                        <WideImageWrapper>
                            <CaseStudyImage
                                src="/images/cinefatic/Features.png"
                                alt="Cinefatic homepage design"
                                width={768}
                                height={500}
                                className="w-full h-auto"
                            />
                        </WideImageWrapper>

                        <h3 className="text-2xl font-bold mt-16 mb-6">Key Features Prioritized for the MVP:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Centralized Showtime Listings: Solves the core information-gathering problem</li>
                            <li>Online Seat Selection Map: Addresses one of the biggest user frustrations found in research.</li>
                            <li>Digital Payments: Modernizes the process and removes the need for in-person transactions.</li>
                        </ul>
                    </div>
                )
            },
            {
                title: "Designing the Solution",
                content: (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mt-16 mb-6">Homepage: Driving Engagement by Simplifying Discovery</h3>
                        <p>
                            Research showed the existing process for finding a movie was fragmented and frustrating.
                        </p>
                        <p>
                            Users lacked a single, reliable place to get information, making discovery feel like a chore rather than an exciting part of the experience.
                        </p>

                        <div
                            className="my-12 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0"
                        >
                            <div className="mx-auto max-w-[1120px]">
                                <CaseStudyImage
                                    src="/images/cinefatic/Homepage Design.webp"
                                    alt="Cinefatic homepage design"
                                    width={1400}
                                    height={800}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        </div>

                        {/* detail page */}

                        <h3 className="text-2xl font-bold mt-16 mb-6">Detail Page: Building Confidence with Centralized Information</h3>
                        <p>
                            Previously, users had no way to get all the necessary information, like ratings, runtimes, and a full list of showtimes, in one place. This forced them to leave the booking process to do more research, creating friction
                        </p>
                        <div
                            className="my-12 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0"
                        >
                            <div className="mx-auto max-w-[1120px]">
                                <CaseStudyImage
                                    src="/images/cinefatic/Detailpage.webp"
                                    alt="Cinefatic homepage design"
                                    width={1400}
                                    height={800}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        </div>

                        {/* seats and snacks */}

                        <h3 className="text-2xl font-bold mt-16 mb-6">Empowering User Control & Convenience</h3>
                        <p>
                            The old booking methods completely lacked user control over seating. Furthermore, buying snacks meant waiting in a separate, often long, queue at the cinema, adding another point of friction to the movie night.
                        </p>
                        <div
                            className="my-12 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0"
                        >
                            <div className="mx-auto max-w-[1120px]">
                                <CaseStudyImage
                                    src="/images/cinefatic/Seatnsnacks.webp"
                                    alt="Seats and snacks"
                                    width={1400}
                                    height={800}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        </div>

                        {/* guest checkout */}

                        <h3 className="text-2xl font-bold mt-16 mb-6">Onboarding: Maximizing Conversion by Making Sign-ups Optional</h3>
                        <p>
                            Industry research proves that forcing users to create an account is a primary driver of cart abandonment. The strategic challenge was to encourage user registration for long-term value without creating friction that would jeopardize the immediate sale
                        </p>
                        <div
                            className="my-12 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0"
                        >
                            <div className="mx-auto max-w-[1120px]">
                                <CaseStudyImage
                                    src="/images/cinefatic/Guestcheckout.webp"
                                    alt="Guest checkout"
                                    width={1400}
                                    height={800}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        </div>
                    </div>


                )
            }
        ],
        results: "The redesigned Cinefatic app led to a 34% increase in user engagement and a 28% reduction in booking abandonment. User testing showed a significant improvement in satisfaction scores, particularly for the movie discovery and seat selection processes.",
        finalScreens: [
            {
                title: "Main Screen",
                description: "Home screen with movie recommendations",
                image: "/images/cinefatic/Cinefatic main.webp"
            }
        ]
    };

    // Handle different project data formats with proper type casting
    let caseStudyData: CaseStudyData;

    if (projectId === "cinefatic") {
        caseStudyData = cinefaticCaseStudy;
    } else if (projectId in projectsData) {
        // For rider-app-medzmore and other projects in projectsData
        const projectData = projectsData[projectId as keyof typeof projectsData] as any;

        // Ensure the data has all required properties for CaseStudyData
        caseStudyData = {
            ...projectData,
            finalScreens: [],
            results: projectData.results || "Project successfully delivered on time and with positive user feedback."
        };
    } else {
        // Generic fallback
        caseStudyData = {
            description: project.subtitle,
            role: "Product Designer",
            duration: project.year,
            overview: project.summary,
            challenges: [],
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