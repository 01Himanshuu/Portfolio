'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from './SoundProvider';

/**
 * TwoWorldsGateway — "I LIVE IN TWO WORLDS" Premium Cinematic Gateway Section
 *
 * FEATURES & SPECIFICATIONS STRICTLY ENFORCED:
 * - NO links, NO buttons, NO routing, NO scrolling, NO placeholder divs.
 * - NO future Engineering or Creator sections created.
 * - Heading: "I LIVE \n IN TWO WORLDS"
 * - Subtitle: "Some stories are written in code. Others are told frame by frame."
 * - LEFT CARD: BUILD (Software Engineer)
 *   - Futuristic workstation identity, cyan/blue glow, animated technical grid,
 *     floating code snippets, blinking terminal cursor, thin glowing borders, subtle particles.
 *   - Floating keywords: Next.js, TypeScript, AI, React, Prisma, PostgreSQL, AWS, Git
 * - RIGHT CARD: CREATE (Content Creator)
 *   - Modern editing studio identity, purple/magenta glow, film grain, camera frame corners,
 *     editing timeline lines, floating play icons, soft bloom.
 *   - Floating keywords: After Effects, Premiere Pro, Instagram, Storytelling, Motion Design,
 *     Color Grading, Reels, Photography
 * - HOVER BEHAVIOR:
 *   - Hovered card expands smoothly to ~60%, other shrinks to ~40% (0.5–0.7s smooth easing).
 *   - Glow intensifies, floating elements become more active, text brightness increases.
 * - DIVIDER:
 *   - Thin glowing animated vertical line softly pulsing.
 *   - Shifts a few pixels toward the smaller card on hover.
 * - BOTTOM TEXT:
 *   - "Choose a journey... or simply keep scrolling." (informational only, fades in after cards).
 * - ZERO trailing empty space below section.
 */

const BUILD_KEYWORDS = [
  'Next.js',
  'TypeScript',
  'AI',
  'React',
  'Prisma',
  'PostgreSQL',
  'AWS',
  'Git',
];

const CREATE_KEYWORDS = [
  'After Effects',
  'Premiere Pro',
  'Instagram',
  'Storytelling',
  'Motion Design',
  'Color Grading',
  'Reels',
  'Photography',
];

export default function TwoWorldsGateway() {
  const [hoveredCard, setHoveredCard] = useState(null); // 'build' | 'create' | null
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const footerRef = useRef(null);
  const { playHover } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        });
      }

      if (cardsContainerRef.current) {
        gsap.from(cardsContainerRef.current, {
          y: 45,
          scale: 0.98,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
          },
        });
      }

      // Bottom text fades in after cards finish animating
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          opacity: 0,
          y: 20,
          duration: 1.2,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="two-worlds-gateway"
      ref={sectionRef}
      className="relative z-30 w-full py-24 px-6 md:px-12 lg:px-20 bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center text-white select-none"
      aria-label="I Live In Two Worlds Gateway"
    >
      {/* Deep atmospheric purple/violet ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1380px] w-full mx-auto flex flex-col items-center relative z-10">
        {/* ========================================================================= */}
        {/* 1. CENTERED HEADING & SUBTITLE */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/25 text-[11px] uppercase tracking-[0.3em] text-purple-300 font-mono mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>02 // The Gateway</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] mb-6 font-sans">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300">
              I LIVE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.25)]">
              IN TWO WORLDS
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-purple-100/70 font-light max-w-xl mx-auto italic leading-relaxed">
            &ldquo;Some stories are written in code.
            <br />
            Others are told frame by frame.&rdquo;
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. TWO INTERACTIVE CARDS + GLOWING ANIMATED VERTICAL DIVIDER */}
        {/* ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className="relative w-full h-[520px] md:h-[560px] lg:h-[600px] flex flex-col md:flex-row gap-5 md:gap-6 mb-14"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* --------------------------------------------------------------------- */}
          {/* LEFT CARD: BUILD // Software Engineer (Futuristic Workstation) */}
          {/* --------------------------------------------------------------------- */}
          <div
            onMouseEnter={() => {
              setHoveredCard('build');
              playHover();
            }}
            style={{
              flex:
                hoveredCard === 'build'
                  ? '1.5'
                  : hoveredCard === 'create'
                    ? '0.85'
                    : '1',
            }}
            className="group relative h-full rounded-2xl md:rounded-3xl overflow-hidden border border-cyan-500/25 bg-neutral-950/60 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-8 md:p-12 hover:border-[#00F0FF]/80 hover:shadow-[0_0_80px_rgba(0,240,255,0.22)] cursor-default"
          >
            {/* Background: Futuristic Workstation / Technical Grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Radial Cyan Technical Grid */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-35"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(0,240,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Cyan / Blue Atmospheric Glows */}
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#00F0FF]/15 blur-[100px] transition-all duration-700 group-hover:bg-[#00F0FF]/30 group-hover:scale-110" />
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-600/10 blur-[80px] transition-all duration-700 group-hover:bg-blue-500/25" />

              {/* Floating Code Snippets & Technical Terminal Indicator */}
              <div className="absolute top-8 right-8 text-right font-mono text-[11px] text-[#00F0FF]/40 tracking-widest space-y-1.5 transition-colors duration-500 group-hover:text-[#00F0FF]/70">
                <div className="flex items-center justify-end gap-1.5">
                  <span>SYSTEM_CORE // BUILD</span>
                  <span className="inline-block w-2 h-3 bg-[#00F0FF] animate-pulse" />
                </div>
                <div>{'<Architecture: Distributed />'}</div>
                <div>{'const ai = new System();'}</div>
              </div>

              {/* Subtle Moving Particles / Technical Decor */}
              <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
                <span className="font-mono text-[10px] text-[#00F0FF]">PORT:3000 ONLINE</span>
              </div>

              {/* Floating Keywords Field */}
              <div className="absolute inset-x-8 top-28 bottom-32 flex flex-wrap content-center gap-2.5 opacity-45 group-hover:opacity-80 transition-all duration-700 pointer-events-none">
                {BUILD_KEYWORDS.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/25 font-mono text-xs text-[#00F0FF] backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Header Section */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] px-3.5 py-1 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/35 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                01 · ENGINEERING
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 mt-auto">
              <span className="block font-mono text-xs md:text-sm uppercase tracking-widest text-[#00F0FF]/90 mb-1 group-hover:text-[#00F0FF] transition-colors duration-500">
                Software Engineer
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                BUILD
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light max-w-md leading-relaxed group-hover:text-neutral-200 transition-colors duration-500">
                Designing scalable products, AI systems and modern web experiences.
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ANIMATED GLOWING VERTICAL DIVIDER */}
          {/* Shifts toward smaller card on hover & softly pulses */}
          {/* --------------------------------------------------------------------- */}
          <div
            className={`hidden md:flex absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[2px] z-20 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoveredCard === 'build'
                ? 'translate-x-6'
                : hoveredCard === 'create'
                  ? '-translate-x-6'
                  : 'translate-x-0'
              }`}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-purple-400/80 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.9)] animate-pulse" />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT CARD: CREATE // Content Creator (Modern Editing Studio) */}
          {/* --------------------------------------------------------------------- */}
          <div
            onMouseEnter={() => {
              setHoveredCard('create');
              playHover();
            }}
            style={{
              flex:
                hoveredCard === 'create'
                  ? '1.5'
                  : hoveredCard === 'build'
                    ? '0.85'
                    : '1',
            }}
            className="group relative h-full rounded-2xl md:rounded-3xl overflow-hidden border border-fuchsia-500/25 bg-neutral-950/60 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-8 md:p-12 hover:border-fuchsia-400/80 hover:shadow-[0_0_80px_rgba(217,70,239,0.22)] cursor-default"
          >
            {/* Background: Modern Editing Studio / Film Aesthetic */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Film Grain & Timeline Linear Grid */}
              <div
                className="absolute inset-0 opacity-15 transition-opacity duration-700 group-hover:opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(217,70,239,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Purple / Magenta Soft Bloom */}
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-600/15 blur-[100px] transition-all duration-700 group-hover:bg-fuchsia-600/30 group-hover:scale-110" />
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-600/10 blur-[80px] transition-all duration-700 group-hover:bg-purple-500/25" />

              {/* Camera Frame Corners (Minimalist L-brackets) */}
              <div className="absolute top-6 left-6 w-3.5 h-3.5 border-t-2 border-l-2 border-fuchsia-400/30 group-hover:border-fuchsia-400/70 transition-colors" />
              <div className="absolute top-6 right-6 w-3.5 h-3.5 border-t-2 border-r-2 border-fuchsia-400/30 group-hover:border-fuchsia-400/70 transition-colors" />
              <div className="absolute bottom-6 left-6 w-3.5 h-3.5 border-b-2 border-l-2 border-fuchsia-400/30 group-hover:border-fuchsia-400/70 transition-colors" />
              <div className="absolute bottom-6 right-6 w-3.5 h-3.5 border-b-2 border-r-2 border-fuchsia-400/30 group-hover:border-fuchsia-400/70 transition-colors" />

              {/* Cinematic Studio Indicators (REC / Playhead) */}
              <div className="absolute top-8 right-8 text-right font-mono text-[11px] text-fuchsia-400/40 tracking-widest space-y-1.5 transition-colors duration-500 group-hover:text-fuchsia-400/70">
                <div className="flex items-center justify-end gap-1.5">
                  <span>REC ● 24 FPS 4K</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
                <div>{'KEYFRAME [00:14:23:08]'}</div>
                <div>{'COLOR_SPACE: DCI-P3'}</div>
              </div>

              {/* Editing Timeline Ruler Line in Background */}
              <div className="absolute bottom-20 left-8 right-8 h-[1px] bg-fuchsia-500/20 flex justify-between items-center opacity-40 group-hover:opacity-70 transition-opacity">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-[1px] h-2 bg-fuchsia-400/50" />
                ))}
              </div>

              {/* Floating Keywords Field */}
              <div className="absolute inset-x-8 top-28 bottom-32 flex flex-wrap content-center gap-2.5 opacity-45 group-hover:opacity-80 transition-all duration-700 pointer-events-none">
                {CREATE_KEYWORDS.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/25 font-mono text-xs text-fuchsia-300 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Header Section */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-300 px-3.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/35 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                02 · CREATIVE
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 mt-auto">
              <span className="block font-mono text-xs md:text-sm uppercase tracking-widest text-fuchsia-300/90 mb-1 group-hover:text-fuchsia-300 transition-colors duration-500">
                Content Creator
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                CREATE
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light max-w-md leading-relaxed group-hover:text-neutral-200 transition-colors duration-500">
                Creating cinematic stories through editing, motion and digital content.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INFORMATIONAL-ONLY FOOTER TEXT (FADES IN AFTER CARDS ANIMATE) */}
        {/* ========================================================================= */}
        <div ref={footerRef} className="text-center">
          <p className="text-sm md:text-base font-mono text-purple-200/60 tracking-wider uppercase">
            &ldquo;Choose a journey... or simply keep scrolling.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
