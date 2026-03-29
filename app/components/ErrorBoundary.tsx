'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error boundary caught an error:', error);
    }, [error]);

    return (
        <div className="p-[var(--card-padding)] text-center rounded-[var(--radius-card)] bg-white/5 border border-white/10 my-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-6">
                Sorry, an unexpected error has occurred. Our team has been notified.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-black text-white rounded-[var(--radius-button)] hover:bg-gray-800 transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="px-6 py-2 bg-white text-black border border-gray-200 rounded-[var(--radius-button)] hover:bg-gray-50 transition-colors"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
} 