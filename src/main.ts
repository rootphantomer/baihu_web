import 'normalize.css'

import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import Lazyload from 'vue3-lazyload'
import loadingImg from '@/assets/loading.gif'


import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import jaJP from './locales/ja-JP'


// 检测 UA 是否为日语
function detectLang() {
  const ua = navigator.language || ''
  if (ua.startsWith('ja')) {
    return 'ja-JP'
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLang(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'ja-JP': jaJP,
  },
})

const app = createApp(App)

app.use(Lazyload, {
  // error: loadingImg,
  loading: loadingImg,
})

// app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
