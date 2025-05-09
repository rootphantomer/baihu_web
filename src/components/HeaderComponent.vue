<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- 页面头部导航 -->
  <header>
    <!-- 主页路由链接，包含公司 logo -->
    <RouterLink to="/"><img id="logo" src="@/assets/logo.png" alt="Company Logo" /></RouterLink>
    <!-- 导航菜单列表 -->
    <!-- <ul>
      <li>
        <RouterLink to="/">
          <p>主页</p>
          <p class="none">home</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/news">
          <p>新闻</p>
          <p class="none">news</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/book">
          <p>作品</p>
          <p class="none">books</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">
          <p>联系</p>
          <p class="none">contact</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/about">
          <p>关于</p>
          <p class="none">about</p>
        </RouterLink>
      </li>
    </ul> -->
  </header>
</template>

<style lang="scss" scoped>
// 头部导航样式
header {
  display: flex;
  height: 140px;
  width: 100%;
  justify-content: space-between;
  font-weight: bold;
  // 统一设置头部内所有元素的字体和字母间距
  * {
    letter-spacing: 2px;
  }

  // 导航链接样式
  a {
    width: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  // 导航菜单列表样式
  ul {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    // 菜单项内的链接样式
    a {
      width: auto;
      display: inline-block;

      // 默认隐藏英文菜单项
      .none {
        display: none;
      }
    }

    // 鼠标悬停时显示英文菜单项
    a:hover {
      .none {
        display: block;
      }
    }
  }
}

// 公司 logo 样式
#logo {
  width: auto;
  height: 60%;
}

/* 移动端媒体查询 */
@media (max-width: 768px) {
  header {
    height: auto;
    flex-direction: column;
    align-items: center;
  }

  header ul {
    width: 100%;
    flex-direction: column;
  }

  header ul li {
    margin: 10px 0;
  }
}
</style>
