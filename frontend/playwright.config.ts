import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  timeout: 30000,
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  use: {
    baseURL: 'http://localhost:8765',
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: 'python3 -m http.server 8765 --directory /tmp/lingua-test',
    port: 8765,
    reuseExistingServer: true,
  },
});

// Mobile responsive viewports are configured per-test via `test.use({ viewport: ... })`
// in a dedicated `tests/visual/mobile-responsive.spec.ts`. Keeping them out of
// `projects` avoids invalidating the existing theme-screenshots snapshots by
// running every desktop screenshot test under every mobile breakpoint.
