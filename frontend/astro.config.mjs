import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import bundleBudget from '@shiftescape/astro-bundle-budget';

// https://astro.build/config
export default defineConfig({
  outDir: '../lingua/www',
  base: '/assets/lingua/frontend/',
  build: {
    assets: 'assets',
  },
  integrations: [
    react(),
    bundleBudget({
      budgets: [
        { path: '**/*.js', budget: '300 kB' },
        { path: '**/*.css', budget: '200 kB' },
      ],
      failOnExceed: false,
      verbose: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
