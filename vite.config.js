import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    allowedHosts: ['ad96ad14e5ac.ngrok-free.app']
  },
  plugins: [
    tailwindcss(),
  ],
});
