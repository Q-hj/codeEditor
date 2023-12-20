import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import Unocss from 'unocss/vite';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    visualizer({
      open: true,
      // gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 静态资源分类和包装
        chunkFileNames: 'public/assets/js/[name].js', //-[hash]
        entryFileNames: 'public/assets/js/[name].js', //-[hash]
        assetFileNames: 'public/assets/[ext]/[name].[ext]', //-[hash]
      },
    },
  },
});
