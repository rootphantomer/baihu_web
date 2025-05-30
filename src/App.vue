<template>
  <!-- 通过 :class 动态控制 loaded 类 -->
  <!-- <PreloadComponents :class="{ loaded: isLoaded }" /> -->
  <div>
    <!-- <CursorComponents /> -->
    <HeaderComponent />
    <RouterView />
    <!-- 将 footer 移到 app-container 内部 -->
    <FooterComponent />
  </div>
</template>

<style lang="scss">
html {
  font-size: calc(100vw / 192);
  /* 设计稿宽度1920px时，1rem=10px */
}

@media (max-width: 480px) {
  html {
    font-size: 5px;
    /* 移动端适配：小屏手机 */
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  html {
    font-size: 7px;
    /* 平板竖屏或大屏手机 */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  html {
    font-size: 8.5px;
    /* 平板横屏 */
  }
}
</style>
