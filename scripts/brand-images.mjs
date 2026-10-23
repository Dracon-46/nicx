// Generates the favicons and the social preview image (Open Graph / Twitter,
// 1200x630) from the mascot in brand/nicx-mascot.svg, using a local Chrome or
// Edge in headless mode. Run with `npm run brand` after the mascot changes.
//
//   CHROME=/caminho/para/chrome npm run brand   (if Chrome is not found)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome não encontrado. Defina a variável CHROME.');

const mascot = readFileSync(join(root, 'brand/nicx-mascot.svg'), 'utf-8');
const font = readFileSync(
  join(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'),
).toString('base64');

const work = mkdtempSync(join(tmpdir(), 'nicx-brand-'));

function shoot(name, html, width, height, transparent = false) {
  const page = join(work, `${name}.html`);
  writeFileSync(page, html, 'utf-8');
  const out = join(pub, name);
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    ...(transparent ? ['--default-background-color=00000000'] : []),
    `--screenshot=${out}`,
    pathToFileURL(page).href,
  ], { stdio: 'ignore' });
  console.log(`gerado: public/${name}`);
}

const base = (body, css = '') => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden}
body{font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}${css}
</style></head><body>${body}</body></html>`;

// Favicons: the mascot alone, transparent; Apple's icon needs a solid tile.
writeFileSync(join(pub, 'favicon.svg'), mascot, 'utf-8');
console.log('gerado: public/favicon.svg');
const icon = (size, pad, bg) =>
  base(
    `<div class="t">${mascot}</div>`,
    `body{background:${bg}}.t{width:${size}px;height:${size}px;padding:${pad}px;display:grid;place-items:center}
     .t svg{width:100%;height:100%}`,
  );
shoot('favicon-32.png', icon(32, 0, 'transparent'), 32, 32, true);
shoot(
  'apple-touch-icon.png',
  icon(180, 18, 'radial-gradient(circle at 50% 40%,#ffffff 0%,#e9fbfd 55%,#cdeff5 100%)'),
  180,
  180,
);

// Social preview, 1200x630.
shoot(
  'og-image.png',
  base(
    `<div class="card">
      <div class="glow"></div><div class="dots"></div>
      <div class="mascot">${mascot}</div>
      <div class="copy">
        <p class="pill"><span></span>Em breve para Windows</p>
        <h1>Nicx</h1>
        <h2>a IA da Falkyria</h2>
        <p class="lead">Sua IA, no seu computador. Privada, sem custo por uso e em português.</p>
      </div>
    </div>`,
    `body{background:#121211}
     .card{position:relative;width:1200px;height:630px;overflow:hidden;background:#121211;color:#f4f4f1;display:flex;align-items:center;padding:0 88px 0 70px;gap:28px}
     .glow{position:absolute;left:-120px;top:-40px;width:760px;height:760px;border-radius:50%;background:radial-gradient(closest-side,rgba(70,227,245,.30),rgba(28,92,171,.14) 55%,transparent)}
     .dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.3px);background-size:24px 24px;-webkit-mask-image:radial-gradient(ellipse 60% 70% at 30% 50%,#000 20%,transparent 75%)}
     .mascot{position:relative;width:470px;height:470px;flex:none;margin-top:10px}
     .mascot svg{width:100%;height:100%}
     .copy{position:relative}
     .pill{display:inline-flex;align-items:center;gap:10px;font-size:22px;color:#a3a297;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 18px;margin-bottom:26px}
     .pill span{width:10px;height:10px;border-radius:50%;background:#eda100}
     h1{font-size:150px;line-height:.9;font-weight:650;letter-spacing:-.05em}
     h1 i{font-style:normal;color:#eda100}
     h2{font-size:54px;line-height:1.1;font-weight:550;letter-spacing:-.035em;color:#d9d8d2;margin-top:14px}
     .lead{font-size:26px;line-height:1.4;color:#a3a297;margin-top:26px;max-width:540px}`,
  ),
  1200,
  630,
);

rmSync(work, { recursive: true, force: true });
