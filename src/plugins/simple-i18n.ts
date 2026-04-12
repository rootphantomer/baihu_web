import type { App } from 'vue'
import { initLocale, locale, t, setLocale, getLocale } from '@/composables/useI18n'

// 创建 i18n 实例对象（与 vue-i18n API 兼容）
export const i18n = {
  // 初始化
  install(app: App) {
    // 在应用启动时初始化语言
    initLocale()

    // 提供全局方法
    app.config.globalProperties.$t = t
    app.config.globalProperties.$locale = locale
    app.config.globalProperties.$setLocale = setLocale
    app.config.globalProperties.$getLocale = getLocale

    // 提供组合式函数
    app.provide('i18n', {
      locale,
      t,
      setLocale,
      getLocale,
    })
  },
}

// 导出组合式函数（供 <script setup> 使用）
export function useI18n() {
  return {
    locale,
    t,
    setLocale,
    getLocale,
  }
}

// 默认导出
export default i18n
