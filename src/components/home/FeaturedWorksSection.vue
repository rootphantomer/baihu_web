<template>
  <section class="featured-section">
    <div class="section-header">
      <div class="section-meta">
        <span class="label">{{ $t('home.works.label') }}</span>
        <span class="section-count">{{ featuredWorks.length }} titles</span>
      </div>
      <RouterLink to="/works" class="section-link">
        {{ $t('home.works.viewAll') }} <span>→</span>
      </RouterLink>
    </div>

    <div class="works-grid">
      <RouterLink
        v-for="(work, i) in featuredWorks"
        :key="i"
        to="/works"
        class="work-card"
        :class="`work-card--${i % 4 === 0 ? 'large' : 'normal'}`"
      >
        <div class="card-img-wrap">
          <img v-lazy="work.img" :alt="work.title" class="card-img" />
          <div class="card-overlay">
            <span class="card-role label">{{ work.role }}</span>
            <span class="card-arrow">→</span>
          </div>
        </div>
        <div class="card-info">
          <p class="card-date">{{ work.date }}</p>
          <p class="card-title">{{ work.title }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
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
  padding: 10rem 8rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) { padding: 8rem 4rem; }
  @media (max-width: 900px)  { padding: 6rem 5vw; }
  @media (max-width: 768px)  { padding: 5rem 5vw; }
}

// ─── Header ──────────────────────────────────────────────────────────────────
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--c-border);
}

.section-meta {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.section-count {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.1em;
}

.section-link {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-secondary);
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: color var(--duration-fast), gap var(--duration-fast);

  &:hover {
    color: var(--c-accent);
    gap: 1.2rem;
  }
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr; }
}

// ─── Card ─────────────────────────────────────────────────────────────────────
.work-card {
  display: block;
  position: relative;
  overflow: hidden;
  background: var(--c-surface);
  cursor: pointer;

  &:hover .card-img { transform: scale(1.04); }
  &:hover .card-overlay { opacity: 1; }
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
  background: rgba(10, 10, 10, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  opacity: 0;
  transition: opacity var(--duration-base);

  .card-arrow {
    font-size: 2rem;
    color: var(--c-accent);
    align-self: flex-end;
    transition: transform var(--duration-fast);
  }

  .work-card:hover & .card-arrow { transform: translate(0.4rem, -0.4rem); }
}

.card-role {
  font-size: 0.9rem;
  color: var(--c-accent);
  letter-spacing: 0.2em;
}

.card-info {
  padding: 1.6rem 1.6rem 2rem;
  border-top: 1px solid var(--c-border);
}

.card-date {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  margin-bottom: 0.4rem;
  letter-spacing: 0.1em;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--c-primary);
  line-height: 1.4;
  letter-spacing: 0.04em;
}
</style>
