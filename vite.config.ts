import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const resume = fileURLToPath(
  new URL('./public/resume/Ranger_Aganon_F_Wagayen_Resume.pdf', import.meta.url),
)
const hasResume = existsSync(resume) && readFileSync(resume).subarray(0, 5).toString() === '%PDF-'

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: { __RESUME_AVAILABLE__: JSON.stringify(hasResume) },
  build: { target: 'es2022' },
})
