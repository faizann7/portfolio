'use client';

import ScribbleLink from "./ScribbleLink";

export default function Footer() {
    return (
        <>
            {/* Let's Connect Section */}
            <div className="mb-20">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold">- Let's Connect</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                    <ScribbleLink href="https://www.linkedin.com/in/faizann/" isExternal={true}>LinkedIn</ScribbleLink>
                    <ScribbleLink href="https://dribbble.com/faizan07" isExternal={true}>Dribbble</ScribbleLink>
                    <ScribbleLink href="mailto:mohammad.faizan6th@gmail.com" isExternal={true}>Email</ScribbleLink>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 border-t border-gray-200 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600">© {new Date().getFullYear()} Muhammad Faizan</p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">iteration # i lost count honestly</p>
                </div>
            </footer>
        </>
    );
} 