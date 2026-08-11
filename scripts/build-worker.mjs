import { mkdir, writeFile } from 'node:fs/promises'

// The hosting service serves Vite's finished static files through this tiny
// Cloudflare Worker. The website itself remains a simple, fast static site.
await mkdir('dist/server', { recursive: true })
await writeFile('dist/server/index.js', `
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request)
  },
}
`)
