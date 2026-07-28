'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, THEME_LABELS } from './ThemeProvider';
import { useSound } from './SoundProvider';

/**
 * Header — Sticky top navigation bar
 * Replicates haoqi.design's header: logo left, nav + THEME[A] + SOUND[·] right
 * Wired to Web Audio API & Hybrid Sound Engine in Phase 4
 */
export default function Header() {
  const pathname = usePathname();
  const { theme, cycleTheme } = useTheme();
  const { soundOn, toggleSound, playHover, playClick } = useSound();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    playClick();
    setMenuOpen((prev) => !prev);
  }, [playClick]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Determine active nav item
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      {/* Logo */}
      <Link
        href="/"
        className="header-logo"
        onClick={() => {
          playClick();
          closeMenu();
        }}
        onMouseEnter={playHover}
      >
        HIMANSHU JANGRA©2026
      </Link>

      {/* Desktop Navigation */}
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`} id="header-nav">
        <Link
          href="/tech"
          className={`header-nav-link ${isActive('/tech') ? 'active' : ''}`}
          onClick={() => {
            playClick();
            closeMenu();
          }}
          onMouseEnter={playHover}
        >
          Tech
        </Link>
        <Link
          href="/social"
          className={`header-nav-link ${isActive('/social') ? 'active' : ''}`}
          onClick={() => {
            playClick();
            closeMenu();
          }}
          onMouseEnter={playHover}
        >
          Social
        </Link>
        <Link
          href="#contact"
          className="header-nav-link"
          onClick={() => {
            playClick();
            closeMenu();
          }}
          onMouseEnter={playHover}
        >
          Contact
        </Link>

        {/* Theme Toggle */}
        <button
          className="header-toggle"
          onClick={() => {
            playClick();
            cycleTheme();
          }}
          onMouseEnter={playHover}
          aria-label="Toggle theme"
        >
          THEME[{THEME_LABELS[theme]}]
        </button>

        {/* Sound Toggle */}
        <button
          className={`header-toggle ${soundOn ? 'sound-active-pulse' : ''}`}
          onClick={toggleSound}
          onMouseEnter={playHover}
          aria-label="Toggle sound"
          style={{
            color: soundOn ? 'var(--accent-highlight)' : 'inherit',
            fontWeight: soundOn ? 'bold' : 'normal',
          }}
        >
          SOUND[{soundOn ? '♪' : '·'}]
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
