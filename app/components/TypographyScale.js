'use client';

/**
 * TypographyScale — Unified Portfolio Typography System
 *
 * Defines and normalizes font sizes, line heights, spacing, and weights
 * across 8 distinct hierarchy levels without changing font families or designs:
 *
 * 1. HERO_TITLE    - Large architectural hero title on landing page
 * 2. SECTION_TITLE - Main h2 headings across Two Worlds, Build, Create, Merge, Collaborate
 * 3. CARD_TITLE    - h3 card titles inside journey cards and project windows
 * 4. SUBTITLE      - Section descriptions and subheadings
 * 5. BODY          - Paragraph and card description text
 * 6. CAPTION       - Monospace tags, timestamps, and metadata captions
 * 7. BUTTONS       - Action buttons, interactive navigation links, and triggers
 * 8. LABELS        - Monospace section badges and eyebrow labels
 */

export const TYPOGRAPHY_SCALE = {
  HERO_TITLE:
    'font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight uppercase',

  SECTION_TITLE:
    'font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase',

  CARD_TITLE:
    'font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl leading-[1.2] tracking-tight',

  SUBTITLE:
    'font-sans font-light text-base sm:text-lg md:text-xl leading-relaxed tracking-normal',

  BODY:
    'font-sans font-light text-sm sm:text-base leading-relaxed tracking-normal',

  CAPTION:
    'font-mono font-normal text-xs sm:text-sm leading-normal tracking-wider uppercase',

  BUTTON:
    'font-mono font-medium text-xs sm:text-sm leading-none tracking-widest uppercase',

  LABEL:
    'font-mono font-normal text-xs leading-none tracking-[0.3em] uppercase',
};

export default TYPOGRAPHY_SCALE;
