'use client';

import React from 'react';
import { useSound } from '../SoundProvider';

/**
 * CreativeTools — Floating Glass Capsules of Creative Software
 *
 * Displays software as floating glass capsules:
 * - After Effects, Premiere Pro, Photoshop, Illustrator, DaVinci Resolve, Lightroom, CapCut, Figma
 * Hover reveals:
 * - Years used
 * - Primary use
 */
const CREATIVE_SOFTWARE = [
  {
    id: 'after-effects',
    name: 'After Effects',
    code: 'Ae',
    accent: '#9999FF',
    years: '4+ Years',
    primaryUse: '3D Motion Graphics & VFX',
  },
  {
    id: 'premiere-pro',
    name: 'Premiere Pro',
    code: 'Pr',
    accent: '#9999FF',
    years: '5+ Years',
    primaryUse: 'Multi-Cam Editing & Pacing',
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    code: 'Ps',
    accent: '#31A8FF',
    years: '6+ Years',
    primaryUse: 'Thumbnail Design & Compositing',
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    code: 'Ai',
    accent: '#FF9A00',
    years: '4+ Years',
    primaryUse: 'Vector Typography & Branding',
  },
  {
    id: 'davinci-resolve',
    name: 'DaVinci Resolve',
    code: 'Dv',
    accent: '#FF6B00',
    years: '3+ Years',
    primaryUse: 'Cinematic Color Grading & Fairlight',
  },
  {
    id: 'lightroom',
    name: 'Lightroom',
    code: 'Lr',
    accent: '#31A8FF',
    years: '5+ Years',
    primaryUse: 'Portrait & Studio RAW Color Science',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    code: 'Cc',
    accent: '#00F0FF',
    years: '2+ Years',
    primaryUse: 'Rapid Short-Form Vertical Storytelling',
  },
  {
    id: 'figma',
    name: 'Figma',
    code: 'Fg',
    accent: '#F24E1E',
    years: '4+ Years',
    primaryUse: 'Storyboarding & UI/UX Presentation',
  },
];

export default function CreativeTools() {
  const { playHover, playClick } = useSound();

  return (
    <div className="w-full mb-24">
      {/* Module Title */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#C084FC]">
            03 // CINEMATIC_SOFTWARE_CAPSULES
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#C084FC]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          HOVER CAPSULE FOR EXPERIENCE METRICS
        </span>
      </div>

      {/* Grid of Floating Glass Capsules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CREATIVE_SOFTWARE.map((tool) => (
          <div
            key={tool.id}
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative rounded-2xl border border-white/15 bg-neutral-950/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#C084FC]/60 hover:shadow-[0_0_35px_rgba(192,132,252,0.2)] flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            {/* Top Row: Software Code Icon & Name */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-sans shadow-lg transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${tool.accent}22`,
                  color: tool.accent,
                  border: `1px solid ${tool.accent}55`,
                }}
              >
                {tool.code}
              </div>

              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </div>

            {/* Hover Reveal Strip: Years Used & Primary Use */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-500 uppercase">EXPERIENCE</span>
                <span className="text-[#C084FC] font-semibold">
                  {tool.years}
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs mt-1">
                <span className="text-neutral-500 uppercase">PRIMARY</span>
                <span className="text-neutral-300 group-hover:text-white truncate max-w-[170px]">
                  {tool.primaryUse}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
