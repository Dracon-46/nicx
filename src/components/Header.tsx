import { AnimatePresence, m } from 'motion/react';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NicxMascot } from './Mascot/NicxMascot';
import { cn, HOME_SECTIONS, PAGE_HREF, sectionHref, type PageId } from '../site';

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href={PAGE_HREF.home}
      className={cn('flex items-center gap-2 rounded-lg', className)}
      aria-label="Nicx, página inicial"
    >
      <NicxMascot size={30} mood="idle" animated={false} decorative />
      <span className="text-[18px] font-semibold tracking-[-0.03em] text-ink">
        Nicx<span className="text-amber">.</span>
      </span>
    </a>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    setDark(root.classList.contains('dark'));
    // Follow the system until the visitor picks a theme here.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystem = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('nicx-theme');
      } catch {
        /* storage blocked */
      }
      if (stored) return;
      apply(media.matches);
    };
    media.addEventListener('change', onSystem);
    return () => media.removeEventListener('change', onSystem);
  }, []);

  function apply(next: boolean) {
    const root = document.documentElement;
    root.classList.toggle('dark', next);
    root.classList.toggle('light', !next);
    setDark(next);
  }

  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    apply(next);
    try {
      localStorage.setItem('nicx-theme', next ? 'dark' : 'light');
    } catch {
      /* storage blocked: the choice lasts for this page only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label="Tema escuro"
      title={dark ? 'Usar tema claro' : 'Usar tema escuro'}
      className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <Sun className="size-[18px] scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[18px] scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}

export function Header({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links: { href: string; label: string; current: boolean }[] = HOME_SECTIONS.map((s) => ({
    href: sectionHref(page, s.id),
    label: s.label,
    current: false,
  }));
  links.push({ href: PAGE_HREF.install, label: 'Instalação', current: page === 'install' });

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'border-b transition-[border-color,background-color] duration-300',
          scrolled || open
            ? 'border-line bg-[var(--header-bg)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent [html:not(.js)_&]:border-line [html:not(.js)_&]:bg-canvas',
        )}
      >
        <nav className="container-site flex h-16 items-center gap-6" aria-label="Principal">
          <Logo className="-ml-1 px-1 py-1" />
          <ul className="ml-4 hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={l.current ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-[14px] transition-colors hover:text-ink',
                    l.current ? 'font-medium text-ink' : 'text-muted',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href={PAGE_HREF.install}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-medium text-canvas transition-colors hover:bg-[color-mix(in_oklab,var(--ink)_86%,var(--canvas))] sm:inline-flex"
            >
              Como instalar
              <ArrowRight className="size-3.5" />
            </a>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full text-ink hover:bg-surface-2 md:hidden"
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <m.div
              id="menu-movel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="container-site flex flex-col pt-1 pb-5">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={l.current ? 'page' : undefined}
                      className="flex items-center justify-between border-b border-line py-3.5 text-[17px] font-medium text-ink"
                    >
                      {l.label}
                      <ArrowRight className="size-4 text-subtle" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
