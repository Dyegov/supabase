import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { minify } from 'uglify-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
