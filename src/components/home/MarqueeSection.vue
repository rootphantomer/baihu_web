<template>
  <section class="marquee-section">
    <div class="marquee-label label">{{ $t('home.marquee.label') }}</div>
    <div
      class="marquee-track"
      :class="{ paused: hovered }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="marquee-content">
        <span v-for="(item, i) in marqueeItems" :key="i" class="marquee-item">
          <span class="marquee-title">{{ item }}</span>
          <span class="marquee-sep" aria-hidden="true">●</span>
        </span>
      </div>
      <!-- Duplicate for seamless loop -->
      <div class="marquee-content" aria-hidden="true">
        <span v-for="(item, i) in marqueeItems" :key="'dup-' + i" class="marquee-item">
          <span class="marquee-title">{{ item }}</span>
          <span class="marquee-sep" aria-hidden="true">●</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hovered = ref(false)

const marqueeItems = [
  '機動戦士ガンダム SEED Freedom',
  '進撃の巨人 Final Season',
  '水星の魔女',
  'シン・エヴァンゲリオン',
  'TIGER & BUNNY 2',
  'ルパン三世 PART6',
  'takt op.Destiny',
  '地縛少年花子くん',
  'ゾンビランドサガ',
  '薬屋のひとりごと',
  '異世界スーサイド・スクワッド',
  'キン肉マン 完璧超人始祖編',
  'カードファイト!! ヴァンガード',
]
</script>

<style lang="scss" scoped>
.marquee-section {
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  padding: 2.5rem 0;
  overflow: hidden;
  background: var(--c-surface);
}

.marquee-label {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--c-muted);
}

.marquee-track {
  display: flex;
  width: 100%;
  overflow: hidden;

  &.paused .marquee-content {
    animation-play-state: paused;
  }
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  animation: marqueeScroll 35s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  white-space: nowrap;
}

.marquee-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--c-secondary);
  letter-spacing: 0.06em;
  transition: color var(--duration-fast);

  .marquee-track:not(.paused) &:hover {
    color: var(--c-accent);
  }
}

.marquee-sep {
  font-size: 0.5rem;
  color: var(--c-border);
  margin: 0 1rem;
}

@keyframes marqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
