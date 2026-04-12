<template>
  <section class="about-preview">
    <div class="ap-inner">
      <!-- Left: Statement -->
      <div class="ap-left">
        <span class="label">{{ $t('home.about.label') }}</span>
        <h2 class="ap-title">
          <span class="ap-title-line">Animation</span>
          <span class="ap-title-line ap-title-accent">Production</span>
          <span class="ap-title-line">Studio.</span>
        </h2>
        <p class="ap-statement">{{ $t('home.about.statement') }}</p>
        <RouterLink to="/about" class="ap-link">
          {{ $t('home.about.viewMore') }} <span>→</span>
        </RouterLink>
      </div>

      <!-- Right: Stats -->
      <div class="ap-right">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-num">2025</span>
            <span class="stat-label">{{ $t('home.about.stats.founded') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">10<span class="stat-unit">+</span></span>
            <span class="stat-label">{{ $t('home.about.stats.team') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">45<span class="stat-unit">+</span></span>
            <span class="stat-label">{{ $t('home.about.stats.projects') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">8<span class="stat-unit">+</span></span>
            <span class="stat-label">パートナー</span>
          </div>
        </div>

        <!-- Accent quote -->
        <blockquote class="ap-quote">
          "每一帧，都承载着对动画的敬意。"
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-preview {
  border-top: 1px solid var(--c-border);
  background: var(--c-surface);
}

.ap-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

// ─── Left ────────────────────────────────────────────────────────────────────
.ap-left {
  padding: 10rem 8rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-right: 1px solid var(--c-border);

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }

  @media (max-width: 1024px) {
    padding: 7rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 5rem 5vw;
    border-right: none;
    border-bottom: 1px solid var(--c-border);
  }

  @media (max-width: 768px) {
    padding: 4rem 5vw;
  }

  @media (max-width: 430px) {
    padding: 3.5rem 4vw;
    gap: 2rem;
  }
}

.ap-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 1;
}

.ap-title-line {
  font-family: var(--font-display);
  font-size: 5rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.02em;

  @media (max-width: 1280px) {
    font-size: 4.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 4rem;
  }

  @media (max-width: 900px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 430px) {
    font-size: 2.5rem;
  }

  @media (max-width: 390px) {
    font-size: 2.2rem;
  }
}

.ap-title-accent {
  color: var(--c-accent);
}

.ap-statement {
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--c-secondary);
  line-height: 1.9;
  max-width: 50rem;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  @media (max-width: 430px) {
    font-size: 1.1rem;
    line-height: 1.75;
  }
}

.ap-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-accent);
  letter-spacing: 0.1em;
  min-height: 3rem;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: gap var(--duration-fast);

  &:hover {
    gap: 1.2rem;
  }

  &:active {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 430px) {
    font-size: 1rem;
  }
}

// ─── Right ────────────────────────────────────────────────────────────────────
.ap-right {
  padding: 10rem 8rem 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5rem;

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
    gap: 4rem;
  }

  @media (max-width: 1024px) {
    padding: 7rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 4rem 5vw;
    flex-direction: column;
    gap: 3.5rem;
  }

  @media (max-width: 768px) {
    padding: 3.5rem 5vw;
  }

  @media (max-width: 430px) {
    padding: 3rem 4vw;
    gap: 3rem;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 390px) {
    gap: 1.5rem;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.stat-num {
  font-family: var(--font-mono);
  font-size: 4.5rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: -0.02em;
  line-height: 1;

  @media (max-width: 1280px) {
    font-size: 4rem;
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }

  @media (max-width: 390px) {
    font-size: 2.2rem;
  }
}

.stat-unit {
  font-size: 0.6em;
  color: var(--c-accent);
  vertical-align: super;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--c-muted);
  letter-spacing: 0.12em;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
}

.ap-quote {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--c-muted);
  letter-spacing: 0.1em;
  line-height: 1.8;
  border-left: 2px solid var(--c-accent);
  padding-left: 2rem;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding-left: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
}
</style>
