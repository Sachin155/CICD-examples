import { test, expect } from '@playwright/test';

test.describe('Login Suite', () => {
  test('Successful login with a standard user', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Logout', {
    tag: '@smoke',
  }, async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL('/');
    const loginButton = await page.locator('#login-button');
    await expect(loginButton).toBeVisible();
  });

  test('Login with locked-out user', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Successful login with a problem user', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'problem_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('/inventory.html');

    // Check for broken images
    const images = await page.locator('.inventory_item_img img').evaluateAll((imgs) => {
      return imgs.filter(img => !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalHeight === 0);
    });
    });

  test('Successful login with a performance glitch user', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('/inventory.html');
    const navigationTiming = await page.evaluate(() => {
      const { loadEventEnd, navigationStart } = performance.timing;
      return loadEventEnd - navigationStart;
    });

    expect(navigationTiming).toBeGreaterThan(100);
    });

  test('Login without a username', async ({ page }) => {
    await page.goto('/');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe('Epic sadface: Username is required');
  });

  test('Login without a password', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe('Epic sadface: Password is required');
  });

  test('Login with Invalid Credentials', {
    tag: '@smoke',
  }, async ({ page }) => { 
    await page.goto('/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });
});