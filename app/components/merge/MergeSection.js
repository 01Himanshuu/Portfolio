'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConvergingWorldsVisual from './ConvergingWorldsVisual';

/**
 * MergeSection — WHERE CODE MEETS CREATIVITY
 *
 * The emotional conclusion of the BUILD and CREATE worlds.
 * Do not show projects. Do not show skills. Do not show statistics.
 *
 * Features:
 * - Blended Cyan (Engineering) and Purple/Magenta (Creativity) atmospheres
 * - Main Heading: WHERE CODE MEETS CREATIVITY (cinematic typography)
 * - Body statements on unified experiences
 * - ConvergingWorldsVisual (interactive convergence into EXPERIENCE core)
 * - Final Message: "Not two careers. One mindset." -> "Let's build something unforgettable."
 */
export default function MergeSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const finalMessageRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // 2. Body Text Entrance
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // 3. Final Message Entrance
      if (finalMessageRef.current) {
        gsap.fromTo(
          finalMessageRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: finalMessageRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full py-32 pb-40 bg-[#08080a] text-white overflow-hidden select-none"
      aria-label="Where Code Meets Creativity - The Synthesis"
    >
      {/* ========================================================================= */}
      {/* VISUAL CONCEPT: Cyan & Purple Atmospheres Blending into Unified Space    */}
      {/* ========================================================================= */}

      {/* Blended Grid Ambient Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left Cyan Engineering Glow */}
      <div className="absolute top-1/4 -left-32 w-[650px] h-[650px] rounded-full bg-[#00F0FF]/15 blur-[190px] pointer-events-none" />

      {/* Right Purple Creative Glow */}
      <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full bg-[#C084FC]/15 blur-[190px] pointer-events-none" />

      {/* Unified Center Iridescent Blend */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full bg-gradient-to-r from-[#00F0FF]/15 via-fuchsia-500/10 to-[#C084FC]/15 blur-[160px] pointer-events-none" />

      {/* Floating Blended Particle Accent Dots */}
      <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-[#00F0FF]/60 blur-[1px] animate-pulse" />
      <div className="absolute top-40 right-1/4 w-2.5 h-2.5 rounded-full bg-[#C084FC]/60 blur-[1px] animate-pulse" />
      <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 rounded-full bg-white/50 blur-[1px]" />
      <div className="absolute bottom-24 right-1/3 w-2 h-2 rounded-full bg-[#00F0FF]/40 blur-[1px]" />

      <div className="global-content-grid relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION INTRO & BADGE                                                */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F0FF]/10 to-[#C084FC]/10 border border-white/20 text-xs uppercase tracking-[0.35em] text-white font-mono mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#C084FC] animate-pulse" />
            <span>05 // THE SYNTHESIS // TWO WORLDS MERGED</span>
          </div>

          {/* Large Cinematic Heading: WHERE CODE MEETS CREATIVITY */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] mb-10 font-sans">
            <span className="block text-white">WHERE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-[#00F0FF] drop-shadow-[0_0_40px_rgba(0,240,255,0.35)]">
              CODE
            </span>
            <span className="block text-white">MEETS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-fuchsia-300 to-[#D946EF] drop-shadow-[0_0_40px_rgba(192,132,252,0.35)]">
              CREATIVITY
            </span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2. BODY STATEMENTS                                                      */}
        {/* ========================================================================= */}
        <div
          ref={bodyRef}
          className="text-center max-w-3xl mx-auto mb-20 space-y-6"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white/95 leading-relaxed">
            &ldquo;The best digital experiences happen when engineering and creativity work together.&rdquo;
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-[#00F0FF] to-[#C084FC] mx-auto opacity-60" />

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            I don&apos;t just build software.
            <br className="hidden sm:inline" />
            I create experiences that people enjoy using, remember, and share.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE VISUAL: CONVERGING WORLDS (Engineering & Creativity)       */}
        {/* ========================================================================= */}
        <ConvergingWorldsVisual />

        {/* ========================================================================= */}
        {/* 4. FINAL MESSAGE                                                        */}
        {/* ========================================================================= */}
        <div
          ref={finalMessageRef}
          className="text-center mt-24 pt-16 border-t border-white/15 max-w-2xl mx-auto"
        >
          {/* Not two careers. One mindset. */}
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 uppercase">
            Not two careers.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#C084FC] mt-1">
              One mindset.
            </span>
          </h3>

          {/* Let's build something unforgettable. */}
          <p className="text-xl sm:text-2xl font-light text-neutral-300 mb-10">
            Let&apos;s build something unforgettable.
          </p>

          {/* Optional bottom anchor indicator fading into Contact */}
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span>[ TRANSITIONING TO CONTACT // CONNECT BELOW ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
