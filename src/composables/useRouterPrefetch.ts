/**
 * useRouterPrefetch - 路由预加载策略
 * 支持：hover 预加载 + 视口内链接预加载
 */
import { onMounted, onUnmounted } from 'vue'
import router from '@/router'

// 缓存已预加载的模块
const preloadedModules = new Set<string>()

/**
 * 预加载指定路由的组件
 */
export function prefetchRoute(path: string) {
  // 查找匹配的路由
  const route = router.getRoutes().find((r) => r.path === path)
  if (!route || !route.components) return

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
 * 预加载路由组件（基于 import() 动态导入）
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
 * 基于视口的预加载（Intersection Observer）
 */
export function prefetchOnViewport(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const link = entry.target as HTMLAnchorElement
      const href = link.getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        prefetchRoute(href)
      }
    }
  })
}

/**
 * 注册全局预加载策略
 */
export function useRouterPrefetch() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Hover 预加载
    document.addEventListener('mouseover', prefetchOnHover, { passive: true })

    // 视口预加载（观察所有导航链接）
    observer = new IntersectionObserver(prefetchOnViewport, {
      rootMargin: '200px 0px', // 提前 200px 开始预加载
      threshold: 0,
    })

    // 观察页面内所有内部链接
    const observeLinks = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
      links.forEach((link) => observer?.observe(link))
    }

    // 初始观察
    observeLinks()

    // 监听 DOM 变化（新导航链接出现时也观察）
    const mutationObserver = new MutationObserver(observeLinks)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', prefetchOnHover)
    observer?.disconnect()
  })
}
