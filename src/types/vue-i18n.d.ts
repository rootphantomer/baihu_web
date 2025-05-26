import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    /**
     * 翻译函数
     * @param key - 翻译键，如 'home.hero.name'
     */
    $t: (key: string) => string

    /**
     * 当前语言（响应式）
     */
    $locale: import('@/composables/useI18n').locale

    /**
     * 设置语言
     */
    $setLocale: (locale: 'zh-CN' | 'ja-JP') => void

    /**
     * 获取当前语言
     */
    $getLocale: () => 'zh-CN' | 'ja-JP'
  }
}

export {}
