<template>
  <!-- 主内容区域，显示新闻页面 -->
  <div id="news-container">
    <h1>最新情报</h1>

    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import type { TimelineItemProps } from 'element-plus'

interface ActivityType extends Partial<TimelineItemProps> {
  content: string
}

const activities: ActivityType[] = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: '公司成立',
    timestamp: '2025-03-01',
  },
]
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 100px;
  }
}
</style>
