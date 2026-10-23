import { ArrowRight, BarChart3, Check, FileText, HardDrive, Mic, MessagesSquare, Scale, Settings2, Trash2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal, SectionHeader, SpotlightCard } from '../../components/ui/primitives';
import { PAGE_HREF } from '../../site';

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-3 text-[15px] leading-snug text-ink">
      <span className="mt-px grid size-6 shrink-0 place-items-center rounded-md bg-surface-2 text-muted">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function Mark({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14.5px] leading-snug text-muted">
      <span
        className={
          ok
            ? 'mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-success/15 text-success'
            : 'mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-[#e5484d]/12 text-[#d93a3f] dark:text-[#ff8a7a]'
        }
        aria-hidden="true"
      >
        {ok ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Privacy() {
  return (
    <section id="privacidade" className="container-site pt-28 sm:pt-36" aria-labelledby="privacidade-titulo">
      <SectionHeader
        id="privacidade-titulo"
        eyebrow="Privacidade e LGPD"
        title="O que é seu fica com você."
        lead="O Nicx foi feito para funcionar sem mandar o seu conteúdo para ninguém. Nem para a Falkyria."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
              <HardDrive className="size-4 text-cyan" aria-hidden="true" />
              Sempre
            </p>
            <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.025em] text-ink">Fica só no seu computador</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              <Row icon={<MessagesSquare className="size-3.5" />}>Conversas, perguntas e respostas</Row>
              <Row icon={<FileText className="size-3.5" />}>Arquivos, documentos indexados e memórias</Row>
              <Row icon={<Mic className="size-3.5" />}>Áudio do microfone e a voz do Nicx</Row>
              <Row icon={<Settings2 className="size-3.5" />}>Configurações e chaves de serviços que você conectar</Row>
            </ul>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Tudo isso é processado e guardado na pasta de dados do Nicx, no seu PC. A Falkyria não tem acesso a
              nada disso.
            </p>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.08}>
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
              <BarChart3 className="size-4 text-amber" aria-hidden="true" />
              Opcional
            </p>
            <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.025em] text-ink">Só se você permitir</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Com o seu consentimento, o Nicx envia <strong className="font-medium text-ink">estatísticas anônimas de uso</strong>{' '}
              para a gente melhorar o programa:
            </p>
            <ul className="mt-4 grid gap-2.5">
              <Mark ok>Quais recursos você usa, tempos de resposta e tipos de erro</Mark>
              <Mark ok>Guardadas no Brasil (São Paulo) e apagadas após 24 meses</Mark>
              <Mark ok>Recusar não muda nada no Nicx</Mark>
              <Mark ok={false}>Nunca o conteúdo do que você escreve, seus arquivos, nome ou e‑mail</Mark>
            </ul>

            {/* The real controls, in miniature. */}
            <div className="mt-6 rounded-2xl border border-line bg-surface-2/60 p-4" aria-hidden="true">
              <p className="text-[12px] font-medium text-subtle">Configurações → Privacidade</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-[14px] text-ink">Ajude a melhorar o Nicx</span>
                <span className="relative h-6 w-10 shrink-0 rounded-full bg-line-strong">
                  <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-surface shadow-[0_1px_3px_rgb(0_0_0/0.25)]" />
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-[13px] font-medium text-[#c4302b] dark:text-[#ff8a7a]">
                <Trash2 className="size-3.5" />
                Apagar meus dados
              </span>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      <Reveal className="mt-4">
        <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <Scale className="size-5" aria-hidden="true" />
          </span>
          <p className="flex-1 text-[15px] leading-relaxed text-muted">
            <strong className="font-medium text-ink">Do jeito que a LGPD pede.</strong> O consentimento é opcional,
            explícito e pode ser revogado a qualquer momento, e o botão “Apagar meus dados” exclui dos servidores
            tudo o que a sua instalação já enviou.
          </p>
          <a
            href={PAGE_HREF.privacy}
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-medium text-accent"
          >
            Política de privacidade
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
