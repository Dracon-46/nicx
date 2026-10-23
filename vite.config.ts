import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { marked, type Tokens } from 'marked';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';

/** Public address of the site (GitHub Pages). */
export const SITE_URL = 'https://dracon-46.github.io/nicx/';
const BASE = '/nicx/';

const PAGES = {
  home: 'index.html',
  instalacao: 'instalacao/index.html',
  privacidade: 'privacidade/index.html',
  termos: 'termos/index.html',
  notfound: '404.html',
};

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Imports a Markdown file as `{ title, version, html, headings }`, converted
 * at build time: no Markdown parser ships to the browser.
 */
function markdownPages(): Plugin {
  return {
    name: 'nicx-markdown',
    enforce: 'pre',
    load(id) {
      if (!id.endsWith('.md')) return null;
      const source = readFileSync(id, 'utf-8');
      const tokens = marked.lexer(source);
      let title = '';
      let version = '';
      const headings: { id: string; text: string }[] = [];
      const kept = Object.assign(tokens.filter((tok) => {
        if (tok.type === 'heading' && tok.depth === 1 && !title) {
          title = tok.text;
          return false;
        }
        if (!version && tok.type === 'paragraph' && /^\*\*Vers[aã]o /.test(tok.raw)) {
          version = tok.text.replace(/\*/g, '').trim();
          return false;
        }
        return true;
      }), { links: tokens.links });

      const renderer = new marked.Renderer();
      renderer.heading = function ({ tokens: inline, depth, text }: Tokens.Heading) {
        const body = this.parser.parseInline(inline);
        if (depth === 2) {
          const id = slugify(text);
          headings.push({ id, text });
          return `<h2 id="${id}">${body}</h2>\n`;
        }
        return `<h${depth}>${body}</h${depth}>\n`;
      };
      const table = renderer.table.bind(renderer);
      renderer.table = (tok: Tokens.Table) => `<div class="prose-table">${table(tok)}</div>\n`;

      const html = marked.parser(kept, { renderer, gfm: true });
      return `export default ${JSON.stringify({ title, version, html, headings })};`;
    },
  };
}

/** Head tags every page shares: theme bootstrap, icons, social cards, font preload. */
function sharedHead(): Plugin {
  const themeScript = `(function(){var r=document.documentElement;r.classList.add('js');try{var s=localStorage.getItem('nicx-theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.classList.add(d?'dark':'light')}catch(e){}})();`;
  return {
    name: 'nicx-shared-head',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const tags: HtmlTagDescriptor[] = [
          { tag: 'script', children: themeScript, injectTo: 'head-prepend' },
          { tag: 'meta', attrs: { name: 'color-scheme', content: 'light dark' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'theme-color', content: '#f6f6f4', media: '(prefers-color-scheme: light)' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'theme-color', content: '#121211', media: '(prefers-color-scheme: dark)' }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'icon', href: `${BASE}favicon.svg`, type: 'image/svg+xml' }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'icon', href: `${BASE}favicon-32.png`, sizes: '32x32', type: 'image/png' }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:site_name', content: 'Nicx' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}og-image.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Nicx, o slime ciano da Falkyria, ao lado do texto “Nicx, a IA da Falkyria”' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE_URL}og-image.png` }, injectTo: 'head' },
        ];
        // Preload the Latin subset of Geist so the first paint uses the right font.
        const font = Object.keys(ctx.bundle ?? {}).find((f) => /geist-latin-wght-normal.*\.woff2$/.test(f));
        if (font) {
          tags.push({
            tag: 'link',
            attrs: { rel: 'preload', href: `${BASE}${font}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          });
        }
        return tags;
      },
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  base: BASE,
  plugins: [markdownPages(), react(), tailwindcss(), sharedHead()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rolldownOptions: isSsrBuild
      ? {}
      : { input: Object.fromEntries(Object.entries(PAGES).map(([k, v]) => [k, resolve(import.meta.dirname, v)])) },
  },
}));
