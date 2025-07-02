import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svgr(), react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    alias: {
      '@': path.resolve('./src'),
    },
  },
})
