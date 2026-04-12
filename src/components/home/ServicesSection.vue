<template>
  <section class="services-section">
    <div class="services-inner">
      <div class="services-header">
        <span class="label">{{ $t('server.animation.title') }}</span>
        <h2 class="services-title">What We Do</h2>
      </div>

      <div class="services-grid">
        <div class="service-card" v-for="(svc, i) in services" :key="i">
          <span class="service-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="service-name">{{ svc.name }}</h3>
          <p class="service-desc">{{ svc.desc }}</p>
          <ul class="service-list">
            <li v-for="item in svc.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const services = computed(() => [
  {
    name: t('server.animation.title'),
    desc: t('server.animation.desc'),
    items: [
      t('server.coverage.items.movie'),
      t('server.coverage.items.series'),
      t('server.coverage.items.pv'),
      t('server.coverage.items.cinematic'),
    ],
  },
  {
    name: t('server.preDesign.title'),
    desc: t('server.preDesign.desc'),
    items: [
      t('server.artDesign.items.script'),
      t('server.artDesign.items.concept'),
      t('server.artDesign.items.style'),
    ],
  },
  {
    name: t('server.coverage.title'),
    desc: '',
    items: [
      t('server.coverage.items.movie'),
      t('server.coverage.items.series'),
      t('server.coverage.items.pv'),
      t('server.coverage.items.character'),
    ],
  },
])
</script>

<style lang="scss" scoped>
.services-section {
  border-top: 1px solid var(--c-border);
  background: var(--c-bg);
}

.services-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;

  @media (max-width: 1024px) { padding: 8rem 4rem; }
  @media (max-width: 900px)  { padding: 6rem 5vw; }
  @media (max-width: 768px)  { padding: 5rem 5vw; }
}

.services-header {
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.services-title {
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.04em;

  @media (max-width: 768px) { font-size: 3.5rem; }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--c-border);

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
  @media (max-width: 900px)  { grid-template-columns: 1fr; }
}

.service-card {
  background: var(--c-bg);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: background var(--duration-fast);

  &:hover { background: var(--c-surface); }

  @media (max-width: 1024px) { padding: 3rem; }
}

.service-num {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
}

.service-name {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;
  line-height: 1.3;
}

.service-desc {
  font-family: var(--font-body);
  font-size: 1.3rem;
  color: var(--c-secondary);
  line-height: 1.8;
}

.service-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: auto;

  li {
    font-family: var(--font-body);
    font-size: 1.2rem;
    color: var(--c-muted);
    padding-left: 1.2rem;
    position: relative;

    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: var(--c-accent);
      font-size: 0.8em;
    }
  }
}
</style>
