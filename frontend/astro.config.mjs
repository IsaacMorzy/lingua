import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  outDir: '../lingua/www',
  base: '/assets/lingua/frontend/',
  build: {
    assets: 'assets',
  },
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
