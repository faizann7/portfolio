# Image Path Handling for GitHub Pages Deployment

This document explains how image and asset paths are handled in this Next.js project, especially when deploying to GitHub Pages.

## The Problem

When deploying a Next.js application to GitHub Pages, assets like images need to include the repository name in their paths. For example:

- Local development: `/images/example.png`
- GitHub Pages: `/portfoliooo/images/example.png`

Without proper handling, this results in 404 errors for images and other assets when the site is deployed.

## Our Solution

We've implemented a path handling utility that automatically adjusts paths based on the environment:

1. In `app/utils/assets.ts`, we've created utility functions that handle path transformations
2. These utilities detect whether the app is running in development or production
3. In production, they automatically add the `/portfoliooo` base path to asset URLs

## How to Use Asset Utilities

### 1. For Image Components

When using Next.js `Image` components, always process the path with our utility:

```tsx
import { getImagePath } from "../utils/assets";

// In your component:
<Image 
  src={getImagePath("/images/example.png")} 
  alt="Example"
  width={500}
  height={300}
/>
```

### 2. For Case Study Images

We've created a `CaseStudyImage` component in `app/work/[project]/page.tsx` that handles paths automatically:

```tsx
<CaseStudyImage
  src="/images/example.png"
  alt="Example image"
  width={500}
  height={300}
  className="rounded-lg"
/>
```

### 3. For Background Images or CSS

If you need to use images in CSS:

```tsx
import { getImagePath } from "../utils/assets";

const backgroundStyle = {
  backgroundImage: `url(${getImagePath("/images/background.jpg")})`
};
```

### 4. For Static Data Files

When defining image paths in data files, you can either:

1. Use relative paths and process them when rendering:
   ```tsx
   // In data file
   image: "/images/example.png"
   
   // When rendering
   <Image src={getImagePath(item.image)} ... />
   ```

2. Or use the BASE_PATH constant directly in the data file:
   ```tsx
   // At the top of your data file
   const basePath = process.env.NODE_ENV === 'production' ? '/portfoliooo' : '';
   
   // In your data
   image: `${basePath}/images/example.png`
   ```

## Adding New Images

When adding new images to the project:

1. Place them in the appropriate folder under `public/images/`
2. Always use paths starting with `/` (e.g., `/images/folder/file.png`)
3. Process the path using one of the methods above
4. Never use absolute paths to external domains unless needed

## Troubleshooting

If you encounter 404 errors for images after deployment:

1. Check the browser console to identify which images are failing to load
2. Verify that you're using the `getImagePath` utility or `CaseStudyImage` component
3. Ensure the image exists in the correct location in the `public` folder
4. Check for typos in the image path

## Edge Cases

- Absolute URLs (starting with `http://` or `https://`) are passed through unchanged
- Empty paths are returned as-is
- If a path in production already includes the base path, it won't be added again 