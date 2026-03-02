import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/w26-sdev372-sonic-species-collection/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/_test_/setupTests.js'
  }
})
