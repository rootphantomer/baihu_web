/**
 * @file 轻量级 i18n 解决方案，支持多语言切换、浏览器语言检测、localStorage 持久化
 */
import { ref } from 'vue'
import zhCN from '@/locales/zh-CN' // 简体中文语言包
import zhTW from '@/locales/zh-TW' // 繁体中文语言包
import enUS from '@/locales/en-US' // 英文语言包
import jaJP from '@/locales/ja-JP' // 日文语言包

// ─── Types ─────────────────────────────────────────────────────────────────────
export type Locale = 'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP'

type Messages = Record<string, any>

/** 语言包映射 */
const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS,
  'ja-JP': jaJP,
}

/** 语言切换顺序（循环） */
export const LOCALE_ORDER: Locale[] = ['zh-CN', 'zh-TW', 'en-US', 'ja-JP']

/** 语言标签映射（用于 UI 展示） */
export const LOCALE_LABEL: Record<Locale, string> = {
  'zh-CN': '中',
  'zh-TW': '繁',
  'en-US': 'EN',
  'ja-JP': '日',
}

// ─── State ─────────────────────────────────────────────────────────────────────
/** 当前语言（响应式，模块级单例） */
const currentLocale = ref<Locale>(detectLocale())
/** 找不到翻译键时的回退语言 */
const fallbackLocale: Locale = 'zh-CN'

/**
 * 根据浏览器语言和 localStorage 检测初始语言
 * 优先级：localStorage > navigator.language > 回退默认
 */
function detectLocale(): Locale {
  // 1. localStorage 持久化
  const saved = localStorage.getItem('locale')
  if (saved && isLocale(saved)) return saved

  // 2. 浏览器语言
  const lang = navigator.language ?? ''

  if (lang.startsWith('zh')) {
    // zh-Hant / zh-TW / zh-HK → 繁体，其余中文 → 简体
    return lang.includes('Hant') || lang.includes('TW') || lang.includes('HK') ? 'zh-TW' : 'zh-CN'
  }
  if (lang.startsWith('ja')) return 'ja-JP'
  if (lang.startsWith('en')) return 'en-US'

  // 3. 回退
  return fallbackLocale
}

function isLocale(v: string): v is Locale {
  return v in messages
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** 深度获取嵌套对象属性 */
function getNestedValue(obj: Messages, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key: string) => {
    return (acc as Record<string, unknown>)?.[key]
  }, obj)
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * 翻译函数
 * @param key - 翻译键，如 'home.hero.name'
 */
export function t(key: string): any {
  const localeMessages = messages[currentLocale.value] ?? messages[fallbackLocale]
  const value = getNestedValue(localeMessages, key)

  if (value === undefined || value === null) {
    console.warn(`[i18n] Missing key: "${key}" (locale: ${currentLocale.value})`)
    return key
  }

  return value
}

/** 切换语言 */
export function setLocale(locale: Locale) {
  if (messages[locale]) {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
    // 同步更新 html lang 属性
    document.documentElement.lang = locale
  }
}

/** 获取当前语言 */
export function getLocale(): Locale {
  return currentLocale.value
}

/** 切换到下一个语言（循环） */
export function cycleLocale(): Locale {
  const idx = LOCALE_ORDER.indexOf(currentLocale.value)
  const next = LOCALE_ORDER[(idx + 1) % LOCALE_ORDER.length]
  setLocale(next)
  return next
}

/** 初始化语言（从 localStorage 恢复，同步 html lang 属性） */
export function initLocale() {
  currentLocale.value = detectLocale()
  document.documentElement.lang = currentLocale.value
}

// ─── Exports ────────────────────────────────────────────────────────────────
export const locale = currentLocale
