import { rmSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const wwwDir = resolve(root, 'lingua/www');
const publicFrontendDir = resolve(root, 'lingua/public/frontend');

// Remove old build output from www/ (keep directory)
if (existsSync(wwwDir)) {
  rmSync(wwwDir, { recursive: true, force: true });
}
mkdirSync(wwwDir, { recursive: true });

// Remove old assets
const assetsDir = resolve(publicFrontendDir, 'assets');
if (existsSync(assetsDir)) {
  rmSync(assetsDir, { recursive: true, force: true });
}
