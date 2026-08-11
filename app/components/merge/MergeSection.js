'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * MergeSection — "WHERE CODE MEETS CREATIVITY"
 *
 * The emotional climax. Typography-driven. Minimal. Powerful.
 * No morphing visualizers, no dashboard panels, no fake reactors.
 */
export default function MergeSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const manifestoRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Word-by-word title reveal
      const words = titleRef.current?.querySelectorAll('.merge-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, y: 50 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }

      // Manifesto text reveal
      if (manifestoRef.current) {
        const lines = manifestoRef.current.querySelectorAll('.merge-line');
        gsap.set(lines, { opacity: 0, y: 20 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Divider line grow
      const divider = sectionRef.current?.querySelector('.merge-divider-line');
      if (divider) {
        gsap.set(divider, { scaleX: 0 });
        gsap.to(divider, {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const TITLE_WORDS = ['WHERE', 'CODE', 'MEETS', 'CREATIVITY'];

  return (
    <section
      id="merge"
      ref={sectionRef}
      className="ds-section ds-section--full-height"
      style={{
        background: 'var(--ds-bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      aria-label="Where code meets creativity"
    >
      <div className="ds-container" style={{ textAlign: 'center' }}>
        {/* Label */}
        <span
          className="ds-label"
          style={{
            color: 'var(--ds-fg-faint)',
            display: 'block',
            marginBottom: 'var(--ds-gap-lg)',
          }}
        >
          04 // The Synthesis
        </span>

        {/* Display title */}
        <div ref={titleRef} style={{ marginBottom: 'var(--ds-gap-lg)' }}>
          <h2 className="ds-display" style={{ color: 'var(--ds-fg-primary)' }}>
            {TITLE_WORDS.map((word, i) => (
              <span
                key={i}
                className="merge-word"
                style={{
                  display: 'inline-block',
                  marginRight: '0.3em',
                  color: word === 'CODE'
                    ? 'var(--ds-accent-eng)'
                    : word === 'CREATIVITY'
                      ? 'var(--ds-accent-cre)'
                      : 'var(--ds-fg-primary)',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Visual divider — the convergence line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: 'var(--ds-gap-lg)',
          }}
        >
          <div
            className="merge-divider-line"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--ds-accent-eng))',
              transformOrigin: 'right center',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--ds-accent-warm)',
              boxShadow: '0 0 20px rgba(245, 230, 211, 0.3)',
              flexShrink: 0,
            }}
          />
          <div
            className="merge-divider-line"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(90deg, var(--ds-accent-cre), transparent)',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Manifesto */}
        <div
          ref={manifestoRef}
          style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          <p
            className="ds-body merge-line"
            style={{
              color: 'var(--ds-fg-secondary)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              lineHeight: 1.8,
              marginBottom: 'var(--ds-gap-md)',
            }}
          >
            Not two separate careers. One unified vision.
          </p>
          <p
            className="ds-body merge-line"
            style={{
              color: 'var(--ds-fg-muted)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
              lineHeight: 1.8,
              marginBottom: 'var(--ds-gap-sm)',
            }}
          >
            I build systems that tell stories.
          </p>
          <p
            className="ds-body merge-line"
            style={{
              color: 'var(--ds-fg-muted)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
              lineHeight: 1.8,
            }}
          >
            I tell stories that build systems.
          </p>
        </div>
      </div>
    </section>
  );
}
