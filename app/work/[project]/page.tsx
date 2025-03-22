import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import ProjectClient from "./ProjectClient";
import { getImagePath } from "../../utils/assets";

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
                            <Image
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
                            <Image
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
                            <Image
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
                            <Image
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
        role: "Lead Product Designer",
        duration: "6 months, 2023",
        overview: "Cinefatic is a movie ticket booking app designed to solve a long-standing frustration faced by people in Karachi—lack of an easy way to book tickets online for cinemas like Nueplex.\n\nThis case study explores the research, validation, and problem discovery processes that led to the creation of a seamless and user-friendly solution, aimed at modernizing how people in Karachi book movie tickets",
        sections: [
            {
                title: "Discovery",
                content: (
                    <div className="space-y-8">
                        <p>
                            As someone who loves going to the cinema, I often found myself frustrated by the lack of convenient booking options for cinemas in Karachi, especially for Nueplex. Despite living in an era where technology facilitates most aspects of life, the process of booking movie tickets remained outdated and manual.
                        </p>
                        <p>
                            This initial frustration led me to question if others shared my experience and if there was a broader issue affecting Karachi's movie audience.
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-6">Current Methods of Booking Tickets at Nueplex</h3>

                        <p>
                            Upon visiting the Nueplex website, I found that while showtimes were available, there was no option to book tickets online. The existing methods for booking tickets involved either going to the cinema in person or calling them over the phone—both time-consuming and inconvenient processes.
                        </p>

                        <div className="w-full my-12 rounded-md overflow-hidden">
                            <Image
                                src="/images/cinefatic/Current Method.png"
                                alt="Current movie booking method in Karachi"
                                width={768}
                                height={500}
                                className="w-full h-auto"
                            />
                        </div>
                        <p>
                            My research revealed a significant pain point: Karachi's cinemagoers needed a dedicated solution for discovering movies and booking tickets online. The existing methods were cumbersome, often requiring users to navigate through multiple websites or make phone calls.
                        </p>
                    </div>
                )
            },
            {
                title: "Research",
                content: (
                    <div className="space-y-8">
                        <p>
                            To validate my assumptions and gain deeper insights, I conducted comprehensive research into the movie-going experience in Karachi.
                        </p>

                        <h3 className="text-2xl font-bold mt-16 mb-6">Validating the Assumption</h3>
                        <p>
                            To confirm my hypothesis that others were equally frustrated, I conducted initial research by speaking with friends, family, and acquaintances. Their feedback echoed my frustration, reaffirming that the existing methods were indeed inconvenient and outdated. Encouraged by this preliminary validation, I decided to broaden my research scope to gather more structured insights.
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-6">User Research</h3>
                        <p>
                            To gather comprehensive data, I conducted surveys and interviews with a diverse group of people, including students, working professionals, and families. I aimed to understand their pain points, preferences, and behaviors regarding movie ticket booking.
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-6">Key Findings</h3>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>Inconvenience: Users found it cumbersome to travel to the cinema just to book tickets.</li>
                            <li>Inefficiency: Phone booking was unreliable, with long wait times and inconsistent reservations.</li>
                            <li>Lack of Information: Users wanted more clarity on seat availability and pricing but had to rely on limited or outdated information.</li>
                            <li>Preference for Mobile: Most users preferred a mobile-friendly solution that allowed easy booking on the go.</li>
                            <li>Desire for Transparency: Users expressed frustration with the lack of clear, real-time updates during the booking process.</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-12 mb-6">Market Research</h3>
                        <p>
                            I extended my research to analyze existing movie booking platforms and related services within Karachi. Key findings included:
                        </p>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>Limited Options: Very few platforms support online movie ticket booking.</li>
                            <li>Centralized Booking Apps: Websites like Bookme.pk and Bookmyshow.pk exist, but they do not cater to Nueplex or Atrium Cinemas.</li>
                            <li>Competitive Analysis: Apps like Fandango in other markets provide a more complete solution, integrating showtimes, seat selection, and secure payments—something currently missing in Karachi.</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-12 mb-6">Decision to Expand Scope</h3>
                        <p>
                            Initially, my focus was on designing a solution specifically for Nueplex. However, after conducting thorough research and identifying significant market gaps, I decided to expand the scope to create a Fandango-like application for all cinemas in Karachi. This decision was driven by several factors:
                        </p>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>User Demand: Research indicated that users were frustrated with the booking processes of multiple cinemas, not just Nueplex. Expanding the scope would address a broader audience and solve a larger problem.</li>
                            <li>Market Gap: Analysis showed that there were no existing apps in Karachi that provided a comprehensive movie ticket booking service for all major cinemas.</li>
                            <li>Competitive Advantage: Creating an all-inclusive app would position the product as a one-stop solution for movie enthusiasts in Karachi, similar to how Fandango operates in other markets.</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-12 mb-6">Problem Statement</h3>
                        <p className="bg-gray-50 border-l-4 border-gray-300 p-4 italic leading-relaxed">
                            "People in Karachi face multiple obstacles when trying to book movie tickets for cinemas like Nueplex. The current methods of calling the cinema or visiting in person are time-consuming and inconvenient in a world where users expect seamless online experiences. There is a gap in the market for an app that simplifies the booking process by providing real-time seat selection, integrated payment options, and mobile accessibility for all major cinemas in Karachi."
                        </p>
                    </div>
                )
            },
            {
                title: "Ideations & Design",
                content: (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold mt-10 mb-4">Feature Prioritization</h3>
                        <p>
                            Based on the identified pain points, features were prioritized to deliver the highest value to users while balancing implementation effort. Using an effort vs. impact matrix, the focus was on solutions that addressed the core booking issues in Karachi's movie ticketing experience.
                        </p>

                        <p>
                            To address these pain points, I designed Cinefatic as a comprehensive movie discovery and booking application tailored specifically for the Karachi market. The core features of the app include:
                        </p>
                        <div className="w-full my-12 rounded-md overflow-hidden">
                            <CaseStudyImage
                                src="/images/cinefatic/Features.png"
                                alt="Cinefatic key features"
                                width={768}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                        <p>
                            The solution focuses on providing a seamless experience from discovery to booking, with particular attention to the unique needs of the local market, including preferred payment methods and theater-specific booking flows.
                        </p>
                    </div>
                )
            },
            {
                title: "Visual Design",
                content: (
                    <div className="space-y-8">
                        <p>
                            The homepage serves as the primary entry point and the goal was to create an intuitive and engaging experience that simplifies movie discovery while offering personalized content based on the user's location.
                        </p>
                        <p>
                            Designing the homepage started with solving a simple problem: helping users find cinemas near them effortlessly. The location selector at the top became the key feature, ensuring users could personalize their experience instantly.
                        </p>
                        <p>
                            I also wanted the homepage to feel exciting—something that draws people in. That's why I added a hero section, a big, bold space to highlight featured movies. It lets users watch trailers, save movies to their Wishlist, or dive deeper with just a tap.
                        </p>

                        <p>
                            The final design features a clean, cinema-inspired dark interface that puts content forward while creating an immersive feel. I used vibrant accent colors to highlight key actions and create visual interest.
                        </p>
                        <div className="w-full my-12 rounded-md overflow-hidden">
                            <CaseStudyImage
                                src="/images/cinefatic/image homepage.png"
                                alt="Cinefatic homepage design"
                                width={768}
                                height={500}
                                className="w-full h-auto"
                            />
                        </div>
                        <p>
                            The app's primary screens include:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Home with personalized movie recommendations</li>
                            <li>Movie details with comprehensive information</li>
                            <li>Theater selection with location-based filtering</li>
                            <li>Seat selection with intuitive visual interface</li>
                            <li>Checkout with multiple payment options</li>
                        </ul>
                    </div>
                )
            }
        ],
        results: "The redesigned Cinefatic app led to a 34% increase in user engagement and a 28% reduction in booking abandonment. User testing showed a significant improvement in satisfaction scores, particularly for the movie discovery and seat selection processes.",
        finalScreens: [
            {
                title: "Main Screen",
                description: "Home screen with movie recommendations",
                image: "/images/cinefatic/Cinefatic Main.png"
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

    return <ProjectClient project={project} caseStudyData={caseStudyData} projectId={projectId} />;
} 