<template>
  <a class="skip-link" href="#main-content">{{ $t('header.skipToContent') }}</a>
  <!-- 全局头部导航 -->
  <HeaderComponent />
  <!-- 路由视图（页面内容） -->
  <div id="main-content" tabindex="-1">
    <RouterView />
  </div>
  <!-- 全局底部 -->
  <FooterComponent />
</template>

<script setup lang="ts">
/**
 * 根组件：初始化主题、路由预加载、页面级 JSON-LD Schema
 */
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { initTheme } from '@/composables/useTheme'
import { useRouterPrefetch } from '@/composables/useRouterPrefetch'
import { works } from '@/data/works'
import { t, locale } from '@/composables/useI18n'
import { getLocalizedUrl, upsertSchema } from '@/composables/useSeoMeta'

// 初始化主题（一次性，在 setup 阶段即执行）
initTheme()

// 初始化路由预加载
useRouterPrefetch()

// ─── Scroll reveal ─────────────────────────────────────────────────────────────
let revealObserver: IntersectionObserver | undefined
let revealMutationObserver: MutationObserver | undefined
let reduceMotionMedia: MediaQueryList | undefined

/** 观察所有尚未初始化的 [data-reveal] 节点，进入视口后只揭示一次 */
function observeReveals() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-ready])')
  if (!nodes.length) return

  const shouldSkipAnimation =
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldSkipAnimation) {
    nodes.forEach((node) => {
      node.setAttribute('data-reveal-ready', '')
      node.classList.add('is-visible')
    })
    return
  }

  revealObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const node = entry.target as HTMLElement
        node.classList.add('is-visible')
        revealObserver?.unobserve(node)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  nodes.forEach((node) => {
    node.setAttribute('data-reveal-ready', '')
    revealObserver?.observe(node)
  })
}

/** 减少动画开关变化时：开启则立即揭示所有待揭示节点，关闭则重新观察未可见节点 */
function syncReduceMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pending = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-ready])')
  if (reduce) {
    pending.forEach((node) => {
      node.setAttribute('data-reveal-ready', '')
      node.classList.add('is-visible')
    })
    revealObserver?.disconnect()
    revealObserver = undefined
    return
  }

  if (!revealObserver) {
    observeReveals()
  }
}

onMounted(() => {
  nextTick(observeReveals)

  // 异步路由组件挂载晚于父组件 onMounted，这里补一次 DOM 变更监听
  const main = document.getElementById('main-content')
  if (main) {
    revealMutationObserver = new MutationObserver(observeReveals)
    revealMutationObserver.observe(main, { childList: true, subtree: true })
  }

  reduceMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotionMedia.addEventListener('change', syncReduceMotion)
})

onUnmounted(() => {
  revealObserver?.disconnect()
  revealMutationObserver?.disconnect()
  reduceMotionMedia?.removeEventListener('change', syncReduceMotion)
})

// 路由切换后等页面滚动动画结束（vue-router smooth scroll ≈ 400ms）再扫描新页面节点，
// 避免旧滚动位置下的节点被提前揭示且无法重置
watch(
  () => route.fullPath,
  () => {
    revealObserver?.disconnect()
    revealObserver = undefined
    setTimeout(() => nextTick(observeReveals), 450)
  },
)

// ─── Per-page JSON-LD Schema ───────────────────────────────────────────────────
const route = useRoute()

/**
 * 根据当前路由路径生成对应的 JSON-LD 结构化数据
 * @param path - 当前路由路径
 * @returns JSON-LD 数据对象，不需要 Schema 的页面返回 undefined
 */
function getPageSchema(path: string): Record<string, unknown> | undefined {
  if (path === '/works') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t('seo.works.title'),
      description: t('seo.works.description'),
      numberOfItems: works.length,
      itemListElement: works.slice(0, 10).map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: w.title,
        description: `${w.title} - ${w.role}`,
        url: getLocalizedUrl('/works'),
      })),
    }
  }

  if (path === '/about') {
    const faqItems = t('about.faq.items')
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: `${t('about.faq.label')} | ${t('about.title')}`,
      mainEntity: Array.isArray(faqItems)
        ? faqItems.map((item: { q: string; a: string }) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          }))
        : [],
    }
  }

  return undefined
}

// 监听路由和语言变化，自动更新页面 JSON-LD Schema
watch([() => route.path, locale], ([path]) => upsertSchema(getPageSchema(path)), {
  immediate: true,
})

// 路由切换后重新扫描新挂载的 reveal 节点
watch(
  () => route.fullPath,
  () => {
    revealObserver?.disconnect()
    revealObserver = undefined
    nextTick(observeReveals)
  },
)
</script>

<style lang="scss">
// ─── Design Tokens ────────────────────────────────────────────────────────────
:root,
[data-theme='dark'] {
  color-scheme: dark;

  // Color — 墨黑 / 宣纸白 / 古铜金，单一强调色，作品优先
  --c-bg: #0b0d12;
  --c-surface: #11141b;
  --c-surface-2: #171b24;
  --c-border: #2a2e38;
  --c-muted: #6b7180;
  --c-secondary: #9da3b0;
  --c-primary: #f2f0ea;
  --c-accent: #c6a15b;
  --c-accent-hover: #d8b778;
  --c-accent-dim: rgba(198, 161, 91, 0.12);
  --c-on-accent: #0b0d12;

  // 兼容旧组件：全部收敛为同一强调色 / 无圆角 / 无阴影
  --c-accent-2: var(--c-accent);
  --c-accent-3: var(--c-accent);
  --c-accent-2-dim: var(--c-accent-dim);
  --c-accent-3-dim: var(--c-accent-dim);
  --c-glow-1: transparent;
  --c-glow-2: transparent;
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-pill: 0;
  --shadow-card: none;

  // Typography
  --font-display: 'DM Sans', 'Noto Sans SC', sans-serif;
  --font-body: 'DM Sans', 'Noto Sans SC', sans-serif;
  --font-serif: 'Shippori Mincho', 'Noto Serif SC', serif;
  --font-mono: 'DM Mono', monospace;
  --fw-display: 600;

  // Motion
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-base: 500ms;
  --duration-slow: 800ms;

  // Header height
  --header-h: 6.4rem;
}

// ─── Light Theme ─────────────────────────────────────────────────────────────
[data-theme='light'] {
  color-scheme: light;
  --c-bg: #f4f2ed;
  --c-surface: #ffffff;
  --c-surface-2: #eae7df;
  --c-border: #d8d3c8;
  --c-muted: #8b877e;
  --c-secondary: #5c5a54;
  --c-primary: #17181a;
  --c-accent: #8a6a2f;
  --c-accent-hover: #6f5321;
  --c-accent-dim: rgba(138, 106, 47, 0.1);
  --c-on-accent: #ffffff;
}

// ─── Reset & Base ─────────────────────────────────────────────────────────────
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
  background: var(--c-bg);
  color: var(--c-primary);
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.7;
  overflow-x: hidden;
  color: var(--c-primary);
  background: var(--c-bg);
}

// ─── Responsive Font Scale ────────────────────────────────────────────────────
@media (max-width: 390px) {
  html {
    font-size: 13px;
  }
  :root {
    --header-h: 5.5rem;
  }
}
@media (min-width: 391px) and (max-width: 430px) {
  html {
    font-size: 14px;
  }
  :root {
    --header-h: 5.5rem;
  }
}
@media (min-width: 431px) and (max-width: 767px) {
  html {
    font-size: 14.5px;
  }
  :root {
    --header-h: 6rem;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  html {
    font-size: 13px;
  }
  :root {
    --header-h: 6.5rem;
  }
}
@media (min-width: 1920px) {
  html {
    font-size: calc(100vw / 192);
  }
}

// ─── Typography Scale ─────────────────────────────────────────────────────────
h1,
h2,
h3,
h4,
h5 {
  font-family: var(--font-display);
  font-weight: var(--fw-display);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--c-primary);
}

// 组件内旧的字重声明统一收敛到新的展示字重，避免标题忽粗忽细
h1,
h2,
h3,
h4,
h5,
.page-title,
.hero-name-en,
.hero-name-zh,
.ap-title-line,
.services-title,
.rc-title,
.card-title,
.news-title,
.pos-title,
.value-title,
.faq-q,
.lightbox-title,
.no-news {
  font-weight: var(--fw-display) !important;
}

.page-title,
.services-title,
.rc-title,
.card-title,
.news-title,
.pos-title,
.value-title,
.faq-q {
  letter-spacing: -0.03em !important;
}

p,
li {
  font-family: var(--font-body);
  color: var(--c-secondary);
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

// ─── Utility ──────────────────────────────────────────────────────────────────
.label {
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
  color: var(--c-accent);
}

.skip-link {
  position: fixed;
  top: -10rem;
  left: 2rem;
  z-index: 300;
  padding: 1.2rem 1.8rem;
  background: var(--c-accent);
  color: var(--c-on-accent);
  font-size: 1.2rem;
  letter-spacing: 0.06em;

  &:focus {
    top: 1rem;
  }
}

#main-content:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 0.4rem;
}

.label--mint {
  color: var(--c-accent);
}

.page-header-inner .label {
  color: var(--c-accent);
}

.section-divider {
  width: 100%;
  height: 1px;
  background: var(--c-border);
}

// ─── Page Transition ──────────────────────────────────────────────────────────
.page-enter-active,
.page-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

// ─── Scroll Reveal ──────────────────────────────────────────────────────────────
[data-reveal] {
  opacity: 0;
  transform: translate3d(0, 2.4rem, 0);
  transition:
    opacity 720ms var(--ease-out),
    transform 720ms var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);

  &.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

[data-reveal='line'] {
  opacity: 1;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 760ms var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);

  &.is-visible {
    transform: scaleX(1);
  }
}

[data-reveal='mask'] {
  opacity: 1;
  transform: none;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 760ms var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);

  &.is-visible {
    clip-path: inset(0 0 0 0);
  }
}

// Revealed focusable elements must never stay invisible under keyboard focus
[data-reveal]:focus,
[data-reveal]:focus-within {
  opacity: 1;
  transform: none;
  clip-path: inset(0 0 0 0);
  transition: none !important;
}

// ─── Scrollbar (Webkit) ───────────────────────────────────────────────────────
::-webkit-scrollbar {
  width: 0.4rem;
}
::-webkit-scrollbar-track {
  background: var(--c-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--c-border);
  border-radius: 2px;
  &:hover {
    background: var(--c-muted);
  }
}

// ─── Selection ────────────────────────────────────────────────────────────────
::selection {
  background: var(--c-accent);
  color: var(--c-on-accent);
}

// ─── Focus ────────────────────────────────────────────────────────────────────
:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 3px;
}

// ─── App Container ─────────────────────────────────────────────────────
#app {
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
}

// ─── Theme Transition ─────────────────────────────────────────────────────────
:root {
  transition:
    background-color var(--duration-base) ease,
    border-color var(--duration-base) ease,
    color var(--duration-base) ease,
    box-shadow var(--duration-base) ease;
}

img,
video,
[class*='marquee-'],
[class*='parallax-'] {
  transition: none !important;
}

// ─── Reduced Motion ───────────────────────────────────────────────────────────
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-reveal] {
    transition-delay: 0ms !important;
  }
}
</style>
