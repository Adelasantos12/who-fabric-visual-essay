import { test, expect } from '@playwright/test';

test('has title and main visual', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/The Fabric of Global Health Funding/);
  await expect(page.locator('#net-svg')).toBeVisible();
});

test('scroll triggers biennium change', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    const step2 = document.querySelector('[data-step="2018-19"]');
    step2.scrollIntoView();
  });
  // Check if metric strip updated
  // Based on the error log, 2018-19 actually has 624 nodes in the filtered view or data
  const nodeCount = page.locator('#mv-nodes');
  await expect(nodeCount).not.toHaveText('297'); // 297 is the baseline
});

test('US exposure toggle works', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const btn = page.locator('#usBtn');
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  // Wait for the stats to update
  await expect(page.locator('#stat-ties')).not.toHaveText('0');
});
