/**
 * @file 路由预加载策略，支持 hover 预加载 + 视口内链接预加载（带防抖）
 */
import { onMounted, onUnmounted } from 'vue'
import router from '@/router'

/** 已预加载的模块集合 */
const preloadedModules = new Set<string>()

/** MutationObserver 防抖延迟（ms） */
const OBSERVE_DEBOUNCE_MS = 300

/**
 * 预加载指定路由的组件
 */
export function prefetchRoute(path: string) {
  const route = router.getRoutes().find((r) => r.path === path)
  if (!route?.components) return

  const component = route.components.default || route.components
  if (typeof component === 'function') {
    const moduleId = (component as () => Promise<unknown>).toString()
    if (!preloadedModules.has(moduleId)) {
      preloadedModules.add(moduleId)
      ;(component as () => Promise<unknown>)()
    }
  }
}

/**
 * hover 预加载
 */
export function prefetchOnHover(e: MouseEvent) {
  const target = e.target as HTMLElement
  const link = target.closest('a[href]') as HTMLAnchorElement | null

  if (link) {
    const href = link.getAttribute('href')
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      prefetchRoute(href)
    }
  }
}

/**
 * 视口预加载（Intersection Observer）
 */
export function prefetchOnViewport(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const link = entry.target as HTMLAnchorElement
      const href = link.getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        prefetchRoute(href)
      }
    }
  }
}

/**
 * 注册全局预加载策略
 */
export function useRouterPrefetch() {
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    // Hover 预加载
    document.addEventListener('mouseover', prefetchOnHover, { passive: true })

    // 视口预加载
    observer = new IntersectionObserver(prefetchOnViewport, {
      rootMargin: '200px 0px',
      threshold: 0,
    })

    /** 观察页面内所有内部链接 */
    const observeLinks = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
      links.forEach((link) => observer?.observe(link))
    }

    observeLinks()

    // 带防抖的 DOM 变化监听
    mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(observeLinks, OBSERVE_DEBOUNCE_MS)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', prefetchOnHover)
    observer?.disconnect()
    mutationObserver?.disconnect()
    if (debounceTimer) clearTimeout(debounceTimer)
  })
}
