<script setup lang="ts">
import { ref } from 'vue'
import {  RouterLink} from 'vue-router'

const articles = ref([
  { id: 1, title: '第一篇文章' },
  { id: 2, title: '第二篇文章' },
  { id: 3, title: '第三篇文章' },
])
</script>

<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <RouterLink :to="`/article/${article.id}`">{{ article.title }}</RouterLink>
      </li>
      <!-- 可以添加更多新闻项 -->
    </ul>

  </div>
</template>


<style lang="scss" scoped>
ul {
  margin: 0 20px;
  li{
    margin-bottom: 50px;
  }
}
</style>
