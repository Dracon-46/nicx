// Publish dist/ to the gh-pages branch, which GitHub Pages serves.
// Usage: npm run deploy (builds first).
import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const origin = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim();
const git = (...args) => execFileSync('git', args, { cwd: dist, stdio: 'inherit' });

// Without this, Pages runs Jekyll and drops files and folders starting with "_".
writeFileSync(join(dist, '.nojekyll'), '');
rmSync(join(dist, '.git'), { recursive: true, force: true });
git('init', '-q', '-b', 'gh-pages');
git('add', '-A');
// Sempre na conta pessoal, qualquer que seja o git config da máquina.
git('-c', 'user.name=Arthur G. Camzano', '-c', 'user.email=arthurgaspare@gmail.com',
    'commit', '-q', '-m', 'Publicar site');
// Authenticate with the GitHub CLI login, whatever credential helper is set.
git('-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential',
  'push', '-q', '-f', origin, 'gh-pages');
rmSync(join(dist, '.git'), { recursive: true, force: true });
console.log('Site publicado no branch gh-pages.');
