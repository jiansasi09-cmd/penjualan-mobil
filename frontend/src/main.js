import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'   // ⬅️ INI KUNCI TAILWIND

const app = createApp(App)

const pinia = createPinia()

// urutan benar
app.use(pinia)
app.use(router)

app.mount('#app')
