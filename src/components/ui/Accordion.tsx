import { AnimatePresence, m } from 'motion/react';
import { Plus } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../site';

export interface AccordionItem {
  q: string;
  a: ReactNode;
}

/** Questions and answers; one open at a time, keyboard and screen reader friendly. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className={cn('card divide-y divide-line overflow-hidden', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 px-5 py-5 text-left text-[16px] font-medium tracking-[-0.01em] text-ink transition-colors hover:bg-surface-2/60 focus-visible:-outline-offset-2 sm:px-7 sm:text-[17px]"
              >
                <span className="flex-1">{item.q}</span>
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-[transform,background-color,color] duration-300',
                    isOpen && 'rotate-45 border-transparent bg-ink text-canvas',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl px-5 pb-6 text-[15.5px] leading-relaxed text-muted sm:px-7 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-[3px] [&_strong]:font-medium [&_strong]:text-ink">
                    {item.a}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
