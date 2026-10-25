import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

mkdirSync('artifacts', { recursive: true })
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  })
  await page.goto('http://127.0.0.1:4173')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true })
  await page.screenshot({ path: 'artifacts/desktop-hero.png' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true })
  await page.screenshot({ path: 'artifacts/mobile-hero.png' })
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.goto('http://127.0.0.1:4173/assets/social-preview.svg')
  await page.screenshot({ path: 'public/assets/social-preview.png' })
  console.log('Saved desktop/mobile QA screenshots and the social preview PNG.')
} finally {
  await browser.close()
}
