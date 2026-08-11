/**
 * Motion — Design System Motion Constants
 *
 * Single source of truth for all GSAP easing, durations, and scroll config.
 * Import these instead of hardcoding cubic-bezier strings per component.
 *
 * Usage:
 *   import { EASE, DURATION, SCRUB, STAGGER } from '../ds/motion';
 *   gsap.to(el, { y: 0, duration: DURATION.normal, ease: EASE.standard });
 */

// ─── Easing Curves ────────────────────────────────────────────────
// These match the CSS custom properties defined in globals.css
export const EASE = {
  /** General UI transitions — snappy start, smooth settle */
  standard: 'power3.out',
  /** Scroll reveals, large elements — cinematic deceleration */
  dramatic: 'power4.out',
  /** Tiny interactions, hover states — gentle */
  micro: 'power2.out',
  /** Scrub-linked animations — linear for smooth scroll tracking */
  scrub: 'none',
  /** Enter from depth — scale + fade combo */
  enter: 'power3.out',
  /** Exit into depth — accelerating departure */
  exit: 'power2.in',
};

// ─── Durations (seconds for GSAP) ──────────────────────────────────
export const DURATION = {
  /** Instant micro-feedback */
  fast: 0.15,
  /** Standard hover/toggle transitions */
  normal: 0.3,
  /** Comfortable entrance animations */
  slow: 0.6,
  /** Dramatic scroll reveals, large typography */
  dramatic: 1.0,
  /** Hero-level scene transitions */
  scene: 1.4,
};

// ─── Scroll-linked defaults ────────────────────────────────────────
export const SCRUB = {
  /** Smooth scrub interpolation for atmospheric shifts */
  smooth: 0.6,
  /** Tight scrub for typography reveals */
  tight: 0.3,
  /** One-to-one scrub for pinned sections */
  direct: true,
};

// ─── Stagger presets ───────────────────────────────────────────────
export const STAGGER = {
  /** Word-by-word reveal */
  word: 0.06,
  /** Line-by-line paragraph reveal */
  line: 0.12,
  /** Card/element sequential entrance */
  element: 0.15,
  /** Section children cascade */
  section: 0.2,
};

// ─── ScrollTrigger presets ─────────────────────────────────────────
// Use these as spread objects in ScrollTrigger configs
export const TRIGGER = {
  /** Standard section entrance — plays once */
  enterOnce: {
    start: 'top 80%',
    once: true,
  },
  /** Viewport-centered trigger */
  centered: {
    start: 'top center',
    once: true,
  },
  /** Full scrub through a section */
  fullScrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: SCRUB.smooth,
  },
  /** Pin section for scroll-driven experience */
  pinned: {
    start: 'top top',
    pin: true,
    scrub: SCRUB.direct,
  },
};
