import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
     plugins: [react()],
     build: {
          outDir: 'dist',
     },
     server: {
          // disable Vite’s default liberal CORS in dev
          // cors: false,
          // or to allow specific origins in dev:
          cors: {
            origin: ['http://localhost:5173', 'https://one-vote-taupe.vercel.app','https://one-vote-sand.vercel.app']
          }
     }
})
