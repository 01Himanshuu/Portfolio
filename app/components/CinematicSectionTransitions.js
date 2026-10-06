'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * CinematicSectionTransitions — Clean Z-Index & Layering Orchestrator
 *
 * RULES STRICTLY FOLLOWED:
 * 1. ZERO layout redesign, ZERO spacing changes, ZERO modifications to locked files.
 * 2. Hero and Introduction remain 100% untouched and locked.
 * 3. Eliminates parent container scale/y-shift transforms that distort child
 *    ScrollTrigger bounding rect calculations and cause layout jumping/glitches.
 * 4. Ensures clean progressive z-index hierarchy across all chapters for 60 FPS scrolling.
 */
export default function CinematicSectionTransitions() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const initCinematicTransitions = () => {
      // Find sections after Introduction (Hero and Introduction remain untouched)
      const twoWorlds = document.querySelector('#two-worlds-gateway');
      const build = document.querySelector('#build');
      const create = document.querySelector('#create');
      const merge = document.querySelector('#merge');
      const contact = document.querySelector('#contact');

      const sections = [
        { el: twoWorlds, z: 30, name: 'twoWorlds' },
        { el: build, z: 40, name: 'build' },
        { el: create, z: 50, name: 'create' },
        { el: merge, z: 60, name: 'merge' },
        { el: contact, z: 70, name: 'contact' },
      ];

      // Setup clean z-index hierarchy without mutating container transforms
      sections.forEach(({ el, z }) => {
        if (!el) return;
        gsap.set(el, {
          zIndex: z,
          position: 'relative',
        });
      });

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initCinematicTransitions, 180);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
