/** @type {import('next').NextConfig} */

// Simpler configuration to avoid TypeError issues
let nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/portfoliooo' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/portfoliooo/' : '',

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },

    // Skip TypeScript checking during the build process
    typescript: {
        ignoreBuildErrors: true,
    },

    // Skip ESLint checking during the build process
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Better GitHub Pages support
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,

    reactStrictMode: true,
};

try {
    // Only add bundle analyzer in analyze mode
    if (process.env.ANALYZE === 'true') {
        const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
        nextConfig = withBundleAnalyzer(nextConfig);
    }
    module.exports = nextConfig;
} catch (error) {
    // Ensure error is an instance of Error
    const errorInstance = error instanceof Error ? error : new Error(String(error));
    console.error('Error in next.config.js:', errorInstance);
    module.exports = nextConfig;
} 