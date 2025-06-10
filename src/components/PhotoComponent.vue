<template>
  <div id="photo-container" class="photo-container">
    <!-- 标题 -->
    <h1 class="photo-title">公司掠影 <span>PHOTO</span></h1>
    <!-- 分割线 -->
    <div class="photo-divider"></div>
    <!-- 图片网格 -->
    <div class="photo-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item">
        <img v-lazy="photo" alt="公司照片" @click="openPreview(photo)" />
      </div>
    </div>
    <br />
    <div class="photo-divider"></div>
    <!-- 全屏预览 -->
    <div v-if="previewImg" class="photo-preview" @click="closePreview">
      <img v-lazy="previewImg" alt="预览" />
      <span class="close-btn" @click.stop="closePreview">&times;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const photos = [
  '/img_photo/025cd9bde8dce16bcc7180026054286.jpg',
  '/img_photo/65f60a9002870c118f789852c219e85.jpg',
  '/img_photo/650b088453e5b07cf41430f3361f160.jpg',
  '/img_photo/WechatIMG319.jpg',
  '/img_photo/b0a61f6c82b4b0fbc62a8c391149e3f.jpg',
  '/img_photo/beb5568d28838c6648cf8de7d36e252.jpg',
  '/img_photo/d4bd9110d4013c05a2354c6a52633e0.jpg',
  '/img_photo/WechatIMG318.jpg',
  '/img_photo/WechatIMG320.jpg',
  '/img_photo/WechatIMG321.jpg',
]
const previewImg = ref<string | null>(null)

// 键盘事件处理函数
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && previewImg.value) {
    e.preventDefault()
    closePreview()
  }
}

function openPreview(photo: string) {
  previewImg.value = photo
  document.body.style.overflow = 'hidden'
  // 失去当前焦点，确保ESC事件能被window捕获
  document.activeElement && (document.activeElement as HTMLElement).blur()
}

function closePreview() {
  previewImg.value = null
  document.body.style.overflow = ''
}

// 只在预览打开时监听ESC
watch(previewImg, (val) => {
  if (val) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped lang="scss">
/* 容器样式 */
.photo-container {
  // height: auto;
  text-align: center;
  padding: 0 2rem;
  /* background-color: white; */
}

/* 标题样式 */
.photo-title {
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;

  span {
    font-size: 5rem;
    font-weight: normal;
    margin-left: 0.8rem;
  }
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
  grid-template-columns: repeat(5, 1fr);
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
  transform: scale(1.2);
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
}

.photo-preview {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.2s;
}

.photo-preview img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 1rem;
  box-shadow: 0 0 2rem #000a;
  background: #fff;
  cursor: auto;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 3rem;
  font-size: 3rem;
  color: #fff;
  cursor: pointer;
  z-index: 10000;
  user-select: none;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #fdd835;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
