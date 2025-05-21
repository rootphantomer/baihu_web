<template>
  <div id="news-container" class="news-container">
    <h1 class="news-title">
      <span class="icon"></span>
      <span>新闻 NEWS</span>
    </h1>
    <div class="timeline">
      <div class="news-item" v-for="item in newsList" :key="item.date">
        <div class="timeline-dot"></div>
        <div class="news-content">
          <div class="news-header">
            <span class="info-tag">info</span>
            <span class="news-date">{{ item.date }}</span>
            <span class="news-main-title" v-html="item.title"></span>
          </div>
          <div class="news-body">
            <img v-if="item.img" :src="item.img" class="news-img" />
            <div class="news-desc" v-html="item.desc"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const newsList = [
  {
    date: '2025.05.15',
    title: '白鹭主页锐意制作中',
    img: '/img_index_work/news1.jpg', // 示例图片路径
    desc: '主页顶部条参与作品框区外观设计与新闻区设计进行',
  },
  {
    date: '2025.01.23',
    title: '祝！白鹭动画正式成立！',
    img: '/img_index_work/news2.jpg',
    desc: '成功入驻圆伦大厦，祝公司顺利开张',
  },
]
</script>

<style lang="scss" scoped>
.news-container {
  min-height: 700px;
  padding: 0 8vw;
  background: #fdfcf6;
}

.news-title {
  display: flex;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  margin: 40px 0 48px 0;
  color: #222;
  justify-content: center;

  .icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #fbe58e 60%, transparent 60%);
    border-radius: 6px;
    margin-right: 16px;
  }
}

.timeline {
  position: relative;
  margin-left: 40px;
  border-left: 3px solid #fbe58e;
  padding-left: 40px;
}

.news-item {
  position: relative;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid #fbe58e;

  &:last-child {
    border-bottom: none;
  }
}

.timeline-dot {
  position: absolute;
  left: -56px;
  top: 24px;
  width: 18px;
  height: 18px;
  background: #fff;
  border: 3px solid #fbe58e;
  border-radius: 50%;
  z-index: 1;
}

.news-content {
  margin-left: 0;
}

.news-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .info-tag {
    background: #fbe58e;
    color: #fff;
    font-size: 2rem;
    // font-family: 'Arial', sans-serif;
    padding: 4px 18px 4px 10px;
    border-radius: 2px;
    margin-right: 18px;
    font-weight: 300;
    letter-spacing: 1px;
    min-width: 60px;
    text-align: left;
    display: inline-block;
  }

  .news-date {
    font-size: 1.6rem;
    color: #222;
    margin-right: 24px;
    font-weight: 400;
  }

  .news-main-title {
    font-size: 2rem;
    font-weight: bold;
    color: #111;
    margin-right: 12px;
    letter-spacing: 1px;
  }
}

.news-body {
  display: flex;
  align-items: flex-start;
  margin-left: 80px;
  margin-top: 8px;

  .news-img {
    width: 180px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 32px;
    box-shadow: 0 2px 8px #0001;
  }

  .news-desc {
    font-size: 1.4rem;
    color: #444;
    margin-top: 12px;
    line-height: 1.8;
    font-weight: 400;
  }
}
</style>
