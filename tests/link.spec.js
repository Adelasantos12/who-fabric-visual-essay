import { test, expect } from '@playwright/test';

test('verify article link visibility and clickability', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const btn = page.locator('a:has-text("article")');
  await btn.last().scrollIntoViewIfNeeded();
  await expect(btn.last()).toBeVisible();

  const box = await btn.last().boundingBox();
  console.log('Button bounding box:', box);

  const isClickable = await btn.last().isEnabled();
  console.log('Is clickable:', isClickable);

  const href = await btn.last().getAttribute('href');
  console.log('Href:', href);
});
