'use client';

import React from 'react';

/**
 * LayoutContainer — Shared Global Content Layout Grid System
 *
 * Enforces ONE unified layout system across every section of the portfolio:
 * - ONE max-width: 1360px (max-w-[1360px])
 * - ONE horizontal padding:
 *   - Desktop: 96px (lg:px-24)
 *   - Laptop: 64px (md:px-16)
 *   - Tablet: 40px (sm:px-10)
 *   - Mobile: 24px (px-6)
 * - ONE content alignment: centered mx-auto w-full
 *
 * Designed to preserve 100% of existing content, typography, animations, and UI designs
 * while making the entire portfolio align to the exact same invisible grid.
 */
export default function LayoutContainer({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`max-w-[1360px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

