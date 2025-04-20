<template>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div>
    <!-- 显示文本内容 -->
    <span>123123</span>
  </div>
</template>
<style lang="scss" scoped>
div {
  // 占满父容器的高度和宽度
  height: 100%;
  width: 100%;
  // 使用 flex 布局实现内容居中
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
