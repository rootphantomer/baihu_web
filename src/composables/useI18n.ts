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

/** 默认语言（URL 中省略 lang 参数） */
export const DEFAULT_LOCALE: Locale = 'zh-CN'

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
const fallbackLocale: Locale = DEFAULT_LOCALE

/**
 * 根据 URL、localStorage 和浏览器语言检测初始语言
 * 优先级：?lang= > localStorage > navigator.language > 回退默认
 */
function detectLocale(): Locale {
  // 1. URL 查询参数（分享链接优先）
  const urlLocale = readUrlLocale()
  if (urlLocale) return urlLocale

  // 2. localStorage 持久化
  const saved = readStorage('locale')
  if (saved && isLocale(saved)) return saved

  // 3. 浏览器语言
  const lang = navigator.language ?? ''

  if (lang.startsWith('zh')) {
    // zh-Hant / zh-TW / zh-HK → 繁体，其余中文 → 简体
    return lang.includes('Hant') || lang.includes('TW') || lang.includes('HK') ? 'zh-TW' : 'zh-CN'
  }
  if (lang.startsWith('ja')) return 'ja-JP'
  if (lang.startsWith('en')) return 'en-US'

  // 4. 回退
  return fallbackLocale
}

function isLocale(v: string): v is Locale {
  return v in messages
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 忽略隐私模式或受限 WebView 下的写入失败
  }
}

function readUrlLocale(): Locale | null {
  try {
    const value = new URLSearchParams(window.location.search).get('lang')
    return value && isLocale(value) ? value : null
  } catch {
    return null
  }
}

function syncLocaleToUrl(locale: Locale) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  if (locale === DEFAULT_LOCALE) {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', locale)
  }
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
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

  if (value !== undefined && value !== null) {
    return value
  }

  const fallbackValue = getNestedValue(messages[fallbackLocale], key)
  if (fallbackValue !== undefined && fallbackValue !== null) {
    console.warn(
      `[i18n] Missing key: "${key}" (locale: ${currentLocale.value}), using ${fallbackLocale}`,
    )
    return fallbackValue
  }

  console.warn(`[i18n] Missing key: "${key}" (locale: ${currentLocale.value})`)
  return key
}

/** 切换语言 */
export function setLocale(locale: Locale) {
  if (messages[locale]) {
    currentLocale.value = locale
    writeStorage('locale', locale)
    syncLocaleToUrl(locale)
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
  syncLocaleToUrl(currentLocale.value)
}

// ─── Exports ────────────────────────────────────────────────────────────────
export const locale = currentLocale
