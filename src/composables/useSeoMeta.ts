/**
 * @file 路由级 SEO Meta 标签管理，支持 title / description / og:image / JSON-LD
 */
import type { Router } from 'vue-router'

export interface SeoMeta {
  /** 页面标题 */
  title?: string
  /** 页面描述 */
  description?: string
  /** OG 图片（相对 or 绝对路径） */
  ogImage?: string
  /** 页面级 JSON-LD Schema（可选） */
  schema?: Record<string, unknown>
}

const BASE_URL = 'https://www.baihu-animation.com'

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

export function applySeoMeta(seo?: SeoMeta) {
  const title = seo?.title ?? document.title
  const description = seo?.description ?? ''

  // 标题
  document.title = title

  // description
  setMeta('description', description)
  setMeta('og:description', description, true)
  setMeta('twitter:description', description)

  // og:title / twitter:title
  setMeta('og:title', title, true)
  setMeta('twitter:title', title)

  // og:image / twitter:image
  if (seo?.ogImage) {
    const imgUrl = seo.ogImage.startsWith('http') ? seo.ogImage : `${BASE_URL}${seo.ogImage}`
    setMeta('og:image', imgUrl, true)
    setMeta('twitter:image', imgUrl)
  }

  // JSON-LD
  upsertSchema(seo?.schema)
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
    applySeoMeta(to.meta.seo as SeoMeta | undefined)
  })
}
