'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CollaborateTerminal from './CollaborateTerminal';

/**
 * ContactSection — Interactive Contact & Collaboration Terminal
 *
 * Provides direct connection to Himanshu Jangra:
 * - Email, GitHub (01himanshuu), LinkedIn, Instagram
 * - Direct links to specialized Tech and Social Media pages/resumes
 */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-30 w-full py-28 pb-36 bg-[#0a0a0c] text-white overflow-hidden select-none border-t border-white/10"
      aria-label="Collaborate and Contact Himanshu Jangra"
    >
      {/* Background Cyan/Purple Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/10 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C084FC]/10 blur-[170px] pointer-events-none" />

      <div className="global-content-grid relative z-10">
        {/* Module Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-xs uppercase tracking-[0.3em] text-neutral-300 font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>06 // COLLABORATE // DIRECT CONNECTION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] mb-6 font-sans">
            <span className="block text-white">LET&apos;S BUILD SOMETHING</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#C084FC]">
              UNFORGETTABLE
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto">
            Whether you&apos;re looking to scale an engineering platform or tell an immersive digital story, I&apos;m ready to collaborate.
          </p>
        </div>

        {/* Interactive Collaborate Terminal */}
        <CollaborateTerminal />

        {/* Footer Copyright */}
        <div className="mt-28 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <span>HIMANSHU JANGRA &copy; 2026 // ALL RIGHTS RESERVED</span>
          <span>THINKING IN SYSTEMS • BUILDING WITH CARE</span>
        </div>
      </div>
    </section>
  );
}
