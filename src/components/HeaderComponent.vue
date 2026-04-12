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
        <!-- Language Switch -->
        <button class="lang-btn" @click="toggleLang" :aria-label="currentLang === 'zh-CN' ? '切换到日本語' : '中文に切り替える'">
          <span :class="{ active: currentLang === 'zh-CN' }">中</span>
          <span class="lang-divider">/</span>
          <span :class="{ active: currentLang === 'ja-JP' }">日</span>
        </button>

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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// ─── Scroll state ────────────────────────────────────────────────────────────
const scrolled = ref(false)
const handleScroll = () => { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// ─── Mobile menu ─────────────────────────────────────────────────────────────
const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

// ─── Language ─────────────────────────────────────────────────────────────────
const currentLang = computed(() => locale.value)
const toggleLang = () => {
  locale.value = locale.value === 'zh-CN' ? 'ja-JP' : 'zh-CN'
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { to: '/',           label: 'header.home' },
  { to: '/works',      label: 'header.works' },
  { to: '/about',      label: 'header.about' },
  { to: '/news',       label: 'header.news' },
  { to: '/join',       label: 'header.join' },
  { to: '/contact',    label: 'header.contact' },
]
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
    background: rgba(10, 10, 10, 0.88);
    backdrop-filter: blur(12px);
    border-bottom-color: var(--c-border);
  }

  &.menu-open {
    background: rgba(10, 10, 10, 0.98);
    border-bottom-color: var(--c-border);
  }
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 6rem;
  gap: 4rem;
}

// ─── Logo ────────────────────────────────────────────────────────────────────
.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  letter-spacing: 0.08em;
  flex-shrink: 0;

  .logo-en {
    font-family: var(--font-mono);
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--c-accent);
    letter-spacing: 0.2em;
  }

  .logo-sep {
    color: var(--c-border);
    font-size: 1.2rem;
  }

  .logo-zh {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--c-primary);
    letter-spacing: 0.15em;
  }

  &:hover .logo-en { color: var(--c-primary); }
  transition: opacity var(--duration-fast);
}

// ─── Desktop Nav ─────────────────────────────────────────────────────────────
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  margin-left: auto;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--c-secondary);
  letter-spacing: 0.1em;
  position: relative;
  transition: color var(--duration-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: -0.4rem;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--c-accent);
    transition: width var(--duration-base) var(--ease-out);
  }

  &:hover,
  &.router-link-active {
    color: var(--c-primary);
    &::after { width: 100%; }
  }
}

// ─── Header Controls ─────────────────────────────────────────────────────────
.header-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;
}

.lang-btn {
  background: none;
  border: 1px solid var(--c-border);
  color: var(--c-secondary);
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.1em;
  padding: 0.4rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: border-color var(--duration-fast), color var(--duration-fast);

  .lang-divider { opacity: 0.3; }

  span.active {
    color: var(--c-accent);
  }

  &:hover {
    border-color: var(--c-accent);
    color: var(--c-primary);
  }
}

// ─── Hamburger ───────────────────────────────────────────────────────────────
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 3.2rem;
  height: 3.2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;

  span {
    display: block;
    height: 1px;
    background: var(--c-primary);
    transition: transform var(--duration-base) var(--ease-out),
                opacity var(--duration-fast);

    &:nth-child(1) { width: 100%; }
    &:nth-child(2) { width: 70%; margin-left: auto; }
    &:nth-child(3) { width: 100%; }
  }

  &.is-open {
    span:nth-child(1) { transform: translateY(0.6rem) rotate(45deg); width: 100%; }
    span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    span:nth-child(3) { transform: translateY(-0.6rem) rotate(-45deg); }
  }
}

// ─── Mobile Drawer ───────────────────────────────────────────────────────────
.mobile-drawer {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
  z-index: 99;
  overflow-y: auto;
  padding: 3rem 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem 5vw;
  border-bottom: 1px solid var(--c-border);
  transition: background var(--duration-fast);
  animation: slideInUp var(--duration-base) calc(var(--i) * 60ms) var(--ease-out) both;

  .mobile-nav-num {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--c-accent);
    letter-spacing: 0.1em;
    flex-shrink: 0;
  }

  .mobile-nav-label {
    font-family: var(--font-display);
    font-size: 2.4rem;
    font-weight: 400;
    color: var(--c-primary);
    flex: 1;
    letter-spacing: 0.1em;
  }

  .mobile-nav-arrow {
    color: var(--c-muted);
    font-size: 1.6rem;
    transition: transform var(--duration-fast), color var(--duration-fast);
  }

  &:hover,
  &.router-link-active {
    background: var(--c-accent-dim);
    .mobile-nav-arrow { transform: translateX(0.4rem); color: var(--c-accent); }
  }
}

// ─── Overlay ─────────────────────────────────────────────────────────────────
.header-overlay {
  position: fixed;
  inset: 0;
  z-index: 98;
  background: rgba(0, 0, 0, 0.5);
}

// ─── Transitions ─────────────────────────────────────────────────────────────
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.fade-enter-active,
.fade-leave-active { transition: opacity var(--duration-base); }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }

// ─── Keyframes ───────────────────────────────────────────────────────────────
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}

// ─── Responsive ──────────────────────────────────────────────────────────────
@media (max-width: 1024px) {
  .header-inner {
    padding: 0 3rem;
    gap: 2rem;
  }
  .desktop-nav { gap: 2rem; }
  .nav-link { font-size: 1.1rem; }
}

// 平板竖屏及以下：隐藏桌面导航，改用汉堡菜单
@media (max-width: 900px) {
  .header-inner {
    padding: 0 5vw;
    gap: 1rem;
  }
  .desktop-nav { display: none; }
  .hamburger   { display: flex; }
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 4vw;
  }
  .lang-btn {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }
  .hamburger {
    width: 3.8rem;
    height: 3.8rem;
  }
}

// 移动端菜单字体适配
@media (max-width: 430px) {
  .mobile-nav-link {
    padding: 1.8rem 5vw;
    .mobile-nav-label { font-size: 2rem; }
  }
}
</style>
