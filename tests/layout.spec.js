import { test, expect } from '@playwright/test';

test('scrollytelling layout check', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.scrolly');

  // Take screenshot of scrolly section
  const scrolly = await page.locator('.scrolly');
  await scrolly.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/scrolly_layout.png' });

  // Check if viz-panel is sticky
  const vizPanel = await page.locator('.viz-panel');
  const box = await vizPanel.boundingBox();
  console.log('Viz Panel Box:', box);

  // Scroll a bit and check again
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);
  const box2 = await vizPanel.boundingBox();
  console.log('Viz Panel Box after scroll:', box2);

  await page.screenshot({ path: 'verification/scrolly_scrolled.png' });
});
