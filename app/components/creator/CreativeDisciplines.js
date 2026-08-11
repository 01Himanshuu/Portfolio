'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DISCIPLINES = [
  {
    id: '01',
    title: 'VIDEO EDITING',
    desc: 'Cinematic cuts, pacing, sound design, and narrative editing for short-form content and films.',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    align: 'left'
  },
  {
    id: '02',
    title: 'MOTION GRAPHICS',
    desc: 'Kinetic typography, transitions, visual effects, and advanced 2D/3D compositing.',
    tools: ['After Effects', 'Cinema 4D'],
    align: 'right'
  },
  {
    id: '03',
    title: 'CONTENT STRATEGY',
    desc: 'Audience retention mechanics, visual hooks, and social-first content packaging.',
    tools: ['Storytelling', 'Analytics', 'Copywriting'],
    align: 'left'
  },
  {
    id: '04',
    title: 'PHOTOGRAPHY',
    desc: 'Digital portraiture, low-light street photography, and intentional color grading.',
    tools: ['Lightroom', 'Sony Alpha'],
    align: 'right'
  },
  {
    id: '05',
    title: 'BRAND CAMPAIGNS',
    desc: 'End-to-end event content, product storytelling, and digital brand presence.',
    tools: ['Creative Direction', 'Production'],
    align: 'left'
  }
];

export default function CreativeDisciplines() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.disc-item');
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-32 md:gap-48 px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto">
      {DISCIPLINES.map((disc, idx) => {
        const isLeft = disc.align === 'left';
        
        return (
          <div key={disc.id} className="disc-item w-full flex flex-col lg:flex-row gap-16 lg:gap-32 items-center group">
            
            {/* Visual/Media Side (Abstract Typographic Placeholder) */}
            <div className={`w-full lg:w-1/2 aspect-[4/3] rounded-sm bg-[#0a0c10] border border-white/5 relative overflow-hidden flex items-center justify-center ${isLeft ? 'order-1' : 'order-1 lg:order-2'}`}>
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.05)_0%,transparent_70%)]" />
               <span className="text-[12rem] md:text-[16rem] font-black tracking-tighter text-white/5 select-none transform transition-transform duration-1000 group-hover:scale-110">
                 {disc.id}
               </span>
               <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-neutral-600">
                 [ Visual Placeholder ]
               </div>
            </div>

            {/* Content Side */}
            <div className={`w-full lg:w-1/2 flex flex-col ${isLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
              <span className="font-mono text-sm md:text-base tracking-[0.2em] text-[#C084FC] mb-4">
                {disc.id}
              </span>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
                {disc.title}
              </h3>
              <p className="text-lg md:text-2xl font-light text-neutral-300 leading-relaxed mb-12 max-w-lg">
                {disc.desc}
              </p>
              
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase border-b border-white/10 pb-2 max-w-[200px]">
                  Tools & Disciplines
                </span>
                <div className="flex flex-wrap gap-3 mt-2">
                  {disc.tools.map(tool => (
                    <span key={tool} className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-neutral-400 group-hover:border-[#C084FC]/30 group-hover:text-white transition-colors duration-500">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
