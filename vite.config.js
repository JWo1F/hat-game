import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/pocket-games/',
  server: {
    allowedHosts: ['e6ea9c029425.ngrok-free.app']
  },
  plugins: [
    tailwindcss(),
  ],
});
