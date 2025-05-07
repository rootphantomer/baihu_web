<script setup lang="ts">
import CursorComponents from './components/CursorComponents.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import HomeView from './views/HomeView.vue'
import FooterComponent from './components/FooterComponent.vue'
import PreloadComponents from './components/PreloadComponents.vue'
</script>

<template>
  <!-- 根容器使用 flex 布局（包含所有子元素） -->
  <PreloadComponents />
  <div class="app-container">
    <CursorComponents />
    <HeaderComponent />
    <!-- 内容区域自动扩展 -->
    <HomeView />
    <!-- 将 footer 移到 app-container 内部 -->
    <FooterComponent />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh; /* 占满视口高度 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
}
</style>
