<template>
  <!-- 联系我们页面的主容器 -->
  <div id="contact-container" class="contact-container">
    <!-- 页面标题 -->
    <h1 class="contact-title">联系我们</h1>
    <!-- 联系说明 -->
    <div class="contact-description">
      <p>如果您有任何问题或合作意向，请通过以下方式联系我们：</p>
      <!-- 联系信息列表 -->
      <ul class="contact-list">
        <li class="contact-item">电话：+138XXXX0519</li>
        <li class="contact-item">
          邮箱：
          <!-- 邮箱链接，使用 mailto 协议 -->
          <a class="contact-link" data-email="johndoe@example.com" href="mailto:johndoe@example.com">
            baihu_admination@163.com
          </a>
        </li>
        <li class="contact-item">地址：浙江省杭州市滨江区长河街道齐飞路 350 号园伦大厦一幢 1607 室</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 联系我们页面的主容器样式
.contact-container {
  height: 800px;
  display: flex;
  // 采用垂直方向的弹性布局
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
*{
  font-family: 'Courier New', Courier, monospace;
}
// 页面标题样式
.contact-title {
  font-size: 2em;
  margin-bottom: 1em;
}

// 联系说明样式
.contact-description {

  font-size: 1.1em;
  margin-bottom: 1.5em;
  text-align: center;
  // 联系信息列表样式

  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.1rem;
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
    margin-bottom: 0.5rem;
    text-align: center;
  }


}
</style>
