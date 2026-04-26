/**
 * @file 路由配置，定义页面路由、SEO 元数据、滚动行为
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import type { SeoMeta } from '@/composables/useSeoMeta'
import { setupRouterSeo } from '@/composables/useSeoMeta'

/** 每页 SEO 元数据 */
const PAGE_SEO: Record<string, SeoMeta> = {
  '/': {
    title: '白鹄动画 | 国际一流动画制作工作室',
    description:
      '杭州白鹄动画是一家专注日式二维动画制作的工作室，核心团队来自 Sunrise、MAPPA、J.C.STAFF，为日本一线动画公司提供高品质动画制作服务。',
    ogImage: '/og-home.jpg',
  },
  '/works': {
    title: '参与作品 | 白鹄动画',
    description:
      '白鹄动画参与制作的日本动画作品集，包括高达、水星的魔女、机动战士高达 闪光的哈萨维等知名作品，涵盖原画、动画、背景美术等多种分工。',
    ogImage: '/og-works.jpg',
  },
  '/about': {
    title: '关于我们 | 白鹄动画',
    description:
      '白鹄动画成立于杭州，核心成员来自日本各大动画公司，深谙日式动画的制作标准与文化语境。我们相信只有对动画本身保持热爱，才能交付真正有生命力的作品。',
    ogImage: '/og-about.jpg',
  },
  '/news': {
    title: '最新动态 | 白鹄动画',
    description: '白鹄动画最新资讯，了解我们的项目进展、团队动态和行业分享。',
    ogImage: '/og-news.jpg',
  },
  '/join': {
    title: '加入我们 | 白鹄动画',
    description:
      '白鹄动画招聘动画师、原画师、背景美术等岗位，欢迎热爱日式动画的你加入。提供有竞争力的薪酬、国际化的协作环境，以及接触一线日本动画项目的机会。',
    ogImage: '/og-join.jpg',
  },
  '/contact': {
    title: '联系我们 | 白鹄动画',
    description:
      '白鹄动画联系方式，承接日本动画制作合作项目，欢迎商务合作与洽谈。邮箱：baihu_animation@163.com。',
    ogImage: '/og-contact.jpg',
  },
}

/** 未匹配路由的回退 SEO 元数据 */
const FALLBACK_SEO: SeoMeta = {
  title: '白鹄动画 | 国际一流动画制作工作室',
  description: '杭州白鹄动画是一家专注日式二维动画制作的工作室。',
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
  /** 使用 Hash 模式路由，兼容静态部署 */
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  /** 滚动行为：浏览器前进/后退恢复位置，否则平滑回到顶部 */
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// 注入路由级 SEO 自动更新
setupRouterSeo(router)

export { PAGE_SEO, FALLBACK_SEO }
export default router
