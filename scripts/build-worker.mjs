import { mkdir, writeFile } from 'node:fs/promises'

// The hosting service serves Vite's finished static files through this tiny
// Cloudflare Worker. The website itself remains a simple, fast static site.
await mkdir('dist/server', { recursive: true })
await writeFile('dist/server/index.js', `
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Vite writes the homepage as /index.html. The hosting asset store does
    // not automatically translate a visit to /, so we make that friendly
    // translation here (and keep every built asset exactly where Vite put it).
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url)))
    }

    const asset = await env.ASSETS.fetch(request)
    if (asset.status !== 404) return asset

    // This keeps future in-world links working if they use a browser route.
    return env.ASSETS.fetch(new Request(new URL("/index.html", url)))
  },
}
`)
