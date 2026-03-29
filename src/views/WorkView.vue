<template>
  <div class="work-container">
    <h2 class="work-title">{{ $t('work.title') }} TIME LINE</h2>
    <div class="work-grid">
      <div v-for="(work, index) in works" :key="index" class="work-item">
        <img v-lazy="work.path" :alt="work.title" />
        <p class="work-name">{{ work.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { works } from '@/data/works'
</script>

<style lang="scss" scoped>
.work-container {
  min-height: 74rem;
  padding: 2rem;
  background-color: #fdfbf5;
}

.work-title {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem;
  color: #333;
  display: inline-block;
  border-bottom: 0.2rem solid black;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: center;
}

.work-item {
  text-align: center;
  height: 60rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
    }
  }
}

.work-name {
  font-size: 2rem;
}

// 平板：3 列
@media (max-width: 1024px) {
  .work-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;
  }

  .work-item {
    height: auto;
  }
}

// 移动端：2 列
@media (max-width: 768px) {
  .work-container {
    padding: 1.5rem;
    min-height: unset;
  }

  .work-title {
    font-size: 2.8rem;
    margin: 0.5rem 0 1.5rem;
  }

  .work-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  .work-item {
    height: auto;
  }

  .work-name {
    font-size: 1.6rem;
    margin-top: 0.4rem;
  }
}
</style>
