# GitHub Pages Deployment Guide

## Why Special Configurations Are Needed

GitHub Pages serves content from a subpath (e.g., `/portfoliooo/`) rather than from the root domain. This requires several special accommodations in a Next.js project:

1. **Base Path Configuration**: The site needs to know it's being served from a subpath
2. **Asset Path Management**: All assets (images, fonts, CSS) need prefixed paths 
3. **Client-Side Navigation**: Links need to respect the base path
4. **Static Export**: GitHub Pages only supports static sites (no server-side rendering)

## Special Patterns Used in This Codebase

### 1. Path Utilities

We use several utilities to manage paths consistently:

```typescript
// From app/utils/assets.ts

// Base path constant
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfoliooo' : '';

// Asset path utility
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

// Image path utility - specifically for image paths
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
```

### 2. Next.js Configuration

The `next.config.js` file contains GitHub Pages-specific settings:

```javascript
const nextConfig = {
    output: 'export',  // Static HTML export for GitHub Pages
    basePath: process.env.NODE_ENV === 'production' ? '/portfoliooo' : '',  // Path prefix
    assetPrefix: process.env.NODE_ENV === 'production' ? '/portfoliooo/' : '',  // Asset path prefix
    
    // Other GitHub Pages optimizations
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
    
    // Static image handling (no Image Optimization API on GitHub Pages)
    images: {
        unoptimized: true,
    },
};
```

### 3. Font Loading

Special handling for font loading in `layout.tsx`:

```typescript
// Font URL construction with correct paths
const bookFontUrl = process.env.NODE_ENV === 'production'
  ? '/portfoliooo/fonts/CircularStd-Book.woff'
  : '/fonts/CircularStd-Book.woff';

// Inline script to fix font loading issues in production
<Script id="font-loading-fix" strategy="beforeInteractive">
  {`
    // This script helps preload fonts with the correct paths in production
    (function() {
      const fontFiles = ['CircularStd-Book.woff', 'CircularStd-Medium.woff', 'CircularStd-Bold.woff'];
      const prefix = window.location.hostname.includes('github.io') ? '/portfoliooo' : '';
      
      fontFiles.forEach(function(file) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = prefix + '/fonts/' + file;
        link.as = 'font';
        link.type = 'font/woff';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    })();
  `}
</Script>
```

### 4. Path-Aware Components

Components like `Link` and `Image` are configured to understand the base path:

```typescript
// Correct usage with Next.js Link component
<Link href="/work">Projects</Link>  // Next.js handles the base path automatically

// Correct usage with Next.js Image component
<Image src={getImagePath("/images/example.jpg")} alt="Example" width={500} height={300} />
```

## Best Practices for GitHub Pages Deployment

1. **Always use path utilities**: Use `getImagePath()` or `getAssetPath()` for all asset references
2. **Test locally in production mode**: Run `npm run build && npm run -s export` to test static export locally
3. **Check network requests**: Use browser dev tools to verify all assets load correctly
4. **Use automation**: Use GitHub Actions to automate the build and deployment process
5. **Search for hardcoded paths**: Periodically search the codebase for hardcoded paths that might break in production

## Troubleshooting

If you encounter 404 errors for assets after deployment:

1. Check if the path is being processed through the path utilities
2. Verify that the file exists in the correct location in the public directory
3. Check browser developer tools to see which specific URL is failing
4. Test locally in production mode to verify the issue before deployment 