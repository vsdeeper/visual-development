/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:03:03
 * @Description:
 */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
