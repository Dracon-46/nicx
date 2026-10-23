import { useEffect } from 'react';
import type Lenis from 'lenis';

let instance: Lenis | null = null;

/** The running Lenis instance, if smooth scrolling is on. */
export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth wheel scrolling with Lenis. It only matters for mouse wheels, so it
 * is loaded on the first wheel event (never during page load), and skipped on
 * touch screens and when the visitor prefers reduced motion.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let cancelled = false;
    const start = () => {
      window.removeEventListener('wheel', start);
      import('lenis').then(({ default: LenisCtor }) => {
        if (cancelled || instance) return;
        instance = new LenisCtor({
          autoRaf: true,
          lerp: 0.11,
          anchors: { offset: -80 },
          stopInertiaOnNavigate: true,
        });
      });
    };
    window.addEventListener('wheel', start, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener('wheel', start);
      instance?.destroy();
      instance = null;
    };
  }, []);
}
