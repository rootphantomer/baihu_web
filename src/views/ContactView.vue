<template>
  <main class="page-contact">
    <header class="page-head">
      <div class="page-head-inner" data-reveal="up">
        <span class="label">{{ $t('contact.subtitle') }}</span>
        <h1 class="page-title">{{ $t('contact.title') }}</h1>
        <p class="page-intro">{{ $t('contact.intro') }}</p>
      </div>
    </header>

    <section class="contact-main">
      <div class="email-block">
        <span class="label">{{ $t('contact.direct.label') }}</span>
        <a :href="`mailto:${$t('contact.email.value')}`" class="email-link">
          {{ $t('contact.email.value') }}
        </a>
      </div>

      <div class="info-rows">
        <div class="info-row">
          <span class="info-label">{{ $t('contact.address.label') }}</span>
          <span class="info-value">{{ $t('contact.address.value') }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ $t('contact.hours.label') }}</span>
          <span class="info-value">{{ $t('contact.hours.value') }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">{{ $t('contact.social.label') }}</span>
          <span class="info-value">
            <a href="https://weibo.com/u/8001978950" target="_blank" rel="noopener">
              {{ $t('contact.social.weibo') }} ↗
            </a>
          </span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/** 联系页：大邮箱作为主角，其他信息以细信息行呈现 */
</script>

<style lang="scss" scoped>
.page-contact {
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
  gap: 2rem;
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

.page-intro {
  max-width: 76rem;
  font-size: 1.5rem;
  line-height: 1.8;
  color: var(--c-secondary);
}

.contact-main {
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem 14rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 10rem;

  @media (max-width: 1024px) {
    padding: 8rem 4rem 10rem;
    gap: 6rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 6rem 5vw 8rem;
  }
}

.email-block {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  min-width: 0;
}

.email-link {
  font-family: var(--font-mono);
  font-size: 3.4rem;
  line-height: 1.3;
  color: var(--c-primary);
  overflow-wrap: anywhere;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--c-accent);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--c-accent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.info-rows {
  border-top: 1px solid var(--c-border);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--c-border);
}

.info-label {
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.16em;
  color: var(--c-accent);
}

.info-value {
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--c-secondary);

  a {
    color: inherit;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 0.3rem;
    transition: color var(--duration-fast);

    &:hover {
      color: var(--c-accent);
      border-color: var(--c-accent);
    }
  }
}
</style>
