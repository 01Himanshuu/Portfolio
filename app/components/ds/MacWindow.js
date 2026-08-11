'use client';

import React from 'react';

/**
 * MacWindow — Authentic macOS-style Window Frame
 *
 * Requirements met:
 * - Rounded outer frame (rounded-2xl)
 * - Realistic top chrome (bg-gradient, border-b)
 * - 3 traffic-light dots
 * - Title bar
 * - Generous internal margin (p-8 md:p-12 lg:p-16) to ensure content NEVER touches borders.
 * - Clear outer margins (my-8)
 * - Subtle border & glow on hover if inside a group
 */
export default function MacWindow({
  title = '',
  variant = 'default', // 'eng' | 'cre' | 'default'
  children,
  className = '',
  innerClassName = '',
}) {
  // Determine accent color for the title text or subtle glows
  let accentClass = 'text-neutral-400';
  if (variant === 'eng') accentClass = 'text-[#00F0FF]';
  if (variant === 'cre') accentClass = 'text-[#C084FC]';

  return (
    <div 
      className={`relative w-full rounded-2xl bg-[#0c0e14] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] my-8 group-hover:border-white/20 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.08)] ${className}`}
    >
      {/* Top Chrome */}
      <div className="h-10 w-full bg-gradient-to-b from-white/[0.08] to-transparent border-b border-white/5 flex items-center px-4 relative">
        
        {/* 3 Traffic Light Dots */}
        <div className="flex items-center gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] transition-transform duration-300 hover:scale-110" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] transition-transform duration-300 hover:scale-110" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] transition-transform duration-300 hover:scale-110" />
        </div>

        {/* Title */}
        <div className="w-full flex justify-center pointer-events-none">
          <span className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest ${accentClass} opacity-80`}>
            {title}
          </span>
        </div>
      </div>

      {/* Content Area - Strict Internal Padding (32-64px) */}
      <div className={`p-8 md:p-12 lg:p-16 w-full h-full relative ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
