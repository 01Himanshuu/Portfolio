'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CreativeIntro from './CreativeIntro';
import CreativeDisciplines from './CreativeDisciplines';
import SelectedWork from './SelectedWork';
import MotionDesign from './MotionDesign';
import PhotographyGallery from './PhotographyGallery';
import CodeCreativityBridge from './CodeCreativityBridge';

export default function CreatorSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background Color Shift (Cyan -> Purple/Magenta)
      gsap.to(bgRef.current, {
        opacity: 0.15, // Reveal purple noise/grid
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'top top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-studio"
      ref={sectionRef}
      className="relative w-full bg-[#06080c] text-white overflow-hidden pt-32"
    >
      {/* Dynamic Purple Grid Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(192,132,252,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,132,252,0.1) 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
          maskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-32 md:gap-48 pb-32">
        <CreativeIntro />
        <CreativeDisciplines />
        <SelectedWork />
        <MotionDesign />
        <PhotographyGallery />
        <CodeCreativityBridge />
      </div>
    </section>
  );
}
