import 'normalize.css'

import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import Lazyload from 'vue3-lazyload'
import loadingImg from '@/assets/loading.gif'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Lazyload, {
  // error: loadingImg,
  loading: loadingImg,
})

// app.use(createPinia())
app.use(router)

app.mount('#app')
