import { m } from 'motion/react';
import { useRef, type ComponentProps, type PointerEvent, type ReactNode } from 'react';
import { cn } from '../../site';

export const BUTTON_BASE =
  'group/btn relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,box-shadow,color,transform] duration-200 ease-out active:scale-[0.98]';

export const VARIANTS = {
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
