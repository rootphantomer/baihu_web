<template>
  <div id="join-container" class="join-container">
    <h1 class="join-title">{{ $t('join.title') }} <span>JOIN US</span></h1>
    <div class="job-positions">
      <div class="job-tab" v-for="(job, index) in jobs" :key="index" :class="{ active: index === activeJob }"
        @click="selectJob(index)">
        {{ job.title }}
      </div>
    </div>
    <div class="job-details">
      <h2 class="job-title">
        {{ $t('join.job.title') }}<span class="highlight">{{ jobs[activeJob].title }}</span>
      </h2>
      <div class="job-section">
        <h3>{{ $t('join.duties') }}</h3>
        <ul>
          <li v-for="(duty, index) in jobs[activeJob].duties" :key="index">{{ duty }}</li>
        </ul>
      </div>
      <div class="job-section">
        <h3>{{ $t('join.requirements') }}</h3>
        <ul>
          <li v-for="(requirement, index) in jobs[activeJob].requirements" :key="index">
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const jobs = ref([
  {
    title: t('join.positions.animator.title'),
    duties: [
      t('join.positions.animator.duties.0'),
      t('join.positions.animator.duties.1'),
      t('join.positions.animator.duties.2'),
      t('join.positions.animator.duties.3'),
    ],
    requirements: [
      t('join.positions.animator.requirements.0'),
      t('join.positions.animator.requirements.1'),
      t('join.positions.animator.requirements.2'),
      t('join.positions.animator.requirements.3'),
    ],
  },
  {
    title: t('join.positions.supervisor.title'),
    duties: [t('join.positions.supervisor.duties.0'), t('join.positions.supervisor.duties.1')],
    requirements: [
      t('join.positions.supervisor.requirements.0'),
      t('join.positions.supervisor.requirements.1'),
      t('join.positions.supervisor.requirements.2'),
      t('join.positions.supervisor.requirements.3'),
    ],
  },
  {
    title: t('join.positions.background.title'),
    duties: [t('join.positions.background.duties.0'), t('join.positions.background.duties.1')],
    requirements: [
      t('join.positions.background.requirements.0'),
      t('join.positions.background.requirements.1'),
      t('join.positions.background.requirements.2'),
      t('join.positions.background.requirements.3'),
      t('join.positions.background.requirements.4'),
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
</style>
