import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NicxMascot } from '../components/Mascot/NicxMascot';
import { Shell } from '../components/Shell';
import { ButtonLink } from '../components/ui/primitives';
import { PAGE_HREF } from '../site';

export function NotFoundPage() {
  return (
    <Shell page="notfound">
      <section className="container-site flex flex-col items-center pt-10 pb-8 text-center sm:pt-16">
        <NicxMascot size={220} mood="error" interactive className="rise" />
        <p className="rise mt-2 font-mono text-[13px] text-subtle" style={{ animationDelay: '60ms' }}>
          Erro 404
        </p>
        <h1
          className="rise text-gradient mt-3 max-w-2xl text-[40px] leading-[1.04] font-semibold tracking-[-0.042em] text-balance sm:text-[56px]"
          style={{ animationDelay: '120ms' }}
        >
          Essa página não existe<span className="text-amber [-webkit-text-fill-color:var(--amber)]">.</span>
        </h1>
        <p className="rise mt-5 max-w-md text-[17px] leading-relaxed text-muted" style={{ animationDelay: '180ms' }}>
          O Nicx procurou em todo canto e não achou nada aqui. O link pode estar errado, ou a página mudou de lugar.
        </p>
        <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
          <ButtonLink href={PAGE_HREF.home} className="h-12 px-6 text-base">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para o início
          </ButtonLink>
          <ButtonLink href={PAGE_HREF.install} variant="secondary" className="h-12 px-6 text-base">
            Como instalar
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </Shell>
  );
}
