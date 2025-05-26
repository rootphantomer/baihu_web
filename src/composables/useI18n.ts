import { ref, computed } from 'vue'
import zhCN from '@/locales/zh-CN'
import jaJP from '@/locales/ja-JP'

// 类型定义
type Locale = 'zh-CN' | 'ja-JP'
type Messages = Record<string, any>

// 语言包映射
const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'ja-JP': jaJP,
}

// 当前语言（响应式）
const currentLocale = ref<Locale>(detectLocale())

// 回退语言
const fallbackLocale: Locale = 'zh-CN'

/**
 * 根据浏览器语言检测初始语言
 */
function detectLocale(): Locale {
  const lang = navigator.language ?? ''
  return lang.startsWith('zh') ? 'zh-CN' : 'ja-JP'
}

/**
 * 深度获取嵌套对象属性
 * 例如: getNestedValue(obj, 'home.hero.name')
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    return acc?.[key]
  }, obj)
}

/**
 * 翻译函数
 * @param key - 翻译键，如 'home.hero.name'
 * @param params - 可选的参数对象（暂未使用，保留扩展性）
 */
export function t(key: string, params?: Record<string, any>): any {
  const localeMessages = messages[currentLocale.value] || messages[fallbackLocale]
  const value = getNestedValue(localeMessages, key)

  // 如果找不到翻译，返回键名本身
  if (value === undefined || value === null) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }

  return value
}

/**
 * 切换语言
 */
export function setLocale(locale: Locale) {
  if (messages[locale]) {
    currentLocale.value = locale
    // 保存到 localStorage
    localStorage.setItem('locale', locale)
  }
}

/**
 * 获取当前语言
 */
export function getLocale() {
  return currentLocale.value
}

/**
 * 初始化语言（从 localStorage 恢复）
 */
export function initLocale() {
  const saved = localStorage.getItem('locale') as Locale
  if (saved && messages[saved]) {
    currentLocale.value = saved
  }
}

// 导出响应式的当前语言
export const locale = currentLocale
