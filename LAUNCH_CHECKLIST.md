# Launch Checklist for Portfolio Website

## Before Deploying
- [x] Fix dynamic routes to support static export with generateStaticParams
- [x] Configure Next.js for static export for GitHub Pages compatibility
- [x] Add .nojekyll file for GitHub Pages compatibility
- [x] Resolve configuration conflicts between next.config.js and next.config.ts
  - [x] Consolidated configurations into a single next.config.js file
  - [x] Enabled static export with proper GitHub Pages settings
  - [x] Added bundle analyzer support
- [x] Resolve runtime errors with useSearchParams in client components
  - [x] Created SearchParamsProvider wrapper component
  - [x] Updated work/[project] page to use SearchParamsProvider
  - [x] Updated GoogleAnalytics component to use SearchParamsProvider
  - [x] Updated home page to use SearchParamsProvider  
  - [x] Updated playground page to use SearchParamsProvider
  - [x] Verified all components are using the custom SearchParamsProvider
- [x] Fix "use client" with generateStaticParams runtime error
  - [x] Removed 'use client' directive from [project]/page.tsx
  - [x] Confirmed ProjectClient.tsx is properly set up as a client component
- [ ] Run `npm run build` locally to ensure there are no build errors
- [ ] Test the site locally with `npm run dev`
- [ ] Verify all links work correctly, including internal navigation
- [ ] Test the site on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test the site on mobile devices or using browser dev tools mobile view
- [ ] Check for any console errors in the browser dev tools
- [ ] Verify that Google Analytics is working correctly
- [x] Test all case study pages to ensure they load properly
- [ ] Verify images load correctly and are properly optimized
- [ ] Run a Lighthouse audit to check performance, accessibility, SEO, and best practices

## After Deploying to GitHub Pages
- [ ] Verify the site is accessible at your GitHub Pages URL
- [ ] Test navigation and links on the live site
- [ ] Verify that canonical URLs are correct on the live site
- [ ] Check that meta tags and structured data are properly implemented
- [ ] Verify Google Analytics is tracking on the live site
- [ ] Submit your sitemap to Google Search Console
- [ ] Share your portfolio with peers for feedback before wider distribution

## Regular Maintenance
- [ ] Update content regularly to keep the site fresh
- [ ] Monitor Google Analytics for visitor patterns and potential issues
- [ ] Check for broken links periodically
- [ ] Keep dependencies updated to maintain security and performance
- [ ] Review Lighthouse scores occasionally to identify areas for improvement 