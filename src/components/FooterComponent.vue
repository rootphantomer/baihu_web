<script setup lang="ts">
import { RouterLink } from 'vue-router'
// 获取当前年份
const year = new Date().getFullYear()
</script>

<template>
  <!-- 页面底部 -->
  <footer>
    <!-- 底部内容容器，使用表格布局 -->
    <div class="table">
      <div class="td">
        <!-- 版权信息 -->
        <address>Power By 杭州白鹄动画有限公司 @ {{ year }}</address>
      </div>
      <div class="td">
        <ul>
          <li>
            <!-- 路由链接，包含社交图标 -->
            <RouterLink to="/"><img src="@/assets/sns/icon_sns_white_15.png" alt="" /></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// 页面底部样式
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;

  // 统一设置底部内所有元素的文字颜色为白色
  * {
    color: white;
  }

  // 底部内容容器样式
  .table {
    display: table;
    margin: 0;
    width: 100%;
    height: 50px;
    padding: 0 60px;
    box-sizing: border-box;

    // 版权信息样式
    address {
      font-size: 15px;
    }

    // 表格单元格样式
    .td {
      vertical-align: middle;
      display: table-cell;
    }

    // 社交图标样式
    img {
      width: 23px;
      height: auto;
    }
  }
}
</style>
