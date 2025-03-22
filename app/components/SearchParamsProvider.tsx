'use client';

import { useSearchParams as useNextSearchParams } from 'next/navigation';
import { createContext, useContext, ReactNode, Suspense } from 'react';

// Create a context to hold the search params
const SearchParamsContext = createContext<URLSearchParams | null>(null);

// Create the actual provider component that uses useSearchParams
function SearchParamsProviderInner({ children }: { children: ReactNode }) {
    const searchParams = useNextSearchParams();
    return (
        <SearchParamsContext.Provider value={searchParams}>
            {children}
        </SearchParamsContext.Provider>
    );
}

// Wrapper component that includes the Suspense boundary
export function SearchParamsProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsProviderInner>{children}</SearchParamsProviderInner>
        </Suspense>
    );
}

// Custom hook to use the search params safely
export function useSearchParams() {
    const context = useContext(SearchParamsContext);
    if (context === null) {
        throw new Error('useSearchParams must be used within a SearchParamsProvider');
    }
    return context;
} 