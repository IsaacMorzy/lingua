import { rmSync, mkdirSync, renameSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const wwwDir = resolve(root, 'lingua/www');
const publicFrontendDir = resolve(root, 'lingua/public/frontend');

// Clean www output (keep directory)
for (const entry of ['index.html', 'content-assets.mjs', 'content-modules.mjs']) {
  const path = resolve(wwwDir, entry);
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

// Clean old assets
const assetsDir = resolve(publicFrontendDir, 'assets');
if (existsSync(assetsDir)) {
  rmSync(assetsDir, { recursive: true, force: true });
}

// Move new assets
const builtAssetsDir = resolve(wwwDir, 'assets');
if (existsSync(builtAssetsDir)) {
  mkdirSync(publicFrontendDir, { recursive: true });
  renameSync(builtAssetsDir, assetsDir);
}
