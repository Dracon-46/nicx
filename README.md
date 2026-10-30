<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/marca/falkyria-marca-branca.svg">
    <img src=".github/marca/falkyria-marca.svg" alt="Falkyria" width="220">
  </picture>
</p>

# Site do Nicx

Site público do [Nicx](https://dracon-46.github.io/nicx/), a inteligência artificial da Falkyria:
apresentação do produto, download, guia de instalação, política de privacidade e termos de uso.

## Stack

React 19, TypeScript, Vite e Tailwind CSS 4, com as páginas pré-renderizadas no build
(`src/entry-server.tsx` + `scripts/prerender.mjs`) para carregar rápido e funcionar sem JavaScript.

## Rodando

```bash
npm install
npm run dev        # servidor local
npm run build      # typecheck + build + pré-renderização em dist/
npm run deploy     # build e publicação no branch gh-pages (GitHub Pages)
```

## Licença

O site do Nicx é software proprietário da Falkyria. Todos os direitos reservados. O código está
visível apenas para consulta; veja [LICENSE](LICENSE).
