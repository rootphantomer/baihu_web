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
      <li
        v-for="nav in navs"
        :key="nav.path"
        :class="{
          active: route.path == nav.path,
        }"
      >
        <RouterLink :to="nav.path">
          <p>{{ nav.label }}</p>
          <p class="none">{{ nav.en }}</p>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  height: 120px;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid black;

  * {
    letter-spacing: 2px;
  }

  #logo {
    height: 80px;
  }

  > a {
    margin-left: 100px;
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
    margin-right: 100px;

    li {
      list-style: none;
      &.active {
        border-bottom: 3px solid #fbe58e;
        color: white;
        background: #fbe58e;
      }

      a {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: inherit;

        p {
          margin: 12px 0 0 0;
        }
      }
    }
  }
}
</style>
