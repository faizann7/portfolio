import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";
import StructuredData from "./components/StructuredData";
import { SearchParamsProvider } from "./components/SearchParamsProvider";

export const metadata: Metadata = {
  title: "Faizan | UX/Product Designer",
  description: "Portfolio of Faizan, a UX/Product designer specializing in early-stage startups and impactful digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfoliooo'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://faizann7.github.io/portfoliooo'} />
        <link
          rel="preload"
          href="/fonts/CircularStd-Book.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CircularStd-Medium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CircularStd-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
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
