<template>
  <!-- 移除初始的 loaded 类 -->
  <div class="preloader" :class="$attrs.class">
    <div class="preloader-logo">
      <img
        src="@/assets/favicon.png"
        alt=""
        width="auto"
        height="200"
        srcset="@/assets/favicon.png 2x"
      />
    </div>
    <div class="preloader-body">
      <div id="loadingProgressG">
        <div class="loadingProgressG" id="loadingProgressG_1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: 0.3s all ease;
  pointer-events: none;
  backface-visibility: hidden;
}

.preloader::before,
.preloader::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  transition: 0.2s linear;
  transform: translateY(0);
  pointer-events: none;
}

.preloader::before {
  top: 0;
  bottom: 50%;
  background: #fff;
}

.preloader::after {
  top: 50%;
  bottom: 0;
  background: #f5f6fa;
}

.preloader.loaded::before,
.preloader.loaded::after {
  transition: 0.4s linear;
}

.preloader.loaded::before {
  transform: translateY(-100%);
}

.preloader.loaded::after {
  transform: translateY(100%);
}

.preloader.loaded .preloader-logo,
.preloader.loaded .preloader-body {
  opacity: 0;
  visibility: hidden;
  transition: 0s;
}

.preloader-logo,
.preloader-body {
  transition: 0s 0.2s;
}

.preloader-logo {
  position: relative;
  z-index: 10;
  transform: translate3d(0, -50%, 0);
  padding: 40px;
}

.preloader-body {
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
}

#loadingProgressG {
  width: 100vw;
  height: 5px;
  overflow: hidden;
  background: #e8e9ee;
  border-radius: 6px;
  margin: auto;
}

.loadingProgressG {
  background: #af8855;
  margin-top: 0;
  margin-left: -100vw;
  animation-name: bounce_loadingProgressG;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: 100vw;
  height: 5px;
  transition: 0.5s;
}

@keyframes bounce_loadingProgressG {
  0% {
    margin-left: -100vw;
  }

  100% {
    margin-left: 100vw;
  }
}
</style>
