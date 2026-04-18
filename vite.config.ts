import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base: './',
  plugins: [vue(), ...(isDev ? [vueDevTools()] : [])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  assetsInclude: ['**/*.png', '**/*.svg'], // 确保包含 PNG 图片
  build: {
    target: 'es2020', // 确保兼容目标浏览器
    cssTarget: 'es2020', // 确保兼容目标浏览器
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // 入口文件命名
        entryFileNames: 'js/[name]_[hash:8].js',
        // chunk 分包命名（解决你看到的乱码符号）
        chunkFileNames: 'js/[name]_[hash:8].js',
        // 静态资源
        assetFileNames: '[ext]/[name]_[hash:8].[ext]',

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
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020', // 确保兼容目标浏览器
    },
  },
})
