import { Suspense } from 'react';
import Footer from "../components/Footer";
import { SearchParamsProvider } from "../components/SearchParamsProvider";

// Mark the page component as server-side rendered
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchResumeData() {
    // Fetch your resume data here
    // This is a placeholder - replace with your actual data fetching logic
    return {
        experience: [
            {
                company: "Retailo Technologies",
                role: "Product Designer",
                period: "Sep 2023 - Present",
                description: "Leading product design for B2B e-commerce solutions focused on sales & delivery."
            },
            {
                company: "AdPolice",
                role: "UI/UX Designer",
                period: "Mar 2024 - Jul 2024",
                description: "Contract role focused on digital product design and user experience optimization.",
                isContract: true
            },
            {
                company: "MEDZnMORE",
                role: "Associate Product Designer",
                period: "Nov 2022 - Jun 2023",
                description: "Designed digital healthcare solutions and improved user experiences for medical platforms."
            }
        ],
        education: [
            {
                institution: "NED University of Engineering & Technology",
                degree: "Bachelor's in Software Engineering",
                period: "2019 - 2023"
            }
        ],
        skills: [
            "UX Design",
            "UI Design",
            "Product Strategy",
            "User Research",
            "Prototyping",
            "Design Systems"
        ]
    };
}

async function ResumeContent() {
    const data = await fetchResumeData();

    return (
        <div className="pt-24 md:pt-32 pb-16 max-w-5xl mx-auto px-6">
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Resume</h1>
                <p className="text-xl text-gray-600">
                    Product Designer with a focus on creating impactful digital experiences
                </p>
            </div>

            {/* Experience Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, index) => (
                        <div key={index} className="group">
                            <h3 className="text-xl font-bold">{exp.company}</h3>
                            <div className="mt-1 space-y-1">
                                <div className="text-lg text-gray-600">
                                    {exp.role} {exp.isContract && <span className="text-sm font-normal text-gray-500">(Contract)</span>}
                                </div>
                                <div className="text-gray-500">{exp.period}</div>
                                <p className="mt-2 text-gray-700">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Education</h2>
                <div className="space-y-8">
                    {data.education.map((edu, index) => (
                        <div key={index} className="group">
                            <h3 className="text-xl font-bold">{edu.institution}</h3>
                            <div className="mt-1 space-y-1">
                                <div className="text-lg text-gray-600">{edu.degree}</div>
                                <div className="text-gray-500">{edu.period}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Skills</h2>
                <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default function Resume() {
    return (
        <Suspense fallback={<div>Loading resume...</div>}>
            <SearchParamsProvider>
                <ResumeContent />
            </SearchParamsProvider>
        </Suspense>
    );
} 