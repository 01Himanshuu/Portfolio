'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSound } from '../components/SoundProvider';

/**
 * SocialPage — Dedicated Content Creator & Social Media Resume Page
 *
 * Activated when visitor clicks "Social" in the top navigation header.
 * Features:
 * - Content Creator storytelling philosophy & channel reach
 * - Interactive Creator Resume Preview Modal
 * - Download Creator Resume (.PDF) & Print trigger
 */
export default function SocialPage() {
  const { playHover, playClick } = useSound();
  const [modalOpen, setModalOpen] = useState(false);

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a060e] text-white pt-24 pb-32 px-6 sm:px-12 lg:px-20 select-none">
      {/* Ambient Purple & Magenta Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C084FC]/10 blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D946EF]/10 blur-[180px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <Link
          href="/"
          onMouseEnter={playHover}
          onClick={playClick}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C084FC] hover:underline"
        >
          <span>&larr;</span>
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/tech"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-all"
          >
            &larr; Switch to Tech Engineering Page
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 text-xs font-mono uppercase tracking-[0.25em] text-[#C084FC] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C084FC] animate-pulse" />
            <span>02 // SPECIALIZED PROFILE // CREATOR STUDIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase mb-4">
            Content <span className="text-[#C084FC]">Creator</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
            Transforming technical concepts into cinematic stories through editing, motion design, photography, and high-retention digital content.
          </p>
        </div>

        {/* Creator Resume Card & Actions */}
        <div className="rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_0_80px_rgba(192,132,252,0.15)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {'// SOCIAL MEDIA RESUME PROFILE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Himanshu Jangra — Creator Resume
              </h2>
              <p className="font-mono text-xs text-[#C084FC] mt-1">
                instagram.com/_01_himanshu • github.com/01himanshuu • 4M+ Organic Reach
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setModalOpen(true);
                }}
                onMouseEnter={playHover}
                className="px-6 py-3 rounded-xl bg-[#C084FC]/15 hover:bg-[#C084FC]/25 border border-[#C084FC]/40 text-[#C084FC] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(192,132,252,0.2)]"
              >
                [ VIEW FULL CREATOR RESUME ]
              </button>
              <button
                type="button"
                onClick={handlePrint}
                onMouseEnter={playHover}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                ↓ Download / Print (.PDF)
              </button>
            </div>
          </div>

          {/* Core Creator Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#C084FC] font-semibold">
                {'[ 01 // PRODUCTION SUITE ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• DaVinci Resolve Studio &amp; Premiere Pro</li>
                <li>• After Effects 3D Motion &amp; VFX Typography</li>
                <li>• Kodak 2383 Film Emulation &amp; Color Science</li>
                <li>• Sony Alpha Digital &amp; 35mm Analog Cinematography</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#C084FC] font-semibold">
                {'[ 02 // CHANNEL TELEMETRY ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• 4M+ Organic Reach across YouTube &amp; Reels</li>
                <li>• 100+ Cinematic Technical Breakdown Videos</li>
                <li>• 12.8% Average Click-Through Rate (CTR)</li>
                <li>• 65%+ Audience Retention Pacing Strategy</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#C084FC] font-semibold">
                {'[ 03 // BRAND COLLABORATIONS ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• 50+ Successful Tech Brand Collaborations</li>
                <li>• Developer Tooling Video Integration Showcases</li>
                <li>• End-to-End Visual Identity &amp; Sponsorship Design</li>
                <li>• Multi-Platform Distribution &amp; Growth Architecture</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full Creator Resume Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#C084FC]/40 bg-[#0c0812] p-8 sm:p-12 text-white shadow-[0_0_100px_rgba(192,132,252,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C084FC]">
                  {'// CURRICULUM VITAE — CONTENT CREATOR & STORYTELLING'}
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="font-mono text-sm text-neutral-400 hover:text-white"
                >
                  [CLOSE X]
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    HIMANSHU JANGRA
                  </h2>
                  <p className="text-base text-[#C084FC] font-mono mt-1">
                    Content Creator • Cinematic Video Editor • Digital Storyteller
                  </p>
                  <p className="text-sm text-neutral-400 mt-2 font-mono">
                    Instagram: instagram.com/_01_himanshu | GitHub: github.com/01himanshuu | Email: jangrahimanshu0101@gmail.com
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#C084FC] border-b border-white/10 pb-2">
                    Creator Profile Summary
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    Digital Creator specializing in cinematic tech storytelling and visual breakdowns. Combining deep software engineering background with professional color grading, sound design, and motion typography to make complex technical concepts engaging and memorable for millions of viewers.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#C084FC] border-b border-white/10 pb-2">
                    Creative Expertise &amp; Tools
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-light text-neutral-300">
                    <div>
                      <strong className="text-white">Video Production:</strong> DaVinci Resolve Studio (Color &amp; Fairlight), Adobe Premiere Pro, CapCut Pro (Rapid Storytelling)
                    </div>
                    <div>
                      <strong className="text-white">Motion &amp; Graphics:</strong> Adobe After Effects, Photoshop, Illustrator, Figma (UI Storyboarding)
                    </div>
                    <div>
                      <strong className="text-white">Photography &amp; RAW:</strong> Sony Alpha Camera Suite, Anamorphic Lenses, Adobe Lightroom, Custom LUT Design
                    </div>
                    <div>
                      <strong className="text-white">Strategy &amp; Reach:</strong> 4M+ Organic Impressions, Hook Engineering, Audience Retention Pacing, CTR Optimization
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#C084FC] border-b border-white/10 pb-2">
                    Selected Creator Campaigns &amp; Series
                  </h3>
                  <div className="space-y-4 text-sm font-light text-neutral-300">
                    <div>
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span>Cyberpunk Desk Setup &amp; Dev Workflow Series</span>
                        <span className="font-mono text-xs text-[#C084FC]">1.2M+ Views • Shorts/YouTube</span>
                      </div>
                      <p className="mt-1 text-neutral-400">
                        Cinematic documentary breakdown of minimalist developer operating system hardware and software setups.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span>Why Rust is Changing Cloud Infrastructure (Documentary)</span>
                        <span className="font-mono text-xs text-[#C084FC]">850K+ Views • YouTube</span>
                      </div>
                      <p className="mt-1 text-neutral-400">
                        Animated 3D isometric system diagrams combined with live-action technical voiceover narrative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-[#C084FC]/20 hover:bg-[#C084FC]/30 border border-[#C084FC]/40 text-[#C084FC] font-mono text-xs uppercase"
                >
                  Print / Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
