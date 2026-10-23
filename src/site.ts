/** Where each page lives, honoring Vite's base path (`/nicx/` on GitHub Pages). */
export const BASE = import.meta.env.BASE_URL;

export type PageId = 'home' | 'install' | 'privacy' | 'terms' | 'notfound';

export const PAGE_HREF: Record<Exclude<PageId, 'notfound'>, string> = {
  home: BASE,
  install: `${BASE}instalacao/`,
  privacy: `${BASE}privacidade/`,
  terms: `${BASE}termos/`,
};

/** Sections of the home page linked from the header. */
export const HOME_SECTIONS = [
  { id: 'recursos', label: 'Recursos' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'privacidade', label: 'Privacidade' },
  { id: 'duvidas', label: 'Dúvidas' },
] as const;

/** Link to a home section, as an in-page anchor when already on the home page. */
export function sectionHref(page: PageId, id: string): string {
  return page === 'home' ? `#${id}` : `${PAGE_HREF.home}#${id}`;
}

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
