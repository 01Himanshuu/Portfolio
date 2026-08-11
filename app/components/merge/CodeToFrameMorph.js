'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * CodeToFrameMorph — "Code transforms into video frames"
 *
 * Interactive dual-viewport engine where live TypeScript & GLSL shader code
 * physically dissolves and synthesizes into cinematic 4K video frames.
 * Features:
 * - 3 Morphing Presets (Raytraced Neon Noir, Anamorphic Halation, RAG Vector Flow)
 * - Interactive slider (0% CODE <----> 100% CINEMA FRAME) and quick-step controls
 * - Dynamic visual synthesis between syntax highlighting and film grading
 */
const MORPH_PRESETS = [
  {
    id: 'neon-noir',
    name: '01. RAYTRACED_NEON_NOIR',
    desc: 'GLSL Raymarching fragment shader morphing into a cyberpunk architectural wide establishing shot.',
    codeSnippet: `// 01. GLSL RAYMARCHED CYBERPUNK LIGHTING ENGINE
#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

vec3 getNeonHalation(vec3 p, vec3 lightPos) {
  float dist = length(p - lightPos);
  float glow = 1.0 / (0.05 + dist * dist * 4.0);
  return vec3(0.0, 0.94, 1.0) * glow + vec3(0.75, 0.52, 0.99) * (glow * 0.5);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  vec3 color = getNeonHalation(vec3(uv, 1.0), vec3(0.0, 0.0, 2.0));
  gl_FragColor = vec4(color, 1.0); // RENDER_FRAME(4K_HDR);
}`,
    frameTitle: 'CYBERPUNK NEON NOIR // 4K ANAMORPHIC',
    frameStyle: 'from-[#00F0FF]/40 via-neutral-900 to-[#C084FC]/40',
    telemetry: 'RENDERED: 8K VV 17:9 // LUT: TEAL_ORANGE_C4 // FPS: 60',
  },
  {
    id: 'anamorphic-lens',
    name: '02. ANAMORPHIC_HALATION',
    desc: 'Three.js custom optical post-processing pass morphing into an anamorphic blue lens flare streak.',
    codeSnippet: `// 02. THREE.JS ANAMORPHIC LENS FLARE POST-PROCESSING
import { EffectComposer, UnrealBloomPass } from 'three-stdlib';

export function configureCinemaPipeline(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(3840, 2160), 1.8, 0.4, 0.85);
  
  // Custom horizontal streak kernel for 2x anamorphic simulation
  bloomPass.tintColor = new THREE.Color('#00F0FF');
  bloomPass.horizontalStreakIntensity = 2.4;
  composer.addPass(bloomPass);
  return composer; // SYNC_TIMELINE_PLAYHEAD();
}`,
    frameTitle: 'ANAMORPHIC BLUE FLARE // HIGH_CONTRAST',
    frameStyle: 'from-blue-600/35 via-neutral-900 to-amber-500/30',
    telemetry: 'RENDERED: ARRI LOG-C4 // ISO 800 // T1.9 MASTER LENS',
  },
  {
    id: 'rag-vector',
    name: '03. AGENTIC_RAG_FLOW',
    desc: 'TypeScript Pinecone HNSW vector indexing query morphing into an animated 3D data-stream cinematic graphic.',
    codeSnippet: `// 03. AGENTIC VECTOR HYBRID SEARCH & RENDER PIPELINE
import { PineconeClient } from '@pinecone-database/pinecone';
import { animateCameraSpline } from './CinematicCamera';

async function executeStoryQuery(prompt: string): Promise<CinematicFrame> {
  const embedding = await embedText(prompt, { dimensions: 1536 });
  const matches = await pineconeIndex.query({ vector: embedding, topK: 5 });
  
  // Morph top semantic matches into animated keyframe sequence
  return animateCameraSpline(matches[0].metadata.keyframes);
}`,
    frameTitle: 'AGENTIC VECTOR STREAM // 3D MOTION SPLINE',
    frameStyle: 'from-emerald-500/30 via-neutral-900 to-[#00F0FF]/35',
    telemetry: 'RENDERED: REALTIME WEBGPU // TTFT < 110ms // 14K NODES',
  },
];

export default function CodeToFrameMorph() {
  const [activePreset, setActivePreset] = useState(MORPH_PRESETS[0]);
  const [morphProgress, setMorphProgress] = useState(50); // 0 = Pure Code, 100 = Pure Frame
  const [isAutoMorphing, setIsAutoMorphing] = useState(false);
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.code-frame-engine', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAutoMorph = () => {
    if (isAutoMorphing) return;
    playClick();
    setIsAutoMorphing(true);
    setMorphProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress <= 100) {
        setMorphProgress(progress);
      } else {
        clearInterval(interval);
        setIsAutoMorphing(false);
      }
    }, 35);
  };

  return (
    <div ref={containerRef} className="w-full mb-32 select-none">
      {/* Module Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#00F0FF]">
            {'// SYNTAX_TO_CINEMA // CODE_TO_FRAME_MORPH_ENGINE // WEBGL_SHADER_v4'}
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleAutoMorph}
          onMouseEnter={playHover}
          disabled={isAutoMorphing}
          className={`px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isAutoMorphing
              ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] cursor-wait'
              : 'bg-neutral-900/60 border-white/20 text-neutral-300 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAutoMorphing ? 'bg-[#00F0FF] animate-ping' : 'bg-[#C084FC]'
            }`}
          />
          <span>{isAutoMorphing ? 'MORPHING_SYNTAX_TO_FRAME...' : '▶ TRIGGER CODE-TO-FRAME MORPH'}</span>
        </button>
      </div>

      {/* Preset Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {MORPH_PRESETS.map((preset) => {
          const isSelected = activePreset.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                playClick();
                setActivePreset(preset);
              }}
              onMouseEnter={playHover}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer focus-visible:outline-none ${
                isSelected
                  ? 'bg-neutral-900/95 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.18)] -translate-y-0.5'
                  : 'bg-neutral-950/60 border-white/10 hover:border-[#00F0FF]/40 hover:bg-neutral-900/50'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                <span className="text-[#00F0FF] font-bold">{preset.name}</span>
                <span className="text-[10px] uppercase text-neutral-400">PRESET</span>
              </div>
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {preset.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Morph Control Slider Bar */}
      <div className="p-4 sm:p-6 rounded-xl border border-white/10 bg-neutral-950/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF] font-bold">0% SYNTAX CODE</span>
          <span className="text-neutral-500">◄--- MORPH PROGRESS: {morphProgress}% ---►</span>
          <span className="text-[#C084FC] font-bold">100% CINEMA FRAME</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              playClick();
              setMorphProgress(0);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              morphProgress === 0
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ 0% CODE ]
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setMorphProgress(50);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              morphProgress === 50
                ? 'bg-white/20 border-white text-white'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ 50% BLEND ]
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setMorphProgress(100);
            }}
            className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
              morphProgress === 100
                ? 'bg-[#C084FC]/20 border-[#C084FC] text-[#C084FC]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ 100% FRAME ]
          </button>
        </div>
      </div>

      {/* Dual/Hybrid Viewport Morph Canvas */}
      <div className="code-frame-engine w-full rounded-2xl border border-white/20 bg-neutral-950 overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.12)] min-h-[440px] flex flex-col justify-between">
        {/* Top Window Slate Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-neutral-900/70 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-white ml-2">
              merge_engine@code2frame: ~/{activePreset.name} — [SYNTHESIS_PROGRESS: {morphProgress}%]
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{
                backgroundColor: morphProgress < 50 ? 'rgba(0,240,255,0.15)' : 'rgba(192,132,252,0.2)',
                color: morphProgress < 50 ? '#00F0FF' : '#C084FC',
                borderColor: morphProgress < 50 ? '#00F0FF' : '#C084FC',
              }}
            >
              {morphProgress < 30
                ? '● STATE: SYNTAX_CODE_LOCKED'
                : morphProgress < 75
                ? '● STATE: SYNTHESIZING_PIXELS'
                : '● STATE: CINEMA_FRAME_RENDERED'}
            </span>
          </div>
        </div>

        {/* Main Morphing Stage Container */}
        <div
          className={`relative flex-1 p-6 sm:p-10 flex flex-col justify-center transition-all duration-500 bg-gradient-to-br ${activePreset.frameStyle}`}
        >
          {/* Film Grain & Corner HUD Brackets when morphProgress >= 40% */}
          {morphProgress >= 40 && (
            <>
              <div
                className="absolute inset-0 pointer-events-none opacity-25 z-10"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)',
                  backgroundSize: '4px 4px',
                }}
              />
              <div className="absolute top-4 left-4 font-mono text-sm text-white/60 pointer-events-none z-20">
                [+
              </div>
              <div className="absolute top-4 right-4 font-mono text-sm text-white/60 pointer-events-none z-20">
                +]
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-sm text-white/60 pointer-events-none z-20">
                [+
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-sm text-white/60 pointer-events-none z-20">
                +]
              </div>
            </>
          )}

          {/* CODE EDITOR LAYER (Fades out as morphProgress approaches 100%) */}
          <div
            className="relative z-10 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed transition-all duration-300"
            style={{
              opacity: Math.max(0, 1 - (morphProgress / 90)),
              transform: `scale(${1 - morphProgress * 0.0015}) translateY(${morphProgress * 0.15}px)`,
            }}
          >
            <div className="p-4 sm:p-6 rounded-xl bg-black/80 border border-white/10 shadow-lg">
              <pre className="overflow-x-auto whitespace-pre">
                <code>{activePreset.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* CINEMATIC FRAME LAYER (Fades in as morphProgress increases) */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 sm:p-12 pointer-events-none transition-all duration-500"
            style={{
              opacity: morphProgress / 100,
              transform: `scale(${0.9 + (morphProgress / 100) * 0.1})`,
            }}
          >
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded bg-black/70 border border-white/20 font-mono text-[11px] text-[#C084FC] uppercase tracking-widest mb-4">
                {'// RENDERED_CINEMATIC_FRAME // 4K_RAW_MASTER'}
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-3 drop-shadow-xl">
                {activePreset.frameTitle}
              </h3>
              <p className="text-sm sm:text-base text-neutral-200 font-light max-w-xl mx-auto leading-relaxed">
                Code syntax transformed into high-bitrate color-graded video frames. Achieving zero-latency visual storytelling directly from shader mathematics.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Status Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-neutral-950 font-mono text-[11px] text-neutral-400 relative z-30">
          <span>{activePreset.telemetry}</span>
          <span className="text-emerald-400">● {morphProgress === 100 ? 'FRAME_LOCKED' : 'MORPH_ACTIVE'}</span>
        </div>
      </div>
    </div>
  );
}
