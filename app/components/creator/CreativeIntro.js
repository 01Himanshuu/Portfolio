'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CreativeIntro() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.ci-text', {
        y: 80,
        opacity: 0,
        rotationX: 10,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
      
      // Gentle parallax on the container
      gsap.to(containerRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 mt-32 md:mt-48 perspective-1000">
      
      <div className="ci-text font-mono text-sm md:text-base tracking-[0.3em] uppercase text-[#C084FC] mb-12 flex items-center gap-6">
        <span className="w-12 h-px bg-[#C084FC]/50" />
        03 // Creative Studio
      </div>
      
      <h2 className="ci-text text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.9] text-white">
        EDIT.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">CREATE.</span><br />
        <span className="text-[#C084FC]">TELL STORIES.</span>
      </h2>
      
    </div>
  );
}
