<template>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div id="home-container">
    <AboutView />
    <BookView />
    <ServerView />
    <NewsView />
    <ContactView />
  </div>
</template>

<script setup lang="ts">
import AboutView from './AboutView.vue'
import BookView from './BookView.vue'
import ServerView from './ServerView.vue'
import NewsView from './NewsView.vue'
import ContactView from './ContactView.vue'
</script>
