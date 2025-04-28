<template>
  <!-- 主内容区域，显示新闻页面 -->
  <div id="news-container">
    <h1>最新情报</h1>
    <!-- 这里可以添加新闻内容 -->
     <ArticleDetail />
  </div>
</template>
<script setup lang="ts">
import ArticleDetail from '@/components/ArticleDetail.vue'
</script>
<style lang="scss" scoped>
#news-container {
  padding: 0 22%;
  h1{
    margin-bottom: 46px;
  }
}
</style>
