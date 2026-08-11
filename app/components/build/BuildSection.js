'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SelectedProjects from './SelectedProjects';
import EngineeringToolkit from './EngineeringToolkit';

export default function BuildSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro text reveal
      gsap.from('.build-intro-text', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.build-intro-container',
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative w-full bg-[#06080c] text-white pt-40 md:pt-64 overflow-hidden"
      aria-label="Software Engineering Section"
    >
      {/* Subtle Grid / Noise Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.1) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Intro Container (Massive Whitespace) */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10 build-intro-container mb-40 md:mb-64">
        <div className="max-w-5xl">
          <div className="build-intro-text font-mono text-sm tracking-[0.3em] uppercase text-[#00F0FF] mb-8">
            01 // Engineering Case Studies
          </div>
          
          <h2 className="build-intro-text text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.9] mb-12 text-white">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white/60">
              / SELECTED WORK
            </span>
          </h2>
          
          <p className="build-intro-text text-xl md:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            I build scalable web applications, AI-powered systems, and digital products with a focus on performance, clarity, and maintainable architecture.
          </p>
        </div>
      </div>

      {/* Selected Projects Component */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10">
        <SelectedProjects />
      </div>

      {/* Engineering Toolkit Component */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10">
        <EngineeringToolkit />
      </div>

    </section>
  );
}
