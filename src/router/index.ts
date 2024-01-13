import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 路由配置
  {
    path: '/',
    name: 'layout',
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: '',
        component: () => import("@/views/home/index.vue")
      },
      {
        path: '/account',
        component: () => import("@/views/setting/index.vue")
      },
      {
        path: '/visual',
        component: () => import("@/views/visual/index.vue"),
      },

      {
        path: '/recent',
        component: () => import("@/views/my/RecentView.vue")
      },
      {
        path: '/my',
        redirect: '/my/recent',
        component: () => import("@/views/my/MyIndexView.vue"),
        meta: { title: '我的' },
        children: [
          {
            path: '/my/recent',
            component: () => import("@/views/my/recent/RecentEdit.vue"),
            meta: { title: "最近编辑" },
          },
          {
            path: '/my/file',
            component: () => import("@/views/my/MyFile.vue"),
            meta: { title: "我的文件" }
          }
        ]
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

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router