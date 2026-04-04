# Category Page Redesign

Transform the category page (`/category/[id]`) to match the premium, minimal aesthetic shown in the reference image.

## User Review Required

> [!IMPORTANT]
> The new design is a "Hero-focused" layout that emphasizes a single product image over a large background title. This is a significant departure from the current multi-section layout.

## Proposed Changes

### [MODIFY] [CategoryPage](file:///c:/MIB/rafah-garden/src/app/category/[id]/page.tsx)
- **High-Impact Hero Section**:
    - **Background**: Set to `category.bgColor`.
    - **Large Text Overlay**: Render the category title or ID in massive, bold, white typography (using `font-avant`) behind the product image.
    - **Centered Product**: Position `category.image` centered and overlapping the background text.
- **New UI Elements**:
    - **Right Side Variations**: Add a vertical list of circular buttons representing different sizes or variations (e.g., 500ML, 250ML).
    - **Bottom-Left Content**: Re-position the subtitle, description, and "See More" button (styled as a white pill).
    - **Bottom-Right Scroll**: Add a circular "Scroll Down" indicator.
- **Refined Navigation**:
    - Update the custom `Navbar` on this page to use minimal white text links and icons to match the reference image's clean aesthetic.

## Open Questions

- **Variation Data**: Since the current data doesn't have "sizes" or "volumes", should I use placeholders like "500ML", "250ML"?
- **Scroll Functionality**: Should the "Scroll Down" button link to a specific section below or just be a decorative element for now?

## Verification Plan

### Manual Verification
- [ ] View various categories on mobile and desktop to ensure the centered product layout is responsive.
- [ ] Test that the "See More" and "Scroll Down" buttons are accessible.
- [ ] Verify the large background text accurately reflects the category title.
