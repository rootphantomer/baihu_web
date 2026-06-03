/**
 * @file 应用入口，初始化 Vue 实例并注册路由、i18n 插件
 */
import 'normalize.css' // CSS 重置

import { createApp } from 'vue'
import App from './App.vue' // 根组件
import router from './router' // 路由实例
import { i18n } from './plugins/simple-i18n' // i18n 插件

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
