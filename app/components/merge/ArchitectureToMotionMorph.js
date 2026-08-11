'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ArchitectureToMotionMorph — "Architecture diagrams morph into motion paths"
 *
 * Interactive transformation visualizer where system architecture block diagrams
 * (DNS Edge Mesh, Load Balancers, Microservice Orchestrators, Vector DBs)
 * physically curve and transform into 3D cinematic camera motion spline paths.
 */
const SPLINE_NODES = [
  {
    id: 'arch-1',
    archTitle: 'GLOBAL DNS // CDN EDGE MESH',
    archSub: 'GEO-ROUTING // ZERO LATENCY',
    archColor: '#00F0FF',
    motionTitle: 'SHOT 01 // CRANE DOWN WIDE 24MM',
    motionSub: 'ESTABLISHING SHOT // ANAMORPHIC',
    curveType: 'BÉZIER EASE-OUT // HIGH VERTICAL ACCEL',
    desc: 'Edge server request paths morph into a sweeping crane-down establishing camera movement. Data distribution maps to cinematic depth of field.',
  },
  {
    id: 'arch-2',
    archTitle: 'LOAD BALANCER // NGINX CLUSTER',
    archSub: 'ROUND_ROBIN // TLS SSL TERM',
    archColor: '#C084FC',
    motionTitle: 'SHOT 02 // SPEED RAMP PUSH-IN 35MM',
    motionSub: 'MOTION BLUR // 120 FPS SLOW-MO',
    desc: 'Load balancer traffic splitting transforms into a high-speed dolly push-in with optical flow motion blur and speed ramps.',
  },
  {
    id: 'arch-3',
    archTitle: 'MICROSERVICE ORCHESTRATOR // K8S',
    archSub: 'AUTO_SCALING // SERVICE MESH',
    archColor: '#10B981',
    motionTitle: 'SHOT 03 // ANAMORPHIC PAN & TILT 50MM',
    motionSub: 'RULE OF THIRDS // HORIZONTAL STREAK',
    desc: 'Kubernetes container mesh topologies turn into smooth anamorphic camera pan-and-tilt sequences following character movement.',
  },
  {
    id: 'arch-4',
    archTitle: 'PGVECTOR // DISTRIBUTED DATABASE',
    archSub: 'HNSW INDEXING // ACID SHARD',
    archColor: '#F59E0B',
    motionTitle: 'SHOT 04 // DOLLY ZOOM VERTIGO 85MM',
    motionSub: 'PORTRAIT LENS // BACKGROUND WARP',
    desc: 'Database persistence layers morph into a dramatic Hitchcock dolly-zoom vertigo effect, compressing foreground and background space.',
  },
];

export default function ArchitectureToMotionMorph() {
  const [morphProgress, setMorphProgress] = useState(0); // 0 = Arch Diagram, 100 = Camera Motion Path
  const [selectedPoint, setSelectedPoint] = useState(SPLINE_NODES[0]);
  const [isSplining, setIsSplining] = useState(false);
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.arch-motion-window', {
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

  const handleToggleSpline = () => {
    if (isSplining) return;
    playClick();
    setIsSplining(true);
    const target = morphProgress === 100 ? 0 : 100;
    
    let step = morphProgress;
    const interval = setInterval(() => {
      step += target > step ? 4 : -4;
      if ((target === 100 && step >= 100) || (target === 0 && step <= 0)) {
        setMorphProgress(target);
        clearInterval(interval);
        setIsSplining(false);
      } else {
        setMorphProgress(step);
      }
    }, 25);
  };

  return (
    <div ref={containerRef} className="w-full mb-32 select-none">
      {/* Module Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#00F0FF]">
            {'// ARCHITECTURE_TO_MOTION // ARCH_TO_MOTION_ENGINE // CAMERA_SPLINE_v4'}
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleToggleSpline}
          onMouseEnter={playHover}
          disabled={isSplining}
          className={`px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isSplining
              ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] cursor-wait'
              : 'bg-neutral-900/60 border-white/20 text-neutral-300 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isSplining ? 'bg-[#00F0FF] animate-ping' : 'bg-[#C084FC]'
            }`}
          />
          <span>
            {isSplining
              ? 'TRANSFORMING_TRAJECTORY...'
              : morphProgress === 0
              ? '▶ MORPH ARCHITECTURE INTO MOTION PATH'
              : '◀ REVERT TO ARCHITECTURE DIAGRAM'}
          </span>
        </button>
      </div>

      {/* Interactive Morph Slider Bar */}
      <div className="p-4 sm:p-6 rounded-xl border border-white/10 bg-neutral-950/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF] font-bold">0% ARCHITECTURE DIAGRAM</span>
          <span className="text-neutral-500">◄--- PROGRESS: {morphProgress}% ---►</span>
          <span className="text-[#C084FC] font-bold">100% CAMERA SPLINE PATH</span>
        </div>

        <div className="flex items-center gap-2">
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
            [ 0% ARCH ]
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
            [ 100% SPLINE ]
          </button>
        </div>
      </div>

      {/* Main Architecture/Motion Spline Window */}
      <div className="arch-motion-window w-full rounded-2xl border border-[#00F0FF]/30 bg-neutral-950/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_45px_rgba(0,240,255,0.08)]">
        {/* Window Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-neutral-900/70 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-white ml-2">
              merge_engine@arch2motion: ~/[{morphProgress < 50 ? 'SYSTEM_ARCHITECTURE_SCHEMA' : 'CINEMATIC_CAMERA_TRAJECTORY'}]
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">STATE:</span>
            <span className="text-emerald-400 font-bold">● {morphProgress < 50 ? 'BLOCK_DIAGRAM_LOCKED' : 'BEZIER_SPLINE_ACTIVE'}</span>
          </div>
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* LEFT: Morphing Block / Spline Canvas (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">
                {'>> CLICK COMPONENT TO AUDIT ARCHITECTURE-TO-MOTION SPLINE'}
              </div>

              {SPLINE_NODES.map((item, index) => {
                const isSelected = selectedPoint.id === item.id;
                const isMotion = morphProgress >= 50;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      playClick();
                      setSelectedPoint(item);
                    }}
                    onMouseEnter={playHover}
                    className={`w-full p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900/95 border-white shadow-[0_0_25px_rgba(255,255,255,0.2)] translate-x-1'
                        : 'bg-neutral-900/40 border-white/15 hover:border-white/50 hover:bg-neutral-900/70'
                    }`}
                    style={{
                      borderLeftColor: item.archColor,
                      borderLeftWidth: '4px',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {isMotion ? item.motionTitle : item.archTitle}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: `${item.archColor}20`,
                          color: item.archColor,
                        }}
                      >
                        {isMotion ? 'CAMERA SHOT' : 'SYS ARCH'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span>{isMotion ? item.motionSub : item.archSub}</span>
                      <span className="text-amber-400">◆ WAYPOINT 0{index + 1}</span>
                    </div>

                    {/* Animated Spline Arc visualization */}
                    <div className="mt-3 h-2 w-full rounded-full bg-black/60 overflow-hidden relative">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${(index + 1) * 25}%`,
                          backgroundColor: item.archColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>INTERPOLATION: BEZIER CUBIC</span>
              <span>MOTION VELOCITY: EASE-IN-OUT</span>
            </div>
          </div>

          {/* RIGHT: Motion Spline Contract Inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-900/30">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <span className="text-[#00F0FF] uppercase font-bold">
                  {'// TRAJECTORY_INSPECTOR'}
                </span>
                <span className="text-emerald-400">● 60 FPS MOTION_LOCKED</span>
              </div>

              <div className="mb-6">
                <span className="font-mono text-xs text-[#C084FC] font-bold block mb-1">
                  {morphProgress < 50 ? selectedPoint.archTitle : selectedPoint.motionTitle}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {morphProgress < 50 ? selectedPoint.archSub : selectedPoint.motionSub}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {selectedPoint.desc}
                </p>
              </div>

              {/* Data Mapping Table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-neutral-500 text-[10px] uppercase mb-2">
                  {'// ARCH_TO_CAMERA_SPLINE_MAPPING'}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">SYS COMPONENT:</span>
                  <span className="text-[#00F0FF] font-bold truncate max-w-[180px]">
                    {selectedPoint.archTitle.split(' // ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">CAMERA SHOT TYPE:</span>
                  <span className="text-[#C084FC] font-bold truncate max-w-[180px]">
                    {selectedPoint.motionTitle.split(' // ')[1]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">BEZIER SMOOTHNESS:</span>
                  <span className="text-emerald-400 font-bold">100% C2 CONTINUITY</span>
                </div>
              </div>
            </div>

            {/* Right Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>SPLINE ENGINE: WEBGL_2</span>
              <span className="text-emerald-400">● ZERO_JITTER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
