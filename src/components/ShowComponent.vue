<template>
  <!-- 关于我们页面的主容器 -->
  <div class="show-container">
    <div class="work-showcase" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <button class="arrow left" @click="prevWork" :disabled="currentIndex === 0">&#9664;</button>
      <div class="work-list">
        <div
          v-for="(work, idx) in works"
          :key="idx"
          class="work-item"
          :class="getPositionClass(idx)"
          @click="selectWork(idx)"
        >
          <img :src="work.img" :alt="work.title" />
        </div>
      </div>
      <button class="arrow right" @click="nextWork" :disabled="currentIndex === works.length - 1">
        &#9654;
      </button>
    </div>
    <div class="work-desc">
      <h2>{{ works[currentIndex].title }}</h2>
      <p>{{ works[currentIndex].desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const works = [
  {
    img: '/img1/地缚少年花子君.png',
    title: '地缚少年花子君',
    desc: '这是地缚少年花子君的介绍内容。',
  },
  {
    img: '/img1/反叛的鲁路修·夺还的罗赛.jpg',
    title: '反叛的鲁路修·夺还的罗赛',
    desc: '这是反叛的鲁路修·夺还的罗赛的介绍内容。',
  },
  {
    img: '/img1/进击的巨人 the final season .jpg',
    title: '进击的巨人 the final season',
    desc: '这是进击的巨人 the final season 的介绍内容。',
  },
  {
    img: '/img1/卡片决斗先导者G.png',
    title: '卡片决斗先导者G',
    desc: '这是卡片决斗先导者G的介绍内容。',
  },
  {
    img: '/img1/老虎和兔子2.jpg',
    title: '老虎和兔子2',
    desc: '这是老虎和兔子2的介绍内容。',
  },
  {
    img: '/img1/鲁邦三世 PART6.png',
    title: '鲁邦三世 PART6',
    desc: '这是鲁邦三世 PART6的介绍内容。',
  },
  {
    img: '/img1/偶像大师-闪耀色彩.jpg',
    title: '偶像大师-闪耀色彩',
    desc: '这是偶像大师-闪耀色彩的介绍内容。',
  },
  {
    img: '/img1/食戟之灵_神之皿.png',
    title: '食戟之灵 神之皿',
    desc: '这是食戟之灵 神之皿的介绍内容。',
  },
  {
    img: '/img1/水星的魔女.png',
    title: '水星的魔女',
    desc: '这是水星的魔女的介绍内容。',
  },
  {
    img: '/img1/异世界自杀小队.png',
    title: '异世界自杀小队',
    desc: '这是异世界自杀小队的介绍内容。',
  },
  {
    img: '/img1/游戏王VRAINS.jpg',
    title: '游戏王VRAINS',
    desc: '这是游戏王VRAINS的介绍内容。',
  },
  {
    img: '/img1/SMILE光之美少女.webp',
    title: 'SMILE光之美少女',
    desc: '这是SMILE光之美少女的介绍内容。',
  },
  {
    img: '/img1/とある科学の超電磁砲T .png',
    title: 'とある科学の超電磁砲T',
    desc: '这是とある科学の超電磁砲T的介绍内容。',
  },
]
const currentIndex = ref(0)
const intervalId = ref<number | null>(null)

const selectWork = (idx: number) => {
  currentIndex.value = idx
}
const prevWork = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
const nextWork = () => {
  if (currentIndex.value < works.length - 1) currentIndex.value++
}

function getPositionClass(idx: number) {
  const diff = idx - currentIndex.value
  if (diff === 0) return 'center'
  if (diff === -1) return 'left1'
  if (diff === -2) return 'left2'
  if (diff === 1) return 'right1'
  if (diff === 2) return 'right2'
  if (diff < -2) return 'hide-left'
  if (diff > 2) return 'hide-right'
  return ''
}

function startAutoPlay() {
  if (intervalId.value) return
  intervalId.value = window.setInterval(() => {
    if (currentIndex.value < works.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }, 2000)
}
function stopAutoPlay() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}
onMounted(() => {
  startAutoPlay()
})
onUnmounted(() => {
  stopAutoPlay()
})
// 鼠标悬停暂停，移出继续
function handleMouseEnter() {
  stopAutoPlay()
}
function handleMouseLeave() {
  startAutoPlay()
}
</script>

<style lang="scss" scoped>
/* 关于我们页面的主容器样式 */
.show-container {
  margin-top: 20px;
  height: 700px;
  background-color: #fbe58e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  padding: 0 60px;
}
.work-showcase {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 0;
  min-width: 0;
  max-width: 50%;
  height: 500px;
  .arrow {
    position: absolute;
    top: 50%;
    z-index: 10;
    width: 40px;
    height: 60px;
    font-size: 2.5em;
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transform: translateY(-50%);
    &.left {
      left: -50px;
    }
    &.right {
      right: -50px;
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
  .work-list {
    position: relative;
    width: 700px;
    height: 500px;
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
        width: 450px;
        height: auto;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        background: #fff;
      }
      &.center {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        z-index: 5;
        cursor: default;
      }
      &.left1 {
        transform: translate(-20%, -50%) scale(0.8) rotateY(10deg);
        opacity: 0.8;
        z-index: 4;
      }
      &.left2 {
        transform: translate(-10%, -50%) scale(0.7) rotateY(20deg);
        opacity: 0.5;
        z-index: 3;
      }
      &.right1 {
        transform: translate(10%, -50%) scale(0.8) rotateY(-10deg);
        opacity: 0.8;
        z-index: 4;
      }
      &.right2 {
        transform: translate(20%, -50%) scale(0.7) rotateY(-20deg);
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
.work-desc {
  flex: 1 1 0;
  min-width: 0;
  max-width: 50%;
  margin-left: 40px;
  width: 320px;
  background: #fffbe0;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 32px 24px;
  h2 {
    margin: 0 0 16px 0;
    font-size: 1.5em;
    color: #333;
  }
  p {
    color: #666;
    font-size: 1.1em;
    line-height: 1.7;
  }
}
</style>
