'use client';

import Link from "next/link";
import Image from "next/image";
import { projects } from "./data/projects";
import WorkCard from "./components/WorkCard";
import { Suspense } from "react";
import { SearchParamsProvider } from "./components/SearchParamsProvider";
import ScribbleLink from "./components/ScribbleLink";

function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col pt-24 md:pt-32">
      <div className="mb-16 md:mb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Hi, I'm Faizan
        </h1>
        <p className="text-xl md:text-2xl">
          UX/Product designer at <ScribbleLink href="https://www.linkedin.com/company/joinswapp/" isExternal={true}>Swapp, UAE</ScribbleLink>. I love working with early-stage teams, blending UX, UI, and business strategy to launch impactful features.
        </p>
      </div>

      <div className="mb-16">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold" id="work">- Work</h2>
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
                hoverColor="#CAC2FF"
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
                hoverColor="#FFD6D6"
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
                hoverColor="#F7E8CA"
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
                hoverColor="#B8E8FF"
                comingSoon={projects[4].comingSoon}
              />
            </div>
          </div>
        </div>
      </div>



      {/* Let's Connect Section */}
      <div className="mb-20">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold">- Let's Connect</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
          <ScribbleLink href="https://www.linkedin.com/in/faizann/" isExternal={true}>LinkedIn</ScribbleLink>
          <ScribbleLink href="https://dribbble.com/faizan07" isExternal={true}>Dribbble</ScribbleLink>
          <ScribbleLink href="mailto:mohammad.faizan6th@gmail.com" isExternal={true}>Email</ScribbleLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Muhammad Faizan</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">iteration # i lost count honestly</p>
        </div>
      </footer>
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