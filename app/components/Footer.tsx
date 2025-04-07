'use client';

import { useState } from 'react';
import ScribbleLink from "./ScribbleLink";

export default function Footer() {
    const [showToast, setShowToast] = useState(false);
    const email = 'mohammad.faizan6th@gmail.com';

    const copyEmailToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        });
    };

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center z-50">
                    <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
                        Email copied to clipboard!
                    </div>
                </div>
            )}

            {/* Let's Connect Section */}
            <div className="mb-20">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold">- Let's Connect</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                    <ScribbleLink href="https://www.linkedin.com/in/faizann/" isExternal={true}>LinkedIn</ScribbleLink>
                    <ScribbleLink href="https://dribbble.com/faizan07" isExternal={true}>Dribbble</ScribbleLink>
                    <ScribbleLink onClick={copyEmailToClipboard}>Email</ScribbleLink>
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