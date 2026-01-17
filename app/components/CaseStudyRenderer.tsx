'use client';

import Image from "next/image";
import { getImagePath } from "../utils/assets";

interface CaseStudyContent {
  type: 'paragraph' | 'heading' | 'image' | 'list';
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  items?: string[];
}

interface CaseStudySection {
  title: string;
  content: CaseStudyContent[];
}

interface CaseStudyRendererProps {
  sections: CaseStudySection[];
}

// Component for rendering individual content blocks
const ContentBlock = ({ content }: { content: CaseStudyContent }) => {
  switch (content.type) {
    case 'paragraph':
      return (
        <p className="text-xl leading-relaxed mb-6">
          {content.text}
        </p>
      );

    case 'heading':
      const HeadingTag = `h${content.level || 3}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag className="text-2xl font-bold mt-8 mb-2">
          {content.text}
        </HeadingTag>
      );

    case 'image':
      if (!content.src) return null;

      const processedSrc = getImagePath(content.src);

      if (content.fullWidth) {
        // Full width image (viewport width)
        return (
          <div className="my-12 relative w-screen left-1/2 -translate-x-1/2 px-4 lg:px-0">
            <div className="mx-auto max-w-[1120px]">
              <Image
                src={processedSrc}
                alt={content.alt || ''}
                width={content.width || 1400}
                height={content.height || 800}
                className="w-full h-auto rounded-md"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1120px"
              />
            </div>
          </div>
        );
      } else {
        // Container width image (768px max)
        return (
          <div className="my-12">
            <Image
              src={processedSrc}
              alt={content.alt || ''}
              width={content.width || 768}
              height={content.height || 500}
              className="w-full h-auto rounded-md"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        );
      }

    case 'list':
      if (!content.items) return null;
      return (
        <ul className="list-disc pl-5 space-y-2 mb-6">
          {content.items.map((item, index) => (
            <li key={index} className="text-xl">
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
};

// Main component for rendering case study sections
export default function CaseStudyRenderer({ sections }: CaseStudyRendererProps) {
  return (
    <div className="space-y-24">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-24">
          <h2 className="text-4xl font-bold mb-10">{section.title}</h2>
          <div className="text-xl">
            {section.content.map((content, contentIndex) => (
              <ContentBlock key={contentIndex} content={content} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 