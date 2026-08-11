import { defineConfig } from 'vite'

// GitHub Pages serves project sites from /repository-name/ rather than from
// the very root of the internet. Locally, we keep the simpler / address.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/salenes-world/' : '/',
})
