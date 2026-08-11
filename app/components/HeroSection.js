'use client';

import { useRef, useEffect, useState } from 'react';
import { useSound } from './SoundProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LayoutContainer from './LayoutContainer';

/**
 * HelloTubeSVG — Awwwards-style inflated glossy tube 3D SVG word 'hello'
 * 1. Handwriting draw-in path animation
 * 2. Realistic 3D tube bevel & specular highlights
 * 3. Soft bloom blur & neon pulsing
 * 4. 60 FPS mouse parallax tilt
 */
function HelloTubeSVG() {
  const containerRef = useRef(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRot.current.x = y * -12; // degrees
      targetRot.current.y = x * 15;
    };

    const animate = () => {
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Cursive handwriting path coordinates for 'hello'
  const helloPath =
    "M 70,165 C 70,85 105,45 130,45 C 160,45 140,140 140,165 C 140,195 160,205 185,185 C 190,175 195,135 185,110 C 175,90 145,115 165,160 C 185,200 220,185 240,150 C 255,120 270,65 285,45 C 300,25 305,65 290,125 C 280,165 295,190 325,185 C 345,180 365,130 380,85 C 395,45 400,85 385,135 C 375,175 390,190 420,185 C 450,180 480,135 500,135 C 530,135 535,180 500,190 C 475,195 450,175 465,145 C 480,115 520,110 560,140 C 600,165 650,165 680,145";

  return (
    <div className="hello-tube-wrapper" aria-hidden="true">
      <div ref={containerRef} className="hello-tube-container">
        <svg viewBox="0 0 740 240" className="hello-tube-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 3D Glossy Tube Metallic/Iridescent Gradient */}
            <linearGradient id="tubeBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="30%" stopColor="#7c3aed" />
              <stop offset="55%" stopColor="#a855f7" />
              <stop offset="80%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Bright Specular Reflection Gradient (Upper crest highlight) */}
            <linearGradient id="tubeGlossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#e0e7ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Neon Bloom Glow Gradient */}
            <linearGradient id="tubeBloomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.65" />
            </linearGradient>

            {/* SVG Gaussian Blur for soft rear bloom */}
            <filter id="neonBloomBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="18" result="blur" />
            </filter>
          </defs>

          {/* Layer 1: Background Neon Bloom Blur */}
          <path
            d={helloPath}
            stroke="url(#tubeBloomGradient)"
            strokeWidth="52"
            filter="url(#neonBloomBlur)"
            className="hello-tube-path"
          />

          {/* Layer 2: Deep Ambient Occlusion Shadow */}
          <path
            d={helloPath}
            stroke="#1e1b4b"
            strokeWidth="42"
            strokeOpacity="0.45"
            transform="translate(4, 12)"
            className="hello-tube-path"
          />

          {/* Layer 3: Main Inflated 3D Glossy Tube Body */}
          <path
            d={helloPath}
            stroke="url(#tubeBodyGradient)"
            strokeWidth="38"
            className="hello-tube-path"
          />

          {/* Layer 4: Primary Specular Highlight Core (Gives rounded 3D tube volume) */}
          <path
            d={helloPath}
            stroke="url(#tubeGlossGradient)"
            strokeWidth="14"
            transform="translate(-2, -5)"
            className="hello-tube-path"
          />

          {/* Layer 5: Ultra-Fine White Specular Crest Line */}
          <path
            d={helloPath}
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeOpacity="0.85"
            transform="translate(-3, -7)"
            className="hello-tube-path"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * FloatingSticker — Haoqi.design "Falling from Top" Physics Engine
 * 1. Spawns above viewport (y: -1100px) and falls with gravity + spring bounce on stagger delay
 * 2. Idle sine-wave floating & 60fps magnetic mouse proximity repulsion after landing
 * 3. Physical die-cut sticker styling with white outline border and lift shadow
 * 4. Interactive sound effects on hover (pop) and click
 */
/**
 * Custom 100% Vector SVG Die-Cut Stickers with ZERO background boxes
 */
function StickerSVG({ badgeId, size }) {
  switch (badgeId) {
    case 'clapper':
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <rect x="14" y="24" width="132" height="112" rx="16" fill="#111827" stroke="#C0FE04" strokeWidth="5" />
          <path d="M14 56H146" stroke="#C0FE04" strokeWidth="4" />
          <path d="M28 24L48 56M60 24L80 56M92 24L112 56M124 24L144 56" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          <text x="80" y="88" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">MAIN CHARACTER</text>
          <text x="80" y="112" fill="#C0FE04" fontSize="18" fontWeight="800" fontFamily="monospace" textAnchor="middle">STUDIO ©26</text>
        </svg>
      );
    case 'vinyl':
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <circle cx="80" cy="80" r="66" fill="#EF4444" stroke="#FFFFFF" strokeWidth="5" />
          <circle cx="80" cy="80" r="48" fill="#1E293B" />
          <circle cx="80" cy="80" r="24" fill="#F59E0B" />
          <circle cx="80" cy="80" r="8" fill="#FFFFFF" />
          <path d="M80 32A48 48 0 0 1 128 80" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M80 40A40 40 0 0 1 120 80" stroke="#64748B" strokeWidth="2" />
          <text x="80" y="74" fill="#1E293B" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">ON AIR</text>
          <text x="80" y="94" fill="#1E293B" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">2026</text>
        </svg>
      );
    case 'seal':
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <path d="M80 12L93 36L120 28L118 56L144 64L128 86L144 108L118 116L120 144L93 136L80 160L67 136L40 144L42 116L16 108L32 86L16 64L42 56L40 28L67 36L80 12Z" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
          <circle cx="80" cy="86" r="42" fill="#1E1B4B" stroke="#C0FE04" strokeWidth="3" />
          <text x="80" y="78" fill="#C0FE04" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">CRAFT &amp; CODE</text>
          <text x="80" y="96" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">CERTIFIED</text>
          <text x="80" y="112" fill="#A855F7" fontSize="10" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">★★★★★</text>
        </svg>
      );
    case 'cat':
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <path d="M30 40L44 70L24 74Z" fill="#FCE7F3" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
          <path d="M130 40L116 70L136 74Z" fill="#FCE7F3" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
          <circle cx="80" cy="88" r="54" fill="#FCE7F3" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="42" y="72" width="34" height="20" rx="6" fill="#111827" />
          <rect x="84" y="72" width="34" height="20" rx="6" fill="#111827" />
          <path d="M76 80H84" stroke="#111827" strokeWidth="4" />
          <path d="M70 106Q80 116 90 106" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
          <path d="M28 88A52 52 0 0 1 132 88" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
          <rect x="20" y="78" width="12" height="24" rx="6" fill="#EC4899" />
          <rect x="128" y="78" width="12" height="24" rx="6" fill="#EC4899" />
          <text x="80" y="128" fill="#EC4899" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="middle">SYSTEMS THINKER</text>
        </svg>
      );
    case 'capsule':
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <rect x="16" y="50" width="128" height="60" rx="30" fill="url(#capsule-grad)" stroke="#FFFFFF" strokeWidth="5" />
          <defs>
            <linearGradient id="capsule-grad" x1="16" y1="50" x2="144" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <circle cx="44" cy="80" r="8" fill="#C0FE04" />
          <text x="88" y="76" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">DESIGN</text>
          <text x="88" y="92" fill="#C0FE04" fontSize="11" fontWeight="900" fontFamily="monospace" textAnchor="middle">ENGINEER</text>
        </svg>
      );
    case 'diamond':
    default:
      return (
        <svg viewBox="0 0 160 160" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))' }}>
          <path d="M80 16L144 80L80 144L16 80L80 16Z" fill="#10B981" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
          <path d="M80 34L126 80L80 126L34 80L80 34Z" fill="#047857" />
          <text x="80" y="78" fill="#C0FE04" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">CREATIVE</text>
          <text x="80" y="94" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">CODE ✦</text>
        </svg>
      );
  }
}

/**
 * FloatingSticker — Haoqi.design true gravitational free-fall & elastic bounce
 */
function FloatingSticker({
  src,
  badgeId = 'clapper',
  style,
  className = '',
  size = 110,
  speed = 1,
  depth = 1,
  delay = 0,
  initialRotate = 0,
}) {
  const { playStickerPop, playClick } = useSound();
  const stickerRef = useRef(null);

  // Physics state
  const posRef = useRef({
    x: 0,
    y: -950, // Spawn high above top of viewport
    rotate: initialRotate - 38,
    scale: 1.15,
  });
  const velocityRef = useRef({ y: 0, rotate: 0, scale: 0 });
  const landedRef = useRef(false);
  const targetOffsetRef = useRef({ x: 0, y: 0, rotate: 0 });
  const offsetRef = useRef({ x: 0, y: 0, rotate: 0 });
  const startTimeRef = useRef(null);

  useEffect(() => {
    let rafId;

    const onMouseMove = (e) => {
      if (!stickerRef.current || !landedRef.current) return;
      const rect = stickerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Magnetic repulsion/tilt when mouse is near sticker (< 320px)
      if (dist < 320) {
        const force = (1 - dist / 320) * 32 * speed;
        targetOffsetRef.current = {
          x: -(dx / (dist || 1)) * force,
          y: -(dy / (dist || 1)) * force,
          rotate: (dx / 18) * speed,
        };
      } else {
        targetOffsetRef.current = { x: 0, y: 0, rotate: 0 };
      }
    };

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      // 1. PHASE 1: Haoqi.design Gravitational Drop with Elastic Bounce
      if (elapsed < delay) {
        posRef.current.y = -950;
      } else if (!landedRef.current) {
        // Smooth gravitational downward acceleration (~1.2 seconds free-fall)
        velocityRef.current.y += 0.85 * speed;
        posRef.current.y += velocityRef.current.y;

        // Smooth rotation & scale damping towards initialRotate & 1.0
        posRef.current.rotate += (initialRotate - posRef.current.rotate) * 0.08;
        posRef.current.scale += (1 - posRef.current.scale) * 0.12;

        // When hitting floor y >= 0: elastic bounce!
        if (posRef.current.y >= 0) {
          posRef.current.y = 0;
          if (Math.abs(velocityRef.current.y) > 3.0) {
            velocityRef.current.y = -velocityRef.current.y * 0.48; // bounce up with elasticity
          } else {
            velocityRef.current.y = 0;
            landedRef.current = true;
          }
        }
      }

      // 2. PHASE 2: Idle 3D floating + mouse proximity physics after landing
      if (landedRef.current) {
        offsetRef.current.x += (targetOffsetRef.current.x - offsetRef.current.x) * 0.08;
        offsetRef.current.y += (targetOffsetRef.current.y - offsetRef.current.y) * 0.08;
        offsetRef.current.rotate +=
          (targetOffsetRef.current.rotate - offsetRef.current.rotate) * 0.08;

        const idleY = Math.sin(timestamp * 0.0015 * speed) * 7;
        const idleRot = Math.cos(timestamp * 0.0012 * speed) * 3;

        posRef.current.y = idleY;
        posRef.current.rotate = initialRotate + idleRot;
      }

      if (stickerRef.current) {
        const totalX = posRef.current.x + offsetRef.current.x;
        const totalY = posRef.current.y + offsetRef.current.y;
        const totalRot = posRef.current.rotate + offsetRef.current.rotate;
        stickerRef.current.style.transform = `translate3d(${totalX}px, ${totalY}px, 0) rotate(${totalRot}deg) scale(${posRef.current.scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, delay, initialRotate]);

  const onClick = () => {
    playClick();
    // Toss sticker up into the air so it falls and bounces again!
    landedRef.current = false;
    velocityRef.current.y = -22;
  };

  return (
    <div
      ref={stickerRef}
      className={`hero-sticker sticker-die-cut ${className}`}
      style={{
        ...style,
        width: size,
        height: size,
        zIndex: 2,
        cursor: 'pointer',
      }}
      onMouseEnter={playStickerPop}
      onClick={onClick}
      aria-hidden="true"
    >
      <div className="sticker-image-wrapper" style={{ width: '100%', height: '100%', background: 'transparent', boxShadow: 'none', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt="Floating sticker badge"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.35))',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            draggable={false}
          />
        ) : (
          <StickerSVG badgeId={badgeId} size={size} />
        )}
      </div>
    </div>
  );
}

/**
 * MagneticHeading — 3D interactive tilt wrapper for role subtitle & text
 */
function MagneticHeading({ children, className = '', maxTilt = 12 }) {
  const containerRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    const onMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targetRef.current = {
        x: -dy * maxTilt,
        y: dx * maxTilt,
      };
    };

    const animate = () => {
      rotRef.current.x += (targetRef.current.x - rotRef.current.x) * 0.1;
      rotRef.current.y += (targetRef.current.y - rotRef.current.y) * 0.1;
      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(1000px) rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg) translateZ(0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxTilt]);

  return (
    <div ref={containerRef} className={`magnetic-heading-wrapper ${className}`}>
      {children}
    </div>
  );
}

/**
 * HeroSection — Full-viewport hero matching haoqi.design layout exactly:
 * - Subtitle "Software Developer & Content Creator" → top-left corner (with Magnetic tilt)
 * - Short tagline → center-left area
 * - Description → top-right corner
 * - Large cursive "hello" → center, behind everything
 * - Title "SOFTWARE DEVELOPER & CONTENT CREATOR" → bottom-left, completely still
 * - Sticker images → falling from the top with gravity & bouncing around hello text
 * - Continuous Cinematic Scroll Transition → Pinned while transition runs with scrubbed overlapping timelines!
 */
export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const { playDimensionSwoosh } = useSound();
  const hasSwooshedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 320 && !hasSwooshedRef.current) {
        hasSwooshedRef.current = true;
        playDimensionSwoosh();
      } else if (y < 120 && hasSwooshedRef.current) {
        hasSwooshedRef.current = false;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [playDimensionSwoosh]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. PIN THE HERO WHILE TRANSITION RUNS (pinSpacing: false allows next section to emerge continuously!)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=90%',
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });

      // 2. SCRUBBED OVERLAPPING HERO EXIT TIMELINE
      tl.to('.hero-dimension-wrapper', {
        rotateX: 25,
        scale: 0.78,
        y: -110,
        opacity: 0,
        filter: 'blur(8px)',
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" style={{ perspective: '1200px' }}>
      {/* 3D Dimensional wrapper that tilts into deep space when scrolling down */}
      <div
        className="hero-dimension-wrapper"
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Gradient background */}
        <div className="hero-gradient" aria-hidden="true" />

        {/* Halftone / scanline grid overlay */}
        <div className="hero-scanlines" aria-hidden="true" />

        {/* 3D Inflated Glossy Tube "hello" text — center, behind content */}
        <HelloTubeSVG />

        {/* 6 User-Provided Transparent Background Stickers Falling from Top */}
        {/* Sticker 1: Main Character Studio Clapperboard */}
        <FloatingSticker
          src="/images/stickers/user-sticker-clapper.png"
          style={{ top: '12%', left: '30%' }}
          size={135}
          speed={1.2}
          depth={2}
          delay={0.3}
          initialRotate={-12}
        />
        {/* Sticker 2: I Love You So Matcha Cat */}
        <FloatingSticker
          src="/images/stickers/user-sticker-matcha.png"
          style={{ top: '15%', right: '23%' }}
          size={140}
          speed={1.4}
          depth={3}
          delay={0.55}
          initialRotate={14}
        />
        {/* Sticker 3: Chrome Balloon Star */}
        <FloatingSticker
          src="/images/stickers/user-sticker-star.png"
          style={{ top: '44%', left: '16%' }}
          size={120}
          speed={1.1}
          depth={1}
          delay={0.8}
          initialRotate={-8}
        />
        {/* Sticker 4: Cool Cat Sunglasses */}
        <FloatingSticker
          src="/images/stickers/user-sticker-coolcat.png"
          style={{ top: '36%', right: '12%' }}
          size={145}
          speed={1.3}
          depth={3}
          delay={1.05}
          initialRotate={10}
        />
        {/* Sticker 5: Standing Orange Kitten */}
        <FloatingSticker
          src="/images/stickers/user-sticker-kitten.png"
          style={{ bottom: '20%', right: '22%' }}
          size={130}
          speed={1.2}
          depth={2}
          delay={1.3}
          initialRotate={-15}
        />
        {/* Sticker 6: Chrome Balloon Star (second star tilted opposite) */}
        <FloatingSticker
          src="/images/stickers/user-sticker-star.png"
          style={{ bottom: '18%', left: '32%' }}
          size={110}
          speed={1.3}
          depth={2}
          delay={1.55}
          initialRotate={16}
        />

        {/* Hero text content — corner positioned like haoqi.design */}
        <LayoutContainer className="hero-content">
          {/* Top-left: Role/subtitle with Magnetic 3D hover tilt */}
          <MagneticHeading className="hero-role" maxTilt={8}>
            <h2>Tech &<br />Social Media<br /></h2>
          </MagneticHeading>

          {/* Center-left: Tagline */}
          <div className="hero-tagline">
            <p>Thinking in systems.<br />Building with care.</p>
          </div>

          {/* Top-right: Description */}
          <div className="hero-bio">
            <p>
              I&apos;m Himanshu Jangra, a software developer and
              content creator crafting digital experiences
              across code, design, and storytelling.
              I build tools and create content
              that connects people with technology.
            </p>
          </div>

          {/* Bottom-left: Main title — wide architectural Manrope ExtraBold font, completely still */}
          <div className="hero-title-wrapper">
            <h1 className="hero-title">
              SOFTWARE<br />
              DEVELOPER &amp;<br />
              CONTENT CREATOR
            </h1>
          </div>
        </LayoutContainer>
      </div>
    </section>
  );
}
