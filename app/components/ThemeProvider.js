'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'auto',       // 'auto' | 'light' | 'dark'
  resolvedTheme: 'light', // actual applied theme
  cycleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const THEMES = ['auto', 'light', 'dark'];
const THEME_LABELS = { auto: 'A', light: 'L', dark: 'D' };
const STORAGE_KEY = 'hj-theme';

function getSystemPreference() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('auto');
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Resolve the actual theme (auto → system preference)
  const resolve = useCallback((t) => {
    return t === 'auto' ? getSystemPreference() : t;
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback((t) => {
    const resolved = resolve(t);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-mode', t);
    setResolvedTheme(resolved);
  }, [resolve]);

  // Initialize from localStorage
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.includes(saved)) {
        setTheme(saved);
        applyTheme(saved);
      } else {
        applyTheme('auto');
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [applyTheme]);

  // Listen for system preference changes (for auto mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, applyTheme]);

  // Cycle: auto → light → dark → auto
  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const idx = THEMES.indexOf(prev);
      const next = THEMES[(idx + 1) % THEMES.length];
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Expose theme labels for use in header
export { THEME_LABELS };
