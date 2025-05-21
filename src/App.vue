<template>
  <!-- 通过 :class 动态控制 loaded 类 -->
  <!-- <PreloadComponents :class="{ loaded: isLoaded }" /> -->
  <div>
    <!-- <CursorComponents /> -->
    <HeaderComponent />
    <RouterView />
    <!-- 将 footer 移到 app-container 内部 -->
    <!-- <FooterComponent /> -->
  </div>
</template>
