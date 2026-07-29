'use client';

import { useEffect } from 'react';

/**
 * MasterTimeline — Cleaned to remove any green overlay over Introduction
 *
 * PER USER REQUEST:
 * "above the introduction part a green part on top is overlapping wriiten text remove that green overlay over introduction"
 *
 * This component removes any existing #seamless-curve-transition overlay element from the DOM
 * so that nothing overlaps the written text in the Introduction section.
 * Zero modifications are made to Hero or Introduction.
 */
export default function MasterTimeline() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Immediately clean up any existing transition arch banner overlay
    const cleanupOverlay = () => {
      const existingCurtain = document.getElementById('seamless-curve-transition');
      if (existingCurtain) existingCurtain.remove();
    };

    cleanupOverlay();

    return () => {
      cleanupOverlay();
    };
  }, []);

  return null;
}
