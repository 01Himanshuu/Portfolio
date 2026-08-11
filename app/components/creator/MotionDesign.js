'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MotionDesign() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      // Simple, elegant motion: the text transforms as you scroll
      tl.to('.motion-word-2', { opacity: 1, y: 0, duration: 1 })
        .to('.motion-word-3', { opacity: 1, y: 0, duration: 1 })
        .to('.motion-word-1', { color: '#C084FC', duration: 1 }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 py-32 md:py-64 flex flex-col items-center justify-center min-h-[70vh] border-y border-white/5 bg-[#0a0c12]">
      
      <div className="font-mono text-xs tracking-[0.4em] uppercase text-neutral-500 mb-12">
        04 // Motion Design
      </div>

      <div ref={textRef} className="flex flex-col items-center justify-center text-center leading-[0.85]">
        
        <div className="overflow-hidden pb-4">
          <h2 className="motion-word-1 text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter text-white transition-colors duration-500">
            MOTION
          </h2>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 overflow-hidden pb-4">
          <span className="font-mono text-sm md:text-xl text-neutral-500 italic">IS</span>
          <h2 className="motion-word-2 text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter text-white opacity-20 transform translate-y-12">
            TIMING.
          </h2>
        </div>

        <div className="flex items-center gap-4 md:gap-8 overflow-hidden pt-4">
          <h2 className="motion-word-3 text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter text-[#C084FC] opacity-0 transform translate-y-20">
            STORY.
          </h2>
        </div>

      </div>

    </div>
  );
}
