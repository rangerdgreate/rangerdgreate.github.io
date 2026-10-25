import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: 'artifacts/test-results',
  reporter: 'list',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
    headless: true,
    reducedMotion: 'reduce',
  },
})
