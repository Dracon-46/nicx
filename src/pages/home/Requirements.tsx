import { Cpu, HardDrive, MemoryStick, MonitorSmartphone, Timer, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal, SectionHeader } from '../../components/ui/primitives';

const SPECS: { icon: ReactNode; label: string; value: string; note: string }[] = [
  {
    icon: <MonitorSmartphone className="size-4" />,
    label: 'Sistema',
    value: 'Windows ou Mac',
    note: 'Windows 10 ou 11 (64 bits), ou macOS 14 (Sonoma) ou mais novo.',
  },
  {
    icon: <MemoryStick className="size-4" />,
    label: 'Memória RAM',
    value: '16 GB',
    note: 'Recomendado. Com 8 GB funciona, usando um modelo menor.',
  },
  {
    icon: <HardDrive className="size-4" />,
    label: 'Espaço livre',
    value: '≈ 12 GB',
    note: 'Para o Nicx, o modelo de IA e as vozes.',
  },
  {
    icon: <Cpu className="size-4" />,
    label: 'Placa de vídeo',
    value: 'Não precisa',
    note: 'Roda no processador. Se houver uma, melhor ainda.',
  },
  {
    icon: <Wifi className="size-4" />,
    label: 'Internet',
    value: 'Só para instalar',
    note: 'Depois, só para ferramentas como a busca na web.',
  },
];

export function Requirements() {
  return (
    <section id="requisitos" className="container-site pt-28 sm:pt-36" aria-labelledby="requisitos-titulo">
      <SectionHeader
        id="requisitos-titulo"
        eyebrow="Requisitos"
        title="Roda no computador que você já tem."
        lead="Nada de hardware especial. Veja o que o Nicx precisa para funcionar bem."
      />
      <Reveal className="mt-14">
        <dl className="card grid overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 border-line p-6 not-last:border-b sm:last:col-span-2 sm:[&:nth-child(odd):not(:last-child)]:border-r lg:last:col-span-1 lg:border-b-0 lg:not-last:border-r"
            >
              <dt className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
                <span className="text-accent" aria-hidden="true">
                  {s.icon}
                </span>
                {s.label}
              </dt>
              <dd className="mt-3 text-[22px] leading-tight font-semibold tracking-[-0.025em] text-ink">{s.value}</dd>
              <dd className="text-[14px] leading-snug text-muted">{s.note}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal className="mt-4">
        <div className="flex flex-col items-start gap-4 rounded-[1.25rem] border border-amber/30 bg-amber-soft p-5 sm:flex-row sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber/20 text-amber-ink">
            <Timer className="size-5" aria-hidden="true" />
          </span>
          <p className="text-[15px] leading-relaxed text-muted">
            <strong className="font-medium text-ink">Sendo honesto sobre a velocidade:</strong> sem placa de vídeo
            dedicada, o Nicx pensa no processador. Em computadores mais simples, cada resposta pode levar algumas
            dezenas de segundos. É o preço de ter uma IA que não depende de ninguém, e o Nicx mostra o tempo todo que
            está trabalhando.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
