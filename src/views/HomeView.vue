<template>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div id="home-container">
      <AboutView />
      <BookView />
      <NewsView />
      <ContactView />
  </div>
</template>

<script setup lang="ts">
import AboutView from './AboutView.vue'
import BookView from './BookView.vue'
import NewsView from './NewsView.vue'
import ContactView from './ContactView.vue'
</script>
<style lang="scss" scoped>
#home-container {
  // 确保父容器能容纳子元素（可选，根据实际布局需求）
  min-height: calc(100vh - 140px);
}

// 直接设置子元素的高度为 100vh
#home-container > * {
  height: calc(100vh - 140px);
  // 如果子元素需要滚动（内容超过视口时），可添加 overflow: auto
  // overflow: auto;
}
</style>
