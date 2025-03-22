/** @type {import('next').NextConfig} */
// Fix the bundleAnalyzer import to be compatible with CommonJS
const withBundleAnalyzer = process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: true,
    })
    : (config) => config;

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'portfolio'; // GitHub repository name

const nextConfig = {
    output: 'export', // Enable static exports for GitHub Pages
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',

    images: {
        unoptimized: true, // Required for static export
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

module.exports = withBundleAnalyzer(nextConfig); 