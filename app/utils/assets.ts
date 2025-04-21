/**
 * GitHub Pages Asset Path Utilities
 * 
 * These utilities help manage paths for assets when deploying to GitHub Pages.
 * GitHub Pages serves content from a subpath (e.g., /portfolio/), requiring 
 * special path handling for all assets.
 */

/**
 * Gets the correct base path for assets depending on the environment
 * Uses the basePath for production (GitHub Pages) and empty string for development
 * 
 * @param path - The original asset path
 * @returns The path with the correct base path for the current environment
 */
export function getAssetPath(path: string): string {
    // Don't modify absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Don't double-add the path
    if (process.env.NODE_ENV === 'production' && !path.startsWith('/portfolio')) {
        return `/portfolio${path}`;
    }

    return path;
}

/**
 * Base path constant for use in CSS files and other places that need static paths
 * This is particularly important for GitHub Pages deployment where all assets need 
 * to be prefixed with the repository name
 */
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

/**
 * Function to specifically fix image paths for GitHub Pages deployment
 * 
 * Current implementation handles paths that start with a forward slash (/).
 * If the path doesn't start with '/', it's returned as-is, which works for:
 * - External URLs
 * - Relative paths (where context already provides base path)
 * - Next.js Image component when used with the basePath configuration
 * 
 * @param path - The original image path
 * @returns The image path with the correct base path for the current environment
 */
export function getImagePath(path: string): string {
    if (!path) return '';

    // Only process relative paths that start with /
    if (path.startsWith('/')) {
        if (process.env.NODE_ENV === 'production') {
            // Make sure we don't add the prefix twice
            if (path.startsWith('/portfolio/')) {
                return path;
            }
            return `/portfolio${path}`;
        }
    }

    return path;
} 