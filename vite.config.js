import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Needed to access from external devices (sets host to 0.0.0.0)
    port: 5173, // Or your desired port
    allowedHosts: true // Allow ngrok / mobile / external IPs
  }
})
