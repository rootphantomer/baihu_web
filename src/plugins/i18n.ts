import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN'
// import enUS from '@/locales/en-US'
// import zhTW from '@/locales/zh-TW'
import jaJP from '@/locales/ja-JP'

/**
 * 根据浏览器语言设置推断初始语言。
 * 中文 → zh-CN，其余 → ja-JP（目标用户群以日语为主）。
 */
function detectLocale(): string {
  const lang = navigator.language ?? ''
  return lang.startsWith('zh') ? 'zh-CN' : 'ja-JP'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    // 'en-US': enUS,
    // 'zh-TW': zhTW,
    'ja-JP': jaJP,
  },
})
