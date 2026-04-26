<template>
  <header :class="['site-header', { 'is-scrolled': scrolled, 'menu-open': menuOpen }]">
    <div class="header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo" @click="closeMenu">
        <span class="logo-en">BAIHU</span>
        <span class="logo-sep">｜</span>
        <span class="logo-zh">白鹄动画</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link">
          {{ $t(item.label) }}
        </RouterLink>
      </nav>

      <!-- Right Controls -->
      <div class="header-controls">
        <!-- Theme Toggle -->
        <button
          class="theme-btn"
          @click="toggleTheme"
          :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
        >
          <!-- Sun icon (shown in dark mode) -->
          <svg
            v-if="isDark"
            class="theme-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg
            v-else
            class="theme-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Language Dropdown -->
        <div class="lang-select">
          <button
            class="lang-btn"
            @click.stop="langOpen = !langOpen"
            :aria-label="`选择语言 (当前: ${langLabel})`"
            :aria-expanded="langOpen"
          >
            {{ langLabel }}
          </button>
          <Transition name="lang-drop">
            <ul v-if="langOpen" class="lang-menu">
              <li
                v-for="opt in LANG_OPTIONS"
                :key="opt.value"
                :class="{ active: currentLang === opt.value }"
                @click.stop="selectLang(opt.value)"
              >
                {{ opt.label }}
              </li>
            </ul>
          </Transition>
        </div>

        <!-- Hamburger (mobile) -->
        <button
          class="hamburger"
          :class="{ 'is-open': menuOpen }"
          @click="toggleMenu"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          :aria-expanded="menuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer" @click.self="closeMenu">
        <nav class="mobile-nav" aria-label="Mobile navigation">
          <RouterLink
            v-for="(item, i) in navItems"
            :key="item.to"
            :to="item.to"
            class="mobile-nav-link"
            :style="{ '--i': i }"
            @click="closeMenu"
          >
            <span class="mobile-nav-num">0{{ i + 1 }}</span>
            <span class="mobile-nav-label">{{ $t(item.label) }}</span>
            <span class="mobile-nav-arrow">→</span>
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>

  <!-- Overlay -->
  <Transition name="fade">
    <div v-if="menuOpen" class="header-overlay" @click="closeMenu"></div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * 全局头部导航组件：包含 Logo、桌面导航、主题切换、语言切换、移动端菜单
 */
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { locale, setLocale, LOCALE_ORDER, LOCALE_LABEL } from '@/composables/useI18n'
import type { Locale } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'
import { NAV_ITEMS } from '@/data/nav'

// ─── Theme ───────────────────────────────────────────────────────────────────
const { theme: currentTheme, toggleTheme } = useTheme()
/** 当前是否为暗色主题 */
const isDark = computed(() => currentTheme.value === 'dark')

// ─── Scroll state ────────────────────────────────────────────────────────────
/** 页面滚动后添加背景模糊效果 */
const scrolled = ref(false)
const handleScroll = () => {
  scrolled.value = window.scrollY > 40
}
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// ─── Mobile menu ─────────────────────────────────────────────────────────────
/** 移动端抽屉菜单是否展开 */
const menuOpen = ref(false)
/** 切换移动端菜单展开/收起 */
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const closeMenu = () => {
  menuOpen.value = false
}

// ─── Language ─────────────────────────────────────────────────────────────────
/** 语言下拉菜单是否展开 */
const langOpen = ref(false)
/** 当前语言代码 */
const currentLang = computed(() => locale.value)
/** 当前语言标签（如 '中'、'EN'） */
const langLabel = computed(() => LOCALE_LABEL[currentLang.value])
/** 语言选项列表 */
const LANG_OPTIONS = computed(() =>
  LOCALE_ORDER.map((code) => ({ value: code, label: LOCALE_LABEL[code] })),
)
/** 选择语言并关闭下拉 */
const selectLang = (code: Locale) => {
  setLocale(code)
  langOpen.value = false
}

// 点击外部关闭下拉
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.lang-select')) {
    langOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = NAV_ITEMS
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-h);
  transition:
    background var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out);
  border-bottom: 1px solid transparent;

  &.is-scrolled {
    border-bottom-color: var(--c-border);

    [data-theme='dark'] & {
      background: rgba(10, 10, 10, 0.88);
      backdrop-filter: blur(12px);
    }

    [data-theme='light'] & {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(12px);
    }
  }

  &.menu-open {
    border-bottom-color: var(--c-border);

    [data-theme='dark'] & {
      background: rgba(10, 10, 10, 0.98);
    }

    [data-theme='light'] & {
      background: rgba(255, 255, 255, 0.96);
    }
  }
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 6rem;

  @media (max-width: 1280px) {
    padding: 0 5rem;
  }
  @media (max-width: 1024px) {
    padding: 0 4rem;
  }
  @media (max-width: 768px) {
    padding: 0 5vw;
  }
}

// ─── Logo ──────────────────────────────────────────────────────────────────────
.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
  transition: opacity var(--duration-fast);

  .logo-en {
    font-family: var(--font-mono);
    font-size: 1.4rem;
    letter-spacing: 0.2em;
    color: var(--c-accent);
  }
  .logo-sep {
    color: var(--c-border);
    font-size: 1.1rem;
  }
  .logo-zh {
    font-family: var(--font-display);
    font-size: 1.3rem;
    letter-spacing: 0.15em;
    color: var(--c-primary);
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.7;
  }
}

// ─── Desktop Nav ───────────────────────────────────────────────────────────────
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  margin-left: 6rem;

  @media (max-width: 1024px) {
    display: none;
  }
}

.nav-link {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-secondary);
  font-weight: 300;
  letter-spacing: 0.06em;
  position: relative;
  padding-bottom: 0.4rem;
  transition: color var(--duration-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--c-accent);
    transition: width var(--duration-fast) var(--ease-out);
  }

  &:hover,
  &.router-link-active {
    color: var(--c-primary);
    &::after {
      width: 100%;
    }
  }
}

// ─── Controls ──────────────────────────────────────────────────────────────────
.header-controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-left: auto;

  @media (max-width: 430px) {
    gap: 0.8rem;
  }
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-secondary);
  transition: color var(--duration-fast);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    color: var(--c-accent);
  }

  .theme-icon {
    width: 1.6rem;
    height: 1.6rem;
  }
}

// ─── Language Dropdown ─────────────────────────────────────────────────────────
.lang-select {
  position: relative;
}

.lang-btn {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: var(--c-secondary);
  background: none;
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  min-width: 3rem;
  text-align: center;
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    color: var(--c-accent);
    border-color: var(--c-accent);
  }
}

.lang-menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 4rem;
  list-style: none;
  margin: 0;
  padding: 0.4rem 0;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  overflow: hidden;
  z-index: 110;

  li {
    font-family: var(--font-mono);
    font-size: 1rem;
    letter-spacing: 0.1em;
    color: var(--c-secondary);
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    transition:
      color var(--duration-fast),
      background var(--duration-fast);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    &:hover {
      color: var(--c-primary);
      background: var(--c-surface-2);
    }

    &.active {
      color: var(--c-accent);
    }
  }
}

.lang-drop-enter-active,
.lang-drop-leave-active {
  transition:
    opacity 0.15s var(--ease-out),
    transform 0.15s var(--ease-out);
}
.lang-drop-enter-from,
.lang-drop-leave-to {
  opacity: 0;
  transform: translateY(-0.4rem);
}

// ─── Hamburger ─────────────────────────────────────────────────────────────────
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 2.8rem;
  height: 2.8rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (max-width: 1024px) {
    display: flex;
  }

  span {
    display: block;
    width: 100%;
    height: 1px;
    background: var(--c-primary);
    transition: transform var(--duration-fast) var(--ease-out);
    transform-origin: center;
  }

  &.is-open {
    span:nth-child(1) {
      transform: rotate(45deg) translate(0.4rem, 0.4rem);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(0.4rem, -0.4rem);
    }
  }
}

// ─── Mobile Drawer ─────────────────────────────────────────────────────────────
.mobile-drawer {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  padding: 4rem 5vw;
  display: flex;
  flex-direction: column;

  [data-theme='dark'] & {
    background: var(--c-bg);
  }
  [data-theme='light'] & {
    background: var(--c-bg);
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid var(--c-border);
  color: var(--c-primary);
  font-size: 2.2rem;
  animation: slideInUp 0.4s var(--ease-out) both;
  animation-delay: calc(var(--i) * 0.06s);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  .mobile-nav-num {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--c-muted);
    min-width: 2rem;
  }
  .mobile-nav-label {
    flex: 1;
    font-family: var(--font-display);
    letter-spacing: 0.04em;
  }
  .mobile-nav-arrow {
    color: var(--c-accent);
    font-size: 1.6rem;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ─── Overlay ───────────────────────────────────────────────────────────────────
.header-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

// ─── Transitions ───────────────────────────────────────────────────────────────
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s var(--ease-out);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
