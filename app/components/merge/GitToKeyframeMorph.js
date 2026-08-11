'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GitToKeyframeMorph — "Git commits become keyframes"
 *
 * Interactive transformation engine where multi-branch Git commit trees
 * (#c8e714a, #a3f8901, #4b1029c, #9e2a40b) physically morph into glowing gold
 * keyframe diamonds (◆) connected by Bezier cubic interpolation curves.
 */
const MORPH_COMMITS = [
  {
    id: 'commit-1',
    commitHash: '#c8e714a // feat(rag): add Pinecone hybrid search',
    branch: 'main // origin/main',
    commitColor: '#00F0FF',
    keyframeTitle: '◆ KEYFRAME 01 // 00:00:00:00 -> OPACITY 100%',
    keyframeCurve: 'BÉZIER CUBIC // EASE-IN-OUT (0.4, 0.0, 0.2, 1)',
    desc: 'Initial architecture commit hash transforms into the sequence anchor keyframe. Sets initial opacity and viewport scale.',
  },
  {
    id: 'commit-2',
    commitHash: '#a3f8901 // perf(ui): zero-layout-shift concurrent UI',
    branch: 'feat/ai-engine // PR #142',
    commitColor: '#C084FC',
    keyframeTitle: '◆ KEYFRAME 02 // 00:00:18:12 -> SPEED RAMP 200%',
    keyframeCurve: 'EXPONENTIAL VELOCITY // ACCEL_RAMP',
    desc: 'Performance optimization branch merges into a dynamic speed ramp keyframe, accelerating camera movement through architectural space.',
  },
  {
    id: 'commit-3',
    commitHash: '#4b1029c // style(cinema): anamorphic lens halation',
    branch: 'perf/webgpu // PR #148',
    commitColor: '#10B981',
    keyframeTitle: '◆ KEYFRAME 03 // 00:00:36:00 -> BLUR HALATION +25px',
    keyframeCurve: 'SPRING DAMPING // ZERO OVERSHOOT',
    desc: 'Visual shader style commit transforms into an optical halation keyframe, causing bright neon highlights to bloom organically.',
  },
  {
    id: 'commit-4',
    commitHash: '#9e2a40b // release: v2.4 production master',
    branch: 'main // tag: v2.4-prod',
    commitColor: '#F59E0B',
    keyframeTitle: '◆ KEYFRAME 04 // 00:00:58:24 -> FADE TO NOIR 0%',
    keyframeCurve: 'SMOOTH DECELERATION // EASE-OUT',
    desc: 'Production release tag morphs into the final sequence fade-out keyframe, completing the storytelling arc with zero layout shift.',
  },
];

export default function GitToKeyframeMorph() {
  const [morphProgress, setMorphProgress] = useState(0); // 0 = Git Tree, 100 = Keyframe Deck
  const [selectedItem, setSelectedItem] = useState(MORPH_COMMITS[0]);
  const [isMorphing, setIsMorphing] = useState(false);
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.git-keyframe-window', {
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
    if (isMorphing) return;
    playClick();
    setIsMorphing(true);
    const target = morphProgress === 100 ? 0 : 100;
    
    let step = morphProgress;
    const interval = setInterval(() => {
      step += target > step ? 4 : -4;
      if ((target === 100 && step >= 100) || (target === 0 && step <= 0)) {
        setMorphProgress(target);
        clearInterval(interval);
        setIsMorphing(false);
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
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#F59E0B]">
            {'// COMMITS_TO_KEYFRAMES // GIT_TO_KEYFRAME_MORPH // BEZIER_INTERPOLATION'}
          </span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-[#F59E0B]/50 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleToggleMorph}
          onMouseEnter={playHover}
          disabled={isMorphing}
          className={`px-4 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isMorphing
              ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B] cursor-wait'
              : 'bg-neutral-900/60 border-white/20 text-neutral-300 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isMorphing ? 'bg-[#F59E0B] animate-ping' : 'bg-emerald-400'
            }`}
          />
          <span>
            {isMorphing
              ? 'MORPHING_COMMITS...'
              : morphProgress === 0
              ? '▶ MORPH GIT COMMITS INTO KEYFRAMES'
              : '◀ REVERT TO GIT COMMIT TREE'}
          </span>
        </button>
      </div>

      {/* Interactive Morph Slider Bar */}
      <div className="p-4 sm:p-6 rounded-xl border border-white/10 bg-neutral-950/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#00F0FF] font-bold">0% GIT COMMITS</span>
          <span className="text-neutral-500">◄--- PROGRESS: {morphProgress}% ---►</span>
          <span className="text-[#F59E0B] font-bold">100% GOLD KEYFRAMES (◆)</span>
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
            [ 0% GIT ]
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
                ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            [ 100% KEYFRAMES ]
          </button>
        </div>
      </div>

      {/* Main Git/Keyframe Window */}
      <div className="git-keyframe-window w-full rounded-2xl border border-[#F59E0B]/30 bg-neutral-950/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_45px_rgba(245,158,11,0.08)]">
        {/* Window Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-neutral-900/70 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-white ml-2">
              merge_engine@git2keyframe: ~/[{morphProgress < 50 ? 'GIT_BRANCH_COMMITS' : 'CINEMATIC_KEYFRAME_CURVES'}]
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">STATE:</span>
            <span className="text-emerald-400 font-bold">● {morphProgress < 50 ? 'COMMIT_TREE_CLEAN' : 'KEYFRAMES_LOCKED'}</span>
          </div>
        </div>

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* LEFT: Git Commit / Golden Keyframe Stage Canvas (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2">
                {'>> CLICK COMMIT / KEYFRAME TO AUDIT INTERPOLATION METADATA'}
              </div>

              {MORPH_COMMITS.map((item, index) => {
                const isSelected = selectedItem.id === item.id;
                const isKeyframe = morphProgress >= 50;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      playClick();
                      setSelectedItem(item);
                    }}
                    onMouseEnter={playHover}
                    className={`w-full p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900/95 border-white shadow-[0_0_25px_rgba(255,255,255,0.2)] translate-x-1'
                        : 'bg-neutral-900/40 border-white/15 hover:border-white/50 hover:bg-neutral-900/70'
                    }`}
                    style={{
                      borderLeftColor: item.commitColor,
                      borderLeftWidth: '4px',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {isKeyframe ? item.keyframeTitle : item.commitHash}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: `${item.commitColor}20`,
                          color: item.commitColor,
                        }}
                      >
                        {isKeyframe ? '◆ KEYFRAME' : 'COMMIT HASH'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span>{isKeyframe ? item.keyframeCurve : item.branch}</span>
                      <span className="text-amber-400">● INDEX 0{index + 1}</span>
                    </div>

                    {/* Animated Bezier interpolation visualizer bar */}
                    <div className="mt-3 h-2 w-full rounded-full bg-black/60 overflow-hidden relative">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${(index + 1) * 25}%`,
                          backgroundColor: item.commitColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>COMMITS: 1,420+ VERIFIED</span>
              <span>CURVES: CUBIC BÉZIER (0.4, 0, 0.2, 1)</span>
            </div>
          </div>

          {/* RIGHT: Keyframe Interpolation Inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-900/30">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <span className="text-[#F59E0B] uppercase font-bold">
                  {'// KEYFRAME_INSPECTOR [◆]'}
                </span>
                <span className="text-emerald-400">● EASE_IN_OUT_LOCKED</span>
              </div>

              <div className="mb-6">
                <span className="font-mono text-xs text-[#F59E0B] font-bold block mb-1">
                  {morphProgress < 50 ? selectedItem.commitHash.split(' // ')[0] : selectedItem.keyframeTitle.split(' // ')[0]}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {morphProgress < 50 ? selectedItem.branch : selectedItem.keyframeCurve}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>

              {/* Data Mapping Table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-neutral-500 text-[10px] uppercase mb-2">
                  {'// GIT_HASH_TO_KEYFRAME_TIMESTAMP'}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">REVISION HASH:</span>
                  <span className="text-[#00F0FF] font-bold truncate max-w-[180px]">
                    {selectedItem.commitHash.split(' // ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">INTERPOLATION:</span>
                  <span className="text-[#F59E0B] font-bold truncate max-w-[180px]">
                    {selectedItem.keyframeCurve.split(' // ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-neutral-400">FRAME CONTINUITY:</span>
                  <span className="text-emerald-400 font-bold">100% BEZIER_SYNC</span>
                </div>
              </div>
            </div>

            {/* Right Footer */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>GIT HISTORY: LINKED</span>
              <span className="text-emerald-400">● VERIFIED_MERGE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
