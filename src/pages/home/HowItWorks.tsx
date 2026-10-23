import { Cpu, CloudOff, Info, Laptop, Lock, User, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { Reveal, SectionHeader } from '../../components/ui/primitives';
import { cn } from '../../site';

function Node({
  visual,
  title,
  text,
  highlight,
}: {
  visual: ReactNode;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'card relative flex h-full w-full items-center gap-4 p-4 text-left md:flex-col md:gap-0 md:px-5 md:pt-6 md:pb-5 md:text-center',
        highlight && 'shadow-float ring-1 ring-cyan/30',
      )}
    >
      <div className="grid size-14 shrink-0 place-items-center md:h-[76px] md:w-auto">{visual}</div>
      <div>
        <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink md:mt-3">{title}</p>
        <p className="mt-1 text-[14px] leading-snug text-muted">{text}</p>
      </div>
    </div>
  );
}

/** A hairline with packets running along it: requests go one way, answers come back. */
function Connector() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-8 w-px self-center md:h-px md:w-full md:min-w-14">
      <div className="absolute inset-0 bg-line-strong" />
      <span className="packet absolute inset-0">
        <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_10px_2px_var(--cyan)] md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2" />
      </span>
      <span className="packet packet--back absolute inset-0">
        <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_1px_var(--accent)] md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2" />
      </span>
    </div>
  );
}

const STEPS = [
  {
    n: '01',
    title: 'Você pede',
    text: 'Digite ou simplesmente fale. A sua voz vira texto ali mesmo, no seu computador.',
  },
  {
    n: '02',
    title: 'O Nicx prepara',
    text: 'Ele consulta a memória e os seus documentos e, se precisar de uma ferramenta, pede a sua permissão antes.',
  },
  {
    n: '03',
    title: 'A IA responde',
    text: 'O modelo de IA roda no processador do seu PC, e a resposta chega em texto ou em voz alta.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="container-site pt-28 sm:pt-36" aria-labelledby="como-funciona-titulo">
      <SectionHeader
        id="como-funciona-titulo"
        eyebrow="Como funciona"
        title="Tudo acontece dentro do seu computador."
        lead="Sem servidor no meio do caminho. Você fala, o Nicx entende e um modelo de IA responde ali mesmo, no seu PC."
      />

      <Reveal className="mt-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_200px]">
          <div className="relative rounded-[28px] border-2 border-dashed border-line-strong bg-[radial-gradient(ellipse_at_50%_40%,var(--cyan-soft),transparent_70%)] px-4 pt-12 pb-14 sm:px-8 lg:px-10">
            <p className="absolute -top-[15px] left-5 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1 text-[13px] font-medium text-ink sm:left-8">
              <Laptop className="size-4 text-muted" aria-hidden="true" />
              Seu computador
            </p>
            <div className="grid md:grid-cols-[1fr_minmax(56px,0.45fr)_1fr_minmax(56px,0.45fr)_1fr]">
              <Node
                visual={
                  <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface-2 text-ink">
                    <User className="size-6" />
                  </span>
                }
                title="Você"
                text="digita ou fala"
              />
              <Connector />
              <Node
                highlight
                visual={<NicxMascot size={84} mood="idle" decorative className="size-16 md:-mt-2 md:size-[84px]" />}
                title="Nicx"
                text="entende, lembra e pede permissão"
              />
              <Connector />
              <Node
                visual={
                  <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface-2 text-ink">
                    <Cpu className="size-6" />
                  </span>
                }
                title="Modelo de IA local"
                text="pensa no processador, via Ollama"
              />
            </div>
            <p className="absolute -bottom-[17px] left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-[13.5px] font-medium whitespace-nowrap text-canvas shadow-float">
              <Lock className="size-3.5 text-amber" aria-hidden="true" />
              Nada sai do seu PC
            </p>
          </div>

          <div className="relative mt-14 flex items-center gap-4 rounded-[28px] border border-line bg-surface-2/40 p-6 lg:mt-0 lg:flex-col lg:justify-center lg:text-center">
            <span
              aria-hidden="true"
              className="absolute -top-[22px] left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-line bg-canvas text-subtle lg:top-1/2 lg:-left-[26px] lg:-translate-y-1/2 lg:translate-x-0"
            >
              <X className="size-4" strokeWidth={2.25} />
            </span>
            <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-subtle">
              <CloudOff className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[16px] font-semibold text-ink">Nuvem</p>
              <p className="mt-1 text-[14px] leading-snug text-muted">
                Fica de fora. Suas conversas não passam por servidor nenhum.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="border-t border-line pt-6">
            <p className="font-mono text-[13px] text-subtle">{s.n}</p>
            <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.015em] text-ink">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <p className="flex items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4 text-[14.5px] leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="font-medium text-ink">E a internet?</strong> Só é usada quando você pede algo que
            depende dela, como uma busca na web. Como toda ferramenta, ela só roda com a sua permissão.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
