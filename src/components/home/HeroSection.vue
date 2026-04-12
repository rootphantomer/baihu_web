<template>
  <section class="hero">
    <!-- Background grid lines -->
    <div class="hero-grid" aria-hidden="true">
      <span v-for="n in 6" :key="n" class="grid-line"></span>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <p class="hero-label label">{{ $t('home.hero.subtitle') }}</p>

      <h1 class="hero-title">
        <span class="hero-name-en">BAIHU</span>
        <span class="hero-name-zh">白鹄动画</span>
      </h1>

      <p class="hero-tagline">{{ $t('home.hero.tagline') }}</p>

      <div class="hero-actions">
        <RouterLink to="/works" class="hero-btn-primary">
          {{ $t('home.works.viewAll') }}
          <span class="btn-arrow">→</span>
        </RouterLink>
        <RouterLink to="/contact" class="hero-btn-ghost">
          {{ $t('home.contact.label') }}
        </RouterLink>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll" aria-hidden="true">
      <span class="scroll-line"></span>
      <span class="scroll-text label">{{ $t('home.hero.scroll') }}</span>
    </div>

    <!-- Large decorative number -->
    <span class="hero-deco" aria-hidden="true">{{ currentYear }}</span>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--c-bg);
}

// ─── Background Grid ──────────────────────────────────────────────────────────
.hero-grid {
  position: absolute;
  inset: 0;
  display: flex;
  pointer-events: none;
}

.grid-line {
  flex: 1;
  border-right: 1px solid var(--c-border);
  opacity: 0.5;

  &:last-child {
    border-right: none;
  }
}

// ─── Content ─────────────────────────────────────────────────────────────────
.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 8rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  animation: heroEnter 1s var(--ease-out) both;
}

.hero-label {
  font-size: 1.1rem;
  color: var(--c-muted);
  letter-spacing: 0.2em;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.95;
}

.hero-name-en {
  font-family: var(--font-display);
  font-size: 11rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;
  display: block;
}

.hero-name-zh {
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 300;
  color: var(--c-accent);
  letter-spacing: 0.4em;
  display: block;
  padding-left: 0.4rem;
}

.hero-tagline {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--c-secondary);
  letter-spacing: 0.12em;
  max-width: 50rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 1rem;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.4rem 2.8rem;
  background: var(--c-accent);
  color: var(--c-bg);
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  transition:
    background var(--duration-fast),
    gap var(--duration-fast);

  &:hover {
    background: var(--c-primary);
    gap: 1.5rem;
  }

  .btn-arrow {
    transition: transform var(--duration-fast);
  }

  &:hover .btn-arrow {
    transform: translateX(0.3rem);
  }
}

.hero-btn-ghost {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--c-secondary);
  letter-spacing: 0.1em;
  position: relative;
  padding-bottom: 0.3rem;
  transition: color var(--duration-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--c-accent);
    transition: width var(--duration-base) var(--ease-out);
  }

  &:hover {
    color: var(--c-primary);

    &::after {
      width: 100%;
    }
  }
}

// ─── Scroll Indicator ────────────────────────────────────────────────────────
.hero-scroll {
  position: absolute;
  bottom: 4rem;
  left: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  z-index: 2;
}

.scroll-line {
  display: block;
  width: 1px;
  height: 6rem;
  background: linear-gradient(to bottom, var(--c-accent), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

.scroll-text {
  font-size: 0.9rem;
  color: var(--c-muted);
  writing-mode: vertical-rl;
  letter-spacing: 0.2em;
}

// ─── Decorative Number ───────────────────────────────────────────────────────
.hero-deco {
  position: absolute;
  right: -2rem;
  bottom: -4rem;
  font-family: var(--font-mono);
  font-size: 28rem;
  font-weight: 400;
  color: transparent;
  -webkit-text-stroke: 1px var(--c-border);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  z-index: 1;
}

// ─── Animations ──────────────────────────────────────────────────────────────
@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(0.8);
  }

  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

// ─── Responsive ──────────────────────────────────────────────────────────────
@media (max-width: 1280px) {
  .hero-name-en {
    font-size: 8rem;
  }

  .hero-name-zh {
    font-size: 4rem;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    padding: 0 4rem;
  }

  .hero-scroll {
    left: 4rem;
  }

  .hero-name-en {
    font-size: 6rem;
  }

  .hero-name-zh {
    font-size: 3.2rem;
  }

  .hero-deco {
    font-size: 20rem;
  }
}

// 平板竖屏
@media (max-width: 900px) {
  .hero-content {
    padding: 0 5vw;
    gap: 2.4rem;
  }

  .hero-scroll {
    left: 5vw;
    bottom: 3rem;
  }

  .hero-name-en {
    font-size: 5.5rem;
  }

  .hero-name-zh {
    font-size: 2.8rem;
    letter-spacing: 0.3em;
  }

  .hero-tagline {
    font-size: 1.6rem;
    max-width: 80%;
  }

  .hero-deco {
    font-size: 16rem;
    right: -1.5rem;
    bottom: -3rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 5vw;
    gap: 2rem;
  }

  .hero-scroll {
    display: none;
  }

  .hero-name-en {
    font-size: 4.5rem;
  }

  .hero-name-zh {
    font-size: 2.4rem;
    letter-spacing: 0.25em;
  }

  .hero-tagline {
    font-size: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .hero-btn-primary {
    width: 100%;
    justify-content: center;
    padding: 1.6rem 2rem;
    font-size: 1.3rem;
  }

  .hero-btn-ghost {
    font-size: 1.3rem;
  }

  .hero-deco {
    font-size: 14rem;
    right: -1rem;
    bottom: -2rem;
  }
}

// iPhone SE / 超小屏
@media (max-width: 390px) {
  .hero-name-en {
    font-size: 3.8rem;
  }

  .hero-name-zh {
    font-size: 2rem;
    letter-spacing: 0.2em;
  }

  .hero-tagline {
    font-size: 1.4rem;
    line-height: 1.7;
  }

  .hero-deco {
    font-size: 10rem;
  }
}
</style>
