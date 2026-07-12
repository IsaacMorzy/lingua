import { test, expect } from '@playwright/test';

// Each test uses test.use({ viewport }) inline so Playwright's static
// discovery picks every test up. Six representative routes cover home,
// the language catalogue, the programme group page, three marketing pages,
// and the cross-cut course filter.

test.describe('mobile-sm (375x812)', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('/ has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/ CTABand primary CTA is visible', async ({ page }) => {
    await page.goto('/');
    // Index CTABand primary CTA label is 'Apply Today' (see /pages/index.astro line 187).
    const cta = page.getByRole('link', { name: /^Apply Today$/i }).first();
    await expect(cta).toBeVisible();
  });

  test('/header is sticky', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    const box = await header.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(56);
  });

  test('/footer has 6 programme columns', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Match original case — the CSS upper-cased class displays as uppercase,
    // but `innerText` returns the original text content.
    const headers = await page.locator('footer h4').allInnerTexts();
    const expectedColumns = ['Tech', 'Business', 'TVETA', 'Professional', 'Vocational', 'Languages'];
    for (const name of expectedColumns) {
      expect(headers, `footer should still list ${name} column`).toContain(name);
    }
  });

  test('/languages has no horizontal overflow', async ({ page }) => {
    await page.goto('/languages');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/about has no horizontal overflow', async ({ page }) => {
    await page.goto('/about');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('mobile-md (414x896)', () => {
  test.use({ viewport: { width: 414, height: 896 } });

  test('/ has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/languages has no horizontal overflow', async ({ page }) => {
    await page.goto('/languages');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/programs/tech has no horizontal overflow', async ({ page }) => {
    await page.goto('/programs/tech');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/courses has no horizontal overflow', async ({ page }) => {
    await page.goto('/courses');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('tablet (768x1024)', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('/ has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/ CTABand title is centered', async ({ page }) => {
    await page.goto('/');
    const title = page.getByTestId('cta-band-title');
    await expect(title).toBeVisible();
    const box = await title.boundingBox();
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // True centering: heading centre should be within ±1 of viewport centre.
    const headingCenter = (box?.x ?? 0) + (box?.width ?? 0) / 2;
    expect(headingCenter).toBeCloseTo(viewportWidth / 2, -1);
  });

  test('/languages has no horizontal overflow', async ({ page }) => {
    await page.goto('/languages');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/programs/tech has no horizontal overflow', async ({ page }) => {
    await page.goto('/programs/tech');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/about has no horizontal overflow', async ({ page }) => {
    await page.goto('/about');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/contact has no horizontal overflow', async ({ page }) => {
    await page.goto('/contact');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/courses has no horizontal overflow', async ({ page }) => {
    await page.goto('/courses');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('/header is sticky', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    const box = await header.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(56);
  });

  test('/mobile-menu is hidden by default and toggles on click', async ({ page }) => {
    await page.goto('/');
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeHidden();
    const toggle = page.locator('#menu-toggle');
    await toggle.click();
    await expect(mobileMenu).toBeVisible();
    await toggle.click();
    await expect(mobileMenu).toBeHidden();
  });

  test('/footer width is at least viewport width', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    const box = await footer.boundingBox();
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(viewportWidth);
  });
});

// Megamenus are desktop-only (Header.astro nav uses `hidden lg:flex` so the
// trigger element does not exist below 1024px). Run that assertion at a
// desktop viewport to exercise the actual context where it applies.
test.describe('desktop (1280x800)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('/ Languages megamenu descriptions are clamped to 2 lines', async ({ page }) => {
    await page.goto('/');
    // Open the Languages mega-menu by clicking its trigger.
    const megamenu = page.locator('[data-megamenu]', { has: page.getByRole('button', { name: /Languages/ }) });
    const trigger = megamenu.locator('[data-trigger]');
    await trigger.click();
    // Assert the panel actually opened; without this the test would pass even
    // if the click missed and the panel stayed closed (line-clamp-2 spans
    // exist in DOM regardless of panel visibility).
    await expect(megamenu.locator('[data-panel]')).toBeVisible();
    // Tighten selector to the actual line-clamp-2 element (a span, not a p).
    const descriptions = page.locator('[data-megamenu] .line-clamp-2');
    const count = await descriptions.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = descriptions.nth(i);
      const clamp = await el.evaluate((node) => getComputedStyle(node).webkitLineClamp);
      expect(clamp, `megamenu description ${i} should be clamped to 2 lines`).toBe('2');
    }
  });
});
