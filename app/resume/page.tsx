'use client';

import Link from "next/link";
import { Suspense } from "react";
import { SearchParamsProvider } from "../components/SearchParamsProvider";

function ResumeContent() {
    return (
        <div className="pt-24 md:pt-32 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">Resume</h1>
                <Link
                    href="/resume.pdf"
                    target="_blank"
                    className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                </Link>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12">
                {/* Contact Information */}
                <div className="flex flex-col md:flex-row justify-between mb-12 border-b border-gray-100 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Faizan</h2>
                        <h3 className="text-xl mb-4">UX/Product Designer</h3>
                    </div>
                    <div className="space-y-1 mt-4 md:mt-0 text-right">
                        <p>hello@faizandesign.com</p>
                        <p>San Francisco, CA</p>
                        <p>linkedin.com/in/faizan</p>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-12">
                    <h3 className="text-lg font-bold mb-4 uppercase text-gray-500">Profile</h3>
                    <p className="text-lg">
                        Product designer with 5+ years of experience creating intuitive digital experiences.
                        Specialized in early-stage product development, user research, and building design systems.
                        Passionate about solving complex problems with simple, elegant solutions.
                    </p>
                </div>

                {/* Work Experience */}
                <div className="mb-12">
                    <h3 className="text-lg font-bold mb-6 uppercase text-gray-500">Experience</h3>

                    <div className="space-y-10">
                        {/* Experience 1 */}
                        <div>
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                                <h4 className="text-xl font-bold">Lead UX/Product Designer</h4>
                                <p className="text-gray-600">2022 - Present</p>
                            </div>
                            <p className="text-gray-700 font-medium mb-3">Swapp</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Led the end-to-end redesign of the rental platform, resulting in a 45% increase in user engagement</li>
                                <li>Established and maintained the company's design system, improving design consistency and development efficiency</li>
                                <li>Conducted user research and usability testing to identify pain points and validate design decisions</li>
                                <li>Collaborated with cross-functional teams to define product strategy and roadmap</li>
                            </ul>
                        </div>

                        {/* Experience 2 */}
                        <div>
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                                <h4 className="text-xl font-bold">UI/UX Designer</h4>
                                <p className="text-gray-600">2020 - 2022</p>
                            </div>
                            <p className="text-gray-700 font-medium mb-3">Fintech Startup</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Designed intuitive interfaces for visualizing complex financial data</li>
                                <li>Created prototypes and conducted user testing to optimize the user experience</li>
                                <li>Implemented design thinking methodologies to solve user problems</li>
                                <li>Collaborated with developers to ensure design fidelity during implementation</li>
                            </ul>
                        </div>

                        {/* Experience 3 */}
                        <div>
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                                <h4 className="text-xl font-bold">Junior Designer</h4>
                                <p className="text-gray-600">2018 - 2020</p>
                            </div>
                            <p className="text-gray-700 font-medium mb-3">Design Agency</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Collaborated on various client projects across different industries</li>
                                <li>Developed wireframes, mockups, and prototypes for web and mobile applications</li>
                                <li>Assisted with user research and competitive analysis</li>
                                <li>Participated in client presentations and design critiques</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="mb-12">
                    <h3 className="text-lg font-bold mb-6 uppercase text-gray-500">Education</h3>

                    <div>
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h4 className="text-xl font-bold">Bachelor of Design, User Experience</h4>
                            <p className="text-gray-600">2014 - 2018</p>
                        </div>
                        <p className="text-gray-700">California Institute of Design</p>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h3 className="text-lg font-bold mb-6 uppercase text-gray-500">Skills</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold mb-3">Design</h4>
                            <ul className="space-y-1">
                                <li>UI Design</li>
                                <li>UX Research</li>
                                <li>Wireframing</li>
                                <li>Prototyping</li>
                                <li>Design Systems</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">Tools</h4>
                            <ul className="space-y-1">
                                <li>Figma</li>
                                <li>Adobe XD</li>
                                <li>Sketch</li>
                                <li>Photoshop</li>
                                <li>Illustrator</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">Development</h4>
                            <ul className="space-y-1">
                                <li>HTML/CSS</li>
                                <li>JavaScript</li>
                                <li>React</li>
                                <li>Next.js</li>
                                <li>Tailwind CSS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className="text-lg">Want to discuss a project?</p>
                <Link href="/contact" className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Get in touch
                </Link>
            </div>
        </div>
    );
}

export default function Resume() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsProvider>
                <ResumeContent />
            </SearchParamsProvider>
        </Suspense>
    );
} 