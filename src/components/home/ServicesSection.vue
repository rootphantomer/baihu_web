<template>
  <section class="flow-section">
    <div class="flow-inner">
      <div class="flow-head">
        <span class="label">{{ $t('home.process.label') }}</span>
        <h2 class="flow-title">Production Flow</h2>
      </div>

      <div class="flow-rail">
        <article v-for="(step, i) in steps" :key="step.title" class="flow-step">
          <span class="step-num label">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="step-title">{{ step.title }}</h3>
          <p v-if="step.desc" class="step-desc">{{ step.desc }}</p>
        </article>
      </div>

      <div class="flow-coverage">
        <span class="label">{{ $t('server.coverage.title') }}</span>
        <p>{{ coverage.join('　/　') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/** 首页制作流程：横向步骤轴，取代通用服务卡片 */
import { computed } from 'vue'
import { t } from '@/composables/useI18n'

const steps = computed(() => [
  {
    title: t('server.coverage.items.script'),
    desc: t('server.preDesign.desc'),
  },
  {
    title: t('works.roles.lo_key'),
    desc: '',
  },
  {
    title: t('works.roles.animator'),
    desc: t('server.animation.desc'),
  },
  {
    title: t('works.roles.supervisor'),
    desc: '',
  },
  {
    title: t('works.roles.background'),
    desc: '',
  },
])

const coverage = computed(() => [
  t('server.coverage.items.movie'),
  t('server.coverage.items.series'),
  t('server.coverage.items.pv'),
  t('server.coverage.items.cinematic'),
  t('server.coverage.items.character'),
])
</script>

<style lang="scss" scoped>
.flow-section {
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
}

.flow-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
  }
}

.flow-head {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
}

.flow-title {
  font-family: var(--font-display);
  font-size: 4.6rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--c-primary);

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
}

.flow-rail {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--c-border);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.flow-step {
  position: relative;
  min-width: 0;
  padding: 3rem 2rem 4rem;
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  transition: background var(--duration-fast);

  &:last-child {
    border-right: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--c-accent);
    transition: width var(--duration-base) var(--ease-out);
  }

  &:hover {
    background: var(--c-surface);

    &::before {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    &:nth-child(2n) {
      border-right: none;
    }
  }
  @media (max-width: 600px) {
    border-right: none;
  }
}

.step-num {
  color: var(--c-accent);
}

.step-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--c-primary);
}

.step-desc {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--c-secondary);
}

.flow-coverage {
  margin-top: 5rem;
  display: flex;
  align-items: baseline;
  gap: 2rem;

  p {
    font-size: 1.2rem;
    line-height: 1.9;
    color: var(--c-secondary);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
