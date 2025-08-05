'use client';

import Link from "next/link";
import Image from "next/image";
import { projects } from "./data/projects";
import WorkCard from "./components/WorkCard";
import { Suspense, useState } from "react";
import { SearchParamsProvider } from "./components/SearchParamsProvider";
import ScribbleLink from "./components/ScribbleLink";
import Footer from "./components/Footer";
import FluidSimulation from "./components/fluid-simulation";
import Toast from "./components/Toast";
import TextReveal from "./components/TextReveal";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function HomeContent() {
  const [showToast, setShowToast] = useState(false);
  useSmoothScroll();

  const handleCopyEmail = async () => {
    const email = 'mohammad.faizan6th@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 md:pt-32">
      <div className="mb-40 md:mb-32 text-center px-4 md:px-8">
        <TextReveal delay={0.2}>
          <p className="text-lg md:text-2xl mb-4 md:mb-6">
            Hi, I'm Faizan <span className="inline-block animate-wave">👋🏻</span>
          </p>
        </TextReveal>

        <TextReveal delay={0.4}>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 hero-heading"
            style={{
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Building Real Impact Through Human-Centered Design
          </h1>
        </TextReveal>

        <TextReveal delay={0.6}>
          <p className="text-lg md:text-2xl mb-8">
            currently working as a product designer at <ScribbleLink href="https://www.linkedin.com/company/joinswapp/" isExternal={true}>Swapp car rental</ScribbleLink>
          </p>
        </TextReveal>
      </div>

      <div className="mb-16">
        <TextReveal delay={0.8}>
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-3xl font-bold" id="work">- case studies</h2>
          </div>
        </TextReveal>

        <div className="grid grid-cols-1 gap-6">
          {/* Row 1: 50% 50% - Cinefatic and Swapp */}
          <TextReveal delay={1.0}>
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
                  comingSoon={projects[1].comingSoon}
                />
              </div>
            </div>
          </TextReveal>

          {/* Row 2: 60% 40% - Route Helper and Rider App */}
          <TextReveal delay={1.2}>
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
                  comingSoon={projects[4].comingSoon}
                />
              </div>
            </div>
          </TextReveal>
        </div>
      </div>

      <Footer />
      <Toast
        message="Email copied to clipboard!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsProvider>
        <FluidSimulation />
        <HomeContent />
      </SearchParamsProvider>
    </Suspense>
  );
}