/** @type {import('next').NextConfig} */

// Define base Next.js config
const nextConfig = {
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

// Simple module.exports without try/catch
module.exports = nextConfig; 