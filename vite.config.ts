import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base: './', // 确保正确的路径到你的 HTML 文件
  plugins: [
    vue(),
    // DevTools 仅在开发环境加载，避免打包进生产包
    ...(isDev ? [vueDevTools()] : []),
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
    target: 'es2020', // 确保兼容目标浏览器
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vendor'
            }
            return 'libs'
          }
        },
      },
    },
  },
})
