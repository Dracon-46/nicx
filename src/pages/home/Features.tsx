import {
  AppWindow,
  AudioLines,
  BookOpenText,
  Bot,
  Brain,
  CalendarClock,
  FileText,
  Globe,
  MessagesSquare,
  Mic,
  Newspaper,
  Radar,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
  Wrench,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { Reveal, SectionHeader, SpotlightCard } from '../../components/ui/primitives';
import { cn } from '../../site';

function Feature({
  icon,
  title,
  children,
  visual,
  className,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  visual: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotlightCard className="flex h-full flex-col overflow-hidden">
        <div
          className="relative flex h-[240px] items-center justify-center overflow-hidden border-b border-line bg-[linear-gradient(180deg,var(--surface-2),var(--surface))] px-5"
          aria-hidden="true"
        >
          <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          {visual}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.015em] text-ink">
            <span className="grid size-7 place-items-center rounded-lg bg-accent-soft text-accent">{icon}</span>
            {title}
          </h3>
          <p className="text-[15px] leading-relaxed text-muted">{children}</p>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function ChatVisual() {
  return (
    <div className="relative flex w-full max-w-[460px] flex-col gap-2.5 text-[13px]">
      <div className="ml-auto flex items-center gap-2">
        <p className="rounded-2xl rounded-br-md bg-bubble px-3.5 py-2 text-bubble-ink">
          Me explica juros compostos como se eu tivesse 12 anos?
        </p>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-2 text-muted">
          <User className="size-3.5" />
        </span>
      </div>
      <div className="flex items-start gap-2">
        <NicxMascot size={24} mood="idle" animated={false} decorative className="mt-1" />
        <div className="rounded-2xl rounded-tl-md border border-line bg-surface px-3.5 py-2.5 text-ink shadow-card">
          <p>
            Imagina uma bola de neve descendo o morro: ela cresce, e quanto maior fica, mais neve junta.
          </p>
          <div className="mt-2 grid grid-cols-3 overflow-hidden rounded-lg border border-line text-[11.5px]">
            {['Ano', 'Guardado', 'Com juros'].map((h) => (
              <span key={h} className="bg-surface-2 px-2 py-1 font-medium text-muted">
                {h}
              </span>
            ))}
            {[
              ['1', 'R$ 100', 'R$ 110'],
              ['5', 'R$ 100', 'R$ 161'],
            ].map((row) =>
              row.map((c, i) => (
                <span key={row[0] + i} className="border-t border-line px-2 py-1 tabular-nums">
                  {c}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceVisual() {
  const bars = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.8, 0.5, 0.3, 0.65, 0.45];
  return (
    <div className="relative flex flex-col items-center gap-5">
      <div className="relative grid size-16 place-items-center">
        <span className="ping-soft absolute inset-0 rounded-full bg-cyan/30" />
        <span className="relative grid size-16 place-items-center rounded-full bg-[linear-gradient(160deg,#46e3f5,#1c5cab)] text-white shadow-[0_10px_30px_-8px_rgb(28_92_171/0.6)]">
          <Mic className="size-6" />
        </span>
      </div>
      <div className="flex h-10 items-center gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className="eq-bar w-1.5 rounded-full bg-[linear-gradient(180deg,var(--cyan),var(--accent))]"
            style={{ height: `${h * 100}%`, animationDelay: `${-i * 0.13}s`, animationDuration: `${0.9 + (i % 4) * 0.15}s` }}
          />
        ))}
      </div>
      <p className="rounded-full border border-line bg-surface px-3 py-1 text-[12px] text-muted shadow-card">
        Conversa por voz · ouvindo
      </p>
    </div>
  );
}

function MemoryVisual() {
  const items = [
    { icon: <Brain className="size-3.5" />, text: 'Prefere respostas curtas', tone: 'text-cyan' },
    { icon: <CalendarClock className="size-3.5" />, text: 'Aniversário da mãe: 14/03', tone: 'text-accent' },
    { icon: <FileText className="size-3.5" />, text: 'contrato-apartamento.pdf', tone: 'text-amber' },
    { icon: <BookOpenText className="size-3.5" />, text: 'Anotações da faculdade · 38 arquivos', tone: 'text-success' },
  ];
  return (
    <div className="relative flex w-full max-w-[290px] flex-col gap-2">
      {items.map((it, i) => (
        <p
          key={it.text}
          className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[12.5px] text-ink shadow-card"
          style={{ marginLeft: `${(i % 2) * 18}px`, opacity: 1 - i * 0.12 }}
        >
          <span className={it.tone}>{it.icon}</span>
          <span className="truncate">{it.text}</span>
        </p>
      ))}
    </div>
  );
}

function ToolsVisual() {
  return (
    <div className="relative flex w-full max-w-[470px] flex-col gap-3">
      <div className="flex flex-wrap justify-center gap-2 text-[12px] text-muted">
        {[
          { icon: <Globe className="size-3.5" />, t: 'Busca na web' },
          { icon: <FileText className="size-3.5" />, t: 'Arquivos' },
          { icon: <Terminal className="size-3.5" />, t: 'Comandos' },
          { icon: <Sparkles className="size-3.5" />, t: 'Código' },
        ].map((x) => (
          <span key={x.t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1">
            {x.icon}
            {x.t}
          </span>
        ))}
      </div>
      <div className="rounded-xl border border-line-strong bg-surface p-3.5 text-[13px] shadow-float">
        <p className="flex items-center gap-2 font-medium text-ink">
          <ShieldCheck className="size-4 text-amber" />
          Posso executar este comando?
        </p>
        <p className="mt-2 truncate rounded-md bg-[#0b0b0b] px-2.5 py-1.5 font-mono text-[12px] text-[#c9f6fb]">
          <span className="text-[#86b6ef]">PS&gt;</span> Get-ChildItem .\Fotos -Filter *.heic
        </p>
        <div className="mt-3 flex justify-end gap-2 text-[12px]">
          <span className="rounded-md border border-line px-3 py-1 text-muted">Negar</span>
          <span className="rounded-md bg-ink px-3 py-1 font-medium text-canvas">Permitir</span>
        </div>
      </div>
    </div>
  );
}

function AgentsVisual() {
  const rows = [
    { icon: <Newspaper className="size-4" />, title: 'Briefing do dia', meta: 'Todo dia, 07:00', status: 'Falado em voz alta' },
    { icon: <Bot className="size-4" />, title: 'Pesquisa a fundo', meta: '12 documentos lidos', status: 'Com as fontes' },
    { icon: <Radar className="size-4" />, title: 'Monitoramento', meta: 'A cada 6 horas', status: 'Avisa se mudar' },
  ];
  return (
    <div className="relative flex w-full max-w-[470px] flex-col gap-2">
      {rows.map((r, i) => (
        <div
          key={r.title}
          className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] shadow-card"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">{r.icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-ink">{r.title}</span>
            <span className="block text-[12px] text-subtle">{r.meta}</span>
          </span>
          <span className="hidden items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[11.5px] text-muted sm:inline-flex">
            <span className={cn('size-1.5 rounded-full', i === 0 ? 'bg-amber' : 'bg-success')} />
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function DesktopVisual() {
  return (
    <div className="relative w-full max-w-[280px]">
      <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-float">
        <div className="flex h-6 items-center gap-1.5 border-b border-line bg-surface-2/70 px-2.5">
          <NicxMascot size={12} mood="idle" animated={false} decorative />
          <span className="text-[10px] font-medium text-muted">Nicx</span>
        </div>
        <div className="space-y-1.5 p-3">
          <span className="ml-auto block h-2 w-3/5 rounded-full bg-ink/80" />
          <span className="block h-2 w-4/5 rounded-full bg-line-strong" />
          <span className="block h-2 w-2/3 rounded-full bg-line-strong" />
        </div>
      </div>
      <div className="relative -mt-3 ml-10 rounded-xl border border-white/10 bg-[#0b0b0b] p-3 font-mono text-[11.5px] leading-relaxed text-[#d7d6d0] shadow-float">
        <p>
          <span className="text-[#86b6ef]">PS&gt;</span> nicx chat
        </p>
        <p className="text-[#46e3f5]">Nicx: Oi! Em que posso ajudar?</p>
        <p>
          <span className="text-[#eda100]">›</span> <span className="caret inline-block h-3 w-1.5 translate-y-0.5 bg-[#d7d6d0]" />
        </p>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="recursos" className="container-site pt-28 sm:pt-36" aria-labelledby="recursos-titulo">
      <SectionHeader
        id="recursos-titulo"
        eyebrow="Recursos"
        title="Um assistente completo, morando no seu PC."
        lead="Conversa, escuta, fala, lembra e trabalha por você. Sempre com a sua permissão."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Feature
          className="lg:col-span-2"
          icon={<MessagesSquare className="size-4" />}
          title="Conversa de verdade"
          visual={<ChatVisual />}
        >
          Pergunte, peça resumos, e-mails e explicações. Ele lê seus documentos e responde com listas, tabelas e
          código, no português que você fala.
        </Feature>
        <Feature icon={<AudioLines className="size-4" />} title="Fala e escuta" visual={<VoiceVisual />} delay={0.08}>
          Reconhecimento de fala e voz brasileira rodando no seu PC. No modo conversa por voz, é só falar, sem apertar
          nada.
        </Feature>
        <Feature icon={<Brain className="size-4" />} title="Memória" visual={<MemoryVisual />}>
          Guarda fatos sobre você e os documentos que você indexar, e usa tudo isso como contexto nas respostas.
        </Feature>
        <Feature
          className="lg:col-span-2"
          icon={<Wrench className="size-4" />}
          title="Ferramentas, com a sua permissão"
          visual={<ToolsVisual />}
          delay={0.08}
        >
          Busca na web, lê arquivos, executa código e comandos. Antes de agir, o Nicx mostra exatamente o que vai
          fazer e espera o seu “pode”.
        </Feature>
        <Feature
          className="lg:col-span-2"
          icon={<CalendarClock className="size-4" />}
          title="Agentes que trabalham por você"
          visual={<AgentsVisual />}
        >
          Briefing diário com agenda, e-mails e notícias; pesquisa a fundo nos seus documentos, com as fontes; e
          monitoramento agendado que avisa quando algo muda.
        </Feature>
        <Feature icon={<AppWindow className="size-4" />} title="No app ou no terminal" visual={<DesktopVisual />} delay={0.08}>
          Um app para Windows com tudo isso numa janela. E, para quem curte, o terminal: <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[13px] whitespace-nowrap text-ink">nicx chat</code>.
        </Feature>
      </div>
    </section>
  );
}
