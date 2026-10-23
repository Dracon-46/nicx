import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { Eyebrow } from '../components/ui/primitives';
import { cn, PAGE_HREF, type PageId } from '../site';

interface LegalDoc {
  title: string;
  version: string;
  html: string;
  headings: { id: string; text: string }[];
}

/** "Versão 2026-10-23" → "23 de outubro de 2026". */
function longDate(version: string): string {
  const m = /(\d{4})-(\d{2})-(\d{2})/.exec(version);
  if (!m) return version;
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${Number(m[3])} de ${months[Number(m[2]) - 1]} de ${m[1]}`;
}

/** The section heading currently near the top of the viewport. */
function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');
  useEffect(() => {
    const els = key.split('|').map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
  return active;
}

export function LegalPage({ page, doc, lead }: { page: Extract<PageId, 'privacy' | 'terms'>; doc: LegalDoc; lead: string }) {
  const active = useActiveHeading(doc.headings.map((h) => h.id));
  const other =
    page === 'privacy'
      ? { href: PAGE_HREF.terms, label: 'Termos de uso', icon: <FileText className="size-4" /> }
      : { href: PAGE_HREF.privacy, label: 'Política de privacidade', icon: <ShieldCheck className="size-4" /> };

  return (
    <Shell page={page}>
      <div className="container-site">
        <header className="max-w-3xl pt-14 pb-12 sm:pt-20 sm:pb-16">
          <Eyebrow className="rise">Legal</Eyebrow>
          <h1
            className="rise text-gradient mt-4 text-[40px] leading-[1.04] font-semibold tracking-[-0.042em] text-balance sm:text-[56px]"
            style={{ animationDelay: '80ms' }}
          >
            {doc.title}
          </h1>
          <p className="rise mt-5 text-[17px] leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '160ms' }}>
            {lead}
          </p>
          <p className="rise mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted" style={{ animationDelay: '220ms' }}>
            <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
            Versão de {longDate(doc.version)}
          </p>
        </header>

        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="Nesta página" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[13px] font-medium text-ink">Nesta página</p>
              <ul className="mt-4 flex flex-col gap-2.5 border-l border-line">
                {doc.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      aria-current={active === h.id ? 'location' : undefined}
                      className={cn(
                        '-ml-px block border-l pl-4 text-[13.5px] leading-snug transition-colors hover:border-ink hover:text-ink',
                        active === h.id ? 'border-ink font-medium text-ink' : 'border-transparent text-muted',
                      )}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="min-w-0 max-w-[720px]">
            <article className="prose-legal" dangerouslySetInnerHTML={{ __html: doc.html }} />
            <a
              href={other.href}
              className="group mt-16 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">{other.icon}</span>
              <span className="flex-1">
                <span className="block text-[13px] text-muted">Leia também</span>
                <span className="block text-[16px] font-medium text-ink">{other.label}</span>
              </span>
              <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Shell>
  );
}
