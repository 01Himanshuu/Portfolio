'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * MasterTimeline — Haoqi.design 100% Seamless Continuous Curved Horizon Transition
 *
 * BUG FIX APPLYING:
 * 1. ZERO FULLSCREEN BLACK BOX:
 *    Instead of a position: fixed 100vw x 100vh black screen that covered subsequent sections,
 *    we create a position: absolute 160px curved arch banner placed in document.body exactly at
 *    the top edge of the Introduction section (introSection.offsetTop - 158px).
 * 2. NATURAL SCROLLING:
 *    Because it is position: absolute (not fixed) and only 160px tall, when you scroll down past
 *    Introduction to TwoWorldsGateway, it scrolls up and away cleanly! It NEVER blocks or covers
 *    the viewport.
 * 3. ZERO overflow:hidden CLIPPING:
 *    Because it lives in document.body, Introduction's overflow:hidden does not clip it.
 * 4. ZERO DOUBLE-PINNING:
 *    HeroSection.js already pins #hero. We do NOT call pin: true here.
 */
export default function MasterTimeline() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    let masterTl = null;

    const initSeamlessCurveTransition = () => {
      const heroSection =
        document.querySelector('#hero') || document.querySelector('.hero-section');
      const introSection =
        document.querySelector('#introduction-section') ||
        document.querySelector('#introduction') ||
        document.querySelector('.introduction-section');

      if (!heroSection || !introSection) return;

      // 1. Remove any existing transition arch banner
      const existingCurtain = document.getElementById('seamless-curve-transition');
      if (existingCurtain) existingCurtain.remove();

      // 2. Calculate exact top edge of Intro in absolute document coordinates
      const introTop = introSection.getBoundingClientRect().top + window.scrollY;

      // 3. Create absolute-layer SVG Curved Arch in document.body (160px tall, NOT 100vh!)
      const curtainEl = document.createElement('div');
      curtainEl.id = 'seamless-curve-transition';
      curtainEl.style.cssText = `
        position: absolute;
        top: ${introTop - 158}px;
        left: 0;
        width: 100%;
        height: 160px;
        pointer-events: none;
        z-index: 35;
        overflow: hidden;
        will-change: transform;
      `;
      curtainEl.innerHTML = `
        <svg class="w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="seamless-curve-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(0,0,0,0)" />
              <stop offset="35%" stop-color="rgba(192,132,252,0.6)" />
              <stop offset="65%" stop-color="rgba(217,70,239,0.6)" />
              <stop offset="100%" stop-color="rgba(0,0,0,0)" />
            </linearGradient>
            <filter id="seamless-curve-blur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <!-- Organic curved top arch that fills with #0a0a0a (identical to intro bg) -->
          <path
            id="seamless-curve-path"
            d="M 0 160 Q 720 0 1440 160 L 1440 160 L 0 160 Z"
            fill="#0a0a0a"
            stroke="url(#seamless-curve-glow)"
            stroke-width="3"
            filter="url(#seamless-curve-blur)"
          />
        </svg>
      `;
      document.body.appendChild(curtainEl);

      const curvePath = document.getElementById('seamless-curve-path');

      // 4. Ensure Intro has z-index 30
      gsap.set(introSection, {
        zIndex: 30,
        position: 'relative',
      });

      // 5. ONE GSAP timeline synchronized with HeroSection's scroll range (NO double pin!)
      masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '+=90%',
          scrub: true,
        },
      });

      // ====================================================================================
      // CURVE FLATTENS AS IT REACHES THE TOP OF VIEWPORT (40% -> 90% scroll progress)
      // Morphs from massive 160px organic curve to 100% flat horizontal line at 0px
      // ====================================================================================
      if (curvePath) {
        masterTl.fromTo(
          curvePath,
          {
            attr: { d: 'M 0 160 Q 720 0 1440 160 L 1440 160 L 0 160 Z' },
          },
          {
            attr: { d: 'M 0 0 Q 720 0 1440 0 L 1440 160 L 0 160 Z' },
            ease: 'power2.out',
            duration: 0.9,
          },
          0.1
        );
      }

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initSeamlessCurveTransition, 150);

    // Re-sync position on resize
    const handleResize = () => {
      initSeamlessCurveTransition();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (masterTl) masterTl.kill();
      const existingCurtain = document.getElementById('seamless-curve-transition');
      if (existingCurtain) existingCurtain.remove();
    };
  }, []);

  return null;
}
