<template>
  <main class="page-404">
    <div class="page-404-inner">
      <span class="code">404</span>
      <h1 class="title">{{ $t('notFound.title') }}</h1>
      <p class="desc">{{ $t('notFound.desc') }}</p>
      <RouterLink to="/" class="back-home">{{ $t('notFound.goHome') }}</RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
/**
 * 404 页面：页面未找到提示 + 返回首页按钮
 */
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.page-404 {
  min-height: 100vh;
  background: var(--c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-404-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  text-align: center;
  padding: 4rem;
}

.code {
  font-family: var(--font-mono);
  font-size: 12rem;
  font-weight: 400;
  color: var(--c-border);
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 8rem;
  }
}

.title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.desc {
  font-family: var(--font-body);
  font-size: 1.4rem;
  color: var(--c-muted);
  line-height: 1.8;
  max-width: 40rem;
}

.back-home {
  display: inline-block;
  margin-top: 1rem;
  padding: 1rem 3rem;
  border: 1px solid var(--c-accent);
  color: var(--c-accent);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition:
    background var(--duration-fast),
    color var(--duration-fast);

  &:hover {
    background: var(--c-accent);
    color: var(--c-bg);
  }
}
</style>
