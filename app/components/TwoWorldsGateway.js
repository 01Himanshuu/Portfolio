'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * TwoWorldsGateway — "I LIVE IN TWO WORLDS"
 * 
 * Re-imagined as an immersive gateway. Huge typography.
 * Hovering 'SOFTWARE ENGINEER' intensifies cyan environment.
 * Hovering 'CONTENT CREATOR' intensifies violet environment.
 */
export default function TwoWorldsGateway() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredSide, setHoveredSide] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Word-by-word title reveal
      const words = titleRef.current?.querySelectorAll('.tw-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, y: 60 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Parallax on title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -60,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Doors fade in
      const doors = containerRef.current?.querySelectorAll('.tw-door');
      if (doors?.length) {
        gsap.from(doors, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="two-worlds-gateway"
      ref={sectionRef}
      className="relative z-30 w-full min-h-screen py-32 flex flex-col items-center justify-center bg-[#06080c] text-white overflow-hidden"
      aria-label="I live in two worlds"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00F0FF]/10 blur-[150px] transition-all duration-1000 ${hoveredSide === 'eng' ? 'opacity-100 scale-125' : (hoveredSide === 'cre' ? 'opacity-0 scale-75' : 'opacity-40')}`}
        />
        <div
          className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C084FC]/10 blur-[150px] transition-all duration-1000 ${hoveredSide === 'cre' ? 'opacity-100 scale-125' : (hoveredSide === 'eng' ? 'opacity-0 scale-75' : 'opacity-40')}`}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 relative z-10 flex flex-col items-center">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-24 md:mb-32">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase">
            {'I LIVE IN'.split(' ').map((word, i) => (
              <span key={i} className="tw-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
            <br />
            {'TWO WORLDS'.split(' ').map((word, i) => (
              <span key={`b-${i}`} className="tw-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* The Two Doors */}
        <div ref={containerRef} className="w-full flex flex-col md:flex-row justify-center gap-12 md:gap-24 relative">

          {/* Engineering Door */}
          <a
            href="#build"
            className={`tw-door group flex flex-col items-center text-center cursor-pointer transition-all duration-700 ${hoveredSide === 'cre' ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredSide('eng')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#00F0FF] mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
              01 // Systems & Code
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-500">
              Software<br />Engineer
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-500 flex items-end">
              <span className="font-mono text-sm text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Explore Build &rarr;
              </span>
            </div>
          </a>

          {/* Divider */}
          <div className="hidden md:flex w-px h-32 bg-white/10 self-center" />

          {/* Creative Door */}
          <a
            href="#create"
            className={`tw-door group flex flex-col items-center text-center cursor-pointer transition-all duration-700 ${hoveredSide === 'eng' ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredSide('cre')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#C084FC] mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
              02 // Narrative & Motion
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#C084FC] transition-colors duration-500">
              Content<br />Creator
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-12 transition-all duration-500 flex items-end">
              <span className="font-mono text-sm text-[#C084FC] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Explore Create &rarr;
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
