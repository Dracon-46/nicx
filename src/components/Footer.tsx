import { HOME_SECTIONS, PAGE_HREF, sectionHref, type PageId } from '../site';
import { FalkyriaLogo, FALKYRIA_URL } from './FalkyriaLogo';
import { Logo } from './Header';

export function Footer({ page }: { page: PageId }) {
  const columns = [
    {
      title: 'Nicx',
      links: [
        ...HOME_SECTIONS.map((s) => ({ href: sectionHref(page, s.id), label: s.label })),
        { href: sectionHref(page, 'requisitos'), label: 'Requisitos' },
      ],
    },
    {
      title: 'Começar',
      links: [
        { href: PAGE_HREF.install, label: 'Como instalar' },
        { href: `${PAGE_HREF.install}#depois`, label: 'Primeiros passos' },
        { href: `${PAGE_HREF.install}#problemas`, label: 'Solução de problemas' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: PAGE_HREF.privacy, label: 'Política de privacidade' },
        { href: PAGE_HREF.terms, label: 'Termos de uso' },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="container-site grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="flex flex-col items-start gap-4">
          <Logo className="-ml-1 px-1 py-1" />
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">
            A inteligência artificial da Falkyria. Roda no seu computador, fala português e não conta
            os seus segredos para ninguém.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[13px] font-medium text-ink">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Falkyria. Todos os direitos reservados.</p>
          <a
            href={FALKYRIA_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <FalkyriaLogo className="h-5 w-auto text-ink" />
            Um produto Falkyria, feito no Brasil.
          </a>
        </div>
      </div>
    </footer>
  );
}
