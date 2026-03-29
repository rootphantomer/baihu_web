<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<style lang="scss">
html {
  font-size: calc(100vw / 192);
  /* 设计稿宽度1920px时，1rem=10px */
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

// iPhone SE (375px) 及以下
@media (max-width: 390px) {
  html {
    font-size: 6px;
  }
}

// iPhone XR/11/12/13 (390–430px)
@media (min-width: 391px) and (max-width: 430px) {
  html {
    font-size: 7px;
  }
}

// 大屏手机 / 平板竖屏 (431–768px)
@media (min-width: 431px) and (max-width: 768px) {
  html {
    font-size: 8px;
  }
}

// 平板横屏 (769–1024px)
@media (min-width: 769px) and (max-width: 1024px) {
  html {
    font-size: 8.5px;
  }
}
</style>
