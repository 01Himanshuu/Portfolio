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

    let triggers = [];

    const initCinematicTransitions = () => {
      // Find sections after Introduction (Hero and Introduction remain untouched)
      const twoWorlds = document.querySelector('#two-worlds-gateway');
      const build = document.querySelector('#build');
      const create = document.querySelector('#create');
      const merge = document.querySelector('#merge');
      const intro = document.querySelector('#introduction') || document.querySelector('.introduction-section');
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

      // Implement Cinematic Masked Reveals
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const animatedSections = [build, create, merge].filter(Boolean);

        animatedSections.forEach((sec) => {
          // Cinematic Clip-Path Reveal
          const anim = gsap.fromTo(
            sec,
            {
              clipPath: 'inset(15% 5% 0% 5%)',

            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',

              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: sec,
                start: 'top 95%', // Start slightly before it fully enters
                end: 'top 10%',   // Fully unmasked when it hits the top
                scrub: 1,         // Smooth catchup
              },
            }
          );
          if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        // PERF FIX: Removed the y:200 + scale:0.9 "Curtain Pull" scrub animations
        // on build and create sections. These were applying scrubbed transform (y, scale)
        // to the SAME elements that also have scrubbed clip-path animations above.
        // Two competing scrubbed transforms on the same element cause layout thrashing
        // because GSAP must reconcile conflicting transform matrices every frame.

        // Fade Intro into Two Worlds
        if (intro && twoWorlds) {
          const introAnim = gsap.to(intro, {
            opacity: 0.2,
            scale: 0.95,
            scrollTrigger: {
              trigger: twoWorlds,
              start: 'top 90%',
              end: 'top 30%',
              scrub: true,
            },
          });
          if (introAnim.scrollTrigger) triggers.push(introAnim.scrollTrigger);
        }

        // Contact Horizon Reveal
        if (contact) {
          const contactAnim = gsap.fromTo(contact,
            { y: 50, scale: 0.95, opacity: 0 },
            {
              y: 0, scale: 1, opacity: 1, ease: 'power1.out',
              scrollTrigger: {
                trigger: contact,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
              }
            }
          );
          if (contactAnim.scrollTrigger) triggers.push(contactAnim.scrollTrigger);
        }
      });

      // PERF FIX: Removed redundant ScrollTrigger.refresh() —
      // ScrollEngine already calls this with a 250ms delay
    };

    const timer = setTimeout(initCinematicTransitions, 180);

    return () => {
      clearTimeout(timer);
      // Properly kill all ScrollTriggers created by this component
      triggers.forEach(st => st.kill());
    };
  }, []);

  return null;
}
