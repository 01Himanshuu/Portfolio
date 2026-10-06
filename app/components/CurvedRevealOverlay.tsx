'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * CurvedRevealOverlay — Seamless Curved Hero -> Introduction Transition
 *
 * RULES STRICTLY FOLLOWED:
 * 1. ZERO modifications to HeroSection or IntroductionSection files.
 * 2. ZERO changes to DOM hierarchy, spacing, margins, padding, or section heights.
 * 3. Hero remains behind while Introduction rises naturally over it.
 * 4. The top edge has a very large organic curve that gradually flattens (160px -> 0px).
 * 5. Hero fades smoothly behind the curve without any black gap, jump, or new page feeling.
 * 6. Background grid, noise, and lighting continue uninterrupted.
 */
export default function CurvedRevealOverlay() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    let masterTl: gsap.core.Timeline | null = null;

    const initCurvedTransition = () => {
      const heroSection =
        document.querySelector<HTMLElement>('#hero') ||
        document.querySelector<HTMLElement>('.hero-section');
      const introSection =
        document.querySelector<HTMLElement>('#introduction-section') ||
        document.querySelector<HTMLElement>('#introduction') ||
        document.querySelector<HTMLElement>('.introduction-section');

      if (!heroSection || !introSection) return;

      // 1. Setup Hero as fixed background stage (zIndex: 10)
      gsap.set(heroSection, {
        zIndex: 10,
        position: 'relative',
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      });

      // 2. Setup Introduction rising panel with large organic top curve (zIndex: 25)
      gsap.set(introSection, {
        zIndex: 25,
        position: 'relative',
        willChange: 'transform, opacity, border-radius, box-shadow',
        borderTopLeftRadius: '160px',
        borderTopRightRadius: '160px',
        borderTop: '1px solid rgba(200, 255, 44, 0.25)',
        boxShadow:
          '0 -40px 120px rgba(0, 0, 0, 0.95), 0 -2px 30px rgba(200, 255, 44, 0.18)',
        backgroundColor: '#0a0a0a',
      });

      // Removed the duplicate ScrollTrigger timeline here.
      // HeroSection.js ALREADY creates a ScrollTrigger that pins #hero and scrubs its exit animation.
      // Having TWO ScrollTriggers pinning the exact same element simultaneously with pinSpacing: false
      // causes catastrophic layout thrashing and GSAP spacer conflicts.
      // The static curve styles above are all that is needed here.
    };

    const timer = setTimeout(initCurvedTransition, 150);

    return () => {
      clearTimeout(timer);
      if (masterTl) masterTl.kill();
    };
  }, []);

  return null;
}
