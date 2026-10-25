import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'

const url = new URL(process.argv[2] || '')
assert(url.protocol === 'https:', 'Use the actual HTTPS URL assigned by your host.')
assert(!url.username && !url.password && !url.port && url.pathname === '/' && !url.search && !url.hash,
  'Supply only the public application origin, without credentials or extra paths.')
assert(!/^(localhost|127\.|\[|0\.)/.test(url.hostname), 'Local URLs cannot be published.')

async function verify(path, options) {
  const response = await fetch(new URL(path, url), {
    redirect: 'error', signal: AbortSignal.timeout(90_000), ...options,
  })
  return response
}

const health = await verify('/api/health')
assert(health.ok, 'The public app health check failed.')
const status = await health.json()
assert(status.service === 'CyberScan' && status.status === 'ok' && status.demo_mode === true,
  'Expected CyberScan running in public demonstration mode.')
const dashboard = await verify('/dashboard')
assert(dashboard.ok && (await dashboard.text()).includes('Public demonstration'),
  'The real demonstration dashboard must be publicly accessible.')
const state = await verify('/api/state')
const data = await state.json()
assert(state.ok && data.sample_data === true && data.current_user?.role === 'demo',
  'The public interface must use synthetic demonstration data.')
const scan = await verify('/api/scan', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ authorized: true, target: 'http://127.0.0.1' }),
})
assert(scan.status === 403, 'Anonymous scanning must be disabled.')
for (const path of ['/admin/dashboard', '/reports/private.html']) {
  assert((await verify(path)).status === 403, `${path} must not be accessible publicly.`)
}
const report = await verify('/demo-reports/sample.json')
assert(report.ok && (await report.json()).sample_data === true, 'Sample reports must be labeled.')

writeFileSync(new URL('../src/data/liveDemos.ts', import.meta.url),
  `// Public CyberScan deployment verified by scripts/connect-cyberscan.mjs.\nexport const cyberscanDemoUrl: string | undefined = ${JSON.stringify(url.origin)}\n`)
console.log(`Verified the public demonstration and configured Visit Website: ${url.origin}`)
