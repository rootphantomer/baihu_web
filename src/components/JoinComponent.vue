<template>
  <div id="join-container" class="join-container">
    <h1 class="join-title">招聘信息 <span>JOIN US</span></h1>
    <div class="job-positions">
      <div
        class="job-tab"
        v-for="(job, index) in jobs"
        :key="index"
        :class="{ active: index === activeJob }"
        @click="selectJob(index)"
      >
        {{ job.title }}
      </div>
    </div>
    <div class="job-details">
      <h2 class="job-title">
        招聘岗位：<span class="highlight">{{ jobs[activeJob].title }}</span>
      </h2>
      <div class="job-section">
        <h3>岗位职责</h3>
        <ul>
          <li v-for="(duty, index) in jobs[activeJob].duties" :key="index">{{ duty }}</li>
        </ul>
      </div>
      <div class="job-section">
        <h3>任职要求</h3>
        <ul>
          <li v-for="(requirement, index) in jobs[activeJob].requirements" :key="index">
            {{ requirement }}
          </li>
        </ul>
      </div>
      <br />
      <div>
        <p class="contact">
          请将个人简历和作品集投递至邮箱：<span class="email">baihu_animation@163.com</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const jobs = ref([
  {
    title: '原画师（一原）',
    duties: [
      '1. 根据分镜完成原画设计，包括角色动作、表情、特效等关键帧；',
      '2. 提出合理的作画提案，优化分镜表现力；',
      '3. 配合作画监督调整画面细节，确保符合日式动画制作标准；',
      '4. 参与部分中间帧修正与演出设计。',
    ],
    requirements: [
      '1. 二维动画业界从业者，熟悉日式二维动画制作流程，了解日式动画术语体系；',
      '2. 拥有1年及以上第一原画经验（或有3年以上第二原画经验），同时具有1年及以上第二原画经验，以及半年及以上动画中割经验or具备动画中割基本常识；',
      '3. 精通日式动画风格，熟悉从原画到动画的工业化流程；',
      '4. 有与团队成员（如制作进行、演出等）沟通协作的基础能力；',
    ],
  },
  {
    title: '作画监督',
    duties: [
      '1. 统筹动画全流程的作画质量，把控角色设计、动作节奏与画面风格统一性；',
      '2. 对Layout及原画进行正确的修正，协调团队解决技术难题。',
    ],
    requirements: [
      '1. 二维动画业界从业者，熟悉日式二维动画制作流程，了解日式动画术语体系；',
      '2. 有1年及以上作监经验，3年及以上原画经验，有半年及以上动画中割经验or具备动画中割基本常识；',
      '3.有与团队成员（如制作进行、演出、原画）沟通协作的基础能力；',
      '4.能够按照演出、监督的指示，依照设定对原画（包括背景）做出正确的修正；',
    ],
  },
  {
    title: '背景美术',
    duties: ['1. 根据layout原图进行高精度背景绘制；', '2.  有能力根据需求完成独立的美术设计;'],
    requirements: [
      '1. 二维动画业界从业者，熟悉日式二维动画制作流程，了解日式动画术语体系；',
      '2. 有良好美术基础与色彩控制力，对空间与空气透视理论明晰；',
      '3. 能够熟练使用手绘板进行数字绘制，熟悉PHOTOSHOP的绘画方式与操作流程;',
      '4. 有与团队成员（如制作进行、演出、原画）沟通协作的基础能力；',
      '5. 能够按照演出、监督的指示，依照设定对背景做出正确的修正；',
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
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;

  span {
    font-size: 50px;
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
    font-size: 30px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background: #ffa726;
      color: black;
    }
  }
}

.job-details {
  background: #fff;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .job-title {
    font-size: 40px;
    margin-bottom: 24px;

    .highlight {
      color: #ffa726;
      font-weight: bold;
    }
  }

  .job-section {
    margin-bottom: 24px;

    h3 {
      font-size: 30px;
      margin-bottom: 12px;
      color: #222;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        font-size: 25px;
        line-height: 1.8;
        color: #444;
      }
    }
  }

  .contact {
    font-size: 40px;
    color: #444;

    .email {
      color: #ffa726;
      font-weight: bold;
    }
  }
}
</style>
