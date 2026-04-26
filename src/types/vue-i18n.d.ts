/**
 * @file Vue 全局属性类型扩展，为 i18n 插件注入的属性提供类型声明
 */
/* eslint-disable */
import type { Locale } from '@/composables/useI18n'
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    /** 翻译函数 */
    $t: (key: string) => any

    /** 当前语言（响应式） */
    $locale: import('vue').Ref<Locale>

    /** 设置语言 */
    $setLocale: (locale: Locale) => void

    /** 获取当前语言 */
    $getLocale: () => Locale

    /** 循环切换语言 */
    $cycleLocale: () => Locale
  }
}

export {}
