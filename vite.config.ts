import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: './', // 确保正确的路径到你的 HTML 文件
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  assetsInclude: ['**/*.png', '**/*.svg'], // 确保包含 PNG 图片
  build: {
    target: ['chrome90', 'edge90', 'safari13'],
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
        if (id.includes('node_modules')) {
          if (
            id.includes('vue') ||
            id.includes('pinia') ||
            id.includes('vue-router')
          ) {
            return 'vendor'
          }
          return 'libs'
        }
      },
      },
    },
  },
})
