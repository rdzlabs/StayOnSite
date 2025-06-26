import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  publicDir: 'public',      // copies manifest/icons
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup:      resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/background.ts')
      },
      output: {
        entryFileNames: chunk =>
          chunk.name === 'background'
            ? 'background/background.js'
            : 'assets/[name]-[hash].js'
      }
    }
  }
})
