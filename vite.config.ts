import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Same path as GitHub Pages: open http://localhost:5173/lovesmeornot/ in dev (port from terminal). */
export default defineConfig({
  base: '/lovesmeornot/',
  plugins: [react()],
})
