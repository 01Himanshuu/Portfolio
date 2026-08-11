'use client';

import { useEffect, useRef } from 'react';

/**
 * GridBackground — Fixed architectural grid overlay with cross markers
 * Replicates haoqi.design's signature grid lines and intersection crosses
 */
export default function GridBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically place cross markers at grid intersections once across document height
    // Avoids DOM destruction and requestAnimationFrame loops during scroll for 60 FPS
    const container = containerRef.current;
    if (!container) return;

    function placeCrosses() {
      container.innerHTML = '';

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cols = [0.25, 0.5, 0.75];
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        vh * 4
      );
      const rowCount = Math.ceil(docHeight / (vh * 0.5));

      const fragment = document.createDocumentFragment();

      cols.forEach((colPct) => {
        const x = colPct * vw;
        for (let i = 0; i <= rowCount; i++) {
          const y = i * vh * 0.5;
          const cross = document.createElement('div');
          cross.className = 'grid-cross';
          cross.style.left = `${x - 7}px`;
          cross.style.top = `${y - 7}px`;
          fragment.appendChild(cross);
        }
      });

      container.appendChild(fragment);
    }

    placeCrosses();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(placeCrosses, 200);
    };

    window.addEventListener('resize', onResize, { passive: true });
    const observer = new ResizeObserver(onResize);
    if (document.body) observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      clearTimeout(resizeTimer);
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
