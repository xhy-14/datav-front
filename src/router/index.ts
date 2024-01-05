import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  // 路由配置
  {
    path: '/',
    name: 'layout',
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import("@/views/home/index.vue")
      }]
  },
  {
    path: '/PersonalInformation',
    name: 'PersonalInformation',
    component: () => import("@/views/my/PersonalInformation.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router