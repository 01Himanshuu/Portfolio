'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext({
  soundOn: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playStickerPop: () => {},
  playDimensionSwoosh: () => {},
});

export const useSound = () => useContext(SoundContext);

/**
 * SoundProvider — Advanced Hybrid Web Audio API & Sample Sound Engine
 * Replicates haoqi.design's futuristic sound design:
 * 1. Combines crisp Web Audio synth waveforms with HTML5 Audio MP3 samples
 * 2. Atmospheric ambient chord background when SOUND[♪] is toggled ON
 * 3. Supports UI click, delicate hover, sticker pop, and 3D dimension swoosh
 */
export default function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(false);
  const audioCtxRef = useRef(null);
  const ambientOscRef = useRef([]);
  const ambientGainRef = useRef(null);
  const samplesRef = useRef({});

  // Initialize Web Audio Context & pre-load audio sample buffers
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Helper to play optional MP3 samples from /public/audio/
  const playSample = useCallback((name, volume = 0.35) => {
    if (typeof window === 'undefined') return;
    try {
      if (!samplesRef.current[name]) {
        samplesRef.current[name] = new Audio(`/audio/${name}.mp3`);
      }
      const audio = samplesRef.current[name].cloneNode();
      audio.volume = volume;
      audio.play().catch(() => {
        // ignore autoplay/decoding error
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // 1. Futuristic UI Click Sound (Synth + MP3 click sample)
  const playClick = useCallback(() => {
    if (!soundOn) return;
    playSample('click', 0.4);

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // ignore
    }
  }, [soundOn, getAudioContext, playSample]);

  // 2. Delicate UI Hover Blip (Synth + MP3 hover sample)
  const playHover = useCallback(() => {
    if (!soundOn) return;
    playSample('hover', 0.22);

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // ignore
    }
  }, [soundOn, getAudioContext, playSample]);

  // 3. Sticker Hover / Pop Sound (Synth + MP3 pop sample)
  const playStickerPop = useCallback(() => {
    if (!soundOn) return;
    playSample('pop', 0.45);

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // ignore
    }
  }, [soundOn, getAudioContext, playSample]);

  // 4. "Different Dimension" 3D Scroll Swoosh Sound (Synth + MP3 whoosh sample)
  const playDimensionSwoosh = useCallback(() => {
    if (!soundOn) return;
    playSample('whoosh', 0.35);

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Filtered white noise swoosh
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // ignore
    }
  }, [soundOn, getAudioContext, playSample]);

  // Toggle background ambient soundtrack & play feedback chirp
  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      const ctx = getAudioContext();
      if (!ctx) return next;

      if (next) {
        // Play activation feedback chirp
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.15); // C6
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } catch (e) {
          // ignore
        }

        // Start lush futuristic ambient chord (E minor 9 / space synth)
        try {
          const freqs = [164.81, 246.94, 329.63, 493.88]; // E3, B3, E4, B4
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.0); // Smooth 2s fade-in
          gain.connect(ctx.destination);
          ambientGainRef.current = gain;

          const oscs = freqs.map((f, idx) => {
            const osc = ctx.createOscillator();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            osc.connect(gain);
            osc.start();
            return osc;
          });
          ambientOscRef.current = oscs;
        } catch (e) {
          // ignore
        }
      } else {
        // Stop ambient chord smoothly
        if (ambientGainRef.current && ctx) {
          ambientGainRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          setTimeout(() => {
            ambientOscRef.current.forEach((osc) => {
              try { osc.stop(); } catch (e) { /* ignore */ }
            });
            ambientOscRef.current = [];
          }, 800);
        }
      }
      return next;
    });
  }, [getAudioContext]);

  // Global click listener for UI feedback when soundOn is enabled
  useEffect(() => {
    if (!soundOn) return;
    const handleWindowClick = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button'))
      ) {
        playClick();
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [soundOn, playClick]);

  return (
    <SoundContext.Provider
      value={{
        soundOn,
        toggleSound,
        playClick,
        playHover,
        playStickerPop,
        playDimensionSwoosh,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

