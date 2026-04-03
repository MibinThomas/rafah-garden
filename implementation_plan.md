# Implementation Plan - Modern Category-Based Hero Section

The goal is to replace the current slider hero section with a modern, 4-column category layout inspired by the provided screenshot. Each column will expand on click to reveal specific product details, and the "Dragon Fruit Crush" category will retain the existing hero content style.

## Proposed Changes

### [Component] [Hero Component](file:///c:/MIB/rafah-garden/src/components/Hero.tsx)
#### [MODIFY] [Hero.tsx](file:///c:/MIB/rafah-garden/src/components/Hero.tsx)
- Refactor the component to use a flexbox/grid layout with 4 columns.
- Implement an accordion-style expansion where clicking a category expands it and collapses others.
- **Category 1 (Dragon Fruit Crush)**: When expanded, it will display the animated product bottle, text, and navigation originally present in the hero.
- **Other Categories (Jam, Fruits, Plants)**: Implement unique "expanded" views for each, following the same premium aesthetic.
- Add numbers (01, 02, 03, 04) and "View more" buttons as seen in the mockup.

### [Data] [Category & Product Data](file:///c:/MIB/rafah-garden/src/data/categories.ts)
#### [NEW] [categories.ts](file:///c:/MIB/rafah-garden/src/data/categories.ts)
- Define a new data structure for the 4 categories:
  1. **Dragon Fruit Crush**
  2. **Dragon Fruit Jam**
  3. **Fruits**
  4. **Plants**
- Include metadata like background color, accent color, image, description, and number.

### [Pages] [Dynamic Category Pages](file:///c:/MIB/rafah-garden/src/app/category/%5Bid%5D/page.tsx)
#### [NEW] [category/[id]/page.tsx](file:///c:/MIB/rafah-garden/src/app/category/[id]/page.tsx)
- Create a dynamic route to handle each category.
- Each page will feature:
  - High-quality imagery (generated image).
  - Premium layout with Framer Motion animations.
  - Consistent branding with the hero section.

### [Assets] [New Images]
- [Dragon Fruit Jam](file:///C:/Users/Lazim/.gemini/antigravity/brain/edfefb8d-391a-4aa4-bdb8-f58f8bca95be/dragon_fruit_jam_premium_1775225627246.png)
- [Dragon Fruit Plants](file:///C:/Users/Lazim/.gemini/antigravity/brain/edfefb8d-391a-4aa4-bdb8-f58f8bca95be/dragon_fruit_plant_pot_1775225649439.png)
- Existing Bottle Renders for Crush and Fruits.

## Open Questions
- Should the "View more" button in the hero navigate directly to the category page, or should it just trigger the expansion within the hero? (Plan: expansion on column click, button navigates to page).
- Do you want any specific color palette for "Plants" and "Fruits" beyond the standard green/yellow?

## Verification Plan

### Automated Tests
- N/A (Mostly UI focus)

### Manual Verification
- Verify the accordion interaction in the browser using the `browser_subagent`.
- Check responsiveness on mobile (stacking columns vertically).
- Ensure smooth transitions between categories.
- Validate that each "View more" link leads to the correct category page.
