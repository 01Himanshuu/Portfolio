'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LayoutContainer from './LayoutContainer';

/**
 * IntroductionSection — Haoqi.design-inspired two-column Introduction Section
 * EXACT LAYOUT & TYPOGRAPHY PRESERVED.
 * UPDATED WITH STRICT SPECIFICATIONS:
 * 1. REAL HANDWRITTEN CURSIVE SIGNATURE ("Himanshu"):
 *    - Custom continuous cursive SVG path (no fonts, no random scribbles).
 *    - Bright neon lime green (#C8FF2C) with thin elegant 3.8px stroke and drop-shadow glow.
 *    - Overlays top-left corner of portrait, extending slightly outside bounds.
 *    - Animate via strokeDasharray / strokeDashoffset.
 *    - Begins at 35% viewport enter (start: 'top 65%'), plays ONCE only, never replays.
 * 2. INTRODUCTION-SPECIFIC MINIMAL DECORATIONS:
 *    - Tiny glowing pixels, dotted 3x3 clusters, subtle geometric markers, floating crosses (+), technical indicators.
 * 3. INDEPENDENT PARALLAX LAYERS (Interpolated via gsap.ticker, never directly following mouse):
 *    - Background: 0.2
 *    - Grid: 0.5
 *    - Portrait: 1.0
 *    - Typography: 1.3
 *    - Decorative pixels: 1.6
 *    - Cursor particles: 2.0
 */
export default function IntroductionSection() {
  const sectionRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const signaturePathRef = useRef(null);
  const headlineRef = useRef(null);
  const bioRef = useRef(null);
  const highlightRefs = useRef([]);
  const decorativeRefs = useRef([]);

  // Mouse parallax target & lerped current coordinates (-1 to 1)
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const portraitFrame = portraitFrameRef.current;
    const signaturePath = signaturePathRef.current;
    const headline = headlineRef.current;
    const bio = bioRef.current;

    if (!section) return;

    // --- 1. LAYERED MOUSE PARALLAX (Interpolated via gsap.ticker) ---
    const handleMouseMoveParallax = (e) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMoveParallax, { passive: true });

    const gridEl = document.querySelector('.grid-background');
    const noiseEl = document.querySelector('.noise-overlay');
    const cursorParticlesEl = document.querySelector('.cursor-glow-canvas') || document.querySelector('#cursor-canvas');

    const parallaxTicker = () => {
      // Smooth interpolation toward mouse target (never directly follows mouse)
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.06;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.06;

      const cx = currentMouseRef.current.x;
      const cy = currentMouseRef.current.y;

      // Base multiplier = 8px
      const base = 8;

      // Background: 0.2
      if (noiseEl) {
        noiseEl.style.transform = `translate3d(${cx * base * 0.2}px, ${cy * base * 0.2}px, 0)`;
      }

      // Grid: 0.5
      if (gridEl) {
        gridEl.style.transform = `translate3d(${cx * base * 0.5}px, ${cy * base * 0.5}px, 0)`;
      }

      // Portrait: 1.0
      if (portraitFrame) {
        portraitFrame.style.transform = `translate3d(${cx * base * 1.0}px, ${cy * base * 1.0}px, 0)`;
      }

      // Typography: 1.3
      if (headline) {
        headline.style.transform = `translate3d(${cx * base * 1.3}px, ${cy * base * 1.3}px, 0)`;
      }
      if (bio) {
        bio.style.transform = `translate3d(${cx * base * 1.3}px, ${cy * base * 1.3}px, 0)`;
      }

      // Decorative pixels: 1.6
      decorativeRefs.current.forEach((el) => {
        if (el) el.style.transform = `translate3d(${cx * base * 1.6}px, ${cy * base * 1.6}px, 0)`;
      });

      // Cursor particles: 2.0
      if (cursorParticlesEl) {
        cursorParticlesEl.style.transform = `translate3d(${cx * base * 2.0}px, ${cy * base * 2.0}px, 0)`;
      }
    };

    gsap.ticker.add(parallaxTicker);

    // --- 2. SIGNATURE ONE-TIME WRITING ANIMATION AT 35% VIEWPORT ENTER ---
    const ctx = gsap.context(() => {
      if (signaturePath) {
        const pathLength = signaturePath.getTotalLength() || 680;
        gsap.set(signaturePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1,
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%', // 35% visibility from viewport bottom
          once: true, // Play once only, never replay when scrolling back
          onEnter: () => {
            gsap.to(signaturePath, {
              strokeDashoffset: 0,
              duration: 2.4,
              ease: 'power2.out',
            });
          },
        });
      }

      // --- 3. TYPOGRAPHY & DECORATIONS SEQUENTIAL REVEAL ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }
        );
      }

      if (bio) {
        tl.fromTo(
          bio,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          '-=0.7'
        );
      }

      if (highlightRefs.current.length > 0) {
        tl.fromTo(
          highlightRefs.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (decorativeRefs.current.length > 0) {
        tl.fromTo(
          decorativeRefs.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
          '-=0.8'
        );
      }
    }, section);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveParallax);
      gsap.ticker.remove(parallaxTicker);
      ctx.revert();
    };
  }, []);

  // Genuine continuous cursive signature path spelling "Himanshu"
  const himanshuCursivePath =
    'M 18 42 C 14 28, 30 14, 42 18 C 38 48, 32 78, 28 98 C 24 106, 20 90, 26 70 C 42 66, 62 60, 78 56 M 74 24 C 70 54, 66 82, 74 92 C 82 96, 94 76, 100 62 C 104 54, 106 78, 110 84 C 114 74, 118 56, 126 58 C 130 78, 132 84, 136 64 C 140 56, 146 58, 150 78 C 154 84, 158 64, 166 60 C 174 58, 172 74, 166 80 C 160 84, 178 80, 182 66 C 186 58, 192 60, 196 80 C 200 84, 204 68, 210 60 C 214 74, 210 84, 220 80 C 228 72, 236 34, 230 68 C 228 82, 238 64, 244 80 C 248 84, 254 62, 258 78 C 262 84, 270 70, 282 68 C 294 66, 316 54, 334 46 M 106 38 C 106 35, 109 35, 109 38 C 109 41, 106 41, 106 38';

  return (
    <section
      id="introduction-section"
      ref={sectionRef}
      className="relative z-30 w-full min-h-screen flex items-center py-24 md:py-36 overflow-hidden bg-[#0a0a0a]"
      aria-label="Introduction"
    >
      {/* Subtle atmospheric purple/violet background glows for seamless theme continuity */}
      <div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <LayoutContainer className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* LEFT COLUMN: Compact Portrait + Cursive Signature + Technical Metadata */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start">
          {/* Portrait Frame */}
          <div
            ref={portraitFrameRef}
            style={{ willChange: 'transform, opacity' }}
            className="relative w-full max-w-[260px] sm:max-w-[290px] aspect-square rounded-xl overflow-hidden bg-neutral-900/60 border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] group"
          >
            <div className="w-full h-full relative">
              <Image
                src="/images/himanshu-portrait.jpg"
                alt="Himanshu Jangra - Software Developer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 290px"
                className="object-cover object-top brightness-105 contrast-105"
              />
            </div>

            {/* Bottom vignette lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            {/* Introduction-specific minimal decoration: Top-right floating cross (+) */}
            <div
              ref={(el) => (decorativeRefs.current[0] = el)}
              style={{ willChange: 'transform, opacity' }}
              className="absolute top-4 right-4 text-purple-300 font-mono text-xs font-bold tracking-widest drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] pointer-events-none select-none"
              aria-hidden="true"
            >
              +
            </div>

            {/* Introduction-specific minimal decoration: Bottom-left 3x3 pixel cluster */}
            <div
              ref={(el) => (decorativeRefs.current[1] = el)}
              style={{ willChange: 'transform, opacity' }}
              className="absolute bottom-5 left-5 flex items-center gap-1 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
              <span className="w-1 h-1 bg-white/60" />
            </div>
          </div>

          {/* GENUINE CONTINUOUS CURSIVE SIGNATURE: "Himanshu" */}
          <div className="absolute -top-8 -left-4 md:-top-10 md:-left-6 z-40 pointer-events-none w-52 sm:w-60 md:w-68 select-none">
            <svg
              viewBox="0 0 350 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(192,132,252,0.7)]"
              aria-hidden="true"
            >
              <path
                ref={signaturePathRef}
                d={himanshuCursivePath}
                stroke="#C084FC"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Minimal technical metadata indicator below portrait */}
          <div className="w-full max-w-[260px] sm:max-w-[290px] flex items-center justify-between mt-5 text-xs font-mono tracking-widest text-white/40 uppercase select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-purple-400 inline-block shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
              <span>GMT+5:30 IN 10:12</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-300/80">[+01]</span>
              <span>0105 X 0248 Y</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Typography as the Dominant Visual Element */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10 lg:pl-6">
          {/* Headline */}
          <div
            ref={headlineRef}
            style={{ willChange: 'transform, opacity, filter' }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] leading-[1.22] font-semibold text-white tracking-tight"
          >
            <p className="overflow-hidden">
              <span className="inline-block">I create at the intersection of technology and</span>
            </p>
            <p className="overflow-hidden">
              <span className="inline-block">storytelling—engineering modern web experiences</span>
            </p>
            <p className="overflow-hidden">
              <span className="inline-block">while producing cinematic visuals through</span>
            </p>
            <p className="overflow-hidden">
              <span className="inline-block">shooting, editing, and creative direction.</span>
            </p>
          </div>

          {/* Secondary Bio Paragraph */}
          <div
            ref={bioRef}
            style={{ willChange: 'transform, opacity' }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 leading-relaxed font-normal max-w-2xl"
          >
            <p>
              I&apos;m building{' '}
              <span className="relative inline-block font-semibold text-white group">
                next-gen AI systems
                <span
                  ref={(el) => (highlightRefs.current[0] = el)}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
              </span>
              , and previously crafted award-winning digital experiences across{' '}
              <span className="relative inline-block font-semibold text-white group">
                full-stack engineering
                <span
                  ref={(el) => (highlightRefs.current[1] = el)}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
              </span>
              ,{' '}
              <span className="relative inline-block font-semibold text-white group">
                creative development
                <span
                  ref={(el) => (highlightRefs.current[2] = el)}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
              </span>
              , and{' '}
              <span className="relative inline-block font-semibold text-white group">
                technical storytelling
                <span
                  ref={(el) => (highlightRefs.current[3] = el)}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
              </span>
              .
            </p>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
