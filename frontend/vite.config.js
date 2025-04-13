import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ... other server configurations ...
    allowedHosts: [
      // ... other allowed hosts (if any) ...
      'c3b3-2804-14d-5c9b-47d2-ed13-39b3-8d2-ee05.ngrok-free.app'
    ]
  }
  
})
