<template>
  <section class="studio-band">
    <div class="band-visual" aria-hidden="true">
      <img
        src="https://photos.baihu-animation.com/img_index_work/水星的魔女.jpg"
        alt=""
        width="2160"
        height="3048"
        loading="lazy"
      />
      <span class="band-shade"></span>
    </div>

    <div class="band-inner">
      <span class="label" data-reveal="up">{{ $t('home.about.label') }}</span>
      <h2 class="band-title" data-reveal="mask">{{ $t('home.hero.tagline') }}</h2>
      <p class="band-text" data-reveal="up" style="--reveal-delay: 120ms">
        {{ $t('home.about.statement') }}
      </p>
      <RouterLink to="/about" class="text-link" data-reveal="up" style="--reveal-delay: 200ms">
        {{ $t('home.about.viewMore') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
/** 首页工作室陈述：用一张作品图作为全宽背景，文字压在深色层上 */
</script>

<style lang="scss" scoped>
.studio-band {
  position: relative;
  overflow: hidden;
  min-height: 62rem;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  background: #000;
  color: #fff;
}

.band-visual {
  position: absolute;
  inset: 0;
}

.band-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 32%;
  filter: saturate(0.7) contrast(1.02);
  opacity: 0.55;
}

.band-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.72) 55%,
    rgba(0, 0, 0, 0.35) 100%
  );
}

.band-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 1280px) {
    padding: 8rem 5rem;
  }
  @media (max-width: 768px) {
    padding: 6rem 5vw;
    gap: 2rem;
  }
}

.band-title {
  max-width: 68rem;
  font-family: var(--font-serif);
  font-size: 4.8rem;
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0.04em;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
}

.band-text {
  max-width: 56rem;
  font-size: 1.4rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.8);
}

.text-link {
  align-self: flex-start;
  display: inline-flex;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--c-accent);
  font-size: 1.2rem;
  color: var(--c-accent);
  transition:
    gap var(--duration-fast),
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);

  &:hover {
    gap: 0.6rem;
  }
}
</style>
