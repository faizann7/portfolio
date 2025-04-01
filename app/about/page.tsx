'use client';

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";
import ScribbleLink from "../components/ScribbleLink";
import { getImagePath } from "../utils/assets";

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
            period: "Nov 2024 - Present",
            description: "Leading the design team in creating a seamless rental experience platform. Responsible for the end-to-end design process from research to implementation."
        },
        {
            company: "Retailo Technologies",
            role: "Product Designer",
            period: "Sep 2023 - Oct 2024",
            description: "Designed digital solutions for B2B e-commerce platform focused on retail supply chain optimization. Created user-centered interfaces and workflows for both retailers and suppliers."
        },
        {
            company: "AdPolice",
            role: "UI/UX Designer",
            period: "Mar 2024 - Jul 2024",
            description: "Designed intuitive interfaces for advertising compliance and brand safety tools. Conducted user research and usability testing to improve product experiences."
        },
        {
            company: "MEDZnMORE",
            role: "UI/UX Designer",
            period: "Nov 2022 - Jun 2023",
            description: "Created digital healthcare experiences for medication delivery and pharmacy management platforms. Developed design systems and user flows for multiple products."
        },
        {
            company: "Freelance",
            role: "UI/UX Designer",
            period: "Dec 2021 - Present",
            description: "Worked with various clients across industries on digital product design, branding, and web development projects."
        }
    ];

    const education = [
        {
            institution: "Institute of Business Administration (IBA)",
            degree: "Bachelor of Science in Computer Science",
            period: "Aug 2018 - Jul 2022"
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-16">
            <div className="mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="md:col-span-1">
                    <div className="w-full aspect-square rounded-lg mb-6 overflow-hidden relative">
                        <Image
                            src={getImagePath("/images/me.jpg")}
                            alt="Muhammad Faizan's Profile Picture"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <p className="text-xl mb-6">
                        Hey, I'm Muhammad Faizan! I'm a Product Designer with a passion for creating intuitive and impactful digital experiences. With a background in Computer Science from IBA, I combine technical understanding with creative problem-solving to design elegant solutions.
                    </p>
                    <p className="text-xl mb-6">
                        Currently, I'm leading design at Swapp, where we're creating a seamless rental experience platform. I specialize in translating complex problems into simple, user-centered interfaces and experiences.
                    </p>
                    <p className="text-xl">
                        When I'm not designing, you can find me playing football, gaming, watching Netflix, or working on side projects. I'm always open to discussing new opportunities for both full-time roles and freelance projects.
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
                <h2 className="text-3xl font-bold mb-8">Education</h2>
                <div className="space-y-12">
                    {education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-8 relative">
                            <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-gray-200"></div>
                            <h3 className="text-2xl font-bold mb-1">{edu.institution}</h3>
                            <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-3">
                                <span className="font-medium">{edu.degree}</span>
                                <span className="hidden md:block mx-2">•</span>
                                <span>{edu.period}</span>
                            </div>
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
                    <ScribbleLink
                        href="https://drive.google.com/file/d/1gyosN_XzZuGf0G3ZLqy0W_ppAdtLa3Au/view"
                        isExternal={true}
                        className="text-lg mb-4 md:mb-0"
                    >
                        View my resume
                    </ScribbleLink>
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