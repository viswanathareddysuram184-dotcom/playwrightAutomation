import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  retries: 1,
fullyParallel: true,
  workers: 1,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
    
  },
  projects: [
  
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
});
