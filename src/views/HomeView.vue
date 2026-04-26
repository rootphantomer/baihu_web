<template>
  <main class="home">
    <!-- ① Hero -->
    <HeroSection />
    <!-- ② Marquee -->
    <MarqueeSection />
    <!-- ③ Featured Works -->
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
 * 首页：由 Hero、跑马灯、代表作品、关于预览、服务、招聘 CTA 六个区块组成
 */
import HeroSection from '@/components/home/HeroSection.vue'
import MarqueeSection from '@/components/home/MarqueeSection.vue'
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
