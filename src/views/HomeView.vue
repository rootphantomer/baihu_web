<template>
  <title>{{ $t('index.title') }}</title>
  <noscript>
    <strong>{{ $t('index.noscript') }}</strong>
  </noscript>
  <!-- 主容器，用于将内部内容居中显示 -->
  <div id="home-container">
    <ShowComponent />
    <NewsComponent />
    <AboutComponent />
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

<style lang="scss" scoped>
#home-container {
  background: #fdfcf6;
  display: flex;
  flex-direction: column;
  gap: 5rem; // 每个组件之间固定间距4rem，可根据需要调整
  padding: 2rem 0; // 每个组件的上下内边距

}
</style>
