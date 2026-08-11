'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CREATIVE_WORK = [
  {
    id: 'udaipur',
    title: 'UDAIPUR',
    category: 'TRAVEL / CINEMATIC',
    year: '2025',
    role: 'DIRECTOR / EDITOR',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design'],
    image: '/projects/udaipur_edit_preview_1786456883466.png',
    description: 'A cinematic travel film capturing the architectural heritage and serene landscapes of Udaipur. Shot in 4K LOG, the edit focuses on atmospheric pacing and a warm, high-contrast color grade.'
  },
  {
    id: 'spiti',
    title: 'SPITI VALLEY',
    category: 'DOCUMENTARY',
    year: '2024',
    role: 'CINEMATOGRAPHER',
    tools: ['Sony Alpha', 'Color Grading', 'After Effects'],
    image: '/projects/spiti_edit_preview_1786456941377.png',
    description: 'A rugged documentary-style visual exploration of the Himalayas. Emphasizes harsh lighting, dramatic scale, and an intimate, unpolished aesthetic.'
  },
  {
    id: 'prom-night',
    title: 'PROM NIGHT 26',
    category: 'EVENT FILM',
    year: '2026',
    role: 'EDITOR / MOTION DESIGN',
    tools: ['After Effects', 'Kinetic Typography', 'VFX'],
    image: '/projects/prom_night_preview_1786456956614.png',
    description: 'A high-energy event aftermovie relying heavily on motion graphics, speed ramping, and aggressive sound design to capture the tempo of the night.'
  }
];

export default function SelectedWork() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [activeWork, setActiveWork] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.work-item');
      items.forEach(item => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          }
        });
      });
    }, containerRef);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const overlay = overlayRef.current;
        if (overlay && overlay.style.display !== 'none' && overlay.style.opacity !== '0') {
          document.body.style.overflow = '';
          gsap.to(overlay, {
            opacity: 0,
            y: '10%',
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
              gsap.set(overlay, { display: 'none' });
              setActiveWork(null);
            }
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openViewer = (work) => {
    document.body.style.overflow = 'hidden';
    setActiveWork(work);
    
    gsap.set(overlayRef.current, {
      opacity: 0,
      y: '100%',
      display: 'flex'
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      y: '0%',
      duration: 0.8,
      ease: 'power4.out',
    });
  };

  const closeViewer = () => {
    document.body.style.overflow = '';
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: '10%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' });
        setActiveWork(null);
      }
    });
  };

  return (
    <div ref={containerRef} className="w-full relative z-10 py-20 px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto">
      
      <div className="font-mono text-sm tracking-[0.3em] uppercase text-[#C084FC] mb-20 border-b border-white/10 pb-4">
        SELECTED WORK // CINEMATIC
      </div>

      <div className="flex flex-col gap-32 md:gap-48">
        {CREATIVE_WORK.map((work) => (
          <div key={work.id} className="work-item group cursor-pointer" onClick={() => openViewer(work)}>
            
            {/* Metadata Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 transition-transform duration-500 group-hover:translate-x-2">
                  {work.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs tracking-widest text-neutral-400 uppercase">
                  <span>{work.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{work.year}</span>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
                <span className="font-mono text-xs tracking-widest text-[#C084FC] uppercase">
                  {work.role}
                </span>
                <span className="text-sm font-light text-neutral-400 max-w-xs">
                  {work.tools.join(' / ')}
                </span>
              </div>
            </div>

            {/* Massive Visual Presentation */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-black overflow-hidden relative">
              <img 
                src={work.image} 
                alt={work.title}
                loading="lazy"
                className="w-full h-full object-cover transform scale-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100 filter group-hover:brightness-110"
              />
              
              {/* Play / View Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12">
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-white flex items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="w-10 h-px bg-white" />
                  VIEW EDITORIAL
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Immersive Project Viewer */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[100] bg-[#030406] hidden flex-col overflow-y-auto"
      >
        {activeWork && (
          <div className="min-h-screen w-full relative pb-32">
            
            {/* Viewer Header */}
            <div className="absolute top-0 w-full p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
              <span className="font-mono text-xs tracking-[0.2em] text-white uppercase">
                {activeWork.title} // {activeWork.year}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); closeViewer(); }}
                className="font-mono text-xs tracking-[0.2em] text-white uppercase hover:text-[#C084FC] transition-colors"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Edge-to-Edge Media */}
            <div className="w-full h-[70vh] md:h-screen bg-black">
              <img 
                src={activeWork.image} 
                alt={`${activeWork.title} Detail`} 
                loading="lazy"
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Viewer Content */}
            <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 -mt-20 md:-mt-32 relative z-10">
              <div className="bg-[#0a0c10]/95 backdrop-blur-2xl border border-white/5 p-8 md:p-16 flex flex-col md:flex-row gap-16 md:gap-24 shadow-2xl">
                
                <div className="w-full md:w-1/3 flex flex-col gap-8">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Category</h4>
                    <p className="font-mono text-xs tracking-wider text-white uppercase">{activeWork.category}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Role</h4>
                    <p className="font-mono text-xs tracking-wider text-[#C084FC] uppercase">{activeWork.role}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activeWork.tools.map(t => (
                        <span key={t} className="px-3 py-1 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white mb-8">
                    {activeWork.title}
                  </h2>
                  <p className="text-lg md:text-2xl font-light leading-relaxed text-neutral-300">
                    {activeWork.description}
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
