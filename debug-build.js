// Simple script to debug Next.js build process
console.log('Starting build debugging...');

// Log Node version
console.log('Node version:', process.version);

// Log environment
console.log('NODE_ENV:', process.env.NODE_ENV);

// Import check for @next/bundle-analyzer
try {
    const bundleAnalyzer = require('@next/bundle-analyzer');
    console.log('@next/bundle-analyzer loaded successfully');
} catch (error) {
    console.error('Error loading @next/bundle-analyzer:', error.message);
}

// Check Next.js import
try {
    const next = require('next');
    console.log('Next.js loaded successfully, version:', next.version);
} catch (error) {
    console.error('Error loading Next.js:', error.message);
}

console.log('Build debugging complete'); 