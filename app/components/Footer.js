'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 py-12 border-t border-white/5 bg-[#030406] text-neutral-500">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="font-mono text-xs tracking-widest uppercase flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <span>&copy; 2026 Himanshu</span>
          <span className="text-neutral-600">Software Engineer &times; Creator</span>
        </div>

        {/* Links */}
        <div className="flex gap-6 font-mono text-xs tracking-widest uppercase">
          <a href="https://github.com/01himanshuu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/01himanshu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="https://instagram.com/01himanshu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
        </div>
        
      </div>
    </footer>
  );
}
