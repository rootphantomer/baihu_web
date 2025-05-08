<template>
  <!-- 关于我们页面的主容器 -->
  <div class="about-container">
    <!-- 关于公司的介绍段落 -->
    <p class="about-description">
      <span>杭州白鹄动画有限公司</span>
      <br />
      <br />
      专注于二次元/游戏/影视动画领域的深耕，致力于打造高质感并富有感染力的动画作品，以及宣传影视，并参与制作包括米社在内多部顶流动画
      PV 的制作。 公司团队由来自日升，草薙，MAPPA，JC_STAFF
      的资深动画从业者组成，提供开放创新的创作环境与国际化协作资源。
    </p>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加关于页面的逻辑，如果目前没有，可保持为空
</script>

<style lang="scss" scoped>
/* 关于我们页面的主容器样式 */
.about-container {
  // background-color: #74757f;
  height: calc(100vh - 140px);
  // background-color: bisque;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 关于公司描述的段落样式 */
.about-description {
  font-size: 24px;
  color: #151515;
  span {
    font-size: 40px;
    font-weight: bold;
    color: #29293a;
    background: transparent;
    font-family:
      Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      '微软雅黑', Arial, sans-serif;
  }

  max-width: 80%;
  /* 限制段落宽度，提高可读性 */
  line-height: 1.6;
  /* 增加行高，提高可读性 */
  text-align: center;
  /* 文本居中显示 */
}
</style>
