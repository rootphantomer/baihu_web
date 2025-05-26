<template>
  <main class="page-works">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <span class="label">{{ $t('works.subtitle') }}</span>
        <h1 class="page-title">{{ $t('works.title') }}</h1>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-inner">
        <!-- Search -->
        <div class="filter-search">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('works.filter.search')"
            class="search-input"
          />
        </div>
        <!-- Year Filter -->
        <div class="filter-group">
          <span class="filter-label label">{{ $t('works.filter.year') }}</span>
          <div class="filter-pills">
            <button
              class="pill"
              :class="{ active: selectedYear === '' }"
              @click="selectedYear = ''"
            >
              {{ $t('works.filter.all') }}
            </button>
            <button
              v-for="year in availableYears"
              :key="year"
              class="pill"
              :class="{ active: selectedYear === year }"
              @click="selectedYear = year"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
      <span class="filter-count label"> {{ filteredWorks.length }} titles </span>
    </div>

    <!-- Works Grid -->
    <div class="works-area">
      <TransitionGroup name="grid-fade" tag="div" class="works-grid">
        <div
          v-for="(work, i) in filteredWorks"
          :key="work.path"
          class="work-card"
          @click="openLightbox(work)"
        >
          <div class="card-img-wrap">
            <img v-lazy="work.path" :alt="work.title" class="card-img" loading="lazy" />
            <div class="card-overlay">
              <span class="card-role label">{{ work.role }}</span>
              <span class="card-year">{{ work.year }}</span>
            </div>
          </div>
          <div class="card-info">
            <span class="card-num">{{ String(filteredWorks.length - i).padStart(2, '0') }}</span>
            <p class="card-title">{{ work.title }}</p>
          </div>
        </div>
      </TransitionGroup>

      <p v-if="filteredWorks.length === 0" class="empty-state">
        {{ $t('works.empty') }}
      </p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxWork" class="lightbox" @click.self="closeLightbox">
          <button class="lightbox-close" @click="closeLightbox" aria-label="close">×</button>
          <div class="lightbox-content">
            <img :src="lightboxWork.path" :alt="lightboxWork.title" class="lightbox-img" />
            <div class="lightbox-info">
              <span class="label lightbox-role">{{ lightboxWork.role }}</span>
              <p class="lightbox-title">{{ lightboxWork.title }}</p>
              <p class="lightbox-year">{{ lightboxWork.year }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { works } from '@/data/works'

// ─── Extend works with year ───────────────────────────────────────────────────
const worksWithYear = works.map((w) => ({
  ...w,
  year:
    w.path
      .split('/')
      .pop()
      ?.match(/^(\d{4})/)?.[1] ?? '',
}))

// ─── Filter state ─────────────────────────────────────────────────────────────
const searchQuery = ref('')
const selectedYear = ref('')

const availableYears = computed(() => {
  const years = [...new Set(worksWithYear.map((w) => w.year).filter(Boolean))].sort().reverse()
  return years
})

const filteredWorks = computed(() => {
  let list = worksWithYear
  if (selectedYear.value) list = list.filter((w) => w.year === selectedYear.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((w) => w.title.toLowerCase().includes(q))
  }
  return list
})

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const lightboxWork = ref<(typeof worksWithYear)[0] | null>(null)
const openLightbox = (work: (typeof worksWithYear)[0]) => {
  lightboxWork.value = work
}
const closeLightbox = () => {
  lightboxWork.value = null
}

// Keyboard close
import { onMounted, onUnmounted } from 'vue'
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
}
onMounted(() => document.addEventListener('keydown', handleKey))
onUnmounted(() => document.removeEventListener('keydown', handleKey))
</script>

<style lang="scss" scoped>
.page-works {
  padding-top: var(--header-h);
  min-height: 100vh;
  background: var(--c-bg);
}

// ─── Page Header ─────────────────────────────────────────────────────────────
.page-header {
  border-bottom: 1px solid var(--c-border);
  padding: 8rem 8rem 5rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem 4rem;
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

// ─── Filter Bar ───────────────────────────────────────────────────────────────
.filter-bar {
  position: sticky;
  top: var(--header-h);
  z-index: 10;
  border-bottom: 1px solid var(--c-border);
  padding: 1.8rem 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  transition: background var(--duration-base) var(--ease-out);

  [data-theme='dark'] & {
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(8px);
  }

  [data-theme='light'] & {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
  }

  @media (max-width: 1024px) {
    padding: 1.5rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 1.5rem 5vw;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  @media (max-width: 768px) {
    padding: 1.5rem 5vw;
    flex-direction: column;
    align-items: flex-start;
  }
}

.filter-inner {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  flex: 1;

  @media (max-width: 900px) {
    gap: 1.5rem;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 768px) {
    gap: 1.5rem;
    width: 100%;
  }
}

.search-input {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-primary);
  font-family: var(--font-body);
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  width: 24rem;
  transition: border-color var(--duration-fast);

  &::placeholder {
    color: var(--c-muted);
  }
  &:focus {
    outline: none;
    border-color: var(--c-accent);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.9rem;
  color: var(--c-muted);
  flex-shrink: 0;
}

.filter-pills {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pill {
  background: none;
  border: 1px solid var(--c-border);
  color: var(--c-muted);
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.08em;
  padding: 0.3rem 1rem;
  cursor: pointer;
  min-height: 3.2rem; // 触控目标
  transition: all var(--duration-fast);

  &:hover {
    border-color: var(--c-secondary);
    color: var(--c-primary);
  }
  &.active {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }
}

.filter-count {
  font-size: 1rem;
  color: var(--c-muted);
  flex-shrink: 0;
}

// ─── Works Grid ───────────────────────────────────────────────────────────────
.works-area {
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 8rem 10rem;

  @media (max-width: 1024px) {
    padding: 4rem 4rem 8rem;
  }
  @media (max-width: 900px) {
    padding: 3rem 5vw 6rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 5vw 6rem;
  }
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.work-card {
  cursor: pointer;
  background: var(--c-surface);
  overflow: hidden;

  &:hover .card-img {
    transform: scale(1.04);
  }
  &:hover .card-overlay {
    opacity: 1;
  }
}

.card-img-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ease-out);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.7);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity var(--duration-base);
}

.card-role {
  font-size: 0.9rem;
  color: var(--c-accent);
  letter-spacing: 0.15em;
}

.card-year {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-secondary);
  letter-spacing: 0.1em;
}

.card-info {
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  border-top: 1px solid var(--c-border);
}

.card-num {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--c-accent);
  flex-shrink: 0;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--c-primary);
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.empty-state {
  text-align: center;
  padding: 8rem;
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--c-muted);
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: fixed;
  top: 2rem;
  right: 3rem;
  background: none;
  border: 1px solid var(--c-border);
  color: var(--c-primary);
  font-size: 2.5rem;
  line-height: 1;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    border-color var(--duration-fast),
    color var(--duration-fast);

  &:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }
}

.lightbox-content {
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  max-height: 90vh;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.lightbox-img {
  max-height: 85vh;
  max-width: 60vw;
  object-fit: contain;

  @media (max-width: 900px) {
    max-width: 85vw;
    max-height: 55vh;
  }
  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 60vh;
  }
}

.lightbox-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 18rem;

  @media (max-width: 900px) {
    min-width: unset;
    width: 85vw;
  }
}

.lightbox-role {
  font-size: 0.9rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
}

.lightbox-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--c-primary);
  line-height: 1.4;
}

.lightbox-year {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--c-muted);
}

// ─── Transitions ─────────────────────────────────────────────────────────────
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
