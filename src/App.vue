<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useTheme } from '@/composables/useTheme'
import { useRouterPrefetch } from '@/composables/useRouterPrefetch'

// 初始化主题（自动检测系统偏好 + 读取用户持久化选择）
useTheme()

// 初始化路由预加载（hover + 视口预加载）
useRouterPrefetch()
</script>

<style lang="scss">
// ─── Google Fonts ─────────────────────────────────────────────────────────────
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=DM+Sans:wght@200;300;400&family=Noto+Sans+SC:wght@300;400&family=Noto+Serif+SC:wght@300;400;600&family=Shippori+Mincho:wght@300;400;600&display=swap');

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
  font-size: calc(100vw / 192); // 1920px 设计稿，1rem = 10px
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
// 超小屏 iPhone SE (375px)
@media (max-width: 390px) {
  html {
    font-size: 13px;
  }
  :root {
    --header-h: 5.5rem;
  }
}
// 标准手机 iPhone XR (414px) ~ 430px
@media (min-width: 391px) and (max-width: 430px) {
  html {
    font-size: 14px;
  }
  :root {
    --header-h: 5.5rem;
  }
}
// 大手机 431~767px
@media (min-width: 431px) and (max-width: 767px) {
  html {
    font-size: 14.5px;
  }
  :root {
    --header-h: 6rem;
  }
}
// 平板竖屏 768~1023px
@media (min-width: 768px) and (max-width: 1023px) {
  html {
    font-size: 13px;
  }
  :root {
    --header-h: 6.5rem;
  }
}
// 平板横屏/小桌面 1024~1279px
@media (min-width: 1024px) and (max-width: 1279px) {
  html {
    font-size: calc(100vw / 192);
  }
  :root {
    --header-h: 6rem;
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

// ─── Theme Transition ─────────────────────────────────────────────────────────
// 过渡放在 :root 上始终生效，data-theme 属性变化时触发平滑动画
:root {
  transition:
    background-color var(--duration-base) ease,
    border-color var(--duration-base) ease,
    color var(--duration-base) ease,
    box-shadow var(--duration-base) ease;
}

// 仅排除真正不需要过渡的元素（装饰性媒体和固定动画元素）
img,
video,
[class*='marquee-'],
[class*='parallax-'] {
  transition: none !important;
}
</style>
