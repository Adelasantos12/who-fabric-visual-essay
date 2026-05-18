import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } });

test('verify mobile article link visibility and clickability', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const btn = page.locator('a:has-text("Read the full article")');
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible();

  const box = await btn.boundingBox();
  console.log('Mobile button bounding box:', box);

  await btn.click();
  console.log('Clicked on mobile');
});
