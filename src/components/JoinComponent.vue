<template>
  <div id="join-container" class="join-container">
    <h1 class="join-title">{{ $t('join.title') }} <span>JOIN US</span></h1>
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
        {{ $t('join.job.title') }}<span class="highlight">{{ jobs[activeJob]?.title }}</span>
      </h2>
      <div class="job-section">
        <h3>{{ jobs[activeJob]?.dutiesLabel }}</h3>
        <ul>
          <li v-for="(duty, index) in jobs[activeJob]?.duties" :key="index">{{ duty }}</li>
        </ul>
      </div>
      <div class="job-section">
        <h3>{{ jobs[activeJob]?.requirementsLabel }}</h3>
        <ul>
          <li v-for="(requirement, index) in jobs[activeJob]?.requirements" :key="index">
            {{ requirement }}
          </li>
        </ul>
      </div>
      <br />
      <div>
        <p class="contact">
          {{ $t('join.contact') }}<span class="email">baihu_animation@163.com</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { locale } from '@/composables/useI18n'
import zhCN from '@/locales/zh-CN'
import jaJP from '@/locales/ja-JP'

// 每次 locale 变化时重新计算
const jobs = computed(() => {
  const messages = locale.value === 'ja-JP' ? jaJP : zhCN
  const positions = messages.join?.positions

  if (!positions) {
    return []
  }

  return [
    {
      title: positions.animator?.title || '',
      dutiesLabel: positions.animator?.duties || '',
      requirementsLabel: positions.animator?.requirements || '',
      duties: positions.animator?.items?.duties || [],
      requirements: positions.animator?.items?.requirements || [],
    },
    {
      title: positions.supervisor?.title || '',
      dutiesLabel: positions.supervisor?.duties || '',
      requirementsLabel: positions.supervisor?.requirements || '',
      duties: positions.supervisor?.items?.duties || [],
      requirements: positions.supervisor?.items?.requirements || [],
    },
    {
      title: positions.background?.title || '',
      dutiesLabel: positions.background?.duties || '',
      requirementsLabel: positions.background?.requirements || '',
      duties: positions.background?.items?.duties || [],
      requirements: positions.background?.items?.requirements || [],
    },
  ]
})

// 监听语言切换，重置到第一个岗位
watch(
  () => locale.value,
  () => {
    activeJob.value = 0
  }
)

const activeJob = ref(0)

const selectJob = (index: number) => {
  activeJob.value = index
}
</script>

<style lang="scss" scoped>
.join-container {
  padding: 0 20rem;
  background: #fdfcf6;
}

.join-title {
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;

  span {
    font-size: 5rem;
    font-weight: normal;
    margin-left: 0.8rem;
  }
}

.job-positions {
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  .job-tab {
    padding: 1.2rem 2.4rem;
    margin: 0 0.8rem;
    background: #fbe58e;
    color: #fff;
    font-size: 3rem;
    font-weight: bold;
    border-radius: 0.4rem;
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
  padding: 2.4rem 3.2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);

  .job-title {
    font-size: 4rem;
    margin-bottom: 2.4rem;

    .highlight {
      color: #ffa726;
      font-weight: bold;
    }
  }

  .job-section {
    margin-bottom: 2.4rem;

    h3 {
      font-size: 3rem;
      margin-bottom: 1.2rem;
      color: #222;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        font-size: 2.5rem;
        line-height: 1.8;
        color: #444;
      }
    }
  }

  .contact {
    font-size: 4rem;
    color: #444;

    .email {
      color: #ffa726;
      font-weight: bold;
    }
  }
}

/* mobile responsive styles */
@media (max-width: 768px) {
  .join-container {
    padding: 0 1rem;
  }

  .join-title {
    font-size: 5rem;
    margin-bottom: 2rem;

    span {
      // font-size: 5rem;
      font-weight: normal;
      margin-left: 0.8rem;
    }
  }

  .job-positions {
    margin-bottom: 2rem;
    gap: 0.8rem;

    .job-tab {
      padding: 0.8rem 1.2rem;
      margin: 0.4rem;
      font-size: 1.4rem;
    }
  }

  .job-details {
    padding: 1.2rem 1.6rem;
    border-radius: 0.4rem;

    .job-title {
      font-size: 1.8rem;
      margin-bottom: 1.2rem;
    }

    .job-section {
      margin-bottom: 1.2rem;

      h3 {
        font-size: 1.6rem;
        margin-bottom: 0.8rem;
      }

      ul {
        li {
          font-size: 1.4rem;
          line-height: 1.6;
        }
      }
    }

    .contact {
      font-size: 1.6rem;
    }
  }
}
</style>
