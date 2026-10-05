'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from './SoundProvider';

/**
 * TwoWorldsGateway — "I LIVE IN TWO WORLDS"
 * 
 * Re-imagined as an immersive gateway. Huge typography.
 * Hovering 'SOFTWARE ENGINEER' intensifies cyan environment.
 * Hovering 'CONTENT CREATOR' intensifies violet environment.
 * Progressive enhancement ensures it's never blank.
 */
export default function TwoWorldsGateway() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const doorsWrapperRef = useRef(null);
  const engDoorRef = useRef(null);
  const creDoorRef = useRef(null);
  const dividerRef = useRef(null);

  const { playClick } = useSound();
  const [hoveredSide, setHoveredSide] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDoorClick = (e, targetId, side) => {
    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);
    setHoveredSide(side);
    playClick();

    const color = targetId === '#creative-studio' ? '#C084FC' : '#E6395F';

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('triggerCinematicWipe', {
        detail: { targetId, color }
      }));

      // Release transition lock slightly after wipe finishes (1.6s total duration)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1600);
    } else {
      window.location.hash = targetId;
      setIsTransitioning(false);
    }
  };

  // Refresh ScrollTrigger after loader finishes to fix layout measurements
  useEffect(() => {
    const handleLoaderComplete = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100); // small buffer to ensure DOM layout settles
    };
    window.addEventListener('loaderComplete', handleLoaderComplete);
    return () => window.removeEventListener('loaderComplete', handleLoaderComplete);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // DESKTOP: Pinned scrub sequence
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%", // 1.5x screen height for scrub
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Step 1: Scale down title and move it up slightly
        tl.to(titleWrapperRef.current, {
          scale: 0.65,
          yPercent: -20,
          opacity: 0.4,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        // Step 2: Separate natural reveal for Doors
        gsap.from([engDoorRef.current, creDoorRef.current], {
          y: 40,
          // removed opacity: 0 so it stays fully visible!
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: doorsWrapperRef.current,
            start: "top 85%"
          }
        });

        // Step 3: Separate natural reveal for Divider line
        gsap.from(dividerRef.current, {
          scaleY: 0,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          transformOrigin: "top center",
          ease: "power2.out",
          scrollTrigger: {
            trigger: doorsWrapperRef.current,
            start: "top 85%"
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE: Simple fade-up sequence, NO pinning
        gsap.from(titleRef.current.querySelectorAll('.tw-word'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleWrapperRef.current,
            start: 'top 80%',
          }
        });

        gsap.from([engDoorRef.current, creDoorRef.current], {
          y: 30,
          // removed opacity: 0 so it stays fully visible!
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: doorsWrapperRef.current,
            start: 'top 85%',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="two-worlds-gateway"
      ref={sectionRef}
      className="relative z-30 w-full bg-[#06080c] text-white overflow-hidden"
      aria-label="I live in two worlds"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-0 md:left-1/4 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#E6395F]/10 blur-[120px] md:blur-[150px] transition-all duration-1000 ease-out ${hoveredSide === 'eng' ? 'opacity-100 scale-110' : (hoveredSide === 'cre' ? 'opacity-0 scale-90' : 'opacity-40')}`}
        />
        <div
          className={`absolute top-1/2 right-0 md:right-1/4 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#C084FC]/10 blur-[120px] md:blur-[150px] transition-all duration-1000 ease-out ${hoveredSide === 'cre' ? 'opacity-100 scale-110' : (hoveredSide === 'eng' ? 'opacity-0 scale-90' : 'opacity-40')}`}
        />
      </div>

      <div ref={containerRef} className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-6 sm:px-12 py-24 md:py-0 md:h-screen">

        {/* Title */}
        <div ref={titleWrapperRef} className="md:absolute md:top-[15%] flex items-center justify-center pointer-events-none mb-16 md:mb-0 w-full">
          <h2 ref={titleRef} className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.95] md:leading-[0.85] uppercase text-center w-full">
            {'I LIVE IN'.split(' ').map((word, i) => (
              <span key={i} className="tw-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
            <br />
            {'TWO WORLDS'.split(' ').map((word, i) => (
              <span key={`b-${i}`} className="tw-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* The Two Doors */}
        <div ref={doorsWrapperRef} className="w-full max-w-[1400px] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-16 md:gap-0 relative md:absolute md:bottom-[15%] px-0 lg:px-12">

          {/* Engineering Door */}
          <a
            ref={engDoorRef}
            href="#build"
            className={`tw-door group flex flex-col items-center md:items-start text-center md:text-left cursor-pointer transition-all duration-700 ease-out w-full md:w-[45%] ${hoveredSide === 'cre' ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
            onMouseEnter={() => !isTransitioning && setHoveredSide('eng')}
            onMouseLeave={() => !isTransitioning && setHoveredSide(null)}
            onClick={(e) => handleDoorClick(e, '#build', 'eng')}
          >
            <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#E6395F] mb-4 md:mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              01 // Systems & Code
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#E6395F] transition-colors duration-500 leading-none">
              Software<br />Engineer
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-8 md:group-hover:h-12 transition-all duration-500 flex items-end justify-center md:justify-start w-full mt-2 md:mt-4">
              <span className="font-mono text-xs md:text-sm text-[#E6395F] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Explore Build &rarr;
              </span>
            </div>
          </a>

          {/* Divider */}
          <div ref={dividerRef} className="hidden md:block w-px h-32 lg:h-64 bg-white/10 self-center origin-top" />

          {/* Creative Door */}
          <a
            ref={creDoorRef}
            href="#creative-studio"
            className={`tw-door group flex flex-col items-center md:items-end text-center md:text-right cursor-pointer transition-all duration-700 ease-out w-full md:w-[45%] ${hoveredSide === 'eng' ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
            onMouseEnter={() => !isTransitioning && setHoveredSide('cre')}
            onMouseLeave={() => !isTransitioning && setHoveredSide(null)}
            onClick={(e) => handleDoorClick(e, '#creative-studio', 'cre')}
          >
            <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C084FC] mb-4 md:mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              02 // Narrative & Motion
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#C084FC] transition-colors duration-500 leading-none">
              Content<br />Creator
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-8 md:group-hover:h-12 transition-all duration-500 flex items-end justify-center md:justify-end w-full mt-2 md:mt-4">
              <span className="font-mono text-xs md:text-sm text-[#C084FC] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                Explore Create &rarr;
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
