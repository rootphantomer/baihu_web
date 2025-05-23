<template>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div id="home-container">
    <ShowComponent />
    <NewsComponent />
    <AboutComponent />
    <!-- <BookView /> -->
    <ServerComponent />
    <PhotoComponent />
    <ContactComponent />
    <JoinComponent />
  </div>
</template>

<script setup lang="ts">
import AboutComponent from '@/components/AboutComponent.vue'
import ServerComponent from '@/components/ServerComponent.vue'
import NewsComponent from '@/components/NewsComponent.vue'
import ContactComponent from '@/components/ContactComponent.vue'
import ShowComponent from '@/components/ShowComponent.vue'
import JoinComponent from '@/components/JoinComponent.vue'
import PhotoComponent from '@/components/PhotoComponent.vue'
</script>
