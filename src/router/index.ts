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
      {
        path: '/workplace',
        component: () => import("@/views/workplace/index.vue"),
        redirect: '/workplace/info',
        children: [
          {
            path: '/workplace/info',
            component: () => import("@/views/workplace/MyInfo.vue")
          },
          {
            path: '/workplace/data/source',
            component: () => import("@/views/workplace/Datasource.vue")
          },
          {
            path: '/workplace/project',
            component: () => import("@/views/workplace/Project.vue")
          },
          {
            path: '/workplace/data/tables',
            component: () => import("@/views/workplace/Tables.vue")
          },
          {
            path: '/workplace/chart',
            component: () => import("@/views/workplace/Charts.vue")
          },
          {
            path: '/workplace/show',
            component: () => import("@/views/workplace/Show.vue")
          }
        ]
      }
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
    path: '/chart',
    component: () => import("@/views/chart/Create.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
