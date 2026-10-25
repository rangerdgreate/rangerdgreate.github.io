import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = (path) => readFileSync(resolve(root, path), 'utf8')
const walk = (directory) =>
  readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`],
  )
const files = walk('src').filter((file) => /\.(tsx?|css)$/.test(file))
const source = files.map(read).join('\n')
const ids = new Set([...source.matchAll(/\bid="([a-z][\w-]*)"/g)].map((match) => match[1]))
for (const anchor of source.matchAll(/(?:href=|: )['"]#([a-z][\w-]*)['"]/g))
  assert(ids.has(anchor[1]), `Missing anchor: #${anchor[1]}`)
for (const id of ['home', 'about', 'skills', 'projects', 'certifications', 'resume', 'contact'])
  assert(ids.has(id), `Missing section: ${id}`)
for (const file of files)
  for (const tag of read(file).matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
    assert(tag[0].includes('rel="noopener noreferrer"'), `Unsafe external link in ${file}`)
assert(
  !/https:\/\/github\.com\/rangerdgreate\/(?:cyberscan|it-business-solutions|WebGuard-Capstone)/i.test(
    source,
  ),
  'Private repositories must not be linked',
)
assert(!/linkedin\.com|href="#"/.test(source), 'Unsupported or placeholder link')
assert(
  read('src/sections/Hero.tsx').includes('__RESUME_AVAILABLE__'),
  'Hero download must be conditional',
)
assert(
  read('src/sections/Resume.tsx').includes('__RESUME_AVAILABLE__'),
  'Resume download must be conditional',
)
const resume = resolve(root, 'public/resume/Ranger_Aganon_F_Wagayen_Resume.pdf')
if (existsSync(resume))
  assert(readFileSync(resume).subarray(0, 5).toString() === '%PDF-', 'Resume must be a PDF')
const credentials = read('src/data/credentials.ts')
assert.equal(
  [
    ...credentials.matchAll(
      /https:\/\/catalog-education\.oracle\.com\/ords\/certview\/sharebadge_m\?id=[A-F0-9]{64}/g,
    ),
  ].length,
  3,
  'Expected three official credential URLs',
)
assert(read('vite.config.ts').includes("base: '/'"), 'Expected root base path')
assert(
  read('.github/workflows/deploy.yml').includes('path: dist'),
  'Deploy the compiled dist artifact',
)
for (const file of files)
  assert(
    !/(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|mongodb(?:\+srv)?:\/\/[^\s]+:[^\s]+@)/.test(
      read(file),
    ),
    `Potential secret in ${file}`,
  )
assert(
  existsSync(resolve(root, 'public/assets/social-preview.png')),
  'Missing social preview asset',
)
console.log(
  `Content checks passed: ${files.length} source files; navigation, external-link configuration, private repository exclusion, credential URLs, resume guard, deployment configuration, and common secret patterns.`,
)
console.log(
  `Resume PDF: ${existsSync(resume) ? 'present' : 'not supplied; accessible summary and print fallback enabled'}.`,
)
