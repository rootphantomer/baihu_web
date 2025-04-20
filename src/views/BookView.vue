<template>
  <!-- 主容器，用于展示书籍图片信息 -->
  <div id="main">
    <!-- 动态渲染图片信息 -->
    <template v-for="(item, index) in bookImages" :key="index">
      <!-- 这里之后可以替换为实际的图片标签 -->
      <!-- <img :src="`@/assets/books/${index + 1}.jpg`" :alt="item" /> -->
      <p>{{ item }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
// 定义书籍图片信息数组
const bookImages = Array.from({ length: 10 }, (_, index) => `图片 ${index + 1}`);
</script>

<style lang="scss" scoped>
#main {
  // 使用网格布局，每行显示 5 列，共 2 行
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 100%;
  // 水平居中网格项
  justify-items: center;
  // 垂直居中网格项
  align-items: center;
}
</style>
