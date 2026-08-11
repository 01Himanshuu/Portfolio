'use client';

import React, { forwardRef } from 'react';

/**
 * EditorialHeading — Design System Typography Components
 *
 * Provides the full type hierarchy as composable primitives:
 *   <Display>    — massive scene titles, reserved for opening moments
 *   <SectionTitle> — sub-scene headings
 *   <ProjectTitle> — project names, card titles
 *   <Body>       — comfortable reading paragraphs
 *   <Meta>       — secondary descriptions
 *   <Label>      — mono technical markers, chapter numbers
 *
 * All support: as (tag), className, color, children, ref forwarding
 */

// ─── Display ──────────────────────────────────────────────────────
export const Display = forwardRef(function Display(
  { as: Tag = 'h2', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-display ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});

// ─── SectionTitle ──────────────────────────────────────────────────
export const SectionTitle = forwardRef(function SectionTitle(
  { as: Tag = 'h3', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-section-title ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});

// ─── ProjectTitle ──────────────────────────────────────────────────
export const ProjectTitle = forwardRef(function ProjectTitle(
  { as: Tag = 'h4', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-project-title ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});

// ─── Body ─────────────────────────────────────────────────────────
export const Body = forwardRef(function Body(
  { as: Tag = 'p', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-body ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});

// ─── Meta ─────────────────────────────────────────────────────────
export const Meta = forwardRef(function Meta(
  { as: Tag = 'p', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-meta ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});

// ─── Label ────────────────────────────────────────────────────────
export const Label = forwardRef(function Label(
  { as: Tag = 'span', className = '', color, style, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`ds-label ${className}`}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});
