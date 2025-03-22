# Troubleshooting Common Console Errors

This guide explains common console errors you might see when running the portfolio site, especially on GitHub Pages.

## Harmless Errors (Safe to Ignore)

### 1. React Server Component (RSC) Errors
```
GET https://faizann7.github.io/portfoliooo/about.txt?_rsc=10p2w 404 (Not Found)
GET https://faizann7.github.io/portfoliooo/resume.txt?_rsc=10p2w 404 (Not Found)
GET https://faizann7.github.io/portfoliooo/contact.txt?_rsc=10p2w 404 (Not Found)
```

**What it is:** These are Next.js's React Server Components prefetching requests. They attempt to load data for pages you might navigate to.

**Why it's harmless:** These 404 errors are expected in static exports (like GitHub Pages) and don't affect functionality. They're part of Next.js's optimization system trying to preload content.

**Fix:** None needed. This is normal behavior for Next.js apps deployed to static hosting.

### 2. CSS Import Warning
```
@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418.
```

**What it is:** A browser warning about how CSS stylesheets are constructed.

**Why it's harmless:** This is a technical limitation in how browsers handle constructed stylesheets and doesn't affect the rendering of your site.

**Fix:** None needed. This is a known issue with the browser's CSS implementation.

### 3. Google Analytics/Tag Manager Blocked
```
GET https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX net::ERR_BLOCKED_BY_CLIENT
```

**What it is:** Analytics or tracking scripts being blocked by ad blockers or privacy extensions.

**Why it's harmless:** This just means the user has privacy protections enabled in their browser. Your site still works fine; it just won't track analytics for these users.

**Fix:** None needed. This is expected behavior when users have ad blockers.

## Errors That Need Fixing

### 1. Missing Image Assets
```
GET https://faizann7.github.io/images/cinefatic/image.png 404 (Not Found)
```

**What it is:** An image that's not loading because the path is incorrect (usually missing the `/portfoliooo/` prefix).

**How to fix:**
1. Find where the image is referenced in the code
2. Replace direct `Image` components with `CaseStudyImage` components
3. Or use the `getImagePath()` utility:
   ```jsx
   <Image 
     src={getImagePath("/images/example.png")}
     alt="Example"
     width={500} 
     height={300} 
   />
   ```

### 2. Missing Font Files
```
GET https://faizann7.github.io/fonts/example-font.woff2 404 (Not Found)
```

**How to fix:**
1. Update the font URLs in your CSS to use the base path
2. Or use the font preloading script in layout.tsx

## How to Diagnose Image Path Issues

If you're still seeing 404 errors for images after applying fixes:

1. **Inspect the error URL:** Check which image is failing to load
2. **Find where it's referenced:** Use grep search to locate where the image path is defined
3. **Check path handling:** Ensure the image component is using `CaseStudyImage` or `getImagePath()`
4. **Verify the file exists:** Make sure the image file actually exists in the public directory
5. **Check case sensitivity:** Ensure the filename case matches exactly (e.g., "Image.png" vs "image.png")

## Debugging Tips

1. Use browser developer tools to see which specific assets are failing to load
2. Use the Network tab to filter for 404 responses
3. Temporarily disable ad blockers to distinguish between blocked content and actual missing assets
4. Test locally with production builds:
   ```
   npm run build && npm run start
   ``` 