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
    <br />
    <div class="photo-divider"></div>
  </div>
</template>

<script setup lang="ts">
const photos = [
  'public/img_photo/025cd9bde8dce16bcc7180026054286.jpg',
  'public/img_photo/65f60a9002870c118f789852c219e85.jpg',
  'public/img_photo/650b088453e5b07cf41430f3361f160.jpg',
  'public/img_photo/680b97d05ea82731542cfee6694bfd2.jpg',
  'public/img_photo/b0a61f6c82b4b0fbc62a8c391149e3f.jpg',
  'public/img_photo/beb5568d28838c6648cf8de7d36e252.jpg',
  'public/img_photo/d4bd9110d4013c05a2354c6a52633e0.jpg',
  'public/img_photo/e0dbb7cd267a82871334199c7bd2cd7.jpg',
]
</script>

<style scoped>
/* 容器样式 */
.photo-container {
  height: auto;
  text-align: center;
  padding: 2rem;
  /* background-color: white; */
}

/* 标题样式 */
.photo-title {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

/* 分割线样式 */
.photo-divider {
  width: 80%;
  height: 0.2rem;
  background-color: #333;
  margin: 0 auto 2rem auto;
  position: relative;
}

.photo-divider::before,
.photo-divider::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background-color: #fdd835;
  top: -0.4rem;
}

.photo-divider::before {
  left: -2rem;
}

.photo-divider::after {
  right: -2rem;
}

/* 图片网格样式 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
}

/* 单个图片样式 */
.photo-item img {
  width: 100%;
  height: auto;
  max-width: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.photo-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
}
</style>
