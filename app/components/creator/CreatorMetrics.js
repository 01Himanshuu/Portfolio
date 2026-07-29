'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '../SoundProvider';

/**
 * CreatorMetrics — Animated Statistics for Content & Reach
 *
 * Animate statistics:
 * - 4M+ Views
 * - 100+ Videos
 * - 2+ Years
 * - 50+ Campaigns
 * Numbers animate into view with GSAP ScrollTrigger.
 */
const CREATOR_STATS = [
  {
    id: 'views',
    value: '4M+',
    label: 'VIEWS',
    detail: 'Total organic reach across YouTube, Instagram, and TikTok',
  },
  {
    id: 'videos',
    value: '100+',
    label: 'VIDEOS',
    detail: 'High-retention technical storytelling & documentary breakdowns',
  },
  {
    id: 'years',
    value: '2+',
    label: 'YEARS',
    detail: 'Consistent cinematic branding & developer community building',
  },
  {
    id: 'campaigns',
    value: '50+',
    label: 'CAMPAIGNS',
    detail: 'Successful brand sponsorships & end-to-end visual identities',
  },
];

export default function CreatorMetrics() {
  const containerRef = useRef(null);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.metric-card');

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mb-24">
      {/* Module Title */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#C084FC]">
            04 // CREATIVE_STUDIO_METRICS
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#C084FC]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          AUDIENCE TELEMETRY & ENGAGEMENT
        </span>
      </div>

      {/* Grid of Animated Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CREATOR_STATS.map((stat) => (
          <div
            key={stat.id}
            onMouseEnter={playHover}
            onClick={playClick}
            className="metric-card group relative rounded-2xl border border-white/15 bg-neutral-950/70 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C084FC]/60 hover:shadow-[0_0_40px_rgba(192,132,252,0.2)] flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            {/* Top REC Indicator */}
            <div className="flex items-center justify-between mb-6 font-mono text-xs text-neutral-500">
              <span className="uppercase text-[#C084FC]">{stat.label}</span>
              <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
            </div>

            {/* Large Animated Number */}
            <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 font-sans group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-[#C084FC] transition-all">
              {stat.value}
            </div>

            {/* Detail Explanation */}
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
