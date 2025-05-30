<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const navs = [
  { path: '/', label: '首页', en: 'Home' },
  { path: '/work', label: '作品', en: 'Work' },
  // 修改为带斜杠的路径格式
  { path: '/#news-container', label: '新闻', en: 'News' },
  { path: '/#about-container', label: '关于', en: 'About' },
  { path: '/#contact-container', label: '联系', en: 'Contact' },
  { path: '/#join-container', label: '招聘', en: 'Join' },
]
const route = useRoute()
</script>

<template>
  <header>
    <RouterLink to="/">
      <img id="logo" src="@/assets/logo.png" alt="Company Logo" />
    </RouterLink>
    <ul>
      <li v-for="nav in navs" :key="nav.path" :class="{
        active: route.path == nav.path,
      }">
        <RouterLink :to="nav.path">
          <p>{{ nav.label }}</p>
          <p class="none">{{ nav.en }}</p>
          <div></div>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  height: 12rem;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-bottom: 0.1rem solid black;

  * {
    letter-spacing: 0.2rem;
  }

  #logo {
    height: 8rem;
    max-height: 8rem;
  }

  >a {
    margin-left: 10rem;
  }

  ul::before {
    content: '|';
  }

  ul::after {
    content: '|';
  }

  ul {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    margin-right: 10rem;

    li {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 2rem;

      &.active {
        color: white;
        background: #f5dd82;


        a {
          color: #fff;
        }

        // 橙色底部线
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1rem; // 让橙色线紧贴黑色主线
          width: 100%;
          height: 1rem;
          background: #ffb13b;
          z-index: 2;
        }

      }

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: inherit;
        height: 100%;
        justify-content: center;
      }

      p {
        margin: 1.2rem 0 0 0;
        font-size: 2rem;

        &.none {
          font-size: 1rem;
          // color: #999;
        }
      }

    }
  }
}

@media (max-width: 768px) {

  header {
    height: 10rem;
    justify-content: center;
    * {
      letter-spacing: 0.1rem;
    }

    ul{
      margin-left: 6rem;
    }
  }
}
</style>
