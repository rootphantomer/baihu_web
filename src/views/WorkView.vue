<template>
  <div id="work-container" class="work-container">
    <!-- 标题 -->
    <h2 class="work-title">参与作品一览 TIME LINE</h2>
    <!-- 时间轴 -->
    <div class="work-timeline">
      <h3>2020年-</h3>
    </div>
    <!-- 作品网格 -->
    <div class="work-grid">
      <div v-for="(work, index) in works" :key="index" class="work-item">
        <img :src="work.image" :alt="work.title" />
        <p class="work-title">{{ work.title }}</p>
        <p class="work-role">{{ work.role }}</p>
      </div>
    </div>
    <!-- 左右箭头 -->
    <div class="arrow left-arrow">◀</div>
    <div class="arrow right-arrow">▶</div>
  </div>
</template>

<script setup lang="ts">
const works = [
  { image: 'path/to/image1.jpg', title: '地缚少年花子君', role: '美术设定' },
  { image: 'path/to/image2.jpg', title: '盾之勇者成名录', role: 'Layout' },
  { image: 'path/to/image3.jpg', title: '失格纹的最强贤者', role: '背景美术' },
  { image: 'path/to/image4.jpg', title: '药屋的ひとりごと', role: 'LO,原画' },
  { image: 'path/to/image5.jpg', title: '异世界自杀小队', role: '作画监督,原画' },
  { image: 'path/to/image6.jpg', title: '筋肉マン', role: 'LO,原画' },
  { image: 'path/to/image7.jpg', title: 'ダンまち', role: '背景美术' },
  { image: 'path/to/image8.jpg', title: '失格纹的最强贤者', role: '背景美术' },
  { image: 'path/to/image9.jpg', title: 'バディファイトX', role: 'LO,原画' },
  { image: 'path/to/image10.jpg', title: 'ブラッククローバー', role: '原画' },
]
</script>

<style scoped>
/* 容器样式 */
.work-container {
  height: calc(100vh - 225px);
  min-height: 740px;
  text-align: center;
  padding: 20px;
  background-color: #fdfbf5;
}

/* 标题样式 */
.work-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

/* 时间轴样式 */
.work-timeline {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #666;
}

/* 作品网格样式 */
.work-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
}

/* 单个作品样式 */
.work-item {
  text-align: center;
}

.work-item img {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.work-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.work-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
}

.work-role {
  font-size: 14px;
  color: #666;
}

/* 箭头样式 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>
