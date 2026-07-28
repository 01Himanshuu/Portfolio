'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FloatingSpringSVG — Reusable decorative SVG with cinematic spring motion
 * Features continuous floating animation, magnetic hover scale, and click spring impulse
 */
export default function FloatingSpringSVG({
  type = 'star', // 'star' | 'cube' | 'crosshair' | 'compass' | 'diamond'
  size = 64,
  color = '#6366f1',
  style = {},
  className = '',
  delay = 0,
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  // SVG paths for decorative shapes
  const renderIcon = () => {
    switch (type) {
      case 'star':
        return (
          <path
            d="M32 0L39 25L64 32L39 39L32 64L25 39L0 32L25 25Z"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        );
      case 'cube':
        return (
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round">
            <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" />
            <path d="M32 4V32M32 32L56 18M32 32L8 18M32 60V32" />
          </g>
        );
      case 'crosshair':
        return (
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
            <circle cx="32" cy="32" r="20" strokeDasharray="6 6" />
            <path d="M32 4V16M32 48V60M4 32H16M48 32H60" />
            <circle cx="32" cy="32" r="4" fill={color} />
          </g>
        );
      case 'compass':
        return (
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round">
            <circle cx="32" cy="32" r="26" />
            <path d="M32 12L40 28L48 32L40 36L32 52L24 36L16 32L24 28Z" />
          </g>
        );
      case 'diamond':
      default:
        return (
          <path
            d="M32 4L60 32L32 60L4 32Z"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        );
    }
  };

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        zIndex: 15,
        cursor: 'pointer',
        ...style,
      }}
      className={`floating-spring-svg ${className}`}
      onClick={handleClick}
      initial={{ y: 0, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -14, 0],
        rotate: [0, 8, -8, 0],
        scale: clicked ? [1, 1.35, 0.9, 1] : 1,
      }}
      transition={{
        y: {
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        scale: {
          duration: 0.55,
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        scale: 1.18,
        rotate: 15,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      }}
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {renderIcon()}
      </svg>
    </motion.div>
  );
}
