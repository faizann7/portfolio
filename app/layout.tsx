import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";
import StructuredData from "./components/StructuredData";
import { SearchParamsProvider } from "./components/SearchParamsProvider";
import { getAssetPath, getImagePath } from "./utils/assets";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import MotionConfig from "./components/MotionConfig";
import NavigationProgress from "./components/NavigationProgress";
import FluidSimulation from "./components/fluid-simulation";

export const metadata: Metadata = {
  title: "Muhammad Faizan | UX/Product Designer",
  description: "Portfolio of Muhammad Faizan, a UX/Product designer specializing in early-stage startups and impactful digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfolio'),
  // GitHub Pages Specific: Hardcoded paths for icons to ensure they work in static export
  icons: {
    icon: `${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`,
    apple: `${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`,
    shortcut: `${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GitHub Pages Specific: Manually constructing font URLs with the correct base path
  // This is needed because GitHub Pages serves content from a subpath
  const bookFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfolio/fonts/CircularStd-Book.woff'
    : '/fonts/CircularStd-Book.woff';

  const mediumFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfolio/fonts/CircularStd-Medium.woff'
    : '/fonts/CircularStd-Medium.woff';

  const boldFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfolio/fonts/CircularStd-Bold.woff'
    : '/fonts/CircularStd-Bold.woff';

  const garamondFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfolio/fonts/EBGaramond-VariableFont_wght.woff2'
    : '/fonts/EBGaramond-VariableFont_wght.woff2';

  const garamondItalicFontUrl = process.env.NODE_ENV === 'production'
    ? '/portfolio/fonts/EBGaramond-Italic-VariableFont_wght.woff2'
    : '/fonts/EBGaramond-Italic-VariableFont_wght.woff2';

  return (
    <html lang="en" className="dark-theme">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfolio'} />

        {/* GitHub Pages Specific: Favicon paths with base path prefix for production */}
        <link
          rel="icon"
          href={`${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`}
          type="image/png"
        />
        <link
          rel="shortcut icon"
          href={`${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`}
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.NODE_ENV === 'production' ? '/portfolio/images/Tab Logo.png' : '/images/Tab Logo.png'}?v=2`}
        />

        {/* Font preloading with GitHub Pages-aware paths */}
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
        <link
          rel="preload"
          href={garamondFontUrl}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={garamondItalicFontUrl}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* GitHub Pages Specific: Inline script to fix font loading issues in production */}
        <Script id="font-loading-fix" strategy="beforeInteractive">
          {`
            // This script helps preload fonts with the correct paths in production
            (function() {
              const fontFiles = [
                'CircularStd-Book.woff', 
                'CircularStd-Medium.woff', 
                'CircularStd-Bold.woff',
                'EBGaramond-VariableFont_wght.woff2',
                'EBGaramond-Italic-VariableFont_wght.woff2'
              ];
              const prefix = window.location.hostname.includes('github.io') ? '/portfolio' : '';
              
              fontFiles.forEach(function(file) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = prefix + '/fonts/' + file;
                link.as = 'font';
                link.type = file.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              });
            })();
          `}
        </Script>

        {/* Hotjar Tracking Code */}
        <Script id="hotjar-tracking" strategy="lazyOnload">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5347755,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className="antialiased relative">
        <NavigationProgress />
        {/* GitHub Pages Specific: SearchParamsProvider needed because useSearchParams doesn't 
            work with static export on GitHub Pages */}
        <SearchParamsProvider>
          <GoogleAnalytics />
        </SearchParamsProvider>
        <StructuredData type="WebSite" />
        <StructuredData
          type="Person"
          data={{
            sameAs: [
              'https://www.linkedin.com/in/faizann/',
              'https://dribbble.com/faizan07',
              'mailto:mohammad.faizan6th@gmail.com'
            ]
          }}
        />
        <Navbar />
        <FluidSimulation />

        <div className="max-w-[1120px] mx-auto pt-16 relative z-10">
          <main className="px-4">

            <MotionConfig>
              <AnimatePresence mode="wait">
                <PageTransition>

                  {children}
                </PageTransition>
              </AnimatePresence>
            </MotionConfig>
          </main>
        </div>
      </body>
    </html>
  );
}
