<template>
  <!-- 关于我们页面的主容器 -->
  <div class="show-container">
    <div class="work-showcase" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <button class="arrow left" @click="prevWork" style="background: transparent; box-shadow: none;"><img
          src="@/assets/left.svg" alt=""
          style="width: auto; height: 100%; object-fit: contain; display: block;" /></button>
      <div class="work-list">
        <div v-for="(work, idx) in works" :key="idx" class="work-item" :class="getPositionClass(idx)"
          @click="selectWork(idx)">
          <img :src="work.img" :alt="work.name" />
        </div>
      </div>
      <button class="arrow right" @click="nextWork" style="background: transparent; box-shadow: none;">
        <img src="@/assets/right.svg" alt="" style="width: auto; height: 100%; object-fit: contain; display: block;" />
      </button>
    </div>
    <div class="work-desc">
      <div class="up">
        <p class="title1">参与作品</p>
        <p class="title2">works</p>
        <div>
          <p class="work_name">{{ works[currentIndex].name }}</p>
        </div>
      </div>
      <div class="down">
        <!-- <p>Artist:{{ works[currentIndex].author }}</p> -->
        <p>{{ works[currentIndex].desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const works = [
  {
    img: '/img_index_work/地缚少年花子君.jpg',
    name: '地缚少年花子君',
    author: '罗丽',
    desc: '美术设定',
  },
  {
    img: '/img_index_work/反叛的鲁路修·夺还的罗赛.jpg',
    name: '反叛的鲁路修·夺还的罗赛',
    author: '周美辰',
    desc: '原画',
  },
  {
    img: '/img_index_work/进击的巨人 the final season .jpg',
    name: '进击的巨人 the final season',
    author: '罗丽',
    desc: '美术设定，背景制作',
  },
  {
    img: '/img_index_work/卡片决斗先导者G.jpg',
    name: '卡片决斗先导者G',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img_index_work/老虎和兔子2.jpg',
    name: '老虎和兔子2',
    author: '周美辰',
    desc: '第二原画， 动画检查',
  },
  {
    img: '/img_index_work/鲁邦三世 PART6.jpg',
    name: '鲁邦三世 PART6',
    author: '佟北南',
    desc: '背景美术制作',
  },
  {
    img: '/img_index_work/偶像大师-闪耀色彩.jpg',
    name: '偶像大师-闪耀色彩',
    author: '罗丽',
    desc: '美术设定',
  },
  {
    img: '/img_index_work/食戟之灵_神之皿.jpg',
    name: '食戟之灵 神之皿',
    author: '佟北南',
    desc: '背景美术制作',
  },
  {
    img: '/img_index_work/水星的魔女.jpg',
    name: '水星的魔女',
    author: '周美辰',
    desc: '原画',
  },
  {
    img: '/img_index_work/异世界自杀小队.jpg',
    name: '异世界自杀小队',
    author: '周美辰',
    desc: '原画，作画监督',
  },
  {
    img: '/img_index_work/游戏王VRAINS.jpg',
    name: '游戏王VRAINS',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img_index_work/SMILE光之美少女.webp',
    name: 'SMILE光之美少女',
    author: '周鸿能',
    desc: 'LAYOUT制作',
  },
  {
    img: '/img_index_work/とある科学の超電磁砲T.jpg',
    name: 'とある科学の超電磁砲T',
    author: '佟北南',
    desc: '背景美术制作',
  },
]
const currentIndex = ref(3)
const intervalId = ref<number | null>(null)

const selectWork = (idx: number) => {
  currentIndex.value = idx
}
const prevWork = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? works.length - 1 // 若当前是第一个，跳转到最后一个
      : currentIndex.value - 1
}
const nextWork = () => {
  currentIndex.value =
    currentIndex.value === works.length - 1
      ? 0 // 若当前是最后一个，跳转到第一个
      : currentIndex.value + 1
}

function getPositionClass(idx: number) {
  const total = works.length
  let diff = idx - currentIndex.value

  // 循环轮播的关键：让diff始终落在 [-2, -1, 0, 1, 2] 之间
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

function startAutoPlay() {
  if (intervalId.value) return
  intervalId.value = window.setInterval(() => {
    if (currentIndex.value < works.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }, 4000) // 每4秒切换一次
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
  margin-top: 2rem;
  // height: calc(100vh - 18rem);
  min-height: 80rem;
  background-color: #fbe58e;
  display: flex;
  justify-content: space-between;
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
  /* 占父容器宽度的 2/3 */
  max-width: 66.666%;

  /* 2/3 的精确值 */
  // height: 80%;
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

    &.left {
      left: -6rem;
    }

    &.right {
      right: 4rem;
    }

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
        transform: translate(-10%, -50%) scale(1.2);
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
  // max-height: 100%;
  flex: 1;
  /* 占父容器宽度的 1/3 */
  // min-width: 0rem;
  max-width: 33.333%;
  /* 1/3 的精确值 */
  margin-left: 4rem;
  width: 32rem;
  // background: #fffbe0;
  border-radius: 1.2rem;
  // box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.08);
  padding: 3.2rem 2.4rem;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;

  p {
    width: 100%;
    margin: 0 0 1.6rem 0;
    font-size: 5rem;
  }

  * {
    margin: 5rem 0 0 0;
  }

  .up {
    color: black;
    font-weight: bold;
    margin-bottom: 3.2rem;

    .title1 {
      font-size: 5rem;
      margin-bottom: 2rem;
    }

    .work_name {
      height: 15rem;
      font-size: 5rem;
    }

    .title2 {
      font-size: 2rem;
    }
  }

  .down {
    color: white;
    font-weight: bold;
  }
}



@media (max-width: 480px) {


  .work-list {
    max-width: 66.666%;
  }

  /* 隐藏其他所有元素 */
  .work-desc,
  button.arrow,
  .up,
  .down {
    display: none !important;
  }

}

@media (min-width: 481px) and (max-width: 768px) {


  .work-list {
    max-width: 66.666%;
  }

  /* 隐藏其他所有元素 */
  .work-desc,
  button.arrow,
  .up,
  .down {
    display: none !important;
  }

}

@media (min-width: 769px) and (max-width: 1024px) {

  .work-list {
    max-width: 66.666%;
  }

  /* 隐藏其他所有元素 */
  .work-desc,
  button.arrow,
  .up,
  .down {
    display: none !important;
  }
}
</style>
