'use client';

import Link from "next/link";
import { Suspense } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";

function AboutContent() {
    const skills = [
        { category: "Design", items: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"] },
        { category: "Tools", items: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"] },
        { category: "Development", items: ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] }
    ];

    const experiences = [
        {
            company: "Swapp",
            role: "Lead UX/Product Designer",
            period: "2022 - Present",
            description: "Leading the design team in creating a seamless rental experience platform. Responsible for the end-to-end design process from research to implementation."
        },
        {
            company: "Fintech Startup",
            role: "UI/UX Designer",
            period: "2020 - 2022",
            description: "Designed intuitive interfaces for complex financial data visualization. Conducted user research and testing to optimize the user experience."
        },
        {
            company: "Design Agency",
            role: "Junior Designer",
            period: "2018 - 2020",
            description: "Worked on various client projects across different industries. Developed skills in rapid prototyping and collaborative design."
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16">
            <div className="mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="md:col-span-1">
                    <div className="w-full aspect-square bg-gray-100 rounded-lg mb-6">
                        {/* Replace with actual profile image */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span>Profile Image</span>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <p className="text-xl mb-6">
                        I'm a UX/Product designer with a passion for creating intuitive and impactful digital experiences. With over 5 years of experience in the field, I specialize in translating complex problems into simple, elegant solutions.
                    </p>
                    <p className="text-xl mb-6">
                        My approach combines strong user research with creative problem-solving. I believe that great design should be invisible, allowing users to accomplish their goals without friction or confusion.
                    </p>
                    <p className="text-xl">
                        When I'm not designing, you can find me exploring hiking trails, experimenting with new cooking recipes, or attending local tech meetups to stay connected with the design community.
                    </p>
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-bold mb-8">Experience</h2>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-8 relative">
                            <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-gray-200"></div>
                            <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>
                            <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-3">
                                <span className="font-medium">{exp.role}</span>
                                <span className="hidden md:block mx-2">•</span>
                                <span>{exp.period}</span>
                            </div>
                            <p className="text-lg">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-bold mb-8">Skills & Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skills.map((skillGroup, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">{skillGroup.category}</h3>
                            <ul className="space-y-2">
                                {skillGroup.items.map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="mr-2 text-gray-400">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 pt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <Link href="/resume" className="text-lg hover:text-gray-600 mb-4 md:mb-0 transition-colors">
                        View my resume
                    </Link>
                    <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Get in touch
                    </Link>
                </div>
            </div>
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