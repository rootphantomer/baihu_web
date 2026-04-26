<template>
  <main class="page-join">
    <div class="page-header">
      <div class="page-header-inner">
        <span class="label">{{ $t('join.subtitle') }}</span>
        <h1 class="page-title">{{ $t('join.title') }}</h1>
        <p class="page-intro">{{ $t('join.intro') }}</p>
      </div>
    </div>

    <!-- Positions -->
    <section class="positions-section">
      <div class="positions-inner">
        <div
          v-for="pos in positions"
          :key="pos.id"
          class="position-item"
          :class="{ 'is-open': openPosition === pos.id }"
        >
          <!-- Toggle Header -->
          <button class="position-header" @click="togglePosition(pos.id)">
            <div class="position-meta">
              <span class="pos-num label">{{ pos.id.padStart(2, '0') }}</span>
              <h2 class="pos-title">{{ getTranslatedPosition(pos.roleId).title }}</h2>
            </div>
            <div class="position-tags">
              <span class="pos-tag">{{ getTranslatedPosition(pos.roleId).location }}</span>
              <span class="pos-tag">{{ getTranslatedPosition(pos.roleId).type }}</span>
              <span class="pos-expand">{{ openPosition === pos.id ? '−' : '+' }}</span>
            </div>
          </button>

          <!-- Accordion Content -->
          <Transition name="accordion">
            <div v-if="openPosition === pos.id" class="position-body">
              <div class="pos-cols">
                <div class="pos-col">
                  <h3 class="pos-col-title">{{ getTranslatedPosition(pos.roleId).duties }}</h3>
                  <ul class="pos-list">
                    <li v-for="(item, i) in getTranslatedPosition(pos.roleId).dutiesList" :key="i">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="pos-col">
                  <h3 class="pos-col-title">
                    {{ getTranslatedPosition(pos.roleId).requirements }}
                  </h3>
                  <ul class="pos-list">
                    <li
                      v-for="(item, i) in getTranslatedPosition(pos.roleId).requirementsList"
                      :key="i"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Apply CTA -->
    <section class="apply-section">
      <div class="apply-inner">
        <span class="label">Apply</span>
        <p class="apply-text">{{ $t('join.apply') }}</p>
        <a :href="`mailto:${$t('join.email')}`" class="apply-email">
          {{ $t('join.email') }}
          <span class="apply-arrow">→</span>
        </a>
        <p class="apply-note">{{ $t('join.note') }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/**
 * 招聘页面：手风琴式职位列表 + 投递邮箱 CTA
 */
import { ref, computed } from 'vue'
import { positions } from '@/data/recruitment'
import { t } from '@/composables/useI18n'

/** 当前展开的职位 ID（空字符串表示全部收起） */
const openPosition = ref<string>(positions[0]?.id || '')

/** 切换职位展开/收起 */
const togglePosition = (id: string) => {
  if (openPosition.value === id) {
    openPosition.value = ''
  } else {
    openPosition.value = id
  }
}

/**
 * 获取翻译后的职位信息
 * @param roleId - 岗位角色 ID，对应 i18n 键路径
 */
const getTranslatedPosition = (roleId: string) => {
  return {
    title: t(`join.positions.${roleId}.title`),
    location: t(`join.positions.${roleId}.location`),
    type: t(`join.positions.${roleId}.type`),
    duties: t(`join.positions.${roleId}.duties`),
    requirements: t(`join.positions.${roleId}.requirements`),
    dutiesList: t(`join.positions.${roleId}.items.duties`) as string[],
    requirementsList: t(`join.positions.${roleId}.items.requirements`) as string[],
  }
}
</script>

<style lang="scss" scoped>
.page-join {
  padding-top: var(--header-h);
  background: var(--c-bg);
  min-height: 100vh;
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
  gap: 2rem;
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

.page-intro {
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--c-secondary);
  max-width: 80rem;
  line-height: 1.8;
}

// ─── Positions ────────────────────────────────────────────────────────────────
.positions-section {
  border-bottom: 1px solid var(--c-border);
}

.positions-inner {
  max-width: 1600px;
  margin: 0 auto;
}

.position-item {
  border-bottom: 1px solid var(--c-border);

  &.is-open .position-header {
    background: var(--c-surface);
  }
}

.position-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.5rem 8rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 2rem;
  transition: background var(--duration-fast);

  &:hover {
    background: var(--c-surface);
  }

  @media (max-width: 1024px) {
    padding: 3rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 2.5rem 5vw;
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    padding: 2.5rem 5vw;
    flex-direction: column;
    align-items: flex-start;
  }
}

.position-meta {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.pos-num {
  font-size: 0.9rem;
  color: var(--c-accent);
  flex-shrink: 0;
}

.pos-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.04em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.position-tags {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}

.pos-tag {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  border: 1px solid var(--c-border);
  padding: 0.3rem 1rem;
  letter-spacing: 0.08em;
}

.pos-expand {
  font-family: var(--font-mono);
  font-size: 2rem;
  color: var(--c-accent);
  line-height: 1;
  width: 3rem;
  text-align: center;
}

.position-body {
  padding: 0 8rem 5rem;

  @media (max-width: 1024px) {
    padding: 0 4rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 0 5vw 3rem;
  }
  @media (max-width: 768px) {
    padding: 0 5vw 4rem;
  }
}

.pos-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  border-top: 1px solid var(--c-border);
  padding-top: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.pos-col-title {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.pos-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    font-family: var(--font-body);
    font-size: 1.4rem;
    color: var(--c-secondary);
    line-height: 1.8;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: var(--c-muted);
      font-size: 0.8em;
    }
  }
}

// Accordion transition - 优化性能
.accordion-enter-active,
.accordion-leave-active {
  transition:
    opacity 250ms ease-out,
    transform 250ms ease-out;
  will-change: opacity, transform;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// ─── Apply Section ────────────────────────────────────────────────────────────
.apply-section {
  background: var(--c-surface);
}

.apply-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

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

.apply-text {
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--c-secondary);
}

.apply-email {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  font-family: var(--font-mono);
  font-size: 2rem;
  color: var(--c-accent);
  letter-spacing: 0.04em;
  transition: gap var(--duration-fast);

  .apply-arrow {
    transition: transform var(--duration-fast);
  }

  &:hover {
    gap: 2rem;
    .apply-arrow {
      transform: translateX(0.4rem);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.apply-note {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.08em;
}
</style>
