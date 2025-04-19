<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <div class="left">
        <RouterLink to="/"><img id="logo" src="@/assets/logo.png" alt="Company Logo" /></RouterLink>
      </div>
      <div class="right">
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/news">新闻</RouterLink>
        <RouterLink to="/book">作品</RouterLink>
        <RouterLink to="/contact">联系</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </div>
    </div>
  </header>
  <RouterView class="content" />
  <footer>1111</footer>
</template>

<style lang="scss" scoped>
header {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 20%;
  padding-top: 40px;
}

header div {
  height: 100%;
}

header div {
  display: inline-flex;
  width: 100%;
  height: 100%;
}

.left {
  display: inline;
  width: 100%;
  height: 100%;
  padding-left: calc(5% + 50px);
}

.right {
  display: inline-flex;
  height: 100%;
  float: right;
  padding-right: 5%;
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
}

header div a {
  color: black;
  margin: 0 20px;
  padding: 0 3em 0 0;
}

a:hover {
  color: rgb(90, 34, 139);
  transform: scale(1.2, 1.2);
}

img {
  width: auto;
  height: 50%;
}

footer {
  box-sizing: border-box;
  height: 10%;
  text-align: center;
}

.content {
  display: grid;
  height: calc(100% - 20% - 10%);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  text-align: center;
}
</style>
