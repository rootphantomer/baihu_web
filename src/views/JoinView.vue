<template>
  <main class="page-join">
    <header class="page-head">
      <div class="page-head-inner" data-reveal="up">
        <span class="label">{{ $t('join.subtitle') }}</span>
        <h1 class="page-title">{{ $t('join.title') }}</h1>
        <p class="page-intro">{{ $t('join.intro') }}</p>
      </div>
    </header>

    <section class="join-layout">
      <aside class="roles-index">
        <span class="label">{{ $t('join.roles.label') }}</span>
        <div class="role-list">
          <button
            v-for="pos in positions"
            :key="pos.id"
            class="role-item"
            :class="{ active: openPosition === pos.id }"
            type="button"
            :aria-pressed="openPosition === pos.id"
            @click="openPosition = pos.id"
          >
            <span class="role-num">{{ pos.id.padStart(2, '0') }}</span>
            <span class="role-title">{{ getTranslatedPosition(pos.id).title }}</span>
            <span class="role-meta">
              {{ getTranslatedPosition(pos.id).location }} /
              {{ getTranslatedPosition(pos.id).type }}
            </span>
          </button>
        </div>
      </aside>

      <Transition name="detail" mode="out-in">
        <article v-if="activePosition" :key="activePosition.id" class="role-detail">
          <h2 class="detail-title">{{ getTranslatedPosition(activePosition.id).title }}</h2>

          <div class="detail-grid">
            <section class="detail-col">
              <h3>{{ getTranslatedPosition(activePosition.id).duties }}</h3>
              <ul>
                <li
                  v-for="(item, i) in getTranslatedPosition(activePosition.id).dutiesList"
                  :key="i"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
            <section class="detail-col">
              <h3>{{ getTranslatedPosition(activePosition.id).requirements }}</h3>
              <ul>
                <li
                  v-for="(item, i) in getTranslatedPosition(activePosition.id).requirementsList"
                  :key="i"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </article>
      </Transition>
    </section>

    <section class="apply-section">
      <div class="apply-inner">
        <span class="label">Apply</span>
        <p class="apply-text">{{ $t('join.apply') }}</p>
        <a :href="`mailto:${$t('join.email')}`" class="apply-email">
          {{ $t('join.email') }}
        </a>
        <p class="apply-note">{{ $t('join.note') }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/** 招募页：岗位索引 + 右侧详情面板 */
import { ref, computed } from 'vue'
import { positions } from '@/data/recruitment'
import { t } from '@/composables/useI18n'

const openPosition = ref<string>(positions[0]?.id || '')

const activePosition = computed(
  () => positions.find((pos) => pos.id === openPosition.value) ?? positions[0],
)

function getTranslatedPosition(roleId: string) {
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
  background: transparent;
  min-height: 100vh;
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
  gap: 2rem;
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

.page-intro {
  max-width: 76rem;
  font-size: 1.5rem;
  line-height: 1.8;
  color: var(--c-secondary);
}

// ─── Index + detail ───────────────────────────────────────────────────────────
.join-layout {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem;
  display: grid;
  grid-template-columns: 34% 1fr;
  gap: 8rem;
  align-items: start;

  @media (max-width: 1024px) {
    padding: 6rem 4rem;
    gap: 5rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 5rem 5vw;
  }
}

.roles-index {
  position: sticky;
  top: calc(var(--header-h) + 3rem);
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 900px) {
    position: static;
  }
}

.role-list {
  border-top: 1px solid var(--c-border);
}

.role-item {
  width: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
  gap: 0.4rem 1.6rem;
  padding: 2rem 0;
  border: none;
  border-bottom: 1px solid var(--c-border);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: var(--c-surface);
  }

  &.active {
    .role-num,
    .role-title {
      color: var(--c-accent);
    }
  }
}

.role-num {
  grid-row: 1 / 3;
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  padding-top: 0.6rem;
}

.role-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--c-primary);
}

.role-meta {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--c-muted);
  letter-spacing: 0.06em;
}

.role-detail {
  padding-top: 1rem;
}

.detail-title {
  font-family: var(--font-display);
  font-size: 3.2rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--c-primary);
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  border-top: 1px solid var(--c-border);
  padding-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

.detail-col {
  h3 {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-accent);
    letter-spacing: 0.16em;
    margin-bottom: 2.4rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    li {
      position: relative;
      padding-left: 1.6rem;
      font-size: 1.35rem;
      line-height: 1.8;
      color: var(--c-secondary);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.9em;
        width: 0.8rem;
        height: 1px;
        background: var(--c-accent);
      }
    }
  }
}

.detail-enter-active,
.detail-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.detail-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.detail-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

// ─── Apply ────────────────────────────────────────────────────────────────────
.apply-section {
  border-top: 1px solid var(--c-border);
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
  @media (max-width: 768px) {
    padding: 5rem 5vw;
  }
}

.apply-text {
  font-size: 1.4rem;
  color: var(--c-secondary);
}

.apply-email {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 3rem;
  color: var(--c-primary);
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--c-accent);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--c-accent);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.apply-note {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
}
</style>
