# Portfolio Development Rules

## Page Structure Requirements

### Footer Component

Every page in the portfolio must include the Footer component which contains:
- The "Let's Connect" section with social links
- Copyright footer

```jsx
// Required import for every page
import Footer from "../components/Footer";

// Inside your page component's return statement
<Footer />
```

### Implementation Requirements

1. The Footer component should be the last element before closing the main container of each page
2. No page should have its own implementation of the footer elements
3. Any changes to the footer should be made in the centralized Footer component

## Code Style Guidelines

1. Always use Next.js built-in components (Link, Image, etc.) instead of HTML equivalents
2. Follow the established design patterns in the existing codebase
3. Use TypeScript for all new components and pages
4. Follow the established naming conventions for components and files
5. Implement proper error boundaries using Next.js error handling

## Project Structure

- Place all reusable UI components in the `app/components` directory
- Keep page-specific components within their respective page directories
- Use Next.js file-based routing conventions
- Follow Next.js app directory structure for layouts and pages

## Performance Considerations

- Use Next.js image optimization
- Implement code splitting where appropriate
- Minimize client-side JavaScript
- Apply proper caching strategies 