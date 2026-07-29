'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * EngineeringMetrics — Animated Counter Achievements & Telemetry
 *
 * Displays metrics:
 * Projects Built, Technologies Used, Years Learning, GitHub Contributions
 * Animate numbers when they enter viewport via GSAP ScrollTrigger.
 */
const METRICS = [
  { id: 'projects', label: 'Projects Built', value: 30, suffix: '+', code: 'PROJ_COUNT' },
  { id: 'tech', label: 'Technologies Used', value: 24, suffix: '+', code: 'TECH_INDEX' },
  { id: 'years', label: 'Years Engineering', value: 4, suffix: '+', code: 'EXP_DURATION' },
  { id: 'commits', label: 'GitHub Contributions', value: 1400, suffix: '+', code: 'GIT_TOTAL' },
];

export default function EngineeringMetrics() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const counters = containerRef.current?.querySelectorAll('.metric-number');
      if (!counters) return;

      counters.forEach((el) => {
        const targetVal = parseInt(el.getAttribute('data-value') || '0', 10);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: targetVal,
            duration: 2,
            ease: 'power3.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mb-24 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#00F0FF]">
            03 // SYSTEM_ACHIEVEMENTS
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          LIVE TELEMETRY STATISTICS
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((item) => (
          <div
            key={item.id}
            className="group relative p-8 rounded-3xl bg-neutral-950/60 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#00F0FF]/60 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(0,240,255,0.18)] overflow-hidden"
          >
            {/* Top Code Badge */}
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
              <span>{'// ' + item.code}</span>
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]/60 group-hover:bg-[#00F0FF] transition-colors" />
            </div>

            {/* Counter Value */}
            <div className="flex items-baseline gap-1 mb-2">
              <span
                data-value={item.value}
                className="metric-number text-5xl md:text-6xl font-black tracking-tight text-white font-mono group-hover:text-[#00F0FF] transition-colors"
              >
                0
              </span>
              <span className="text-3xl md:text-4xl font-black text-[#00F0FF] font-mono">
                {item.suffix}
              </span>
            </div>

            {/* Label */}
            <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-neutral-300">
              {item.label}
            </div>

            {/* Decorative Blueprint Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
