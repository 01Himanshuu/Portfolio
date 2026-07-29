'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSound } from '../components/SoundProvider';

/**
 * TechPage — Dedicated Software Engineering Page & Tech Resume
 *
 * Activated when visitor clicks "Tech" in the top navigation header.
 * Features:
 * - Software Engineering philosophy & core competencies
 * - Interactive Tech Resume Preview Modal
 * - Download Tech Resume (.PDF) & Print trigger
 */
export default function TechPage() {
  const { playHover, playClick } = useSound();
  const [modalOpen, setModalOpen] = useState(false);

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#06080c] text-white pt-24 pb-32 px-6 sm:px-12 lg:px-20 select-none">
      {/* Ambient Cyan Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00F0FF]/10 blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[180px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <Link
          href="/"
          onMouseEnter={playHover}
          onClick={playClick}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00F0FF] hover:underline"
        >
          <span>&larr;</span>
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/social"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-all"
          >
            Switch to Social Media Page &rarr;
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono uppercase tracking-[0.25em] text-[#00F0FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>01 // SPECIALIZED PROFILE // ENGINEERING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase mb-4">
            Software <span className="text-[#00F0FF]">Engineer</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
            Scalable full-stack web applications, AI-powered solutions, and high-performance distributed systems architecture built with rigorous clean code principles.
          </p>
        </div>

        {/* Tech Resume Card & Actions */}
        <div className="rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_0_80px_rgba(0,240,255,0.12)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {'// TECH RESUME PROFILE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Himanshu Jangra — Engineering Resume
              </h2>
              <p className="font-mono text-xs text-[#00F0FF] mt-1">
                jangrahimanshu0101@gmail.com • github.com/01himanshuu • linkedin.com/01himanshu
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
                className="px-6 py-3 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                [ VIEW FULL TECH RESUME ]
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

          {/* Core Technical Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-semibold">
                {'[ 01 // CORE COMPETENCIES ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• Full-Stack Architecture (Next.js 16, React, Node.js)</li>
                <li>• Distributed Systems &amp; API Gateway Design</li>
                <li>• AI/LLM Integration &amp; Agentic Workflows</li>
                <li>• High-Performance UI/UX &amp; GSAP Animation</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-semibold">
                {'[ 02 // LANGUAGES & TOOLING ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• TypeScript, JavaScript (ES6+), Python, Rust</li>
                <li>• PostgreSQL, Redis, MongoDB, GraphQL</li>
                <li>• Docker, Kubernetes, AWS, Vercel, Git</li>
                <li>• Tailwind CSS, GSAP, Lenis Smooth Scroll</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-semibold">
                {'[ 03 // ENGINEERING MINDSET ]'}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-300 font-light">
                <li>• Zero-latency telemetry and performance profiling</li>
                <li>• Clean modular architecture with strict boundaries</li>
                <li>• Comprehensive test coverage &amp; CI/CD automation</li>
                <li>• Developer experience &amp; documentation priority</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full Resume Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#00F0FF]/40 bg-[#070a0f] p-8 sm:p-12 text-white shadow-[0_0_100px_rgba(0,240,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
                  {'// CURRICULUM VITAE — SOFTWARE ENGINEERING'}
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
                  <p className="text-base text-[#00F0FF] font-mono mt-1">
                    Software Engineer • Full-Stack Systems • Clean Architecture
                  </p>
                  <p className="text-sm text-neutral-400 mt-2 font-mono">
                    Email: jangrahimanshu0101@gmail.com | GitHub: github.com/01himanshuu | LinkedIn: linkedin.com/01himanshu
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#00F0FF] border-b border-white/10 pb-2">
                    Professional Summary
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    Software Engineer with deep expertise in scalable full-stack web applications, modern UI design systems, and AI-powered workflows. Skilled in architecting high-retention digital platforms that balance rigorous backend performance with stunning interactive frontends.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#00F0FF] border-b border-white/10 pb-2">
                    Technical Expertise
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-light text-neutral-300">
                    <div>
                      <strong className="text-white">Frontend:</strong> Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP 3D Animation, Lenis Scroll Engine
                    </div>
                    <div>
                      <strong className="text-white">Backend &amp; Systems:</strong> Node.js, Express, Python, PostgreSQL, Redis, RESTful API Gateway, Microservices
                    </div>
                    <div>
                      <strong className="text-white">Cloud &amp; DevOps:</strong> Docker, Vercel, CI/CD Pipelines, Git Version Control, Telemetry &amp; Performance Profiling
                    </div>
                    <div>
                      <strong className="text-white">AI / Emerging Tech:</strong> LLM API Integration, Vector Embeddings, Agentic Coding Assistants, Automated Workflow Synthesis
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#00F0FF] border-b border-white/10 pb-2">
                    Key Projects &amp; Contributions
                  </h3>
                  <div className="space-y-4 text-sm font-light text-neutral-300">
                    <div>
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span>Dual-World Engineering Portfolio OS</span>
                        <span className="font-mono text-xs text-[#00F0FF]">Next.js 16 • GSAP • Tailwind</span>
                      </div>
                      <p className="mt-1 text-neutral-400">
                        Architected an immersive operating system-themed web application blending high-performance developer tools with cinematic storytelling. Engineered Lenis smooth scroll and isolated GSAP contexts.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span>High-Throughput API Gateway &amp; Telemetry Dashboard</span>
                        <span className="font-mono text-xs text-[#00F0FF]">Node.js • Redis • PostgreSQL</span>
                      </div>
                      <p className="mt-1 text-neutral-400">
                        Designed low-latency backend routing and real-time system metrics tracking with zero-downtime deployment pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs uppercase"
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
