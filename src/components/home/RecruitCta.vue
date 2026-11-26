<template>
  <section class="recruit-band">
    <div class="recruit-inner">
      <div class="recruit-copy">
        <span class="label" data-reveal="up">{{ $t('home.recruitment.label') }}</span>
        <h2 class="recruit-title" data-reveal="mask">
          {{ $t('home.recruitment.title') }}
        </h2>
        <p class="recruit-desc" data-reveal="up" style="--reveal-delay: 120ms">
          {{ $t('home.recruitment.desc') }}
        </p>
      </div>

      <div class="recruit-side">
        <span class="open-num" data-reveal="up">
          {{ String(positions.length).padStart(2, '0') }}
        </span>
        <span class="open-label label" data-reveal="up" style="--reveal-delay: 80ms">
          {{ $t('home.recruitment.open') }}
        </span>
        <RouterLink to="/join" class="text-link" data-reveal="up" style="--reveal-delay: 160ms">
          {{ $t('home.recruitment.viewMore') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { positions } from '@/data/recruitment'
</script>

<style lang="scss" scoped>
.recruit-band {
  background: var(--c-surface);
  border-top: 1px solid var(--c-border);
}

.recruit-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 9rem 8rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6rem;

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
    flex-direction: column;
    align-items: flex-start;
    gap: 4rem;
  }
}

.recruit-copy {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.recruit-title {
  font-family: var(--font-display);
  font-size: 4.6rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--c-primary);

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
}

.recruit-desc {
  font-size: 1.4rem;
  color: var(--c-secondary);
}

.recruit-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  flex-shrink: 0;
}

.open-num {
  font-family: var(--font-mono);
  font-size: 7rem;
  line-height: 1;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.open-label {
  color: var(--c-muted);
}

.text-link {
  margin-top: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--c-accent);
  font-size: 1.2rem;
  color: var(--c-accent);
  transition:
    gap var(--duration-fast),
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);

  &:hover {
    border-color: var(--c-primary);
    color: var(--c-primary);
  }
}
</style>
