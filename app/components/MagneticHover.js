'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticHover — Reusable modular component for magnetic hover interactions
 * Pulls any wrapped element toward the mouse cursor with smooth Framer Motion spring physics
 */
export default function MagneticHover({
  children,
  strength = 30, // max px distance to pull
  className = '',
  as = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: (distanceX / width) * strength,
      y: (distanceY / height) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 20,
        mass: 0.5,
      }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
