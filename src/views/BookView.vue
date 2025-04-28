<template>
  <!-- 主容器，用于展示书籍图片信息 -->
  <div id = "book-container">
    <!-- 动态渲染图片信息 -->
    <div class="book-grid"><template v-for="(item, index) in bookImages" :key="index">
        <!-- 正确引用图片 -->
        <!-- 使用相对路径来解决 URL 相关类型错误 -->
        <img :src="`./img/${index + 1}.png`" :alt="item" class="book-image" />
      </template></div>

  </div>
</template>

<script setup lang="ts">
// 定义书籍图片信息数组
const bookImages = Array.from({ length: 10 }, (_, index) => `图片 ${index + 1}`)
</script>

<style lang="scss" scoped>
#book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px 75px;
  grid-auto-flow: row;
  width: 80%;
  height: 90%;
  max-width: 100%;
  max-height: 100%;
  justify-items: stretch;
  align-items: stretch;
}

.book-image {
  width: auto;
  height: 100%;
  object-fit: cover;
  object-position: center;
  align-self: flex-start;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.book-image:hover {
  transform: scale(1.5);
  z-index: 10;
}

/* 移动端媒体查询 */
@media (max-width: 768px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
}
</style>
