import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Faizan | UX/Product Designer",
  description: "Portfolio of Faizan, a UX/Product designer specializing in early-stage startups and impactful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
