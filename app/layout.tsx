import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";
import StructuredData from "./components/StructuredData";
import { SearchParamsProvider } from "./components/SearchParamsProvider";
import { getAssetPath } from "./utils/assets";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Faizan | UX/Product Designer",
  description: "Portfolio of Faizan, a UX/Product designer specializing in early-stage startups and impactful digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfoliooo'),
  icons: {
    icon: process.env.NODE_ENV === 'production' ? '/portfoliooo/images/Tab Logo.png' : '/images/Tab Logo.png',
    apple: process.env.NODE_ENV === 'production' ? '/portfoliooo/images/Tab Logo.png' : '/images/Tab Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We need to do this to avoid build-time/server-side rendering issues
  const bookFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfoliooo/fonts/CircularStd-Book.woff'
    : '/fonts/CircularStd-Book.woff';

  const mediumFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfoliooo/fonts/CircularStd-Medium.woff'
    : '/fonts/CircularStd-Medium.woff';

  const boldFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfoliooo/fonts/CircularStd-Bold.woff'
    : '/fonts/CircularStd-Bold.woff';

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfoliooo'} />

        {/* Favicon */}
        <link
          rel="icon"
          href={process.env.NODE_ENV === 'production' ? '/portfoliooo/images/Tab Logo.png' : '/images/Tab Logo.png'}
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href={process.env.NODE_ENV === 'production' ? '/portfoliooo/images/Tab Logo.png' : '/images/Tab Logo.png'}
        />

        {/* Font preloading */}
        <link
          rel="preload"
          href={bookFontUrl}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={mediumFontUrl}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={boldFontUrl}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />

        {/* Inline script to fix font loading issues in production */}
        <Script id="font-loading-fix" strategy="beforeInteractive">
          {`
            // This script helps preload fonts with the correct paths in production
            (function() {
              const fontFiles = ['CircularStd-Book.woff', 'CircularStd-Medium.woff', 'CircularStd-Bold.woff'];
              const prefix = window.location.hostname.includes('github.io') ? '/portfoliooo' : '';
              
              fontFiles.forEach(function(file) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = prefix + '/fonts/' + file;
                link.as = 'font';
                link.type = 'font/woff';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              });
            })();
          `}
        </Script>
      </head>
      <body className="antialiased">
        <SearchParamsProvider>
          <GoogleAnalytics />
        </SearchParamsProvider>
        <StructuredData type="WebSite" />
        <StructuredData
          type="Person"
          data={{
            sameAs: [
              'https://www.linkedin.com/in/faizanalam/',
              'https://github.com/faizaanalam',
              'https://dribbble.com/faizanalam'
            ]
          }}
        />
        <Navbar />
        <div className="max-w-[1120px] mx-auto pt-16">
          <main className="px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
