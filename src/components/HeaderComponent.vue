<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { path: '/',               label: () => t('header.home'),    en: 'Home'    },
  { path: '/work',           label: () => t('header.work'),    en: 'Work'    },
  { path: '/#news-container',    label: () => t('header.news'),    en: 'News'    },
  { path: '/#about-container',   label: () => t('header.about'),   en: 'About'   },
  { path: '/#contact-container', label: () => t('header.contact'), en: 'Contact' },
  { path: '/#join-container',    label: () => t('header.join'),    en: 'Join'    },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header>
    <RouterLink to="/" class="logo-link" @click="closeMenu">
      <img id="logo" src="@/assets/logo.png" alt="Company Logo" />
    </RouterLink>

    <!-- 汉堡按钮（仅移动端显示） -->
    <button
      class="hamburger"
      :class="{ open: menuOpen }"
      aria-label="导航菜单"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- 导航列表 -->
    <ul :class="{ 'menu-open': menuOpen }">
      <li
        v-for="nav in navItems"
        :key="nav.path"
        :class="{ active: route.path === nav.path }"
      >
        <RouterLink :to="nav.path" @click="closeMenu">
          <p>{{ nav.label() }}</p>
          <p class="en-label">{{ nav.en }}</p>
        </RouterLink>
      </li>
    </ul>

    <!-- 移动端遮罩 -->
    <div v-if="menuOpen" class="nav-overlay" @click="closeMenu"></div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  display: flex;
  height: 12rem;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-bottom: 0.1rem solid black;
  background: #fdfcf6;
  z-index: 100;

  * {
    letter-spacing: 0.2rem;
  }

  .logo-link {
    flex-shrink: 0;
    margin-left: 10rem;
  }

  #logo {
    height: 8rem;
    max-height: 8rem;
    display: block;
  }

  // 汉堡按钮 — 默认隐藏
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 0.7rem;
    padding: 0;
    flex-shrink: 0;
    margin-right: 4rem;
    z-index: 200;

    span {
      display: block;
      width: 3rem;
      height: 0.3rem;
      background: #222;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &.open span:nth-child(1) { transform: translateY(1rem) rotate(45deg); }
    &.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    &.open span:nth-child(3) { transform: translateY(-1rem) rotate(-45deg); }
  }

  ul {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    margin-right: 10rem;
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    &::before { content: '|'; }
    &::after  { content: '|'; }

    li {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 2rem;

      &.active {
        color: white;
        background: #f5dd82;

        a { color: #fff; }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1rem;
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
        justify-content: center;
        text-decoration: none;
        color: inherit;
        height: 100%;
      }

      p {
        margin: 1.2rem 0 0;
        font-size: 2rem;
      }

      .en-label {
        font-size: 1rem;
        margin: 0;
        padding: 0;
        line-height: 1.2;
        word-break: break-all;
      }
    }
  }
}

// 遮罩层
.nav-overlay {
  display: none;
}

// 平板：缩小间距
@media (max-width: 1024px) {
  header {
    height: 10rem;

    * { letter-spacing: 0.1rem; }

    .logo-link { margin-left: 3rem; }

    ul { margin-right: 3rem; }
  }
}

// 移动端：汉堡菜单
@media (max-width: 768px) {
  header {
    height: 8rem;
    padding: 0;

    .logo-link { margin-left: 2rem; }

    #logo { height: 5.5rem; }

    // 显示汉堡按钮
    .hamburger {
      display: flex;
      margin-right: 2rem;
    }

    // 导航变为抽屉式下拉
    ul {
      position: fixed;
      top: 8rem;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      background: #fdfcf6;
      border-bottom: 0.2rem solid #fbe58e;
      box-shadow: 0 0.4rem 1.2rem rgba(0,0,0,0.12);
      margin: 0;
      padding: 1rem 0;
      transform: translateY(-120%);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s ease, opacity 0.25s ease;
      z-index: 150;

      &::before,
      &::after { content: none; }

      &.menu-open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      li {
        height: auto;
        padding: 0;
        border-bottom: 0.1rem solid #f0eed8;

        &:last-child { border-bottom: none; }

        &.active {
          background: #f5dd82;

          &::after { display: none; }
        }

        a {
          flex-direction: row;
          justify-content: center;
          gap: 1rem;
          height: auto;
          padding: 1.6rem 2rem;
          width: 100%;
        }

        p {
          font-size: 2.2rem;
          margin: 0;
        }

        .en-label {
          font-size: 1.4rem;
          letter-spacing: 0.05rem;
        }
      }
    }
  }

  .nav-overlay {
    display: block;
    position: fixed;
    inset: 0;
    top: 8rem;
    background: rgba(0,0,0,0.3);
    z-index: 140;
  }
}
</style>
