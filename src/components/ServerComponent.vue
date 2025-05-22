<template>
  <div class="server-container">
    <div class="server-row">
      <!-- 左列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>动画制作服务</span>
        </div>
        <div class="server-desc">
          凭借核心团队在业界深耕多年的技术力专注优质2D动画制作，并拥有制作高质量游戏PV与产品推广动画的丰富经验。<br />
          从创意到成片，以精湛技艺打造极致内容，为您的IP与品牌注入超凡视觉魅力。
        </div>
      </div>
      <!-- 右列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>覆盖范围</span>
        </div>
        <div class="server-desc">
          动画电影（2D/3D 长篇或短片）<br />
          剧集动画（TV动画、网络番剧）<br />
          广告PV（品牌宣传片、产品动画）<br /><br />
          角色动画（Idle、Attack、Run等动作库）<br />
          过场动画（Cinematic Cutscenes）
        </div>
      </div>
    </div>
    <div class="server-row">
      <!-- 左列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>专业前期设计</span>
        </div>
        <div class="server-desc">
          创意赋能，设计领航。团队提供剧本分镜、角色场景设计、美术风格定制等全流程前期服务，用匠心打造独特视觉叙事，为您的项目奠定卓越基石。
        </div>
      </div>
      <!-- 右列 -->
      <div class="server-col">
        <div class="server-title">
          <span class="icon"></span>
          <span>剧本与美术</span>
        </div>
        <div class="server-desc">
          剧本与分镜（Storyboard & Scriptwriting）<br />
          概念设计（角色/场景/道具原画）<br />
          美术风格定调（Color Script & Mood Board）
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.server-container {
  background: #fdfcf6;
  padding: 40px 0 60px 0;
  width: 100%;
  // font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.server-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
  gap: 8vw;
}

.server-col {
  width: 36vw;
  min-width: 340px;
  max-width: 600px;
  text-align: center;
}

.server-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  font-weight: bold;
  margin-bottom: 24px;

  .icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #fbe58e 60%, transparent 60%);
    border-radius: 6px;
    margin-right: 16px;
  }
}

.server-desc {
  // font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  color: #444;
  line-height: 2.1;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 0;
  text-align: center;
}

@media (max-width: 900px) {
  .server-row {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .server-col {
    width: 90vw;
    min-width: unset;
    max-width: unset;
  }
}
</style>
