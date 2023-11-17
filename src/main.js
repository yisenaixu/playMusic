// import './assets/main.css'
import './assets/css/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(store)
app.use(router)
app.provide('message','need inject')
app.mount('#app')
