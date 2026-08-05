import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // 相对路径，静态托管子路径部署也 OK
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        features: path.resolve(__dirname, 'features.html'),
        download: path.resolve(__dirname, 'download.html'),
      },
    },
  },
  server: {
    port: 5185,
    strictPort: true,
  },
});
