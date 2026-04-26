<template>
  <div id="work-container" class="work-container">
    <!-- 标题 -->
    <h2 class="work-title">{{ $t('work.title') }} TIME LINE</h2>
    <!-- 时间轴 -->
    <!-- 作品网格 -->
    <div class="work-grid">
      <div v-for="(work, index) in works" :key="index" class="work-item">
        <img :src="work.path" :alt="work.title" loading="lazy" />
        <p class="work-name">{{ work.title }}</p>
      </div>
    </div>
    <!-- 左右箭头 -->
    <!-- <div class="arrow left-arrow">◀</div> -->
    <!-- <div class="arrow right-arrow">▶</div> -->
  </div>
</template>

<script setup lang="ts">
/**
 * 作品时间线页面（旧版，以网格展示所有参与作品）
 */
import { works } from '@/data/works'
</script>

<style lang="scss" scoped>
/* 容器样式 */
.work-container {
  /* height: calc(100vh - 22.5rem); */
  min-height: 74rem;
  /* text-align: start; */
  padding: 2rem;
  background-color: #fdfbf5;
}

/* 标题样式 */
.work-title {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem;
  color: #333;
  display: inline-block;
  border-bottom: 0.2rem solid black;
}

p.work-title {
  font-size: 2rem;
  border-bottom: none;
}

/* 时间轴样式 */
.work-timeline {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #666;
}

/* 作品网格样式 */
.work-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: center;
}

/* 单个作品样式 */
.work-item {
  text-align: center;
  height: 60rem;
}

.work-item img {
  width: 100%;
  /* max-width: 15rem; */
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.work-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
}

.work-role {
  font-size: 2rem;
  color: #666;
}

/* 箭头样式 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.4rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
}

.left-arrow {
  left: 1rem;
}

.right-arrow {
  right: 1rem;
}
</style>
