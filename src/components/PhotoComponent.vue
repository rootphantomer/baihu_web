<template>
  <div id="photo-container" class="photo-container">
    <!-- 标题 -->
    <h2 class="photo-title">公司摄影 PHOTO</h2>
    <!-- 分割线 -->
    <div class="photo-divider"></div>
    <!-- 图片网格 -->
    <div class="photo-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item">
        <img :src="photo" alt="公司照片" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const photos = [
  'path/to/photo1.jpg',
  'path/to/photo2.jpg',
  'path/to/photo3.jpg',
  'path/to/photo4.jpg',
  'path/to/photo5.jpg',
  'path/to/photo6.jpg',
  'path/to/photo7.jpg',
  'path/to/photo8.jpg',
]
</script>

<style scoped>
/* 容器样式 */
.photo-container {
  height: auto;
  text-align: center;
  padding: 20px;
  /* background-color: white; */
}

/* 标题样式 */
.photo-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

/* 分割线样式 */
.photo-divider {
  width: 80%;
  height: 2px;
  background-color: #333;
  margin: 0 auto 20px auto;
  position: relative;
}

.photo-divider::before,
.photo-divider::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fdd835;
  top: -4px;
}

.photo-divider::before {
  left: -20px;
}

.photo-divider::after {
  right: -20px;
}

/* 图片网格样式 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
}

/* 单个图片样式 */
.photo-item img {
  width: 100%;
  height: auto;
  max-width: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.photo-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}
</style>
