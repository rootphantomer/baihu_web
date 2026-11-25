<template>
  <main class="page-news">
    <header class="page-head">
      <div class="page-head-inner">
        <span class="label">{{ $t('news.subtitle') }}</span>
        <h1 class="page-title">{{ $t('news.title') }}</h1>
      </div>
    </header>

    <section v-if="latest" class="latest-news">
      <div class="latest-inner">
        <span class="label">{{ $t('news.latest.label') }}</span>
        <div class="latest-row">
          <time class="latest-date">{{ latest.date }}</time>
          <div class="latest-content">
            <h2>{{ latest.title }}</h2>
            <p>{{ latest.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="news-list-section">
      <div class="news-inner">
        <article v-for="item in rest" :key="item.id" class="news-item">
          <time class="news-date">{{ item.date }}</time>
          <div class="news-content">
            <h2 class="news-title">{{ item.title }}</h2>
            <p class="news-summary">{{ item.summary }}</p>
          </div>
        </article>

        <p v-if="newsItems.length === 0" class="no-news">
          {{ $t('news.noNews') }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/** 新闻动态：最新一条置顶，其余按日期列表 */
import { computed } from 'vue'
import { t } from '@/composables/useI18n'
import { news } from '@/data/news'

const newsItems = computed(() =>
  news.map((item) => ({
    id: item.id,
    date: item.date,
    title: t(item.titleKey),
    summary: t(item.summaryKey),
  })),
)

const latest = computed(() => newsItems.value[0])
const rest = computed(() => newsItems.value.slice(1))
</script>

<style lang="scss" scoped>
.page-news {
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

// ─── Latest ───────────────────────────────────────────────────────────────────
.latest-news {
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
}

.latest-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem 8rem 6rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 5rem 5vw;
  }
}

.latest-row {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 24rem 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.latest-date {
  font-family: var(--font-mono);
  font-size: 2.4rem;
  color: var(--c-accent);
  letter-spacing: 0.04em;
}

.latest-content {
  h2 {
    font-family: var(--font-display);
    font-size: 3.4rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: var(--c-primary);
    text-wrap: balance;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }

  p {
    margin-top: 2rem;
    font-size: 1.4rem;
    line-height: 1.9;
    color: var(--c-secondary);
    max-width: 70rem;
  }
}

// ─── Archive ──────────────────────────────────────────────────────────────────
.news-list-section {
  background: var(--c-bg);
}

.news-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 6rem 8rem 12rem;

  @media (max-width: 1024px) {
    padding: 5rem 4rem 8rem;
  }
  @media (max-width: 768px) {
    padding: 4rem 5vw 6rem;
  }
}

.news-item {
  display: grid;
  grid-template-columns: 24rem 1fr;
  gap: 4rem;
  padding: 4rem 0;
  border-bottom: 1px solid var(--c-border);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    padding: 3rem 0;
  }
}

.news-date {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  color: var(--c-muted);
  letter-spacing: 0.08em;
}

.news-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--c-primary);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.news-summary {
  margin-top: 1.2rem;
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--c-secondary);
  max-width: 76rem;
}

.no-news {
  padding: 8rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 1.4rem;
}
</style>
