<template>
  <!-- 主内容区域，显示新闻页面 -->
  <h1>最新情报</h1>
  <div id="news-container">
    <!-- 这里可以添加新闻内容 -->
    <!-- <ArticleDetail /> -->
  </div>
</template>
<script setup lang="ts">
// import ArticleDetail from '@/components/ArticleDetail.vue'
</script>
<style lang="scss" scoped>
h1 {
  font-size: 40px;
  font-weight: bold;
  color: #29293a;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
#news-container {
  height: calc(100vh - 140px);
  padding: 0 22%;
  h1 {
    margin-bottom: 46px;
  }
}
</style>
