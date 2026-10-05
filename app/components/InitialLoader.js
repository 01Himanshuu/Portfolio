'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

// Use useLayoutEffect on the client to avoid flash, fallback to useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const progressLineRef = useRef(null);
  const wrapperRef = useRef(null);
  const loadingTextRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // 1. Check if it has loaded before in this session
    const isLoadedSession = sessionStorage.getItem('hasLoadedBefore');
    if (isLoadedSession) {
      setIsVisible(false);
      return;
    }

    // 2. Lock scrolling immediately
    document.body.style.overflow = 'hidden';

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeScale = isReducedMotion ? 0.2 : 1;

    // We make sure the wrapper is visible (it starts hidden via CSS)
    gsap.set(wrapperRef.current, { visibility: 'visible' });

    // Cinematic Intro State
    gsap.set(textRef.current, { opacity: 0, y: 15, filter: 'blur(8px)' });
    gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(percentRef.current, { opacity: 0, y: 5 });
    gsap.set(loadingTextRef.current, { opacity: 0, y: 5 });

    const tl = gsap.timeline();

    // Intro Reveal Sequence
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.4 * timeScale,
      ease: 'power3.out',
    });
    
    tl.to([loadingTextRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.2 * timeScale,
      ease: 'power2.out',
      stagger: 0.1
    }, "-=0.8");

    // Progress State
    const progress = { value: 0 };
    let isLoadComplete = false;
    let finishTl = null;

    // Animate progress up to 85% quickly to simulate initialization
    const progressAnim = gsap.to(progress, {
      value: 85,
      duration: 2.5 * timeScale,
      ease: 'power2.out',
      onUpdate: () => {
        if (percentRef.current) percentRef.current.innerText = `${Math.round(progress.value)}%`;
        if (progressLineRef.current) gsap.set(progressLineRef.current, { scaleX: progress.value / 100 });
      }
    });

    const triggerReveal = () => {
      if (isLoadComplete) return;
      isLoadComplete = true;
      progressAnim.kill();

      finishTl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('hasLoadedBefore', 'true');
          document.body.style.overflow = '';
          setIsVisible(false);
          window.dispatchEvent(new Event('loaderComplete'));
        }
      });

      // Push progress to 100%
      finishTl.to(progress, {
        value: 100,
        duration: 0.8 * timeScale,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (percentRef.current) percentRef.current.innerText = `${Math.round(progress.value)}%`;
          if (progressLineRef.current) gsap.set(progressLineRef.current, { scaleX: progress.value / 100 });
        }
      });

      // Change "INITIALIZING" to "READY"
      finishTl.add(() => {
        if (loadingTextRef.current) {
          loadingTextRef.current.innerText = "READY";
          loadingTextRef.current.style.color = "#c8ff00";
        }
      }, "-=0.2");

      // Cinematic exit
      finishTl.to([textRef.current, percentRef.current, loadingTextRef.current, progressLineRef.current], {
        opacity: 0,
        y: -15,
        filter: 'blur(10px)',
        duration: 0.8 * timeScale,
        ease: 'power3.in',
        stagger: 0.05
      }, "+=0.3");

      // Slide and curve up the container to reveal the site smoothly
      finishTl.to(containerRef.current, {
        yPercent: -100,
        borderBottomLeftRadius: '30%',
        borderBottomRightRadius: '30%',
        duration: 1.4 * timeScale,
        ease: 'power4.inOut'
      }, "-=0.2");
    };

    const checkLoad = () => {
      if (document.readyState === 'complete') {
        document.fonts.ready.then(triggerReveal);
      } else {
        window.addEventListener('load', () => {
          document.fonts.ready.then(triggerReveal);
        });
      }
    };

    // Begin load checks only after intro animation is well underway
    tl.add(() => {
       checkLoad();
       // Failsafe in case `load` event misses or fonts hang forever
       setTimeout(triggerReveal, 4000 * timeScale);
    }, "-=0.5");

    return () => {
      tl.kill();
      if (progressAnim) progressAnim.kill();
      if (finishTl) finishTl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07070a] text-white overflow-hidden origin-top"
    >
      {/* Noise overlay for cinematic texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '100px 100px' }} 
        aria-hidden="true" 
      />

      <div ref={wrapperRef} className="relative flex flex-col items-center invisible w-full max-w-[280px] md:max-w-xs px-6">
        <h1 
          ref={textRef}
          className="font-sans font-light text-sm md:text-base tracking-[0.35em] text-[#e0e0e0] mb-10 text-center uppercase"
          style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
        >
          Himanshu Jangra
        </h1>
        
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between w-full mb-4 text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-[#888888]">
            <span ref={loadingTextRef} className="uppercase transition-colors duration-300">Initializing</span>
            <span ref={percentRef}>0%</span>
          </div>
          
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div 
              ref={progressLineRef}
              className="absolute inset-0 bg-[#c8ff00] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
