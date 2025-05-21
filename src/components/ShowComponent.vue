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
          <img :src="work.img" :alt="work.name" />
        </div>
      </div>
      <button class="arrow right" @click="nextWork" :disabled="currentIndex === works.length - 1">
        &#9654;
      </button>
    </div>
    <div class="work-desc">
      <div class="white">
        <p class="title1">参与作品</p>
        <p class="title2">works</p>
        <p class="work_name">{{ works[currentIndex].name }}</p>
      </div>
      <div class="black">
        <p>Artist:{{ works[currentIndex].author }}</p>
        <p>{{ works[currentIndex].desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const works = [
  {
    img: '/img1/地缚少年花子君.png',
    name: '地缚少年花子君',
    author: '罗丽',
    desc: '美术设定',
  },
  {
    img: '/img1/反叛的鲁路修·夺还的罗赛.jpg',
    name: '反叛的鲁路修·夺还的罗赛',
    author: '周美辰',
    desc: '原画',
  },
  {
    img: '/img1/进击的巨人 the final season .jpg',
    name: '进击的巨人 the final season',
    author: '罗丽',
    desc: '美术设定，背景制作',
  },
  {
    img: '/img1/卡片决斗先导者G.png',
    name: '卡片决斗先导者G',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img1/老虎和兔子2.jpg',
    name: '老虎和兔子2',
    author: '周美辰',
    desc: '第二原画， 动画检查',
  },
  {
    img: '/img1/鲁邦三世 PART6.png',
    name: '鲁邦三世 PART6',
    author: '佟北南',
    desc: '背景美术制作',
  },
  {
    img: '/img1/偶像大师-闪耀色彩.jpg',
    name: '偶像大师-闪耀色彩',
    author: '罗丽',
    desc: '美术设定',
  },
  {
    img: '/img1/食戟之灵_神之皿.png',
    name: '食戟之灵 神之皿',
    author: '佟北南',
    desc: '背景美术制作',
  },
  {
    img: '/img1/水星的魔女.png',
    name: '水星的魔女',
    author: '周美辰',
    desc: '原画',
  },
  {
    img: '/img1/异世界自杀小队.png',
    name: '异世界自杀小队',
    author: '周美辰',
    desc: '原画，作画监督',
  },
  {
    img: '/img1/游戏王VRAINS.jpg',
    name: '游戏王VRAINS',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img1/SMILE光之美少女.webp',
    name: 'SMILE光之美少女',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img1/とある科学の超電磁砲T.png',
    name: 'とある科学の超電磁砲T',
    author: '佟北南',
    desc: '背景美术制作',
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
  }, 1500)
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
  margin-top: 10px;
  height: calc(100vh - 180px);
  background-color: #fbe58e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  padding: 0 60px;
  overflow: hidden;
}

.work-showcase {
  position: relative;
  display: flex;
  align-items: center;
  flex: 2; /* 占父容器宽度的 2/3 */
  min-width: 0;
  max-width: 66.666%; /* 2/3 的精确值 */
  // height: 80%;
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
      right: 50px;
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
        transform: translate(-10%, -50%) scale(1.3) ;
        opacity: 1;
        z-index: 5;
        cursor: default;
      }
      &.left1 {
        transform: translate(-50%, -50%) scale(0.8) rotateY(10deg);
        opacity: 0.8;
        z-index: 4;
      }
      &.left2 {
        transform: translate(-100%, -50%) scale(0.7) rotateY(20deg);
        opacity: 0.5;
        z-index: 3;
      }
      &.right1 {
        transform: translate(30%, -50%) scale(0.8) rotateY(-10deg);
        opacity: 0.8;
        z-index: 4;
      }
      &.right2 {
        transform: translate(80%, -50%) scale(0.7) rotateY(-20deg);
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
  display: flex;
  flex: 1; /* 占父容器宽度的 1/3 */
  min-width: 0;
  max-width: 33.333%; /* 1/3 的精确值 */
  margin-left: 40px;
  width: 320px;
  // background: #fffbe0;
  border-radius: 12px;
  // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 32px 24px;
  // justify-content: flex-start;
  flex-direction: column;
  text-align: center;
  p {
    width: 100%;
    margin: 0 0 16px 0;
    font-size: 1.5em;
    font-family: 'Courier New', Courier, monospace;
  }
  * {
    margin: 100px 0;
  }
  .white {
    color: white;
    font-weight: bold;
    margin-bottom: 32px;
    .title1{
      font-size: 3em;
      margin-bottom: 0.2em;
    }
    .work_name{
      font-size: 4em;
      margin-top:1em;
    }
    .title2 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
    }
  }
  .black{
    color: black;
    font-weight: bold;
    font-size: 2em;
  }

}
</style>
