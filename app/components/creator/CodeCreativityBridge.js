'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CodeCreativityBridge() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.bridge-text', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 py-32 md:py-48 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 text-center border-t border-white/5 mt-32">
      
      <div className="bridge-text font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-[#C084FC] mb-12">
        CODE &times; CREATIVITY
      </div>
      
      <h2 className="bridge-text text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[1.1] text-white">
        I build systems like <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white/80">an engineer.</span>
      </h2>
      
      <h2 className="bridge-text text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[1.1] text-white mt-4 md:mt-8">
        I tell stories like <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-white/80">a creator.</span>
      </h2>

    </div>
  );
}
