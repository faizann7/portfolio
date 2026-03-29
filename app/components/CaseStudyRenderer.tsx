'use client';

import Image from "next/image";
import { getImagePath } from "../utils/assets";
import * as LucideIcons from "lucide-react";
import ConsequencesGrid from "./visuals/ConsequencesGrid";
import MentalModelShift from "./visuals/MentalModelShift";
import ImpactMetrics from "./visuals/ImpactMetrics";
import { slugify } from "../utils/slugify";
import { TYPOGRAPHY } from "../data/typography-config";
import { useLightbox } from "./ui/LightboxContext";
import { useEffect, useMemo } from "react";

interface CaseStudyContent {
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'feature_grid' | 'consequences_grid' | 'mental_model_shift' | 'impact_metrics';
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  items?: string[] | { title: string; text: string; icon?: string }[];
}

interface CaseStudySection {
  title: string;
  content: CaseStudyContent[];
}

interface CaseStudyRendererProps {
  sections: CaseStudySection[];
}

// Helper to get Lucide icon
const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : null;
};

// Component for rendering individual content blocks
const ContentBlock = ({ content, onImageClick }: { content: CaseStudyContent, onImageClick: (src: string) => void }) => {
  switch (content.type) {
    case 'paragraph':
      return (
        <p className={TYPOGRAPHY.paragraph.classes}>
          {content.text}
        </p>
      );

    case 'heading':
      const level = content.level || 3;
      const HeadingTag = `h${level}` as any;
      const headingConfig = (TYPOGRAPHY.headings as any)[`h${level}`] || TYPOGRAPHY.headings.h3;

      return (
        <HeadingTag className={`${headingConfig.classes} text-left`}>
          {content.text}
        </HeadingTag>
      );

    case 'image':
      if (!content.src) return null;

      const processedSrc = getImagePath(content.src);

      if (content.fullWidth) {
        // Full width image (viewport width)
        return (
          <div className="my-16 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0">
            <div className="mx-auto max-w-[1120px]">
              <Image
                src={processedSrc}
                alt={content.alt || ''}
                width={content.width || 1400}
                height={content.height || 800}
                className="w-full h-auto rounded-[var(--radius-card-inner)] cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1120px"
                onClick={() => onImageClick(processedSrc)}
              />
            </div>
          </div>
        );
      } else {
        // Container width image (768px max)
        return (
          <div className="my-16">
            <Image
              src={processedSrc}
              alt={content.alt || ''}
              width={content.width || 768}
              height={content.height || 500}
              className="w-full h-auto rounded-[var(--radius-card-inner)] cursor-pointer hover:opacity-90 transition-opacity"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 768px"
              onClick={() => onImageClick(processedSrc)}
            />
          </div>
        );
      }

    case 'list':
      if (!content.items || !Array.isArray(content.items)) return null;
      return (
        <ul className={TYPOGRAPHY.list.container}>
          {content.items.map((item, index) => {
            const text = typeof item === 'string' ? item : '';
            if (!text) return null;
            return (
              <li key={index} className={TYPOGRAPHY.list.item.classes}>
                {text}
              </li>
            );
          })}
        </ul>
      );

    case 'feature_grid':
      if (!content.items || !Array.isArray(content.items)) return null;

      const gridContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, index) => {
            if (typeof item === 'string') return null;
            return (
              <div key={index} className="p-[var(--card-padding)] rounded-[var(--radius-card)] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                {item.icon && (
                  <div className="p-3 w-fit rounded-[var(--radius-button)] bg-white/5 mb-6 text-white/90">
                    <IconComponent name={item.icon} className="w-6 h-6" />
                  </div>
                )}
                <h4 className={TYPOGRAPHY.featureGrid.title.classes}>{item.title}</h4>
                <p className={TYPOGRAPHY.featureGrid.text.classes}>{item.text}</p>
              </div>
            );
          })}
        </div>
      );

      if (content.fullWidth) {
        return (
          <div className="my-16 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0">
            <div className="mx-auto max-w-[1150px]">
              {gridContent}
            </div>
          </div>
        );
      }

      return (
        <div className="my-12">
          {gridContent}
        </div>
      );

    case 'consequences_grid':
      return <ConsequencesGrid />;

    case 'mental_model_shift':
      return <MentalModelShift />;

    case 'impact_metrics':
      return <ImpactMetrics />;

    default:
      return null;
  }
};

// Main component for rendering case study sections
export default function CaseStudyRenderer({ sections }: CaseStudyRendererProps) {
  const { images, openLightbox } = useLightbox();

  const handleImageClick = (src: string) => {
    const index = images.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  return (
    <div className="space-y-32">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} id={slugify(section.title)} className="mb-32 text-left scroll-mt-32">
          <h2 className={TYPOGRAPHY.sectionTitle.classes}>
            {section.title}
          </h2>
          <div className="">
            {section.content.map((content, contentIndex) => (
              <ContentBlock
                key={contentIndex}
                content={content}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
