<template>
  <div id="photo-container" class="photo-container">
    <h1 class="photo-title">{{ $t('photo.title') }} <span>PHOTO</span></h1>

    <div class="photo-divider"></div>

    <div class="photo-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item">
        <img v-lazy="photo" alt="公司照片" @click="openPreview(photo)" />
      </div>
    </div>

    <div class="photo-divider"></div>

    <!-- 全屏预览遮罩 -->
    <Teleport to="body">
      <div v-if="previewImg" class="photo-preview" @click="closePreview">
        <img :src="previewImg" alt="预览" @click.stop />
        <button class="close-btn" aria-label="关闭预览" @click.stop="closePreview">&times;</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const photos = [
  'https://photos.baihu-animation.com/img_photo/025cd9bde8dce16bcc7180026054286.jpg',
  'https://photos.baihu-animation.com/img_photo/65f60a9002870c118f789852c219e85.jpg',
  'https://photos.baihu-animation.com/img_photo/650b088453e5b07cf41430f3361f160.jpg',
  'https://photos.baihu-animation.com/img_photo/WechatIMG319.jpg',
  'https://photos.baihu-animation.com/img_photo/b0a61f6c82b4b0fbc62a8c391149e3f.jpg',
  'https://photos.baihu-animation.com/img_photo/beb5568d28838c6648cf8de7d36e252.jpg',
  'https://photos.baihu-animation.com/img_photo/d4bd9110d4013c05a2354c6a52633e0.jpg',
  'https://photos.baihu-animation.com/img_photo/WechatIMG318.jpg',
  'https://photos.baihu-animation.com/img_photo/WechatIMG320.jpg',
  'https://photos.baihu-animation.com/img_photo/WechatIMG321.jpg',
]

const previewImg = ref<string | null>(null)

function openPreview(photo: string) {
  previewImg.value = photo
  document.body.style.overflow = 'hidden'
}

function closePreview() {
  previewImg.value = null
  document.body.style.overflow = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && previewImg.value) {
    e.preventDefault()
    closePreview()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped lang="scss">
.photo-container {
  text-align: center;
  padding: 0 15rem;
}

.photo-title {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 2rem;

  span {
    font-weight: normal;
    margin-left: 0.8rem;
  }
}

.photo-divider {
  width: 80%;
  height: 0.2rem;
  background-color: #333;
  margin: 0 auto 2rem;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: #fdd835;
    top: -0.4rem;
  }

  &::before { left: -2rem; }
  &::after  { right: -2rem; }
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
}

.photo-item img {
  width: 100%;
  height: auto;
  max-width: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: zoom-in;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 10;
  }
}

// ── 全屏预览 ──────────────────────────────────────────
.photo-preview {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.2s;

  img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.67);
    background: #fff;
    cursor: auto;
  }
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 3rem;
  font-size: 3rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10000;
  user-select: none;
  transition: color 0.2s;

  &:hover { color: #fdd835; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

// 平板：3 列
@media (max-width: 1024px) {
  .photo-container {
    padding: 0 4rem;
  }

  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

// 移动端：2 列
@media (max-width: 768px) {
  .photo-container {
    padding: 0 1.5rem;
  }

  .photo-title {
    font-size: 3.5rem;
  }

  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  .photo-item img {
    max-width: 100%;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
