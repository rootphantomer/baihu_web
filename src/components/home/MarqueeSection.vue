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
/**
 * 首页跑马灯区域：横向滚动展示参与作品名称
 */
import { ref } from 'vue'

/** 鼠标悬停时暂停滚动 */
const hovered = ref(false)

/** 跑马灯展示的作品名称列表 */
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
  padding: 3rem 0;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    transparent,
    var(--c-surface) 12%,
    var(--c-surface) 88%,
    transparent
  );
}

.marquee-label {
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 0.9rem;
  color: var(--c-accent-2);
}

.marquee-track {
  display: flex;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);

  &.paused .marquee-content {
    animation-play-state: paused;
  }
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  animation: marqueeScroll 30s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.8rem;
  margin-right: 1.2rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-pill);
  background: var(--c-bg);
  white-space: nowrap;
}

.marquee-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--c-secondary);
  letter-spacing: 0.04em;
  transition: color var(--duration-fast);

  .marquee-track:not(.paused) &:hover {
    color: var(--c-accent-2);
  }
}

.marquee-sep {
  font-size: 0.55rem;
  color: var(--c-accent-3);
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
