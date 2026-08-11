'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * DynamicBackgroundEngine — Evolving cinematic background atmosphere across sections
 *
 * RULES STRICTLY FOLLOWED:
 * 1. ZERO layout redesign, ZERO spacing changes, ZERO modifications to locked files.
 * 2. Position: fixed, pointer-events: none, z-index: 1 (sits behind content without affecting layout).
 * 3. Hero & Introduction remain completely untouched (0 opacity).
 * 4. Atmospheres evolve smoothly between sections:
 *    - Engineering (#build): Cyan atmosphere
 *    - Creator (#create): Purple atmosphere
 *    - Merge (#merge): Combined cyan + purple atmosphere
 *    - Contact (#contact): Minimal calm background
 * 5. Hardware-accelerated GPU transforms & opacity for 60 FPS.
 */
export default function DynamicBackgroundEngine() {
  const containerRef = useRef(null);
  const cyanLayerRef = useRef(null);
  const purpleLayerRef = useRef(null);
  const combinedLayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    let timelines = [];

    const initBackgroundEngine = () => {
      const cyan = cyanLayerRef.current;
      const purple = purpleLayerRef.current;
      const combined = combinedLayerRef.current;

      const twoWorlds = document.querySelector('#two-worlds-gateway');
      const build = document.querySelector('#build');
      const create = document.querySelector('#create');
      const merge = document.querySelector('#merge');
      const contact = document.querySelector('#contact');

      if (!cyan || !purple || !combined) return;

      // Set initial state: completely transparent during Hero and Introduction
      gsap.set([cyan, purple, combined], {
        opacity: 0,
        scale: 0.85,
        willChange: 'transform, opacity',
        force3D: true,
      });

      // 1. Enter Two Worlds Gateway -> Subtle dual hint
      if (twoWorlds) {
        const tlTwoWorlds = gsap.timeline({
          scrollTrigger: {
            trigger: twoWorlds,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 0.6,
          },
        });
        tlTwoWorlds
          .to(cyan, { opacity: 0.18, scale: 0.95, x: '-15%', duration: 1 }, 0)
          .to(purple, { opacity: 0.18, scale: 0.95, x: '15%', duration: 1 }, 0);
        timelines.push(tlTwoWorlds);
      }

      // 2. Engineering (#build) -> CYAN ATMOSPHERE
      if (build) {
        const tlBuild = gsap.timeline({
          scrollTrigger: {
            trigger: build,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
          },
        });
        tlBuild
          .to(cyan, { opacity: 0.75, scale: 1.15, x: '-5%', y: '5%', duration: 1 }, 0)
          .to(purple, { opacity: 0.08, scale: 0.85, x: '25%', duration: 1 }, 0)
          .to(combined, { opacity: 0, scale: 0.9, duration: 1 }, 0);
        timelines.push(tlBuild);
      }

      // 3. Creator (#create) -> PURPLE ATMOSPHERE
      if (create) {
        const tlCreate = gsap.timeline({
          scrollTrigger: {
            trigger: create,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
          },
        });
        tlCreate
          .to(cyan, { opacity: 0.08, scale: 0.85, x: '-25%', duration: 1 }, 0)
          .to(purple, { opacity: 0.78, scale: 1.15, x: '5%', y: '-5%', duration: 1 }, 0)
          .to(combined, { opacity: 0, scale: 0.9, duration: 1 }, 0);
        timelines.push(tlCreate);
      }

      // 4. Merge (#merge) -> COMBINED ATMOSPHERE
      if (merge) {
        const tlMerge = gsap.timeline({
          scrollTrigger: {
            trigger: merge,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
          },
        });
        tlMerge
          .to(cyan, { opacity: 0.45, scale: 1.05, x: '-18%', y: '0%', duration: 1 }, 0)
          .to(purple, { opacity: 0.45, scale: 1.05, x: '18%', y: '0%', duration: 1 }, 0)
          .to(combined, { opacity: 0.88, scale: 1.2, duration: 1 }, 0);
        timelines.push(tlMerge);
      }

      // 5. Contact (#contact) -> MINIMAL BACKGROUND
      if (contact) {
        const tlContact = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
        tlContact
          .to(cyan, { opacity: 0.05, scale: 0.9, x: '0%', duration: 1 }, 0)
          .to(purple, { opacity: 0.05, scale: 0.9, x: '0%', duration: 1 }, 0)
          .to(combined, { opacity: 0.08, scale: 0.9, duration: 1 }, 0);
        timelines.push(tlContact);
      }

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initBackgroundEngine, 200);

    return () => {
      clearTimeout(timer);
      timelines.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Cyan Atmosphere Layer — Electric Cyan & Neon Blue (#00F0FF, #0077FF) */}
      <div
        ref={cyanLayerRef}
        className="absolute -top-32 -left-32 w-[750px] h-[750px] rounded-full opacity-0 pointer-events-none transition-opacity"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(0, 119, 255, 0.12) 45%, transparent 70%)',
          filter: 'blur(110px)',
        }}
      />

      {/* 2. Purple Atmosphere Layer — Magenta & Violet (#C084FC, #A855F7) */}
      <div
        ref={purpleLayerRef}
        className="absolute -bottom-32 -right-32 w-[750px] h-[750px] rounded-full opacity-0 pointer-events-none transition-opacity"
        style={{
          background:
            'radial-gradient(circle, rgba(192, 132, 252, 0.25) 0%, rgba(168, 85, 247, 0.14) 45%, transparent 70%)',
          filter: 'blur(110px)',
        }}
      />

      {/* 3. Combined Atmosphere Layer — Iridescent Cyan + Purple Synthesis */}
      <div
        ref={combinedLayerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full opacity-0 pointer-events-none transition-opacity"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.26) 0%, rgba(0, 240, 255, 0.18) 40%, rgba(232, 121, 249, 0.12) 65%, transparent 80%)',
          filter: 'blur(130px)',
        }}
      />
    </div>
  );
}
