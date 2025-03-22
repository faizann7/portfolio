'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from './SearchParamsProvider';

// Type declaration for Google Analytics
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer: Record<string, any>[];
    }
}

const GA_MEASUREMENT_ID = 'G-3W2DB243NV';

function GoogleAnalyticsInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: pathname,
            });
        }
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}

export default function GoogleAnalytics() {
    return (
        <Suspense fallback={null}>
            <GoogleAnalyticsInner />
        </Suspense>
    );
} 