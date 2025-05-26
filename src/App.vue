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

@media (max-width: 800px) {
  html {
    font-size: 5vw;
    /* 移动端适配 */
  }
}
</style>
