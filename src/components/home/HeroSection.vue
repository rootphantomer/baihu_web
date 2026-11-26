<template>
  <section
    class="work-hero"
    tabindex="0"
    :aria-label="$t('home.hero.carousel')"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
    @mouseenter="setPaused(true)"
    @mouseleave="setPaused(false)"
    @focusin="setPaused(true)"
    @focusout="setPaused(false)"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="hero-copy-panel">
      <div class="hero-top">
        <span class="hero-brand"> BAIHU<span class="hero-brand-zh">白鹄动画</span> </span>
        <span class="hero-index label">
          {{ pad(active + 1) }}<span class="index-sep">/</span>{{ pad(works.length) }}
        </span>
      </div>

      <p class="sr-only" aria-live="polite">{{ current.title }}</p>

      <Transition name="caption" mode="out-in">
        <div :key="current.title" class="hero-caption">
          <span class="caption-rule" aria-hidden="true"></span>
          <div class="caption-inner">
            <div class="caption-meta">
              <span>{{ current.type }}</span>
              <span class="meta-sep" aria-hidden="true"></span>
              <span>{{ current.year }}</span>
            </div>
            <h1 class="work-title">{{ current.title }}</h1>
            <p class="work-role">{{ current.role }}</p>
            <RouterLink to="/works" class="work-link">
              {{ $t('home.works.viewAll') }}
            </RouterLink>
          </div>
        </div>
      </Transition>

      <div class="hero-controls" role="group" :aria-label="$t('home.hero.carousel')">
        <button class="control-btn" type="button" :aria-label="$t('home.hero.prev')" @click="prev">
          <span aria-hidden="true">←</span>
        </button>
        <button
          class="control-btn"
          type="button"
          :aria-label="playing ? $t('home.hero.pause') : $t('home.hero.play')"
          :aria-pressed="!playing"
          @click="togglePlay"
        >
          <span aria-hidden="true">{{ playing ? 'Ⅱ' : '▶' }}</span>
        </button>
        <button class="control-btn" type="button" :aria-label="$t('home.hero.next')" @click="next">
          <span aria-hidden="true">→</span>
        </button>
        <div class="progress">
          <button
            v-for="(work, i) in works"
            :key="work.title"
            class="progress-dot"
            :class="{ active: i === active }"
            type="button"
            :aria-label="work.title"
            @click="go(i)"
          ></button>
        </div>
      </div>
    </div>

    <!-- Portrait posters are shown whole, never cropped -->
    <div class="hero-visual-panel" aria-hidden="true">
      <article
        v-for="(work, i) in works"
        :key="work.title"
        class="hero-slide"
        :class="{ active: i === active }"
      >
        <img
          class="slide-backdrop"
          :src="work.img"
          alt=""
          :width="work.w"
          :height="work.h"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : undefined"
        />
        <img
          class="slide-poster"
          :src="work.img"
          alt=""
          :width="work.w"
          :height="work.h"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : undefined"
        />
      </article>
    </div>

    <!-- Oversized outlined title crosses into the poster; decorative only -->
    <Transition name="ghost" mode="out-in">
      <span :key="current.title" class="hero-ghost-title" aria-hidden="true">
        {{ current.title }}
      </span>
    </Transition>
  </section>
</template>

<script setup lang="ts">
/**
 * 首页首屏：左侧编辑式说明 + 右侧完整竖版海报。
 * 素材均为竖版海报，使用 contain 避免裁剪；背景同图模糊填充空白。
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface HeroWork {
  title: string
  type: string
  year: string
  role: string
  img: string
  w: number
  h: number
}

const works: HeroWork[] = [
  {
    title: '機動戦士ガンダム 水星の魔女',
    type: 'TV',
    year: '2022',
    role: '原画',
    img: 'https://photos.baihu-animation.com/img_index_work/水星的魔女.jpg',
    w: 2160,
    h: 3048,
  },
  {
    title: '進撃の巨人 The Final Season',
    type: 'TV',
    year: '2022',
    role: '原画',
    img: 'https://photos.baihu-animation.com/img_index_work/进击的巨人 the final season .jpg',
    w: 850,
    h: 1200,
  },
  {
    title: '異世界スーサイド・スクワッド',
    type: 'TV',
    year: '2024',
    role: '原画 / 作画监督',
    img: 'https://photos.baihu-animation.com/img_index_work/异世界自杀小队.jpg',
    w: 1200,
    h: 1688,
  },
  {
    title: '地縛少年花子くん',
    type: 'TV',
    year: '2020',
    role: '美术设定 / 3D',
    img: 'https://photos.baihu-animation.com/img_index_work/地缚少年花子君.jpg',
    w: 1152,
    h: 1616,
  },
]

const active = ref(0)
const playing = ref(true)
const paused = ref(false)
const reduceMotion = ref(false)
const current = computed(() => works[active.value])

const pad = (n: number) => String(n).padStart(2, '0')

let timer: number | undefined

function restartTimer() {
  if (timer !== undefined) window.clearTimeout(timer)
  timer = undefined

  if (!playing.value || paused.value || reduceMotion.value || document.hidden) return

  timer = window.setTimeout(() => {
    go(active.value + 1)
  }, 6000)
}

function go(index: number) {
  active.value = (index + works.length) % works.length
  restartTimer()
}

function next() {
  go(active.value + 1)
}

function prev() {
  go(active.value - 1)
}

function togglePlay() {
  playing.value = !playing.value
  restartTimer()
}

function setPaused(value: boolean) {
  paused.value = value
  restartTimer()
}

function handleVisibility() {
  restartTimer()
}

let touchX = 0
let touchY = 0
function onTouchStart(e: TouchEvent) {
  touchX = e.changedTouches[0]?.clientX ?? 0
  touchY = e.changedTouches[0]?.clientY ?? 0
}
function onTouchEnd(e: TouchEvent) {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX
  const dy = (e.changedTouches[0]?.clientY ?? 0) - touchY
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
  if (dx < 0) next()
  else prev()
}

watch(active, (i) => {
  const nextWork = works[(i + 1) % works.length]
  if (!nextWork) return
  const img = new Image()
  img.src = nextWork.img
})

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.addEventListener('visibilitychange', handleVisibility)
  restartTimer()
})

onUnmounted(() => {
  if (timer !== undefined) window.clearTimeout(timer)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<style lang="scss" scoped>
.work-hero {
  position: relative;
  height: calc(100vh - var(--header-h));
  min-height: 58rem;
  display: grid;
  grid-template-columns: 48% 52%;
  grid-template-areas: 'copy visual';
  overflow: hidden;
  background: #000;
  color: #fff;
  touch-action: pan-y;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// ─── Left: editorial copy ─────────────────────────────────────────────────────
.hero-copy-panel {
  grid-area: copy;
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;
  padding: 6rem 4rem 5rem 6rem;
  background: #000;
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.hero-brand {
  display: inline-flex;
  align-items: baseline;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.9);
}

.hero-brand-zh {
  font-family: var(--font-body);
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
}

.hero-index {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.index-sep {
  margin: 0 0.6rem;
  color: rgba(255, 255, 255, 0.4);
}

.hero-caption {
  display: flex;
  gap: 2.4rem;
  margin: auto 0;
  min-width: 0;
}

.caption-rule {
  flex: none;
  width: 1px;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.32);
}

.caption-inner {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 0;
}

.caption-meta {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.72);
}

.meta-sep {
  width: 1px;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.35);
}

.work-title {
  font-family: var(--font-display);
  font-size: 4.6rem;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: #fff;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

.work-role {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.06em;
}

.work-link {
  align-self: flex-start;
  margin-top: 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  font-size: 1.2rem;
  color: #fff;
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast);

  &:hover {
    color: var(--c-accent);
    border-color: var(--c-accent);
  }
}

.caption-enter-active,
.caption-leave-active {
  transition:
    opacity 240ms ease,
    transform 240ms ease;
}
.caption-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.caption-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

// Oversized outlined title: crosses the copy/poster boundary without touching the image ratio
.hero-ghost-title {
  position: absolute;
  // 置于副本区（z-index 2）之下，避免遮住标题与控制；pointer-events 保证点击可穿透
  z-index: 1;
  left: 34%;
  bottom: 7%;
  max-width: 120vw;
  font-family: var(--font-display);
  font-size: clamp(6rem, 9vw, 15rem);
  font-weight: 600;
  line-height: 0.82;
  letter-spacing: -0.07em;
  white-space: nowrap;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.1);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.32);
}

.ghost-enter-active,
.ghost-leave-active {
  transition:
    opacity 600ms var(--ease-out),
    transform 700ms var(--ease-out),
    clip-path 700ms var(--ease-out);
}
.ghost-enter-from {
  opacity: 0;
  transform: translate3d(0, 2.4rem, 0);
  clip-path: inset(0 0 100% 0);
}
.ghost-leave-to {
  opacity: 0;
  transform: translate3d(-2.4rem, 0, 0);
  clip-path: inset(0 100% 0 0);
}

// ─── Controls ─────────────────────────────────────────────────────────────────
.hero-controls {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.control-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color var(--duration-fast),
    color var(--duration-fast);

  &:hover {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }
}

.progress {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 1.2rem;
}

.progress-dot {
  width: 2.4rem;
  height: 2px;
  padding: 0;
  border: none;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background var(--duration-fast);

  &.active,
  &:hover {
    background: var(--c-accent);
  }
}

// ─── Right: full portrait poster ──────────────────────────────────────────────
.hero-visual-panel {
  grid-area: visual;
  position: relative;
  min-width: 0;
  overflow: hidden;
  background: #05070b;
}

.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 4rem;
  opacity: 0;
  transition: opacity 700ms ease;

  &.active {
    opacity: 1;
  }
}

.slide-backdrop {
  position: absolute;
  inset: -8%;
  width: 116%;
  height: 116%;
  object-fit: cover;
  filter: blur(48px) brightness(0.3) saturate(0.7);
  opacity: 0.75;
  pointer-events: none;
}

.slide-poster {
  position: relative;
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 1280px) {
  .hero-copy-panel {
    padding: 5rem 3rem 4rem 4rem;
  }

  .work-title {
    font-size: 4rem;
  }

  .hero-slide {
    padding: 2.4rem 3rem;
  }
}

@media (max-width: 900px) {
  .hero-ghost-title {
    display: none;
  }

  .work-hero {
    height: auto;
    min-height: calc(100vh - var(--header-h));
    grid-template-columns: 1fr;
    grid-template-rows: 46vh auto;
    grid-template-areas:
      'visual'
      'copy';
  }

  .hero-visual-panel {
    min-height: 32rem;
  }

  .hero-slide {
    padding: 2.4rem;
  }

  .hero-copy-panel {
    gap: 2.6rem;
    padding: 3.5rem 5vw 4rem;
  }

  .hero-caption {
    margin: 0;
  }

  .work-title {
    font-size: 3.2rem;
  }
}

@media (max-width: 430px) {
  .hero-index,
  .hero-brand-zh {
    display: none;
  }

  .work-title {
    font-size: 2.5rem;
  }

  .hero-slide {
    padding: 1.6rem;
  }

  .control-btn {
    width: 3.8rem;
    height: 3.8rem;
  }

  .progress-dot {
    width: 1.8rem;
  }
}
</style>
