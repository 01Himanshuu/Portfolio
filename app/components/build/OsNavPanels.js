'use client';

import React from 'react';
import { useSound } from '../SoundProvider';

/**
 * OsNavPanels — Futuristic Operating System Navigation Panels
 *
 * Displays interactive OS-style workspace category panels:
 * Projects, Experience, Skills, Open Source, Tech Stack, Achievements
 * Hovering causes subtle elevation, cyan glow, and active system indicator.
 */
const OS_PANELS = [
  {
    id: 'projects',
    title: 'Projects',
    code: '// APP_WINDOWS [04]',
    desc: 'Production-grade applications & AI systems',
    status: 'ACTIVE',
    badge: '04 APPS',
  },
  {
    id: 'tech',
    title: 'Tech Stack',
    code: '// ARCHITECTURE',
    desc: 'Core languages, frameworks & cloud infrastructure',
    status: '24 MODS',
    badge: 'FULL STACK',
  },
  {
    id: 'metrics',
    title: 'Achievements',
    code: '// SYSTEM_METRICS',
    desc: 'Telemetry, benchmarks & engineering impact',
    status: 'ONLINE',
    badge: '99.9% UPTIME',
  },
  {
    id: 'experience',
    title: 'Experience',
    code: '// CAREER_TRAJECTORY',
    desc: 'Engineering leadership & technical milestones',
    status: 'LATEST',
    badge: 'SENIOR ENG',
  },
  {
    id: 'opensource',
    title: 'Open Source',
    code: '// GIT_CONTRIBUTIONS',
    desc: 'Community libraries, PRs & shared tooling',
    status: '1.4k+ COMMITS',
    badge: 'PUBLIC',
  },
  {
    id: 'architecture',
    title: 'System Design',
    code: '// TOPOLOGY',
    desc: 'Distributed systems & microservices schemas',
    status: 'READY',
    badge: 'DOCKER/K8S',
  },
];

export default function OsNavPanels({ activeCategory, onSelectCategory }) {
  const { playHover, playClick } = useSound();

  return (
    <div className="w-full mb-20 select-none">
      {/* Top OS System Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-ping" />
          <span className="text-[#00F0FF]">WORKSPACE_OS // BUILD_ENVIRONMENT_v2.4</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>CPU: 12%</span>
          <span>MEM: 4.2 GB</span>
          <span className="text-[#00F0FF]">PORT:3000 ONLINE</span>
        </div>
      </div>

      {/* Grid of OS Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {OS_PANELS.map((panel) => {
          const isActive = activeCategory === panel.id || activeCategory === 'all';
          return (
            <div
              key={panel.id}
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                if (onSelectCategory) {
                  onSelectCategory(activeCategory === panel.id ? 'all' : panel.id);
                }
              }}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl ${
                isActive
                  ? 'bg-neutral-900/60 border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.12)] -translate-y-1'
                  : 'bg-neutral-950/40 border-white/10 hover:border-[#00F0FF]/30 hover:bg-neutral-900/40 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]'
              }`}
            >
              {/* Corner Accent Sheen */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-opacity duration-500 pointer-events-none ${
                  isActive
                    ? 'bg-gradient-to-bl from-[#00F0FF]/15 to-transparent opacity-100'
                    : 'bg-gradient-to-bl from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100'
                }`}
              />

              {/* Panel Header */}
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="text-[#00F0FF]/70 group-hover:text-[#00F0FF] transition-colors">
                  {panel.code}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[10px] tracking-wider text-[#00F0FF]">
                  {panel.badge}
                </span>
              </div>

              {/* Panel Title */}
              <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {panel.title}
              </h4>

              {/* Panel Description */}
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-4">
                {panel.desc}
              </p>

              {/* Bottom System Status Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[11px] text-neutral-500">
                <span>STATUS: {panel.status}</span>
                <span className="text-[#00F0FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  EXPLORE <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
