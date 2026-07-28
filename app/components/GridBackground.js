'use client';

import { useEffect, useRef } from 'react';

/**
 * GridBackground — Fixed architectural grid overlay with cross markers
 * Replicates haoqi.design's signature grid lines and intersection crosses
 */
export default function GridBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically place cross markers at grid intersections
    const container = containerRef.current;
    if (!container) return;

    function placeCrosses() {
      // Clear existing crosses
      container.querySelectorAll('.grid-cross').forEach(el => el.remove());

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Grid columns at 25%, 50%, 75%
      const cols = [0.25, 0.5, 0.75];
      // Grid rows at 50vh intervals
      const rowCount = Math.ceil((document.documentElement.scrollHeight) / (vh * 0.5));
      const rows = [];
      for (let i = 0; i <= rowCount; i++) {
        rows.push(i * vh * 0.5);
      }

      // Only place crosses visible in viewport + buffer
      const scrollY = window.scrollY;
      const visibleRows = rows.filter(
        r => r >= scrollY - vh && r <= scrollY + vh * 2
      );

      cols.forEach(colPct => {
        const x = colPct * vw;
        visibleRows.forEach(y => {
          const cross = document.createElement('div');
          cross.className = 'grid-cross';
          cross.style.left = `${x - 7}px`;
          cross.style.top = `${y - 7}px`;
          container.appendChild(cross);
        });
      });
    }

    placeCrosses();

    // Recalculate on scroll and resize
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          placeCrosses();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', placeCrosses);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', placeCrosses);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid-background"
      aria-hidden="true"
    />
  );
}
