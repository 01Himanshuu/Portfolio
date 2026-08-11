'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CLUSTERS = [
  {
    id: 'FRONTEND',
    sysId: 'SYS.FE.01',
    description: 'Client-side architecture & UI/UX engineering',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'HTML5']
  },
  {
    id: 'BACKEND',
    sysId: 'SYS.BE.02',
    description: 'Server logic, APIs, and microservices',
    tech: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST', 'GraphQL']
  },
  {
    id: 'DATABASE / CLOUD',
    sysId: 'SYS.DB.03',
    description: 'Data persistence & infrastructure',
    tech: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'AWS', 'Docker']
  },
  {
    id: 'AI / SYSTEMS',
    sysId: 'SYS.AI.04',
    description: 'LLM integrations & distributed logic',
    tech: ['OpenAI API', 'LangChain', 'Pinecone', 'Agentic Workflows', 'WebRTC']
  },
  {
    id: 'TOOLS',
    sysId: 'SYS.TL.05',
    description: 'Version control & developer experience',
    tech: ['Git', 'GitHub', 'CI/CD Pipelines', 'Vercel', 'VS Code']
  }
];

export default function EngineeringToolkit() {
  const containerRef = useRef(null);
  const [hoveredCluster, setHoveredCluster] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.cluster-panel', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 py-32 mb-32 max-w-[1400px] mx-auto">
      
      {/* Editorial Header */}
      <div className="mb-20 px-6 sm:px-12 md:px-20">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#00F0FF] mb-6 flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          SYSTEM / TOOLKIT
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
          Engineering<br/>Control Surface
        </h2>
      </div>

      {/* Control Surface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border-y border-white/10">
        {CLUSTERS.map((cluster, idx) => {
          const isHovered = hoveredCluster === idx;
          const isFaded = hoveredCluster !== null && !isHovered;

          return (
            <div 
              key={cluster.id}
              className={`cluster-panel relative p-8 md:p-12 lg:p-16 bg-[#06080c] flex flex-col justify-between transition-all duration-500 overflow-hidden ${isFaded ? 'opacity-30 blur-[2px]' : 'opacity-100'} hover:bg-white/[0.02]`}
              onMouseEnter={() => setHoveredCluster(idx)}
              onMouseLeave={() => setHoveredCluster(null)}
            >
              {/* Background Glow */}
              <div 
                className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />

              <div className="relative z-10">
                {/* Meta Labels */}
                <div className="flex justify-between items-center mb-12">
                  <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase border border-white/10 px-2 py-1 rounded">
                    {cluster.sysId}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#00F0FF]' : 'bg-white/20'}`} />
                </div>

                {/* Cluster Title & Desc */}
                <div className="mb-16">
                  <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-300 mb-4 ${isHovered ? 'text-white' : 'text-neutral-400'}`}>
                    {cluster.id}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                    {cluster.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="relative z-10 flex flex-wrap gap-3">
                {cluster.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className={`font-mono text-xs md:text-sm tracking-wider uppercase px-4 py-2 border transition-all duration-300 ${isHovered ? 'border-[#00F0FF]/30 text-[#00F0FF] bg-[#00F0FF]/5' : 'border-white/10 text-neutral-400 bg-transparent'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
