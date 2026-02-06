import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // FIXME: For GitHub Pages, set this to '/silcs-fragmaps-demo/'
  base: '/',
})
