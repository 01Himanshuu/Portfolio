'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * StatusBar — Fixed bottom bar with timezone, cursor coordinates, and globe icon
 * Replicates haoqi.design's bottom status bar exactly
 */
export default function StatusBar() {
  const [time, setTime] = useState('');
  const [coords, setCoords] = useState('0000 X 0000 Y');
  const coordsRef = useRef(null);

  // Timezone + Clock
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offset / 60));
      const sign = offset <= 0 ? '+' : '-';
      const gmtStr = `GMT${sign}${offsetHours}`;

      // Get region code from timezone
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Use country-like abbreviation from timezone
      const parts = tz.split('/');
      let region = 'IN'; // default
      if (parts.length > 0) {
        // Map common timezone regions to country codes
        const regionMap = {
          'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN',
          'America/New_York': 'US', 'America/Los_Angeles': 'US',
          'Europe/London': 'UK', 'Europe/Paris': 'FR',
          'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN',
          'Australia/Sydney': 'AU',
        };
        region = regionMap[tz] || parts[0].substring(0, 2).toUpperCase();
      }

      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');

      setTime(`${gmtStr} ${region} ${hours}:${mins}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor Coordinates
  useEffect(() => {
    const onMouseMove = (e) => {
      const x = String(Math.round(e.clientX)).padStart(4, '0');
      const y = String(Math.round(e.clientY)).padStart(4, '0');
      // Direct DOM update for performance (60fps mouse events)
      if (coordsRef.current) {
        coordsRef.current.textContent = `${x} X ${y} Y`;
      }
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      const x = String(Math.round(touch.clientX)).padStart(4, '0');
      const y = String(Math.round(touch.clientY)).padStart(4, '0');
      if (coordsRef.current) {
        coordsRef.current.textContent = `${x} X ${y} Y`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="status-bar" aria-hidden="true">
      {/* Timezone + Clock (left) */}
      <span className="status-timezone">{time}</span>

      {/* Cursor Coordinates (center) */}
      <span className="status-coords" ref={coordsRef}>
        {coords}
      </span>

      {/* Globe Icon (right) */}
      <div className="status-globe">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="9" cy="9" r="7.5" />
          <ellipse cx="9" cy="9" rx="3.5" ry="7.5" />
          <line x1="1.5" y1="9" x2="16.5" y2="9" />
        </svg>
      </div>
    </div>
  );
}
