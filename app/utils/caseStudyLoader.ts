import { promises as fs } from 'fs';
import path from 'path';

export interface CaseStudyData {
  id: string;
  title: string;
  description: string;
  mainHeadline?: string;
  subtitle?: string;
  prototypeUrl?: string;
  tldrUrl?: string;
  role: string;
  duration: string;
  tools: string;
  overview?: string;
  overviewHeading?: string;
  goal?: string;
  // Snapshot fields (optional)
  platform?: string;
  team?: string;
  problem?: string;
  whatIDid?: string;
  keyResults?: Array<{ value: string; label: string }>;
  // Hero image (optional)
  heroImage?: string;
  tldr?: {
    title: string;
    readTime?: string;
    roleTitle: string;
    roleSubtitle?: string;
    collaboration?: string;
    timelineTitle: string;
    timelineSubtitle?: string;
    deliverables?: string;
    impactStat: string;
    impactLabel: string;
    frictionTitle: string;
    frictionDescription: string;
    userPerception?: string;
    strategyTitle: string;
    strategyDescription: string;
    strategyVisual?: string;
  };
  sections: CaseStudySection[];
  results: string;
  finalScreens: FinalScreen[];
}

export interface CaseStudySection {
  title: string;
  content: CaseStudyContent[];
}

export interface CaseStudyContent {
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'feature_grid';
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  items?: string[] | { title: string; text: string; icon?: string }[];
}

export interface FinalScreen {
  title: string;
  description: string;
  image: string;
}

/**
 * Loads case study data from JSON files
 * @param projectId - The project identifier
 * @returns Promise<CaseStudyData | null>
 */
export async function loadCaseStudyData(projectId: string): Promise<CaseStudyData | null> {
  try {
    const caseStudyPath = path.join(process.cwd(), 'app', 'data', 'case-studies', `${projectId}.json`);
    const fileContent = await fs.readFile(caseStudyPath, 'utf-8');
    const caseStudyData = JSON.parse(fileContent) as CaseStudyData;
    return caseStudyData;
  } catch (error) {
    console.warn(`Case study data not found for project: ${projectId}`);
    return null;
  }
}

/**
 * Gets all available case study IDs
 * @returns Promise<string[]>
 */
export async function getCaseStudyIds(): Promise<string[]> {
  try {
    const caseStudiesDir = path.join(process.cwd(), 'app', 'data', 'case-studies');
    const files = await fs.readdir(caseStudiesDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.warn('Case studies directory not found');
    return [];
  }
} 