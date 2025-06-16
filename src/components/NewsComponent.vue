<template>
  <div id="news-container" class="news-container">
    <h1 class="news-title">
      <span class="icon">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
      新闻 <span>NEWS</span>
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
            <img v-if="item.img" v-lazy="item.img" class="news-img" />
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
    title: '白鹄主页锐意制作中',
    img: 'https://photos.ph4nt0mer.xyz/img_news/1747989770390.jpg', // 示例图片路径
    desc: '主页顶部条参与作品框区外观设计与新闻区设计进行',
  },
  {
    date: '2025.01.23',
    title: '祝！白鹄动画正式成立！',
    img: 'https://photos.ph4nt0mer.xyz/img_news/71b545bde9231126abb4bfe5b5f2c16.jpg',
    desc: '成功入驻圆伦大厦，祝公司顺利开张',
  },
]
</script>

<style lang="scss" scoped>
.news-container {
  padding: 0 8vw;
  background: #fdfcf6;
}

.news-title {
  display: flex;
  align-items: center;
  font-size: 5rem;
  font-weight: bold;
  margin: 4rem 0;
  padding-top: 2rem;
  color: #222;
  justify-content: center;
  span {
    font-size: 5rem;
    font-weight: normal;
    margin-left: 0.8rem;
  }

  .icon {
    display: grid;
    grid-template-columns: repeat(2, 1.5rem);
    grid-template-rows: repeat(2, 1.5rem);
    gap: 0.4rem;
    /* 方块之间的间距 */
    width: 5rem;
    /* 图标总宽度 */
    height: auto;
    /* 图标总高度 */

    div {
      width: 1.2rem;
      height: 1.2rem;
      background-color: #000;
      /* 默认黑色 */
    }

    div:nth-child(4) {
      background-color: #fbe58e;
      /* 右下角为黄色 */
    }
  }
}

.timeline {
  position: relative;
  margin-left: 4rem;
  // border-left: 0.3rem solid #fbe58e;
  padding-left: 4rem;
}

.news-item {
  position: relative;
  margin-bottom: 4.8rem;
  padding-bottom: 3.2rem;

  // border-bottom: 0.2rem solid #fbe58e;
  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: -4.6rem; // 与timeline-dot中心对齐
    top: 3.3rem; // timeline-dot底部
    width: 0.3rem;
    height: calc(100% + 4rem); // 从dot底部到下一个dot顶部
    background: #fbe58e;
    z-index: 0;
  }

  border-bottom: none;
}

.timeline-dot {
  position: absolute;
  left: -5.6rem;
  /* 与timeline的padding-left对齐 */
  top: 2.4rem;
  /* 从顶部开始 */
  width: 1.8rem;
  height: 1.8rem;
  background: #fff;
  border: 0.3rem solid #fbe58e;
  border-radius: 50%;
  z-index: 1;
}

.news-content {
  margin-left: 0;
}

.news-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;

  .info-tag {
    background: #fbe58e;
    color: #ffffff;
    font-size: 4rem;
    padding: 0.4rem 1.8rem 0.4rem 1rem;
    border-radius: 0.2rem;
    margin-right: 1.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    min-width: 6rem;
    text-align: left;
    display: inline-block;
  }

  .news-date {
    font-size: 4rem;
    color: #222;
    margin-right: 2.4rem;
    font-weight: 400;
  }

  .news-main-title {
    font-size: 4rem;
    font-weight: bold;
    color: #111;
    margin-right: 1.2rem;
    letter-spacing: 0.1rem;
  }
}

.news-body {
  display: flex;
  align-items: flex-start;
  margin-left: 8rem;
  margin-top: 0.8rem;
  border-bottom: 0.4rem solid #fbe58e;
  padding-bottom: 2.4rem;

  .news-img {
    width: 18rem;
    height: 18rem;
    object-fit: cover;
    border-radius: 0.4rem;
    margin-right: 3.2rem;
    box-shadow: 0 0.2rem 0.8rem #0001;
  }

  .news-desc {
    font-size: 4rem;
    color: #444;
    margin-top: 5rem;
    line-height: 1.8;
    font-weight: 400;
  }
}
</style>
