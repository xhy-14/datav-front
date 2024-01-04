import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  // 路由配置
  {
    path: '/hello',
    name: 'hello',
    component: () => import("@/views/HelloView.vue")
  },
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/IndexView.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router