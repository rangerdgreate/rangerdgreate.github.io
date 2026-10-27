import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { existsSync, readFileSync } from 'node:fs'

test('Shopora card and overview link safely to the verified public demo', async ({ page }) => {
  await page.goto('/#projects')
  const card = page.locator('.project-shopora')
  const link = card.getByRole('link', { name: /Visit Website/ })
  await expect(link).toHaveAttribute('href', 'https://resonant-fudge-df3c7e.netlify.app/')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(card).toContainText('Private repository')
  await expect(card.getByRole('link', { name: /Visit Website/ })).toHaveCount(1)
  await card.getByRole('button', { name: /Project overview/ }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('link', { name: /Visit Website/ })).toHaveAttribute('href', 'https://resonant-fudge-df3c7e.netlify.app/')
  await expect(dialog).toContainText('frontend-only portfolio demo')
  await expect(dialog).toContainText('No real accounts, payments, deliveries, email, or GPS operations')
})

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
      'a[href*="github.com/rangerdgreate/WebGuard-Capstone"], a[href*="github.com/rangerdgreate/cyberscan"], a[href*="github.com/rangerdgreate/it-business-solutions"]',
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
    await page
      .locator('.hero-name-reveal')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
  await expect(page.locator('.portrait-reveal')).toHaveCSS('opacity', '1')
  await expect(page.locator('.portrait-tilt')).toHaveCSS('transform', 'none')
  await expect(page.locator('.portrait-composition')).not.toHaveAttribute('data-motion', 'enabled')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#resume')).toBeVisible()
  await expect(page.locator('#home')).not.toBeVisible()
  await expect(page.locator('.site-header')).not.toBeVisible()
  await expect(page.locator('.resume-print-contact')).toBeVisible()
})

test('portrait loads at its original proportions and settles after the cinematic entrance', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const photo = page.getByRole('img', { name: /Professional portrait of Ranger Aganon F. Wagayen/ })
  await expect(photo).toBeVisible()
  await expect(photo).toHaveAttribute('width', '1122')
  await expect(photo).toHaveAttribute('height', '1402')
  await expect(photo).toHaveJSProperty('complete', true)
  expect(await photo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
  expect(await photo.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(
    /ranger-portrait-(640|1122)\.webp$/,
  )
  await expect(page.locator('.portrait-reveal')).toHaveCSS('opacity', '1')
  await expect(photo).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  const bounds = await photo.boundingBox()
  expect(bounds!.width / bounds!.height).toBeCloseTo(1122 / 1402, 2)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ranger Aganon F. Wagayen.')
  await expect(page.locator('.hero-hello')).toHaveText('Hi, I’m Ranger.')
})

test('portrait responds gently to desktop pointer and scroll, and disables motion on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const portrait = page.locator('.portrait-composition')
  await expect(portrait).toHaveAttribute('data-motion', 'enabled')
  const box = (await portrait.boundingBox())!
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.3)
  await expect
    .poll(async () =>
      portrait.evaluate((el) => parseFloat(el.style.getPropertyValue('--portrait-rotate-y'))),
    )
    .toBeGreaterThan(1)
  await page.mouse.move(10, 100)
  await expect
    .poll(async () =>
      portrait.evaluate((el) =>
        Math.abs(parseFloat(el.style.getPropertyValue('--portrait-rotate-y'))),
      ),
    )
    .toBeLessThan(0.1)
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }))
  await expect
    .poll(async () =>
      portrait.evaluate((el) => parseFloat(el.style.getPropertyValue('--portrait-scroll'))),
    )
    .toBeGreaterThan(0)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(portrait).not.toHaveAttribute('data-motion', 'enabled')
  expect(await portrait.evaluate((el) => el.style.getPropertyValue('--portrait-scroll'))).toBe('')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.portrait-tilt')).toHaveCSS('transform', 'none')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
