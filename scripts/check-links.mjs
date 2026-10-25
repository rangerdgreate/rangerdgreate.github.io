import { readFileSync } from 'node:fs'

const files = ['src/data/profile.ts', 'src/data/projects.ts', 'src/data/credentials.ts']
const urls = new Set(
  files.flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(/https:\/\/[^\s'"<>]+/g)].map((match) => match[0]),
  ),
)
let failed = false
for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) })
    await response.body?.cancel()
    const result = response.ok
      ? 'OK'
      : response.status === 403 || response.status === 429
        ? 'BLOCKED / MANUAL CHECK NEEDED'
        : 'CHECK REQUIRED'
    console.log(`${result} (${response.status}) ${url}`)
    if (!response.ok) failed = true
  } catch (error) {
    failed = true
    console.log(`UNVERIFIED ${url}: ${error.message}`)
  }
}
console.log(
  'HTTP success confirms reachability only; it does not authenticate a credential or validate repository contents.',
)
if (failed) process.exitCode = 1
