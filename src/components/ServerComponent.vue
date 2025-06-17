<template>
  <div class="server-container">
    <div class="server-row">
      <!-- 左列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>{{ $t('server.animation.title') }}</span>
        </div>
        <div class="server-desc">
          <p>
            {{ $t('server.animation.desc') }}</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="server-col">
          <div class="server-title">
            <span class="icon"></span>
            <span>{{ $t('server.preDesign.title') }}</span>
          </div>
          <div class="server-desc">
            <p>
              {{ $t('server.preDesign.desc') }} </p>
          </div>
        </div>
      </div>
      <!-- 右列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>{{ $t('server.coverage.title') }}</span>
        </div>
        <div class="server-desc">
          <p>{{ $t('server.coverage.items.movie') }}</p>
          <p>剧集动画（TV动画、网络番剧）</p>
          <p>广告PV（品牌宣传片、产品动画）</p>
          <br />
          <p>角色动画（Idle、Attack、Run等动作库）</p>
          <p>过场动画（Cinematic Cutscenes）</p>
          <br />
        </div>
        <div class="server-col">
          <div class="server-desc">
            <p>剧本与分镜（Storyboard & Scriptwriting）</p>
            <p>概念设计（角色/场景/道具原画）</p>
            <p>美术风格定调（Color Script & Mood Board）</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.server-container {
  width: 100%;
}

.server-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 6rem;
  gap: 8vw;
}

.server-col {
  width: 36vw;
  min-width: 34rem;
  max-width: 60rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.server-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 2.4rem;

  .icon {
    display: inline-block;
    width: 2.8rem;
    height: 2.8rem;
    background: linear-gradient(135deg, #fbe58e 60%, transparent 60%);
    border-radius: 0.6rem;
    margin-right: 1.6rem;
  }
}

.server-desc {
  font-size: 2rem;
  color: #444;
  line-height: 2.1;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin-bottom: 0;
  text-align: center;
}

@media (max-width: 90rem) {
  .server-row {
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
  }

  .server-col {
    width: 90vw;
    min-width: unset;
    max-width: unset;
  }
}
</style>
