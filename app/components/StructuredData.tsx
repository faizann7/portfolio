import Script from 'next/script';

interface StructuredDataProps {
    type?: 'Person' | 'WebSite' | 'Article' | 'Project';
    data?: Record<string, any>;
}

interface SchemaData {
    '@context': string;
    '@type'?: string;
    [key: string]: any;
}

export default function StructuredData({ type = 'WebSite', data = {} }: StructuredDataProps) {
    const baseStructuredData: SchemaData = {
        '@context': 'https://schema.org',
    };

    let structuredData: SchemaData = { ...baseStructuredData };

    if (type === 'Person') {
        structuredData = {
            ...structuredData,
            '@type': 'Person',
            name: 'Faizan Alam',
            jobTitle: 'UX/Product Designer',
            url: 'https://faizaanalam.github.io/portfolio',
            ...data,
        };
    } else if (type === 'WebSite') {
        structuredData = {
            ...structuredData,
            '@type': 'WebSite',
            name: 'Faizan Alam Portfolio',
            description: 'Portfolio of Faizan, a UX/Product designer specializing in early-stage startups and impactful digital experiences.',
            url: 'https://faizaanalam.github.io/portfolio',
            ...data,
        };
    } else if (type === 'Article' || type === 'Project') {
        structuredData = {
            ...structuredData,
            '@type': 'Article',
            headline: data.title || 'Project',
            description: data.description || '',
            datePublished: data.datePublished || new Date().toISOString(),
            ...data,
        };
    }

    return (
        <Script
            id={`structured-data-${type}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
} 