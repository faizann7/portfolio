import { THEME } from './portfolio-config';

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    summary: string;
    tags: string[];
    image: string;
    year: string;
    color: string;
    hoverColor: string;
    comingSoon?: boolean;
    isProtected?: boolean;
    isConceptual?: boolean;
}

// The base path for GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export const projects: Project[] = [
    {
        id: "swapp",
        title: "Swapp - Car Rental",
        subtitle: "Improving booking conversion rate from 1.3 to 3%",
        summary: "Redesigning the rental experience for both tenants and landlords.",
        tags: ["Mobile App", "UX Design", "Car Rental", "Conversion Rate"],
        image: THEME.projects.swapp.image,
        year: "2022-Present",
        color: THEME.projects.swapp.bg,
        hoverColor: THEME.projects.swapp.hover,
        comingSoon: true,
    },
    {
        id: "swapp-payments",
        title: "Swapp Payments",
        subtitle: "How we reduced payments-related confusion by 72% with a unified financial transparency system",
        summary: "Redesigning the financial experience for Swapp, a car rental platform in the Careem super app.",
        tags: ["Product Design", "Fintech", "UX Research", "Mobile App"],
        image: THEME.projects['swapp-payments'].image,
        year: "2023",
        color: THEME.projects['swapp-payments'].bg,
        hoverColor: THEME.projects['swapp-payments'].hover,
        isProtected: true,
    },
    {
        id: "cinefatic",
        title: "Cinefatic",
        subtitle: "Reimagined Karachi's movie-ticket booking experience",
        summary: "Leading the UX/UI design for a revolutionary movie booking app in Karachi.",
        tags: ["Mobile App", "UX Design", "Ticketing", "Entertainment"],
        image: THEME.projects.cinefatic.image,
        year: "2023",
        color: THEME.projects.cinefatic.bg,
        hoverColor: THEME.projects.cinefatic.hover,
        isConceptual: true
    },
    {
        id: "route-helper",
        title: "Route Helper - Retailo Technologies",
        subtitle: "Overhauled route planning with real-time dashboards, cut planning time by 51%",
        summary: "Creating an intuitive dashboard for logistics route planning.",
        tags: ["Product Design", "SaaS", "B2B", "Web App", "Route Optimization", "Logistics"],
        image: THEME.projects['route-helper'].image,
        year: "2021",
        color: THEME.projects['route-helper'].bg,
        hoverColor: THEME.projects['route-helper'].hover,
        comingSoon: true,
    },
    {
        id: "rider-app-medzmore",
        title: "Rider App - MEDZnMORE",
        subtitle: "Last-mile delivery app for Tabiyat.pk with live tracking and optimized rider navigation",
        summary: "Designing a mobile app for delivery riders to optimize routes and track orders.",
        tags: ["Mobile App", "Operations", "Fleet Management", "Delivery"],
        image: THEME.projects['rider-app-medzmore'].image,
        year: "2020",
        color: THEME.projects['rider-app-medzmore'].bg,
        hoverColor: THEME.projects['rider-app-medzmore'].hover,
    },
    {
        id: "swapp-payments",
        title: "Swapp - Payments",
        subtitle: "Enterprise payment orchestration and settlement system",
        summary: "Designing a seamless payment and settlement platform for the car rental ecosystem.",
        tags: ["Fintech", "Product Design", "Payments", "Dashboard"],
        image: THEME.projects['swapp-payments'].image,
        year: "2024",
        color: THEME.projects['swapp-payments'].bg,
        hoverColor: THEME.projects['swapp-payments'].hover,
        comingSoon: true,
        isProtected: true
    }
];
