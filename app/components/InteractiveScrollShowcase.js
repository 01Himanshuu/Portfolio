'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticHover from './MagneticHover';
import FloatingSpringSVG from './FloatingSpringSVG';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * InteractiveScrollShowcase — Premium Awwwards-caliber interaction system
 * Features:
 * 1. Pinned horizontal scroll timeline (GSAP ScrollTrigger scrub)
 * 2. Multi-layer scroll parallax (background, mid-ground, foreground)
 * 3. Dynamic translate, scale, rotate, blur, and fade based on scroll
 * 4. Magnetic hover cards & floating spring SVGs
 */
export default function InteractiveScrollShowcase() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const workshopSectionRef = useRef(null);
  const workshopCardsRef = useRef([]);

  const cardsData = [
    {
      id: 1,
      tag: 'SYSTEM ARCHITECTURE',
      title: 'Scalable Systems & Full-Stack Rigor',
      desc: 'Architecting resilient backend pipelines and modular frontend systems built for extreme reliability and performance.',
      metric: '99.99%',
      metricLabel: 'UPTIME ARCHITECTURE',
    },
    {
      id: 2,
      tag: 'CREATIVE ENGINEERING',
      title: 'Award-Winning Visual Polish',
      desc: 'Crafting fluid hardware-accelerated animations, custom shaders, and responsive UI layouts that wow users at first glance.',
      metric: '60 FPS',
      metricLabel: 'BUTTERY RENDERING',
    },
    {
      id: 3,
      tag: 'AI & NEXT-GEN TECH',
      title: 'Agentic Workflows & Deep Integration',
      desc: 'Integrating state-of-the-art LLMs, real-time data streaming, and autonomous toolchains into production consumer apps.',
      metric: '10x',
      metricLabel: 'WORKFLOW VELOCITY',
    },
    {
      id: 4,
      tag: 'CRAFT & COMMUNITY',
      title: 'Storytelling & Technical Education',
      desc: 'Bridging complex technical concepts with intuitive content creation that connects thousands of engineers with technology.',
      metric: '100K+',
      metricLabel: 'COMMUNITY IMPACT',
    },
  ];

  const workshopFeatures = [
    {
      title: 'Distributed Core Architecture',
      category: 'BACKEND • MICROSERVICES',
      status: 'PRODUCTION READY',
    },
    {
      title: 'Real-Time Web Audio Engine',
      category: 'INTERACTIVE AUDIO • WEB API',
      status: 'HYBRID SYNTH',
    },
    {
      title: 'Cinematic Scroll Physics',
      category: 'GSAP • LENIS • FRAMER',
      status: 'AWWWARDS SPEC',
    },
  ];

  useGSAP(
    () => {
      // 1. PINNED HORIZONTAL SCROLL TIMELINE
      const track = horizontalTrackRef.current;
      if (track) {
        const totalScroll = track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScroll + 600}`,
            invalidateOnRefresh: true,
          },
        });

        // Translate track horizontally
        tl.to(
          track,
          {
            x: () => -totalScroll - 100,
            ease: 'none',
          },
          0
        );

        // Scrubbed animations: cards translate, scale, rotate, blur, and fade
        const cards = gsap.utils.toArray('.showcase-card', track);
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              scale: 0.88,
              opacity: 0.45,
              rotateY: 12,
              filter: 'blur(8px)',
            },
            {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left 85%',
                end: 'center 50%',
                scrub: true,
              },
            }
          );
        });
      }

      // 2. PARALLAX LAYERS (Background text vs Foreground badges)
      gsap.utils.toArray('.parallax-layer').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '1');
        gsap.to(el, {
          y: () => (window.innerHeight - el.getBoundingClientRect().top) * speed * 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // 3. WORKSHOP 3D PERSPECTIVE UNFOLD & BLUR SCRUBBING
      workshopCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 90,
            rotateX: 25,
            scale: 0.85,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-16">
      {/* =========================================================
          SECTION 1: PINNED HORIZONTAL SYSTEM ARCHITECTURE
          ========================================================= */}
      <div
        ref={pinSectionRef}
        className="relative flex h-screen min-h-[700px] w-full flex-col justify-center overflow-hidden bg-transparent px-8 md:px-16"
      >
        {/* Background Parallax Layer */}
        <div
          className="parallax-layer pointer-events-none absolute left-6 top-12 select-none opacity-10"
          data-speed="0.4"
        >
          <span className="font-extrabold text-[8vw] uppercase tracking-tighter text-white">
            SYSTEMS • DESIGN • MOTION • POLISH
          </span>
        </div>

        {/* Foreground Decorative SVGs with Spring Motion & Parallax */}
        <FloatingSpringSVG
          type="cube"
          size={72}
          color="#818cf8"
          style={{ top: '15%', right: '12%' }}
          delay={0.2}
        />
        <FloatingSpringSVG
          type="star"
          size={60}
          color="#c084fc"
          style={{ bottom: '18%', left: '8%' }}
          delay={0.6}
        />
        <FloatingSpringSVG
          type="crosshair"
          size={56}
          color="#38bdf8"
          style={{ top: '22%', left: '45%' }}
          delay={0.4}
        />

        {/* Header label for pinned section */}
        <div className="mb-10 max-w-xl">
          <span className="mb-2 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-indigo-400">
            01 / INTERACTION SYSTEM
          </span>
          <h2 className="font-extrabold text-3xl tracking-tight text-white md:text-5xl">
            CRAFTED FOR PERFORMANCE
          </h2>
        </div>

        {/* Horizontal Track */}
        <div
          ref={horizontalTrackRef}
          className="flex w-max items-center gap-8 pl-4 pr-32"
          style={{ perspective: '1200px' }}
        >
          {cardsData.map((card, idx) => (
            <MagneticHover key={card.id} strength={15} className="showcase-card w-[380px] md:w-[480px]">
              <div className="interactive-card group relative flex h-[360px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                {/* Top badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-wider text-indigo-400">
                    {card.tag}
                  </span>
                  <span className="font-mono text-sm text-white/40">
                    0{card.id}
                  </span>
                </div>

                {/* Content */}
                <div className="my-6">
                  <h3 className="mb-3 font-bold text-2xl tracking-tight text-white group-hover:text-indigo-300">
                    {card.title}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-white/70">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Metric */}
                <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
                  <span className="font-extrabold text-3xl tracking-tight text-white">
                    {card.metric}
                  </span>
                  <span className="font-mono text-xs tracking-wider text-white/50">
                    {card.metricLabel}
                  </span>
                </div>
              </div>
            </MagneticHover>
          ))}
        </div>
      </div>

      {/* =========================================================
          SECTION 2: SCROLL-SCRUBBED 3D WORKSHOP & CAPABILITIES
          ========================================================= */}
      <div
        ref={workshopSectionRef}
        className="relative mx-auto max-w-6xl px-6 py-32"
        style={{ perspective: '1200px' }}
      >
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-purple-400">
            02 / CAPABILITIES MATRIX
          </span>
          <h2 className="font-extrabold text-4xl tracking-tight text-white md:text-6xl">
            DIGITAL WORKSHOP
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-white/60">
            Every component is engineered with modular spring physics, hardware acceleration, and custom interactive feedback.
          </p>
        </div>

        {/* Interactive Workshop Capability Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {workshopFeatures.map((feat, i) => (
            <div
              key={feat.title}
              ref={(el) => (workshopCardsRef.current[i] = el)}
              className="interactive-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-purple-400">
                  {feat.category}
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white">
                  {feat.status}
                </span>
              </div>

              <h3 className="font-bold text-xl tracking-tight text-white group-hover:text-purple-300">
                {feat.title}
              </h3>

              <div className="mt-6 flex items-center gap-2 font-mono text-xs text-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span>EXPLORE ARCHITECTURE</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
