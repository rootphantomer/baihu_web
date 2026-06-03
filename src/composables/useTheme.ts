/**
 * @file 主题管理 composable，支持系统跟随、手动切换、本地持久化
 *
 * initTheme() — 在 App.vue 中调用一次，注册初始化 + 系统主题监听
 * useTheme()  — 其他组件中获取响应式主题状态和切换方法（无副作用）
 */
import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'baihu-theme'

/** 响应式主题状态（模块级单例） */
const theme = ref<Theme>('dark')

/** 标记是否已完成一次性初始化 */
let initialized = false

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', t)
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * 一次性初始化主题（仅 App.vue 调用）
 * 优先级：localStorage > 系统偏好
 */
export function initTheme() {
  if (initialized) return
  initialized = true

  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null

  if (saved && (saved === 'light' || saved === 'dark')) {
    theme.value = saved
  } else {
    theme.value = getSystemTheme()
  }

  applyTheme(theme.value)

  // 监听系统主题变化（仅在用户未手动选择时生效）
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      theme.value = e.matches ? 'light' : 'dark'
      applyTheme(theme.value)
    }
  }
  mediaQuery.addEventListener('change', handleChange)
}

/**
 * 获取响应式主题状态与操作方法（无副作用）
 */
export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, theme.value)
    applyTheme(theme.value)
  }

  return { theme, toggleTheme }
}
