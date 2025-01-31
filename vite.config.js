import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  base: '/tavr/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    loader: "jsx",  // Ensures JSX syntax is handled
    include: /\.(js|jsx)$/, // Applies loader to both .js and .jsx files
  },
})
