'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '../SoundProvider';

/**
 * ConvergingWorldsVisual — Interactive Convergence of Engineering & Creativity
 *
 * Left side:
 * - Engineering, Architecture, Performance, AI, Systems
 * Right side:
 * - Creativity, Motion, Editing, Storytelling, Design
 *
 * Animate both sides converging into one glowing central element labelled:
 * EXPERIENCE
 */
const ENGINEERING_PILLS = [
  'Engineering',
  'Architecture',
  'Performance',
  'AI',
  'Systems',
];

const CREATIVITY_PILLS = [
  'Creativity',
  'Motion',
  'Editing',
  'Storytelling',
  'Design',
];

export default function ConvergingWorldsVisual() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Animate Left pills sliding in from left
      if (leftRef.current) {
        tl.from(
          leftRef.current.children,
          {
            x: -50,
            opacity: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0
        );
      }

      // Animate Right pills sliding in from right
      if (rightRef.current) {
        tl.from(
          rightRef.current.children,
          {
            x: 50,
            opacity: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0
        );
      }

      // Animate Center glowing core expanding
      if (centerRef.current) {
        tl.fromTo(
          centerRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'back.out(1.5)',
          },
          0.3
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1360px] mx-auto my-20 py-16 px-6 sm:px-10 rounded-3xl border border-white/10 bg-neutral-950/70 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
    >
      {/* Background Cyan & Purple Converging Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00F0FF]/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C084FC]/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#00F0FF]/20 via-[#C084FC]/20 to-[#D946EF]/20 blur-[130px] pointer-events-none" />

      {/* Header Label */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
          {'// THE DUAL-WORLD CONVERGENCE ENGINE'}
        </span>
      </div>

      {/* 3-Column Converging Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* LEFT COLUMN: Engineering World Pills (Cyan/Blue) */}
        <div
          ref={leftRef}
          className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-2 font-semibold">
            {'[ 01 // BUILD // ENGINEERING ]'}
          </span>
          {ENGINEERING_PILLS.map((pill, i) => (
            <div
              key={i}
              onMouseEnter={playHover}
              onClick={playClick}
              className="group relative w-full sm:w-64 px-5 py-3 rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-white font-mono text-sm tracking-wider flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:translate-x-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10">{pill}</span>
              <span className="relative z-10 text-[#00F0FF] group-hover:translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">&rarr;</span>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN: The Glowing EXPERIENCE Core */}
        <div
          ref={centerRef}
          className="lg:col-span-4 flex flex-col items-center justify-center my-6 lg:my-0 relative"
        >
          {/* Animated Connecting Lines / Converging Arrows for Desktop */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none opacity-40">
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-[#C084FC] to-transparent" />
          </div>

          {/* Glowing Central Jewel Container */}
          <div
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative w-56 sm:w-64 h-56 sm:h-64 rounded-full border-2 border-white/30 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:border-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 shadow-[0_0_70px_rgba(0,240,255,0.25),_0_0_70px_rgba(192,132,252,0.25)] overflow-hidden"
          >
            {/* Shimmering Glass Reflection on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            {/* Rotating Ambient Iridescent Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#00F0FF]/10 via-transparent to-[#C084FC]/10 pointer-events-none" />

            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 mb-2 relative z-10">
              {'// SYNTHESIS RESULT'}
            </span>

            {/* Glowing EXPERIENCE Label */}
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#C084FC] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] relative z-10">
              EXPERIENCE
            </h3>

            <span className="font-mono text-[10px] text-neutral-400 mt-3 tracking-widest uppercase relative z-10">
              {'USABLE • MEMORABLE • SHARED'}
            </span>
          </div>

          {/* Bottom Down Arrow indicating convergence */}
          <div className="mt-4 font-mono text-xs text-neutral-500 tracking-widest">
            {'|| 100% UNIFIED ||'}
          </div>
        </div>

        {/* RIGHT COLUMN: Creativity World Pills (Purple/Magenta) */}
        <div
          ref={rightRef}
          className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#C084FC] mb-2 font-semibold">
            {'[ 02 // CREATE // CREATIVITY ]'}
          </span>
          {CREATIVITY_PILLS.map((pill, i) => (
            <div
              key={i}
              onMouseEnter={playHover}
              onClick={playClick}
              className="group relative w-full sm:w-64 px-5 py-3 rounded-xl border border-[#C084FC]/30 bg-[#C084FC]/5 text-white font-mono text-sm tracking-wider flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#C084FC] hover:bg-[#C084FC]/15 hover:shadow-[0_0_25px_rgba(192,132,252,0.25)] hover:-translate-x-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]/80 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 text-[#C084FC] group-hover:-translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">&larr;</span>
              <span className="relative z-10">{pill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
