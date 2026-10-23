// Fills each built HTML page with its server-rendered markup, so the content
// is there before any JavaScript runs (fast first paint, search engines,
// visitors without JavaScript). The browser then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, '.ssr');

const { render, files } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

for (const file of files) {
  const path = join(dist, file);
  const html = await readFile(path, 'utf-8');
  if (!html.includes('<!--app-->')) throw new Error(`${file}: marcador <!--app--> não encontrado`);
  await writeFile(path, html.replace('<!--app-->', render(file)), 'utf-8');
  console.log(`pré-renderizado: ${file}`);
}

await rm(ssrDir, { recursive: true, force: true });
