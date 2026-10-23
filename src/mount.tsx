import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import './index.css';

/** Hydrate the pre-rendered page, or render from scratch in development. */
export function mount(node: ReactNode): void {
  const root = document.getElementById('root')!;
  const app = <StrictMode>{node}</StrictMode>;
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
