import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'

// Encode responsive copies of the supplied photo without retouching or cropping.
// The original PNG remains byte-for-byte unchanged as the image fallback.
const source = `data:image/png;base64,${readFileSync('public/assets/ranger-portrait.png').toString('base64')}`
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
try {
  const page = await browser.newPage()
  for (const width of [640, 1122]) {
    const result = await page.evaluate(
      async ({ source, width }) => {
        const image = await createImageBitmap(await (await fetch(source)).blob())
        const height = Math.round((width * image.height) / image.width)
        const canvas = new OffscreenCanvas(width, height)
        const context = canvas.getContext('2d')
        context.imageSmoothingQuality = 'high'
        context.drawImage(image, 0, 0, width, height)
        const encoded = await canvas.convertToBlob({ type: 'image/webp', quality: 0.94 })
        return { width, height, bytes: [...new Uint8Array(await encoded.arrayBuffer())] }
      },
      { source, width },
    )
    const filename = `public/assets/ranger-portrait-${width}.webp`
    const buffer = Buffer.from(result.bytes)
    writeFileSync(filename, buffer)
    console.log(
      `${filename}: ${result.width} × ${result.height}, ${Math.round(buffer.length / 1024)} KB`,
    )
  }
} finally {
  await browser.close()
}
