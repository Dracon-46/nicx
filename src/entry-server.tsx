import { StrictMode, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { HomePage } from './pages/HomePage';
import { InstallPage } from './pages/InstallPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage, TermsPage } from './pages/legal-docs';

const PAGES: Record<string, () => ReactNode> = {
  'index.html': () => <HomePage />,
  'instalacao/index.html': () => <InstallPage />,
  'privacidade/index.html': () => <PrivacyPage />,
  'termos/index.html': () => <TermsPage />,
  '404.html': () => <NotFoundPage />,
};

/** Pre-render a page to HTML at build time; the browser hydrates it. */
export function render(file: string): string {
  const page = PAGES[file];
  if (!page) throw new Error(`Página desconhecida: ${file}`);
  return renderToString(<StrictMode>{page()}</StrictMode>);
}

export const files = Object.keys(PAGES);
