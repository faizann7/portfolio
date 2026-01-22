/**
 * Centralized configuration for portfolio colors, projects, and exploration items.
 * Use this file to manage the theme and content of the main sections.
 */

export const THEME = {
    // Project Specific Themes
    projects: {
        'cinefatic': {
            id: 'cinefatic',
            bg: '#3B1F2E',
            hover: '#422937',
            accent: '#E11D48',
            image: '/images/cinefaticthumb.png',
        },
        'swapp': {
            id: 'swapp',
            bg: '#6D2C39',
            hover: '#57232E',
            accent: '#EF4444',
            image: '/images/Swapp Thumb.png',
        },
        'swapp-payments': {
            id: 'swapp-payments',
            bg: '#3b1f2e',
            hover: '#2F1924',
            accent: '#818CF8',
            image: '/images/paymentsthumb.png', // Placeholder
        },
        'route-helper': {
            id: 'route-helper',
            bg: '#384039',
            hover: '#282E29',
            accent: '#10B981',
            image: '/images/Pre Route Helper.png',
        },
        'rider-app-medzmore': {
            id: 'rider-app-medzmore',
            bg: '#292C75',
            hover: '#1E205A',
            accent: '#3B82F6',
            image: '/images/Rider App Thumb.png',
        }
    },

    // Exploration Section Config
    explorations: {
        multidisciplinary: {
            title: "Multidisciplinary Process",
            description: "I bridge the gap between disciplines. Integrating AI for research speed, design systems for scale, and code for engineering reality.",
            link: "#",
            colors: {
                bg: "#1A1C2C",
                glow: "rgba(99, 102, 241, 0.1)", // indigo-500/10
                border: "rgba(255, 255, 255, 0.1)",
                hoverBorder: "rgba(255, 255, 255, 0.2)",
            }
        },
        cinefatic: {
            title: "Cinefatic",
            subtitle: "Reimagining the cinema experience with industrial UI and motion.",
            tag: "EXPERIMENTAL",
            link: "/work/cinefatic",
            colors: {
                bg: "#2C1A1A",
                glow: "rgba(220, 38, 38, 0.1)", // red-600/10
                accent: "rgba(239, 68, 68, 0.1)", // red-500/10
                badge: "rgba(239, 68, 68, 0.2)", // red-500/20
                text: "#FECACA", // red-200
            }
        },
        vibeCoded: {
            title: "Technical fluency",
            subtitle: "Using my CS roots and AI tools to rapid-prototype ideas and speak the language of development.",
            tag: "AI-AUGMENTED",
            link: "#",
            colors: {
                bg: "#1A2C2C",
                glow: "rgba(13, 148, 136, 0.1)", // teal-600/10
                accent: "rgba(20, 184, 166, 0.1)", // teal-500/10
                badge: "rgba(20, 184, 166, 0.2)", // teal-500/20
                text: "#CCFBF1", // teal-200
            }
        }
    }
};
