import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vjsPlugin from "./plugins/vjs.js";

export default defineConfig({
  base: '/hat-game/',
  build: {
    minify: false
  },
  server: {
    allowedHosts: ['e6ea9c029425.ngrok-free.app']
  },
  plugins: [
    tailwindcss(),
    vjsPlugin(),
  ],
});
