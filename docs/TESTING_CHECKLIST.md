# Production Testing Checklist

This checklist helps verify that the portfolio website is working correctly in production on GitHub Pages.

## Basic Functionality Tests

- [ ] **Homepage**
  - [ ] Loads without errors
  - [ ] All images load correctly
  - [ ] Navigation works
  - [ ] All sections visible and formatted correctly

- [ ] **Case Studies**
  - [ ] All case study links work
  - [ ] Case study detail pages load correctly
  - [ ] All images in case studies load correctly
  - [ ] Navigation between case studies works

- [ ] **Navigation**
  - [ ] Main navigation links work
  - [ ] Back to top functionality works (if implemented)
  - [ ] Footer links work correctly

## Asset Loading Tests

- [ ] **Images**
  - [ ] Check browser console for 404 errors
  - [ ] Verify all images in project cards load
  - [ ] Verify all case study images load
  - [ ] Check favicon loads correctly

- [ ] **Fonts**
  - [ ] All custom fonts load correctly
  - [ ] Font fallbacks work if custom fonts are slow to load
  - [ ] No FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text)

- [ ] **CSS & JavaScript**
  - [ ] All styles load correctly
  - [ ] Interactive elements work (hover states, animations, etc.)
  - [ ] No JavaScript errors in console

## Path-Specific Tests

- [ ] **Absolute URL Tests**
  - [ ] Direct navigation to https://faizann7.github.io/portfoliooo/ works
  - [ ] Direct navigation to https://faizann7.github.io/portfoliooo/work works
  - [ ] Direct navigation to case study pages works

- [ ] **Relative Navigation Tests**
  - [ ] Click navigation from homepage to case studies works
  - [ ] Click navigation from one case study to another works
  - [ ] Back button works correctly

## SEO & Meta Tests

- [ ] **SEO Basics**
  - [ ] Title tags set correctly
  - [ ] Meta descriptions present
  - [ ] Canonical URLs correctly set to GitHub Pages URL

- [ ] **Open Graph Tags**
  - [ ] OG title, description, and image set correctly
  - [ ] Twitter card tags present and correctly set

- [ ] **Structured Data**
  - [ ] Valid JSON-LD for portfolio projects
  - [ ] No structured data errors

## Performance Tests

- [ ] **Lighthouse Audit**
  - [ ] Run Lighthouse audit on homepage (aim for 90+ in all categories)
  - [ ] Run Lighthouse audit on a case study page
  - [ ] Address any critical issues found

- [ ] **Mobile Performance**
  - [ ] Test loading times on mobile (or mobile emulation)
  - [ ] Verify responsive behavior on different screen sizes

## Accessibility Tests

- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] Focus states visible and clear
  - [ ] No keyboard traps

- [ ] **Heading Structure**
  - [ ] Proper heading hierarchy (h1 -> h2 -> h3, etc.)
  - [ ] No skipped heading levels
  - [ ] Appropriate heading usage for content sections

- [ ] **Color Contrast**
  - [ ] Text has sufficient contrast with background
  - [ ] Interactive elements have sufficient contrast
  - [ ] Hover/focus states maintain good contrast

- [ ] **Screen Reader Testing**
  - [ ] Alt text for all images
  - [ ] ARIA labels where appropriate
  - [ ] Logical reading order

## Analytics Tests

- [ ] **Google Analytics**
  - [ ] Verify GA is loading correctly
  - [ ] Page views are being tracked
  - [ ] Navigate between pages and confirm tracking

## Cross-Browser Testing

- [ ] **Desktop Browsers**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Mobile Browsers**
  - [ ] iOS Safari
  - [ ] Android Chrome

## GitHub Pages Specific Tests

- [ ] **Asset Paths**
  - [ ] Check network requests for 404 errors related to missing `/portfoliooo/` prefix
  - [ ] Ensure all resources load from the correct GitHub Pages URLs

- [ ] **Static Export Limitations**
  - [ ] Verify client-side routing works with static export
  - [ ] Confirm SearchParamsProvider is working correctly

## After Testing

- [ ] Document any issues found
- [ ] Prioritize fixes based on severity
- [ ] Create GitHub issues for tracking if needed
- [ ] Plan follow-up improvements based on testing results 