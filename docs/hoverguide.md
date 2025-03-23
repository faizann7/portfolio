# Scribble Link Hover Effect Guide for Next.js with TypeScript

This guide explains how to implement the "Carme" scribble link hover animation from the CSS Line Hover Styles collection in a Next.js project with TypeScript.

## Effect Overview

The "Carme" effect creates a hand-drawn/scribble underline animation that appears when hovering over a link. It uses SVG path animation to create a natural-looking underline that appears to be drawn in real-time.

## Implementation Steps

### Step 1: Create a Component

Create a new component in your Next.js project:

```tsx
// components/ScribbleLink.tsx
import React from 'react';

interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScribbleLink({ href, children, className = '' }: ScribbleLinkProps) {
  return (
    <a href={href} className={`link link--carme ${className}`}>
      <span>{children}</span>
      <svg 
        className="link__graphic link__graphic--stroke link__graphic--scribble" 
        width="100%" 
        height="9" 
        viewBox="0 0 101 9"
      >
        <path 
          d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" 
          pathLength="1"
        />
      </svg>
    </a>
  );
}
```

### Step 2: Add the CSS

You have several options for styling in Next.js:

#### Option 1: CSS Modules (Recommended)

Create a file named `ScribbleLink.module.css`:

```css
/* components/ScribbleLink.module.css */
.link {
  text-decoration: none;
  color: var(--link-color, #000);
  position: relative;
  display: inline-block;
}

.link--carme {
  display: inline-flex;
  font-family: sans-serif; /* Use your preferred font */
  overflow: hidden;
  line-height: 1.7;
}

.link--carme span {
  position: relative;
  transition: color 0.3s;
}

.link--carme:hover span {
  color: var(--link-hover-color, #d94f5c);
}

.link__graphic {
  position: absolute;
  top: 100%;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  fill: none;
}

.link__graphic--stroke {
  stroke: var(--link-hover-color, #d94f5c);
  stroke-width: 1px;
}

.link--carme .link__graphic--scribble path {
  transition: stroke-dasharray 0.6s cubic-bezier(0.7, 0, 0.3, 1);
  stroke-dasharray: 0 1;
}

.link--carme:hover .link__graphic--scribble path {
  stroke-dasharray: 1 0; 
  transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
}
```

Then update your component to use the CSS modules:

```tsx
// components/ScribbleLink.tsx
import React from 'react';
import styles from './ScribbleLink.module.css';

interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScribbleLink({ href, children, className = '' }: ScribbleLinkProps) {
  return (
    <a 
      href={href} 
      className={`${styles.link} ${styles['link--carme']} ${className}`}
    >
      <span>{children}</span>
      <svg 
        className={`${styles.link__graphic} ${styles['link__graphic--stroke']} ${styles['link__graphic--scribble']}`} 
        width="100%" 
        height="9" 
        viewBox="0 0 101 9"
      >
        <path 
          d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" 
          pathLength="1"
        />
      </svg>
    </a>
  );
}
```

#### Option 2: Global CSS

Create a CSS file and import it in your `_app.tsx` or `layout.tsx`:

```css
/* styles/ScribbleLink.css */
.link {
  text-decoration: none;
  color: var(--link-color, #000);
  position: relative;
  display: inline-block;
}

/* ...rest of the CSS from Option 1... */
```

```tsx
// pages/_app.tsx or app/layout.tsx
import type { AppProps } from 'next/app';
import '../styles/ScribbleLink.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

#### Option 3: CSS-in-JS (with styled-components)

First, install the necessary packages:

```bash
npm install styled-components @types/styled-components
# or
yarn add styled-components @types/styled-components
```

Then create your component:

```tsx
// components/ScribbleLink.tsx
import React from 'react';
import styled from 'styled-components';

interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link = styled.a`
  text-decoration: none;
  color: var(--link-color, #000);
  position: relative;
  display: inline-block;
  
  &.link--carme {
    display: inline-flex;
    font-family: sans-serif;
    overflow: hidden;
    line-height: 1.7;
  }
  
  &.link--carme span {
    position: relative;
    transition: color 0.3s;
  }
  
  &.link--carme:hover span {
    color: var(--link-hover-color, #d94f5c);
  }
  
  .link__graphic {
    position: absolute;
    top: 100%;
    left: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    fill: none;
  }
  
  .link__graphic--stroke {
    stroke: var(--link-hover-color, #d94f5c);
    stroke-width: 1px;
  }
  
  &.link--carme .link__graphic--scribble path {
    transition: stroke-dasharray 0.6s cubic-bezier(0.7, 0, 0.3, 1);
    stroke-dasharray: 0 1;
  }
  
  &.link--carme:hover .link__graphic--scribble path {
    stroke-dasharray: 1 0; 
    transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
  }
`;

export default function ScribbleLink({ href, children, className = '' }: ScribbleLinkProps) {
  return (
    <Link href={href} className={`link--carme ${className}`}>
      <span>{children}</span>
      <svg 
        className="link__graphic link__graphic--stroke link__graphic--scribble" 
        width="100%" 
        height="9" 
        viewBox="0 0 101 9"
      >
        <path 
          d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" 
          pathLength="1"
        />
      </svg>
    </Link>
  );
}
```

### Step 3: Use the Component

```tsx
// pages/index.tsx or app/page.tsx
import React from 'react';
import ScribbleLink from '../components/ScribbleLink';

export default function Home() {
  return (
    <div>
      <h1>My Next.js App</h1>
      <ScribbleLink href="/about">Writings</ScribbleLink>
    </div>
  );
}
```

## Using with Next.js Link Component

To use with Next.js's `Link` component for client-side navigation:

### For Next.js 13+ (App Router)

```tsx
// components/ScribbleLink.tsx
import React from 'react';
import Link from 'next/link';
import styles from './ScribbleLink.module.css';

interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScribbleLink({ href, children, className = '' }: ScribbleLinkProps) {
  return (
    <Link 
      href={href} 
      className={`${styles.link} ${styles['link--carme']} ${className}`}
    >
      <span>{children}</span>
      <svg 
        className={`${styles.link__graphic} ${styles['link__graphic--stroke']} ${styles['link__graphic--scribble']}`} 
        width="100%" 
        height="9" 
        viewBox="0 0 101 9"
      >
        <path 
          d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" 
          pathLength="1"
        />
      </svg>
    </Link>
  );
}
```

### For Next.js 12 or older (Pages Router)

```tsx
// components/ScribbleLink.tsx
import React from 'react';
import Link from 'next/link';
import styles from './ScribbleLink.module.css';

interface ScribbleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScribbleLink({ href, children, className = '' }: ScribbleLinkProps) {
  return (
    <Link href={href} legacyBehavior>
      <a className={`${styles.link} ${styles['link--carme']} ${className}`}>
        <span>{children}</span>
        <svg 
          className={`${styles.link__graphic} ${styles['link__graphic--stroke']} ${styles['link__graphic--scribble']}`} 
          width="100%" 
          height="9" 
          viewBox="0 0 101 9"
        >
          <path 
            d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" 
            pathLength="1"
          />
        </svg>
      </a>
    </Link>
  );
}
```

## Customization

### Color Customization

You can customize the colors by setting CSS variables in your global CSS:

```css
/* styles/globals.css */
:root {
  --link-color: #333; /* Default link color */
  --link-hover-color: #ff3e00; /* Color on hover and for the scribble effect */
}
```

### SVG Path Customization

The scribble effect uses an SVG path. If you want a different shape for your underline, you can modify the `d` attribute of the path element. You can create your own path using tools like Illustrator, Figma, or an online SVG path editor.

## How It Works

The animation works by:

1. Using the `pathLength="1"` attribute to normalize the SVG path length to 1
2. Setting `stroke-dasharray: 0 1` to hide the path initially (0 visible, 1 invisible)
3. On hover, transitioning to `stroke-dasharray: 1 0` to make the entire path visible
4. Using custom bezier curves for the transition timing to create a natural drawing effect

## Accessibility Considerations

- The animation is purely decorative and doesn't affect screen readers
- The link still functions as a standard HTML anchor element
- Consider adding appropriate focus styles for keyboard navigation

## Performance Tips

- The SVG animation is hardware-accelerated in most browsers
- For optimal performance, avoid applying this effect to a large number of links that appear simultaneously on the page
- Consider using `will-change: stroke-dasharray` if you notice any performance issues

## Browser Compatibility

This effect works in all modern browsers that support:
- SVG
- CSS variables
- stroke-dasharray animations

IE11 is not supported without significant polyfills.

## Credits

This effect is based on the "Carme" hover effect from the [CSS Line Hover Styles collection](https://github.com/codrops/LineHoverStyles) by Codrops. 