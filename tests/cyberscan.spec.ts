import { expect, test } from '@playwright/test'
import { cyberscanDemoUrl } from '../src/data/liveDemos'

const demoUrl = process.env.CYBERSCAN_DEMO_TEST_URL

test('CyberScan card uses the verified live URL and secure new-tab attributes', async ({ page }) => {
  test.setTimeout(120_000)
  await page.goto('/#projects')
  const link = page.locator('.project-cyberscan').getByRole('link', { name: /Visit Website/ })
  if (!cyberscanDemoUrl) {
    await expect(link).toHaveCount(0)
    return
  }
  await expect(link).toHaveAttribute('href', cyberscanDemoUrl)
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect(link).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No portfolio overflow at ${width}px`).toBe(true)
    const opened = page.waitForEvent('popup')
    await link.click()
    const popup = await opened
    await popup.waitForLoadState('domcontentloaded')
    expect(new URL(popup.url()).origin).toBe(new URL(cyberscanDemoUrl).origin)
    await expect(popup).toHaveTitle(/CyberScan/i)
    await expect(popup.locator('body')).toContainText('CyberScan')
    await popup.close()
  }
})

test('CyberScan demo supports dashboard, findings, reports and mobile layouts', async ({ page }) => {
  test.skip(!demoUrl, 'Set CYBERSCAN_DEMO_TEST_URL to a running demo deployment.')
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${demoUrl}/dashboard`)
  await expect(page.locator('.demo-banner')).toContainText('Sample data')
  await expect(page.locator('[data-total-scans]')).toHaveText('1')
  await page.goto(`${demoUrl}/results`)
  await expect(page.locator('[data-findings-table] tr')).toHaveCount(4)
  await page.getByRole('button', { name: 'View Details' }).first().click()
  await expect(page.locator('[data-detail-title]')).toContainText('Content Security Policy')
  await expect(page.locator('[data-detail-status]')).toBeDisabled()
  await page.goto(`${demoUrl}/new-scan`)
  await expect(page.getByRole('button', { name: 'Start Scan', exact: true })).toBeDisabled()
  await page.goto(`${demoUrl}/reports`)
  await page.getByRole('button', { name: 'View Sample Report' }).first().click()
  await expect(page).toHaveURL(/\/demo-reports\/sample.html$/)
  await expect(page.locator('main')).toContainText('SAMPLE DATA')
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(`${demoUrl}/dashboard`)
    await expect(page.locator('[data-total-scans]')).toHaveText('1')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No CyberScan overflow at ${width}px`).toBe(true)
  }
  expect(errors).toEqual([])
})
