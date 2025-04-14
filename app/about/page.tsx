'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";
import ScribbleLink from "../components/ScribbleLink";
import { getImagePath } from "../utils/assets";
import Footer from "../components/Footer";

function AboutContent() {
    const skills = [
        {
            category: "Design",
            description: "Crafting intuitive and impactful user experiences",
            items: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"]
        },
        {
            category: "Tools",
            description: "Proficient in industry-standard design and prototyping tools",
            items: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"]
        },
        {
            category: "Development",
            description: "Hands-on experience with modern web technologies",
            items: ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
        }
    ];

    const experiences = [
        {
            company: "Swapp",
            role: "Product Designer",
            period: "Nov 2024 - Present",
            description: "Leading the design team in creating a seamless rental experience platform. Responsible for the end-to-end design process from research to implementation.",
            achievements: [
                "Led the redesign of the core rental flow, increasing conversion by 40%",
                "Established the company's first comprehensive design system",
                "Mentored 2 junior designers and established design team processes"
            ],
            technologies: ["Figma"]
        },
        {
            company: "Retailo Technologies",
            role: "Product Designer",
            period: "Sep 2023 - Present",
            description: "Designed digital solutions for B2B e-commerce platform focused on retail supply chain optimization. Created user-centered interfaces and workflows for both retailers and suppliers.",
            achievements: [
                "Redesigned the order management system used by 10,000+ retailers",
                "Reduced order processing time by 60% through UX improvements",
                "Created a design system used across 3 products"
            ],
            technologies: ["Figma", "Adobe XD", "React"]
        },
        {
            company: "AdPolice",
            role: "UI/UX Designer",
            period: "Mar 2024 - Jul 2024",
            description: "Designed intuitive interfaces for advertising compliance and brand safety tools. Conducted user research and usability testing to improve product experiences.",
            achievements: [
                "Improved dashboard usability score from 65 to 89",
                "Designed new analytics features used by major brands",
                "Led user research sessions with 50+ participants"
            ],
            technologies: ["Figma", "Sketch", "Principle"]
        },
        {
            company: "MEDZnMORE",
            role: "Associate Product Designer",
            period: "Nov 2022 - Jun 2023",
            description: "Created digital healthcare experiences for medication delivery and pharmacy management platforms. Developed design systems and user flows for multiple products.",
            achievements: [
                "Designed the pharmacy management system used by 200+ pharmacies",
                "Improved medication search and discovery experience",
                "Created accessibility guidelines for healthcare products"
            ],
            technologies: ["Figma", "Adobe XD", "Framer"]
        },
        {
            company: "Freelance",
            role: "UI/UX Designer",
            period: "Dec 2021 - Present",
            description: "Worked with various clients across industries on digital product design, branding, and web development projects.",
            achievements: [
                "Completed 20+ successful projects for clients worldwide",
                "Maintained 5-star rating on freelance platforms",
                "Specialized in SaaS and e-commerce projects"
            ],
            technologies: ["Figma", "Webflow", "WordPress"]
        }
    ];

    const education = [
        {
            institution: "Institute of Business Administration (IBA)",
            degree: "Bachelor of Science in Computer Science",
            period: "Aug 2018 - Jul 2022",
            achievements: [
                "Graduated with Distinction (3.8 GPA)",
                "Led the UI/UX Design Society",
                "Won Best Final Year Project Award for a healthcare AI interface"
            ],
            relevantCourses: [
                "Human-Computer Interaction",
                "User Interface Design",
                "Web Development",
                "Software Engineering"
            ]
        }
    ];

    return (
        <div className="pt-24 md:pt-16 pb-16 max-w-5xl mx-auto">
            {/* Profile Section with Polaroid Image */}
            <div className="mb-24 flex flex-col items-center">
                <div className="relative w-72 h-80 mb-12 bg-white rounded-md shadow-lg p-3 transform rotate-1">
                    <div className="relative w-full h-[85%] overflow-hidden mb-2">
                        <Image
                            src={getImagePath("/images/me.jpg")}
                            alt="Faizan's Profile Picture"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            className="transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="font-['Gloria_Hallelujah']  text-xl font-small">faizan</h1>
                    </div>
                </div>
                <p className="text-5xl font-medium max-w-3xl">
                    Hi, I'm Faizan, a UX/Product Designer
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16 max-w-3xl mx-auto mb-16">
                {/* How it started section */}
                <section>
                    <h2 className="font-['Gloria_Hallelujah'] text-xl text-purple-600 mb-6">how it started</h2>
                    <div className="text-xl space-y-8">
                        <p>
                            I've always had a knack for design and technology. While I discovered UX during COVID, it truly clicked when I studied Human-Computer Interaction and Psychology together. That semester shaped how I think about people, behavior, and digital experiences. Collaborating with friends on real-world problems made me realize how design could drive meaningful impact.
                        </p>
                        <p>
                            Since then, I've been deeply involved in UX Design, identifying user pain points, empathizing with real needs, and solving for both users and business goals. I'm especially drawn to projects where design thinking, research, and usability come together to shape impactful outcomes.
                        </p>
                    </div>
                </section>

                {/* What I'm currently doing section */}
                <section>
                    <h2 className="font-['Gloria_Hallelujah'] text-xl text-blue-600 mb-6">what I'm currently doing</h2>
                    <div className="text-xl space-y-8">
                        <p>
                            Right now, I'm leading product design efforts at Swapp (outsourced by Retailo Technologies), a car rental platform based in Dubai, UAE. I oversee all design efforts end-to-end, helping make car rentals seamless and accessible for both residents and tourists through intuitive, hassle-free booking experiences.
                        </p>
                        <p>
                            I'm part of the product team, where I wear multiple hats: conducting research, redesigning the checkout experience, optimizing filters, and ensuring accessibility compliance. Every design decision I make supports both user experience and measurable business goals. I also collaborate closely with developers to ensure our designs are polished, responsive, and production-ready.
                        </p>
                        <p>
                            With a background in Computer Science, I occasionally dabble in code too, mostly frontend, which helps bridge the gap between design and development. And with vibe coding on the rise, bringing your ideas to life has never been easier.
                        </p>
                        <p>
                            Outside of work, you'll find me gaming, watching movies and shows, or diving into new curiosities like astronomy, sports, or learning unexpected new skills just for the fun of it.
                        </p>
                        <p>
                            Some things I'm building:
                            <ul className="list-disc pl-6 mt-2">
                                <li>An AI-powered edtech platform — think ChatGPT with built-in quizzing and flashcards for long-term learning.</li>
                                <li>A voice-based expense tracker — just speak your daily expenses, and it logs everything automatically.</li>
                            </ul>
                        </p>
                        <p>
                            Let's connect if you want to collaborate, explore a new idea, or just nerd out about design.
                        </p>
                    </div>
                </section>
            </div>

            {/* Experience Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 mb-32 max-w-3xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold mb-12 relative">
                        <span className="relative z-10 font-['Gloria_Hallelujah']">Work Experience</span>
                        <span className="absolute bottom-0 left-0 h-3 w-48 bg-amber-100 -z-0 opacity-60"></span>
                    </h2>

                    <div className="space-y-12">
                        {/* Retailo + Swapp (Client Project) */}
                        <div className="group">
                            <h4 className="text-2xl font-bold">Retailo Technologies</h4>
                            <div className="mt-1 space-y-1">
                                <div className="text-xl text-gray-600">Product Designer</div>
                                <div className="text-gray-500">Sep 2023 - Present</div>
                            </div>

                            {/* Client Project - Swapp */}
                            <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
                                <h5 className="text-xl font-bold">Swapp</h5>
                                <div className="space-y-1">
                                    <div className="text-lg text-gray-600">Product Designer</div>
                                    <div className="text-gray-500">Nov 2024 - Present</div>
                                </div>
                            </div>
                        </div>

                        {/* AdPolice Contract */}
                        <div className="group">
                            <h4 className="text-2xl font-bold">AdPolice</h4>
                            <div className="mt-1 space-y-1">
                                <div className="text-xl text-gray-600">UI/UX Designer <span className="text-sm font-normal text-gray-500">(Contract)</span></div>
                                <div className="text-gray-500">Mar 2024 - Jul 2024</div>
                            </div>
                        </div>

                        {/* MEDZnMORE */}
                        <div className="group">
                            <h4 className="text-2xl font-bold">MEDZnMORE</h4>
                            <div className="mt-1 space-y-1">
                                <div className="text-xl text-gray-600">Associate Product Designer</div>
                                <div className="text-gray-500">Nov 2022 - Jun 2023</div>
                            </div>
                        </div>

                        {/* Freelance */}
                        <div className="group">
                            <h4 className="text-2xl font-bold">Freelance</h4>
                            <div className="mt-1 space-y-1">
                                <div className="text-xl text-gray-600">UI/UX Designer</div>
                                <div className="text-gray-500">Dec 2021 - Present</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-12 relative">
                        <span className="relative z-10 font-['Gloria_Hallelujah']">Education</span>
                        <span className="absolute bottom-0 left-0 h-3 w-32 bg-red-100 -z-0 opacity-60"></span>
                    </h2>

                    <div className="space-y-12">
                        {education.map((edu, index) => (
                            <div key={index} className="group">
                                <h4 className="text-2xl font-bold">{edu.institution}</h4>
                                <div className="mt-1 space-y-1">
                                    <div className="text-xl text-gray-600">{edu.degree}</div>
                                    <div className="text-gray-500">{edu.period}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function About() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsProvider>
                <AboutContent />
            </SearchParamsProvider>
        </Suspense>
    );
} 