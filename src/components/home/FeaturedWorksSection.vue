<template>
  <section class="featured-section">
    <div class="section-head">
      <div class="section-meta">
        <span class="label">{{ $t('home.works.label') }}</span>
        <span class="section-count">{{ featuredWorks.length }} TITLES</span>
      </div>
      <RouterLink to="/works" class="section-link">
        {{ $t('home.works.viewAll') }} <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div class="works-grid">
      <RouterLink
        v-for="(work, i) in featuredWorks"
        :key="work.title"
        to="/works"
        class="work-card"
      >
        <div class="card-img-wrap">
          <img :src="work.img" :alt="work.title" class="card-img" loading="lazy" />
          <span class="card-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="card-overlay">
            <span class="card-role label">{{ work.role }}</span>
            <span class="card-arrow" aria-hidden="true">→</span>
          </div>
        </div>
        <div class="card-info">
          <span class="card-date">{{ work.date }}</span>
          <p class="card-title">{{ work.title }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
/** 首页代表作品：flat 网格，作品图为主角 */
const featuredWorks = [
  {
    img: 'https://photos.baihu-animation.com/img_index_work/水星的魔女.jpg',
    title: '機動戦士ガンダム 水星の魔女',
    role: '原画',
    date: '2022',
  },
  {
    img: 'https://photos.baihu-animation.com/img_index_work/地缚少年花子君.jpg',
    title: '地縛少年花子くん',
    role: '美术设定 / 3D',
    date: '2020',
  },
  {
    img: 'https://photos.baihu-animation.com/img_index_work/老虎和兔子2.jpg',
    title: 'TIGER & BUNNY 2',
    role: '动画 / 动画检查',
    date: '2023',
  },
  {
    img: 'https://photos.baihu-animation.com/img_index_work/鲁邦三世 PART6.jpg',
    title: 'ルパン三世 PART6',
    role: '美术背景',
    date: '2021',
  },
  {
    img: 'https://photos.baihu-animation.com/img_index_work/进击的巨人 the final season .jpg',
    title: '進撃の巨人 The Final Season',
    role: '原画',
    date: '2022',
  },
  {
    img: 'https://photos.baihu-animation.com/img_index_work/异世界自杀小队.jpg',
    title: '異世界スーサイド・スクワッド',
    role: '原画 / 作画监督',
    date: '2024',
  },
]
</script>

<style lang="scss" scoped>
.featured-section {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }
  @media (max-width: 900px) {
    padding: 6rem 5vw;
  }
  @media (max-width: 430px) {
    padding: 4.5rem 5vw;
  }
}

// ─── Header ──────────────────────────────────────────────────────────────────
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--c-border);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
}

.section-meta {
  display: flex;
  align-items: baseline;
  gap: 2rem;
}

.section-count {
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--c-muted);
}

.section-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--c-border);
  font-size: 1.2rem;
  color: var(--c-secondary);
  letter-spacing: 0.06em;
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast),
    gap var(--duration-fast);

  &:hover {
    color: var(--c-accent);
    border-color: var(--c-accent);
    gap: 1.2rem;
  }
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--c-border);
  border-left: 1px solid var(--c-border);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.work-card {
  display: block;
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover .card-img {
    transform: scale(1.04);
  }
  &:hover .card-overlay {
    opacity: 1;
  }
}

.card-img-wrap {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--c-surface);

  @media (max-width: 480px) {
    aspect-ratio: 16 / 10;
  }
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ease-out);
}

.card-index {
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  z-index: 2;
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.85);
}

.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.8rem;
  background: linear-gradient(to top, rgba(5, 7, 11, 0.82), rgba(5, 7, 11, 0.12));
  opacity: 0;
  transition: opacity var(--duration-base);

  @media (max-width: 767px) {
    opacity: 1;
  }
}

.card-role {
  font-size: 0.9rem;
  color: var(--c-accent);
}

.card-arrow {
  align-self: flex-end;
  font-size: 2rem;
  color: #fff;
}

.card-info {
  padding: 1.8rem 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--c-bg);
}

.card-date {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.1em;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--c-primary);
  letter-spacing: -0.01em;
}
</style>
