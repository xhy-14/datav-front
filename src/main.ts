import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Icons from '@element-plus/icons-vue'
import VueResizable from 'vue-resizable'
const app = createApp(App)
app.component('vue-resizable', VueResizable)
// 配置element-plus组件库
app.use(ElementPlus, {
  locale: zhCn,
})

for (let i in Icons) {
  app.component(i, Icons[i])
}

// 挂载路由
app.use(router)

// svg插件配置代码
import 'virtual:svg-icons-register'

// 引入样式

// 使用pinia仓库
app.use(createPinia().use(piniaPluginPersistedstate))

app.mount('#app')
