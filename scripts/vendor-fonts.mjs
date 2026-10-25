import { mkdirSync, writeFileSync } from 'node:fs'

const fonts = [
  {
    family: 'DM Sans',
    query: 'DM+Sans:wght@400..700',
    directory: 'dmsans',
    filename: 'dm-sans-latin.woff2',
    weight: '400 700',
  },
  {
    family: 'Manrope',
    query: 'Manrope:wght@400..800',
    directory: 'manrope',
    filename: 'manrope-latin.woff2',
    weight: '400 800',
  },
  {
    family: 'IBM Plex Mono',
    query: 'IBM+Plex+Mono:wght@400;500',
    directory: 'ibmplexmono',
    filename: 'ibm-plex-mono-latin.woff2',
    weight: '400',
  },
]
mkdirSync('public/assets/fonts', { recursive: true })
const css = []
for (const font of fonts) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${font.query}&display=swap`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      },
    },
  )
  if (!response.ok) throw new Error(`Font CSS: ${response.status}`)
  const stylesheet = await response.text()
  const latin = [...stylesheet.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)].map(
    (match) => match[1],
  )
  if (!latin.length) throw new Error(`Missing Latin font for ${font.family}`)
  const block = latin[0]
  const url = block.match(/url\(([^)]+)\)/)?.[1]
  if (!url) throw new Error(`Missing URL for ${font.family}`)
  const data = await fetch(url)
  if (!data.ok) throw new Error(`Font download: ${data.status}`)
  writeFileSync(`public/assets/fonts/${font.filename}`, Buffer.from(await data.arrayBuffer()))
  const declaredWeight = block.match(/font-weight:\s*([^;]+)/)?.[1] || font.weight
  css.push(
    `@font-face{font-family:'${font.family}';font-style:normal;font-weight:${declaredWeight};font-display:swap;src:url('/assets/fonts/${font.filename}') format('woff2')}`,
  )
  const license = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${font.directory}/OFL.txt`,
  )
  if (!license.ok) throw new Error(`License download: ${license.status}`)
  writeFileSync(`public/assets/fonts/${font.directory}-OFL.txt`, await license.text())
  console.log(`Vendored ${font.family} Latin font and original license`)
}
writeFileSync('src/styles/fonts.css', `${css.join('\n')}\n`)
