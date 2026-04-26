/**
 * @file 简易 i18n Vue 插件，将翻译函数注入全局属性并提供 composable
 */
import type { App } from 'vue'
import {
  initLocale,
  locale,
  t,
  setLocale,
  getLocale,
  cycleLocale,
  LOCALE_LABEL,
} from '@/composables/useI18n'
import type { Locale } from '@/composables/useI18n'

/** i18n Vue 插件实例（与 vue-i18n API 兼容） */
export const i18n = {
  install(app: App) {
    initLocale()

    // 全局属性
    app.config.globalProperties.$t = t
    app.config.globalProperties.$locale = locale
    app.config.globalProperties.$setLocale = setLocale
    app.config.globalProperties.$getLocale = getLocale
    app.config.globalProperties.$cycleLocale = cycleLocale

    // provide
    app.provide('i18n', {
      locale,
      t,
      setLocale,
      getLocale,
      cycleLocale,
      LOCALE_LABEL,
    })
  },
}

/**
 * i18n composable，在组件中获取翻译函数和语言操作方法
 * @returns 翻译函数、当前语言、语言操作方法
 */
export function useI18n() {
  return {
    locale,
    t,
    setLocale,
    getLocale,
    cycleLocale,
    LOCALE_LABEL,
  }
}

export type { Locale }
export default i18n
