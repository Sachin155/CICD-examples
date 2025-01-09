import { test, expect } from '@playwright/test';

test.describe('Cart Suite', () => {
  test('Add Product to Cart', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    const cartCount = await page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText('1');
  });

  test('Remove Product from Cart', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    await page.click('data-test=remove-sauce-labs-backpack');
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  });
});test.describe('Cart Suite', () => {
  test('Add a product to the cart', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('1');
  });

  test('Remove a product from the cart (inside cart)', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('data-test=remove-sauce-labs-backpack');
    const cartItems = await page.locator('.cart_item');
    expect(await cartItems.count()).toBe(0);
  });

  test('Validate product details in the cart', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('data-test=add-to-cart-sauce-labs-backpack');
    await page.click('data-test=add-to-cart-sauce-labs-bike-light');
    await page.click('.shopping_cart_link');

    const products = await page.locator('.cart_item');
    expect(await products.count()).toBe(2);

    const firstProductName = await products.nth(0).locator('.inventory_item_name').textContent();
    const firstProductPrice = await products.nth(0).locator('.inventory_item_price').textContent();
    expect(firstProductName).toBe('Sauce Labs Backpack');
    expect(firstProductPrice).toBe('$29.99');

    const secondProductName = await products.nth(1).locator('.inventory_item_name').textContent();
    const secondProductPrice = await products.nth(1).locator('.inventory_item_price').textContent();
    expect(secondProductName).toBe('Sauce Labs Bike Light');
    expect(secondProductPrice).toBe('$9.99');
  });
});