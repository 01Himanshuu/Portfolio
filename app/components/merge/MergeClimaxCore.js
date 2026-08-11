'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * MergeClimaxCore — Interactive Emotional Climax & Unified Reactor
 *
 * Represents the emotional climax where Engineering (Cyan) and Creative (Magenta)
 * physically converge into one glowing gold/white core: THE UNIFIED VISION.
 * Features:
 * - Interactive Convergence Equilibrium Slider (Engineering <-> Creative <-> Unified)
 * - Clickable Ignition Trigger to release the unified climax manifesto
 * - Cinematic particle blooms and dynamic HSL lighting shifts
 */
export default function MergeClimaxCore() {
  const [balance, setBalance] = useState(50); // 0 = 100% Engineering, 50 = Unified, 100 = 100% Creative
  const [isIgnited, setIsIgnited] = useState(true);
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.climax-reactor', {
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 1.3,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleIgniteClimax = () => {
    playClick();
    setIsIgnited(!isIgnited);
    setBalance(50);

    // Trigger pulse animation on reactor
    gsap.fromTo(
      '.climax-core-glow',
      { scale: 0.7, opacity: 0.3 },
      { scale: 1.5, opacity: 0.9, duration: 0.45, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
  };

  const isUnified = Math.abs(balance - 50) < 15;

  return (
    <div ref={containerRef} className="w-full my-24 select-none">
      {/* Module Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-amber-400 font-bold">
            {'// EMOTIONAL_CLIMAX // CONVERGENCE_REACTOR // THE_UNIFIED_MINDSET'}
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-amber-400/60 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleIgniteClimax}
          onMouseEnter={playHover}
          className={`px-5 py-2 rounded-full border font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isIgnited
              ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.35)]'
              : 'bg-neutral-900/60 border-white/20 text-neutral-300 hover:border-amber-400 hover:text-amber-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isIgnited ? 'bg-amber-400 animate-ping' : 'bg-neutral-500'
            }`}
          />
          <span>{isIgnited ? '⚡ UNIFIED EXPERIENCE IGNITED' : '▶ IGNITE UNIFIED EXPERIENCE'}</span>
        </button>
      </div>

      {/* Interactive Convergence Balance Slider */}
      <div className="p-5 rounded-2xl border border-white/10 bg-neutral-950/80 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF] font-bold">ENGINEERING CORE</span>
          <span className="text-neutral-500">
            ◄-- BALANCE: {balance < 40 ? 'ENGINEERING DOMINANT' : balance > 60 ? 'CREATIVE DOMINANT' : '100% CONVERGED EQUILIBRIUM'} --►
          </span>
          <span className="text-[#C084FC] font-bold">CREATIVE CORE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClick();
              setBalance(10);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              balance < 40
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ ENGINEERING ]
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setBalance(50);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              isUnified
                ? 'bg-amber-400/25 border-amber-400 text-amber-300 font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ ⚡ UNIFIED CORE ]
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setBalance(90);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              balance > 60
                ? 'bg-[#C084FC]/20 border-[#C084FC] text-[#C084FC]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ CREATIVITY ]
          </button>
        </div>
      </div>

      {/* Main Climax Reactor Window */}
      <div className="climax-reactor relative w-full rounded-3xl border border-amber-400/40 bg-neutral-950/95 overflow-hidden shadow-[0_0_80px_rgba(251,191,36,0.12)] p-8 sm:p-14 md:p-16 flex flex-col items-center justify-center text-center">
        {/* Ambient HSL Glow Fields */}
        <div
          className="climax-core-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
          style={{
            background: isUnified
              ? 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(0,240,255,0.18) 50%, rgba(192,132,252,0.18) 100%)'
              : balance < 40
              ? 'radial-gradient(circle, rgba(0,240,255,0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192,132,252,0.35) 0%, transparent 70%)',
          }}
        />

        {/* 3-Column Reactor Display: Engineering | Unified Core | Creativity */}
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          {/* LEFT: Engineering Sphere */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-500 ${
              balance < 40 || isUnified
                ? 'bg-neutral-900/80 border-[#00F0FF]/60 shadow-[0_0_30px_rgba(0,240,255,0.18)]'
                : 'bg-neutral-900/40 border-white/10 opacity-60'
            }`}
          >
            <div className="font-mono text-xs text-[#00F0FF] font-bold tracking-wider uppercase mb-2">
              {'// WORLD 01'}
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 font-sans">
              SOFTWARE ENGINEERING
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
              TypeScript, WebGL Shaders, Next.js 16, GraphQL Federation, and Agentic RAG Systems.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF]">LOGIC</span>
              <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF]">PERFORMANCE</span>
              <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF]">ARCHITECTURE</span>
            </div>
          </div>

          {/* CENTER: Unified Energy Core */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.4)] bg-gradient-to-br from-neutral-900 to-black p-4">
              <span className="w-4 h-4 rounded-full bg-amber-400 animate-ping mb-2" />
              <span className="font-mono text-xs text-amber-300 tracking-widest uppercase font-bold">
                THE CORE
              </span>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none mt-1">
                EXPERIENCE
              </span>
              <span className="font-mono text-[9px] text-neutral-400 mt-2">
                100% UNIFIED
              </span>
            </div>
          </div>

          {/* RIGHT: Creativity Sphere */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-500 ${
              balance > 60 || isUnified
                ? 'bg-neutral-900/80 border-[#C084FC]/60 shadow-[0_0_30px_rgba(192,132,252,0.18)]'
                : 'bg-neutral-900/40 border-white/10 opacity-60'
            }`}
          >
            <div className="font-mono text-xs text-[#C084FC] font-bold tracking-wider uppercase mb-2">
              {'// WORLD 02'}
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 font-sans">
              CINEMATIC STORYTELLING
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
              8K RAW Cinematography, DaVinci Color Grading, NLE Keyframing, and Dolby Atmos Sound.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#C084FC]/15 text-[#C084FC]">EMOTION</span>
              <span className="px-2 py-0.5 rounded bg-[#C084FC]/15 text-[#C084FC]">MOTION</span>
              <span className="px-2 py-0.5 rounded bg-[#C084FC]/15 text-[#C084FC]">TIMELINE</span>
            </div>
          </div>
        </div>

        {/* EMOTIONAL CLIMAX MANIFESTO */}
        <div className="relative z-10 max-w-3xl pt-8 border-t border-white/15">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 font-mono text-xs text-amber-300 uppercase tracking-widest mb-6">
            {'// NOT TWO CAREERS. ONE UNIFIED MINDSET.'}
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-relaxed mb-6 font-sans">
            &ldquo;Technology without story is dry syntax. Story without technology is an idea waiting to be built. When code transforms into cinema, software becomes unforgettable.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <span>CODE TO FRAME: ZERO LATENCY</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>LOGIC + EMOTION: UNIFIED</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
              <span>GIT COMMITS: CINEMA KEYFRAMES</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
