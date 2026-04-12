<template>
  <section class="services-section">
    <div class="services-inner">
      <div class="services-header">
        <span class="services-label">{{ $t('server.services.title') }}</span>
        <h2 class="services-title">What We Do</h2>
        <p class="services-lead">
          {{ $t('server.services.desc') }}
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card" v-for="(svc, i) in services" :key="i">
          <div class="service-card__top">
            <span class="service-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="service-name">{{ svc.name }}</h3>
          </div>
          <p class="service-desc">{{ svc.desc }}</p>
          <ul class="service-list" v-if="svc.items && svc.items.length">
            <li v-for="item in svc.items" :key="item">{{ item }}</li>
          </ul>
          <div class="service-card__rule" aria-hidden="true"></div>
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
    items: [],
  },
  {
    name: t('server.preDesign.title'),
    desc: t('server.preDesign.desc'),
    items: [],
  },
  {
    name: t('server.coverage.title'),
    desc: '',
    items: [
      t('server.coverage.items.movie'),
      t('server.coverage.items.series'),
      t('server.coverage.items.pv'),
      t('server.coverage.items.cinematic'),
      t('server.coverage.items.character'),
      t('server.coverage.items.script'),
      t('server.coverage.items.concept'),
      t('server.coverage.items.style'),
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

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }
  @media (max-width: 1024px) {
    padding: 7rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 6rem 5vw;
  }
  @media (max-width: 767px) {
    padding: 5rem 5vw;
  }
  @media (max-width: 430px) {
    padding: 4rem 1.25rem;
  }
  @media (max-width: 390px) {
    padding: 3.5rem 1rem;
  }
}

/* ── Header ── */
.services-header {
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 3rem;
  row-gap: 1.2rem;
  align-items: start;

  @media (max-width: 767px) {
    margin-bottom: 3.5rem;
    column-gap: 1.5rem;
    row-gap: 1rem;
  }
  @media (max-width: 430px) {
    margin-bottom: 3rem;
  }
}

.services-label {
  grid-column: 1;
  grid-row: 1;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: var(--c-accent);
  text-transform: uppercase;
  padding-top: 0.7em;
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
  }
}

.services-title {
  grid-column: 2;
  grid-row: 1;
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.04em;
  line-height: 1.05;

  @media (max-width: 1280px) {
    font-size: 4.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 3.6rem;
  }
  @media (max-width: 900px) {
    font-size: 3rem;
  }
  @media (max-width: 767px) {
    font-size: 2.6rem;
  }
  @media (max-width: 430px) {
    font-size: 2.2rem;
  }
  @media (max-width: 390px) {
    font-size: 1.9rem;
  }
}

.services-lead {
  grid-column: 2;
  grid-row: 2;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-secondary);
  line-height: 1.9;
  max-width: 52ch;
  margin-top: 0.5rem;

  @media (max-width: 900px) {
    font-size: 1.1rem;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    font-size: 1rem;
    line-height: 1.8;
  }
  @media (max-width: 430px) {
    font-size: 0.95rem;
    line-height: 1.75;
  }
}

/* ── Grid ── */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--c-border);
  border: 1px solid var(--c-border);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* ── Card ── */
.service-card {
  background: var(--c-bg);
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  position: relative;
  transition: background var(--duration-fast);

  &:hover {
    background: var(--c-surface);
  }

  @media (max-width: 1280px) {
    padding: 3rem 2.5rem;
    gap: 1.5rem;
  }
  @media (max-width: 1024px) {
    padding: 2.8rem 2.2rem;
  }
  @media (max-width: 900px) {
    padding: 2.5rem 2rem;
  }
  @media (max-width: 767px) {
    padding: 2.2rem 1.5rem;
    gap: 1.4rem;
  }
  @media (max-width: 430px) {
    padding: 2rem 1.25rem;
    gap: 1.2rem;
  }
  @media (max-width: 390px) {
    padding: 1.8rem 1rem;
  }
}

.service-card__top {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
  line-height: 1;

  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
}

.service-name {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }
  @media (max-width: 900px) {
    font-size: 1.9rem;
  }
  @media (max-width: 767px) {
    font-size: 1.7rem;
  }
  @media (max-width: 430px) {
    font-size: 1.55rem;
  }
  @media (max-width: 390px) {
    font-size: 1.4rem;
  }
}

.service-desc {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-secondary);
  line-height: 1.85;
  flex: 1;

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }
  @media (max-width: 767px) {
    font-size: 1rem;
    line-height: 1.8;
  }
  @media (max-width: 430px) {
    font-size: 0.95rem;
    line-height: 1.75;
  }
}

/* ── List ── */
.service-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;

  li {
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--c-secondary);
    padding-left: 1.2rem;
    position: relative;
    line-height: 1.6;
    transition: color var(--duration-fast);

    &:hover {
      color: var(--c-primary);
    }

    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: var(--c-accent);
      font-size: 0.85em;
    }

    @media (max-width: 1024px) {
      font-size: 1rem;
    }
    @media (max-width: 767px) {
      font-size: 0.95rem;
      padding-left: 1rem;
    }
    @media (max-width: 430px) {
      font-size: 0.9rem;
    }
  }
}

/* ── Card bottom rule (decorative) ── */
.service-card__rule {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--c-accent);
  transition: width 0.4s ease;

  .service-card:hover & {
    width: 100%;
  }
}
</style>
