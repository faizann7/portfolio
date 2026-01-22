/**
 * Typography Configuration for Case Studies
 * 
 * This file centralizes all font sizes, weights, and margins.
 * Approximate px values are provided for context.
 */

export const TYPOGRAPHY = {
    // Section Headers (The main title for each logical block)
    sectionTitle: {
        classes: "text-4xl md:text-5xl font-bold mb-12 text-white tracking-tight leading-tight",
        approxPx: "Mobile: 36px, Desktop: 48px",
        tag: "h2"
    },

    // Content Headings (Used inside sections)
    headings: {
        h2: {
            classes: "text-4xl md:text-5xl font-bold mb-12 text-white tracking-tight mt-16",
            approxPx: "Mobile: 36px, Desktop: 48px"
        },
        h3: {
            classes: "text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight mt-16",
            approxPx: "Mobile: 24px, Desktop: 30px"
        },
        h4: {
            classes: "text-xl md:text-2xl font-bold mb-4 text-white tracking-tight mt-16",
            approxPx: "Mobile: 20px, Desktop: 24px"
        }
    },

    // Body Text
    paragraph: {
        classes: "text-xl md:text-xl leading-relaxed mb-10 text-white/70 font-light",
        approxPx: "Mobile: 20px, Desktop: 24px"
    },

    // Lists
    list: {
        item: {
            classes: "text-xl text-white/80 leading-relaxed",
            approxPx: "20px"
        },
        container: "list-disc pl-5 space-y-3 mb-8"
    },

    // Feature Grids
    featureGrid: {
        title: {
            classes: "text-xl font-bold mb-3 text-white",
            approxPx: "20px"
        },
        text: {
            classes: "text-white/60 text-lg leading-relaxed",
            approxPx: "18px"
        }
    }
};
