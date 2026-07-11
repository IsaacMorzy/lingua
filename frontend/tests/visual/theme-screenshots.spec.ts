import { test, expect } from '@playwright/test';

const KEY_PAGES = [
  '/',
  '/about',
  '/admissions',
  '/courses',
  '/blog',
  '/events',
  '/instructors',
  '/faq',
  '/contact',
  '/tuition-fees',
  '/dates-deadlines',
  '/financial-aid',
  '/languages',
  '/languages/english',
  '/programs/tech',
  '/programs/tech/full-stack-software-engineering',
  '/programs/professional',
  '/programs/vocational',
  '/campus',
  '/leadership',
  '/faculty',
  '/departments',
  '/how-to-apply',
  '/graduate',
  '/undergraduate',
  '/online-education',
  '/off-campus-learning',
  '/mission-values',
];

test.describe('Light theme screenshots', () => {
  KEY_PAGES.forEach((pagePath) => {
    test(`${pagePath} — light`, async ({ page }) => {
      await page.goto(pagePath);
      // Ensure no dark class
      await page.evaluate(() => document.documentElement.classList.remove('dark'));
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`${pagePath.replace(/\//g, '_') || 'index'}-light.png`);
    });
  });
});

test.describe('Dark theme screenshots', () => {
  KEY_PAGES.forEach((pagePath) => {
    test(`${pagePath} — dark`, async ({ page }) => {
      await page.goto(pagePath);
      // Add dark class
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`${pagePath.replace(/\//g, '_') || 'index'}-dark.png`);
    });
  });
});
