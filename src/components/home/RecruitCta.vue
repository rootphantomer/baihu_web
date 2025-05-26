<template>
  <section class="recruit-cta">
    <div class="rc-inner">
      <div class="rc-left">
        <span class="label">{{ $t('home.recruitment.label') }}</span>
        <h2 class="rc-title">{{ $t('home.recruitment.title') }}</h2>
        <p class="rc-desc">{{ $t('home.recruitment.desc') }}</p>
      </div>
      <div class="rc-right">
        <RouterLink to="/join" class="rc-btn">
          <span>{{ $t('home.recruitment.viewMore') }}</span>
          <span class="rc-arrow">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.recruit-cta {
  border-top: 1px solid var(--c-border);
  background: var(--c-surface);
}

.rc-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1280px) {
    padding: 7rem 5rem;
  }

  @media (max-width: 1024px) {
    padding: 6rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 5rem 5vw;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 5vw;
  }

  @media (max-width: 430px) {
    padding: 3.5rem 4vw;
    gap: 2.5rem;
  }
}

.rc-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 60rem;

  @media (max-width: 430px) {
    gap: 1.2rem;
  }
}

.rc-title {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.06em;

  @media (max-width: 1280px) {
    font-size: 3.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }

  @media (max-width: 430px) {
    font-size: 2.2rem;
  }

  @media (max-width: 390px) {
    font-size: 2rem;
  }
}

.rc-desc {
  font-family: var(--font-body);
  font-size: 1.4rem;
  color: var(--c-secondary);
  line-height: 1.8;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 430px) {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.rc-right {
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
}

.rc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 1px solid var(--c-accent);
  padding: 2rem 4rem;
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--c-accent);
  letter-spacing: 0.1em;
  min-height: 5.5rem;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition:
    background var(--duration-fast),
    color var(--duration-fast),
    gap var(--duration-fast),
    transform var(--duration-fast);

  .rc-arrow {
    transition: transform var(--duration-fast);
  }

  &:hover {
    background: var(--c-accent);
    color: var(--c-bg);
    gap: 2.6rem;

    .rc-arrow {
      transform: translateX(0.4rem);
    }
  }

  &:active {
    transform: scale(0.98);
    background: var(--c-accent);
    color: var(--c-bg);

    .rc-arrow {
      transform: translateX(0.4rem);
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 1.8rem 3rem;
  }

  @media (max-width: 430px) {
    padding: 1.6rem 2rem;
    font-size: 1.2rem;
    gap: 1.5rem;
  }

  @media (max-width: 390px) {
    padding: 1.5rem 1.8rem;
    font-size: 1.1rem;
  }
}
</style>
