import { ArrowRight } from 'lucide-react';
import { NicxMascot } from '../../components/Mascot/NicxMascot';
import { DownloadActions } from '../../components/ui/Download';
import { ButtonLink, Reveal } from '../../components/ui/primitives';
import { PAGE_HREF } from '../../site';

export function FinalCta() {
  return (
    <section className="container-site pt-28 sm:pt-36" aria-labelledby="cta-titulo">
      <Reveal>
        <div className="border-spin relative isolate overflow-hidden rounded-[32px] border border-line bg-surface px-6 pt-4 pb-14 text-center shadow-float sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_10%,transparent_75%)]" />
            <div className="absolute top-[22%] left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
          </div>
          <NicxMascot size={190} mood="idle" interactive className="mx-auto" />
          <h2
            id="cta-titulo"
            className="text-gradient mx-auto -mt-2 max-w-3xl text-[36px] leading-[1.04] font-semibold tracking-[-0.042em] text-balance sm:text-[54px]"
          >
            Sua IA. Seu computador. Suas regras<span className="text-amber [-webkit-text-fill-color:var(--amber)]">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Baixe o instalador para Windows ou instale no Mac com um comando no Terminal. Ele confere o seu computador
            e cuida do resto.
          </p>
          <DownloadActions size="lg" className="mt-9">
            <ButtonLink href={PAGE_HREF.install} variant="secondary" className="h-12 px-6 text-base">
              Como instalar
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
          </DownloadActions>
        </div>
      </Reveal>
    </section>
  );
}
