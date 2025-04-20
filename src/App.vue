<script setup lang="ts">
// 从 vue-router 导入路由链接和路由视图组件
import { RouterLink, RouterView } from 'vue-router'
// 导入自定义光标组件
import CursorComponents from './components/CursorComponents.vue'

// 获取当前年份
const year = new Date().getFullYear()
</script>

<template>
  <!-- 渲染自定义光标组件 -->
  <CursorComponents />
  <!-- 页面头部导航 -->
  <header>
    <!-- 主页路由链接，包含公司 logo -->
    <RouterLink to="/"><img id="logo" src="@/assets/logo.png" alt="Company Logo" /></RouterLink>
    <!-- 导航菜单列表 -->
    <ul>
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
    </ul>
  </header>
  <!-- 主内容区域 -->
  <main class="singlebody">
    <!-- 渲染路由视图 -->
    <RouterView />
  </main>
  <!-- 页面底部 -->
  <footer>
    <!-- 底部内容容器，使用表格布局 -->
    <div class="table">
      <div class="td">
        <!-- 版权信息 -->
        <address>Power By 杭州白鹄动画有限公司 @ {{ year }}</address>
      </div>
      <div class="td">
        <ul>
          <li>
            <!-- 路由链接，包含社交图标 -->
            <RouterLink to="/"><img src="@/assets/sns/icon_sns_white_15.png" alt=""></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
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
    font-family: 'AlibabaPuhuiTi';
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

// 主内容区域样式
.singlebody {
  height: calc(100% - 140px);
  max-height: 100%;
}

// 页面底部样式
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;

  // 统一设置底部内所有元素的文字颜色为白色
  * {
    color: white;
  }

  // 底部内容容器样式
  .table {
    display: table;
    margin: 0;
    width: 100%;
    height: 50px;
    padding: 0 60px;
    box-sizing: border-box;

    // 版权信息样式
    address {
      font-size: 15px;
    }

    // 表格单元格样式
    .td {
      vertical-align: middle;
      display: table-cell;
    }

    // 社交图标样式
    img {
      width: 23px;
      height: auto;
    }
  }
}
</style>
