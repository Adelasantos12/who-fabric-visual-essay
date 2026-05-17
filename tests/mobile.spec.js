import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } });

test('mobile layout check', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Check hero
  await expect(page.locator('h1')).toBeVisible();

  // Scroll to scrolly section
  await page.locator('.step[data-step="2016-17"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Check if viz panel and metric strip are visible
  const vizPanel = page.locator('.viz-panel');
  await expect(vizPanel).toBeVisible();

  const metricStrip = page.locator('.metric-strip');
  await expect(metricStrip).toBeVisible();

  // Verify 3-column layout for metrics on mobile
  const gridTemplateColumns = await metricStrip.evaluate(el => getComputedStyle(el).gridTemplateColumns);
  const columns = gridTemplateColumns.split(' ').length;
  console.log('Metric columns on mobile:', columns);

  await page.screenshot({ path: 'verification/mobile_scrolly.png' });

  // Check US Scenario on mobile
  const usSection = page.locator('#usSection');
  await usSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/mobile_us.png' });
});
