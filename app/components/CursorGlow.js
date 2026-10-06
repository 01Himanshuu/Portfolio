'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CursorGlow — Advanced haoqi.design Interactive Cursor & Pixel Particles Engine
 * 1. Soft 500px ambient radial gradient following mouse
 * 2. Precision custom pixel ring + dot cursor with 60fps spring lerping
 * 3. Retro-digital Pixel Particles that react to cursor velocity & movement
 * 4. Expands into an interactive spotlight when hovering over text / headings / links
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: -100, y: -100 });
  const lastMouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef([]);

  const [hoverState, setHoverState] = useState('default'); // 'default' | 'text' | 'pointer'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine-pointer devices (desktop/laptop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    const initFrame = requestAnimationFrame(() => setIsVisible(true));

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      // Direct update for the soft ambient background glow
      if (glowRef.current) {
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top = `${y}px`;
      }

      // Spawn reactive pixel particles based on cursor velocity
      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 1.5 && particlesRef.current.length < 100) {
        const colors = ['#6366f1', '#a855f7', '#06b6d4', '#ec4899', '#38bdf8', '#ffffff'];
        const numParticles = speed > 15 ? 2 : 1;

        for (let i = 0; i < numParticles; i++) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: -dx * 0.08 + (Math.random() - 0.5) * 2.2,
            vy: -dy * 0.08 + (Math.random() - 0.5) * 2.2,
            size: Math.floor(Math.random() * 3) + 2, // crisp 2px to 4px pixel squares
            alpha: 0.88,
            decay: 0.022 + Math.random() * 0.018,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      lastMouseRef.current.x = x;
      lastMouseRef.current.y = y;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      const isText =
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.closest('.hero-title') ||
        target.closest('.hero-role') ||
        target.closest('.hero-tagline') ||
        target.closest('.hello-tube-wrapper');

      const isPointer =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.hero-sticker') ||
        target.closest('.interactive-card');

      if (isPointer) {
        setHoverState('pointer');
      } else if (isText) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    let rafId;
    const animate = () => {
      // 60fps spring interpolation for ring & dot
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.18;

      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.45;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0)`;
      }

      // Render pixel particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          } else {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            // Draw crisp retro pixel square
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
          }
        }
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(initFrame);
    };
  }, []);

  return (
    <>
      {/* Soft ambient radial background glow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        aria-hidden="true"
      />

      {/* Reactive Pixel Particles Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />

      {/* Interactive custom pixel ring + dot (desktop only) */}
      {isVisible && (
        <>
          <div
            ref={ringRef}
            className={`cursor-ring ${hoverState}`}
            aria-hidden="true"
          />
          <div
            ref={dotRef}
            className={`cursor-dot ${hoverState}`}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}

