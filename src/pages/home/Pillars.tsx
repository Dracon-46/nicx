import { animate, useInView, useReducedMotion } from 'motion/react';
import { Fingerprint, Languages, Lock, PiggyBank } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Reveal, SectionHeader, SpotlightCard } from '../../components/ui/primitives';

/** Counts up to `to` the first time it scrolls into view. */
function Ticker({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const PILLARS: { icon: ReactNode; label: string; value: ReactNode; text: string }[] = [
  {
    icon: <Lock className="size-4" />,
    label: 'Privado',
    value: '0 bytes',
    text: 'das suas conversas, arquivos e memórias saem do seu computador. Nem para a Falkyria.',
  },
  {
    icon: <PiggyBank className="size-4" />,
    label: 'Gratuito',
    value: 'R$ 0',
    text: 'por pergunta. Sem mensalidade e sem plano pago: a IA roda no processador do seu PC.',
  },
  {
    icon: <Languages className="size-4" />,
    label: 'Em português',
    value: 'PT-BR',
    text: 'de verdade: entende e responde em português do Brasil, por escrito ou com voz brasileira.',
  },
  {
    icon: <Fingerprint className="size-4" />,
    label: 'Seu',
    value: <Ticker to={100} suffix="%" />,
    text: 'sob o seu controle: você escolhe o modelo, o que ele lembra e o que ele pode fazer.',
  },
];

export function Pillars() {
  return (
    <section className="container-site pt-12 sm:pt-16" aria-labelledby="por-que">
      <SectionHeader
        id="por-que"
        eyebrow="Por que Nicx"
        title="Uma IA que é sua de verdade."
        lead="A maioria dos assistentes mora na nuvem de alguém. O Nicx mora no seu computador, e isso muda tudo."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.08}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <p className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
                <span className="grid size-7 place-items-center rounded-lg border border-line bg-surface-2 text-ink">
                  {p.icon}
                </span>
                {p.label}
              </p>
              <p className="text-gradient mt-8 text-[44px] leading-none font-semibold tracking-[-0.045em]">{p.value}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
