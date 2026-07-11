import { mkdirSync, renameSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const wwwDir = resolve(root, 'lingua/www');
const publicFrontendDir = resolve(root, 'lingua/public/frontend');

const builtAssetsDir = resolve(wwwDir, 'assets');
const assetsDir = resolve(publicFrontendDir, 'assets');

if (existsSync(builtAssetsDir)) {
  mkdirSync(publicFrontendDir, { recursive: true });
  renameSync(builtAssetsDir, assetsDir);
}

// Copy public assets (favicon, og-image) from www to public/frontend
const publicFiles = ['favicon.svg', 'og-image.png'];
for (const file of publicFiles) {
  const source = resolve(wwwDir, file);
  const dest = resolve(publicFrontendDir, file);
  if (existsSync(source)) {
    renameSync(source, dest);
  }
}

// Mirror Astro public/images/* to lingua/public/frontend/images/* so static
// images downloaded by build hooks resolve at runtime under
// /assets/lingua/frontend/images/... (matches base URL prefix).
const builtImagesDir = resolve(wwwDir, 'images');
const imagesDir = resolve(publicFrontendDir, 'images');
if (existsSync(builtImagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
  for (const entry of readdirSync(builtImagesDir)) {
    const source = resolve(builtImagesDir, entry);
    const dest = resolve(imagesDir, entry);
    renameSync(source, dest);
  }
}
