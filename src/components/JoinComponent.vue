<template>
  <div id="join-container" class="join-container">
    <h1 class="join-title">
      招聘信息 <span>JOIN US</span>
    </h1>
    <div class="job-positions">
      <div class="job-tab" v-for="(job, index) in jobs" :key="index" :class="{ active: index === activeJob }"
        @click="selectJob(index)">
        {{ job.title }}
      </div>
    </div>
    <div class="job-details">
      <h2 class="job-title">招聘岗位：<span class="highlight">{{ jobs[activeJob].title }}</span></h2>
      <div class="job-section">
        <h3>岗位职责</h3>
        <ul>
          <li v-for="(duty, index) in jobs[activeJob].duties" :key="index">{{ duty }}</li>
        </ul>
      </div>
      <div class="job-section">
        <h3>任职要求</h3>
        <ul>
          <li v-for="(requirement, index) in jobs[activeJob].requirements" :key="index">{{ requirement }}</li>
        </ul>
      </div>
      <p class="contact">请将个人简历和作品集投递至邮箱：<span class="email">baihu_animation@163.com</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const jobs = ref([
  {
    title: '原画师（一原）',
    duties: [
      '统筹动画全流程的作画质量，把控角色设计、动作节奏与画面风格统一性；',
      '对Layout及原画进行正确的修正，协调团队解决技术难题。',
    ],
    requirements: [
      '二维动画业界从业者，熟悉日式二维动画制作流程，了解日式动画术语体系；',
      '有1年及以上作监经验，3年及以上原画经验，有半年及以上动画中割经验or具备动画中割基本常识；',
      '有与团队成员（如制作进行、演出、原画）沟通协作的基础能力；',
      '能够按照演出、监督的指示，依照设定对原画（包括背景）做出正确的修正。',
    ],
  },
  {
    title: '作画监督',
    duties: [
      '负责监督动画作画质量，确保整体风格一致；',
      '指导团队成员完成高质量的作画任务。',
    ],
    requirements: [
      '有丰富的作画监督经验，熟悉动画制作流程；',
      '具备优秀的沟通能力和团队协作能力。',
    ],
  },
  {
    title: '背景美术',
    duties: [
      '负责动画背景的设计与绘制；',
      '确保背景与角色、场景的整体风格一致。',
    ],
    requirements: [
      '有背景美术相关经验，熟悉动画背景绘制流程；',
      '具备良好的美术功底和色彩感知能力。',
    ],
  },
])

const activeJob = ref(0)

const selectJob = (index: number) => {
  activeJob.value = index
}
</script>

<style lang="scss" scoped>
.join-container {
  padding: 40px 8vw;
  background: #fdfcf6;
  // font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.join-title {
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;

  span {
    font-size: 2rem;
    font-weight: normal;
    margin-left: 8px;
  }
}

.job-positions {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  .job-tab {
    padding: 12px 24px;
    margin: 0 8px;
    background: #fbe58e;
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background: #ffa726;
    }
  }
}

.job-details {
  min-height: 534px;
  background: #fff;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .job-title {
    font-size: 2rem;
    margin-bottom: 24px;

    .highlight {
      color: #ffa726;
      font-weight: bold;
    }
  }

  .job-section {
    margin-bottom: 24px;
    min-height: 212px;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 12px;
      color: #222;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        font-size: 1.4rem;
        line-height: 1.8;
        color: #444;
      }
    }
  }

  .contact {
    font-size: 1.4rem;
    color: #444;

    .email {
      color: #ffa726;
      font-weight: bold;
    }
  }
}
</style>
