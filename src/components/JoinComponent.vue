<template>
  <!-- 联系我们页面的主容器 -->
  <div id="join-container" class="join-container">
    <!-- 页面标题 -->
    <h1 class="join-title">联系我们</h1>
    <!-- 联系说明 -->
    <p class="join-description">如果您有任何问题或合作意向，请通过以下方式联系我们：</p>
    <!-- 联系信息列表 -->
    <ul class="join-list">
      <li class="join-item">电话：+86 123 4567 8901</li>
      <li class="join-item">
        邮箱：
        <!-- 邮箱链接，使用 mailto 协议 -->
        <a class="join-link" data-email="johndoe@example.com" href="mailto:johndoe@example.com">
          join@baihu.com
        </a>
      </li>
      <li class="join-item">地址：中国北京市朝阳区某某路123号</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// 联系我们页面的主容器样式
.join-container {
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  // 采用垂直方向的弹性布局
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 页面标题样式
.join-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

// 联系说明样式
.join-description {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

// 联系信息列表样式
.join-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
}

// 联系信息项样式
.join-item {
  margin-bottom: 0.5rem;
  text-align: center;
}

// 邮箱链接样式
.join-link {
  color: #007bff;
  text-decoration: none;

  // 鼠标悬停时添加下划线
  &:hover {
    text-decoration: underline;
  }
}

* {
  font-size: 24px;
  font-weight: bold;
  color: #29293a;
}
</style>
