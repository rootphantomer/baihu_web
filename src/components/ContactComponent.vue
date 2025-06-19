<template>
  <!-- 联系我们页面的主容器 -->
  <div id="contact-container" class="contact-container">
    <!-- 页面标题 -->
    <h1 class="contact-title">{{ $t('contact.title') }} <span>CONTACT</span></h1>
    <!-- 联系说明 -->
    <div class="contact-description">
      <p>{{ $t('contact.description') }}</p>
      <!-- 联系信息列表 -->
      <ul class="contact-list">
        <li class="contact-item">{{ $t('contact.phone') }}+86（571）88307797</li>
        <li class="contact-item">
          {{ $t('contact.email') }}
          <!-- 邮箱链接，使用 mailto 协议 -->
          <a class="contact-link" data-email="baihu_animation@163.com" href="mailto:baihu_animation@163.com">
            baihu_animation@163.com
          </a>
        </li>
        <li class="contact-item">
          {{ $t('contact.address') }}
        </li>
      </ul>
    </div>
    <div class="contact-divider">
      <span class="block"></span>
      <span class="block"></span>
      <span class="line"></span>
      <span class="block"></span>
      <span class="block"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 联系我们页面的主容器样式
.contact-container {
  display: flex;
  // 采用垂直方向的弹性布局
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 页面标题样式
.contact-title {
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

// 联系说明样式
.contact-description {
  text-align: center;

  // 联系信息列表样式
  * {
    font-size: 2.4rem;
  }

  // 邮箱链接样式
  .contact-link {
    color: #007bff;
    text-decoration: none;

    // 鼠标悬停时添加下划线
    &:hover {
      text-decoration: underline;
    }
  }

  // 联系信息项样式
  .contact-item {
    margin: 1rem;
    text-align: center;
    list-style: none;
  }
}

.contact-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .block {
    width: 1.6rem;
    height: 1.6rem;
    background: #fbe58e;
    margin: 0 0.5rem;
    border-radius: 2px;
    display: inline-block;
  }

  .line {
    flex: 1;
    height: 0.2rem;
    background: #bbb;
    margin: 0 1.5rem;
    border-radius: 1px;
    min-width: 10rem;
    max-width: 90vw;
  }
}
</style>
