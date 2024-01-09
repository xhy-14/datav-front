import {createRouter, createWebHistory} from 'vue-router'

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
      },
      {
        path: '/account',
        component: () => import("@/views/setting/index.vue")
      },
    ]
  },

  {
    path: '/login',
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/register',
    component: () => import("@/views/login/RegisterView.vue")
  },
  {
    path: '/forget',
    component: () => import("@/views/login/ForgetView.vue")
  },
  {
    path: '/test',
    component: () => import("@/views/my/myView.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router