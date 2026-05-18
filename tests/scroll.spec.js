import { test, expect } from '@playwright/test';

test('scrollytelling interaction check', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.scrolly');

  const steps = ['2016-17', '2018-19', '2020-21', '2022-23', '2024-25'];

  for (const step of steps) {
    console.log('Testing step:', step);
    const stepEl = page.locator(`.step[data-step="${step}"]`);
    await stepEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for transition

    // Check if metric strip is visible (it should be for these steps)
    const metricStrip = page.locator('#metricStrip');
    await expect(metricStrip).toBeVisible();

    // Take a screenshot of each state
    await page.screenshot({ path: `verification/step_${step}.png` });
  }
});
