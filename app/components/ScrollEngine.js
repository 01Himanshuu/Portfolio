'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MasterTimeline from './MasterTimeline';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollEngine — High-Performance Lenis Config + GSAP Ticker Synchronization
 * Renders MasterTimeline to orchestrate the exact haoqi.design Hero -> Introduction slideover
 */
export default function ScrollEngine({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;
    window.__gsap = gsap;
    window.__ScrollTrigger = ScrollTrigger;

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete window.__lenis;
      delete window.__gsap;
      delete window.__ScrollTrigger;
    };
  }, []);

  return (
    <>
      <MasterTimeline />
      {children}
    </>
  );
}
