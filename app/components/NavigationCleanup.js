'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * NavigationCleanup — Prevents Next.js "removeChild on Node" unmount errors
 *
 * GSAP ScrollTrigger pin:true wraps elements in a <div class="pin-spacer">.
 * During client-side navigation in Next.js App Router (/ -> /tech -> /social),
 * React tries to unmount child nodes from their original <main> parent.
 *
 * By intercepting link clicks in the CAPTURE phase and calling st.kill(true),
 * we unwrap all pin-spacers synchronously BEFORE React starts unmounting the tree.
 */
export default function NavigationCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGlobalClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && (href.startsWith('/') || href.startsWith('#'))) {
        try {
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((st) => {
              st.kill(true);
            });
          }
        } catch (err) {
          console.warn('ScrollTrigger cleanup warning:', err);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
