'use client';

import Link from "next/link";
import Image from "next/image";
import { projects } from "./data/projects";
import WorkCard from "./components/WorkCard";
import { Suspense } from "react";
import { SearchParamsProvider } from "./components/SearchParamsProvider";
import ScribbleLink from "./components/ScribbleLink";
import Footer from "./components/Footer";

function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col pt-24 md:pt-32">
      <div className="mb-12 md:mb-24 text-center px-4 md:px-8">
        <p className="text-lg md:text-2xl mb-4 md:mb-6">
          Hi, I'm Faizan <span className="inline-block animate-wave">👋</span>
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}
        >
          Building Real Impact Through Human-Centered Design
        </h1>
        <p className="text-lg md:text-2xl">
          currently working as a product designer at <ScribbleLink href="https://www.linkedin.com/company/joinswapp/" isExternal={true}>Swapp</ScribbleLink>
        </p>
      </div>


      <div className="mb-16">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold" id="work">- case studies</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Row 1: 50% 50% - Cinefatic and Swapp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <WorkCard
                title={projects[0].title}
                subtitle={projects[0].subtitle}
                image={projects[0].image}
                link={`/work/${projects[0].id}`}
                tags={projects[0].tags}
                index={0}
                color={projects[0].color}
                hoverColor={projects[0].hoverColor}
                darkColor={projects[0].darkColor}
                darkHoverColor={projects[0].darkHoverColor}
                comingSoon={projects[0].comingSoon}
              />
            </div>
            <div className="md:col-span-1">
              <WorkCard
                title={projects[1].title}
                subtitle={projects[1].subtitle}
                image={projects[1].image}
                link={`/work/${projects[1].id}`}
                tags={projects[1].tags}
                index={1}
                color={projects[1].color}
                hoverColor={projects[1].hoverColor}
                darkColor={projects[1].darkColor}
                darkHoverColor={projects[1].darkHoverColor}
                comingSoon={projects[1].comingSoon}
              />
            </div>
          </div>

          {/* Row 2: 60% 40% - Route Helper and Rider App */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <WorkCard
                title={projects[2].title}
                subtitle={projects[2].subtitle}
                image={projects[2].image}
                link={`/work/${projects[2].id}`}
                tags={projects[2].tags}
                index={2}
                color={projects[2].color}
                hoverColor={projects[2].hoverColor}
                darkColor={projects[2].darkColor}
                darkHoverColor={projects[2].darkHoverColor}
                comingSoon={projects[2].comingSoon}
              />
            </div>
            <div className="md:col-span-2">
              <WorkCard
                title={projects[4].title}
                subtitle={projects[4].subtitle}
                image={projects[4].image}
                link={`/work/${projects[4].id}`}
                tags={projects[4].tags}
                index={3}
                color={projects[4].color}
                hoverColor={projects[4].hoverColor}
                darkColor={projects[4].darkColor}
                darkHoverColor={projects[4].darkHoverColor}
                comingSoon={projects[4].comingSoon}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsProvider>
        <HomeContent />
      </SearchParamsProvider>
    </Suspense>
  );
}