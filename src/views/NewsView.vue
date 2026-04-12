<template>
  <main class="page-news">
    <div class="page-header">
      <div class="page-header-inner">
        <span class="label">{{ $t('news.subtitle') }}</span>
        <h1 class="page-title">{{ $t('news.title') }}</h1>
      </div>
    </div>

    <section class="news-list-section">
      <div class="news-inner">
        <div
          v-for="(item, i) in newsItems"
          :key="item.id"
          class="news-item"
        >
          <span class="news-num label">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="news-content">
            <span class="news-date label">{{ item.date }}</span>
            <h2 class="news-title">{{ item.title }}</h2>
            <p class="news-summary">{{ item.summary }}</p>
          </div>
        </div>

        <p v-if="newsItems.length === 0" class="no-news">
          {{ $t('news.noNews') }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { news } from '@/data/news'
const newsItems = news
</script>

<style lang="scss" scoped>
.page-news {
  padding-top: var(--header-h);
  background: var(--c-bg);
  min-height: 100vh;
}

.page-header {
  border-bottom: 1px solid var(--c-border);
  padding: 8rem 8rem 5rem;

  @media (max-width: 1024px) { padding: 6rem 4rem 4rem; }
  @media (max-width: 900px)  { padding: 5rem 5vw 3.5rem; }
  @media (max-width: 768px)  { padding: 5rem 5vw 3rem; }
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

  @media (max-width: 768px) { font-size: 4rem; }
}

.news-list-section {
  border-bottom: 1px solid var(--c-border);
}

.news-inner {
  max-width: 1600px;
  margin: 0 auto;
}

.news-item {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 4rem;
  padding: 5rem 8rem;
  border-bottom: 1px solid var(--c-border);
  transition: background var(--duration-fast);

  &:last-child { border-bottom: none; }
  &:hover { background: var(--c-surface); }

  @media (max-width: 1024px) { padding: 4rem; gap: 3rem; }
  @media (max-width: 900px)  {
    padding: 3rem 5vw;
    grid-template-columns: 4rem 1fr;
    gap: 2rem;
  }
  @media (max-width: 768px)  {
    padding: 3rem 5vw;
    grid-template-columns: 4rem 1fr;
    gap: 2rem;
  }
}

.news-num {
  font-size: 0.9rem;
  color: var(--c-accent);
  padding-top: 0.6rem;
}

.news-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.news-date {
  font-size: 0.9rem;
  color: var(--c-muted);
  letter-spacing: 0.15em;
}

.news-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;
  line-height: 1.4;

  @media (max-width: 768px) { font-size: 1.8rem; }
}

.news-summary {
  font-family: var(--font-body);
  font-size: 1.4rem;
  color: var(--c-secondary);
  line-height: 1.8;
  max-width: 80rem;
}

.no-news {
  text-align: center;
  padding: 8rem;
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--c-muted);
}
</style>
