<template>
  <!-- 通过 :class 动态控制 loaded 类 -->
  <PreloadComponents :class="{ loaded: isLoaded }" />
  <div class="app-container">
    <CursorComponents />
    <HeaderComponent />
    <!-- 内容区域自动扩展 -->
    <HomeView />
    <!-- 将 footer 移到 app-container 内部 -->
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CursorComponents from './components/CursorComponents.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import HomeView from './views/HomeView.vue'
import FooterComponent from './components/FooterComponent.vue'
import PreloadComponents from './components/PreloadComponents.vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 2000)
})
</script>
<style lang="scss" scoped>
.app-container {
  min-height: 100vh; /* 占满视口高度 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
}
</style>
