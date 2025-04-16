# Portfolio Dark Mode Implementation

This document explains how the dark mode system works in this portfolio project.

## Core Technology

The theming system uses:

1. **CSS Variables** - All colors are defined as CSS variables in `globals.css`
2. **Media Queries** - Automatic system preference detection
3. **Theme Classes** - Manual theme switching via `dark-theme` and `light-theme` classes

## Key Files

- **globals.css** - Contains all theme variables and classes
- **ThemeToggle.tsx** - Component for manual theme switching
- **Navbar.tsx** - Integrates the theme toggle
- **WorkCard.tsx** - Uses theme-aware styling for project cards
- **app/data/projects.ts** - Contains project-specific colors for both themes

## CSS Variables

The following CSS variables are used throughout the application:

```css
:root {
  /* Core theme colors */
  --background: #ffffff;        /* Main background color */
  --foreground: #121212;        /* Main text color */
  --link-color: #121212;        /* Link text color */
  --link-hover-color: #4f46e5;  /* Link hover color */
  --card-bg: #f3f4f6;           /* Card background color */
  --card-hover-bg: #e5e7eb;     /* Card hover background */
  --navbar-bg: rgba(255, 255, 255, 0.9); /* Navbar background */
  --navbar-text: #121212;       /* Navbar text color */
  --border-color: #e5e7eb;      /* Border color for dividers */
  --box-shadow: ...;            /* Box shadow for elevated elements */
  --theme-transition: ...;      /* Transition for smooth theme switching */
  
  /* Dark theme gradient */
  --bg-dark: linear-gradient(180deg, #3F272A 0%, #101218 100%);
  
  /* Project-specific backgrounds */
  --bg-cinefatic: #CAC2FF;      /* Light mode */
  --bg-swapp: #FFD6D6;          /* Light mode */
  --bg-retailo: #FFF2CC;        /* Light mode */
  --bg-rider-app: #CCE5FF;      /* Light mode */
}

.dark-theme {
  /* Core theme colors for dark mode */
  --background: #121212;
  --foreground: #e5e7eb;
  /* ... other dark mode variables ... */
  
  /* Dark theme gradient */
  --bg-dark: linear-gradient(180deg, #3F272A 0%, #101218 100%);
  
  /* Project-specific backgrounds - Dark */
  --bg-cinefatic: #3B1F2E;
  --bg-swapp: #8A293E;
  --bg-retailo: #093B08;
  --bg-rider-app: #333793;
}
```

## Dark Mode Gradient

The dark mode applies a gradient background to the entire page:

```css
.dark-theme body {
  background: var(--bg-dark);
  background-attachment: fixed;
}
```

## Project-Specific Colors

Each project card has:
- Light theme color and hover color
- Dark theme color and hover color

This is implemented in the `WorkCard` component which detects the current theme and applies the appropriate colors.

## How to Use

### Automatic Theme Detection

The site automatically detects the user's system preference via:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode variables */
  }
}
```

### Manual Theme Switching

The `ThemeToggle` component provides manual theme switching by:

1. Toggling between `dark-theme` and `light-theme` classes on the document
2. The appropriate CSS variables are applied via these classes

### Default Theme

The site uses dark mode by default by adding the `dark-theme` class to the html element:

```jsx
<html lang="en" className="dark-theme">
```

## Adding New Theme-Aware Components

When creating new components:

1. Always use CSS variables for colors, never hardcode values
2. Use `var(--variable-name)` in your styles
3. Test in both light and dark modes
4. For components that need theme awareness, check for dark mode using:
   ```jsx
   const isDarkThemeClass = document.documentElement.classList.contains('dark-theme');
   ```

## Transitions

Theme transitions are handled by the `--theme-transition` variable to ensure smooth switching between themes.

## Future Improvements

Potential improvements for the theming system:

1. Add more theme colors beyond just light/dark (e.g., sepia, high contrast)
2. Persist theme preference in localStorage
3. Add animations for theme transitions
4. Support for specific component theme overrides 