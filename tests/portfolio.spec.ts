import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { existsSync, readFileSync } from 'node:fs'

test('all sections and links render with accurate project and resume behavior', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ranger Aganon F. Wagayen.')
  for (const id of ['home', 'about', 'skills', 'projects', 'certifications', 'resume', 'contact'])
    await expect(page.locator(`section#${id}`)).toHaveCount(1)
  const badAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .map((a) => a.getAttribute('href')!)
        .filter((href) => !document.getElementById(href.slice(1))),
    )
  expect(badAnchors).toEqual([])
  await expect(page.getByRole('link', { name: /Verify Credential/ })).toHaveCount(3)
  await expect(
    page.locator(
      'a[href*="WebGuard-Capstone"], a[href*="/cyberscan"], a[href*="/it-business-solutions"]',
    ),
  ).toHaveCount(0)
  const resume = 'public/resume/Ranger_Aganon_F_Wagayen_Resume.pdf'
  const hasResume = existsSync(resume) && readFileSync(resume).subarray(0, 5).toString() === '%PDF-'
  if (hasResume) {
    await expect(page.getByRole('link', { name: 'Download My Resume' })).toHaveAttribute(
      'href',
      '/resume/Ranger_Aganon_F_Wagayen_Resume.pdf',
    )
    await expect(page.locator('a[download]')).toHaveCount(2)
  } else {
    await expect(page.getByRole('button', { name: 'Print Resume Summary' })).toBeVisible()
    await expect(page.locator('a[download]')).toHaveCount(0)
  }
  await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveAttribute(
    'href',
    'https://github.com/rangerdgreate/stellarproject2026',
  )
  expect(errors).toEqual([])
})

test('project dialogs support keyboard dismissal, focus restoration, and all project details', async ({
  page,
}) => {
  await page.goto('/#projects')
  for (const name of ['CyberScan', 'Shopora', 'WebGuard', 'Stellar / Soroban']) {
    const opener = page.getByRole('button', { name: `Project overview : ${name}`, exact: true })
    await opener.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toContainText(name)
    await expect(dialog.getByRole('button', { name: 'Close project overview' })).toBeFocused()
    await expect(dialog).toHaveAttribute('open', '')
    if (name === 'CyberScan') await expect(dialog).toContainText('require validation')
    if (name === 'Shopora') await expect(dialog).toContainText('Electronic payments are simulated')
    if (name === 'WebGuard')
      await expect(dialog).toContainText('do not claim to have individually programmed')
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(opener).toBeFocused()
  }
})

test('mobile menu, active section indicator, and narrow layouts work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open navigation' })
  await toggle.click()
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await expect(nav).toBeVisible()
  await nav.getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(nav).not.toBeVisible()
  // Keyboard activation also avoids automation scrolling a sticky header into view.
  await page.locator('#menu-toggle').focus()
  await page.keyboard.press('Enter')
  await expect(nav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
    'aria-current',
    'location',
  )
  await page.keyboard.press('Escape')
  await expect(nav).not.toBeVisible()
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `No horizontal overflow at ${width}px`,
    ).toBe(true)
  }
})

test('desktop and mobile pages pass automated WCAG A and AA checks', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([])
  }
  await page.getByRole('button', { name: 'Project overview : CyberScan', exact: true }).click()
  const modalResult = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(
    modalResult.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([])
})

test('reduced motion disables decorative animation and print only includes the resume', async ({
  page,
}) => {
  await page.goto('/')
  expect(
    await page.locator('.orbital-two').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#resume')).toBeVisible()
  await expect(page.locator('#home')).not.toBeVisible()
  await expect(page.locator('.site-header')).not.toBeVisible()
  await expect(page.locator('.resume-print-contact')).toBeVisible()
})
