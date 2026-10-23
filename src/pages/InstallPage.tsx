import {
  AppWindow,
  ArrowRight,
  AudioLines,
  Box,
  Brain,
  Check,
  Cpu,
  Download,
  HardDrive,
  Loader2,
  MemoryStick,
  MessageCircle,
  Mic,
  MousePointerClick,
  PartyPopper,
  ScanSearch,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { NicxMascot } from '../components/Mascot/NicxMascot';
import { Shell } from '../components/Shell';
import { Accordion, type AccordionItem } from '../components/ui/Accordion';
import { DownloadButton, Eyebrow, Reveal, SectionHeader, SpotlightCard } from '../components/ui/primitives';
import { cn, PAGE_HREF } from '../site';

/* ── Installer window (illustration) ─────────────────────────────── */

type CheckState = 'done' | 'skip' | 'active' | 'wait';

const CHECKS: { label: string; detail: string; state: CheckState }[] = [
  { label: 'Memória RAM', detail: '16 GB · modelo padrão', state: 'done' },
  { label: 'Espaço livre', detail: '118 GB disponíveis', state: 'done' },
  { label: 'Ambiente do Nicx', detail: 'Instalado', state: 'done' },
  { label: 'Ollama', detail: 'Já estava instalado · pulando', state: 'skip' },
  { label: 'Modelo de IA', detail: '2,1 de 3,3 GB', state: 'active' },
  { label: 'Vozes em português', detail: 'Na fila', state: 'wait' },
];

function StateIcon({ state }: { state: CheckState }) {
  if (state === 'done')
    return (
      <span className="grid size-5 place-items-center rounded-full bg-success/15 text-success">
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  if (state === 'skip')
    return (
      <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-accent">
        <ArrowRight className="size-3" strokeWidth={3} />
      </span>
    );
  if (state === 'active')
    return (
      <span className="grid size-5 place-items-center text-cyan">
        <Loader2 className="size-4 animate-spin [animation-duration:1.6s]" />
      </span>
    );
  return <span className="mx-[3px] block size-3.5 rounded-full border-2 border-line-strong" />;
}

function InstallerWindow() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-float select-none">
        <div className="flex h-10 items-center gap-2 border-b border-line bg-surface-2/60 px-4 text-[12.5px]">
          <NicxMascot size={18} mood="idle" animated={false} decorative />
          <span className="font-medium text-ink">Instalador do Nicx</span>
          <span className="ml-auto text-subtle">NicxSetup.exe</span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <NicxMascot size={56} mood="thinking" decorative />
            <div>
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">Preparando o seu computador</p>
              <p className="text-[13px] text-muted">Instalando só o que falta.</p>
            </div>
          </div>
          <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
            {CHECKS.map((c) => (
              <li key={c.label} className="flex items-center gap-3 px-3.5 py-2.5 text-[13.5px]">
                <StateIcon state={c.state} />
                <span className={cn('font-medium', c.state === 'wait' ? 'text-subtle' : 'text-ink')}>{c.label}</span>
                <span className="ml-auto text-[12.5px] text-subtle tabular-nums">{c.detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <div className="flex justify-between text-[12px] text-muted">
              <span>Baixando o modelo de IA</span>
              <span className="tabular-nums">64%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[64%] rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--accent))]" />
            </div>
          </div>
          <p className="mt-4 text-[12.5px] text-subtle">Pode continuar usando o computador enquanto isso.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Content ─────────────────────────────────────────────────────── */

const PARTS: { icon: ReactNode; name: string; what: string; size: string }[] = [
  {
    icon: <Box className="size-4" />,
    name: 'Ambiente do Nicx',
    what: 'O programa do Nicx e o Python que ele usa, gerenciado pelo uv.',
    size: '≈ 600 MB',
  },
  {
    icon: <Cpu className="size-4" />,
    name: 'Ollama',
    what: 'O motor que roda os modelos de IA no seu computador.',
    size: '≈ 1,6 GB',
  },
  {
    icon: <Brain className="size-4" />,
    name: 'Modelo de IA',
    what: 'O “cérebro”: Qwen 3.5 (4B), ou um modelo menor se o PC tiver pouca memória.',
    size: '≈ 3,3 GB',
  },
  {
    icon: <AudioLines className="size-4" />,
    name: 'Vozes',
    what: 'Reconhecimento de fala e a voz brasileira do Nicx (opcional na instalação).',
    size: '≈ 2 GB',
  },
];

const SPEEDS = [
  { speed: '300 Mbps', time: '≈ 6 min', pct: 12 },
  { speed: '100 Mbps', time: '≈ 15 min', pct: 25 },
  { speed: '50 Mbps', time: '≈ 25 min', pct: 50 },
  { speed: '20 Mbps', time: '≈ 55 min', pct: 100 },
];

const STEPS: { icon: ReactNode; title: string; text: ReactNode }[] = [
  {
    icon: <Download className="size-4" />,
    title: 'Baixe o NicxSetup.exe',
    text: (
      <>
        Quando o instalador sair, o botão “Baixar para Windows” deste site vai baixá-lo. Baixe sempre por aqui, nunca
        de outros sites.
      </>
    ),
  },
  {
    icon: <MousePointerClick className="size-4" />,
    title: 'Abra o instalador',
    text: (
      <>
        Dê dois cliques no arquivo. Se o Windows perguntar se o app pode fazer alterações, clique em{' '}
        <strong>Sim</strong>. Se aparecer “O Windows protegeu o computador”, clique em{' '}
        <strong>Mais informações</strong> e depois em <strong>Executar assim mesmo</strong>.
      </>
    ),
  },
  {
    icon: <ScanSearch className="size-4" />,
    title: 'Deixe ele conferir o seu PC',
    text: (
      <>
        O instalador verifica memória, espaço livre e o que você já tem instalado, e escolhe o modelo de IA certo para
        o seu computador.
      </>
    ),
  },
  {
    icon: <HardDrive className="size-4" />,
    title: 'Aguarde os downloads',
    text: (
      <>
        Ele baixa e instala só o que falta, mostrando o progresso de cada parte. Dá para continuar usando o computador
        normalmente.
      </>
    ),
  },
  {
    icon: <PartyPopper className="size-4" />,
    title: 'Pronto!',
    text: <>O Nicx aparece no menu Iniciar. Abra e diga oi.</>,
  },
];

const AFTER: { icon: ReactNode; title: string; text: ReactNode }[] = [
  {
    icon: <AppWindow className="size-4" />,
    title: 'Abra o Nicx',
    text: (
      <>
        Procure por <strong>Nicx</strong> no menu Iniciar. Na primeira vez, ele pergunta se você quer ajudar com
        estatísticas anônimas. Responda como preferir: nada muda no funcionamento.
      </>
    ),
  },
  {
    icon: <MessageCircle className="size-4" />,
    title: 'Puxe a primeira conversa',
    text: (
      <>
        Escreva algo como <em>“Oi, Nicx! O que você sabe fazer?”</em>. A primeira resposta demora um pouco mais: é o
        modelo sendo carregado na memória.
      </>
    ),
  },
  {
    icon: <Mic className="size-4" />,
    title: 'Ligue a voz',
    text: (
      <>
        Clique no microfone para falar e permita o acesso quando o Windows pedir. Para conversar sem usar as mãos,
        ative o modo <strong>conversa por voz</strong>.
      </>
    ),
  },
  {
    icon: <Sparkles className="size-4" />,
    title: 'Conte sobre você',
    text: (
      <>
        Diga seu nome, do que gosta e como prefere as respostas, e peça para ele lembrar. A memória fica guardada no
        seu PC.
      </>
    ),
  },
];

const TROUBLE: AccordionItem[] = [
  {
    q: 'Aparece um erro de memória ou o modelo não carrega',
    a: (
      <>
        O modelo de IA precisa de alguns gigabytes de RAM livres. Feche programas pesados (navegador com muitas abas,
        editores, jogos) e tente de novo. Se o seu PC tem 8 GB, use um modelo menor ou diminua o tamanho do contexto
        nas configurações do Nicx: ele passa a ocupar menos memória.
      </>
    ),
  },
  {
    q: 'O antivírus bloqueou ou pediu confirmação',
    a: (
      <>
        O instalador baixa e instala outros programas (o Ollama, o modelo de IA e as vozes), e alguns antivírus pedem
        confirmação para isso. Se você baixou o NicxSetup.exe por este site, pode permitir. Se o antivírus apagou
        algum arquivo, restaure-o da quarentena e rode o instalador de novo.
      </>
    ),
  },
  {
    q: 'O microfone não funciona',
    a: (
      <>
        No Windows, abra <strong>Configurações → Privacidade e segurança → Microfone</strong> e ative{' '}
        <strong>Acesso ao microfone</strong> e <strong>Permitir que aplicativos da área de trabalho acessem o
        microfone</strong>. Depois, confira nas configurações do Nicx se o microfone certo está selecionado.
      </>
    ),
  },
  {
    q: 'As respostas estão demorando muito',
    a: (
      <>
        Sem placa de vídeo dedicada, algumas dezenas de segundos por resposta é normal. Para ajudar: deixe o notebook
        na tomada (o modo de economia de energia deixa o processador mais lento), feche programas que você não está
        usando ou escolha um modelo menor.
      </>
    ),
  },
  {
    q: 'O download parou no meio',
    a: (
      <>
        Rode o instalador de novo. Ele confere o que já está no seu computador e baixa só o que ainda falta.
      </>
    ),
  },
];

/* ── Page ────────────────────────────────────────────────────────── */

export function InstallPage() {
  return (
    <Shell page="install">
      {/* Hero */}
      <section className="relative isolate -mt-16 overflow-hidden pt-16 pb-16" aria-labelledby="instalacao-titulo">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,#000_10%,transparent_70%)]" />
          <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_70%_60%_at_60%_0%,var(--glow-b),transparent_70%)]" />
        </div>
        <div className="container-site grid items-center gap-14 pt-12 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <Eyebrow className="rise">Instalação</Eyebrow>
            <h1
              id="instalacao-titulo"
              className="rise text-gradient mt-4 text-[44px] leading-[1] font-semibold tracking-[-0.045em] text-balance sm:text-[64px]"
              style={{ animationDelay: '80ms' }}
            >
              Um instalador. Tudo pronto<span className="text-amber [-webkit-text-fill-color:var(--amber)]">.</span>
            </h1>
            <p
              className="rise mt-6 max-w-xl text-[17px] leading-relaxed text-pretty text-muted sm:text-[19px]"
              style={{ animationDelay: '160ms' }}
            >
              O <strong className="font-medium text-ink">NicxSetup.exe</strong> vai preparar o seu computador sozinho:
              confere o que você já tem e instala só o que falta. Sem terminal e sem configuração.
            </p>
            <div className="rise relative z-10 mt-8 flex flex-col items-start gap-3" style={{ animationDelay: '240ms' }}>
              <DownloadButton size="lg" />
              <p className="text-[13.5px] text-muted">Windows 10 e 11 (64 bits) · cerca de 7,5 GB de download com voz</p>
            </div>
          </div>
          <div className="rise" style={{ animationDelay: '200ms' }}>
            <InstallerWindow />
          </div>
        </div>
      </section>

      {/* What it installs */}
      <section id="o-que-instala" className="container-site pt-16 sm:pt-20" aria-labelledby="o-que-instala-titulo">
        <SectionHeader
          id="o-que-instala-titulo"
          align="left"
          eyebrow="O que o instalador faz"
          title="Confere tudo e baixa só o que falta."
          lead="Se você já tem alguma parte instalada, como o Ollama, o instalador aproveita e pula essa etapa."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="card overflow-hidden">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Partes instaladas e tamanho aproximado do download</caption>
                <thead className="bg-surface-2/70 text-[13px] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium sm:px-6">
                      Parte
                    </th>
                    <th scope="col" className="px-5 py-3 text-right font-medium sm:px-6">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {PARTS.map((p) => (
                    <tr key={p.name}>
                      <td className="px-5 py-4 sm:px-6">
                        <span className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                            {p.icon}
                          </span>
                          <span>
                            <span className="block font-medium text-ink">{p.name}</span>
                            <span className="mt-0.5 block text-[14px] leading-snug text-muted">{p.what}</span>
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right align-top font-medium whitespace-nowrap text-ink tabular-nums sm:px-6">
                        {p.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-line-strong bg-surface-2/40">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-semibold text-ink sm:px-6">
                      Total
                      <span className="block text-[13px] font-normal text-muted">Ocupa cerca de 12 GB depois de instalado.</span>
                    </th>
                    <td className="px-5 py-4 text-right align-top font-semibold whitespace-nowrap text-ink tabular-nums sm:px-6">
                      ≈ 7,5 GB
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col p-6">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">Quanto tempo leva?</h3>
              <p className="mt-1 text-[14px] text-muted">Depende da sua internet. Estimativas para o pacote completo:</p>
              <ul className="mt-6 flex flex-1 flex-col justify-center gap-4">
                {SPEEDS.map((s) => (
                  <li key={s.speed}>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-muted">{s.speed}</span>
                      <span className="font-medium text-ink tabular-nums">{s.time}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--accent))]"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-snug text-subtle">
                Inclui alguns minutos de instalação. Se parte já estiver no PC, é mais rápido.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section id="passo-a-passo" className="container-site pt-28 sm:pt-32" aria-labelledby="passos-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <SectionHeader
            id="passos-titulo"
            align="left"
            eyebrow="Passo a passo"
            title="Cinco passos, poucos cliques."
            lead="Do download à primeira conversa, sem abrir terminal nem mexer em configurações."
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <ol className="relative">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="relative flex gap-5 pb-10 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span className="absolute top-11 bottom-1 left-[21px] w-px bg-line-strong" aria-hidden="true" />
                  )}
                  <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-[15px] font-semibold text-ink shadow-card tabular-nums">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.015em] text-ink">
                      {s.title}
                      <span className="text-subtle" aria-hidden="true">
                        {s.icon}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-ink">
                      {s.text}
                    </p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* After installing */}
      <section id="depois" className="container-site pt-28 sm:pt-32" aria-labelledby="depois-titulo">
        <SectionHeader
          id="depois-titulo"
          eyebrow="Depois de instalar"
          title="Seus primeiros minutos com o Nicx."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AFTER.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">{a.icon}</span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em] text-ink">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-ink">
                  {a.text}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="problemas" className="container-site pt-28 sm:pt-32" aria-labelledby="problemas-titulo">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-4 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Solução de problemas</Eyebrow>
            <h2
              id="problemas-titulo"
              className="text-gradient text-[34px] leading-[1.06] font-semibold tracking-[-0.038em] text-balance sm:text-[44px]"
            >
              Algo não saiu como esperado?
            </h2>
            <p className="text-[17px] leading-relaxed text-muted">
              Os tropeços mais comuns, e como resolver cada um.
            </p>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-4">
              <NicxMascot size={44} mood="idle" animated={false} decorative />
              <p className="text-[14px] leading-snug text-muted">
                Mais respostas nas{' '}
                <a href={`${PAGE_HREF.home}#duvidas`} className="font-medium text-accent underline-offset-[3px] hover:underline">
                  perguntas frequentes
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion items={TROUBLE} />
          </Reveal>
        </div>
      </section>

      <section className="container-site pt-24" aria-label="Requisitos mínimos">
        <Reveal>
          <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[14.5px] text-muted">
              <span className="inline-flex items-center gap-2">
                <AppWindow className="size-4 text-accent" aria-hidden="true" /> Windows 10 ou 11, 64 bits
              </span>
              <span className="inline-flex items-center gap-2">
                <MemoryStick className="size-4 text-accent" aria-hidden="true" /> 16 GB de RAM (8 GB com modelo menor)
              </span>
              <span className="inline-flex items-center gap-2">
                <HardDrive className="size-4 text-accent" aria-hidden="true" /> ≈ 12 GB livres
              </span>
              <span className="inline-flex items-center gap-2">
                <Cpu className="size-4 text-accent" aria-hidden="true" /> Sem placa de vídeo
              </span>
            </div>
            <a
              href={`${PAGE_HREF.home}#requisitos`}
              className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-accent"
            >
              Ver requisitos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}
