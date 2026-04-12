<template>
  <main class="page-contact">
    <div class="page-header">
      <div class="page-header-inner">
        <span class="label">{{ $t('contact.subtitle') }}</span>
        <h1 class="page-title">{{ $t('contact.title') }}</h1>
        <p class="page-intro">{{ $t('contact.intro') }}</p>
      </div>
    </div>

    <section class="contact-body">
      <div class="contact-inner">
        <!-- Info Cards -->
        <div class="info-grid">
          <div class="info-card">
            <span class="info-label label">{{ $t('contact.email.label') }}</span>
            <a :href="`mailto:${$t('contact.email.value')}`" class="info-value info-link">
              {{ $t('contact.email.value') }}
              <span class="info-arrow">→</span>
            </a>
          </div>
          <div class="info-card">
            <span class="info-label label">{{ $t('contact.address.label') }}</span>
            <p class="info-value">{{ $t('contact.address.value') }}</p>
          </div>
          <div class="info-card">
            <span class="info-label label">{{ $t('contact.hours.label') }}</span>
            <p class="info-value">{{ $t('contact.hours.value') }}</p>
          </div>
          <div class="info-card">
            <span class="info-label label">{{ $t('contact.social.label') }}</span>
            <div class="info-socials">
              <a
                href="https://weibo.com/u/8001978950"
                target="_blank"
                rel="noopener"
                class="social-link"
                >{{ $t('contact.social.weibo') }} →</a
              >
            </div>
          </div>
        </div>

        <!-- Big Email CTA -->
        <div class="email-cta">
          <span class="label">Direct</span>
          <a :href="`mailto:${$t('contact.email.value')}`" class="email-big">
            {{ $t('contact.email.value') }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// ContactView
</script>

<style lang="scss" scoped>
.page-contact {
  padding-top: var(--header-h);
  background: var(--c-bg);
  min-height: 100vh;
}

.page-header {
  border-bottom: 1px solid var(--c-border);
  padding: 8rem 8rem 5rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 5rem 5vw 3.5rem;
  }
  @media (max-width: 768px) {
    padding: 5rem 5vw 3rem;
  }
}

.page-header-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 400;
  color: var(--c-primary);
  letter-spacing: 0.04em;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
}

.page-intro {
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--c-secondary);
  max-width: 80rem;
  line-height: 1.8;
}

.contact-body {
  border-bottom: 1px solid var(--c-border);
}

.contact-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem;

  @media (max-width: 1024px) {
    padding: 6rem 4rem;
  }
  @media (max-width: 900px) {
    padding: 5rem 5vw;
  }
  @media (max-width: 768px) {
    padding: 5rem 5vw;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--c-border);
  margin-bottom: 10rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    margin-bottom: 6rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: 6rem;
  }
}

.info-card {
  background: var(--c-bg);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: background var(--duration-fast);

  &:hover {
    background: var(--c-surface);
  }
}

.info-label {
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  color: var(--c-accent);
}

.info-value {
  font-family: var(--font-body);
  font-size: 1.6rem;
  color: var(--c-primary);
  line-height: 1.7;
}

.info-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition:
    gap var(--duration-fast),
    color var(--duration-fast);

  .info-arrow {
    color: var(--c-accent);
  }
  &:hover {
    color: var(--c-accent);
    gap: 1.5rem;
  }
}

.info-socials {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--c-secondary);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--c-accent);
  }
}

.email-cta {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.email-big {
  font-family: var(--font-mono);
  font-size: 3rem;
  color: var(--c-primary);
  letter-spacing: 0.04em;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  transition: color var(--duration-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--c-accent);
    transition: width var(--duration-base) var(--ease-out);
  }

  &:hover {
    color: var(--c-accent);
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}
</style>
