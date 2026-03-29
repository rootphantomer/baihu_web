<template>
  <div class="show-container">
    <div class="work-showcase" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
      @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
      <button class="arrow left" @click="prevIndex">
        <img src="@/assets/left.svg" alt="上一张" />
      </button>

      <div class="work-list">
        <div v-for="(work, idx) in showcaseWorks" :key="idx" class="work-item" :class="getPositionClass(idx)"
          @click="selectIndex(idx)">
          <img v-lazy="work.img" />
        </div>
      </div>

      <button class="arrow right" @click="nextIndex">
        <img src="@/assets/right.svg" alt="下一张" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showcaseWorks } from '@/data/showcase'
import { useCarousel } from '@/composables/useCarousel'

const {
  currentIndex,
  selectIndex,
  prevIndex,
  nextIndex,
  getPositionClass,
  handleMouseEnter,
  handleMouseLeave,
  handleTouchStart,
  handleTouchEnd,
} = useCarousel(showcaseWorks.length, 3)
</script>

<style lang="scss" scoped>
.show-container {
  margin-top: 2rem;
  min-height: 80rem;
  background-color: #fbe58e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 6rem;
  overflow: hidden;
}

.work-showcase {
  position: relative;
  display: flex;
  align-items: center;
  flex: 2;

  .arrow {
    position: absolute;
    top: 50%;
    z-index: 10;
    width: 4rem;
    height: 6rem;
    background: transparent;
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transform: translateY(-50%);
    box-shadow: none;

    img {
      width: auto;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    &.left {
      left: -55rem;
    }

    &.right {
      right: -52rem;
    }
  }

  .work-list {
    position: relative;
    width: 70rem;
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .work-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0.5;
      z-index: 1;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;

      img {
        width: 45rem;
        height: auto;
        object-fit: cover;
        border-radius: 1.6rem;
        box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.15);
        background: #fff;
      }

      &.center {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
        z-index: 5;
        cursor: default;
      }

      &.left1 {
        transform: translate(-130%, -50%) scale(0.8) rotateY(10deg);
        opacity: 0.8;
        z-index: 4;
      }

      &.left2 {
        transform: translate(-200%, -50%) scale(0.7) rotateY(20deg);
        opacity: 0.5;
        z-index: 3;
      }

      &.right1 {
        transform: translate(30%, -50%) scale(0.8) rotateY(-10deg);
        opacity: 0.8;
        z-index: 4;
      }

      &.right2 {
        transform: translate(100%, -50%) scale(0.7) rotateY(-20deg);
        opacity: 0.5;
        z-index: 3;
      }

      &.hide-left,
      &.hide-right {
        opacity: 0;
        pointer-events: none;
        z-index: 1;
      }
    }
  }
}

// 平板：缩小高度
@media (max-width: 1024px) {
  .arrow {
    display: none !important;
  }

  .show-container {
    min-height: 60rem;
    padding: 0 2rem;
  }
}

// 移动端：单卡展示，高度跟随图片自然撑开
@media (max-width: 768px) {
  .show-container {
    min-height: unset;
    padding: 4rem 1rem 5rem;
    overflow: visible;
  }

  .work-showcase {
    width: 100%;
    flex: unset;
    // 不再使用绝对定位 + 固定高度，改为普通流
    display: block;
    position: relative;
  }

  // work-list 不再固定高度，由内部单张图片撑开
  .work-list {
    position: relative !important;
    width: 100% !important;
    // 高度由图片内容决定，给予足够的占位空间
    height: auto !important;
    min-height: 50vw;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .work-item {
    // 两侧卡片隐藏（仍用 absolute）
    &.left1,
    &.left2,
    &.right1,
    &.right2,
    &.hide-left,
    &.hide-right {
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
    }

    // 中央卡片脱离 absolute，自然撑开高度
    &.center {
      position: relative !important;
      top: unset !important;
      left: unset !important;
      transform: none !important;
      opacity: 1 !important;
      z-index: 5;
      cursor: default;
      width: 82vw;

      img {
        width: 100% !important;
        height: auto !important;
        display: block;
      }
    }

    img {
      width: 82vw !important;
      height: auto !important;
    }
  }
}
</style>
