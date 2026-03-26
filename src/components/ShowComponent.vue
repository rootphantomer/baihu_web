<template>
  <div class="show-container">
    <div
      class="work-showcase"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <button class="arrow left" @click="prevWork" style="background: transparent; box-shadow: none">
        <img src="@/assets/left.svg" alt="上一张" style="width: auto; height: 100%; object-fit: contain; display: block" />
      </button>
      <div class="work-list">
        <div
          v-for="(work, idx) in works"
          :key="idx"
          class="work-item"
          :class="getPositionClass(idx)"
          @click="selectWork(idx)"
        >
          <img v-lazy="work.img" />
        </div>
      </div>
      <button class="arrow right" @click="nextWork" style="background: transparent; box-shadow: none">
        <img src="@/assets/right.svg" alt="下一张" style="width: auto; height: 100%; object-fit: contain; display: block" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const works = [
  { img: 'https://photos.baihu-animation.com/img_index_work/地缚少年花子君.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/反叛的鲁路修·夺还的罗赛.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/进击的巨人 the final season .jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/卡片决斗先导者G.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/老虎和兔子2.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/鲁邦三世 PART6.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/偶像大师-闪耀色彩.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/食戟之灵_神之皿.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/水星的魔女.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/异世界自杀小队.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/游戏王VRAINS.jpg' },
  { img: 'https://photos.baihu-animation.com/img_index_work/SMILE光之美少女.webp' },
  { img: 'https://photos.baihu-animation.com/img_index_work/とある科学の超電磁砲T.jpg' },
]

const currentIndex = ref(3)
const intervalId = ref<number | null>(null)

// ── 轮播控制 ──────────────────────────────────────────
const selectWork = (idx: number) => {
  currentIndex.value = idx
}

const prevWork = () => {
  currentIndex.value = currentIndex.value === 0 ? works.length - 1 : currentIndex.value - 1
}

const nextWork = () => {
  currentIndex.value = currentIndex.value === works.length - 1 ? 0 : currentIndex.value + 1
}

function getPositionClass(idx: number) {
  const total = works.length
  let diff = idx - currentIndex.value
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total

  if (diff === 0) return 'center'
  if (diff === -1) return 'left1'
  if (diff === -2) return 'left2'
  if (diff === 1) return 'right1'
  if (diff === 2) return 'right2'
  if (diff < -2) return 'hide-left'
  if (diff > 2) return 'hide-right'
  return ''
}

// ── 自动播放 ──────────────────────────────────────────
function startAutoPlay() {
  if (intervalId.value) return
  intervalId.value = window.setInterval(() => {
    currentIndex.value = currentIndex.value < works.length - 1 ? currentIndex.value + 1 : 0
  }, 4000)
}

function stopAutoPlay() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// ── 鼠标悬停暂停 ──────────────────────────────────────
function handleMouseEnter() { stopAutoPlay() }
function handleMouseLeave() { startAutoPlay() }

// ── 移动端 Touch 滑动支持 ─────────────────────────────
const touchStartX = ref(0)
const SWIPE_THRESHOLD = 50 // px，超过此距离才触发切换

function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0].clientX
  stopAutoPlay()
}

function handleTouchEnd(e: TouchEvent) {
  const deltaX = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
    deltaX < 0 ? nextWork() : prevWork()
  }
  startAutoPlay()
}

onMounted(() => { startAutoPlay() })
onUnmounted(() => { stopAutoPlay() })
</script>

<style lang="scss" scoped>
.show-container {
  margin-top: 2rem;
  min-height: 80rem;
  background-color: #fbe58e;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 0;
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
    font-size: 4rem;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transform: translateY(-50%);

    &.left { left: -55rem; }
    &.right { right: -52rem; }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
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

// 移动端：隐藏箭头按钮（用 touch 滑动代替），保留轮播图
@media (max-width: 1024px) {
  button.arrow {
    display: none !important;
  }
}
</style>
