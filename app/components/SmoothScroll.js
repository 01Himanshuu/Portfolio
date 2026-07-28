'use client';

import ScrollEngine from './ScrollEngine';

/**
 * SmoothScroll — Lenis smooth scrolling & GSAP ScrollTrigger sync wrapper
 * Delegates to ScrollEngine and MasterTimeline for cinematic scroll choreography
 */
export default function SmoothScroll({ children }) {
  return <ScrollEngine>{children}</ScrollEngine>;
}
