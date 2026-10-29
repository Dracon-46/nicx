import { AnimatePresence, m } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Copy } from 'lucide-react';
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn, PAGE_HREF } from '../../site';
import { BUTTON_BASE, VARIANTS } from './primitives';

/** The Windows installer, always the newest release. */
export const WINDOWS_DOWNLOAD_URL =
  'https://github.com/Dracon-46/FalkyriaNicx/releases/latest/download/NicxSetup.exe';

/** One line in the Terminal installs the Nicx on a Mac. */
export const MAC_INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/Dracon-46/FalkyriaNicx/main/scripts/install/install.sh | bash';

/** The same command, also installing the Portuguese voices. */
export const MAC_INSTALL_COMMAND_VOICE = `${MAC_INSTALL_COMMAND} -s -- --voz`;

export const MAC_REQUIREMENTS =
  'macOS 14 (Sonoma) ou mais novo · Apple Silicon recomendado · 8 GB de RAM · sem senha de administrador';

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

/** A plain apple with a leaf, drawn as a glyph to stand for the Mac. */
export function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 4.7C6.9 3.9 5.6 3.7 4.5 4.2 2.8 5 2.3 7 2.7 8.9c.4 2.1 1.7 4.7 3.3 5.4.7.3 1.3 0 2-.2.7.2 1.3.5 2 .2 1.6-.7 2.9-3.3 3.3-5.4.4-1.9-.1-3.9-1.8-4.7C10.4 3.7 9.1 3.9 8 4.7Z" />
      <path d="M8.3 3.8c0-1.3.8-2.4 2.2-2.7.1 1.4-.8 2.5-2.2 2.7Z" />
    </svg>
  );
}

type Size = 'md' | 'lg';
const SIZE_LG = 'h-12 px-6 text-base';

/** "Baixar para Windows": downloads the newest NicxSetup.exe. */
export function DownloadButton({
  className,
  onHover,
  size = 'md',
}: {
  className?: string;
  onHover?: (on: boolean) => void;
  size?: Size;
}) {
  return (
    <a
      href={WINDOWS_DOWNLOAD_URL}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
      onFocus={() => onHover?.(true)}
      onBlur={() => onHover?.(false)}
      className={cn(BUTTON_BASE, VARIANTS.primary, size === 'lg' && SIZE_LG, className)}
    >
      <WindowsGlyph className="size-4 opacity-90" />
      Baixar para Windows
    </a>
  );
}

/** A shell command with a "Copiar" button; the result is announced to screen readers. */
export function CommandBox({ command, className }: { command: string; className?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'selected'>('idle');
  const codeRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: 'copied' | 'selected') => {
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2500);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      flash('copied');
    } catch {
      // No clipboard access: select the text so it can be copied by hand.
      const el = codeRef.current;
      const sel = window.getSelection();
      if (el && sel) sel.selectAllChildren(el);
      flash('selected');
    }
  };

  const copied = status === 'copied';
  return (
    <div className={cn('min-w-0', className)}>
      <div className="flex min-w-0 items-stretch overflow-hidden rounded-xl border border-line-strong bg-surface-2">
        <div
          role="region"
          aria-label="Comando para o Terminal"
          tabIndex={0}
          className="min-w-0 flex-1 overflow-x-auto px-4 py-3 focus-visible:-outline-offset-2"
        >
          <code ref={codeRef} className="font-mono text-[13px] leading-relaxed whitespace-pre text-ink">
            {command}
          </code>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Comando copiado' : 'Copiar comando'}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 border-l border-line-strong bg-surface px-3.5 text-[13.5px] font-medium transition-colors hover:bg-canvas focus-visible:-outline-offset-2',
            copied ? 'text-success' : 'text-ink',
          )}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" strokeWidth={2.5} />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Comando copiado.' : status === 'selected' ? 'Comando selecionado. Copie com Command C ou Ctrl C.' : ''}
      </span>
      {status === 'selected' && (
        <p className="mt-2 text-[13px] text-muted" aria-hidden="true">
          Comando selecionado. Copie com ⌘C ou Ctrl+C.
        </p>
      )}
    </div>
  );
}

/**
 * The download buttons side by side: Windows downloads the installer, Mac
 * opens a panel below with the Terminal command. Extra buttons go in `children`.
 */
export function DownloadActions({
  size = 'lg',
  align = 'center',
  onHover,
  children,
  className,
  style,
}: {
  size?: Size;
  align?: 'center' | 'start';
  onHover?: (on: boolean) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const centered = align === 'center';
  return (
    <div className={cn('flex w-full flex-col', centered ? 'items-center' : 'items-start', className)} style={style}>
      <div
        className={cn(
          'flex flex-col gap-3 sm:flex-row sm:flex-wrap',
          centered ? 'items-center justify-center' : 'items-start',
        )}
      >
        <DownloadButton size={size} onHover={onHover} />
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          onPointerEnter={() => onHover?.(true)}
          onPointerLeave={() => onHover?.(false)}
          onFocus={() => onHover?.(true)}
          onBlur={() => onHover?.(false)}
          className={cn(BUTTON_BASE, VARIANTS.secondary, size === 'lg' && SIZE_LG)}
        >
          <AppleGlyph className="size-4" />
          Instalar no Mac
          <ChevronDown
            className={cn('size-4 text-muted transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        {children}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            key="mac"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 w-full max-w-[600px] min-w-0 rounded-2xl border border-line bg-surface p-4 text-left shadow-card sm:p-5"
          >
            <p className="text-[14.5px] text-ink">
              <strong className="font-medium">No Mac:</strong>{' '}
              <span className="text-muted">abra o Terminal, cole o comando e aperte Enter.</span>
            </p>
            <CommandBox command={MAC_INSTALL_COMMAND} className="mt-3" />
            <p className="mt-3 text-[13px] leading-snug text-muted">{MAC_REQUIREMENTS}</p>
            <a
              href={`${PAGE_HREF.install}#no-mac`}
              className="group mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent"
            >
              Passo a passo no Mac
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
