import { m } from 'motion/react';
import { useId, useRef, useState, type ComponentProps, type PointerEvent, type ReactNode } from 'react';
import { cn } from '../../site';

const BUTTON_BASE =
  'group/btn relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,box-shadow,color,transform] duration-200 ease-out active:scale-[0.98]';

const VARIANTS = {
  primary:
    'bg-ink text-canvas shadow-[0_1px_0_0_rgb(255_255_255/0.18)_inset,0_10px_24px_-12px_rgb(0_0_0/0.55)] hover:bg-[color-mix(in_oklab,var(--ink)_86%,var(--canvas))]',
  secondary:
    'bg-surface text-ink border border-line-strong shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:bg-surface-2',
  ghost: 'text-ink hover:bg-surface-2',
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

export function ButtonLink({
  variant = 'primary',
  className,
  ...rest
}: ComponentProps<'a'> & { variant?: ButtonVariant }) {
  return <a className={cn(BUTTON_BASE, VARIANTS[variant], className)} {...rest} />;
}

/** The four-pane Windows mark, drawn as a plain glyph. */
export function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="currentColor">
      <rect x="1" y="1" width="6.5" height="6.5" rx="0.6" />
      <rect x="8.5" y="1" width="6.5" height="6.5" rx="0.6" />
      <rect x="1" y="8.5" width="6.5" height="6.5" rx="0.6" />
      <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="0.6" />
    </svg>
  );
}

export function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center rounded-full bg-amber px-2 text-[11px] font-semibold tracking-[0.01em] text-[#1f1500]',
        className,
      )}
    >
      Em breve
    </span>
  );
}

/**
 * "Baixar para Windows": shown, but not available yet. Stays focusable so
 * keyboard and screen reader users get the explanation too.
 */
export function DownloadButton({
  className,
  onHover,
  size = 'md',
}: {
  className?: string;
  onHover?: (on: boolean) => void;
  size?: 'md' | 'lg';
}) {
  const [tip, setTip] = useState(false);
  const tipId = useId();
  const show = (on: boolean) => {
    setTip(on);
    onHover?.(on);
  };
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-disabled="true"
        aria-describedby={tipId}
        onClick={(e) => e.preventDefault()}
        onPointerEnter={() => show(true)}
        onPointerLeave={() => show(false)}
        onFocus={() => show(true)}
        onBlur={() => show(false)}
        className={cn(
          BUTTON_BASE,
          VARIANTS.primary,
          'cursor-not-allowed pr-2.5 hover:bg-ink active:scale-100',
          size === 'lg' && 'h-12 pl-6 text-base',
          className,
        )}
      >
        <WindowsGlyph className="size-4 opacity-90" />
        Baixar para Windows
        <SoonBadge className="ml-1" />
      </button>
      <span
        id={tipId}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute top-full left-1/2 z-20 mt-2.5 w-max max-w-[240px] -translate-x-1/2 rounded-lg border border-line bg-surface px-3 py-2 text-center text-[13px] leading-snug text-muted shadow-float transition-[opacity,transform] duration-200',
          tip ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
        )}
      >
        O instalador para Windows ainda não foi lançado. Ele chega em breve.
      </span>
    </span>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const Tag = as === 'li' ? m.li : m.div;
  return (
    <Tag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.01em] text-muted',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'left';
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl items-start',
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="text-gradient text-[34px] leading-[1.06] font-semibold tracking-[-0.038em] text-balance sm:text-[44px] lg:text-[52px]"
      >
        {title}
      </h2>
      {lead && (
        <p className="max-w-2xl text-[17px] leading-relaxed text-pretty text-muted sm:text-lg">{lead}</p>
      )}
    </Reveal>
  );
}

/** A card with a soft light and a lit border that follow the pointer. */
export function SpotlightCard({ className, children, ...rest }: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={cn('card spotlight', className)} {...rest}>
      {children}
    </div>
  );
}

export function AmberDot({ className }: { className?: string }) {
  return <span className={cn('text-amber', className)}>.</span>;
}
