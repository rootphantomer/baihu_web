<template>
  <main class="page-about">
    <header class="page-head">
      <div class="page-head-inner" data-reveal="up">
        <span class="label">{{ $t('about.subtitle') }}</span>
        <h1 class="page-title">{{ $t('about.title') }}</h1>
      </div>
    </header>

    <section class="about-statement">
      <p class="statement-text">{{ $t('about.statement') }}</p>
    </section>

    <section class="about-numbers">
      <div class="numbers-inner">
        <div class="number-item" v-for="stat in stats" :key="stat.label">
          <span class="number-value"
            >{{ stat.value }}<i>{{ stat.unit }}</i></span
          >
          <span class="number-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="about-manifesto">
      <div class="manifesto-inner">
        <span class="label">{{ $t('about.manifesto.label') }}</span>
        <div class="manifesto-list">
          <article class="manifesto-item" v-for="v in values" :key="v.title">
            <h2>{{ v.title }}</h2>
            <p>{{ v.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-mission">
      <div class="mission-inner">
        <span class="label">{{ $t('about.mission.label') }}</span>
        <blockquote>“{{ $t('about.mission.text') }}”</blockquote>
      </div>
    </section>

    <section class="about-bottom">
      <div class="bottom-col">
        <span class="label">{{ $t('about.history.label') }}</span>
        <div class="timeline">
          <div class="timeline-item" v-for="item in history" :key="item.year">
            <span class="tl-year">{{ item.year }}</span>
            <p class="tl-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class="bottom-col">
        <span class="label">{{ $t('about.faq.label') }}</span>
        <dl class="faq-list">
          <div class="faq-item" v-for="(item, i) in faqItems" :key="i">
            <dt>{{ item.q }}</dt>
            <dd>{{ item.a }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/** 关于我们页面：工作室自述 + 数据 + 信念 + 使命 + 历程/FAQ */
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

const faqItems = computed(() => {
  const items = t('about.faq.items')
  return Array.isArray(items) ? items : []
})
</script>

<style lang="scss" scoped>
.page-about {
  padding-top: var(--header-h);
  background: transparent;
}

.page-head {
  border-bottom: 1px solid var(--c-border);
  padding: 8rem 8rem 5rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 5rem 5vw 3rem;
  }
}

.page-head-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1;
  color: var(--c-primary);

  @media (max-width: 768px) {
    font-size: 4rem;
  }
}

// ─── Statement ────────────────────────────────────────────────────────────────
.about-statement {
  max-width: 1600px;
  margin: 0 auto;
  padding: 12rem 8rem;

  @media (max-width: 1024px) {
    padding: 8rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
  }
}

.statement-text {
  font-family: var(--font-serif);
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0.04em;
  color: var(--c-primary);
  max-width: 108rem;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

// ─── Numbers ──────────────────────────────────────────────────────────────────
.about-numbers {
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.numbers-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 6rem 8rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1024px) {
    padding: 5rem 4rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 4rem 5vw;
  }
}

.number-item {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.number-value {
  font-family: var(--font-mono);
  font-size: 6rem;
  line-height: 1;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;

  i {
    font-size: 0.5em;
    font-style: normal;
    vertical-align: super;
  }

  @media (max-width: 768px) {
    font-size: 4.4rem;
  }
}

.number-label {
  font-size: 1.1rem;
  color: var(--c-muted);
  letter-spacing: 0.08em;
}

// ─── Manifesto ────────────────────────────────────────────────────────────────
.about-manifesto {
  max-width: 1600px;
  margin: 0 auto;
  padding: 12rem 8rem;

  @media (max-width: 1024px) {
    padding: 8rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
  }
}

.manifesto-inner {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.manifesto-list {
  border-top: 1px solid var(--c-border);
}

.manifesto-item {
  display: grid;
  grid-template-columns: 28rem 1fr;
  gap: 4rem;
  padding: 4rem 0;
  border-bottom: 1px solid var(--c-border);

  h2 {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--c-primary);
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.4rem;
    line-height: 1.9;
    color: var(--c-secondary);
    max-width: 64rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    padding: 3rem 0;

    h2 {
      font-size: 2.2rem;
    }
  }
}

// ─── Mission ──────────────────────────────────────────────────────────────────
.about-mission {
  background: var(--c-surface);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.mission-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 1024px) {
    padding: 8rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
  }

  blockquote {
    max-width: 110rem;
    font-family: var(--font-serif);
    font-size: 3rem;
    line-height: 1.7;
    color: var(--c-primary);
    text-wrap: balance;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
}

// ─── History / FAQ ────────────────────────────────────────────────────────────
.about-bottom {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;

  @media (max-width: 1024px) {
    padding: 8rem 4rem;
    gap: 5rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 6rem 5vw;
  }
}

.bottom-col {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.timeline {
  border-top: 1px solid var(--c-border);
}

.timeline-item {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 2rem;
  padding: 2.4rem 0;
  border-bottom: 1px solid var(--c-border);
}

.tl-year {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--c-accent);
}

.tl-desc {
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--c-secondary);
}

.faq-list {
  border-top: 1px solid var(--c-border);
}

.faq-item {
  padding: 2.4rem 0;
  border-bottom: 1px solid var(--c-border);

  dt {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
    color: var(--c-primary);
  }

  dd {
    margin-top: 1rem;
    font-size: 1.3rem;
    line-height: 1.8;
    color: var(--c-secondary);
  }
}
</style>
