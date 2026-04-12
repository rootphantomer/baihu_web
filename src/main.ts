import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import Lazyload from 'vue3-lazyload'

import App from './App.vue'
import router from './router'
import { i18n } from './plugins/i18n'

const app = createApp(App)

app.use(Lazyload, {})
app.use(router)
app.use(i18n)

app.mount('#app')
