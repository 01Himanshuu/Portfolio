'use client';

import React, { useState } from 'react';
import { useSound } from '../SoundProvider';

/**
 * ReelShowcase — Premium Cinematic Reel & Case Study Showcase
 *
 * Features large horizontal cinematic cards with:
 * - Thumbnail preview & silent play overlay
 * - Project Title, Platform, Views, Role, Software Used, Duration
 * - Hover: timeline indicator moves across thumbnail & purple/magenta glow increases
 * - Click: expands into detailed cinematic case study modal
 */
const REEL_PROJECTS = [
  {
    id: 'cyberpunk-setup',
    title: 'Cyberpunk Desk Setup & Dev Workflow',
    platform: 'YouTube / Shorts',
    views: '1.2M+ Views',
    role: 'Director & Editor',
    duration: '08:45',
    software: ['DaVinci Resolve Studio', 'After Effects', 'Fairlight Audio'],
    timecode: '00:01:24:12',
    description:
      'A cinematic documentary-style breakdown of an ultra-minimalist developer operating system setup. Shot on Sony A7IV with anamorphic primes and color graded using custom Kodak 2383 film emulation LUTs.',
    thumbnailGradient: 'from-purple-950/80 via-neutral-950 to-neutral-900',
    caseStudyTitle: 'Cinematic Lighting & Color Emulation in Developer Workspaces',
    highlights: [
      'Anamorphic 35mm lens framing with practical RGB key lighting',
      'Custom color space transforms in DaVinci Resolve Studio',
      'ASMR-style keyboard and mechanical audio layering',
    ],
  },
  {
    id: 'rust-cloud-doc',
    title: 'Why Rust is Changing Cloud Infrastructure',
    platform: 'YouTube Documentary',
    views: '850K+ Views',
    role: 'Producer & Editor',
    duration: '14:20',
    software: ['Premiere Pro', 'Illustrator', 'After Effects'],
    timecode: '00:04:12:08',
    description:
      'High-retention technical storytelling combining 3D isometric motion graphic diagrams with live-action voiceover narrative to explain distributed memory safety and zero-cost abstractions.',
    thumbnailGradient: 'from-blue-950/80 via-neutral-950 to-neutral-900',
    caseStudyTitle: 'Making Systems Architecture Visually Engaging',
    highlights: [
      'Kinetic typography overlays for code snippet walk-throughs',
      'Dynamic retention pacing designed to sustain 65%+ average watch time',
      'Custom vector diagrams animated in After Effects',
    ],
  },
  {
    id: 'ai-web-app-timelapse',
    title: 'Building a AI Web App in 24 Hours (Timelapse)',
    platform: 'Instagram Reels',
    views: '2.4M+ Views',
    role: 'Solo Creator',
    duration: '01:30',
    software: ['CapCut Pro', 'After Effects', 'Figma'],
    timecode: '00:00:45:19',
    description:
      'Fast-paced vertical reel with beat-matched cuts, sound effects design, and split-screen IDE overlays demonstrating full-stack AI app deployment from prompt to production.',
    thumbnailGradient: 'from-fuchsia-950/80 via-neutral-950 to-neutral-900',
    caseStudyTitle: 'Vertical Short-Form Viral Storytelling',
    highlights: [
      'Hook engineering within the first 1.5 seconds',
      'Rapid screen-recording zoom transitions matched to percussion beats',
      'Over 45,000 saves and 12,000 GitHub repository stars generated',
    ],
  },
  {
    id: 'tokyo-night-walk',
    title: 'Sony A7IV Cinematic Night Walk in Tokyo',
    platform: 'YouTube / Vimeo',
    views: '420K+ Views',
    role: 'Cinematographer & Colorist',
    duration: '04:15',
    software: ['DaVinci Resolve Studio', 'Lightroom'],
    timecode: '00:02:18:04',
    description:
      'An exploration of low-light color science, anamorphic lens flares, and ambient spatial audio design through neon-lit alleys in Shinjuku and Akihabara.',
    thumbnailGradient: 'from-indigo-950/80 via-neutral-950 to-neutral-900',
    caseStudyTitle: 'Low-Light Street Cinematography & Dual Native ISO',
    highlights: [
      'ISO 3200 noise profiling and spatial noise reduction in DaVinci',
      'Neon cyan and magenta complementary color grading',
      'Binaural street ambience recording for immersive playback',
    ],
  },
];

export default function ReelShowcase() {
  const { playHover, playClick } = useSound();
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="w-full mb-24">
      {/* Module Title */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#C084FC]">
            02 // CINEMATIC_REEL_SHOWCASE
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#C084FC]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          CLICK REEL FOR PRODUCTION CASE STUDY
        </span>
      </div>

      {/* Grid of Large Horizontal Cinematic Cards */}
      <div className="space-y-8">
        {REEL_PROJECTS.map((reel) => (
          <div
            key={reel.id}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setSelectedCase(reel);
            }}
            className="group relative rounded-2xl md:rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C084FC]/60 hover:shadow-[0_0_60px_rgba(192,132,252,0.22)] cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* LEFT: Cinematic Thumbnail Preview Area */}
              <div
                className={`lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] bg-gradient-to-br ${reel.thumbnailGradient} p-6 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10`}
              >
                {/* Film Camera UI Header Overlay */}
                <div className="flex items-center justify-between font-mono text-[11px] text-white/80 z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>{'REC // ' + reel.timecode}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/20 text-[10px]">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Silent Play Overlay & Title Preview */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
                  <div className="w-14 h-14 rounded-full bg-black/60 border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-[#C084FC] transition-all duration-300 shadow-[0_0_25px_rgba(192,132,252,0.2)]">
                    <span className="ml-1 w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent group-hover:border-l-[#C084FC] transition-colors" />
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 mt-2 uppercase tracking-wider group-hover:text-[#C084FC] transition-colors">
                    Preview Timeline &rarr;
                  </span>
                </div>

                {/* Bottom Timeline Indicator Scrubber */}
                <div className="relative z-10 w-full">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#C084FC] to-[#D946EF] w-1/4 group-hover:w-full transition-all duration-1000 ease-out" />
                  </div>
                  <div className="flex justify-between items-center mt-1 font-mono text-[10px] text-neutral-400">
                    <span>00:00</span>
                    <span className="text-[#C084FC]">{reel.duration}</span>
                  </div>
                </div>

                {/* Film Grain & Grid Ambient Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(192,132,252,0.4) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              {/* RIGHT: Detailed Project Metadata & Role Breakdown */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Platform & Views Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#C084FC]">
                      <span>{reel.platform}</span>
                      <span>{'//'}</span>
                      <span className="text-white font-semibold">
                        {reel.views}
                      </span>
                    </div>
                    <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/30">
                      {'// ROLE: ' + reel.role}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4 group-hover:text-[#C084FC] transition-colors">
                    {reel.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                    {reel.description}
                  </p>
                </div>

                {/* Software Used & Case Study Footer */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {reel.software.map((sw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 group-hover:border-[#C084FC]/30 group-hover:text-white transition-colors"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#C084FC] group-hover:underline">
                    <span>CASE STUDY</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Project Case Study Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-[#C084FC]/40 bg-[#0a0a0c] p-8 md:p-10 text-white shadow-[0_0_80px_rgba(192,132,252,0.25)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C084FC]">
                {'// CINEMATIC PRODUCTION CASE STUDY: ' + selectedCase.id}
              </span>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-neutral-400 hover:text-white font-mono text-sm"
              >
                [CLOSE X]
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {selectedCase.title}
            </h3>

            <p className="font-mono text-sm text-[#C084FC] mb-6">
              {selectedCase.platform + ' // ' + selectedCase.views + ' // Role: ' + selectedCase.role}
            </p>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {selectedCase.description}
            </p>

            <div className="mb-8 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {'// PRODUCTION HIGHLIGHTS & COLOR SCIENCE'}
              </h4>
              <ul className="space-y-2 font-light text-neutral-300 text-sm sm:text-base">
                {selectedCase.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#C084FC] font-mono mt-1">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                {'// SOFTWARE & EDITING PIPELINE'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.software.map((sw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-md bg-[#C084FC]/10 border border-[#C084FC]/30 font-mono text-xs text-[#C084FC]"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
