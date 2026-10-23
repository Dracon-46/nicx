import { ArrowRight, BrainCircuit, Check, Languages, ShieldCheck, WifiOff } from 'lucide-react';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { ButtonLink, DownloadButton } from '../../components/ui/primitives';
import type { MascotMood } from '../../lib/mascot';
import { PAGE_HREF } from '../../site';
import { AppPreview } from './AppPreview';

function Chip({ icon, children, className }: { icon: ReactNode; children: ReactNode; className: string }) {
  return (
    <div className={`absolute hidden lg:block ${className}`} aria-hidden="true">
      <div className="float flex items-center gap-2 rounded-full border border-line bg-surface/95 py-1.5 pr-3.5 pl-1.5 text-[13px] font-medium text-ink shadow-float">
        <span className="grid size-6 place-items-center rounded-full bg-cyan-soft text-cyan">{icon}</span>
        {children}
      </div>
    </div>
  );
}

const d = (ms: number) => ({ '--d': ms }) as CSSProperties;

export function Hero() {
  const [mood, setMood] = useState<MascotMood>('idle');
  const react = (next: MascotMood) => (on: boolean) => setMood(on ? next : 'idle');

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16 pb-20" aria-labelledby="hero-title">
      {/* Backdrop: dotted grid, the slime's glow and slow ripples. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_48%_at_50%_26%,#000_10%,transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--glow-b),transparent_70%)]" />
      </div>

      <div className="container-site flex flex-col items-center pt-6 text-center sm:pt-8">
        <a
          href={PAGE_HREF.install}
          className="rise group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 py-1 pr-3 pl-1 text-[13px] text-muted shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors hover:border-line-strong hover:text-ink"
          style={d(0)}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-2 py-0.5 font-medium text-amber-ink">
            <span className="relative flex size-1.5">
              <span className="ping-soft absolute inset-0 rounded-full bg-amber" />
              <span className="relative size-1.5 rounded-full bg-amber" />
            </span>
            Em breve
          </span>
          Instalador para Windows 10 e 11
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>

        {/* The stage: the mascot is the face of the brand. */}
        <div
          className="rise relative -mt-4 grid size-[230px] place-items-center sm:size-[290px] lg:size-[310px]"
          style={d(80)}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="breathe absolute top-[60%] left-1/2 size-[150%] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
            {[0, 2.5, 5].map((delay) => (
              <div
                key={delay}
                className="ripple absolute top-[60%] left-1/2 size-[118%] rounded-full border border-cyan/25"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <NicxMascot
            size={330}
            mood={mood}
            interactive
            className="relative size-full"
          />
          <Chip icon={<WifiOff className="size-3.5" />} className="top-[30%] -left-[150px]">
            Funciona sem internet
          </Chip>
          <Chip icon={<Languages className="size-3.5" />} className="top-[22%] -right-[140px] [&_.float]:[animation-delay:-2s]">
            Fala português
          </Chip>
          <Chip icon={<BrainCircuit className="size-3.5" />} className="bottom-[10%] -left-[120px] [&_.float]:[animation-delay:-4s]">
            Lembra de você
          </Chip>
          <Chip icon={<ShieldCheck className="size-3.5" />} className="bottom-[18%] -right-[170px] [&_.float]:[animation-delay:-1s]">
            Sempre pede permissão
          </Chip>
        </div>

        <h1
          id="hero-title"
          className="rise text-gradient -mt-5 max-w-4xl text-[46px] leading-[0.98] font-semibold tracking-[-0.048em] text-balance sm:text-[68px] lg:text-[84px]"
          style={d(160)}
        >
          Sua IA, no seu computador<span className="text-amber [-webkit-text-fill-color:var(--amber)]">.</span>
        </h1>
        <p
          className="rise mt-5 max-w-[620px] text-[17px] leading-relaxed text-pretty text-muted sm:text-[19px]"
          style={d(240)}
        >
          O Nicx é a inteligência artificial da Falkyria. Conversa em português, por texto e por voz, e
          roda inteiro no seu PC: sem mensalidade, sem nuvem e sem ninguém lendo as suas conversas.
        </p>
        <div
          className="rise relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row"
          style={d(320)}
        >
          <DownloadButton size="lg" onHover={react('listening')} />
          <span onPointerEnter={() => setMood('happy')} onPointerLeave={() => setMood('idle')}>
            <ButtonLink
              href={PAGE_HREF.install}
              variant="secondary"
              className="h-12 px-6 text-base"
              onFocus={() => setMood('happy')}
              onBlur={() => setMood('idle')}
            >
              Como instalar
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
          </span>
        </div>
        <ul
          className="rise mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13.5px] text-muted"
          style={d(400)}
        >
          {['Windows 10 e 11', 'Funciona sem placa de vídeo', 'Sem cadastro'].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-success" aria-hidden="true" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <AppPreview />
    </section>
  );
}
