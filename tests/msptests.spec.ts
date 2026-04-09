import { test, expect } from '@playwright/test';

// Test to check page title and wait for page load
test('should display correct page title after load', async ({ page }) => {
    await page.goto('https://int2.synovusqa.com/pre-auth/login');
    // Wait for the page to load completely (network idle)
    await page.waitForLoadState('networkidle');
    // Expect the page title to match expected value
    await expect(page).toHaveTitle(/login/i);
    
});