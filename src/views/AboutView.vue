<template>
  <main class="page-about">
    <div class="page-header">
      <div class="page-header-inner">
        <span class="label">{{ $t('about.subtitle') }}</span>
        <h1 class="page-title">{{ $t('about.title') }}</h1>
      </div>
    </div>

    <!-- Statement -->
    <section class="about-statement">
      <div class="section-inner">
        <p class="statement-text">{{ $t('about.statement') }}</p>
      </div>
    </section>

    <!-- Stats -->
    <section class="about-stats">
      <div class="section-inner stats-grid">
        <div class="stat-item" v-for="stat in stats" :key="stat.value">
          <span class="stat-num"
            >{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></span
          >
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="about-values">
      <div class="section-inner">
        <div class="values-header">
          <span class="label">{{ $t('about.values.label') }}</span>
        </div>
        <div class="values-grid">
          <div class="value-card" v-for="(v, i) in values" :key="i">
            <span class="value-num">0{{ i + 1 }}</span>
            <h3 class="value-title">{{ v.title }}</h3>
            <p class="value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="about-mission">
      <div class="section-inner mission-inner">
        <span class="label">{{ $t('about.mission.label') }}</span>
        <blockquote class="mission-text">"{{ $t('about.mission.text') }}"</blockquote>
      </div>
    </section>

    <!-- History -->
    <section class="about-history">
      <div class="section-inner">
        <div class="history-header">
          <span class="label">{{ $t('about.history.label') }}</span>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="item in history" :key="item.year">
            <span class="tl-year">{{ item.year }}</span>
            <span class="tl-dot"></span>
            <p class="tl-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@/composables/useI18n'

const stats = computed(() => [
  { value: '2025', unit: '', label: t('home.about.stats.founded') },
  { value: '10', unit: '+', label: t('home.about.stats.team') },
  { value: '45', unit: '+', label: t('home.about.stats.projects') },
  { value: '8', unit: '+', label: t('about.clients.label') },
])

const values = computed(() => [
  { title: t('about.values.quality.title'), desc: t('about.values.quality.desc') },
  { title: t('about.values.culture.title'), desc: t('about.values.culture.desc') },
  { title: t('about.values.scale.title'), desc: t('about.values.scale.desc') },
])

const history = computed(() => {
  const items = t('about.history.items')
  return Array.isArray(items) ? items : []
})
</script>

<style lang="scss" scoped>
.page-about {
  padding-top: var(--header-h);
  background: var(--c-bg);
}

.page-header {
  border-bottom: 1px solid var(--c-border);
  padding: 8rem 8rem 5rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 5rem 5vw 3.5rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 5vw 3rem;
  }
}

.page-header-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.04em;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
}

.section-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 5rem 5vw;
  }

  @media (max-width: 768px) {
    padding: 5rem 5vw;
  }
}

// ─── Statement ────────────────────────────────────────────────────────────────
.about-statement {
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.statement-text {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--c-secondary);
  line-height: 2;
  letter-spacing: 0.06em;
  max-width: 100rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────
.about-stats {
  border-bottom: 1px solid var(--c-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem 0;
  border-right: 1px solid var(--c-border);

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;

    &:nth-child(2n) {
      border-right: none;
    }
  }
}

.stat-num {
  font-family: var(--font-mono);
  font-size: 5rem;
  font-weight: 400;
  color: var(--c-primary);
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
}

.stat-unit {
  font-size: 0.6em;
  color: var(--c-accent);
  vertical-align: super;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.12em;
}

// ─── Values ───────────────────────────────────────────────────────────────────
.about-values {
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.values-header {
  margin-bottom: 4rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--c-border);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.value-card {
  background: var(--c-surface);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background var(--duration-fast);

  &:hover {
    background: var(--c-surface-2);
  }

  @media (max-width: 900px) {
    padding: 3rem 5vw;
  }
}

.value-num {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
}

.value-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--c-primary);
}

.value-desc {
  font-size: 1.3rem;
  color: var(--c-secondary);
  line-height: 1.9;
}

// ─── Mission ─────────────────────────────────────────────────────────────────
.about-mission {
  border-bottom: 1px solid var(--c-border);
}

.mission-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mission-text {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 300;
  color: var(--c-primary);
  letter-spacing: 0.08em;
  line-height: 1.6;
  border-left: 2px solid var(--c-accent);
  padding-left: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

// ─── History ──────────────────────────────────────────────────────────────────
.about-history {
  background: var(--c-surface);
}

.history-header {
  margin-bottom: 5rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 9rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--c-border);

    @media (max-width: 768px) {
      left: 5rem;
    }
  }
}

.timeline-item {
  display: grid;
  grid-template-columns: 8rem 2rem 1fr;
  gap: 2rem;
  align-items: start;
  padding: 3rem 0;
  border-bottom: 1px solid var(--c-border);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: 4.5rem 2rem 1fr;
    gap: 1.5rem;
    padding: 2.5rem 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 4rem 2rem 1fr;
    gap: 1.2rem;
  }
}

.tl-year {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--c-accent);
  letter-spacing: 0.1em;
  text-align: right;
  padding-top: 0.2rem;
}

.tl-dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--c-accent);
  border: 2px solid var(--c-bg);
  margin-top: 0.4rem;
  box-shadow: 0 0 0 1px var(--c-accent);
  flex-shrink: 0;
}

.tl-desc {
  font-family: var(--font-body);
  font-size: 1.4rem;
  color: var(--c-secondary);
  line-height: 1.8;
}
</style>
