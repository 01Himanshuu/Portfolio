'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PHOTOS = [
  {
    id: 'p1',
    image: '/projects/spiti_edit_preview_1786456941377.png',
    location: 'Himalayas, India',
    camera: 'Sony A7IV',
    lens: '24-70mm f/2.8',
    type: 'Travel / Landscape',
    align: 'left' // Will render full width but text aligned
  },
  {
    id: 'p2',
    image: '/projects/udaipur_edit_preview_1786456883466.png',
    location: 'Udaipur, Rajasthan',
    camera: 'Sony A7IV',
    lens: '85mm f/1.8',
    type: 'Architecture / Cinematic',
    align: 'right'
  }
];

export default function PhotographyGallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray('.photo-frame');
      frames.forEach(frame => {
        gsap.from(frame, {
          opacity: 0,
          y: 100,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 85%',
            once: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 py-32 flex flex-col gap-40 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20">
      
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="font-mono text-sm tracking-[0.3em] uppercase text-[#C084FC] mb-6">
          05 // Photography
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white max-w-2xl">
          Visual Documentation
        </h2>
      </div>

      {PHOTOS.map((photo, idx) => {
        const isLeft = photo.align === 'left';

        return (
          <div key={photo.id} className="photo-frame flex flex-col w-full group cursor-default">
            
            {/* The Image (Asymmetrical Widths based on idx) */}
            <div className={`w-full ${idx % 2 === 0 ? 'md:w-10/12 self-start' : 'md:w-8/12 self-end'} aspect-[4/3] md:aspect-[16/10] bg-black overflow-hidden relative mb-8 rounded-sm`}>
               <img 
                 src={photo.image}
                 alt={photo.location}
                 loading="lazy"
                 className="w-full h-full object-cover transform scale-[1.01] transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
            </div>

            {/* Minimal Metadata */}
            <div className={`flex flex-col md:flex-row gap-6 md:gap-16 ${idx % 2 === 0 ? 'self-start' : 'self-end md:w-8/12 justify-between'}`}>
               <div>
                 <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Location</h4>
                 <p className="font-mono text-xs tracking-wider text-white uppercase">{photo.location}</p>
               </div>
               <div>
                 <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Gear</h4>
                 <p className="font-mono text-xs tracking-wider text-white uppercase">{photo.camera} / {photo.lens}</p>
               </div>
               <div>
                 <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Style</h4>
                 <p className="font-mono text-xs tracking-wider text-[#C084FC] uppercase">{photo.type}</p>
               </div>
            </div>

          </div>
        );
      })}

    </div>
  );
}
