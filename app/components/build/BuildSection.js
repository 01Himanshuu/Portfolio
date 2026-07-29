'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import OsNavPanels from './OsNavPanels';
import ProjectWindows from './ProjectWindows';
import TechStackWall from './TechStackWall';
import EngineeringMetrics from './EngineeringMetrics';

/**
 * BuildSection — Futuristic Developer Operating System Environment
 *
 * RESTORED & STRICTLY ISOLATED:
 * - Does not modify or affect Hero, Introduction, Two Worlds, or global scroll/timelines.
 * - Uses shared layout container (.global-content-grid) without altering global CSS or page structure.
 * - Features the two-column Engineering hero (left: BUILD title & bio; right: Developer Terminal widget).
 */
export default function BuildSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Entrance Animation for Section Intro
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

      // 2. Bottom Transition Fade In
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full py-28 bg-[#0a0a0a] text-white overflow-hidden select-none"
      aria-label="Software Engineer Workspace"
    >
      {/* ========================================================================= */}
      {/* ATMOSPHERIC BACKGROUND: Blue/Cyan Glows, Parallax Grid, Blueprint Marks */}
      {/* ========================================================================= */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,240,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Deep Cyan & Blue Radial Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-[#00F0FF]/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/10 blur-[160px] pointer-events-none" />

      {/* Tiny Blueprint Crosshairs (+) */}
      <div className="absolute top-12 left-12 font-mono text-xs text-[#00F0FF]/30 pointer-events-none">
        +
      </div>
      <div className="absolute top-12 right-12 font-mono text-xs text-[#00F0FF]/30 pointer-events-none">
        +
      </div>
      <div className="absolute bottom-12 left-12 font-mono text-xs text-[#00F0FF]/30 pointer-events-none">
        +
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-xs text-[#00F0FF]/30 pointer-events-none">
        +
      </div>

      {/* Subtle Floating Code Snippets in Background */}
      <div className="absolute top-24 right-16 hidden lg:block text-right font-mono text-xs text-[#00F0FF]/30 tracking-widest space-y-1.5 pointer-events-none">
        <div>{'// ARCHITECTURE_CORE_v2.0'}</div>
        <div>{'export const SoftwareEngineer = async () => {'}</div>
        <div>{'  await initDistributedSystem();'}</div>
        <div>{'};'}</div>
      </div>

      <div className="global-content-grid relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION INTRO (TWO-COLUMN HERO) */}
        {/* ========================================================================= */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 w-full"
        >
          {/* LEFT COLUMN: BUILD Heading, Software Engineer, Description */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[11px] uppercase tracking-[0.3em] text-[#00F0FF] font-mono mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>03 // OPERATING SYSTEM // WORKSPACE</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-4 font-sans">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                BUILD
              </span>
            </h2>

            <div className="flex items-center justify-start gap-2 mb-6">
              <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-widest uppercase text-[#00F0FF]">
                Software Engineer
              </span>
              <span className="inline-block w-2.5 h-6 bg-[#00F0FF] animate-pulse" />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              I build scalable web applications, AI-powered solutions, and digital experiences focused on performance, usability, and clean architecture.
            </p>
          </div>

          {/* RIGHT COLUMN: Terminal Widget + Code Snippet + System Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center w-full">
            <div className="w-full bg-[#0a0a0c]/90 backdrop-blur-md rounded-xl border border-[#00F0FF]/30 p-5 shadow-[0_0_35px_rgba(0,240,255,0.12)] hover:border-[#00F0FF]/60 transition-all duration-300">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-neutral-300 tracking-wider">
                  himanshu@ws-01: ~ — zsh
                </span>
                <div className="flex items-center gap-1.5 text-[#00F0FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="font-mono text-xs sm:text-sm text-neutral-300 space-y-2 mb-4">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-[#00F0FF]">himanshu@ws-01</span>
                  <span>~/portfolio</span>
                  <span className="text-purple-400">$</span>
                  <span className="text-white">cat system_config.ts</span>
                </div>
                <div className="p-3.5 rounded bg-black/60 border border-[#00F0FF]/15 space-y-1.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-[#00F0FF]">engineer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-neutral-400">role:</span>{' '}
                    <span className="text-emerald-400">&quot;Software Developer&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-neutral-400">focus:</span> [
                    <span className="text-emerald-400">&quot;Distributed Systems&quot;</span>,{' '}
                    <span className="text-emerald-400">&quot;AI Engines&quot;</span>
                    ],
                  </div>
                  <div className="pl-4">
                    <span className="text-neutral-400">status:</span>{' '}
                    <span className="text-[#00F0FF] font-semibold">&quot;BUILDING_THE_FUTURE&quot;</span>
                  </div>
                  <div>&#125;;</div>
                </div>
              </div>

              {/* System Metrics Strip */}
              <div className="border-t border-[#00F0FF]/20 pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#00F0FF]/90 uppercase tracking-wide">
                <div>
                  <span className="block text-neutral-500 text-[10px]">CPU_LOAD</span>
                  <span className="font-bold">12% // 4.2GHz</span>
                </div>
                <div>
                  <span className="block text-neutral-500 text-[10px]">MEMORY</span>
                  <span className="font-bold">18.4 / 32 GB</span>
                </div>
                <div>
                  <span className="block text-neutral-500 text-[10px]">RUNTIME</span>
                  <span className="font-bold">NODE_v20</span>
                </div>
                <div>
                  <span className="block text-neutral-500 text-[10px]">LATENCY</span>
                  <span className="font-bold text-emerald-400">&lt; 1ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. WORKSPACE OPERATING SYSTEM NAVIGATION PANELS */}
        {/* ========================================================================= */}
        <OsNavPanels
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* ========================================================================= */}
        {/* 3. APPLICATION WINDOWS (PROJECTS) */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'projects') && (
          <ProjectWindows />
        )}

        {/* ========================================================================= */}
        {/* 4. TECHNOLOGY WALL (TECH STACK) */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'tech') && (
          <TechStackWall />
        )}

        {/* ========================================================================= */}
        {/* 5. ENGINEERING METRICS (ACHIEVEMENTS) */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'metrics') && (
          <EngineeringMetrics />
        )}

        {/* ========================================================================= */}
        {/* 6. BOTTOM TRANSITION TO CREATOR WORLD */}
        {/* ========================================================================= */}
        <div ref={footerRef} className="text-center pt-16 border-t border-white/10">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            &ldquo;Engineering is only one half of the story.&rdquo;
          </p>
          <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-[#00F0FF]/80">
            Continue scrolling to discover the creative side.
          </p>
        </div>
      </div>
    </section>
  );
}
