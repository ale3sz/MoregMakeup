import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // On Vercel, Netlify or root domains base is '/'. On GitHub Pages it uses '/MoregMakeup/'
  base: process.env.VERCEL ? '/' : (process.env.GITHUB_ACTIONS ? '/MoregMakeup/' : '/'),
})
