'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CinematicWipeOverlay() {
  const overlayRef = useRef(null);
  const [color, setColor] = useState('#030406');

  useEffect(() => {
    const handleWipe = (e) => {
      const { targetId, color: wipeColor } = e.detail;
      
      if (wipeColor) {
        setColor(wipeColor);
      }

      const tl = gsap.timeline();

      // 1. Wipe In (Cover screen)
      tl.fromTo(overlayRef.current, 
        { y: '100%' }, 
        { 
          y: '0%', 
          duration: 0.8, 
          ease: 'power4.inOut' 
        }
      );

      // 2. Immediate jump to section while screen is covered
      tl.call(() => {
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.scrollTo(targetId, { immediate: true, offset: -80 });
          // Force lenis to update its internal scroll state instantly
          window.__lenis.emit();
        } else {
          window.location.hash = targetId;
        }
        
        // Dispatch an event so the target section knows it just got revealed 
        // (can be used to trigger internal staggering)
        window.dispatchEvent(new CustomEvent('cinematicWipePeak', { detail: { targetId } }));
      });

      // 3. Small buffer to let DOM paint the new section
      tl.to({}, { duration: 0.1 });

      // 4. Wipe Out (Reveal screen)
      tl.to(overlayRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    };

    window.addEventListener('triggerCinematicWipe', handleWipe);
    return () => window.removeEventListener('triggerCinematicWipe', handleWipe);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        backgroundColor: color,
        transform: 'translateY(100%)',
        willChange: 'transform'
      }}
    />
  );
}
