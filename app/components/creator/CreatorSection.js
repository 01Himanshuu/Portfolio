'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CreativeDashboard from './CreativeDashboard';
import ReelShowcase from './ReelShowcase';
import CreativeTools from './CreativeTools';
import CreatorMetrics from './CreatorMetrics';

/**
 * CreatorSection — Cinematic Editing Suite & Studio Environment
 *
 * Resembles a premium editing suite used for cinematic storytelling:
 * - Purple & Magenta ambient lens flare blooms
 * - Subtle film grain & thin grid
 * - Camera framing guides & top/bottom timeline markers
 * - GSAP animated Intro heading and description
 * - CreativeDashboard (6 disciplines)
 * - ReelShowcase (Cinematic horizontal project cards + case study modal)
 * - CreativeTools (Floating glass capsules of Adobe, DaVinci, CapCut, Figma)
 * - CreatorMetrics (4M+ Views, 100+ Videos, 2+ Years, 50+ Campaigns)
 * - Ending quote: "Technology builds the experience. Creativity makes it unforgettable."
 */
export default function CreatorSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP Entrance Animation for CREATE Heading & Bio
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      // 2. Animated Fade In for Ending Quote
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 95%',
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
      className="relative z-30 w-full py-28 pb-36 bg-[#0a0a0a] text-white overflow-hidden select-none"
      aria-label="Content Creator Cinematic Studio"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND ATMOSPHERE: Purple/Magenta Glows, Camera UI, Timeline Rulers */}
      {/* ========================================================================= */}

      {/* Subtle Thin Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(192,132,252,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Deep Purple & Magenta Ambient Glows & Soft Lens Bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[480px] rounded-full bg-[#C084FC]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] rounded-full bg-[#D946EF]/10 blur-[160px] pointer-events-none" />

      {/* Camera Framing Corner Guides [ ] */}
      <div className="absolute top-12 left-12 font-mono text-xs text-[#C084FC]/30 pointer-events-none">
        &#91; REC_4K &#93;
      </div>
      <div className="absolute top-12 right-12 font-mono text-xs text-[#C084FC]/30 pointer-events-none">
        &#91; ISO 800 // f/1.4 &#93;
      </div>
      <div className="absolute bottom-12 left-12 font-mono text-xs text-[#C084FC]/30 pointer-events-none">
        &#91; FPS: 24.000 &#93;
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-xs text-[#C084FC]/30 pointer-events-none">
        &#91; SHUTTER: 1/48 &#93;
      </div>

      {/* Top Film Timeline Ruler Markings */}
      <div className="absolute top-0 left-0 right-0 h-4 flex items-center justify-between px-8 font-mono text-[10px] text-[#C084FC]/25 pointer-events-none select-none">
        <span>00:00:00:00</span>
        <span>| | | | | | | | | | | |</span>
        <span>00:01:00:00</span>
        <span>| | | | | | | | | | | |</span>
        <span>00:02:00:00</span>
        <span>| | | | | | | | | | | |</span>
        <span>00:03:00:00</span>
      </div>

      <div className="global-content-grid relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION INTRO */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="mb-20 w-full text-left">
          {/* Studio Suite Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 text-[11px] uppercase tracking-[0.3em] text-[#C084FC] font-mono mb-6 shadow-[0_0_20px_rgba(192,132,252,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-pulse" />
            <span>04 // CREATIVE STUDIO // CINEMATIC SUITE</span>
          </div>

          {/* Large Heading: CREATE */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-4 font-sans">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-[#C084FC] drop-shadow-[0_0_35px_rgba(192,132,252,0.3)]">
              CREATE
            </span>
          </h2>

          {/* Subtitle: Content Creator */}
          <div className="flex items-center justify-start gap-2 mb-6">
            <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-widest uppercase text-[#C084FC]">
              Content Creator
            </span>
            <span className="inline-block w-2.5 h-6 bg-[#C084FC] animate-pulse" />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
            I transform ideas into cinematic stories through editing, motion design, photography and digital content that connects with people.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. CREATIVE DASHBOARD (6 Disciplines instead of nav tabs) */}
        {/* ========================================================================= */}
        <CreativeDashboard />

        {/* ========================================================================= */}
        {/* 3. REEL SHOWCASE (Cinematic Horizontal Cards + Case Study Modal) */}
        {/* ========================================================================= */}
        <ReelShowcase />

        {/* ========================================================================= */}
        {/* 4. CREATIVE TOOLS (Floating Glass Capsules) */}
        {/* ========================================================================= */}
        <CreativeTools />

        {/* ========================================================================= */}
        {/* 5. CREATIVE METRICS (Animated Statistics) */}
        {/* ========================================================================= */}
        <CreatorMetrics />

        {/* ========================================================================= */}
        {/* 6. ENDING QUOTE */}
        {/* ========================================================================= */}
        <div
          ref={quoteRef}
          className="text-center pt-16 border-t border-white/10"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#C084FC] tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(192,132,252,0.25)]">
            &ldquo;Technology builds the experience. Creativity makes it unforgettable.&rdquo;
          </p>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400">
            [ END OF CINEMATIC CREATIVE SUITE // CONTINUING SCROLL ]
          </p>
        </div>
      </div>
    </section>
  );
}
