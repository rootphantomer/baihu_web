<template>
  <main class="page-works">
    <header class="page-head">
      <div class="page-head-inner" data-reveal="up">
        <span class="label">{{ $t('works.subtitle') }}</span>
        <h1 class="page-title">{{ $t('works.title') }}</h1>
        <span class="page-count">{{ filteredWorks.length }} TITLES</span>
      </div>
    </header>

    <section v-if="featuredWork" class="featured-work">
      <div class="featured-poster">
        <img
          :src="featuredWork.path"
          :alt="featuredWork.title"
          width="900"
          height="1200"
          fetchpriority="high"
        />
      </div>
      <div class="featured-meta">
        <span class="label">{{ $t('works.featured.label') }}</span>
        <h2 class="featured-title">{{ featuredWork.title }}</h2>
        <div class="featured-facts">
          <span>{{ featuredWork.year }}</span>
          <span>{{ featuredWork.role }}</span>
        </div>
      </div>
    </section>

    <div class="filter-bar">
      <div class="filter-inner">
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="$t('works.filter.search')"
          :aria-label="$t('works.filter.search')"
          class="search-input"
        />
        <div class="year-filters" role="group" :aria-label="$t('works.filter.year')">
          <button
            class="year-btn"
            :class="{ active: selectedYear === '' }"
            type="button"
            :aria-pressed="selectedYear === ''"
            @click="selectedYear = ''"
          >
            {{ $t('works.filter.all') }}
          </button>
          <button
            v-for="year in availableYears"
            :key="year"
            class="year-btn"
            :class="{ active: selectedYear === year }"
            type="button"
            :aria-pressed="selectedYear === year"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>
    </div>

    <div class="works-archive">
      <section v-for="group in groupedWorks" :key="group.year" class="year-group">
        <h2 class="year-heading">{{ group.year || '—' }}</h2>
        <div class="works-grid">
          <button
            v-for="work in group.items"
            :key="work.path"
            type="button"
            class="work-card"
            :aria-label="`${work.title}（${work.role}）`"
            @click="openLightbox(work)"
          >
            <span class="poster-wrap">
              <img :src="work.path" :alt="work.title" width="900" height="1200" loading="lazy" />
            </span>
            <span class="card-info">
              <span class="card-title">{{ work.title }}</span>
              <span class="card-role">{{ work.role }}</span>
            </span>
          </button>
        </div>
      </section>

      <p v-if="filteredWorks.length === 0" class="empty-state">
        {{ $t('works.empty') }}
      </p>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxWork"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxWork.title"
        >
          <button
            class="lightbox-backdrop"
            type="button"
            :aria-label="$t('works.close')"
            @click="closeLightbox"
          ></button>
          <button
            ref="lightboxClose"
            class="lightbox-close"
            type="button"
            @click="closeLightbox"
            :aria-label="$t('works.close')"
          >
            ×
          </button>
          <div class="lightbox-content">
            <img :src="lightboxWork.path" :alt="lightboxWork.title" class="lightbox-img" />
            <div class="lightbox-info">
              <span class="lightbox-role">{{ lightboxWork.role }}</span>
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
/** 作品页：年度档案 + 完整海报 + 年份/搜索筛选 + 灯箱 */
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { works } from '@/data/works'

const route = useRoute()

const worksWithYear = works.map((w) => ({
  ...w,
  year:
    w.path
      .split('/')
      .pop()
      ?.match(/^(\d{4})/)?.[1] ?? '',
}))

const searchQuery = ref(typeof route.query.search === 'string' ? route.query.search : '')
const selectedYear = ref('')

watch(
  () => route.query.search,
  (value) => {
    searchQuery.value = typeof value === 'string' ? value : ''
  },
)

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

const featuredWork = computed(() => worksWithYear[0])

const groupedWorks = computed(() => {
  const years = [...new Set(filteredWorks.value.map((w) => w.year))].sort().reverse()
  return years.map((year) => ({
    year,
    items: filteredWorks.value.filter((w) => w.year === year),
  }))
})

const lightboxWork = ref<(typeof worksWithYear)[0] | null>(null)
const lightboxClose = ref<HTMLButtonElement | null>(null)
let lastFocusedElement: HTMLElement | null = null

const openLightbox = async (work: (typeof worksWithYear)[0]) => {
  lastFocusedElement = document.activeElement as HTMLElement
  lightboxWork.value = work
  await nextTick()
  lightboxClose.value?.focus()
}

const closeLightbox = () => {
  lightboxWork.value = null
  lastFocusedElement?.focus()
  lastFocusedElement = null
}

watch(lightboxWork, (work) => {
  document.body.style.overflow = work ? 'hidden' : ''
})

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => document.addEventListener('keydown', handleKey))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.page-works {
  padding-top: var(--header-h);
  min-height: 100vh;
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

.page-count {
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.12em;
  color: var(--c-muted);
}

// ─── Featured work ────────────────────────────────────────────────────────────
.featured-work {
  max-width: 1600px;
  margin: 0 auto;
  padding: 7rem 8rem;
  display: grid;
  grid-template-columns: 38% 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 5rem 4rem;
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  @media (max-width: 768px) {
    padding: 4rem 5vw;
  }
}

.featured-poster {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 1px solid var(--c-border);
  background: var(--c-surface);

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 60rem;
    object-fit: contain;
  }
}

.featured-meta {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.featured-title {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--c-primary);
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
}

.featured-facts {
  display: flex;
  gap: 2rem;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--c-secondary);
  letter-spacing: 0.08em;
}

// ─── Filters ──────────────────────────────────────────────────────────────────
.filter-bar {
  position: sticky;
  top: var(--header-h);
  z-index: 10;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg);
  padding: 1.6rem 8rem;

  [data-theme='dark'] & {
    background: rgba(11, 13, 18, 0.94);
    backdrop-filter: blur(12px);
  }
  [data-theme='light'] & {
    background: rgba(244, 242, 237, 0.94);
    backdrop-filter: blur(12px);
  }

  @media (max-width: 1024px) {
    padding: 1.4rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 1.4rem 5vw;
  }
}

.filter-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
}

.search-input {
  width: 26rem;
  padding: 0.8rem 0;
  border: none;
  border-bottom: 1px solid var(--c-border);
  background: transparent;
  color: var(--c-primary);
  font-family: var(--font-body);
  font-size: 1.2rem;

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

.year-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
}

.year-btn {
  padding: 0 0 0.3rem;
  border: none;
  border-bottom: 1px solid transparent;
  background: transparent;
  color: var(--c-muted);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: var(--c-primary);
  }

  &.active {
    color: var(--c-accent);
    border-color: var(--c-accent);
  }
}

// ─── Archive ──────────────────────────────────────────────────────────────────
.works-archive {
  max-width: 1600px;
  margin: 0 auto;
  padding: 5rem 8rem 12rem;

  @media (max-width: 1024px) {
    padding: 4rem 4rem 8rem;
  }
  @media (max-width: 768px) {
    padding: 3rem 5vw 6rem;
  }
}

.year-group {
  margin-bottom: 7rem;
}

.year-heading {
  margin-bottom: 2.4rem;
  font-family: var(--font-mono);
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--c-muted);
  letter-spacing: 0.08em;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--c-border);
  border-left: 1px solid var(--c-border);

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
  display: flex;
  flex-direction: column;
  padding: 0;
  border: none;
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg);
  color: inherit;
  text-align: left;
  cursor: pointer;
  content-visibility: auto;
  contain-intrinsic-size: 0 600px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background var(--duration-fast);

  &:hover {
    background: var(--c-surface);
  }
}

.poster-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3 / 4;
  padding: 1.6rem;
  background: var(--c-surface-2);

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 600ms var(--ease-out);
  }

  .work-card:hover & img {
    transform: scale(1.03);
  }
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.4rem 1.6rem 1.8rem;
  border-top: 1px solid var(--c-border);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--c-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-role {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--c-muted);
  letter-spacing: 0.08em;
}

.empty-state {
  padding: 8rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 1.4rem;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: transparent;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  padding: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(10px);
  cursor: zoom-out;
}

.lightbox-close {
  position: fixed;
  top: 2rem;
  right: 3rem;
  z-index: 2;
  width: 4rem;
  height: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  background: transparent;
  color: #fff;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
}

.lightbox-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  max-height: 90vh;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}

.lightbox-img {
  max-height: 85vh;
  max-width: 60vw;
  width: auto;
  height: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    max-width: 85vw;
    max-height: 55vh;
  }
}

.lightbox-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;

  @media (max-width: 900px) {
    width: 85vw;
  }
}

.lightbox-role {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-accent);
}

.lightbox-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.4;
}

.lightbox-year {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 240ms ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
