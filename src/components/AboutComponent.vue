<template>
  <!-- 关于我们页面的主容器 -->

  <div id="about-container" class="about-container">
    <h1 class="about-title">关于白鹄 <span>ABOUT US</span></h1>
    <!-- 关于公司的介绍段落 -->
    <p class="about-description">
      专注于二次元/游戏/影视动画领域的深耕，致力于打造高质感并富有感染力的动画作品，以及宣传影视，并参与制作包括米社在内多部顶流动画
      PV 的制作。
      <br />
      公司团队由来自日升，草薙，MAPPA，JC_STAFF
      的资深动画从业者组成，提供开放创新的创作环境与国际化协作资源。
    </p>
    <br />
  </div>
</template>

<style lang="scss" scoped>
/* 关于我们页面的主容器样式 */
.about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fdfcf6;
}

.about-title {
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;

  span {
    font-size: 5rem;
    font-weight: normal;
    margin-left: 0.8rem;
  }
}

/* 关于公司描述的段落样式 */
.about-description {
  font-size: 2.4rem;
  color: #151515;
  color: #29293a;
  background: transparent;

  max-width: 80%;
  /* 限制段落宽度，提高可读性 */
  line-height: 1.6;
  /* 增加行高，提高可读性 */
  text-align: center;
  /* 文本居中显示 */
}
</style>
