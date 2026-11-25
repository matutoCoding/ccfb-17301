import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5188,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
  },
  worker: {
    format: 'es',
  },
});
