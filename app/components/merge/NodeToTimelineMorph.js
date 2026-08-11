'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * NodeToTimelineMorph — "Node graphs become editing timelines"
 *
 * Interactive transformation engine where distributed backend node graphs
 * (API Gateway, Agentic Router, Vector Index, Redis Cache) physically morph
 * into multi-track NLE editing timeline tracks.
 */
const MORPH_NODES = [
  {
    id: 'node-1',
    nodeName: 'NODE 01: GRAPHQL FEDERATED GATEWAY',
    nodeType: 'API_ROUTING // ZERO_TRUST_AUTH',
    nodeColor: '#00F0FF',
    timelineTrack: 'V1 // MAIN_REEL_MASTER [00:00:00 -> 00:00:28]',
    timelineRole: 'VIDEO SEQUENCE // ANAMORPHIC_8K',
    desc: 'Backend API requests morph into sequential video clip frames. Sub-second request routing synchronizes directly with 60 FPS video playback.',
  },
  {
    id: 'node-2',
    nodeName: 'NODE 02: AGENTIC RAG PROMPT ROUTER',
    nodeType: 'AI_AGENT // TOOL_CALLING_LOOP',
    nodeColor: '#C084FC',
    timelineTrack: 'V2 // COLOR_LUT_GRADE [00:00:29 -> 00:00:45]',
    timelineRole: 'COLOR GRADE // TEAL_ORANGE_C4',
    desc: 'LangChain decision loops transform into color grading adjustment layers. AI token streams become highlight separation curves.',
  },
  {
    id: 'node-3',
    nodeName: 'NODE 03: PINECONE HYBRID VECTOR DB',
    nodeType: 'VECTOR_INDEX // 1536_DIMS_HNSW',
    nodeColor: '#10B981',
    timelineTrack: 'A1 // DOLBY_ATMOS_SCORE [00:00:00 -> 00:01:00]',
    timelineRole: 'AUDIO STEM // 7.1.4 SURROUND_MIX',
    desc: 'High-dimensional embedding vectors morph into multi-channel Dolby Atmos surround sound audio stems.',
  },
  {
    id: 'node-4',
    nodeName: 'NODE 04: REDIS ENTERPRISE MEMORY CLUSTER',
    nodeType: 'IN_MEMORY_CACHE // SUB_MS_LATENCY',
    nodeColor: '#F59E0B',
    timelineTrack: 'FX // 35MM_FILM_GRAIN_OVERLAY [00:00:10 -> 00:00:55]',
    timelineRole: 'VFX OVERLAY // HALATION_NOISE',
    desc: 'In-memory caching streams transform into organic 35mm silver halide film grain and anamorphic lens flare overlays.',
  },
];

export default function NodeToTimelineMorph() {
  const [morphProgress, setMorphProgress] = useState(0); // 0 = Node Graph, 100 = NLE Timeline
  const [selectedNode, setSelectedNode] = useState(MORPH_NODES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.node-timeline-window', {
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

  const handleToggleMorph = () => {
    if (isAnimating) return;
    playClick();
    setIsAnimating(true);
    const target = morphProgress === 100 ? 0 : 100;
    
    let step = morphProgress;
    const interval = setInterval(() => {
      step += target > step ? 4 : -4;
      if ((target === 100 && step >= 100) || (target === 0 && step <= 0)) {
        setMorphProgress(target);
        clearInterval(interval);
        setIsAnimating(false);
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
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#C084FC]">
            {'// GRAPH_TO_TIMELINE // NODE_TO_TIMELINE_MORPH // BACKEND_TO_NLE'}
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-[#C084FC]/50 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleToggleMorph}
          onMouseEnter={playHover}
          disabled={isAnimating}
          className={`px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isAnimating
              ? 'bg-[#C084FC]/20 border-[#C084FC] text-[#C084FC] cursor-wait'
              : 'bg-neutral-900/60 border-white/20 text-neutral-300 hover:border-[#C084FC] hover:text-[#C084FC] hover:shadow-[0_0_15px_rgba(192,132,252,0.2)]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAnimating ? 'bg-[#C084FC] animate-ping' : 'bg-emerald-400'
            }`}
          />
          <span>
            {isAnimating
              ? 'MORPHING_GRAPH...'
              : morphProgress === 0
              ? '▶ MORPH GRAPH INTO TIMELINE'
              : '◀ REVERT TO NODE GRAPH'}
          </span>
        </button>
      </div>

      {/* Interactive Morph Control Slider */}
      <div className="p-4 sm:p-6 rounded-xl border border-white/10 bg-neutral-950/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF] font-bold">0% NODE GRAPH</span>
          <span className="text-neutral-500">◄--- PROGRESS: {morphProgress}% ---►</span>
          <span className="text-[#C084FC] font-bold">100% NLE TIMELINE</span>
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
            [ 0% GRAPH ]
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
            [ 50% HYBRID ]
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
            [ 100% TIMELINE ]
          </button>
        </div>
      </div>

      {/* Main Morph Window */}
      <div className="node-timeline-window w-full rounded-2xl border border-[#C084FC]/30 bg-neutral-950/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_45px_rgba(192,132,252,0.08)]">
        {/* Window Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-neutral-900/70 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-white ml-2">
              merge_engine@node2timeline — [{morphProgress < 50 ? 'DISTRIBUTED_NODE_TOPOLOGY' : 'MULTI_TRACK_NLE_TIMELINE'}]
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">STATE:</span>
            <span className="text-emerald-400 font-bold">● {morphProgress < 50 ? 'BACKEND_GRAPH_ACTIVE' : 'TIMELINE_SYNC_LOCKED'}</span>
          </div>
        </div>

        {/* 2-Column Workspace: Left Morph Stage, Right Node/Track Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* LEFT: Morphing Stage Canvas (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">
                {'>> SELECT NODE / TRACK TO AUDIT CONVERGENCE CONTRACT'}
              </div>

              {/* Render Nodes morphing into Tracks */}
              {MORPH_NODES.map((item) => {
                const isSelected = selectedNode.id === item.id;
                const isTimeline = morphProgress >= 50;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      playClick();
                      setSelectedNode(item);
                    }}
                    onMouseEnter={playHover}
                    className={`w-full p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900/95 border-white shadow-[0_0_25px_rgba(255,255,255,0.2)] translate-x-1'
                        : 'bg-neutral-900/40 border-white/15 hover:border-white/50 hover:bg-neutral-900/70'
                    }`}
                    style={{
                      borderLeftColor: item.nodeColor,
                      borderLeftWidth: '4px',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {isTimeline ? item.timelineTrack : item.nodeName}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: `${item.nodeColor}20`,
                          color: item.nodeColor,
                        }}
                      >
                        {isTimeline ? 'NLE TRACK' : 'BACKEND NODE'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span>{isTimeline ? item.timelineRole : item.nodeType}</span>
                      <span className="text-emerald-400">◆ {isTimeline ? 'SYNC_KEYFRAME' : 'DATA_STREAM'}</span>
                    </div>

                    {/* Animated Progress Bar representing Wire -> Timeline Clip */}
                    <div className="mt-3 h-2 w-full rounded-full bg-black/60 overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${50 + morphProgress * 0.5}%`,
                          backgroundColor: item.nodeColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>TOPOLOGY: CONVERGED_HYBRID</span>
              <span>LATENCY: ZERO_FRAME_DROP</span>
            </div>
          </div>

          {/* RIGHT: Convergence Contract Inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-900/30">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <span className="text-[#C084FC] uppercase font-bold">
                  {'// CONVERGENCE_INSPECTOR'}
                </span>
                <span className="text-emerald-400">● MAPPED_1_TO_1</span>
              </div>

              <div className="mb-6">
                <span className="font-mono text-xs text-[#00F0FF] font-bold block mb-1">
                  {morphProgress < 50 ? selectedNode.nodeName : selectedNode.timelineTrack}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {morphProgress < 50 ? selectedNode.nodeType : selectedNode.timelineRole}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {selectedNode.desc}
                </p>
              </div>

              {/* Data Contract Mapping Table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-neutral-500 text-[10px] uppercase mb-2">
                  {'// BACKEND_TO_NLE_MAPPING'}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">ENGINEERING LAYER:</span>
                  <span className="text-[#00F0FF] font-bold truncate max-w-[180px]">
                    {selectedNode.nodeName.split(': ')[1]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">STORYTELLING TRACK:</span>
                  <span className="text-[#C084FC] font-bold truncate max-w-[180px]">
                    {selectedNode.timelineTrack.split(' // ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">SYNCHRONIZATION:</span>
                  <span className="text-emerald-400 font-bold">100% REALTIME_LINKED</span>
                </div>
              </div>
            </div>

            {/* Right Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>CONTRACT: VERIFIED</span>
              <span className="text-emerald-400">● ZERO_OVERHEAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
