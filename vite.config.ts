import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouterVite } from '@tanstack/router-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // 1. GitHub Pages ke liye base path set kiya
  base: '/react-flair-store/',

  plugins: [
    tanstackRouterVite(),
    react(),
    tsconfigPaths()
  ],
  server: {
    host: 'localhost',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 2. Build folder ka naam badalkar 'dist' kiya jo Vite ka default hota hai
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
