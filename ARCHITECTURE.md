# Portfolio Architecture & Guidelines

This document outlines the architectural decisions, folder structure, and coding standards for the portfolio project.

## 1. Folder Structure

We follow a clean separation of concerns, moving away from a flat `components/` folder.

```
app/
├── components/
│   ├── ui/               # Atomic, reusable UI elements (Buttons, Inputs, Badges)
│   ├── visuals/          # Complex visual/animation components (Parallax, Charts)
│   ├── layout/           # Structural components (Nav, Footer, Container)
│   └── CaseStudyRenderer.tsx # The engine that converts JSON to React
├── data/
│   ├── case-studies/     # JSON content files for each project
│   ├── projects.ts       # Main project metadata registry
│   └── portfolio-config.ts # Global theme configuration
└── work/[project]/       # Dynamic route for project pages
```

## 2. Component Guidelines

### UI Components (`components/ui/`)
*   **Must be generic:** Never hardcode project-specific data (e.g., "Swapp") into a UI component.
*   **Props-driven:** Use props for content, colors, and variants.
*   **Example:** `Button.tsx` accepts `variant="primary" | "outline"`.

### Visual Components (`components/visuals/`)
*   **Reusable wrappers:** Components like `ParallaxPhones.tsx` should accept an array of images, not hardcoded paths.
*   **Animation logic:** Keep complex Framer Motion logic here to keep page files clean.

## 3. JSON-Driven Case Studies

We use a "Modern Narrative" format in our JSON files.

### Structure
```json
{
  "id": "project-id",
  "mainHeadline": "Strong Impact Statement",
  "sections": [
    {
      "title": "Section Title",
      "content": [
         { "type": "paragraph", "text": "..." },
         { "type": "image", "src": "..." },
         { "type": "custom_component", "name": "ParallaxPhones", "props": { ... } } 
      ]
    }
  ]
}
```
*Note: The `custom_component` feature is the target state for handling animations dynamically.*

## 4. Coding Rules

1.  **Strict Typing:** Always define `interface Props` for components.
2.  **No Hardcoded "Magic Strings":** Use constants or the `portfolio-config.ts` for colors and recurring values.
3.  **Mobile First:** Always test UI changes on mobile breakpoints (`md:`, `lg:`).
4.  **Clean Imports:** Avoid circular dependencies. Group imports by standard lib, 3rd party, and local.

## 5. Workflow for New Case Studies

1.  **Content First:** Create the JSON file in `app/data/case-studies/`.
2.  **Register Project:** Add the entry to `app/data/projects.ts` (ensure it allows the new JSON format).
3.  **Add Visuals:** Place images in `public/images/[project]/`.
4.  **Custom Components (If needed):** Create a generic visual component in `components/visuals/` and integrate it via the renderer.
