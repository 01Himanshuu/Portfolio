'use client';

/**
 * VisitorCounter.js
 *
 * Displays a real persistent page-view count fetched from /api/visitors.
 *
 * Counting logic:
 *   - Every full page load (navigation OR refresh) fires exactly ONE POST to
 *     /api/visitors, which unconditionally increments the server-side counter.
 *   - React 19 Strict Mode (enabled by default in Next.js dev) mounts every
 *     component TWICE (mount → cleanup → mount) to help detect side-effect bugs.
 *     Without a guard, the POST would fire twice per page load, double-counting.
 *     We prevent this with a module-level boolean `pageViewFired`:
 *       • It starts false on each full page load (module re-evaluated on navigation).
 *       • The first effect run flips it to true and fires the POST.
 *       • The second (Strict Mode) run sees it is already true and skips.
 *       • On the next real page load the module is fresh and `pageViewFired` resets.
 *
 * Display:
 *   - Animates from 0 → actual count using ease-out cubic when footer enters view.
 *   - Respects prefers-reduced-motion.
 *   - Shows "———" gracefully if the API is unreachable.
 */

import React, { useEffect, useRef, useState } from 'react';

// ── Module-level guard ────────────────────────────────────────────────────────
// Resets to false on every real full-page reload (module re-evaluation).
// Stays true within the same page load to block React Strict Mode's second fire.
let pageViewFired = false;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Format an integer as a zero-padded, comma-separated string.
 * e.g. 1 → "000,001"  |  12345 → "012,345"  |  1234567 → "1,234,567"
 */
function formatCount(n) {
  if (n === null || n === undefined) return '———';
  const s = String(Math.max(0, Math.floor(n)));
  const padded = s.length < 6 ? s.padStart(6, '0') : s;
  return padded.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VisitorCounter() {
  const [displayCount, setDisplayCount] = useState(null); // null = loading
  const [error, setError] = useState(false);

  const containerRef   = useRef(null);
  const animFrameRef   = useRef(null);
  const finalCountRef  = useRef(null);   // count returned by API
  const isInViewRef    = useRef(false);  // set by IntersectionObserver
  const hasAnimatedRef = useRef(false);  // prevents re-running count-up animation

  // ── Animation trigger — called when BOTH count AND viewport are ready ────────
  function tryAnimate() {
    if (hasAnimatedRef.current) return; // already played
    if (!isInViewRef.current) return;   // footer not yet visible
    if (finalCountRef.current === null) return; // API not yet responded

    hasAnimatedRef.current = true;
    const target = finalCountRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayCount(target);
      return;
    }

    // Ease-out cubic count-up, 1.8 s
    const DURATION = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(eased * target));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }

  // ── Effect 1: Fire POST exactly once per real page load ──────────────────────
  useEffect(() => {
    // If this module instance has already fired the POST (Strict Mode second run),
    // skip — we don't want to count twice for a single page load.
    if (pageViewFired) {
      console.log('[VisitorCounter] Strict Mode second mount — skipping duplicate POST');
      // Still need to display the count if the first run already got a response
      if (finalCountRef.current !== null) tryAnimate();
      return;
    }
    pageViewFired = true;

    let cancelled = false;

    async function recordVisit() {
      try {
        console.log('[VisitorCounter] Firing POST /api/visitors');
        const res = await fetch('/api/visitors', {
          method: 'POST',
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (cancelled) return;

        if (typeof data.count === 'number') {
          console.log(`[VisitorCounter] API returned count: ${data.count}`);
          finalCountRef.current = data.count;
          tryAnimate(); // no-op if footer not yet in view
        } else {
          console.warn('[VisitorCounter] Unexpected response shape:', data);
          setError(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[VisitorCounter] API unavailable:', err.message);
          setError(true);
        }
      }
    }

    recordVisit();

    return () => {
      cancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Effect 2: IntersectionObserver — start animation when footer enters view ─
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          isInViewRef.current = true;
          observer.disconnect();
          tryAnimate(); // no-op if API hasn't responded yet
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="visitor-counter"
      aria-label="Visitor counter"
    >
      <span className="visitor-counter__label">YOU ARE VISITOR</span>
      <span
        className="visitor-counter__number"
        aria-live="polite"
        aria-atomic="true"
      >
        {error
          ? '———'
          : displayCount === null
          ? '\u00A0'            /* non-breaking space — preserves layout height */
          : formatCount(displayCount)}
      </span>
    </div>
  );
}
