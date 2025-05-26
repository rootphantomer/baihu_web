/**
 * useTheme - 主题管理 composable
 * 支持：系统跟随 + 手动切换 + 本地持久化
 */
import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'baihu-theme'

// 响应式主题状态
const theme = ref<Theme>('dark')

/**
 * 检测系统主题偏好
 */
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * 应用主题到 DOM
 */
function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', t)
}

/**
 * 初始化主题
 * 优先级：localStorage > 系统偏好
 */
export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null

    if (saved && (saved === 'light' || saved === 'dark')) {
      // 用户已手动选择，遵循用户选择
      theme.value = saved
    } else {
      // 跟随系统
      theme.value = getSystemTheme()
    }

    applyTheme(theme.value)

    // 监听系统主题变化（仅当用户未手动选择时生效）
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        theme.value = e.matches ? 'light' : 'dark'
        applyTheme(theme.value)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
  })

  /**
   * 切换主题
   * 如果当前跟随系统，切换后锁定为手动选择
   */
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, theme.value)
    applyTheme(theme.value)
  }

  /**
   * 设置指定主题
   */
  function setTheme(t: Theme) {
    theme.value = t
    localStorage.setItem(STORAGE_KEY, t)
    applyTheme(t)
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}
