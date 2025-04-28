<template>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div id = "home-container">
    <h1>This is the home page
    </h1>
  </div>
</template>
<style lang="scss" scoped>
#home-container {
  // 占满父容器的高度和宽度
  height: 100%;
  width: 100%;
  // 使用 flex 布局实现内容居中
  display: flex;
  justify-content: center;
  // 修改为靠近顶部对齐
  align-items: flex-start;
  // 可以添加 padding-top 微调位置
  padding-top: 15%;
}
</style>
