import { test, expect } from '@playwright/test';

test.describe('Checkout Suite', {
  tag: '@smoke',
}, () => {
  test('Successful Checkout', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('data-test=checkout');
    await page.fill('data-test=firstName', 'AutoQA');
    await page.fill('data-test=lastName', 'Test');
    await page.fill('data-test=postalCode', '12345');
    await page.click('data-test=continue');
    await page.click('data-test=finish');
    const confirmationMessage = await page.locator('.complete-header').textContent();
    await expect(confirmationMessage).toBe('Thank you for your order!');
  });
});