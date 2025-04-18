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
  <div class="content">
    <RouterView />
  </div>
  <footer>
    1111
  </footer>
</template>

<style lang="scss" scoped>
$header: 20%;
$foot: 10%;

header {
  width: 100%;
  max-width: 100%;
  height: $header;
  padding-top: $header/5;
}

header div {
  height: 100%;
}

.left {
  display: inline;
  height: 100%;
}

.right {
  display: inline;
  height: 100%;
  float: right;
  padding-right: 5%;
}

header div a {
  color: red;
  margin: 0 20px;
  padding: 0 3em 0 0;

}

img {
  display: block;
}

footer {
  height: 10%;
  text-align: center;
}

.content {
  height: 70%;
}
</style>
