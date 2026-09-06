'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, THEME_LABELS } from './ThemeProvider';
import { useSound } from './SoundProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Header — Sticky top navigation bar
 * Fully functional with smooth scrolling and IntersectionObserver active states.
 */
export default function Header() {
  const pathname = usePathname();
  const { theme, cycleTheme } = useTheme();
  const { soundOn, toggleSound, playHover, playClick } = useSound();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hello');

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ['hello', 'build', 'creative-studio', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = useCallback(() => {
    playClick();
    setMenuOpen((prev) => !prev);
  }, [playClick]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((targetId) => {
    playClick();
    closeMenu();
    
    if (typeof window !== 'undefined') {
      if (window.__lenis && targetId) {
        window.__lenis.scrollTo(targetId, { offset: 0, duration: 1.5 });
      }
    }
  }, [playClick, closeMenu]);

  return (
    <header className="header z-[100] relative">
      {/* Logo */}
      <button
        className="header-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 rounded px-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        onClick={() => handleNavClick('#hello')}
        onMouseEnter={playHover}
      >
        HIMANSHU JANGRA©2026
      </button>

      {/* Desktop Navigation */}
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`} id="header-nav">
        
        <button
          className={`header-nav-link ${activeSection === 'build' ? 'active text-[#00F0FF]' : ''} active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 rounded px-2 transition-all duration-300`}
          onClick={() => handleNavClick('#build')}
          onMouseEnter={playHover}
        >
          Tech
        </button>
        
        <button
          className={`header-nav-link ${activeSection === 'creative-studio' ? 'active text-[#C084FC]' : ''} active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]/80 rounded px-2 transition-all duration-300`}
          onClick={() => handleNavClick('#creative-studio')}
          onMouseEnter={playHover}
        >
          Social
        </button>
        
        <button
          className={`header-nav-link ${activeSection === 'contact' ? 'active text-white' : ''} active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded px-2 transition-all duration-300`}
          onClick={() => handleNavClick('#contact')}
          onMouseEnter={playHover}
        >
          Contact
        </button>

        {/* Resume Link */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="header-nav-link text-neutral-400 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded px-2 transition-all duration-300"
          onMouseEnter={playHover}
        >
          Resume
        </a>

        {/* Theme Toggle */}
        <button
          className="header-toggle active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 rounded px-2 transition-all duration-300 cursor-pointer ml-4"
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
          className={`header-toggle ${soundOn ? 'sound-active-pulse text-white' : 'text-neutral-500'} active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/80 rounded px-2 transition-all duration-300 cursor-pointer`}
          onClick={toggleSound}
          onMouseEnter={playHover}
          aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
          suppressHydrationWarning
        >
          SOUND[{soundOn ? 'ON' : 'OFF'}]
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
        <div className="mobile-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
