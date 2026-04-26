/**
 * @file 环形轮播 composable，提供自动播放、手动切换、触摸滑动支持
 */
import { ref, onMounted, onUnmounted } from 'vue'

/** 轮播间隔时间（毫秒） */
const AUTO_PLAY_INTERVAL = 4000

/** 触发滑动切换的最小位移距离（px） */
const SWIPE_THRESHOLD = 50

/**
 * 环形轮播 composable
 *
 * 提供自动播放、暂停、手动切换、touch 滑动支持。
 * 在组件挂载时自动开始播放，卸载时自动清理定时器。
 */
export function useCarousel(total: number, initialIndex = 0) {
  const currentIndex = ref(initialIndex)
  const intervalId = ref<number | null>(null)
  const touchStartX = ref(0)

  // ── 索引计算 ──────────────────────────────────────────────

  const prevIndex = () =>
    (currentIndex.value = currentIndex.value === 0 ? total - 1 : currentIndex.value - 1)

  const nextIndex = () =>
    (currentIndex.value = currentIndex.value === total - 1 ? 0 : currentIndex.value + 1)

  const selectIndex = (idx: number) => {
    currentIndex.value = idx
  }

  /**
   * 根据当前激活索引计算某个卡片的位置类名。
   * diff 为相对当前中心的偏移，处理环形边界。
   */
  function getPositionClass(idx: number): string {
    let diff = idx - currentIndex.value
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) return 'center'
    if (diff === -1) return 'left1'
    if (diff === -2) return 'left2'
    if (diff === 1) return 'right1'
    if (diff === 2) return 'right2'
    return diff < 0 ? 'hide-left' : 'hide-right'
  }

  // ── 自动播放 ──────────────────────────────────────────────

  function startAutoPlay() {
    if (intervalId.value !== null) return
    intervalId.value = window.setInterval(nextIndex, AUTO_PLAY_INTERVAL)
  }

  function stopAutoPlay() {
    if (intervalId.value === null) return
    clearInterval(intervalId.value)
    intervalId.value = null
  }

  // ── Touch 滑动处理 ────────────────────────────────────────

  function handleTouchStart(e: TouchEvent) {
    touchStartX.value = e.changedTouches[0].clientX
    stopAutoPlay()
  }

  function handleTouchEnd(e: TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.value
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      deltaX < 0 ? nextIndex() : prevIndex()
    }
    startAutoPlay()
  }

  onMounted(startAutoPlay)
  onUnmounted(stopAutoPlay)

  return {
    currentIndex,
    selectIndex,
    prevIndex,
    nextIndex,
    getPositionClass,
    /** 鼠标悬停暂停自动播放 */
    handleMouseEnter: stopAutoPlay,
    /** 鼠标离开恢复自动播放 */
    handleMouseLeave: startAutoPlay,
    handleTouchStart,
    handleTouchEnd,
  }
}
