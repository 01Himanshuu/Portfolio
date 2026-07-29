'use client';

import React from 'react';
import { useSound } from '../SoundProvider';

/**
 * CreativeDashboard — Professional Creative Studio Dashboard Cards
 *
 * Cards:
 * - Video Editing
 * - Content Strategy
 * - Photography
 * - Brand Campaigns
 * - Motion Graphics
 * - Analytics
 * Hover reveals subtle motion & cinematic purple/magenta glow.
 */
const DASHBOARD_CARDS = [
  {
    id: 'video-editing',
    tag: '01 // TIMELINE_SUITE',
    title: 'Video Editing',
    subtitle: 'DaVinci Resolve Studio & Premiere Pro',
    description:
      'Precision pacing, multi-cam narrative cutting, sound design, and custom color grading pipelines for high-retention video.',
    badge: 'REC 4K // 10-BIT',
  },
  {
    id: 'content-strategy',
    tag: '02 // GROWTH_ENGINE',
    title: 'Content Strategy',
    subtitle: 'Audience Retention & Funnel Architecture',
    description:
      'Data-driven hook frameworks, storytelling structures, and multi-platform distribution tailored for developers & creators.',
    badge: 'CTR // 12.8% AVG',
  },
  {
    id: 'photography',
    tag: '03 // LENS_SCIENCE',
    title: 'Photography',
    subtitle: '35mm Film & Digital Sony Alpha Studio',
    description:
      'Portraiture, hardware aesthetics, low-light street photography, and custom Lightroom LUT color science.',
    badge: 'ISO 800 // f/1.4',
  },
  {
    id: 'brand-campaigns',
    tag: '04 // COLLABORATIONS',
    title: 'Brand Campaigns',
    subtitle: 'End-to-End Visual Identity & Sponsorships',
    description:
      'High-converting product showcases, developer tooling integrations, and authentic tech brand sponsorships.',
    badge: '50+ COLLABS',
  },
  {
    id: 'motion-graphics',
    tag: '05 // VFX_STUDIO',
    title: 'Motion Graphics',
    subtitle: 'After Effects & 3D Typography',
    description:
      'Kinetic typography, animated system architecture diagrams, isometric UI explainers, and dynamic lower thirds.',
    badge: '60 FPS // WGSL',
  },
  {
    id: 'analytics',
    tag: '06 // METRICS_ENGINE',
    title: 'Analytics',
    subtitle: 'Real-Time Audience Telemetry',
    description:
      'Deep engagement tracking, A/B thumbnail testing, and retention curve optimization across 4M+ organic impressions.',
    badge: '4M+ REACH',
  },
];

export default function CreativeDashboard() {
  const { playHover, playClick } = useSound();

  return (
    <div className="w-full mb-24">
      {/* Dashboard Module Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#C084FC]">
            01 // CREATIVE_STUDIO_DASHBOARD
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#C084FC]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          SELECT DISCIPLINE FOR TELEMETRY
        </span>
      </div>

      {/* Grid of 6 Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DASHBOARD_CARDS.map((card) => (
          <div
            key={card.id}
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative rounded-2xl md:rounded-3xl border border-white/15 bg-neutral-950/70 backdrop-blur-2xl p-6 sm:p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C084FC]/60 hover:shadow-[0_0_50px_rgba(192,132,252,0.22)] overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            {/* Ambient Corner Glow on Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-[#C084FC]/20 to-[#D946EF]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C084FC]">
                  {card.tag}
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/25">
                  {card.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 group-hover:text-[#C084FC] transition-colors">
                {card.title}
              </h3>

              {/* Subtitle */}
              <p className="font-mono text-xs text-neutral-400 mb-4 tracking-wider">
                {card.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Bottom Timeline Indicator Strip */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 group-hover:text-[#C084FC] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] opacity-40 group-hover:opacity-100 transition-opacity" />
                <span>ACTIVE_CHANNEL</span>
              </span>
              <span className="text-[#C084FC] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                EXPLORE SUITE &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
