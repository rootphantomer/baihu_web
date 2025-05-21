<template>
  <div class="server-container"><selection class="section section-lg text-center">
    <div class="container">
      <!-- <h1 class="font-condensed wow-outer">
        <span class="wow slideInUp" style="visibility: visible; animation-name: slideInUp"
          >我们的服务</span
        >
      </h1> -->
      <div class="row row-50">
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            style="visibility: visible; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-lamp"></div>
            <h4 class="font-condensed box-creative-title">
              <a>内部/外观设计 </a>
            </h4>
            <p>
              我们将室内和室外设计服务相结合，并经常将它们作为单一解决方案提供。它帮助我们加强创造真正独特的空间。
            </p>
          </article>
        </div>
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            data-wow-delay=".1s"
            style="visibility: visible; animation-delay: 0.1s; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-compass"></div>
            <h4 class="font-condensed box-creative-title">
              <a>前期设计 </a>
            </h4>
            <p>
              我们的前期设计解决方案包括分析和规划服务，帮助客户和建筑师共同完成即将到来的项目。
            </p>
          </article>
        </div>
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            data-wow-delay=".2s"
            style="visibility: visible; animation-delay: 0.2s; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-3d-rotate"></div>
            <h4 class="font-condensed box-creative-title">
              <a>3D 建模 </a>
            </h4>
            <p>我们提供全面的建筑工程服务，包括室内设计、总体规划、3D 建模、施工图和文档编制。</p>
          </article>
        </div>
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            style="visibility: visible; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-pencil3"></div>
            <h4 class="font-condensed box-creative-title">
              <a>建筑工程 </a>
            </h4>
            <p>我们为客户提供一系列建筑 3D 建模服务，以协助建筑项目的设计、规划和可视化阶段。</p>
          </article>
        </div>
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            data-wow-delay=".1s"
            style="visibility: visible; animation-delay: 0.1s; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-hammer-wrench"></div>
            <h4 class="font-condensed box-creative-title">
              <a>项目管理 </a>
            </h4>
            <p>项目管理是我们的团队计划和执行您的项目的过程。我们将使用最好的方法来开发它。</p>
          </article>
        </div>
        <div class="col-sm-6 col-lg-4 wow-outer">
          <!-- Box Creative-->
          <article
            class="box-creative wow slideInLeft"
            data-wow-delay=".2s"
            style="visibility: visible; animation-delay: 0.2s; animation-name: slideInLeft"
          >
            <div class="box-creative-icon linearicons-bubble-text"></div>
            <h4 class="font-condensed box-creative-title">
              <a>磋商</a>
            </h4>
            <p>
              我们的团队还提供有关所有建筑问题的咨询，即使您需要有关室内装修或外观设计任务的具体信息。
            </p>
          </article>
        </div>
      </div>
    </div>
  </selection></div>
</template>

<style lang="scss" scoped>
.server-container{
  height: 200px;
}
*{
  font-family: 'Courier New', Courier, monospace;
}
.section {
  display: block;
  unicode-bidi: isolate;
}

.text-center {
  text-align: center !important;
}

/* 合并媒体查询 */
@media (min-width: 1600px) {
  .section-lg {
    padding: 120px 0;
  }
}

@media (min-width: 1200px) {
  .section-lg {
    padding: 0; /* 补充可能遗漏的大尺寸样式 */
  }
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1200px;
  }
  h4,
  .heading-4 {
    font-size: 24px;
    line-height: 1.33333;
  }
}

.container {
  width: 100%;
  padding-right: var(--bs-gutter-x, 15px);
  padding-left: var(--bs-gutter-x, 15px);
  margin-right: auto;
  margin-left: auto;
}

/* 合并重复的 .wow-outer 样式 */
.wow-outer {
  position: relative;
  overflow: hidden;
  span {
    display: block;
  }
}

h1 {
  letter-spacing: 0;
  margin: 1em 0;
  color: #29293a;
  font-weight: 400;
  unicode-bidi: isolate;
}

.font-condensed {
  font-family: 'Courier New', Courier, monospace;
}

.wow {
  backface-visibility: hidden;
}

.row {
  --bs-gutter-x: 100px;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
  justify-content: center; /* 添加水平居中对齐 */

  > * {
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) / 2);
    padding-left: calc(var(--bs-gutter-x) / 2);
    margin-top: var(--bs-gutter-y);
  }
}

.row-50 {
  margin-bottom: -50px;

  > * {
    margin-bottom: 50px;
  }
}

.box-creative {
  max-width: 330px;
  margin: 0 auto;
  text-align: center;
  cursor: default;
}

h4 {
  letter-spacing: 0;
  margin-bottom: 0;
  color: #29293a;
}

h4 + p {
  margin-top: 16px;
}

p {
  margin: 1em 0;
  unicode-bidi: isolate;
}
</style>
