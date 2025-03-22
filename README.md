# UX/Product Designer Portfolio

A modern, minimalist portfolio website for UX/Product Designers built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- Clean, minimalist design with bold typography
- Subtle micro-interactions and animations
- Responsive layout for all device sizes
- Light mode design
- Optimized for performance
- SEO friendly with structured data
- Error boundaries for graceful error handling

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Content

- Update the personal information in `app/page.tsx`
- Replace placeholder images in the `public/images` directory
- Modify the project details in the `ProjectCard` components

### Styling

- Customize colors in `app/globals.css`
- Adjust typography and spacing as needed
- Modify animations in the Framer Motion components

## Deployment to GitHub Pages

This portfolio is configured for deployment to GitHub Pages:

1. Update the `next.config.js` file with your repository name:
```js
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  assetPrefix: '/your-repo-name/',
  // other config...
};
```

2. Push your code to GitHub

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set the source to GitHub Actions

4. The GitHub Action workflow will automatically build and deploy your site

## Pre-Launch Checklist

Before launching your portfolio, make sure to check the `LAUNCH_CHECKLIST.md` file for a comprehensive list of tasks to ensure your site is production-ready.

## Production Features

- Google Analytics integration
- Dynamic meta tags for SEO
- Structured data (JSON-LD) for rich snippets
- Error boundaries for graceful error handling
- Optimized image loading with Next.js Image
- Font preloading for better performance
- Sitemap and robots.txt generation

## License

This project is open source and available under the [MIT License](LICENSE).
