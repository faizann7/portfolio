'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WorkCard from './WorkCard';
import { projects } from '../data/projects';

type StackedWorkCardsProps = {
  currentProjectId: string;
};

export default function StackedWorkCards({ currentProjectId }: StackedWorkCardsProps) {
  const displayProjects = useMemo(
    () => projects.filter((p) => p.id !== currentProjectId && !p.comingSoon),
    [currentProjectId]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  if (displayProjects.length === 0) {
    return (
      <div className="mt-10">
        <p className="opacity-80">No other case studies yet.</p>
      </div>
    );
  }

  return (
    <div className="pt-2" ref={containerRef}>
      {/* Heading placed outside sticky flow to avoid overlap */}
      <div className="mx-auto text-center mb-4 relative z-10" style={{ maxWidth: '768px' }}>
        <h2 className="text-3xl font-bold">- view other work</h2>
      </div>
      {/* Spacer so the first sticky card doesn't cover the heading */}
      <div className="h-12 md:h-16" />

      {/* Stacking, sticky cards inspired by Olivier Larose's pattern */}
      <div className="relative z-0">
        {displayProjects.map((p, i) => {
          const targetScale = 1 - (displayProjects.length - i) * 0.04;
          const start = i * (1 / displayProjects.length);
          const range: [number, number] = [start, 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);

          return (
            <div key={p.id} className="h-[60vh] flex items-center justify-center sticky top-32">
              <motion.div
                style={{ scale, top: `calc(-6vh + ${i * 24}px)` }}
                className="relative origin-top w-[min(900px,92vw)]"
              >
                {/* Wrap to control WorkCard width without altering its internals */}
                <div className="[&>*]:!h-auto">
                  <WorkCard
                    title={p.title}
                    subtitle={p.subtitle}
                    image={p.image}
                    link={`/work/${p.id}`}
                    tags={p.tags}
                    index={i}
                    color={p.color}
                    hoverColor={p.hoverColor}
                    comingSoon={p.comingSoon}
                    isProtected={p.isProtected}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


