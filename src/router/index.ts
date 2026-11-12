/**
 * @file 路由配置，定义页面路由、SEO 元数据、滚动行为
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { SeoMeta } from '@/composables/useSeoMeta'
import { setupRouterSeo } from '@/composables/useSeoMeta'
import { getLocale } from '@/composables/useI18n'

// 兼容旧版 Hash 链接：/#/works → /works
if (typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

/** 每页 SEO 元数据 */
const PAGE_SEO: Record<string, SeoMeta> = {
  '/': {
    titleKey: 'seo.home.title',
    descriptionKey: 'seo.home.description',
    ogImage: '/og-image.png',
  },
  '/works': {
    titleKey: 'seo.works.title',
    descriptionKey: 'seo.works.description',
    ogImage: '/og-image.png',
  },
  '/about': {
    titleKey: 'seo.about.title',
    descriptionKey: 'seo.about.description',
    ogImage: '/og-image.png',
  },
  '/news': {
    titleKey: 'seo.news.title',
    descriptionKey: 'seo.news.description',
    ogImage: '/og-image.png',
  },
  '/join': {
    titleKey: 'seo.join.title',
    descriptionKey: 'seo.join.description',
    ogImage: '/og-image.png',
  },
  '/contact': {
    titleKey: 'seo.contact.title',
    descriptionKey: 'seo.contact.description',
    ogImage: '/og-image.png',
  },
}

/** 未匹配路由的回退 SEO 元数据 */
const FALLBACK_SEO: SeoMeta = {
  titleKey: 'seo.home.title',
  descriptionKey: 'seo.home.description',
}

/** 路由表定义（懒加载各页面组件，每条路由携带 SEO 元数据） */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { seo: PAGE_SEO['/'] },
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('@/views/WorksView.vue'),
    meta: { seo: PAGE_SEO['/works'] },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { seo: PAGE_SEO['/about'] },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue'),
    meta: { seo: PAGE_SEO['/news'] },
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('@/views/JoinView.vue'),
    meta: { seo: PAGE_SEO['/join'] },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { seo: PAGE_SEO['/contact'] },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { seo: FALLBACK_SEO },
  },
]

const router = createRouter({
  /** History 模式；Cloudflare Workers 使用 SPA fallback 回退到 index.html */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /** 滚动行为：浏览器前进/后退恢复位置，否则平滑回到顶部 */
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

/**
 * 将当前语言同步到 URL：
 * - 默认语言 zh-CN 使用干净路径
 * - 其他语言使用 ?lang=ja-JP 等查询参数
 */
router.beforeEach((to) => {
  const currentLocale = getLocale()
  const hasLang = typeof to.query.lang === 'string'

  if (currentLocale === 'zh-CN') {
    if (!hasLang) return
    const query = { ...to.query }
    delete query.lang
    return { path: to.path, query, hash: to.hash, replace: true }
  }

  if (to.query.lang === currentLocale) return
  return {
    path: to.path,
    query: { ...to.query, lang: currentLocale },
    hash: to.hash,
    replace: true,
  }
})

// 注入路由级 SEO 自动更新
setupRouterSeo(router)

export { PAGE_SEO, FALLBACK_SEO }
export default router
