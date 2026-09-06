'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Context — shape kept identical so all consumers (Header etc.) need no changes
// ---------------------------------------------------------------------------
const SoundContext = createContext({
  soundOn: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playStickerPop: () => {},
  playDimensionSwoosh: () => {},
});

export const useSound = () => useContext(SoundContext);

// ---------------------------------------------------------------------------
// localStorage helpers — SSR / static-build safe
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'portfolio_sound_pref';

function getStoredPref() {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  } catch {
    return true;
  }
}

function setStoredPref(value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // ignore quota / private-mode errors
  }
}

/**
 * SoundProvider — Background music controller
 *
 * Audio source : /audio/tomato.mp3  (looping, volume 0.30)
 * Default state: ON for first-time visitors (no saved preference)
 * Persistence  : localStorage key "portfolio_sound_pref"
 * Autoplay     : Gracefully deferred to first user interaction if blocked
 *
 * NO Web Audio API oscillators.
 * NO synthetic ambient drone / noise.
 * NO generated sound effects.
 */
export default function SoundProvider({ children }) {
  // null  = not yet hydrated (treated as true — the default ON state)
  // true  = explicitly ON
  // false = explicitly OFF
  //
  // Using null avoids an OFF→ON flash on first visit:
  //   • SSR renders with soundOn = true (null ?? true), so HTML shows SOUND[ON]
  //   • Client hydrates matching SOUND[ON] — no mismatch for first-time visitors
  //   • After mount, the stored preference replaces null (true or false)
  //   • Users with a saved OFF preference get a brief ON→OFF correction; this is
  //     handled by suppressHydrationWarning on the Header button.
  const [soundPref, setSoundPref] = useState(null);

  // Derived: null (pre-hydration) defaults to true (ON)
  const soundOn = soundPref === null ? true : soundPref;

  // Single HTMLAudioElement for tomato.mp3
  const bgMusicRef = useRef(null);

  // true when the browser blocked autoplay; cleared on successful play
  const bgBlockedRef = useRef(false);

  // -------------------------------------------------------------------------
  // 1. Hydrate from localStorage after mount (client-only)
  // -------------------------------------------------------------------------
  useEffect(() => {
    setSoundPref(getStoredPref());
  }, []);

  // -------------------------------------------------------------------------
  // 2. Create the HTMLAudioElement once on mount (client-only)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio('/audio/tomato.mp3');
    audio.loop = true;
    audio.volume = 0.30;
    audio.preload = 'none'; // stream on demand; do not eagerly download

    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      audio.src = ''; // release the resource
      bgMusicRef.current = null;
    };
  }, []);

  // -------------------------------------------------------------------------
  // 3. Play / pause driven by soundOn state
  // -------------------------------------------------------------------------
  useEffect(() => {
    const audio = bgMusicRef.current;
    if (!audio) return;

    if (soundOn) {
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Browser blocked autoplay — wait for first user interaction
          bgBlockedRef.current = true;
        });
      }
    } else {
      audio.pause();
      bgBlockedRef.current = false;
    }
  }, [soundOn]);

  // -------------------------------------------------------------------------
  // 4. First-interaction retry when autoplay was blocked
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const retry = () => {
      if (!bgBlockedRef.current) return;
      const audio = bgMusicRef.current;
      if (!audio) return;

      audio.play()
        .then(() => { bgBlockedRef.current = false; })
        .catch(() => { /* still blocked — try again on next gesture */ });
    };

    window.addEventListener('click',      retry, { passive: true });
    window.addEventListener('keydown',    retry, { passive: true });
    window.addEventListener('touchstart', retry, { passive: true });

    return () => {
      window.removeEventListener('click',      retry);
      window.removeEventListener('keydown',    retry);
      window.removeEventListener('touchstart', retry);
    };
  }, []);

  // -------------------------------------------------------------------------
  // 5. Toggle — flip state and persist; play/pause handled by effect above
  // -------------------------------------------------------------------------
  const toggleSound = useCallback(() => {
    setSoundPref((prev) => {
      // prev may be null on the very first toggle (pre-hydration edge case)
      // treat null as true (default ON) so the toggle correctly flips to false
      const current = prev === null ? true : prev;
      const next = !current;
      setStoredPref(next);
      return next;
    });
  }, []);

  // -------------------------------------------------------------------------
  // No-ops: keep context API shape so Header and other consumers need no edits
  // -------------------------------------------------------------------------
  const noop = useCallback(() => {}, []);

  return (
    <SoundContext.Provider
      value={{
        soundOn,
        toggleSound,
        playClick: noop,
        playHover: noop,
        playStickerPop: noop,
        playDimensionSwoosh: noop,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}