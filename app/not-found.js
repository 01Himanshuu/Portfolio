'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#06080c] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#00F0FF]/10 to-[#C084FC]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          404
        </h1>
        
        <div className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-neutral-400 mb-12 flex items-center gap-4">
          <span className="w-12 h-px bg-white/20" />
          ENTITY NOT FOUND
          <span className="w-12 h-px bg-white/20" />
        </div>
        
        <p className="text-lg md:text-xl text-neutral-500 font-light max-w-lg mb-12">
          The node you are looking for has been moved, deleted, or never existed in this workspace.
        </p>
        
        <Link 
          href="/"
          className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest"
        >
          &larr; Return to Workspace
        </Link>
      </div>

    </div>
  );
}
