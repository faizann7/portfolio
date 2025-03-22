/**
 * Gets the correct base path for assets depending on the environment
 * Uses the basePath for production (GitHub Pages) and empty string for development
 */
export function getAssetPath(path: string): string {
    // Don't modify absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Don't double-add the path
    if (process.env.NODE_ENV === 'production' && !path.startsWith('/portfoliooo')) {
        return `/portfoliooo${path}`;
    }

    return path;
}

// For CSS files and other places that need static paths
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfoliooo' : '';

// Function to fix image paths specifically
export function getImagePath(path: string): string {
    if (!path) return '';

    // Only process relative paths that start with /
    if (path.startsWith('/')) {
        if (process.env.NODE_ENV === 'production') {
            // Make sure we don't add the prefix twice
            if (path.startsWith('/portfoliooo/')) {
                return path;
            }
            return `/portfoliooo${path}`;
        }
    }

    return path;
} 