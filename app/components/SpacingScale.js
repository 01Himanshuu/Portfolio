'use client';

/**
 * SpacingScale — Unified Portfolio Spacing System
 *
 * Enforces a limited spacing scale across all sections based on an 8-point / 4-point grid.
 * Normalizes vertical section padding, header margins, grid gaps, card padding, and element spacing
 * without altering layout structures or visual composition:
 *
 * 1. SECTION_PADDING     - Standardized vertical breathing room for every major section (96px / 144px)
 * 2. HEADER_MARGIN       - Standard distance below section introduction block to main content (64px)
 * 3. GRID_GAP_LARGE      - Standard gap between major 2-column cards / feature grids (32px / 48px)
 * 4. GRID_GAP_MEDIUM     - Standard gap between smaller secondary grid items (24px)
 * 5. CARD_PADDING_LARGE  - Standard padding inside large journey cards and project windows (32px / 40px)
 * 6. CARD_PADDING_MEDIUM - Standard padding inside medium panels and secondary cards (24px / 32px)
 * 7. BADGE_MARGIN        - Standard spacing below section number badges (24px)
 * 8. TITLE_MARGIN        - Standard spacing below main section headings (24px)
 */

export const SPACING_SCALE = {
  SECTION_PADDING: 'py-24 md:py-36',
  HEADER_MARGIN: 'mb-16',
  GRID_GAP_LARGE: 'gap-8 lg:gap-12',
  GRID_GAP_MEDIUM: 'gap-6',
  CARD_PADDING_LARGE: 'p-8 md:p-10',
  CARD_PADDING_MEDIUM: 'p-6 md:p-8',
  BADGE_MARGIN: 'mb-6',
  TITLE_MARGIN: 'mb-6',
};

export default SPACING_SCALE;
