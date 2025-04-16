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
                    <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
                        Email copied to clipboard!
                    </div>
                </div>
            )}

            {/* Let's Connect Section */}
            <div className="mb-20">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold">- let's Connect</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                    <ScribbleLink href="https://www.linkedin.com/in/faizann/" isExternal={true}>LinkedIn</ScribbleLink>
                    <ScribbleLink href="https://dribbble.com/faizan07" isExternal={true}>Dribbble</ScribbleLink>
                    <ScribbleLink onClick={copyEmailToClipboard}>Email</ScribbleLink>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 mt-auto"
                style={{
                    borderTopWidth: '1px',
                    borderTopColor: 'var(--border-color)',
                    transition: 'var(--theme-transition)'
                }}>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>© {new Date().getFullYear()} Muhammad Faizan</p>
                    <p style={{ color: 'var(--foreground)', opacity: 0.6 }} className="text-sm mt-2 md:mt-0">iteration # i lost count honestly</p>
                </div>
            </footer>
        </>
    );
} 