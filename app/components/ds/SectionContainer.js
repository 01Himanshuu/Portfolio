'use client';

import React from 'react';

/**
 * SectionContainer — Design System Section + Container
 *
 * Every post-Introduction section uses this structure:
 *
 *   <section class="ds-section">
 *     <div class="ds-container">
 *       {children}
 *     </div>
 *   </section>
 *
 * Props:
 *   id           — section HTML id (for scroll anchors)
 *   className    — extra classes on the <section>
 *   containerClassName — extra classes on the inner container
 *   fullHeight   — if true, section is min-height: 100vh
 *   background   — optional inline background style override
 *   ariaLabel    — accessible label for the section
 *   as           — semantic element tag (default: 'section')
 *   children     — content
 */
export default function SectionContainer({
  id,
  className = '',
  containerClassName = '',
  fullHeight = false,
  background,
  ariaLabel,
  as: Tag = 'section',
  children,
  ...props
}) {
  const sectionClasses = [
    'ds-section',
    fullHeight ? 'ds-section--full-height' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      id={id}
      className={sectionClasses}
      style={background ? { background } : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      <div className={`ds-container ${containerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
