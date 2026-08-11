'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * CollaborateTerminal — Minimal, Elegant, Calm Finale Terminal (#contact)
 *
 * "The ending should slow the experience down. Minimal. Elegant. Calm."
 * Simplifies the terminal concept to eliminate visual noise and make contacting effortless.
 *
 * Features:
 * - Clean typewriter command: visitor@portfolio:~$ collaborate
 * - 4 Effortless Contact Actions: GitHub, LinkedIn, Instagram, Email (with 1-click Copy)
 * - 2 Dedicated Resume Buttons:
 *   1. [ ENGINEERING RESUME ] (/tech)
 *   2. [ CREATIVE RESUME ] (/social)
 * - Cinematic, slow-breathing hover glows & standardized window styles
 */
const CONTACT_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    value: '01himanshuu',
    href: 'https://github.com/01himanshuu',
    display: 'github.com/01himanshuu',
    accent: '#C084FC',
    tag: 'OPEN SOURCE // CODE',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '01himanshu',
    href: 'https://linkedin.com/in/01himanshu',
    display: 'linkedin.com/in/01himanshu',
    accent: '#00F0FF',
    tag: 'PROFESSIONAL // NETWORK',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '_01_himanshu',
    href: 'https://instagram.com/_01_himanshu',
    display: 'instagram.com/_01_himanshu',
    accent: '#D946EF',
    tag: 'CINEMATOGRAPHY // REELS',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'jangrahimanshu0101@gmail.com',
    href: 'mailto:jangrahimanshu0101@gmail.com',
    display: 'jangrahimanshu0101@gmail.com',
    accent: '#10B981',
    tag: 'DIRECT CONTACT // 24H',
  },
];

export default function CollaborateTerminal() {
  const { playHover, playClick } = useSound();
  const [copiedLabel, setCopiedLabel] = useState(null);
  const terminalRef = useRef(null);

  // Typewriter sequence
  const [typedCommand, setTypedCommand] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const COMMAND = 'collaborate';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth cinematic entrance
      gsap.from('.terminal-finale-container', {
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: terminalRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Trigger Typewriter
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTypedCommand(COMMAND.slice(0, i));
            if (i >= COMMAND.length) {
              clearInterval(interval);
              setTimeout(() => setShowStatus(true), 250);
            }
          }, 65);
        },
      });
    }, terminalRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (label, text, e) => {
    e.preventDefault();
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  return (
    <div
      ref={terminalRef}
      className="terminal-finale-container max-w-[960px] w-full mx-auto rounded-3xl border border-white/15 bg-neutral-950/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.85)] transition-all duration-500"
    >
      {/* 1. Terminal Window Header Bar (Minimal macOS Style) */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-neutral-900/60 font-mono text-xs text-neutral-400">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-neutral-300">
            visitor@himanshu-jangra: ~ $
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-neutral-500">SESSION:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE // FINALE</span>
          </span>
        </div>
      </div>

      {/* 2. Minimal Typewriter Prompt Area */}
      <div className="p-6 sm:p-10 md:p-12 space-y-8">
        <div className="font-mono text-sm sm:text-base space-y-2">
          <div className="flex items-center gap-2 text-white">
            <span className="text-[#00F0FF]">visitor@himanshu-jangra:~$</span>
            <span className="font-bold tracking-wide">{typedCommand}</span>
            <span className="w-2.5 h-5 bg-white/80 animate-pulse inline-block align-middle" />
          </div>

          {showStatus && (
            <div className="text-neutral-400 pl-4 border-l-2 border-[#00F0FF]/40 space-y-1 animate-fadeIn">
              <p className="text-xs text-neutral-500">
                {'// INITIALIZING DIRECT STREAM... OK.'}
              </p>
              <p className="text-sm sm:text-base text-neutral-200 font-light">
                Ready. Let&apos;s build an unforgettable engineering platform or cinematic story.
              </p>
            </div>
          )}
        </div>

        {/* 3. 4 Effortless Contact Cards (GitHub, LinkedIn, Instagram, Email) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {CONTACT_LINKS.map((link) => {
            const isCopied = copiedLabel === link.label;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative p-5 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-white/30 transition-all duration-300 ease-out flex flex-col justify-between"
              >
                {/* Top Label & Tag */}
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span
                    className="font-bold tracking-wide uppercase transition-colors"
                    style={{ color: link.accent }}
                  >
                    {link.label}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    {link.tag}
                  </span>
                </div>

                {/* Main Value Display */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base text-white font-mono font-medium truncate group-hover:text-white transition-colors">
                    {link.display}
                  </span>

                  {/* 1-Click Copy or External Arrow */}
                  {link.label === 'Email' ? (
                    <button
                      type="button"
                      onClick={(e) => handleCopy(link.label, link.value, e)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono tracking-wider uppercase border transition-all ${
                        isCopied
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                          : 'bg-neutral-800 border-white/15 text-neutral-300 hover:border-white hover:text-white'
                      }`}
                    >
                      {isCopied ? '✓ COPIED' : 'COPY'}
                    </button>
                  ) : (
                    <span className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all font-mono text-sm">
                      &rarr;
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* 4. TWO DEDICATED RESUME BUTTONS (Engineering Resume & Creative Resume) */}
        <div className="pt-6 border-t border-white/10">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4 text-center">
            {'// ACCESS SPECIALIZED PRODUCTION RESUMES'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BUTTON 1: ENGINEERING RESUME (/tech) */}
            <Link
              href="/tech"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-5 rounded-2xl border border-[#00F0FF]/40 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 hover:border-[#00F0FF] transition-all duration-300 ease-out flex items-center justify-between text-left shadow-[0_0_25px_rgba(0,240,255,0.08)]"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] font-bold uppercase mb-1">
                  <span>📄 SOFTWARE ENGINEERING RESUME</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">
                  TypeScript, WebGL, Next.js 16, GraphQL, AI Agent Systems &amp; Performance
                </p>
              </div>
              <span className="text-lg text-[#00F0FF] group-hover:translate-x-1 transition-transform font-mono font-bold ml-3">
                &rarr;
              </span>
            </Link>

            {/* BUTTON 2: CREATIVE RESUME (/social) */}
            <Link
              href="/social"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-5 rounded-2xl border border-[#C084FC]/40 bg-[#C084FC]/10 hover:bg-[#C084FC]/20 hover:border-[#C084FC] transition-all duration-300 ease-out flex items-center justify-between text-left shadow-[0_0_25px_rgba(192,132,252,0.08)]"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#C084FC] font-bold uppercase mb-1">
                  <span>🎬 CINEMATIC CREATIVE RESUME</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">
                  8K RAW Cinematography, DaVinci Color Grading, NLE Editing &amp; Dolby Atmos
                </p>
              </div>
              <span className="text-lg text-[#C084FC] group-hover:translate-x-1 transition-transform font-mono font-bold ml-3">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* 5. Minimal Terminal Status Footer */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-500">
          <span>STATUS: ALL STREAMING CHANNELS ONLINE</span>
          <span className="text-neutral-400">FPS: 60 // RESPONSE TIME: &lt; 2 HOURS</span>
        </div>
      </div>
    </div>
  );
}
