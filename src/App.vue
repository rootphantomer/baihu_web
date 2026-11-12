<template>
  <!-- 全局头部导航 -->
  <HeaderComponent />
  <!-- 路由视图（页面内容） -->
  <RouterView />
  <!-- 全局底部 -->
  <FooterComponent />
</template>

<script setup lang="ts">
/**
 * 根组件：初始化主题、路由预加载、页面级 JSON-LD Schema
 */
import { watch } from 'vue'
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
</script>

<style lang="scss">
// ─── Design Tokens ────────────────────────────────────────────────────────────
:root,
[data-theme='dark'] {
  // Color
  --c-bg: #0a0a0a;
  --c-surface: #111111;
  --c-surface-2: #181818;
  --c-border: #242424;
  --c-muted: #444444;
  --c-secondary: #888888;
  --c-primary: #e8e4dc;
  --c-accent: #c4a35a;
  --c-accent-dim: rgba(196, 163, 90, 0.12);
  --c-accent-hover: #d4b36a;

  // Typography
  --font-display: 'Shippori Mincho', 'Noto Serif SC', serif;
  --font-body: 'DM Sans', 'Noto Sans SC', sans-serif;
  --font-mono: 'DM Mono', monospace;

  // Motion
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-base: 600ms;
  --duration-slow: 1000ms;

  // Header height
  --header-h: 6rem;
}

// ─── Light Theme ─────────────────────────────────────────────────────────────
[data-theme='light'] {
  --c-bg: #ffffff;
  --c-surface: #f7f7f5;
  --c-surface-2: #f0f0ee;
  --c-border: #e2e2df;
  --c-muted: #aaaaaa;
  --c-secondary: #666666;
  --c-primary: #1a1a1a;
  --c-accent: #c4a35a;
  --c-accent-dim: rgba(196, 163, 90, 0.12);
  --c-accent-hover: #b89545;
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
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
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
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--c-primary);
}

p,
li {
  font-family: var(--font-body);
  color: var(--c-secondary);
  font-weight: 300;
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
  letter-spacing: 0.15em;
  text-transform: uppercase;
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
  color: var(--c-bg);
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
}
</style>
