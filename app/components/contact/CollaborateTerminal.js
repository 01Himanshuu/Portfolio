'use client';

import React, { useState } from 'react';
import { useSound } from '../SoundProvider';
import Link from 'next/link';

/**
 * CollaborateTerminal — Interactive Terminal for Contact & Resumes
 *
 * Displays:
 * visitor@portfolio:~$ collaborate
 * Initializing connection...
 * ✓ Ready.
 *
 * Email : jangrahimanshu0101@gmail.com
 * GitHub: github.com/01himanshuu
 * LinkedIn: linkedin.com/01himanshu
 * Instagram: instagram.com/_01_himanshu
 *
 * Also includes direct access to Tech and Social Media Resumes.
 */
const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'jangrahimanshu0101@gmail.com',
    href: 'mailto:jangrahimanshu0101@gmail.com',
    display: 'jangrahimanshu0101@gmail.com',
    accent: '#00F0FF',
  },
  {
    label: 'GitHub',
    value: 'https://github.com/01himanshuu',
    href: 'https://github.com/01himanshuu',
    display: 'github.com/01himanshuu',
    accent: '#C084FC',
  },
  {
    label: 'LinkedIn',
    value: 'https://linkedin.com/in/01himanshu',
    href: 'https://linkedin.com/in/01himanshu',
    display: 'linkedin.com/01himanshu',
    accent: '#00F0FF',
  },
  {
    label: 'Instagram',
    value: 'https://instagram.com/_01_himanshu',
    href: 'https://instagram.com/_01_himanshu',
    display: 'instagram.com/_01_himanshu',
    accent: '#D946EF',
  },
];

export default function CollaborateTerminal() {
  const { playHover, playClick } = useSound();
  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleCopy = (label, text, e) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/15 bg-neutral-950/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/60">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
        <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          visitor@portfolio:~ — ssh collaborate
        </div>
        <div className="font-mono text-xs text-neutral-500">
          {'[ PORT 443 // SECURE ]'}
        </div>
      </div>

      {/* Terminal Body Content */}
      <div className="p-6 sm:p-10 font-mono text-sm sm:text-base leading-relaxed text-neutral-300 space-y-6">
        {/* Command Input Prompt */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-emerald-400 font-bold">visitor@portfolio:~$</span>
          <span className="text-white font-semibold">collaborate</span>
        </div>

        {/* Status Output */}
        <div className="space-y-1 text-neutral-400 text-xs sm:text-sm">
          <div>Initializing connection...</div>
          <div className="text-emerald-400 font-semibold">✓ Ready.</div>
        </div>

        {/* Contact Links List */}
        <div className="py-4 border-y border-white/10 space-y-4">
          {CONTACT_LINKS.map((item) => (
            <div
              key={item.label}
              onMouseEnter={playHover}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-24 font-bold uppercase tracking-wider"
                  style={{ color: item.accent }}
                >
                  {item.label + ':'}
                </span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="text-white group-hover:underline transition-all"
                >
                  {item.display}
                </a>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => handleCopy(item.label, item.value, e)}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedLabel === item.label ? '✓ COPIED' : 'COPY'}
                </button>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-xs uppercase tracking-wider text-white transition-colors"
                >
                  OPEN &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Resume Section */}
        <div className="pt-2 space-y-3">
          <div className="text-xs uppercase tracking-widest text-neutral-400">
            {'// SPECIALIZED RESUMES AVAILABLE:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tech Resume Page Button */}
            <Link
              href="/tech"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-4 rounded-2xl border border-[#00F0FF]/30 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/15 hover:border-[#00F0FF] transition-all flex items-center justify-between shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            >
              <div>
                <div className="font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                  Tech Resume &amp; Page
                </div>
                <div className="text-xs text-neutral-400">
                  Software Engineering Profile
                </div>
              </div>
              <span className="text-[#00F0FF] text-lg font-bold group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>

            {/* Social Media Resume Page Button */}
            <Link
              href="/social"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-4 rounded-2xl border border-[#C084FC]/30 bg-[#C084FC]/5 hover:bg-[#C084FC]/15 hover:border-[#C084FC] transition-all flex items-center justify-between shadow-[0_0_20px_rgba(192,132,252,0.1)]"
            >
              <div>
                <div className="font-bold text-white group-hover:text-[#C084FC] transition-colors">
                  Social Media Resume
                </div>
                <div className="text-xs text-neutral-400">
                  Creator &amp; Storytelling Profile
                </div>
              </div>
              <span className="text-[#C084FC] text-lg font-bold group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Terminal Blinking Cursor Prompt */}
        <div className="flex items-center gap-2 pt-2 text-neutral-500">
          <span className="text-emerald-400">visitor@portfolio:~$</span>
          <span className="w-2.5 h-5 bg-white/70 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
}
