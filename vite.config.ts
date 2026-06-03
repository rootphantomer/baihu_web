/**
 * @file Vite 构建配置
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // Vue SFC 支持
import vueDevTools from 'vite-plugin-vue-devtools' // 开发者工具（仅开发环境）

/** 是否为开发环境 */
const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  /** 相对路径基础，适配静态部署 */
  base: './',
  /** Vue 插件 + 开发工具（生产环境不加载 devtools） */
  plugins: [vue(), ...(isDev ? [vueDevTools()] : [])],
  resolve: {
    alias: {
      /** @ 别名指向 src 目录 */
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /** 额外识别的静态资源类型 */
  assetsInclude: ['**/*.png', '**/*.svg'],
  build: {
    /** 构建目标为现代浏览器 */
    target: 'esnext',
    /** CSS 语法降级目标 */
    cssTarget: 'es2022',
    /** 输出目录 */
    outDir: 'dist',
    /** chunk 大小警告阈值（KB） */
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        /** 入口文件命名规则 */
        entryFileNames: 'js/[name]_[hash:8].js',
        /** chunk 文件命名规则 */
        chunkFileNames: 'js/[name]_[hash:8].js',
        /** 静态资源命名规则（按类型分目录） */
        assetFileNames: '[ext]/[name]_[hash:8].[ext]',

        /**
         * 手动分包策略：
         * - vendor: Vue 核心生态（vue / pinia / vue-router）
         * - libs: 其他第三方库
         */
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
