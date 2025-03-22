# Portfolio Website

A Next.js-based portfolio website optimized for deployment on GitHub Pages.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Important Considerations](#important-considerations)
- [Troubleshooting](#troubleshooting)

## Project Overview

This is a professional portfolio website built with Next.js, showcasing work examples, case studies, and contact information. The site is specifically configured to work with GitHub Pages deployment.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfoliooo.git
   cd portfoliooo
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Visit `http://localhost:3000` to see the application running

## Project Structure

```
portfolio/
├── app/                  # Main application code
│   ├── components/       # Reusable UI components
│   ├── data/             # Data files (projects, etc.)
│   ├── utils/            # Utility functions
│   ├── work/             # Case study pages
│   │   └── [project]/    # Dynamic project pages
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── public/               # Static assets
│   └── images/           # Image files
├── docs/                 # Documentation files
└── next.config.js        # Next.js configuration
```

## Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.

### Automatic Deployment

1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at `https://yourusername.github.io/portfoliooo/`

### Manual Deployment

If needed, you can deploy manually:

```bash
npm run build
npm run export
```

Then copy the contents of the `out` directory to your GitHub Pages branch.

## Important Considerations

### Asset Handling

When deploying to GitHub Pages, the site is served from a sub-path (`/portfoliooo/`) rather than the root. This requires special handling for assets like images.

See [Image Path Documentation](./docs/IMAGE_PATHS.md) for detailed guidance on handling image paths.

Key points:

1. Always use the provided utilities:
   - `getImagePath()` for regular image paths 
   - `CaseStudyImage` component for case study images

2. In data files:
   - Either use relative paths and process them at render time
   - Or use the `basePath` constant directly in the data file

3. Never hardcode absolute paths in your components

### Adding New Pages

1. For regular pages, add them to the `app` directory following Next.js file-based routing
2. For case studies:
   - Add the project to `app/data/projects.ts`
   - Add the project ID to `generateStaticParams()` in `app/work/[project]/page.tsx`
   - Add detailed case study content in the page file

## Troubleshooting

### Common Issues

For a detailed guide on common errors and solutions, see the [Troubleshooting Guide](./docs/TROUBLESHOOTING.md).

#### 404 Errors for Assets

If assets like images fail to load on GitHub Pages:

1. Check that you're using the path utilities correctly
2. Verify that the file exists in the correct location
3. Check for typos in path names (especially case-sensitivity)

#### Missing Pages on GitHub Pages

Ensure the page is included in the `generateStaticParams()` function for any dynamic routes.

#### Console Error for `.txt?_rsc=10ksn` Files

These are normal Next.js prefetching requests and can be safely ignored. They're part of the React Server Components mechanism.

#### Ad Blocker Warnings

Warnings about Google Analytics or other tracking scripts being blocked are expected when users have ad blockers and don't affect site functionality.

## License

[License information]

## Contact

For questions or collaboration, reach out at [your contact info].
