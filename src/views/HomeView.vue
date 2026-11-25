<template>
  <main class="home">
    <!-- ① Hero -->
    <HeroSection />
    <!-- ② Featured Works -->
    <FeaturedWorksSection />
    <!-- ④ About Preview -->
    <AboutPreviewSection />
    <!-- ⑤ Services -->
    <ServicesSection />
    <!-- ⑥ Recruitment CTA -->
    <RecruitCta />
  </main>
</template>

<script setup lang="ts">
/**
 * 首页：作品主视觉 → 代表作品 → 关于 → 业务 → 招募
 */
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturedWorksSection from '@/components/home/FeaturedWorksSection.vue'
import AboutPreviewSection from '@/components/home/AboutPreviewSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import RecruitCta from '@/components/home/RecruitCta.vue'
</script>

<style lang="scss" scoped>
.home {
  padding-top: var(--header-h);
}
</style>
