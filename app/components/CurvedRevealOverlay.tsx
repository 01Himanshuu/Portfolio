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

      // 3. Create ONE ScrollTrigger timeline
      // pinSpacing: false ensures ZERO blank spacer and ZERO extra scroll distance.
      // Introduction sits immediately after Hero in standard DOM flow.
      masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // A. Hero fades and scales slightly behind the rising curved edge (0% to 80% of scroll)
      masterTl.to(
        heroSection,
        {
          scale: 0.95,
          opacity: 0.3,
          filter: 'blur(6px)',
          ease: 'power2.out',
          duration: 0.8,
        },
        0
      );

      // B. Top edge organic curve gradually flattens to 0px as Intro reaches center (30% to 90% of scroll)
      masterTl.to(
        introSection,
        {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderTopColor: 'rgba(200, 255, 44, 0)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          ease: 'power2.inOut',
          duration: 0.6,
        },
        0.3
      );

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initCurvedTransition, 150);

    return () => {
      clearTimeout(timer);
      if (masterTl) masterTl.kill();
    };
  }, []);

  return null;
}
