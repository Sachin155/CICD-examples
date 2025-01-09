import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  grep: /.*/,
  retries: 1,
  outputDir: 'reports/test-results',
});