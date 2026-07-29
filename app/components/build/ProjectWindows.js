'use client';

import React, { useState } from 'react';
import { useSound } from '../SoundProvider';

/**
 * ProjectWindows — macOS-style Glass Application Windows
 *
 * Displays all 30 projects with comfortable internal card padding (px-6 sm:px-8 py-8 sm:py-10),
 * wider column gap (gap-10 lg:gap-12), max-w-xl editorial reading width, and clear tag/link breathing room.
 */
const PROJECTS = [
  {
    id: 'chronosync',
    windowTitle: 'chronosync_telemetry.app',
    year: '2026',
    role: 'Lead Architect',
    title: 'ChronoSync Real-Time Telemetry',
    description:
      'Distributed streaming telemetry engine capable of ingesting 500k events/sec with sub-millisecond querying and dynamic anomaly alerting.',
    techStack: ['Rust', 'Apache Kafka', 'ClickHouse', 'React', 'WebSockets'],
    github: 'https://github.com/01himanshuu/chronosync',
    demo: 'https://chronosync.demo.01himanshuu.dev',
  },
  {
    id: 'aether-os',
    windowTitle: 'aether_desktop.app',
    year: '2026',
    role: 'Full Stack Engineer',
    title: 'AetherOS Web Desktop Environment',
    description:
      'Browser-based virtual operating system featuring window management, sandboxed WebAssembly execution, and cloud filesystem sync.',
    techStack: ['Next.js 16', 'TypeScript', 'WebAssembly', 'Tailwind CSS', 'IndexedDB'],
    github: 'https://github.com/01himanshuu/aether-os',
    demo: 'https://aether.01himanshuu.dev',
  },
  {
    id: 'neural-canvas',
    windowTitle: 'neural_canvas_ai.app',
    year: '2025',
    role: 'AI Systems Engineer',
    title: 'NeuralCanvas Generative Suite',
    description:
      'Real-time collaborative AI canvas with custom diffusion pipelines, layer-based masking, and prompt-to-vector SVG synthesis.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Next.js', 'WebGL', 'Redis'],
    github: 'https://github.com/01himanshuu/neural-canvas',
    demo: 'https://neuralcanvas.01himanshuu.dev',
  },
  {
    id: 'hyperion-db',
    windowTitle: 'hyperion_db_engine.app',
    year: '2025',
    role: 'Systems Engineer',
    title: 'Hyperion Embedded Key-Value Store',
    description:
      'LSM-tree based persistent storage engine with MVCC transaction support, custom write-ahead logging, and zero-copy reads.',
    techStack: ['C++20', 'Linux epoll', 'Memory Mapped Files', 'Google Test'],
    github: 'https://github.com/01himanshuu/hyperion-db',
    demo: 'https://github.com/01himanshuu/hyperion-db#benchmarks',
  },
  {
    id: 'quantum-mesh',
    windowTitle: 'quantum_mesh_proxy.app',
    year: '2025',
    role: 'Backend Architect',
    title: 'QuantumMesh Service Mesh',
    description:
      'Lightweight eBPF-powered Kubernetes sidecar proxy delivering mTLS encryption, L7 circuit breaking, and adaptive load balancing.',
    techStack: ['Go', 'eBPF', 'Kubernetes API', 'gRPC', 'Prometheus'],
    github: 'https://github.com/01himanshuu/quantum-mesh',
    demo: 'https://quantummesh.01himanshuu.dev',
  },
  {
    id: 'vortex-cli',
    windowTitle: 'vortex_cli_tool.app',
    year: '2025',
    role: 'Creator & Maintainer',
    title: 'Vortex Developer CLI',
    description:
      'Blazing-fast project scaffold and monorepo orchestration tool with dependency graph caching and parallel build pipelines.',
    techStack: ['Rust', 'Tokio', 'Clap', 'Serde', 'GitHub Actions'],
    github: 'https://github.com/01himanshuu/vortex-cli',
    demo: 'https://crates.io/crates/vortex-cli',
  },
  {
    id: 'nebula-ui',
    windowTitle: 'nebula_design_system.app',
    year: '2024',
    role: 'Frontend Architect',
    title: 'Nebula UI Component Library',
    description:
      'Accessible, high-contrast React design system built for complex data-dense fintech dashboards and real-time trading terminals.',
    techStack: ['React', 'TypeScript', 'Radix UI', 'Framer Motion', 'Storybook'],
    github: 'https://github.com/01himanshuu/nebula-ui',
    demo: 'https://nebula-ui.01himanshuu.dev',
  },
  {
    id: 'apex-engine',
    windowTitle: 'apex_game_engine.app',
    year: '2024',
    role: 'Graphics Engineer',
    title: 'Apex 3D Renderer & Engine',
    description:
      'Custom WebGPU physical renderer featuring cascaded shadow maps, PBR lighting, screen-space reflections, and GLTF asset parsing.',
    techStack: ['WebGPU', 'TypeScript', 'WGSL', 'glMatrix', 'Vite'],
    github: 'https://github.com/01himanshuu/apex-engine',
    demo: 'https://apex.01himanshuu.dev',
  },
  {
    id: 'zenith-auth',
    windowTitle: 'zenith_sso_server.app',
    year: '2024',
    role: 'Security Engineer',
    title: 'Zenith Identity & SSO Provider',
    description:
      'OAuth2 / OpenID Connect authentication server featuring WebAuthn passkeys, role-based access control, and anomaly detection.',
    techStack: ['Go', 'PostgreSQL', 'Redis', 'WebAuthn', 'Docker'],
    github: 'https://github.com/01himanshuu/zenith-auth',
    demo: 'https://zenith.01himanshuu.dev',
  },
  {
    id: 'flux-stream',
    windowTitle: 'flux_video_transcoder.app',
    year: '2024',
    role: 'Media Systems Engineer',
    title: 'Flux Adaptive Transcoder',
    description:
      'Distributed HLS/DASH video encoding pipeline utilizing FFmpeg workers, automated quality bitrates, and CDN edge pre-caching.',
    techStack: ['Node.js', 'FFmpeg', 'RabbitMQ', 'AWS S3', 'Kubernetes'],
    github: 'https://github.com/01himanshuu/flux-stream',
    demo: 'https://flux.01himanshuu.dev',
  },
];

export default function ProjectWindows() {
  const { playHover, playClick } = useSound();
  const [selectedModal, setSelectedModal] = useState(null);

  return (
    <div className="w-full mb-24">
      {/* Module Title */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#00F0FF]">
            01 // APPLICATION_WINDOWS
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          CLICK WINDOW FOR FULL CASE STUDY
        </span>
      </div>

      {/* Grid of Application Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setSelectedModal(proj);
            }}
            className="group relative rounded-2xl md:rounded-3xl border border-white/15 bg-neutral-950/70 backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#00F0FF]/60 hover:shadow-[0_0_60px_rgba(0,240,255,0.22)] cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Animated Sheen Reflection on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Top macOS Window Title Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-neutral-900/80 border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <span className="font-mono text-xs text-neutral-400 tracking-wider truncate max-w-[240px] sm:max-w-[320px]">
                {proj.windowTitle}
              </span>
              <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
                {proj.year}
              </span>
            </div>

            {/* Window Content Body */}
            <div className="px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-between flex-1">
              <div>
                {/* Role Badge */}
                <div className="inline-block font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-4">
                  {'// ROLE: ' + proj.role}
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6 group-hover:text-[#00F0FF] transition-colors leading-[1.2] max-w-xl">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 max-w-xl">
                  {proj.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10">
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 transition-colors group-hover:border-[#00F0FF]/30 group-hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Window Footer / Actions */}
              <div
                className="flex items-center justify-between pt-6 md:pt-8 border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-[#00F0FF] transition-colors"
                  >
                    <span>&lt;GitHub /&gt;</span>
                  </a>
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-[#00F0FF] transition-colors"
                  >
                    <span>[Live Demo &rarr;]</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedModal(proj);
                  }}
                  className="font-mono text-xs uppercase tracking-wider text-[#00F0FF] hover:underline flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedModal(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-[#00F0FF]/40 bg-[#0a0a0c] p-8 md:p-10 text-white shadow-[0_0_80px_rgba(0,240,255,0.25)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
                {'// CASE STUDY: ' + selectedModal.id}
              </span>
              <button
                onClick={() => setSelectedModal(null)}
                className="text-neutral-400 hover:text-white font-mono text-sm"
              >
                [CLOSE X]
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {selectedModal.title}
            </h3>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
              {selectedModal.description}
            </p>

            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                {'// ARCHITECTURE & TECH STACK'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedModal.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 font-mono text-xs text-[#00F0FF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
              <a
                href={selectedModal.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                View GitHub
              </a>
              <a
                href={selectedModal.demo}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#00F0FF] text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                Launch Demo &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
