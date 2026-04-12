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
            <span class="stat-num">2015</span>
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

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

// ─── Left ────────────────────────────────────────────────────────────────────
.ap-left {
  padding: 10rem 8rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-right: 1px solid var(--c-border);

  @media (max-width: 1024px) { padding: 8rem 4rem; }
  @media (max-width: 768px)  { padding: 6rem 5vw; border-right: none; border-bottom: 1px solid var(--c-border); }
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

  @media (max-width: 1024px) { font-size: 4rem; }
  @media (max-width: 768px)  { font-size: 3.5rem; }
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
}

.ap-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--c-accent);
  letter-spacing: 0.1em;
  transition: gap var(--duration-fast);

  &:hover { gap: 1.2rem; }
}

// ─── Right ────────────────────────────────────────────────────────────────────
.ap-right {
  padding: 10rem 8rem 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5rem;

  @media (max-width: 1024px) { padding: 8rem 4rem; }
  @media (max-width: 768px)  { padding: 6rem 5vw; }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
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

  @media (max-width: 768px) { font-size: 3.5rem; }
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
}
</style>
