<template>
  <!-- 主容器，用于展示书籍图片信息 -->
  <div class="book-grid">
    <!-- 动态渲染图片信息 -->
    <template v-for="(item, index) in bookImages" :key="index">
      <!-- 正确引用图片 -->
      <!-- 使用相对路径来解决 URL 相关类型错误 -->
      <img :src="`/public/img/${index + 1}.png`" :alt="item" class="book-image" />
    </template>
  </div>
</template>

<script setup lang="ts">
// 定义书籍图片信息数组
const bookImages = Array.from({ length: 10 }, (_, index) => `图片 ${index + 1}`)
</script>

<style lang="scss" scoped>
.book-grid {
  // 使用网格布局，每行显示 6 列，共 2 行
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1px 1px;
  grid-auto-flow: row;
  // 使用相对单位，确保不超过父元素
  width: 80%;
  height: 90%;
  // 限制最大宽度和高度
  max-width: 100%;
  max-height: 100%;

  // 水平居中网格项
  justify-items: stretch;
  // 垂直居中网格项
  align-items: stretch;
}

.book-image {
  // 设置图片宽度和高度为 100%，使其与网格项大小一致
  width: auto;
  height: 100%;
  // 保持图片比例，同时填充整个容器，可能会裁剪部分图片
  object-fit: cover;
  // 让图片在容器中居中显示
  object-position: center;
  align-self: flex-start;
  overflow: hidden;
  // 添加过渡效果，使放大更平滑
  transition: transform 0.3s ease;
}

// 鼠标悬停时放大图片
.book-image:hover {
  transform: scale(1.1);
  // 确保放大的图片显示在其他元素之上
  z-index: 1;
}
</style>
