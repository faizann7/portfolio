'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { SearchParamsProvider } from './components/SearchParamsProvider';

function NotFoundContent() {
    return (
        <div className="pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Page Not Found</h2>
            <p className="text-xl max-w-md mb-12">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default function NotFound() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsProvider>
                <NotFoundContent />
            </SearchParamsProvider>
        </Suspense>
    );
} 