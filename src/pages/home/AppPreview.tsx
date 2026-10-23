import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowUp,
  Brain,
  Check,
  FileText,
  Lock,
  MessageSquare,
  Mic,
  Minus,
  Paperclip,
  Plus,
  Search,
  ShieldCheck,
  Square,
  X,
} from 'lucide-react';
import { useRef } from 'react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { cn } from '../../site';

const CONVERSATIONS = [
  { group: 'Hoje', items: ['Contrato do apartamento', 'Receita de pão de queijo', 'Roteiro em Ouro Preto'] },
  { group: 'Ontem', items: ['Briefing de segunda', 'Planilha de gastos de casa'] },
];

/**
 * An illustration of the Nicx desktop app (HTML, not a screenshot: crisp at
 * any size and it follows the theme). It tilts back into place on scroll.
 */
export function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.92, 1]);

  return (
    <div className="container-site relative mt-10 sm:mt-12">
      <p className="sr-only">
        Ilustração do app do Nicx: a pessoa envia um contrato em PDF e pergunta sobre a multa; o Nicx pede permissão
        para ler o arquivo e responde, rodando com um modelo local, sem enviar nada para fora do computador.
      </p>
      {/* Glow under the window. */}
      <div className="pointer-events-none absolute inset-x-[10%] top-[8%] bottom-0 -z-10 rounded-[50%] bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
      <div ref={ref} className="[perspective:1400px]" aria-hidden="true">
        <m.div
          style={{ rotateX, scale, transformOrigin: '50% 0%' }}
          className="mx-auto max-w-[1080px] overflow-hidden rounded-[18px] border border-line-strong bg-surface shadow-float select-none"
        >
          {/* Title bar, Windows style. */}
          <div className="flex h-10 items-center border-b border-line bg-surface-2/60 pl-3.5 text-[12.5px] text-muted">
            <NicxMascot size={18} mood="idle" animated={false} decorative />
            <span className="ml-2 font-medium text-ink">Nicx</span>
            <span className="ml-auto flex h-full items-center">
              <span className="grid h-full w-11 place-items-center"><Minus className="size-3.5" /></span>
              <span className="grid h-full w-11 place-items-center"><Square className="size-3" /></span>
              <span className="grid h-full w-11 place-items-center"><X className="size-3.5" /></span>
            </span>
          </div>

          <div className="grid md:grid-cols-[232px_1fr]">
            {/* Sidebar */}
            <div className="hidden flex-col gap-1 border-r border-line bg-surface-2/40 p-3 md:flex">
              <div className="mb-2 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] font-medium text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                <Plus className="size-3.5" />
                Nova conversa
                <Search className="ml-auto size-3.5 text-subtle" />
              </div>
              {CONVERSATIONS.map((g) => (
                <div key={g.group} className="mt-2">
                  <p className="px-2 pb-1 text-[11px] font-medium tracking-wide text-subtle uppercase">{g.group}</p>
                  {g.items.map((item, i) => (
                    <p
                      key={item}
                      className={cn(
                        'flex items-center gap-2 truncate rounded-md px-2 py-1.5 text-[13px]',
                        g.group === 'Hoje' && i === 0 ? 'bg-surface font-medium text-ink shadow-[0_0_0_1px_var(--line)]' : 'text-muted',
                      )}
                    >
                      <MessageSquare className="size-3.5 shrink-0 opacity-60" />
                      <span className="truncate">{item}</span>
                    </p>
                  ))}
                </div>
              ))}
              <div className="mt-auto flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12px] text-muted">
                <Brain className="size-3.5 text-cyan" />
                Memória: 24 lembranças
              </div>
            </div>

            {/* Conversation */}
            <div className="flex min-h-[460px] flex-col">
              <div className="flex-1 space-y-5 px-4 pt-6 pb-4 sm:px-8">
                {/* You */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[12.5px] text-ink">
                    <span className="grid size-7 place-items-center rounded-md bg-[#e5484d]/12 text-[#d93a3f]">
                      <FileText className="size-4" />
                    </span>
                    <span>
                      <span className="block font-medium">contrato-apartamento.pdf</span>
                      <span className="block text-[11px] text-subtle">PDF · 412 KB</span>
                    </span>
                  </div>
                  <p className="max-w-[440px] rounded-2xl rounded-br-md bg-bubble px-4 py-2.5 text-left text-[14px] leading-snug text-bubble-ink">
                    Lê esse contrato e me diz se tem multa se eu sair antes do prazo.
                  </p>
                </div>

                {/* Tool approval */}
                <div className="flex items-start gap-3">
                  <div className="w-7 shrink-0" />
                  <div className="w-full max-w-[520px] rounded-xl border border-line bg-surface-2/50 p-3 text-[13px]">
                    <div className="flex items-center gap-2 text-ink">
                      <ShieldCheck className="size-4 text-amber" />
                      <span className="font-medium">O Nicx quer ler um arquivo</span>
                    </div>
                    <p className="mt-1.5 truncate rounded-md border border-line bg-surface px-2 py-1 font-mono text-[12px] text-muted">
                      Documentos\contrato-apartamento.pdf
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="rounded-md border border-line px-2.5 py-1 text-[12px] text-subtle">Negar</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-canvas">
                        <Check className="size-3" strokeWidth={3} />
                        Permitido
                      </span>
                      <span className="ml-auto hidden text-[11.5px] text-subtle sm:inline">só desta vez</span>
                    </div>
                  </div>
                </div>

                {/* Nicx */}
                <div className="flex items-start gap-3">
                  <NicxMascot size={28} mood="idle" animated={false} decorative className="mt-0.5" />
                  <div className="max-w-[560px] text-left text-[14px] leading-relaxed text-ink">
                    <p className="mb-1 text-[12px] font-medium text-subtle">Nicx · agora</p>
                    <p>
                      Tem, sim. Pela <strong className="font-semibold">cláusula 12</strong>, quem sai antes dos 30
                      meses paga multa de <strong className="font-semibold">3 aluguéis</strong>, proporcional ao tempo
                      que falta.
                    </p>
                    <p className="mt-2 text-muted">
                      Saindo no mês 20, faltam 10 meses: a multa fica em cerca de{' '}
                      <strong className="font-semibold text-ink">1 aluguel</strong>. Quer que eu guarde a data de fim do
                      contrato na memória?
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] text-ink">
                        Sim, guarda
                      </span>
                      <span className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] text-muted">
                        Não precisa
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Composer */}
              <div className="px-4 pb-4 sm:px-8 sm:pb-5">
                <div className="flex items-center gap-2 rounded-2xl border border-line-strong bg-surface p-2 pl-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                  <Paperclip className="size-4 text-subtle" />
                  <span className="flex-1 truncate text-left text-[14px] text-subtle">
                    Pergunte qualquer coisa ao Nicx
                    <span className="caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-ink" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-cyan-soft text-cyan">
                    <Mic className="size-4" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-canvas">
                    <ArrowUp className="size-4" />
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-3 px-1 text-[11.5px] text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-success" />
                    Modelo local · qwen3.5:4b
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="size-3" />
                    Nada sai deste computador
                  </span>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}
