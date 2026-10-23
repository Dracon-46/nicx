import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react';
import { AudioLines, Coffee, Mic, PartyPopper, Sparkles } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { Reveal, SectionHeader } from '../../components/ui/primitives';
import { useMascot, type MascotMood } from '../../lib/mascot';
import { cn } from '../../site';

type DemoMood = Exclude<MascotMood, 'error'>;

const MOODS: { id: DemoMood; label: string; icon: ReactNode; text: string; tint: string }[] = [
  {
    id: 'idle',
    label: 'Tranquilo',
    icon: <Coffee className="size-4" />,
    text: 'Respira, pisca, dá uns pulinhos e acompanha o seu cursor com os olhos.',
    tint: 'var(--glow-a)',
  },
  {
    id: 'listening',
    label: 'Ouvindo',
    icon: <Mic className="size-4" />,
    text: 'Se estica, arregala os olhos e ondula no ritmo da sua voz.',
    tint: 'rgb(70 227 245 / 0.32)',
  },
  {
    id: 'thinking',
    label: 'Pensando',
    icon: <Sparkles className="size-4" />,
    text: 'Olha para cima procurando a resposta, e faíscas giram em volta do núcleo.',
    tint: 'rgb(74 156 245 / 0.32)',
  },
  {
    id: 'speaking',
    label: 'Falando',
    icon: <AudioLines className="size-4" />,
    text: 'O núcleo pulsa e o corpo vibra a cada palavra.',
    tint: 'rgb(28 92 171 / 0.3)',
  },
  {
    id: 'happy',
    label: 'Feliz',
    icon: <PartyPopper className="size-4" />,
    text: 'Pula de alegria, fecha os olhinhos e fica corado.',
    tint: 'rgb(255 143 171 / 0.26)',
  },
];

const BUBBLES: Record<DemoMood, ReactNode> = {
  idle: 'Oi! Eu sou o Nicx. Pode me cutucar.',
  listening: (
    <>
      “Nicx, qual é a capital da Austrália?”
      <span className="caret ml-0.5 inline-block h-[1em] w-px translate-y-[3px] bg-current" />
    </>
  ),
  thinking: (
    <span className="inline-flex items-center gap-1.5" aria-label="Pensando">
      {[0, 0.15, 0.3].map((d) => (
        <span key={d} className="typing-dot size-1.5 rounded-full bg-current" style={{ animationDelay: `${d}s` }} />
      ))}
    </span>
  ),
  speaking: 'É Camberra! Muita gente aposta em Sydney.',
  happy: 'Adoro quando você me pergunta coisas!',
};

/** A voice-like level (syllables inside phrases) for the demo, 0..1. */
function fakeLevel(t: number, mood: DemoMood): number {
  const syllable = Math.abs(Math.sin(t * (mood === 'listening' ? 8.5 : 7)));
  const phrase = Math.max(0, Math.sin(t * 1.25) * 0.6 + 0.55);
  const jitter = 0.85 + 0.15 * Math.sin(t * 23.7);
  return Math.min(1, syllable * phrase * jitter);
}

export function MoodDemo() {
  const mood = useMascot((s) => s.mood) as DemoMood;
  const setMood = useMascot((s) => s.setMood);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const reduce = useReducedMotion();

  // Feed a simulated microphone/voice level while listening or speaking.
  useEffect(() => {
    if (!inView || reduce || (mood !== 'listening' && mood !== 'speaking')) return;
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const step = (now: number) => {
      if (now - last > 33) {
        last = now;
        useMascot.getState().setLevel(fakeLevel((now - start) / 1000, mood));
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      useMascot.getState().setLevel(0);
    };
  }, [inView, reduce, mood]);

  const current = MOODS.find((x) => x.id === mood) ?? MOODS[0];

  return (
    <section id="conheca" className="container-site pt-28 sm:pt-36" aria-labelledby="conheca-titulo">
      <SectionHeader
        id="conheca-titulo"
        eyebrow="Conheça o Nicx"
        title="Ele não tem boca. Nem precisa."
        lead="O Nicx se expressa com os olhos, com o corpo de gelatina e com o núcleo azul que brilha lá dentro. Escolha um estado e veja como ele reage."
      />
      <Reveal className="mt-14">
        <div className="card grid overflow-hidden lg:grid-cols-[1.25fr_1fr]">
          {/* Stage */}
          <div
            ref={stageRef}
            className="relative isolate flex min-h-[400px] flex-col items-center justify-center overflow-hidden border-b border-line px-6 pt-12 pb-6 sm:min-h-[480px] lg:border-r lg:border-b-0"
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
              <div
                className="absolute top-[52%] left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background] duration-700"
                style={{ background: `radial-gradient(closest-side, ${current.tint}, transparent)` }}
              />
            </div>
            <div className="relative z-10 min-h-[52px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <m.p
                  key={mood}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative max-w-[320px] rounded-2xl border border-line bg-surface px-4 py-2.5 text-center text-[14.5px] leading-snug text-ink shadow-float"
                >
                  {BUBBLES[mood]}
                  <span className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b border-line bg-surface" />
                </m.p>
              </AnimatePresence>
            </div>
            <NicxMascot size={280} interactive className="-mt-10 h-[230px] w-[230px] sm:-mt-12 sm:h-[280px] sm:w-[280px]" />
          </div>

          {/* Controls: pills on phones, a described list on large screens. */}
          <fieldset className="flex min-w-0 flex-col justify-center p-4 sm:p-6 lg:p-8">
            <legend className="sr-only">Estado do Nicx</legend>
            <p className="mb-3 hidden px-2 text-[13px] font-medium text-muted lg:block" aria-hidden="true">
              Como o Nicx está agora?
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:flex-col lg:flex-nowrap lg:justify-start">
              {MOODS.map((x) => {
                const active = x.id === mood;
                return (
                  <label
                    key={x.id}
                    className={cn(
                      'group relative flex cursor-pointer items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-1.5 transition-[background-color,border-color,box-shadow] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent lg:items-start lg:gap-3.5 lg:rounded-2xl lg:px-4 lg:py-3.5',
                      active
                        ? 'border-line-strong bg-surface-2 shadow-[0_1px_0_0_rgb(255_255_255/0.5)_inset]'
                        : 'border-line hover:bg-surface-2/60 lg:border-transparent',
                    )}
                  >
                    <input
                      type="radio"
                      name="nicx-mood"
                      value={x.id}
                      checked={active}
                      onChange={() => setMood(x.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'grid size-7 shrink-0 place-items-center rounded-full transition-colors lg:mt-0.5 lg:size-8 lg:rounded-xl [&_svg]:size-3.5 lg:[&_svg]:size-4',
                        active ? 'bg-ink text-canvas' : 'bg-surface-2 text-muted group-hover:text-ink',
                      )}
                    >
                      {x.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-medium text-ink lg:text-[15.5px]">{x.label}</span>
                      <span className="mt-0.5 hidden text-[14px] leading-snug text-muted lg:block">{x.text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mx-auto mt-4 max-w-sm text-center text-[14.5px] leading-snug text-muted lg:hidden">
              {current.text}
            </p>
          </fieldset>
        </div>
      </Reveal>
    </section>
  );
}
