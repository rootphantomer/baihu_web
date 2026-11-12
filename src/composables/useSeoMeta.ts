/**
 * @file 路由级 SEO Meta 标签管理，支持 title / description / og:image / JSON-LD
 */
import { watch } from 'vue'
import type { Router } from 'vue-router'
import { getLocale, locale, t, type Locale } from '@/composables/useI18n'

export interface SeoMeta {
  /** 页面标题 */
  title?: string
  /** 按语言包解析的页面标题键 */
  titleKey?: string
  /** 页面描述 */
  description?: string
  /** 按语言包解析的页面描述键 */
  descriptionKey?: string
  /** OG 图片（相对 or 绝对路径） */
  ogImage?: string
  /** 页面级 JSON-LD Schema（可选） */
  schema?: Record<string, unknown>
}

export const SITE_URL = 'https://www.baihu-animation.com'
const DEFAULT_LOCALE: Locale = 'zh-CN'
const LOCALES: Locale[] = ['zh-CN', 'zh-TW', 'en-US', 'ja-JP']

const OG_LOCALE: Record<Locale, string> = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'en-US': 'en_US',
  'ja-JP': 'ja_JP',
}

// ─── DOM helpers ────────────────────────────────────────────────────────────────

function setMeta(attr: string, value: string, isProperty = false) {
  const attrName = isProperty ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attr}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attr)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function getLocalizedUrl(path: string, targetLocale: Locale = getLocale()): string {
  const url = new URL(path || '/', SITE_URL)
  if (targetLocale !== DEFAULT_LOCALE) {
    url.searchParams.set('lang', targetLocale)
  }
  return url.toString()
}

export function upsertSchema(data: Record<string, unknown> | undefined) {
  const el = document.querySelector('#page-schema')
  if (!data) {
    el?.remove()
    return
  }
  if (el) {
    el.textContent = JSON.stringify(data)
  } else {
    const script = document.createElement('script')
    script.id = 'page-schema'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

// ─── Core ──────────────────────────────────────────────────────────────────────

export function applySeoMeta(seo?: SeoMeta, path = '/', currentLocale: Locale = getLocale()) {
  const title = seo?.title ?? (seo?.titleKey ? String(t(seo.titleKey)) : document.title)
  const description = seo?.description ?? (seo?.descriptionKey ? String(t(seo.descriptionKey)) : '')
  const canonicalUrl = getLocalizedUrl(path, currentLocale)

  // 标题
  document.title = title

  // canonical / og:url / 语言
  setLink('canonical', canonicalUrl)
  setMeta('og:url', canonicalUrl, true)
  setMeta('og:locale', OG_LOCALE[currentLocale], true)
  for (const targetLocale of LOCALES) {
    setLink('alternate', getLocalizedUrl(path, targetLocale), targetLocale)
  }
  setLink('alternate', getLocalizedUrl(path, DEFAULT_LOCALE), 'x-default')

  // description
  setMeta('description', description)
  setMeta('og:description', description, true)
  setMeta('twitter:description', description)

  // og:title / twitter:title
  setMeta('og:title', title, true)
  setMeta('twitter:title', title)

  // og:image / twitter:image
  if (seo?.ogImage) {
    const imgUrl = seo.ogImage.startsWith('http') ? seo.ogImage : `${SITE_URL}${seo.ogImage}`
    setMeta('og:image', imgUrl, true)
    setMeta('twitter:image', imgUrl)
  }

  // JSON-LD（页面 Schema 由 App.vue 统一维护，避免路由切换时误删）
  if (seo?.schema) upsertSchema(seo.schema)
}

// ─── Router integration ────────────────────────────────────────────────────────

/**
 * 在 Vue Router 上注册 afterEach 钩子，从路由 meta.seo 自动应用 SEO meta。
 *
 * 用法：路由 meta 中声明 seo 字段：
 *   { path: '/about', component: ..., meta: { seo: { title: '...', description: '...' } } }
 */
export function setupRouterSeo(router: Router) {
  router.afterEach((to) => {
    applySeoMeta(to.meta.seo as SeoMeta | undefined, to.name === 'not-found' ? '/' : to.path)
  })

  // 切换语言不触发路由跳转，但需要同步 canonical / hreflang / og:locale
  watch(locale, () => {
    const route = router.currentRoute.value
    applySeoMeta(
      route.meta.seo as SeoMeta | undefined,
      route.name === 'not-found' ? '/' : route.path,
      locale.value,
    )
  })
}
