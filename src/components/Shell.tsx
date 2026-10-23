import { LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { useSmoothScroll } from '../lib/smooth-scroll';
import type { PageId } from '../site';
import { Footer } from './Footer';
import { Header } from './Header';

// Animation features load in their own chunk, after the page is on screen.
const loadMotionFeatures = () => import('../lib/motion-features').then((m) => m.default);

/** Page frame shared by every route: skip link, header, main, footer. */
export function Shell({ page, children }: { page: PageId; children: ReactNode }) {
  useSmoothScroll();
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header page={page} />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer page={page} />
      </MotionConfig>
    </LazyMotion>
  );
}
