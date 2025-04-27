<script setup lang="ts">
import { RouterView } from 'vue-router'
import CursorComponents from './components/CursorComponents.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <!-- 渲染自定义光标组件 -->
  <CursorComponents />
  <!-- 渲染头部组件 -->
  <HeaderComponent />
  <!-- 主内容区域 -->
  <main class="singlebody">
    <!-- 渲染路由视图 -->
    <RouterView />
  </main>
  <!-- 渲染底部组件 -->
  <FooterComponent />
</template>

<style lang="scss" scoped>
// 主内容区域样式
.singlebody {
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
