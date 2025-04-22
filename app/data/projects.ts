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
}

// The base path for GitHub Pages
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export const projects: Project[] = [
    {
        id: "cinefatic",
        title: "Cinefatic",
        subtitle: "Reimagined Karachi's movie-ticket booking experience",
        summary: "Leading the UX/UI design for a revolutionary movie booking app in Karachi.",
        tags: ["Mobile App", "UX Design", "Ticketing", "Entertainment"],
        image: `${basePath}/images/cinefaticthumb.png`,
        year: "2023",
        color: "var(--bg-cinefatic)",
        hoverColor: "var(--bg-cinefatic-hover)"
    },
    {
        id: "swapp",
        title: "Swapp - Car Rental",
        subtitle: "Improving Swapp's checkout conversion rate from 1.5 to 2.4%",
        summary: "Redesigning the rental experience for both tenants and landlords.",
        tags: ["Mobile App", "UX Design", "Car Rental", "Conversion Rate"],
        image: `${basePath}/images/Swapp Thumb.png`,
        year: "2022-Present",
        color: "var(--bg-swapp)",
        hoverColor: "var(--bg-swapp-hover)",
        comingSoon: true
    },
    {
        id: "route-helper",
        title: "Route Helper - Retailo Technologies",
        subtitle: "Overhauled route planning with real-time dashboards, cut planning time by 51%",
        summary: "Creating an intuitive dashboard for logistics route planning.",
        tags: ["Product Design", "SaaS", "B2B", "Web App", "Route Optimization", "Logistics"],
        image: `${basePath}/images/Pre Route Helper.png`,
        year: "2021",
        color: "var(--bg-retailo)",
        hoverColor: "var(--bg-retailo-hover)",
        comingSoon: true
    },
    {
        id: "inbounding-medzmore",
        title: "Inbounding - MEDZnMORE",
        subtitle: "Created a real-time data validation tool ensuring 99% accuracy and <0.5% errors",
        summary: "Building a custom data validation system for medical supplies inventory.",
        tags: ["Product Design", "SaaS", "B2B", "Web App", "Inventory Management", "Data Validation"],
        image: `${basePath}/images/MEDZnMORE Thumb.png`,
        year: "2021",
        color: "var(--bg-cinefatic)",
        hoverColor: "var(--bg-cinefatic-hover)",
        comingSoon: true
    },
    {
        id: "rider-app-medzmore",
        title: "Rider App - MEDZnMORE",
        subtitle: "Last-mile delivery app for Tabiyat.pk with live tracking and optimized rider navigation",
        summary: "Designing a mobile app for delivery riders to optimize routes and track orders.",
        tags: ["Mobile App", "Operations", "Fleet Management", "Delivery"],
        image: `${basePath}/images/Rider App Thumb.png`,
        year: "2020",
        color: "var(--bg-rider-app)",
        hoverColor: "var(--bg-rider-app-hover)"
    }
]; 