<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <span class="logo-en">BAIHU</span>
          <span class="logo-sep">｜</span>
          <span class="logo-zh">白鹄动画</span>
        </RouterLink>
        <p class="footer-tagline">Animation Production Studio</p>
      </div>

      <!-- Nav Columns -->
      <div class="footer-nav">
        <div class="footer-col">
          <span class="footer-col-title">Navigation</span>
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="footer-link">
            {{ $t(item.label) }}
          </RouterLink>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Contact</span>
          <a href="mailto:baihu_animation@163.com" class="footer-link"> baihu_animation@163.com </a>
          <a
            href="https://weibo.com/u/8001978950"
            target="_blank"
            rel="noopener"
            class="footer-link"
          >
            微博 Weibo
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <span class="footer-copy">
        &copy; {{ currentYear }} {{ $t('footer.copyright') }}. {{ $t('footer.rights') }}
      </span>
      <span class="footer-made">Hangzhou, China</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * 全局底部组件：包含品牌信息、导航链接、联系方式、版权信息
 */
import { computed } from 'vue'
import { NAV_ITEMS } from '@/data/nav'

/** 当前年份，用于版权信息 */
const currentYear = computed(() => new Date().getFullYear())
const navItems = NAV_ITEMS
</script>

<style lang="scss" scoped>
.site-footer {
  background: var(--c-bg);
  border-top: 1px solid var(--c-border);
  padding-top: 6rem;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  padding: 0 8rem 6rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    padding: 0 5rem 5rem;
  }

  @media (max-width: 1024px) {
    padding: 0 4rem 5rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 5vw 4rem;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    padding: 0 5vw 4rem;
    gap: 4rem;
  }

  @media (max-width: 430px) {
    padding: 0 4vw 3rem;
    gap: 3.5rem;
  }
}

// ─── Brand ───────────────────────────────────────────────────────────────────
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: opacity var(--duration-fast);

  .logo-en {
    font-family: var(--font-mono);
    font-size: 1.3rem;
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
  }

  &:hover {
    opacity: 0.7;
  }
}

.footer-tagline {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.12em;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
.footer-nav {
  display: flex;
  gap: 6rem;

  @media (max-width: 1024px) {
    gap: 5rem;
  }

  @media (max-width: 768px) {
    gap: 4rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 3rem;
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 430px) {
    gap: 1rem;
  }
}

.footer-col-title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--c-muted);
  margin-bottom: 0.4rem;

  @media (max-width: 430px) {
    font-size: 0.85rem;
  }
}

.footer-link {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-secondary);
  min-height: 3rem;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: color var(--duration-fast);

  &:hover {
    color: var(--c-primary);
  }

  &:active {
    color: var(--c-accent);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 430px) {
    font-size: 1rem;
    min-height: 2.8rem;
  }
}

// ─── Bottom Bar ──────────────────────────────────────────────────────────────
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 8rem;
  border-top: 1px solid var(--c-border);
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    padding: 2rem 5rem;
  }

  @media (max-width: 1024px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 2rem 5vw;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.5rem 5vw;
  }

  @media (max-width: 430px) {
    padding: 1.5rem 4vw;
  }
}

.footer-copy,
.footer-made {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.06em;

  @media (max-width: 430px) {
    font-size: 0.85rem;
  }
}
</style>
