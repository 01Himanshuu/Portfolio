'use client';

import React from 'react';
import {
  SectionContainer,
  MacWindow,
  Display,
  SectionTitle,
  ProjectTitle,
  Body,
  Meta,
  Label,
} from '../components/ds';

/**
 * Design System Showcase — /ds-preview
 *
 * Visual verification page for the new design system foundations.
 * Shows every token, component, and variant in one scrollable page.
 * This page exists for development only and can be removed later.
 */
export default function DSPreview() {
  return (
    <div style={{ background: 'var(--ds-bg-deep)', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── 1. SPACING & GRID ──────────────────────────────── */}
      <SectionContainer
        id="ds-grid"
        ariaLabel="Grid and Spacing System"
        background="var(--ds-bg-deep)"
      >
        <Label color="var(--ds-accent-lime)" style={{ marginBottom: '24px', display: 'block' }}>
          01 // DESIGN SYSTEM PREVIEW
        </Label>

        <Display color="var(--ds-fg-primary)">
          Design<br />System
        </Display>

        <Body style={{ maxWidth: '640px', marginTop: '32px' }}>
          Every section after Introduction uses these foundations.
          The invisible grid provides consistent max-width ({`1360px`}),
          responsive padding ({`clamp(24px, 5vw, 96px)`}),
          and generous whitespace between all elements.
        </Body>

        {/* Visual grid ruler */}
        <div style={{
          marginTop: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '8px',
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '48px',
                background: 'var(--ds-bg-elevated)',
                borderRadius: '4px',
                border: '1px solid var(--ds-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Label color="var(--ds-fg-faint)">{i + 1}</Label>
            </div>
          ))}
        </div>

        <Meta style={{ marginTop: '16px' }}>
          12-column invisible grid · gap: 8px · container padding: clamp(24px, 5vw, 96px)
        </Meta>
      </SectionContainer>

      {/* ── 2. TYPOGRAPHY SCALE ─────────────────────────────── */}
      <SectionContainer
        id="ds-type"
        ariaLabel="Typography Scale"
        background="var(--ds-bg-surface)"
      >
        <Label color="var(--ds-accent-eng)" style={{ marginBottom: '40px', display: 'block' }}>
          02 // TYPOGRAPHY
        </Label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-gap-lg)' }}>
          <div>
            <Label color="var(--ds-fg-faint)">Display — scene titles</Label>
            <Display color="var(--ds-fg-primary)" style={{ marginTop: '8px' }}>
              BUILD
            </Display>
          </div>

          <div>
            <Label color="var(--ds-fg-faint)">Section Title — sub-headings</Label>
            <SectionTitle color="var(--ds-fg-primary)" style={{ marginTop: '8px' }}>
              Software Engineering
            </SectionTitle>
          </div>

          <div>
            <Label color="var(--ds-fg-faint)">Project Title — names</Label>
            <ProjectTitle color="var(--ds-fg-primary)" style={{ marginTop: '8px' }}>
              AI Research Platform — Next.js + Python
            </ProjectTitle>
          </div>

          <div>
            <Label color="var(--ds-fg-faint)">Body — reading</Label>
            <Body style={{ marginTop: '8px', maxWidth: '600px' }}>
              I design and engineer distributed architectures, high-performance web applications,
              and AI-driven pipelines. Every system I build prioritizes clarity, resilience, and
              developer experience.
            </Body>
          </div>

          <div>
            <Label color="var(--ds-fg-faint)">Meta — secondary info</Label>
            <Meta style={{ marginTop: '8px' }}>
              Next.js · TypeScript · PostgreSQL · AWS · 2024–2025
            </Meta>
          </div>

          <div>
            <Label color="var(--ds-fg-faint)">Label — technical markers</Label>
            <div style={{ marginTop: '8px', display: 'flex', gap: '24px' }}>
              <Label color="var(--ds-accent-eng)">03 // ENGINEERING</Label>
              <Label color="var(--ds-accent-cre)">04 // CREATIVE</Label>
              <Label color="var(--ds-fg-muted)">PORT:3000 ONLINE</Label>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ── 3. COLOR PALETTE ───────────────────────────────── */}
      <SectionContainer
        id="ds-color"
        ariaLabel="Color Palette"
        background="var(--ds-bg-deep)"
      >
        <Label color="var(--ds-accent-cre)" style={{ marginBottom: '40px', display: 'block' }}>
          03 // COLOR
        </Label>

        <SectionTitle color="var(--ds-fg-primary)" style={{ marginBottom: '32px' }}>
          Restrained Palette
        </SectionTitle>

        {/* Background scale */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { name: 'bg-deep', var: '--ds-bg-deep' },
            { name: 'bg-surface', var: '--ds-bg-surface' },
            { name: 'bg-elevated', var: '--ds-bg-elevated' },
            { name: 'bg-subtle', var: '--ds-bg-subtle' },
          ].map((c) => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '8px',
                background: `var(${c.var})`,
                border: '1px solid var(--ds-border-default)',
              }} />
              <Label color="var(--ds-fg-faint)">{c.name}</Label>
            </div>
          ))}
        </div>

        {/* Foreground scale */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { name: 'fg-primary', var: '--ds-fg-primary' },
            { name: 'fg-secondary', var: '--ds-fg-secondary' },
            { name: 'fg-muted', var: '--ds-fg-muted' },
            { name: 'fg-faint', var: '--ds-fg-faint' },
          ].map((c) => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '8px',
                background: `var(${c.var})`,
                border: '1px solid var(--ds-border-default)',
              }} />
              <Label color="var(--ds-fg-faint)">{c.name}</Label>
            </div>
          ))}
        </div>

        {/* Accents */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { name: 'Engineering', var: '--ds-accent-eng' },
            { name: 'Creative', var: '--ds-accent-cre' },
            { name: 'Convergence', var: '--ds-accent-warm' },
            { name: 'Interaction', var: '--ds-accent-lime' },
          ].map((c) => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '8px',
                background: `var(${c.var})`,
                border: '1px solid var(--ds-border-default)',
              }} />
              <Label color="var(--ds-fg-faint)">{c.name}</Label>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── 4. WINDOW SYSTEM ──────────────────────────────── */}
      <SectionContainer
        id="ds-windows"
        ariaLabel="Window System"
        background="var(--ds-bg-surface)"
      >
        <Label color="var(--ds-accent-eng)" style={{ marginBottom: '40px', display: 'block' }}>
          04 // WINDOW SYSTEM
        </Label>

        <SectionTitle color="var(--ds-fg-primary)" style={{ marginBottom: '40px' }}>
          Authentic macOS Windows
        </SectionTitle>

        {/* Windows with gap between them */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-window-gap)',
        }}>
          {/* Default window */}
          <MacWindow title="himanshu@ws-01: ~/portfolio — zsh" variant="eng" depth="default">
            <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.82rem', color: 'var(--ds-fg-secondary)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--ds-accent-eng)' }}>himanshu@ws-01</span>
                <span style={{ color: 'var(--ds-fg-muted)' }}>~/portfolio</span>
                <span style={{ color: '#C084FC' }}>$</span>
                <span style={{ color: 'var(--ds-fg-primary)' }}>npm run build</span>
              </div>
              <div style={{ color: '#27C93F', marginBottom: '4px' }}>✓ Compiled successfully</div>
              <div style={{ color: 'var(--ds-fg-muted)' }}>Route (app)          Size     First Load</div>
              <div>┌ ○ /                 12.4 kB   89.2 kB</div>
              <div>├ ○ /tech             8.1 kB    85.0 kB</div>
              <div>└ ○ /social           7.8 kB    84.6 kB</div>
            </div>
          </MacWindow>

          {/* Creative variant */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-window-gap)' }}>
            <MacWindow title="project.config.ts" variant="eng" depth="shallow" size="full">
              <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.78rem', color: 'var(--ds-fg-secondary)' }}>
                <div><span style={{ color: '#C084FC' }}>const</span> <span style={{ color: 'var(--ds-accent-eng)' }}>config</span> = {'{'}</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--ds-fg-muted)' }}>name:</span> <span style={{ color: '#27C93F' }}>&quot;Portfolio&quot;</span>,</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--ds-fg-muted)' }}>framework:</span> <span style={{ color: '#27C93F' }}>&quot;Next.js 16&quot;</span>,</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: 'var(--ds-fg-muted)' }}>status:</span> <span style={{ color: 'var(--ds-accent-eng)' }}>&quot;BUILDING&quot;</span></div>
                <div>{'}'}</div>
              </div>
            </MacWindow>

            <MacWindow title="timeline.pproj" variant="cre" depth="shallow" size="full">
              <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.78rem', color: 'var(--ds-fg-secondary)' }}>
                <div style={{ color: 'var(--ds-accent-cre)' }}>▸ V1 — Brand Film</div>
                <div style={{ color: 'var(--ds-fg-muted)', paddingLeft: '16px' }}>Premiere Pro · 4K · 24fps</div>
                <div style={{ color: 'var(--ds-accent-cre)', marginTop: '8px' }}>▸ A1 — Ambient Score</div>
                <div style={{ color: 'var(--ds-fg-muted)', paddingLeft: '16px' }}>After Effects · DCI-P3</div>
              </div>
            </MacWindow>
          </div>

          {/* Deep shadow variant */}
          <MacWindow title="system_overview" variant="default" depth="deep">
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <Meta>Deep shadow variant — for hero-level moments</Meta>
            </div>
          </MacWindow>
        </div>
      </SectionContainer>

      {/* ── 5. SPACING DEMONSTRATION ──────────────────────── */}
      <SectionContainer
        id="ds-spacing"
        ariaLabel="Spacing System"
        background="var(--ds-bg-deep)"
      >
        <Label color="var(--ds-accent-warm)" style={{ marginBottom: '40px', display: 'block' }}>
          05 // SPACING
        </Label>

        <SectionTitle color="var(--ds-fg-primary)" style={{ marginBottom: '32px' }}>
          Consistent Breathing Room
        </SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: '--ds-gap-xs', label: 'XS Gap' },
            { name: '--ds-gap-sm', label: 'SM Gap' },
            { name: '--ds-gap-md', label: 'MD Gap' },
            { name: '--ds-grid-gap', label: 'Grid Gap' },
            { name: '--ds-window-gap', label: 'Window Gap' },
            { name: '--ds-gap-lg', label: 'LG Gap' },
            { name: '--ds-section-gap', label: 'Section Gap' },
          ].map((s) => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Label color="var(--ds-fg-muted)" style={{ width: '140px', flexShrink: 0 }}>{s.label}</Label>
              <div style={{
                height: '24px',
                width: `var(${s.name})`,
                background: 'var(--ds-accent-eng-muted)',
                borderRadius: '4px',
                border: '1px solid var(--ds-accent-eng-border)',
                minWidth: '8px',
                maxWidth: '100%',
              }} />
              <Label color="var(--ds-fg-faint)">{s.name}</Label>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── 6. MOTION TOKENS ──────────────────────────────── */}
      <SectionContainer
        id="ds-motion"
        ariaLabel="Motion System"
        background="var(--ds-bg-surface)"
      >
        <Label color="var(--ds-accent-lime)" style={{ marginBottom: '40px', display: 'block' }}>
          06 // MOTION
        </Label>

        <SectionTitle color="var(--ds-fg-primary)" style={{ marginBottom: '32px' }}>
          Easing & Timing
        </SectionTitle>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--ds-grid-gap)',
        }}>
          {[
            { name: 'Standard', desc: 'General UI', css: 'var(--ds-ease-standard)', dur: '300ms' },
            { name: 'Dramatic', desc: 'Scroll reveals', css: 'var(--ds-ease-dramatic)', dur: '1000ms' },
            { name: 'Micro', desc: 'Hover states', css: 'var(--ds-ease-micro)', dur: '150ms' },
          ].map((m) => (
            <div
              key={m.name}
              style={{
                padding: 'var(--ds-content-padding)',
                background: 'var(--ds-bg-elevated)',
                borderRadius: '8px',
                border: '1px solid var(--ds-border-subtle)',
              }}
            >
              <ProjectTitle color="var(--ds-fg-primary)">{m.name}</ProjectTitle>
              <Meta style={{ marginTop: '8px' }}>{m.desc}</Meta>
              <Label color="var(--ds-fg-faint)" style={{ display: 'block', marginTop: '12px' }}>
                {m.dur}
              </Label>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── 7. FULL HEIGHT SECTION DEMO ───────────────────── */}
      <SectionContainer
        id="ds-fullheight"
        fullHeight
        ariaLabel="Full Height Demo"
        background="var(--ds-bg-deep)"
      >
        <div style={{ textAlign: 'center' }}>
          <Label color="var(--ds-fg-muted)" style={{ display: 'block', marginBottom: '24px' }}>
            07 // FULL HEIGHT SECTION
          </Label>
          <Display color="var(--ds-fg-primary)">
            Scene<br />Opening
          </Display>
          <Body style={{ maxWidth: '480px', margin: '32px auto 0', textAlign: 'center' }}>
            Full-height sections center content vertically.
            Used for dramatic scene-opening moments.
          </Body>
        </div>
      </SectionContainer>
    </div>
  );
}
