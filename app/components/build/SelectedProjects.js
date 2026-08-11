'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MacWindow from '../ds/MacWindow';

const PROJECTS = [
  {
    id: 'roomie-bu',
    name: 'RoomieBU',
    category: 'FULL STACK',
    description: 'A university roommate matching platform.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'AWS'],
    image: '/projects/roomie_bu_preview_1786448724743.png',
    accent: '#00F0FF',
    caseStudy: {
      overview: 'RoomieBU is a centralized platform designed to solve the friction of university housing and roommate discovery.',
      role: 'Full-Stack Engineer',
      engineering: 'Architected a relational database schema in PostgreSQL using Prisma ORM. Implemented server-side rendering with Next.js App Router for optimal SEO.',
      features: 'Messaging, filtering algorithms, user authentication (OAuth), and profile generation.',
      challenges: 'Handling concurrent traffic spikes during peak housing seasons required optimizing database indexes.',
      result: 'Deployed and adopted by the student community.',
      links: { github: 'https://github.com/01himanshuu' }
    }
  },
  {
    id: 'skill-sync',
    name: 'Skill Sync',
    category: 'WEB RTC / COLLABORATION',
    description: 'Developer skill-sharing and interactive technical mentorship platform.',
    tech: ['React 19', 'Node.js', 'WebRTC', 'Redis'],
    image: '/projects/skill_sync_preview_1786448746765.png',
    accent: '#C084FC',
    caseStudy: {
      overview: 'Skill Sync bridges the gap between junior and senior developers by providing an environment for technical mentorship and pair programming.',
      role: 'Frontend Architect & WebRTC Engineer',
      engineering: 'Engineered a WebRTC signaling server using Node.js and Redis pub/sub. Built a concurrent rendering pipeline in React 19 to handle high-frequency state updates.',
      features: 'Code editor synchronization, audio/video communication, interactive whiteboard.',
      challenges: 'Maintaining state consistency across distributed clients over unstable networks using Operational Transformation (OT) patterns.',
      result: 'Optimized for low-latency code synchronization.',
      links: { github: 'https://github.com/01himanshuu' }
    }
  },
  {
    id: 'zero-trust',
    name: 'Zero-Trust API Gateway',
    category: 'CYBERSECURITY',
    description: 'Multi-tenant microservice router with strict JWT verification.',
    tech: ['Node.js', 'GraphQL', 'Redis', 'Docker'],
    image: '/projects/zero_trust_preview_1786451034883.png',
    accent: '#27C93F',
    caseStudy: {
      overview: 'A distributed API gateway designed to enforce zero-trust security policies across a fleet of internal microservices.',
      role: 'Systems Engineer & Security Architect',
      engineering: 'Designed a proxy layer using Node.js. Integrated Redis for distributed token-bucket rate limiting and session invalidation.',
      features: 'Strict JWT signature verification, IP blocklisting, dynamic rate limiting.',
      challenges: 'Minimizing the latency overhead of cryptographic token verification on every request via caching strategies.',
      result: 'Designed for high-throughput and minimal latency overhead.',
      links: { github: 'https://github.com/01himanshuu' }
    }
  },
  {
    id: 'ai-prompt-router',
    name: 'AI Prompt Router',
    category: 'SYSTEMS / AI',
    description: 'Enterprise LLM gateway with vector embeddings.',
    tech: ['Python', 'FastAPI', 'Pinecone', 'LangChain'],
    image: '/projects/ai_prompt_router_preview_1786451110853.png',
    accent: '#FFBD2E',
    caseStudy: {
      overview: 'An intelligent proxy that intercepts, analyzes, and routes LLM prompts to the most capable models based on semantic context.',
      role: 'Backend AI Engineer',
      engineering: 'Built an async Python backend using FastAPI. Integrated LangChain for prompt normalization and Pinecone for semantic similarity searches.',
      features: 'Dynamic model routing, prompt caching, embedding generation.',
      challenges: 'Handling TTFT (Time To First Token) variance of downstream LLM providers through asynchronous streaming.',
      result: 'Optimized LLM API costs through intelligent caching.',
      links: { github: 'https://github.com/01himanshuu' }
    }
  }
];

export default function SelectedProjects() {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const overlayRef = useRef(null);
  const overlayContentRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.project-editorial-row');
      rows.forEach((row) => {
        gsap.from(row, {
          y: 100,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            once: true,
          }
        });
      });
    }, containerRef);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Need to call handleCloseCaseStudy, but it depends on scope.
        // We can just trigger the close logic if overlay is open.
        const overlay = overlayRef.current;
        if (overlay && overlay.style.display !== 'none' && overlay.style.opacity !== '0') {
          document.body.style.overflow = '';
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => {
              setActiveProject(null);
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

  const handleOpenCaseStudy = (e, project) => {
    // Prevent scrolling while overlay is open
    document.body.style.overflow = 'hidden';
    setActiveProject(project);

    const rect = e.currentTarget.getBoundingClientRect();

    gsap.set(overlayRef.current, {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      opacity: 0,
      zIndex: 100,
      borderRadius: '24px',
      backgroundColor: '#0c0e14',
    });

    gsap.to(overlayRef.current, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      opacity: 1,
      borderRadius: '0px',
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
         gsap.fromTo('.cs-stagger', 
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
         );
      }
    });
  };

  const handleCloseCaseStudy = () => {
    document.body.style.overflow = '';
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setActiveProject(null);
      }
    });
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-32 md:gap-48 py-20">
      
      {PROJECTS.map((project, idx) => (
        <div key={project.id} className="project-editorial-row group relative w-full flex flex-col xl:flex-row gap-12 xl:gap-24 items-center">
          
          {/* Content Column */}
          <div className="w-full xl:w-5/12 flex flex-col order-2 xl:order-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-sm tracking-widest text-neutral-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: project.accent }}>
                {project.category}
              </span>
            </div>
            
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-none group-hover:text-white transition-colors duration-500 transform group-hover:translate-x-2">
              {project.name}
            </h3>

            <p className="text-lg md:text-xl font-light text-neutral-300 leading-relaxed mb-10 max-w-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.tech.map(t => (
                <span key={t} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 transition-colors group-hover:bg-white/10 group-hover:border-white/20">
                  {t}
                </span>
              ))}
            </div>

            <button 
              onClick={(e) => handleOpenCaseStudy(e, project)}
              className="group/btn self-start flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-white hover:text-[#00F0FF] transition-colors"
            >
              <span className="border-b border-transparent group-hover/btn:border-[#00F0FF] pb-1 transition-all">
                View Case Study
              </span>
              <span className="transform group-hover/btn:translate-x-2 transition-transform duration-400 ease-out">
                &rarr;
              </span>
            </button>
          </div>

          {/* Visual Column */}
          <div className="w-full xl:w-7/12 order-1 xl:order-2 flex-shrink-0 relative">
            <div onClick={(e) => handleOpenCaseStudy(e, project)} className="cursor-pointer block">
              <MacWindow title={`build@env: ~/${project.id}`} variant="eng" size="full" innerClassName="bg-[#0c0e14]">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-black border border-white/10">
                  <img 
                    src={project.image}
                    alt={`${project.name} Preview`}
                    loading="lazy"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  {/* Subtle overlay glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </MacWindow>
            </div>
          </div>
          
        </div>
      ))}

      {/* Full-Screen Case Study Detail Overlay */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[100] pointer-events-none opacity-0 flex flex-col bg-[#06080c] overflow-y-auto"
      >
        {activeProject && (
          <div ref={overlayContentRef} className="w-full min-h-screen pointer-events-auto pb-32">
            
            {/* Overlay Header */}
            <div className="w-full h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-12 sticky top-0 bg-[#06080c]/90 backdrop-blur-xl z-50">
               <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: activeProject.accent }}>
                 Case Study // {activeProject.id}
               </span>
               <button 
                 onClick={handleCloseCaseStudy}
                 className="font-mono text-xs uppercase tracking-[0.2em] hover:text-white text-neutral-400 transition-colors"
               >
                 [ CLOSE ]
               </button>
            </div>

            <div className="max-w-[1200px] mx-auto pt-24 px-6 md:px-12">
               
               {/* Header Hero */}
               <div className="mb-24 cs-stagger">
                 <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-white mb-8 leading-[0.9]">
                   {activeProject.name}
                 </h2>
                 <p className="text-xl md:text-3xl font-light text-neutral-300 max-w-4xl leading-relaxed">
                   {activeProject.description}
                 </p>
               </div>

               {/* Massive Media Presentation */}
               <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-black mb-32 cs-stagger border border-white/10 shadow-2xl">
                 <img src={activeProject.image} alt={`${activeProject.name} Detail`} loading="lazy" className="w-full h-full object-cover" />
               </div>

               {/* Case Study Grid */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-32">
                 
                 {/* Left Column (Meta) */}
                 <div className="md:col-span-4 flex flex-col gap-12">
                    
                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 border-b border-white/10 pb-2 mb-4">02 — Role</h4>
                      <p className="text-base text-neutral-300 leading-relaxed font-light">{activeProject.caseStudy.role}</p>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 border-b border-white/10 pb-2 mb-4">03 — Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-300">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 border-b border-white/10 pb-2 mb-4">08 — Links</h4>
                      <div className="flex flex-col gap-3">
                        {activeProject.caseStudy.links.github && (
                          <a href={activeProject.caseStudy.links.github} className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] hover:underline">GITHUB REPOSITORY &rarr;</a>
                        )}
                        {activeProject.caseStudy.links.demo && (
                          <a href={activeProject.caseStudy.links.demo} className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] hover:underline">LIVE DEPLOYMENT &rarr;</a>
                        )}
                      </div>
                    </div>

                 </div>

                 {/* Right Column (Content) */}
                 <div className="md:col-span-8 flex flex-col gap-16">
                    
                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">01 — Overview</h4>
                      <p className="text-xl md:text-2xl font-light text-white leading-relaxed">{activeProject.caseStudy.overview}</p>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">04 — Engineering</h4>
                      <p className="text-lg md:text-xl font-light text-neutral-300 leading-relaxed">{activeProject.caseStudy.engineering}</p>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">05 — Features</h4>
                      <p className="text-lg md:text-xl font-light text-neutral-300 leading-relaxed">{activeProject.caseStudy.features}</p>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">06 — Challenges</h4>
                      <p className="text-lg md:text-xl font-light text-neutral-300 leading-relaxed">{activeProject.caseStudy.challenges}</p>
                    </div>

                    <div className="cs-stagger">
                      <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">07 — Result</h4>
                      <p className="text-lg md:text-xl font-light text-white leading-relaxed">{activeProject.caseStudy.result}</p>
                    </div>

                 </div>
               </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
